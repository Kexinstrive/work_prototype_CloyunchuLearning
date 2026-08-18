import React, { useState } from 'react';
import AbilityTrainingModule from './training/AbilityTrainingModule';
import TaskConfigModule from './training/TaskConfigModule';

function AutoModePage() {
  const [trainingSubTab, setTrainingSubTab] = useState('module');

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5]">
      <div className="flex items-center justify-between px-6 h-[56px] bg-[#2b2f3a] text-slate-300 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-8 h-full">
            <div className="flex items-center gap-2 text-[18px] font-bold text-white tracking-wide">
                <img src="https://l-api.jd.com/relay-aigc/design/image/prompt/%E8%93%9D%E8%89%B2%E9%B2%B8%E9%B1%BC%E5%8D%A1%E9%80%9Alogo?width=512&height=512" alt="logo" className="w-8 h-8 rounded-full object-cover" />
                <span>云催</span>
            </div>
            <div className="flex items-center text-[14px] font-medium h-full">
                <div className="flex items-center gap-1.5 px-4 h-full cursor-default transition-all duration-300 text-white bg-blue-500/20 border-b-2 border-blue-500">
                    <i className="fa fa-graduation-cap"></i> 培训模式
                </div>
            </div>
        </div>
        <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-slate-300">
                <i className="fa fa-commenting-o hover:text-white cursor-pointer text-lg"></i>
                <i className="fa fa-list-ul hover:text-white cursor-pointer text-lg"></i>
                <div className="relative cursor-pointer hover:text-white">
                    <i className="fa fa-bell-o text-lg"></i>
                    <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        16
                    </span>
                </div>
                <i className="fa fa-volume-up hover:text-white cursor-pointer text-lg ml-2"></i>
            </div>
            <div className="w-px h-4 bg-slate-600 mx-1"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
                <span className="text-[13px]">员工号：00001681</span>
                <div className="flex items-center gap-1.5">
                    <i className="fa fa-user-circle text-lg"></i>
                    <span className="text-[13px]" data-path-hash="1cfb32">管理员</span>
                    <i className="fa fa-angle-down text-slate-400"></i>
                </div>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col relative">
            <div className="bg-white rounded shadow-sm border border-slate-100 py-3 px-5 shrink-0 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-6 text-sm text-slate-600 overflow-x-auto">
                    {[
                        { id: 'module', name: '能力培训模块' },
                        { id: 'task', name: '配置下发' }
                    ].map(tab => (
                        <div 
                            key={tab.id} 
                            className={`whitespace-nowrap cursor-pointer transition-colors pb-1 ${trainingSubTab === tab.id ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
                            onClick={() => setTrainingSubTab(tab.id)}
                        >
                            {tab.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="h-full flex flex-col overflow-hidden">
                    {trainingSubTab === 'task' && <TaskConfigModule />}
                    {trainingSubTab === 'module' && <AbilityTrainingModule />}
                </div>
            </div>
        </div>
    </div>
  );
}

export default AutoModePage;
