import React from 'react';

const AssistantPanel = ({ setShowAssistant }) => {
  return (
      <div className="absolute top-[40px] bottom-0 left-0 right-0 bg-white z-30 flex flex-col shadow-inner animate-fadeIn">
         {/* 助手 Header */}
         <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-100 bg-indigo-50/50">
             <div className="flex items-center gap-2">
                 <i className="fa fa-robot text-indigo-600 text-sm"></i>
                 <span className="font-bold text-slate-800 text-sm">坐席助手</span>
             </div>
             <div className="flex items-center gap-3 text-xs text-slate-500">
                 <button className="hover:text-blue-600 flex items-center gap-1"><i className="fa fa-external-link-alt"></i> 小窗</button>
                 <button onClick={() => setShowAssistant(false)} className="hover:text-blue-600 flex items-center gap-1"><i className="fa fa-chevron-up"></i> 收起</button>
             </div>
         </div>
         {/* 助手 Tabs */}
         <div className="flex items-center border-b border-slate-100 px-3">
             {['沟通策略', '参考话术', '实时对话'].map((tab, idx) => (
                 <button 
                    key={tab} 
                    className={`py-2 px-1 mr-4 text-xs font-bold border-b-2 transition-colors ${idx === 0 ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                 >
                     {tab}
                 </button>
             ))}
         </div>
         {/* 助手内容区 */}
         <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
             <div className="text-xs text-slate-600 leading-relaxed mb-4">
                 <p className="mb-3 font-medium text-sm">
                     严重多头借贷; 近30天申请减免, 近7天还款, 近30天还款; 低频消费用户, 还款压力中等;
                 </p>
                 
                 <div className="mb-3">
                     <span className="text-indigo-600 font-bold block mb-1 text-sm">沟通策略:</span>
                     <p className="text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                         核身 -> 共情核资 -> 基于共债情况分析利弊 -> 穿插逾期影响 -> 约定后续沟通方式与时间 -> 礼貌挂机;
                     </p>
                 </div>

                 <div className="mb-3">
                     <span className="text-red-500 font-bold block mb-1 text-sm">施压提示点:</span>
                     <div className="flex flex-col gap-2">
                         <p>
                             <span className="font-bold text-slate-700">1. 年龄段：【中年群体】</span> 
                             涉及房贷车贷、上有老下有小; 潜在施压点: 取消分期全额、核资（暗示资产执行）、失联可能联系三方、核实地址、可能起诉。
                         </p>
                         <p>
                             <span className="font-bold text-slate-700">2. 地区：【广东】</span> 
                             商业氛围浓, 重信誉与社交面子; 潜在施压点: 核实地址、影响征信、取消分期、失联可能联系三方。
                         </p>
                     </div>
                 </div>
             </div>
             
             <div className="border-t border-slate-100 pt-3 mb-4">
                 <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-bold text-slate-700">策略推荐满意度</span>
                     <div className="flex gap-3">
                         <button className="text-slate-400 hover:text-emerald-500"><i className="far fa-thumbs-up"></i></button>
                         <button className="text-slate-400 hover:text-red-500"><i className="far fa-thumbs-down"></i></button>
                     </div>
                 </div>
             </div>
             
             <div className="border-t border-slate-100 pt-3">
                 <div className="flex items-center justify-between mb-2 cursor-pointer">
                     <span className="text-sm font-bold text-amber-600 flex items-center gap-1">
                         <i className="far fa-lightbulb"></i> 参考话术
                     </span>
                     <i className="fa fa-chevron-down text-xs text-slate-300"></i>
                 </div>
                 <div className="flex gap-2 flex-wrap">
                     <button className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:border-blue-300 hover:text-blue-600">多头借贷</button>
                     <button className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:border-blue-300 hover:text-blue-600">春节话术</button>
                     <button className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded hover:border-blue-300 hover:text-blue-600">失联修复</button>
                 </div>
             </div>
         </div>
      </div>
  );
};

export default AssistantPanel;
