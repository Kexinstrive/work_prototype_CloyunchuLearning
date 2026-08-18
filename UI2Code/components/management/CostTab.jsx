import React from 'react';

const CostTab = () => {
  return (
    <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white shadow-lg shadow-blue-200">
                <p className="text-xs opacity-80 mb-1">本月总预算</p>
                <h3 className="text-2xl font-bold font-mono">¥ 150,000.00</h3>
                <div className="mt-4 flex items-center justify-between text-xs opacity-80">
                    <span>执行率: 45%</span>
                    <span>剩余: ¥ 82,500.00</span>
                </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 mb-1">已报销金额</p>
                <h3 className="text-2xl font-bold text-slate-800 font-mono">¥ 45,210.00</h3>
                <div className="mt-4 flex gap-2">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px]">待审批: 2,300</span>
                </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 mb-1">外访预支费用</p>
                <h3 className="text-2xl font-bold text-slate-800 font-mono">¥ 22,290.00</h3>
                <div className="mt-4 text-xs text-slate-400">
                    较上月环比 <span className="text-red-500 font-bold">+12%</span>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">近期费用申请</h3>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">+ 发起申请</button>
            </div>
            <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-bold text-slate-600">
                    <tr>
                        <th className="p-4">申请单号</th>
                        <th className="p-4">类型</th>
                        <th className="p-4">申请人</th>
                        <th className="p-4">关联案件/事项</th>
                        <th className="p-4">金额</th>
                        <th className="p-4">日期</th>
                        <th className="p-4">状态</th>
                        <th className="p-4">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100" data-ai-list="true">
                    <tr>
                        <td className="p-4 font-mono text-slate-500">EXP-20250128-001</td>
                        <td className="p-4">外访差旅</td>
                        <td className="p-4">王强 (外访组)</td>
                        <td className="p-4 text-slate-600">济南历下区专项外访</td>
                        <td className="p-4 font-bold text-slate-800">¥ 1,250.00</td>
                        <td className="p-4 text-slate-500">2025-01-28</td>
                        <td className="p-4"><span className="px-2 py-1 bg-amber-50 text-amber-600 rounded font-medium">审批中</span></td>
                        <td className="p-4 text-indigo-600 cursor-pointer">详情</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-mono text-slate-500">EXP-20250127-042</td>
                        <td className="p-4">诉讼费</td>
                        <td className="p-4">李丽 (法务组)</td>
                        <td className="p-4 text-slate-600">CASE-88219932</td>
                        <td className="p-4 font-bold text-slate-800">¥ 500.00</td>
                        <td className="p-4 text-slate-500">2025-01-27</td>
                        <td className="p-4"><span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded font-medium">已发放</span></td>
                        <td className="p-4 text-indigo-600 cursor-pointer">详情</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-mono text-slate-500">EXP-20250126-103</td>
                        <td className="p-4">办公用品</td>
                        <td className="p-4">行政部</td>
                        <td className="p-4 text-slate-600">季度采购</td>
                        <td className="p-4 font-bold text-slate-800">¥ 4,200.00</td>
                        <td className="p-4 text-slate-500">2025-01-26</td>
                        <td className="p-4"><span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded font-medium">已发放</span></td>
                        <td className="p-4 text-indigo-600 cursor-pointer">详情</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default CostTab;