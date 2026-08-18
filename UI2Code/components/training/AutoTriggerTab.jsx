import React, { useState } from 'react';

const AutoTriggerTab = () => {
    const [showAddMappingDrawer, setShowAddMappingDrawer] = useState(false);
    const [showTriggerRecordDrawer, setShowTriggerRecordDrawer] = useState(false);
    const [showFallbackConfigDrawer, setShowFallbackConfigDrawer] = useState(false);
    const [showBatchConfirmModal, setShowBatchConfirmModal] = useState(false);

    const autoTriggerData = [
        { id: 'A1', qcItem: '服务态度生硬', errorType: '行为类', assessType: '演练任务', assessId: 'TASK-001', status: '生效中', createTime: '2023-10-01 10:00', updateTime: '2023-10-05 14:20', triggerCount: 125 },
        { id: 'A2', qcItem: '违规承诺减免', errorType: '内容类', assessType: '培训考核', assessId: 'EXAM-102', status: '生效中', createTime: '2023-10-02 11:30', updateTime: '2023-10-06 09:15', triggerCount: 43 },
        { id: 'A3', qcItem: '未核实客户身份', errorType: '行为类', assessType: '课程学习', assessId: 'CRS-088', status: '已停用', createTime: '2023-09-15 16:40', updateTime: '2023-09-20 18:00', triggerCount: 310 },
        { id: 'A4', qcItem: '过度施压被投诉', errorType: '行为类', assessType: '培训计划', assessId: 'PLAN-005', status: '生效中', createTime: '2023-10-10 09:00', updateTime: '2023-10-12 11:22', triggerCount: 8 },
        { id: 'A5', qcItem: '不当泄露信息', errorType: '内容类', assessType: '演练任务', assessId: 'TASK-042', status: '生效中', createTime: '2023-10-11 14:10', updateTime: '2023-10-11 14:10', triggerCount: 0 },
    ];

    const triggerRecordData = [
        { id: 1, pin: 'jd_user_882', qcItem: '服务态度生硬', status: '成功', reason: '-' },
        { id: 2, pin: 'jd_user_109', qcItem: '违规承诺减免', status: '失败', reason: '用户当前已有同类待办任务' },
        { id: 3, pin: 'jd_user_554', qcItem: '未核实客户身份', status: '成功', reason: '-' },
        { id: 4, pin: 'jd_user_992', qcItem: '服务态度生硬', status: '失败', reason: '接口调用超时' },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* Sub Tabs */}
            <div className="flex items-center gap-6 px-4 bg-white border-b border-slate-200 shrink-0">
                <button className="py-3 text-sm font-bold border-b-2 border-blue-600 text-blue-600">
                    罚单辅导
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {/* Filter Area */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700">差错类型</label>
                        <select className="w-36 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                            <option>全部</option><option>行为类</option><option>内容类</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700">考核类型</label>
                        <select className="w-40 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                            <option>全部</option><option>演练任务</option><option>培训考核</option><option>课程学习</option><option>培训计划</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-700">状态</label>
                        <select className="w-32 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                            <option>全部</option><option>生效中</option><option>已停用</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-slate-700">质检项名称</label>
                        <input type="text" placeholder="请输入质检项名称" className="w-full border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-5 py-1.5 bg-blue-600 text-white rounded text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">搜索</button>
                        <button className="px-5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50 transition-colors">重置</button>
                    </div>
                </div>

                {/* Toolbar & Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col flex-1">
                    <div className="p-4 flex items-center justify-between border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowAddMappingDrawer(true)} className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">
                                <i className="fa fa-plus mr-1"></i> 新增映射关系
                            </button>
                            <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50 transition-colors">
                                批量导入
                            </button>
                            <button onClick={() => setShowBatchConfirmModal(true)} className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50 transition-colors">
                                批量删除
                            </button>
                            <button onClick={() => setShowTriggerRecordDrawer(true)} className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold hover:bg-slate-50 transition-colors">
                                触发记录
                            </button>
                            <button onClick={() => setShowFallbackConfigDrawer(true)} className="px-4 py-1.5 bg-white border border-blue-500 text-blue-600 rounded text-sm font-bold hover:bg-blue-50 transition-colors ml-2">
                                <i className="fa fa-cog mr-1"></i> 兜底触发配置
                            </button>
                        </div>
                        <div className="text-sm text-slate-500">
                            共查询到 <span className="font-bold text-slate-800">124</span> 条映射关系
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                <tr>
                                    <th className="p-3 w-10 text-center"><input type="checkbox" className="rounded text-blue-600" /></th>
                                    <th className="p-3">质检项</th>
                                    <th className="p-3">差错类型</th>
                                    <th className="p-3">考核类型</th>
                                    <th className="p-3">考核ID</th>
                                    <th className="p-3">状态</th>
                                    <th className="p-3">创建时间</th>
                                    <th className="p-3">更新时间</th>
                                    <th className="p-3">触发次数</th>
                                    <th className="p-3 text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {autoTriggerData.map(row => (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-3 text-center"><input type="checkbox" className="rounded text-blue-600" /></td>
                                        <td className="p-3 font-medium text-slate-800">{row.qcItem}</td>
                                        <td className="p-3 text-slate-600">{row.errorType}</td>
                                        <td className="p-3 text-slate-600">{row.assessType}</td>
                                        <td className="p-3 font-mono text-slate-500">{row.assessId}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-2 h-2 rounded-full ${row.status === '生效中' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                                                <span className={`text-xs ${row.status === '生效中' ? 'text-emerald-700' : 'text-slate-500'}`}>{row.status}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-slate-500 text-xs">{row.createTime}</td>
                                        <td className="p-3 text-slate-500 text-xs">{row.updateTime}</td>
                                        <td className="p-3 font-mono font-bold text-slate-700">{row.triggerCount}</td>
                                        <td className="p-3 text-center flex gap-3 justify-center">
                                            <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">编辑</button>
                                            <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">{row.status === '生效中' ? '停用' : '启用'}</button>
                                            <button className="text-slate-400 hover:text-blue-600 text-xs font-medium">修改记录</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 border-t border-slate-100 flex justify-end items-center bg-slate-50 mt-auto">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <select className="border border-slate-200 rounded px-2 py-1 outline-none">
                                <option>10条/页</option>
                                <option>20条/页</option>
                                <option>50条/页</option>
                            </select>
                            <div className="flex items-center gap-1">
                                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-100"><i className="fa fa-angle-left"></i></button>
                                <button className="w-6 h-6 flex items-center justify-center rounded bg-blue-600 text-white font-bold">1</button>
                                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-100">2</button>
                                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-100"><i className="fa fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 抽屉弹窗：新增映射关系 */}
            {showAddMappingDrawer && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                    <div className="w-[480px] bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800">新增映射关系</h3>
                            <button onClick={() => setShowAddMappingDrawer(false)} className="text-slate-400 hover:text-slate-600"><i className="fa fa-times text-lg"></i></button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>质检项</label>
                                <input type="text" list="qc-items" placeholder="支持输入搜索或下拉选择" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                                <datalist id="qc-items">
                                    <option value="服务态度生硬" />
                                    <option value="违规承诺减免" />
                                    <option value="过度施压被投诉" />
                                </datalist>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>差错类型</label>
                                <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                                    <option value="" disabled selected>请选择差错类型</option>
                                    <option>行为类</option>
                                    <option>内容类</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>考核类型</label>
                                <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                                    <option value="" disabled selected>请选择考核类型</option>
                                    <option>演练任务</option>
                                    <option>培训考核</option>
                                    <option>课程学习</option>
                                    <option>培训计划</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>课程编号 / 演练任务ID</label>
                                <input type="text" placeholder="请输入对应编号/ID" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button onClick={() => setShowAddMappingDrawer(false)} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white">取消</button>
                            <button onClick={() => setShowAddMappingDrawer(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">确认</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 抽屉弹窗：触发记录 */}
            {showTriggerRecordDrawer && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                    <div className="w-[600px] bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800">触发记录</h3>
                            <button onClick={() => setShowTriggerRecordDrawer(false)} className="text-slate-400 hover:text-slate-600"><i className="fa fa-times text-lg"></i></button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto flex flex-col">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                    <tr>
                                        <th className="p-3">用户PIN</th>
                                        <th className="p-3">质检项名</th>
                                        <th className="p-3">状态</th>
                                        <th className="p-3">失败原因</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {triggerRecordData.map(record => (
                                        <tr key={record.id} className="hover:bg-slate-50">
                                            <td className="p-3 font-mono text-slate-600">{record.pin}</td>
                                            <td className="p-3 text-slate-800 font-medium">{record.qcItem}</td>
                                            <td className="p-3">
                                                {record.status === '成功' ? (
                                                    <span className="text-emerald-600 flex items-center gap-1.5 text-xs font-bold"><i className="fa fa-check-circle"></i>成功</span>
                                                ) : (
                                                    <span className="text-red-500 flex items-center gap-1.5 text-xs font-bold"><i className="fa fa-times-circle"></i>失败</span>
                                                )}
                                            </td>
                                            <td className="p-3 text-xs text-slate-500">{record.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
                            <button onClick={() => setShowTriggerRecordDrawer(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">关闭</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 抽屉弹窗：兜底触发配置 */}
            {showFallbackConfigDrawer && (
                <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
                    <div className="w-[400px] bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-slate-800">兜底触发配置</h3>
                            <button onClick={() => setShowFallbackConfigDrawer(false)} className="text-slate-400 hover:text-slate-600"><i className="fa fa-times text-lg"></i></button>
                        </div>
                        <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700 leading-relaxed">
                                <i className="fa fa-info-circle mr-1"></i> 当没有匹配到具体映射关系时，将采用此默认配置进行任务派发。
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>兜底考核类型</label>
                                <select className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white">
                                    <option value="" disabled>请选择考核类型</option>
                                    <option selected>课程学习</option>
                                    <option>培训计划</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>课程编号 / 演练任务ID</label>
                                <input type="text" defaultValue="DFLT-CRS-001" placeholder="请输入对应编号/ID" className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                            </div>
                            
                            <div className="border-t border-slate-200 pt-6 mt-4 flex flex-col gap-3 text-sm text-slate-500">
                                <div className="flex justify-between">
                                    <span>更新时间：</span>
                                    <span className="font-mono">2023-10-15 14:22:05</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>触发次数：</span>
                                    <span className="font-mono font-bold text-slate-700">8,241</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>修改记录：</span>
                                    <button className="text-blue-600 hover:underline">查看记录 &gt;</button>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button onClick={() => setShowFallbackConfigDrawer(false)} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white">取消</button>
                            <button onClick={() => setShowFallbackConfigDrawer(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">保存配置</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 批量操作确认弹窗 */}
            {showBatchConfirmModal && (
                <div className="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm flex justify-center items-center animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-2xl w-[400px] overflow-hidden">
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-2xl mb-4">
                                <i className="fa fa-exclamation-triangle"></i>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">确认执行批量操作？</h3>
                            <p className="text-sm text-slate-500">此操作将对选中的多条数据进行修改，操作生效后将无法撤销，请谨慎确认。</p>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setShowBatchConfirmModal(false)} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white">我再想想</button>
                            <button onClick={() => setShowBatchConfirmModal(false)} className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-red-600">确认执行</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AutoTriggerTab;
