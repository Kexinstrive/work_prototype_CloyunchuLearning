import React from 'react';

const ApprovalTab = () => {
  return (
    <div className="flex flex-col gap-4">
        <div className="flex gap-2 mb-2">
            <button className="px-4 py-1.5 bg-white border border-slate-200 rounded text-sm font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200">待我审批 (4)</button>
            <button className="px-4 py-1.5 bg-transparent text-slate-400 text-sm font-medium hover:text-slate-600">我发起的</button>
        </div>
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-xs">减免</div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">陈**的息费减免申请</h4>
                        <p className="text-xs text-slate-500 mt-1">申请人：张三 (催收一组) · 申请时间：2025-01-28 14:30</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-slate-200 rounded text-xs hover:bg-slate-50">驳回</button>
                    <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700">同意</button>
                </div>
            </div>
        ))}
    </div>
  );
};

export default ApprovalTab;