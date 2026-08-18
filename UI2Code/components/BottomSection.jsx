import React, { useState, useRef } from 'react';
import { useDraggable } from './useDraggable';

const BottomSection = ({ onScrollShrink }) => {
  const [activeTab, setActiveTab] = useState('作业记录');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSmartSummary, setShowSmartSummary] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // 使用一个状态统一管理不同弹窗类型
  const [modalType, setModalType] = useState(null);
  const scrollContainerRef = useRef(null);
  const tabsRef = useRef(null);
  
  const { position, handleMouseDown } = useDraggable();

  // Tab 列表配置
  const tabs = [
    '作业记录', 
    '客户综合作业记录', 
    '客服进线', 
    '呼入记录', 
    '客户短信回复', 
    '微信记录', 
    '还款券发放记录',
    '划扣记录',
    '他人帮还申请记录',
    '法律手段',
    '催收小结',
    '记录补录',
    '资料展示'
  ];

  const showAddBtnTabs = ['还款券发放记录', '划扣记录', '他人帮还申请记录'];

  // 模拟智能总结生成
  const handleSmartSummarize = () => {
      setIsSummarizing(true);
      setShowSmartSummary(true);
      setTimeout(() => {
          setIsSummarizing(false);
      }, 1500);
  };

  // 监听滚动事件
  const handleScroll = (e) => {
      if (!onScrollShrink) return;
      const scrollTop = e.target.scrollTop;
      // 阈值设为 20px，超过即收缩
      if (scrollTop > 20) {
          onScrollShrink(true);
      } else {
          onScrollShrink(false);
      }
  };

  // Tab左右滚动
  const scrollTabs = (direction) => {
      if (tabsRef.current) {
          tabsRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
      }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden w-full min-h-0 relative">
      {/* 顶部筛选与Tab - 增加左右滚动按钮，优化PC体验 */}
      <div className="flex flex-col border-b border-slate-100 px-1 pt-1 flex-shrink-0 bg-white">
        <div className="flex items-center w-full">
            <button 
               onClick={() => scrollTabs('left')} 
               className="px-3 py-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-tl transition-colors flex-shrink-0 border-b-2 border-transparent"
               title="向左滑动"
            >
               <i className="fa fa-chevron-left text-[10px]"></i>
            </button>
            <div ref={tabsRef} className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth flex-1 px-2" data-ai-list="true">
                {tabs.map((tab, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveTab(tab)}
                        className={`py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <button 
               onClick={() => scrollTabs('right')} 
               className="px-3 py-2.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-tr transition-colors flex-shrink-0 border-b-2 border-transparent"
               title="向右滑动"
            >
               <i className="fa fa-chevron-right text-[10px]"></i>
            </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-slate-50/30">
        {/* 表格类内容 */}
        <>
            {/* 过滤/操作栏 */}
            {showAddBtnTabs.includes(activeTab) ? (
                <div className="px-4 py-2 bg-white flex items-center justify-end border-b border-slate-100 flex-shrink-0 shadow-sm z-10 min-h-[45px]">
                    <button 
                        onClick={() => setModalType(activeTab)}
                        className="px-3 py-1 flex items-center justify-center rounded border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-xs font-bold shadow-sm"
                    >
                        <i className="fa fa-plus mr-1"></i> 新增{activeTab.replace('记录','')}
                    </button>
                </div>
            ) : (
                <div className="px-4 py-2 bg-white flex items-center justify-between border-b border-slate-100 flex-shrink-0 shadow-sm z-10 min-h-[45px]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <i className="fa fa-filter text-xs"></i>
                            </button>
                            <FilterCheckbox label="近3天" defaultChecked />
                            <FilterCheckbox label="预测" />
                            <FilterCheckbox label="预览" />
                            <FilterCheckbox label="已触达" />
                            <FilterCheckbox label="小结" color="text-orange-600" />
                        </div>
                        
                        {/* 智能搜索框 */}
                        <div className="h-4 w-px bg-slate-200"></div>
                        <div className="relative group">
                            <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                            <input 
                                type="text" 
                                placeholder="智能搜索催记..." 
                                className="pl-8 pr-3 py-1.5 w-40 focus:w-56 transition-all text-xs border border-slate-200 rounded-full focus:outline-none focus:border-blue-400 bg-slate-50 focus:bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button 
                                    onClick={handleSmartSummarize}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                                    title="生成智能总结"
                                >
                                    <i className="fa fa-magic text-[10px]"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
                        <div className="px-2.5 py-1 bg-slate-50 rounded-full border border-slate-200">
                            <span>近7天: 外呼 </span>
                            <span className="font-bold text-slate-800">3</span>
                            <span className="mx-1">/</span>
                            <span>接通 </span>
                            <span className="font-bold text-slate-800">0</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 智能总结面板 (条件展示) */}
            {showSmartSummary && (
                <div className="px-4 py-3 bg-blue-50/50 border-b border-blue-100 flex-shrink-0 animate-fadeIn">
                     <div className="flex items-start gap-2.5">
                         <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                             {isSummarizing ? <i className="fa fa-spinner fa-spin text-xs"></i> : <i className="fa fa-robot text-xs"></i>}
                         </div>
                         <div className="flex-1 text-xs text-slate-600 leading-relaxed">
                             {isSummarizing ? (
                                 <span className="text-slate-400">正在分析搜索结果并生成摘要...</span>
                             ) : (
                                 <>
                                     <span className="font-bold text-blue-700 mr-1">搜索结果摘要:</span>
                                     根据关键字 "{searchQuery}" 匹配到 3 条相关催记。用户在 <span className="font-bold">2025-01-25</span> 的通话中提及相关内容，表示月底有还款计划，但需要分期。此前在 <span className="font-bold">2025-01-10</span> 的记录中也表达过类似意愿。
                                     <span className="text-blue-500 cursor-pointer ml-2 hover:underline" onClick={() => setShowSmartSummary(false)}>[关闭]</span>
                                 </>
                             )}
                         </div>
                     </div>
                </div>
            )}

            {/* 记录表格 */}
            <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto custom-scrollbar relative min-h-0"
            >
                <table className="w-full text-left border-collapse table-fixed">
                    <thead className="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="py-2.5 px-3 w-8 bg-slate-50 border-b border-slate-100"></th>
                            <th className="py-2.5 px-3 w-28 whitespace-nowrap bg-slate-50 border-b border-slate-100">时间</th>
                            <th className="py-2.5 px-3 w-24 whitespace-nowrap bg-slate-50 border-b border-slate-100">号码</th>
                            <th className="py-2.5 px-3 w-16 whitespace-nowrap bg-slate-50 border-b border-slate-100">状态</th>
                            <th className="py-2.5 px-3 w-16 whitespace-nowrap bg-slate-50 border-b border-slate-100">结果</th>
                            <th className="py-2.5 px-3 w-14 whitespace-nowrap bg-slate-50 border-b border-slate-100">催员</th>
                            <th className="py-2.5 px-3 w-14 whitespace-nowrap bg-slate-50 border-b border-slate-100">来源</th>
                            <th className="py-2.5 px-3 w-14 whitespace-nowrap bg-slate-50 border-b border-slate-100">关系</th>
                            <th className="py-2.5 px-3 w-14 whitespace-nowrap bg-slate-50 border-b border-slate-100">类型</th>
                            <th className="py-2.5 px-4 w-auto bg-slate-50 border-b border-slate-100">催记备注</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white" data-ai-list="true">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(group => (
                            <React.Fragment key={group}>
                                <RecordRow 
                                    date={`01-25 17:04:${(10+group).toString()}`} 
                                    phone="156****96" 
                                    type="电话" 
                                    result="接通" 
                                    resultColor="text-emerald-600 bg-emerald-50 border-emerald-100" 
                                    action="协商" 
                                    smartNote="自动催记：用户本人接听，催收员告知用户欠款情况，施压上门催收并提醒准备诉讼费用，用户未明确还款时间。"
                                    manualNote="人工催记：用户回复表示月底会发工资，到时候一次性结清欠款。"
                                />
                                <RecordRow 
                                    date={`01-25 17:01:${(40+group).toString()}`} 
                                    phone="156****96" 
                                    type="电话" 
                                    result="未通" 
                                    resultColor="text-red-600 bg-red-50 border-red-100" 
                                    action="无人" 
                                    smartNote="自动催记：首轮挂断"
                                    manualNote=""
                                />
                                <RecordRow 
                                    date={`01-25 10:04:${(20+group).toString()}`} 
                                    phone="156****96" 
                                    type="短信" 
                                    result="送达" 
                                    resultColor="text-blue-600 bg-blue-50 border-blue-100" 
                                    action="成功" 
                                    smartNote="自动催记：短信触达任务执行成功，状态报告：DELIVRD"
                                    manualNote="-"
                                />
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 分页 - 紧凑 */}
            <div className="px-4 py-2 border-t border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
                <div className="text-xs text-slate-400">
                    1-24 / 150 条
                </div>
                <div className="flex items-center gap-2">
                    <select className="text-xs border border-slate-200 rounded py-0.5 px-2 text-slate-600 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white">
                    <option>10条/页</option>
                    <option selected>20条/页</option>
                    <option>50条/页</option>
                    </select>
                    <div className="flex items-center gap-1">
                    <button className="w-6 h-6 rounded border border-slate-200 text-slate-400 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50" disabled>
                        <i className="fa fa-chevron-left text-[10px]"></i>
                    </button>
                    <span className="text-xs font-medium text-slate-700 px-1">1</span>
                    <button className="w-6 h-6 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-center">
                        <i className="fa fa-chevron-right text-[10px]"></i>
                    </button>
                    </div>
                </div>
            </div>
        </>
      </div>

      {/* 模态框：可拖拽的新增申请表单 */}
      {modalType && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none p-4">
              <div 
                 className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn flex flex-col relative pointer-events-auto"
                 style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
              >
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
                      <span className="transform -rotate-12 text-2xl font-bold tracking-widest whitespace-nowrap">jd_admin 保密信息，严禁泄露</span>
                  </div>
                  <div 
                     className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0 z-10 cursor-move select-none"
                     onMouseDown={handleMouseDown}
                  >
                      <h3 className="font-bold text-slate-800">
                         新增{modalType.replace('记录','')}
                      </h3>
                      <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer" onMouseDown={e => e.stopPropagation()}>
                          <i className="fa fa-times"></i>
                      </button>
                  </div>
                  <div className="p-5 flex flex-col gap-4 z-10">
                      {modalType === '他人帮还申请记录' ? (
                          <>
                              <div className="flex items-center gap-2">
                                  <span className="w-24 text-right text-xs text-slate-600">产品类型</span>
                                  <select className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm text-slate-600 bg-slate-50 outline-none cursor-not-allowed" disabled>
                                      <option>JDJR_京东白条</option>
                                  </select>
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="w-24 text-right text-xs text-slate-600"><span className="text-red-500 mr-1">*</span>帮还金额:</span>
                                  <input type="number" className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="w-24 text-right text-xs text-slate-600"><span className="text-red-500 mr-1">*</span>接收人手机号:</span>
                                  <select className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                                      <option>请选择</option>
                                  </select>
                              </div>
                              <div className="flex items-center gap-4 pl-6 py-2">
                                  <div className="flex-1 flex gap-2">
                                      <span className="text-xs text-slate-500">号码关系:</span>
                                      <span className="text-xs font-bold text-slate-700"></span>
                                  </div>
                                  <div className="flex-1 flex gap-2">
                                      <span className="text-xs text-slate-500">号码来源:</span>
                                      <span className="text-xs font-bold text-slate-700"></span>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2">
                                  <span className="w-24 text-right text-xs text-slate-600"><span className="text-red-500 mr-1">*</span>短信模板:</span>
                                  <select className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                                      <option>请选择</option>
                                  </select>
                              </div>
                              <div className="flex items-start gap-2">
                                  <span className="w-24 text-right text-xs text-slate-600 pt-2">短信内容:</span>
                                  <textarea 
                                     className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none h-24 resize-none bg-slate-50 cursor-not-allowed" 
                                     readOnly
                                  ></textarea>
                              </div>
                          </>
                      ) : (
                          <div className="flex flex-col gap-3 text-sm text-slate-600">
                             <div className="flex items-center gap-2">
                                 <span className="w-24 text-right">关联案件:</span>
                                 <input type="text" disabled value="JD-20250128-001" className="flex-1 border border-slate-200 bg-slate-50 rounded px-2 py-1.5 outline-none cursor-not-allowed" />
                             </div>
                             <div className="flex items-center gap-2">
                                 <span className="w-24 text-right"><span className="text-red-500 mr-1">*</span>金额:</span>
                                 <input type="number" className="flex-1 border border-slate-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none" />
                             </div>
                             <div className="flex items-start gap-2">
                                 <span className="w-24 text-right pt-2">备注:</span>
                                 <textarea className="flex-1 border border-slate-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none h-20 resize-none"></textarea>
                             </div>
                          </div>
                      )}
                  </div>
                  <div className="border-t border-slate-100 p-4 flex justify-end bg-slate-50 z-10 gap-2">
                      <button 
                          onClick={() => setModalType(null)}
                          className="px-5 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 text-sm rounded transition-colors"
                      >
                          取消
                      </button>
                      <button 
                          onClick={() => {
                              alert('提交成功');
                              setModalType(null);
                          }}
                          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded shadow-sm"
                      >
                          提交
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

const FilterCheckbox = ({ label, defaultChecked, color = 'text-blue-600' }) => (
  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none hover:text-slate-900">
     <input type="checkbox" className={`rounded ${color} focus:ring-0 w-3.5 h-3.5 border-slate-300`} defaultChecked={defaultChecked} />
     <span className={defaultChecked ? 'font-medium text-slate-800' : ''}>{label}</span>
  </label>
);

const RecordRow = ({ date, phone, type, result, resultColor, action, smartNote, manualNote }) => {
    // 判断是否显示
    const hasManual = manualNote && manualNote !== '-' && manualNote !== '';
    const hasSmart = smartNote && smartNote !== '-' && smartNote !== '';

    return (
        <tr className="hover:bg-blue-50/30 transition-colors group border-b border-slate-50 last:border-0">
            <td className="py-2.5 px-3 text-slate-300 w-8 text-center">
                <i className="fa fa-chevron-right text-[10px] group-hover:text-blue-400 transition-colors"></i>
            </td>
            <td className="py-2.5 px-3 text-slate-500 text-xs font-mono whitespace-nowrap truncate">{date}</td>
            <td className="py-2.5 px-3 text-slate-800 font-bold font-mono text-xs whitespace-nowrap truncate">{phone}</td>
            <td className="py-2.5 px-3 text-slate-600 text-xs font-medium whitespace-nowrap truncate">{action}</td>
            <td className="py-2.5 px-3 whitespace-nowrap">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${resultColor}`}>
                    {result}
                </span>
            </td>
            <td className="py-2.5 px-3 text-slate-500 text-xs whitespace-nowrap truncate">sys</td>
            <td className="py-2.5 px-3 text-slate-500 text-xs whitespace-nowrap truncate">导入</td>
            <td className="py-2.5 px-3 text-slate-600 text-xs whitespace-nowrap truncate">本人</td>
            <td className="py-2.5 px-3 text-slate-600 text-xs whitespace-nowrap truncate">{type}</td>
            
            {/* 合并后的催记列 */}
            <td className="py-2.5 px-4 text-xs align-middle">
                <div className="flex flex-col gap-1.5">
                    {/* 人工催记 */}
                    {hasManual && (
                        <div className="flex items-start gap-2 max-w-full">
                             <span className="px-1.5 rounded bg-blue-100 text-blue-600 text-[10px] whitespace-nowrap mt-0.5 border border-blue-200">人工</span>
                             <span className="text-slate-700 leading-snug truncate block flex-1" title={manualNote}>
                                 {manualNote.replace('人工催记：', '')}
                             </span>
                        </div>
                    )}
                    {/* 自动催记 */}
                    {hasSmart && (
                        <div className="flex items-start gap-2 max-w-full">
                            <span className="px-1.5 rounded bg-slate-100 text-slate-500 text-[10px] whitespace-nowrap mt-0.5 border border-slate-200">自动</span>
                            <span className="text-slate-500 leading-snug truncate block flex-1" title={smartNote}>
                                {smartNote.replace('自动催记：', '')}
                            </span>
                        </div>
                    )}
                    {!hasManual && !hasSmart && <span className="text-slate-300">-</span>}
                </div>
            </td>
        </tr>
    );
};

export default BottomSection;
