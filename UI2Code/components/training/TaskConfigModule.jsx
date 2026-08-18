import React, { useState } from 'react';
import PlanListTab from './PlanListTab';

const BIZ_OPTIONS = ['通用', '内催', '委外', '商单', '在案'];
const PRODUCT_OPTIONS = ['通用', '京东金条', '京东白条', '企业主贷'];
const HAND_OPTIONS = ['通用', 'M1', 'M2', 'M3', 'M4+'];

const TaskConfigModule = () => {
    const [activeTab, setActiveTab] = useState('robot');
    const [modalMode, setModalMode] = useState('');
    const [showScriptPreview, setShowScriptPreview] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDisableConfirm, setShowDisableConfirm] = useState(false);

    const [robotTasks, setRobotTasks] = useState([
        { id: 'R1', name: '新人破冰沟通话术演练', robotType: '实战对练', biz: '内催', productType: '京东金条', hand: 'M1', persona: '随机', script: '新人破冰沟通剧本', plans: 3, status: '已上线', updateTime: '2026-07-10', updater: 'zhangsan' },
        { id: 'R2', name: '高难度施压技巧', robotType: '实战对练', biz: '内催', productType: '通用', hand: 'M2', persona: '强硬', script: '施压提醒剧本', plans: 0, status: '未上线', updateTime: '2026-07-12', updater: 'lisi' },
        { id: 'R3', name: '节假日关怀专项演练', robotType: '实战对练', biz: '内催', productType: '京东白条', hand: '通用', persona: '温和', script: '节日关怀剧本', plans: 5, status: '已停用', updateTime: '2026-05-01', updater: 'wangwu' }
    ]);

    const [formData, setFormData] = useState({
        taskName: '',
        bizType: '通用',
        productType: '通用',
        hand: '通用',
        taskDesc: ''
    });

    const tabs = [
        { id: 'robot', name: '对练任务配置' },
        { id: 'plan', name: '培训计划下发' }
    ];

    const openCreate = () => {
        setFormData({ taskName: '', bizType: '通用', productType: '通用', hand: '通用', taskDesc: '' });
        setModalMode('create');
    };

    const openEdit = (row) => {
        setFormData({
            taskName: row.name,
            bizType: row.biz || '通用',
            productType: row.productType || '通用',
            hand: row.hand || '通用',
            taskDesc: row.taskDesc || '用于定义对练任务的业务归类、适用范围及前端展示信息。'
        });
        setModalMode('edit');
    };

    const openView = (row) => {
        setFormData({
            taskName: row.name,
            bizType: row.biz || '通用',
            productType: row.productType || '通用',
            hand: row.hand || '通用',
            taskDesc: row.taskDesc || '用于定义对练任务的业务归类、适用范围及前端展示信息。'
        });
        setModalMode('view');
    };

    const getTableData = () => [...robotTasks].sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));

    const SortLabel = ({ children }) => (
        <span className="inline-flex items-center gap-1 cursor-pointer select-none">
            {children}
            <i className="fa fa-sort text-[10px] text-slate-300"></i>
        </span>
    );

    const renderStatus = (status) => (
        <span className={`px-2 py-0.5 rounded text-xs border ${
            status === '已上线' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
            status === '已停用' ? 'bg-slate-100 text-slate-400 border-slate-200' :
            'bg-slate-50 text-slate-500 border-slate-200'
        }`}>
            {status}
        </span>
    );

    const renderTable = () => (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                        <th className="p-3 w-16"><SortLabel>ID</SortLabel></th>
                        <th className="p-3"><SortLabel>任务名称</SortLabel></th>
                        <th className="p-3"><SortLabel>机器人类型</SortLabel></th>
                        <th className="p-3"><SortLabel>业务类型</SortLabel></th>
                        <th className="p-3"><SortLabel>产品类型</SortLabel></th>
                        <th className="p-3"><SortLabel>手别</SortLabel></th>
                        <th className="p-3"><SortLabel>客户人设特征</SortLabel></th>
                        <th className="p-3"><SortLabel>机器人剧本</SortLabel></th>
                        <th className="p-3 text-center"><SortLabel>引用计划数</SortLabel></th>
                        <th className="p-3"><SortLabel>更新时间</SortLabel></th>
                        <th className="p-3"><SortLabel>更新人</SortLabel></th>
                        <th className="p-3"><SortLabel>使用状态</SortLabel></th>
                        <th className="p-3">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {getTableData().map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono text-slate-500">{row.id}</td>
                            <td className="p-3 font-bold text-slate-800 truncate max-w-[180px]" title={row.name}>{row.name}</td>
                            <td className="p-3 text-slate-600">{row.robotType}</td>
                            <td className="p-3 text-slate-600">{row.biz}</td>
                            <td className="p-3 text-slate-600">{row.productType}</td>
                            <td className="p-3 text-slate-600">{row.hand}</td>
                            <td className="p-3 text-slate-600">{row.persona}</td>
                            <td className="p-3 text-slate-600 truncate max-w-[150px]" title={row.script}>{row.script}</td>
                            <td className="p-3 text-center">
                                <span className={`cursor-pointer hover:underline ${row.plans > 0 ? 'text-blue-600 font-bold' : 'text-slate-400'}`} title="点击查看引用详情">{row.plans}</span>
                            </td>
                            <td className="p-3 text-slate-500 text-sm">{row.updateTime}</td>
                            <td className="p-3 text-slate-600">{row.updater}</td>
                            <td className="p-3">{renderStatus(row.status)}</td>
                            <td className="p-3">
                                <div className="flex items-center gap-3 whitespace-nowrap">
                                    {row.status === '未上线' && (
                                        <>
                                            <button onClick={() => openEdit(row)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">编辑</button>
                                            <button onClick={() => setShowScriptPreview(true)} className="text-slate-600 hover:text-blue-600 text-sm font-medium">剧本预览</button>
                                            <button onClick={() => setShowDeleteConfirm(true)} className="text-red-500 hover:text-red-700 text-sm font-medium">删除</button>
                                            <button className="text-slate-600 hover:text-blue-600 text-sm font-medium">复制</button>
                                        </>
                                    )}
                                    {row.status === '已上线' && (
                                        <>
                                            <button onClick={() => openView(row)} className="text-slate-600 hover:text-blue-600 text-sm font-medium">查看</button>
                                            <button onClick={() => setShowScriptPreview(true)} className="text-slate-600 hover:text-blue-600 text-sm font-medium">剧本预览</button>
                                            <button onClick={() => setShowDisableConfirm(true)} className="text-slate-600 hover:text-orange-600 text-sm font-medium">停用</button>
                                            <button className="text-slate-600 hover:text-blue-600 text-sm font-medium">复制</button>
                                        </>
                                    )}
                                    {row.status === '已停用' && (
                                        <>
                                            <button onClick={() => openView(row)} className="text-slate-600 hover:text-blue-600 text-sm font-medium">查看</button>
                                            <button onClick={() => setShowScriptPreview(true)} className="text-slate-600 hover:text-blue-600 text-sm font-medium">剧本预览</button>
                                            <button className="text-slate-600 hover:text-blue-600 text-sm font-medium">复制</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderSelect = (label, value, onChange, options, required = false) => (
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">{label} {required && modalMode !== 'view' && <span className="text-red-500">*</span>}</label>
            {modalMode === 'view' ? (
                <div className="text-sm text-slate-800 bg-slate-50 px-3 py-2 rounded border border-slate-100">{value || '-'}</div>
            ) : (
                <select value={value} onChange={onChange} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none bg-white transition-colors">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            )}
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-lg border-r border-slate-200 pr-6">
                        <i className="fa fa-cogs text-blue-500"></i>
                        配置下发
                    </div>
                    <div className="flex gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'plan' ? (
                    <PlanListTab />
                ) : (
                    <div className="flex flex-col gap-4 max-w-7xl mx-auto animate-fadeIn">
                        <div className="flex justify-end">
                            <button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                                <i className="fa fa-plus-circle"></i>
                                新建对练任务
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[220px]">
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">关键词搜索</label>
                                <div className="relative">
                                    <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                    <input type="text" placeholder="搜索任务名称或关联机器人剧本" className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" />
                                </div>
                            </div>
                            <div className="w-36">
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">业务类型</label>
                                <select className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:border-blue-500 outline-none bg-white">
                                    <option>全部</option>{BIZ_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="w-36">
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">产品类型</label>
                                <select className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:border-blue-500 outline-none bg-white">
                                    <option>全部</option>{PRODUCT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="w-32">
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">手别</label>
                                <select className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:border-blue-500 outline-none bg-white">
                                    <option>全部</option>{HAND_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="w-36">
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">使用状态</label>
                                <select className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:border-blue-500 outline-none bg-white">
                                    {['全部', '未上线', '已上线', '已停用'].map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-5 py-1.5 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 shadow-sm">查询</button>
                                <button className="px-5 py-1.5 border border-slate-200 bg-white text-slate-600 rounded text-sm font-bold hover:bg-slate-50">重置</button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-700 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <i className="fa fa-info-circle"></i>
                                <span><strong>规则提示：</strong>对练任务用于定义可复用的机器人实战训练内容；仅已上线任务可被培训计划引用，已停用任务不可再被新计划选择。</span>
                            </div>
                        </div>

                        {renderTable()}
                    </div>
                )}
            </div>

            {modalMode && (
                <div className="fixed inset-0 bg-slate-900/50 z-50 flex justify-end animate-fadeIn backdrop-blur-sm">
                    <div className="bg-white w-[720px] h-full shadow-2xl flex flex-col animate-slideInRight">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                            <h3 className="font-bold text-slate-800 text-lg">
                                {modalMode === 'create' ? '新建对练任务' : modalMode === 'edit' ? '编辑对练任务' : '查看对练任务'}
                            </h3>
                            <button onClick={() => setModalMode('')} className="text-slate-400 hover:text-slate-600">
                                <i className="fa fa-times text-xl"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700">
                                一期仅配置对练任务基础信息，用于计划下发时选择引用；其余训练内容由系统预置，不在本页配置。
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-slate-800 text-base flex items-center gap-2"><div className="w-1 h-4 bg-blue-600 rounded-full"></div>任务基础信息</h4>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">任务名称 {modalMode !== 'view' && <span className="text-red-500">*</span>}</label>
                                        {modalMode === 'view' ? (
                                            <div className="text-sm text-slate-800 bg-slate-50 px-3 py-2 rounded border border-slate-100">{formData.taskName || '-'}</div>
                                        ) : (
                                            <input type="text" value={formData.taskName} onChange={(e) => setFormData({...formData, taskName: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="请输入任务名称，最多30个字符" maxLength={30} />
                                        )}
                                    </div>
                                    {renderSelect('业务类型', formData.bizType, (e) => setFormData({...formData, bizType: e.target.value}), BIZ_OPTIONS, true)}
                                    {renderSelect('产品类型', formData.productType, (e) => setFormData({...formData, productType: e.target.value}), PRODUCT_OPTIONS)}
                                    {renderSelect('手别', formData.hand, (e) => setFormData({...formData, hand: e.target.value}), HAND_OPTIONS)}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">任务说明</label>
                                        {modalMode === 'view' ? (
                                            <div className="text-sm text-slate-800 bg-slate-50 px-3 py-2 rounded border border-slate-100 min-h-[80px] whitespace-pre-wrap">{formData.taskDesc || '-'}</div>
                                        ) : (
                                            <textarea value={formData.taskDesc} onChange={(e) => setFormData({...formData, taskDesc: e.target.value})} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none h-24 resize-none transition-colors" placeholder="请输入任务说明（选填）"></textarea>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-white shrink-0">
                            {modalMode === 'view' ? (
                                <button onClick={() => setModalMode('')} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">关闭</button>
                            ) : (
                                <>
                                    <button onClick={() => setModalMode('')} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">取消</button>
                                    <button onClick={() => setModalMode('')} className="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-slate-900 transition-colors">保存</button>
                                    <button onClick={() => setModalMode('')} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">保存并上线</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showScriptPreview && (
                <div className="fixed inset-0 bg-slate-900/50 z-[60] flex items-center justify-center animate-fadeIn backdrop-blur-sm">
                    <div className="bg-white w-[720px] rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                <i className="fa fa-file-text-o text-blue-500"></i>
                                机器人剧本预览
                            </h3>
                            <button onClick={() => setShowScriptPreview(false)} className="text-slate-400 hover:text-slate-600">
                                <i className="fa fa-times text-xl"></i>
                            </button>
                        </div>
                        <div className="p-6 text-sm text-slate-600 leading-relaxed">
                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                                MVP 阶段剧本为系统预置内容，此处用于预览固定剧本摘要。后续版本可自动映射运营配置后的对应剧本内容。
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-white shrink-0">
                            <button onClick={() => setShowScriptPreview(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">知道了</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-slate-900/50 z-[70] flex items-center justify-center animate-fadeIn backdrop-blur-sm">
                    <div className="bg-white w-[400px] rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="px-6 py-6 flex flex-col items-center gap-4 text-center">
                            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xl"><i className="fa fa-exclamation-triangle"></i></div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-slate-800 text-lg">确认删除</h3>
                                <p className="text-sm text-slate-500">确认要删除该任务吗？删除后将无法恢复。</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button onClick={() => setShowDeleteConfirm(false)} className="px-6 py-2 border border-slate-200 bg-white rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">取消</button>
                            <button onClick={() => setShowDeleteConfirm(false)} className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-red-600 transition-colors">确认删除</button>
                        </div>
                    </div>
                </div>
            )}

            {showDisableConfirm && (
                <div className="fixed inset-0 bg-slate-900/50 z-[70] flex items-center justify-center animate-fadeIn backdrop-blur-sm">
                    <div className="bg-white w-[460px] rounded-xl shadow-2xl flex flex-col overflow-hidden">
                        <div className="px-6 py-6 flex flex-col gap-4">
                            <h3 className="font-bold text-slate-800 text-lg">您确定要停用该任务吗？</h3>
                            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                                <li>停用后，包含此任务的计划将无法下发（已下发内容不受影响）；</li>
                                <li>停用后，不可再被新计划选择。</li>
                            </ul>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button onClick={() => setShowDisableConfirm(false)} className="px-6 py-2 border border-slate-200 bg-white rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">取消</button>
                            <button onClick={() => setShowDisableConfirm(false)} className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-orange-700 transition-colors">确认停用</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskConfigModule;
