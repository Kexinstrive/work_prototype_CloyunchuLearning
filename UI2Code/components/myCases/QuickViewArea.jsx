import React from 'react';
import { WARNING_GROUPS } from './MyCasesComponents';

const QuickViewArea = ({
    activePoolId,
    setActivePoolId,
    activeWarningFilter,
    setActiveWarningFilter,
    warningSectionState,
    toggleWarningSection,
    customPools,
    handleDeletePool,
    selectedRows,
    getWarningCount,
    handleMarkWarning,
    setIsPoolModalOpen
}) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex flex-col gap-3">
      <div className="flex items-start justify-between">
          {/* 左侧：分类预警区域 */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
              {/* 系统视图 */}
              <div className="flex items-center gap-2">
                 <span className="text-xs text-slate-500 font-bold w-16 text-right flex-shrink-0">系统视图:</span>
                 <div className="flex flex-wrap gap-1">
                   {['总案件', '待跟进', '还款案件', '新案件', '当日处理', '下次跟进', '即将到期'].map(tab => (
                       <button 
                          key={tab} 
                          onClick={() => { setActivePoolId(null); setActiveWarningFilter(null); }}
                          className={`px-3 py-1 text-xs rounded transition-colors shadow-sm border ${activePoolId === null && activeWarningFilter === null ? 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600' : 'bg-slate-50 border-transparent text-slate-400'}`}
                       >
                         {tab}
                       </button>
                   ))}
                 </div>
              </div>

              {/* 案件预警 - 添加滚动支持 */}
              <div className="flex items-start gap-2">
                  <span className="text-xs text-slate-500 font-bold w-16 text-right flex-shrink-0 pt-1.5">案件预警:</span>
                  <div className="flex flex-col gap-2 flex-1 max-h-[100px] overflow-y-auto custom-scrollbar pr-2">
                     {WARNING_GROUPS.map((group, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{group.title}</span>
                                        {group.collapsible && (
                                            <button 
                                                onClick={() => toggleWarningSection(group.title)}
                                                className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-100/50 hover:bg-blue-50 transition-colors"
                                            >
                                                {warningSectionState[group.title] ? '收起' : '展开'}
                                                <i className={`fa fa-chevron-${warningSectionState[group.title] ? 'up' : 'down'} text-[9px]`}></i>
                                            </button>
                                        )}
                                    </div>
                                    {(!group.collapsible || warningSectionState[group.title]) && (
                                        <div className="flex items-center gap-2 flex-wrap animate-fadeIn">
                                            {group.items.map(w => {
                                                const count = getWarningCount(w.id);
                                                const isActive = activeWarningFilter === w.id;
                                                const isEmpty = count === 0;
                                                return (
                                                    <button
                                                        key={w.id}
                                                        onClick={() => !isEmpty && setActiveWarningFilter(isActive ? null : w.id)}
                                                        disabled={isEmpty}
                                                        className={`px-2 py-1 rounded text-[11px] border flex items-center gap-1.5 transition-all ${
                                                            isActive 
                                                            ? `${w.activeBg} ${w.activeBorder} ${w.color} shadow-sm font-bold` 
                                                            : isEmpty 
                                                                ? 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed' 
                                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        <i className={`fa fa-${w.icon} ${isEmpty ? 'text-slate-300' : w.color} text-[10px]`}></i>
                                                        <span>{w.name}</span>
                                                        {!isEmpty && (
                                                            <span className={`ml-0.5 px-1 py-0 rounded-full text-[9px] leading-tight min-w-[14px] text-center ${isActive ? 'bg-white/60' : 'bg-slate-100 text-slate-500'}`}>
                                                                {count}
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                     ))}
                  </div>
              </div>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="flex flex-col gap-2 flex-shrink-0 ml-4 border-l border-slate-100 pl-4">
              <div className="flex items-center bg-purple-50 rounded-lg px-2 py-1.5 gap-2 border border-purple-100">
                 <span className="text-[10px] text-purple-700 font-bold">管理:</span>
                 <button 
                   onClick={() => handleMarkWarning(true)}
                   disabled={selectedRows.length === 0}
                   className="px-2 py-1 bg-white text-purple-600 text-xs rounded border border-purple-200 hover:bg-purple-100 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 whitespace-nowrap"
                 >
                   <i className="fa fa-shield-alt"></i> 标记
                 </button>
                 <button 
                   onClick={() => handleMarkWarning(false)}
                   disabled={selectedRows.length === 0}
                   className="px-2 py-1 bg-white text-slate-500 text-xs rounded border border-slate-200 hover:bg-slate-50 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                 >
                   取消
                 </button>
              </div>

              <button className="w-full px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded hover:bg-blue-100 border border-blue-100 shadow-sm flex items-center justify-center gap-1">
                  <i className="fa fa-robot"></i> 批量任务
              </button>
          </div>
      </div>

      {/* 底部：自定义案件池 */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-1">
          <span className="text-xs text-amber-600 font-bold flex items-center gap-1 flex-shrink-0">
              <i className="fa fa-star text-[10px]"></i>
              自定义池:
          </span>
          <div className="flex flex-wrap gap-2">
              {customPools.length === 0 ? (
                  <span className="text-[10px] text-slate-400 italic px-2">暂无自定义案件池</span>
              ) : (
                  customPools.map(pool => (
                     <div 
                       key={pool.id} 
                       onClick={() => { setActivePoolId(pool.id); setActiveWarningFilter(null); }}
                       className={`group flex items-center gap-2 px-3 py-1 text-xs rounded-full border cursor-pointer transition-all ${activePoolId === pool.id ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-amber-50/30'}`}
                     >
                         <span>{pool.name}</span>
                         <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activePoolId === pool.id ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                            {pool.count}
                         </span>
                         <button 
                           onClick={(e) => handleDeletePool(pool.id, e)}
                           className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                            <i className="fa fa-times text-[10px]"></i>
                         </button>
                     </div>
                  ))
              )}
          </div>
      </div>
    </div>
  );
};

export default QuickViewArea;