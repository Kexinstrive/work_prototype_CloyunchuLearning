import React from 'react';
import { MonitorCard, ProgressBar } from '../ManagementComponents';

const DashboardTab = () => {
  return (
    <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MonitorCard title="今日回收金额" value="245.8" unit="万" trend="+12%" color="blue" />
            <MonitorCard title="实时入催案件" value="1,024" unit="件" trend="+3%" color="purple" />
            <MonitorCard title="在线坐席" value="42" unit="人" trend="-2" color="emerald" />
            <MonitorCard title="今日通话时长" value="368" unit="小时" trend="+8%" color="orange" />
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">实时分案监控</h3>
                <div className="flex flex-col gap-3">
                    <ProgressBar label="M1-常规组" percent={85} color="bg-blue-500" />
                    <ProgressBar label="M2-高压组" percent={62} color="bg-orange-500" />
                    <ProgressBar label="M3-法务组" percent={40} color="bg-red-500" />
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-4">坐席状态分布</h3>
                <div className="flex items-center justify-center h-40">
                    <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                        <span className="text-xl font-bold text-slate-700">86%</span>
                        <span className="absolute text-[10px] bottom-6 text-slate-400">在线率</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default DashboardTab;