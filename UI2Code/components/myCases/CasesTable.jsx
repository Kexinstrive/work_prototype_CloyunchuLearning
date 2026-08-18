import React from 'react';
import { WARNING_GROUPS } from './MyCasesComponents';

const CasesTable = ({
    displayedCases,
    selectedRows,
    toggleAll,
    toggleRow,
    handleSort,
    sortConfig,
    onNavigate,
    handleContextMenu,
    handleOpenTagModal,
    getWarningStatus,
    getTagStyle,
    maskIdCard
}) => {
  
  const SortIcon = ({ columnKey }) => {
     if (sortConfig.key !== columnKey) {
        return <i className="fa fa-sort text-[10px] text-slate-300 ml-1"></i>;
     }
     return (
        <i className={`fa fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} text-[10px] text-blue-600 ml-1`}></i>
     );
  };

  const allWarningTypes = WARNING_GROUPS.flatMap(g => g.items);
  const getWarningConfig = (id) => allWarningTypes.find(w => w.id === id);

  return (
    /* 修改为 Flex 布局容器，撑满父级高度 */
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
       {/* 表格主体区域：flex-1 自适应高度，内部滚动 */}
       <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
             {/* 表头固定 sticky top-0 */}
             <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 whitespace-nowrap sticky top-0 z-10">
                <tr>
                   <th className="py-3 px-4 w-10 bg-slate-50">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-600 focus:ring-0 w-3.5 h-3.5 border-slate-300"
                        checked={selectedRows.length === displayedCases.length && displayedCases.length > 0}
                        onChange={toggleAll}
                      />
                   </th>
                   <th className="py-3 px-4 w-12 text-center bg-slate-50">预警</th>
                   <th className="py-3 px-4 w-14 bg-slate-50">序号</th>
                   <th className="py-3 px-4 bg-slate-50">客户ID</th>
                   <th className="py-3 px-4 bg-slate-50">案件行动状态</th>
                   <th className="py-3 px-4 bg-slate-50">客户姓名</th>
                   <th className="py-3 px-4 bg-slate-50">身份证号</th>
                   <th className="py-3 px-4 w-16 bg-slate-50">
                       <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600" onClick={() => handleSort('age')}>
                         年龄 <SortIcon columnKey="age" />
                      </div>
                   </th>
                   <th className="py-3 px-4 min-w-[120px] bg-slate-50">
                       <div className="flex items-center gap-2">
                           <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600" onClick={() => handleSort('tag')}>
                                人工打标 <SortIcon columnKey="tag" />
                           </div>
                           <button 
                              onClick={(e) => { e.stopPropagation(); handleOpenTagModal(); }}
                              className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-[9px] hover:bg-blue-100 flex items-center gap-1"
                              title="批量修改选中案件的人工标签"
                           >
                              <i className="fa fa-pen"></i> 批量
                           </button>
                       </div>
                   </th>
                   <th className="py-3 px-4 bg-slate-50">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600" onClick={() => handleSort('overdueDays')}>
                         逾期天数 <SortIcon columnKey="overdueDays" />
                      </div>
                   </th>
                   <th className="py-3 px-4 bg-slate-50">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600" onClick={() => handleSort('overdueAmount')}>
                         逾期金额 <SortIcon columnKey="overdueAmount" />
                      </div>
                   </th>
                   <th className="py-3 px-4 bg-slate-50">还款金额</th>
                   <th className="py-3 px-4 bg-slate-50">最后跟进时间</th>
                   <th className="py-3 px-4 bg-slate-50">未跟进</th>
                   <th className="py-3 px-4 bg-slate-50">派案日期</th>
                   <th className="py-3 px-4 text-center sticky right-0 bg-slate-50 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] z-20">操作</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {displayedCases.map((item, index) => {
                    const warnings = getWarningStatus(item);
                    const hasWarning = warnings.length > 0;
                    const isSupervisorWarning = item.supervisorWarning;
                    
                    return (
                       <tr 
                         key={item.id} 
                         onContextMenu={(e) => handleContextMenu(e, item.id)}
                         className={`transition-colors cursor-context-menu ${
                          isSupervisorWarning ? 'bg-purple-50/50 hover:bg-purple-50' : 
                          hasWarning ? 'bg-red-50/70 hover:bg-red-50' : 
                          'hover:bg-blue-50/30'}`}
                       >
                          <td className="py-3 px-4">
                             <input 
                               type="checkbox" 
                               className="rounded text-blue-600 focus:ring-0 w-3.5 h-3.5 border-slate-300"
                               checked={selectedRows.includes(item.id)}
                               onChange={() => toggleRow(item.id)}
                             />
                          </td>
                          <td className="py-3 px-4 text-center">
                            {hasWarning && (
                                <div className="flex justify-center gap-1">
                                    {warnings.map((wId, idx) => {
                                        const config = getWarningConfig(wId);
                                        if(!config) return null;
                                        return (
                                            <div key={idx} className="group relative cursor-help">
                                                <i className={`fa fa-${config.icon} ${config.color} animate-pulse text-sm`}></i>
                                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
                                                    {config.name}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-500">{item.id}</td>
                          <td className="py-3 px-4 font-mono text-slate-600 break-all max-w-[120px] truncate" title={item.customerId}>
                             {item.customerId}
                          </td>
                          <td className="py-3 px-4">
                             <span className={`px-2 py-0.5 rounded text-[10px] border ${
                                item.actionStatus === '已结清' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                item.actionStatus === '承诺还款' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                'bg-slate-50 text-slate-500 border-slate-200'}`}
                             >
                                {item.actionStatus}
                             </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-700">{item.name}</td>
                          <td className="py-3 px-4 font-mono text-slate-600">{maskIdCard(item.idCard)}</td>
                          <td className="py-3 px-4 text-slate-600">{item.age}</td>
                          <td className="py-3 px-4">
                              {item.tag ? (
                                  <span 
                                    className={`text-[9px] px-1.5 py-0.5 rounded border whitespace-nowrap font-medium ${getTagStyle(item.tag)}`}
                                  >
                                    {item.tag}
                                  </span>
                              ) : <span className="text-slate-300">-</span>}
                          </td>
                          <td className="py-3 px-4 text-slate-600">{item.overdueDays}</td>
                          <td className="py-3 px-4 font-mono text-slate-700">{item.overdueAmount}</td>
                          <td className="py-3 px-4 font-mono text-emerald-600 font-medium">{item.repaidAmount}</td>
                          <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{item.lastFollowTime}</td>
                          <td className="py-3 px-4">
                            <span className={item.lastFollowDays > 7 ? 'text-red-600 font-bold' : 'text-slate-600'}>
                                {item.lastFollowDays}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500">{item.distributeDate}</td>
                          <td className="py-3 px-4 text-center sticky right-0 bg-white shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] z-0">
                             <button 
                               onClick={() => onNavigate('index')}
                               className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs hover:bg-blue-600 hover:text-white transition-colors"
                             >
                                作业
                             </button>
                          </td>
                       </tr>
                    );
                })}
             </tbody>
          </table>
       </div>
       
       {/* 分页区域：固定底部 */}
       <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
          <div className="text-xs text-slate-500">显示 {displayedCases.length > 0 ? '1' : '0'} 到 {displayedCases.length} 共 {displayedCases.length} 条</div>
          <div className="flex items-center gap-2">
             <button className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-400 text-xs disabled:opacity-50" disabled>上一页</button>
             <div className="flex items-center gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded bg-blue-600 text-white text-xs">1</button>
             </div>
             <button className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-600 text-xs hover:bg-slate-50">下一页</button>
          </div>
       </div>
    </div>
  );
};

export default CasesTable;