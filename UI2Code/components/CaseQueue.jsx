import React from 'react';

const CaseQueue = () => {
  return (
    <div className="bg-white rounded-t-md px-2 pt-1 shadow-sm border border-slate-200 flex items-end gap-1 flex-shrink-0 h-[42px] overflow-x-auto no-scrollbar">
       <div className="px-8 py-1.5 min-w-[140px] text-center text-xs text-slate-600 hover:bg-slate-50 rounded-t-md cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
          我的工作台
       </div>
       <div className="px-8 py-1.5 min-w-[140px] text-center text-xs text-slate-600 hover:bg-slate-50 rounded-t-md cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
          我的作业任务
       </div>
       <div className="px-8 py-1.5 min-w-[180px] text-center text-xs font-bold text-blue-600 bg-blue-50/50 border border-blue-100 border-b-white rounded-t-md cursor-pointer flex justify-center items-center gap-2 relative z-10 translate-y-[1px]">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-md"></div>
          催收详情.张佳铭
          <i className="fa fa-times text-[10px] text-slate-400 hover:text-red-500 transition-colors ml-2 absolute right-3"></i>
       </div>
    </div>
  );
};

export default CaseQueue;