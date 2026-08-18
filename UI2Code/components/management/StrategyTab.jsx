import React, { useState } from 'react';
import { FilterSection } from '../ManagementComponents';

const StrategyTab = ({ handleContextMenu }) => {
  const [strategySubTab, setStrategySubTab] = useState('unassigned'); // unassigned, assigned, rules
  
  // 高级分案功能状态
  const [showBatchInput, setShowBatchInput] = useState(false);
  const [batchIds, setBatchIds] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSaveTagModalOpen, setIsSaveTagModalOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [assignTarget, setAssignTarget] = useState('');

  // 处理批量分配
  const handleBatchAssign = () => {
      setIsAssignModalOpen(false);
      alert(`已将筛选出的案件分配给：${assignTarget}`);
  };

  // 处理收藏标签
  const handleSaveTag = () => {
      setIsSaveTagModalOpen(false);
      alert(`已将当前筛选条件（含批量ID）收藏为标签：${newTagName}`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                 <i className="fa fa-chess-knight text-lg"></i>
              </div>
              <div>
                 <h1 className="text-lg font-bold text-slate-800">智能分案</h1>
                 <p className="text-xs text-slate-500">分案规则配置与自动化执行</p>
              </div>
           </div>
           {/* 智能分案子Tab */}
           <div className="flex bg-slate-100 p-1 rounded-lg">
               {[ 
                   { id: 'unassigned', name: '未分案' },
                   { id: 'assigned', name: '已分案' },
                   { id: 'rules', name: '规则配置' }
               ].map(sub => (
                   <button
                       key={sub.id}
                       onClick={() => setStrategySubTab(sub.id)}
                       className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                           strategySubTab === sub.id 
                           ? 'bg-white text-indigo-600 shadow-sm' 
                           : 'text-slate-500 hover:text-slate-700'
                       }`}
                   >
                       {sub.name}
                   </button>
               ))}
           </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            <div className="flex flex-col gap-4">
                {/* 未分案视图 */}
                {strategySubTab === 'unassigned' && (
                    <div className="flex flex-col gap-4 animate-fadeIn">
                        <FilterSection 
                            showBatchToggle={true} 
                            onToggleBatch={() => setShowBatchInput(!showBatchInput)} 
                            showBatchInput={showBatchInput}
                            batchIds={batchIds}
                            setBatchIds={setBatchIds}
                        />
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                            <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-slate-700">未分案列表 <span className="text-slate-400 text-xs font-normal ml-2">(共 1,245 条)</span></h3>
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded border border-indigo-100">已筛选: 1,245</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => setIsSaveTagModalOpen(true)}
                                      className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 text-xs font-bold rounded hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <i className="fa fa-tag"></i> 收藏为标签
                                    </button>
                                    <button 
                                      onClick={() => setIsAssignModalOpen(true)}
                                      className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 shadow-sm flex items-center gap-1"
                                    >
                                        <i className="fa fa-share-alt"></i> 批量分配
                                    </button>
                                </div>
                            </div>
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 font-bold text-slate-600">
                                    <tr>
                                        <th className="p-3 w-10"><input type="checkbox" className="rounded"/></th>
                                        <th className="p-3">客户姓名</th>
                                        <th className="p-3">身份证号</th>
                                        <th className="p-3">逾期金额</th>
                                        <th className="p-3">逾期天数</th>
                                        <th className="p-3">入催时间</th>
                                        <th className="p-3">标签</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100" data-ai-list="true">
                                    {[1,2,3,4,5].map(i => (
                                        <tr key={i} className="hover:bg-slate-50" onContextMenu={(e) => handleContextMenu && handleContextMenu(e, `unassigned-${i}`)}>
                                            <td className="p-3"><input type="checkbox" className="rounded"/></td>
                                            <td className="p-3 font-medium">张*三</td>
                                            <td className="p-3 font-mono text-slate-500">370***********1X</td>
                                            <td className="p-3 font-mono">¥ 12,450.00</td>
                                            <td className="p-3">{15 + i}天</td>
                                            <td className="p-3 text-slate-500">2025-01-{20+i}</td>
                                            <td className="p-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px]">新案</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 已分案视图 */}
                {strategySubTab === 'assigned' && (
                    <div className="flex flex-col gap-4 animate-fadeIn">
                        <FilterSection 
                            showBatchToggle={true} 
                            onToggleBatch={() => setShowBatchInput(!showBatchInput)} 
                            showBatchInput={showBatchInput}
                            batchIds={batchIds}
                            setBatchIds={setBatchIds}
                        />
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                             <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-slate-700">已分案列表 <span className="text-slate-400 text-xs font-normal ml-2">(共 45,210 条)</span></h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                      onClick={() => setIsSaveTagModalOpen(true)}
                                      className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 text-xs font-bold rounded hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <i className="fa fa-tag"></i> 收藏为标签
                                    </button>
                                    <button 
                                      onClick={() => setIsAssignModalOpen(true)}
                                      className="px-3 py-1.5 bg-white text-indigo-600 border border-indigo-200 text-xs font-bold rounded hover:bg-indigo-50 flex items-center gap-1"
                                    >
                                        <i className="fa fa-exchange-alt"></i> 批量调案
                                    </button>
                                    <button className="px-4 py-1.5 bg-white text-slate-600 border border-slate-200 text-xs font-bold rounded hover:bg-slate-50">
                                        导出数据
                                    </button>
                                </div>
                            </div>
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 font-bold text-slate-600">
                                    <tr>
                                        <th className="p-3">客户姓名</th>
                                        <th className="p-3">逾期金额</th>
                                        <th className="p-3">当前归属人</th>
                                        <th className="p-3">归属组</th>
                                        <th className="p-3">分案时间</th>
                                        <th className="p-3">状态</th>
                                        <th className="p-3">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100" data-ai-list="true">
                                    {[1,2,3,4,5].map(i => (
                                        <tr key={i} className="hover:bg-slate-50" onContextMenu={(e) => handleContextMenu && handleContextMenu(e, `assigned-${i}`)}>
                                            <td className="p-3 font-medium">李*四</td>
                                            <td className="p-3 font-mono">¥ 5,600.00</td>
                                            <td className="p-3">王五</td>
                                            <td className="p-3">M1常规催收组</td>
                                            <td className="p-3 text-slate-500">2025-01-{25+i}</td>
                                            <td className="p-3"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px]">作业中</span></td>
                                            <td className="p-3 text-blue-600 cursor-pointer">调案</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 规则配置视图 */}
                {strategySubTab === 'rules' && (
                    <div className="animate-fadeIn">
                        <div className="flex justify-end mb-4">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-bold shadow-sm hover:bg-indigo-700">+ 新增分案规则</button>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 font-bold text-slate-600">
                                    <tr>
                                        <th className="p-3">规则名称</th>
                                        <th className="p-3">适用案件</th>
                                        <th className="p-3">分配策略</th>
                                        <th className="p-3">优先级</th>
                                        <th className="p-3">状态</th>
                                        <th className="p-3">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100" data-ai-list="true">
                                    <tr>
                                        <td className="p-3 font-medium">M1新案平均分配</td>
                                        <td className="p-3 text-slate-500">逾期1-30天</td>
                                        <td className="p-3">轮询分配</td>
                                        <td className="p-3">High</td>
                                        <td className="p-3"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">启用</span></td>
                                        <td className="p-3 text-blue-600 cursor-pointer">编辑</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-medium">大额案件VIP组</td>
                                        <td className="p-3 text-slate-500">金额>5万</td>
                                        <td className="p-3">指定组分配</td>
                                        <td className="p-3">Top</td>
                                        <td className="p-3"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">启用</span></td>
                                        <td className="p-3 text-blue-600 cursor-pointer">编辑</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* 模态框：批量分配 */}
        {isAssignModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                        <h3 className="font-bold text-slate-800">批量分配案件</h3>
                        <button onClick={() => setIsAssignModalOpen(false)} className="absolute right-4 text-slate-400 hover:text-slate-600">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-slate-500">分配对象</label>
                                <select 
                                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                                    value={assignTarget}
                                    onChange={(e) => setAssignTarget(e.target.value)}
                                >
                                    <option value="" disabled selected>请选择目标组/人</option>
                                    <option value="M1_GROUP">M1 常规催收组</option>
                                    <option value="M2_GROUP">M2 高压催收组</option>
                                    <option value="LEGAL_GROUP">法务组</option>
                                    <option value="VISIT_GROUP">外访组</option>
                                </select>
                            </div>
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700">
                                已选中 <span className="font-bold">1,245</span> 个符合条件的案件
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => setIsAssignModalOpen(false)} 
                                className="px-4 py-1.5 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                            >
                                取消
                            </button>
                            <button 
                                onClick={handleBatchAssign} 
                                disabled={!assignTarget}
                                className="px-4 py-1.5 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                确认分配
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* 模态框：收藏为标签 */}
        {isSaveTagModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                        <h3 className="font-bold text-slate-800">收藏为筛选标签</h3>
                        <button onClick={() => setIsSaveTagModalOpen(false)} className="absolute right-4 text-slate-400 hover:text-slate-600">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-slate-500">标签名称</label>
                                <input 
                                    autoFocus
                                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                                    placeholder="例如：本月重点分案..."
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                />
                            </div>
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded text-xs text-slate-500">
                                系统将保存当前所有筛选条件（包含批量ID），方便下次快速调用。
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={() => setIsSaveTagModalOpen(false)} 
                                className="px-4 py-1.5 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                            >
                                取消
                            </button>
                            <button 
                                onClick={handleSaveTag} 
                                disabled={!newTagName.trim()}
                                className="px-4 py-1.5 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default StrategyTab;