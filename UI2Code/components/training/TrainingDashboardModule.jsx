import React, { useState } from 'react';

const TrainingDashboardModule = () => {
    const [subTab, setSubTab] = useState('completion'); // 任务完成情况

    return (
        <div className="flex flex-col w-full h-full bg-slate-50 overflow-hidden text-slate-800 p-6">
            {/* 顶部二级导航/子菜单 */}
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 mb-4 shrink-0 flex items-center gap-6">
                <h2 className="text-lg font-bold text-slate-800 border-r border-slate-200 pr-6">
                    <i className="fa fa-line-chart text-blue-500 mr-2"></i>数据看板
                </h2>
                <div className="flex gap-2">
                    <button 
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${subTab === 'completion' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
                        onClick={() => setSubTab('completion')}
                    >
                        任务完成情况
                    </button>
                </div>
            </div>

            {/* 核心内容区 */}
            {subTab === 'completion' && (
                <div className="flex-1 flex flex-col gap-4 min-h-0 animate-fadeIn">
                    {/* 摘要数据 */}
                    <div className="grid grid-cols-4 gap-4 shrink-0">
                        {[
                            { title: '总下发任务', value: '1,250', unit: '个', icon: 'tasks', color: 'text-blue-600', bg: 'bg-blue-50' },
                            { title: '已完成', value: '980', unit: '个', icon: 'check-circle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { title: '生效中', value: '215', unit: '个', icon: 'spinner', color: 'text-orange-600', bg: 'bg-orange-50' },
                            { title: '逾期未达标', value: '55', unit: '个', icon: 'exclamation-circle', color: 'text-red-600', bg: 'bg-red-50' }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 mb-1">{stat.title}</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
                                        <span className="text-xs text-slate-400">{stat.unit}</span>
                                    </div>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <i className={`fa fa-${stat.icon} text-lg`}></i>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 详细表格 */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                            <h3 className="font-bold text-slate-800">各任务执行明细</h3>
                            <div className="flex items-center gap-2">
                                <input type="text" placeholder="搜索任务名称..." className="border border-slate-200 rounded-md px-3 py-1.5 text-xs outline-none focus:border-blue-500 w-64" />
                                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-xs font-bold hover:bg-blue-700 transition-colors">导出数据</button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 sticky top-0">
                                    <tr>
                                        <th className="py-3 px-4 font-medium">任务名称</th>
                                        <th className="py-3 px-4 font-medium">任务类型</th>
                                        <th className="py-3 px-4 font-medium">应覆盖人数</th>
                                        <th className="py-3 px-4 font-medium w-48">完成进度</th>
                                        <th className="py-3 px-4 font-medium">平均得分</th>
                                        <th className="py-3 px-4 font-medium">状态</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        { name: '新员工破冰实战对练', type: '实战对练', total: 45, done: 27, progress: 60, score: 72, status: '预警' },
                                        { name: '应对极端情绪专项对练', type: '实战对练', total: 80, done: 80, progress: 100, score: 91, status: '已完成' },
                                        { name: 'M3高难度施压技巧演练', type: '实战对练', total: 120, done: 102, progress: 85, score: 88, status: '正常' },
                                        { name: '合规红线模拟测试', type: '实战对练', total: 200, done: 185, progress: 92, score: 95, status: '正常' },
                                    ].map((task, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-3 px-4 font-bold text-slate-700">{task.name}</td>
                                            <td className="py-3 px-4 text-slate-500">{task.type}</td>
                                            <td className="py-3 px-4 text-slate-600">{task.total} 人</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full rounded-full ${task.progress === 100 ? 'bg-emerald-500' : task.progress >= 80 ? 'bg-blue-500' : task.progress >= 50 ? 'bg-orange-500' : 'bg-red-500'}`} 
                                                            style={{ width: `${task.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-slate-600 text-xs w-8">{task.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 font-bold text-slate-700">{task.score}{task.score !== '-' && '分'}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                    task.status === '正常' || task.status === '已完成' ? 'bg-emerald-50 text-emerald-600' : 
                                                    task.status === '预警' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                                                }`}>{task.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingDashboardModule;
