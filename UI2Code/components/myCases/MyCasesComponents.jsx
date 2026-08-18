import React from 'react';

// 常量配置
export const MANUAL_TAGS = [
  "新案", "本人可联", "三方可联", "有线索", "失联", "半失联", "跳票", 
  "承诺还款", "星标案件", "风险账户", "禁催案件", "机转人", "已还款", "多头贷"
];

export const WARNING_GROUPS = [
  {
    title: '跟进缺失',
    collapsible: false,
    items: [
      { id: 'supervisor', name: '主管督办预警', icon: 'shield-alt', color: 'text-purple-600', activeBg: 'bg-purple-100', activeBorder: 'border-purple-300' },
      { id: 'unfollowed_7d', name: '超7天未跟进', icon: 'history', color: 'text-slate-600', activeBg: 'bg-slate-100', activeBorder: 'border-slate-300' },
      { id: 'unmanual_3d', name: '超3天未手拨', icon: 'phone-slash', color: 'text-red-600', activeBg: 'bg-red-100', activeBorder: 'border-red-300' },
      { id: 'inbound_unhandled', name: '进线未跟进', icon: 'headset', color: 'text-orange-600', activeBg: 'bg-orange-100', activeBorder: 'border-orange-300' },
      { id: 'missed', name: '三方应打未打', icon: 'user-slash', color: 'text-amber-600', activeBg: 'bg-amber-100', activeBorder: 'border-amber-300' },
      { id: 'new_clue_unhandled', name: '新线索未跟进', icon: 'lightbulb', color: 'text-cyan-600', activeBg: 'bg-cyan-100', activeBorder: 'border-cyan-300' },
    ]
  },
  {
    title: '信息更新',
    collapsible: false,
    items: [
      { id: 'new_phone', name: '有新增电话', icon: 'sim-card', color: 'text-blue-500', activeBg: 'bg-blue-100', activeBorder: 'border-blue-300' },
    ]
  },
  {
    title: '外访动态',
    collapsible: true,
    items: [
      { id: 'visit_departed', name: '外访已出发', icon: 'car-side', color: 'text-blue-600', activeBg: 'bg-blue-100', activeBorder: 'border-blue-300' },
      { id: 'visit_visiting', name: '外访中', icon: 'walking', color: 'text-indigo-600', activeBg: 'bg-indigo-100', activeBorder: 'border-indigo-300' },
      { id: 'visit_ended', name: '外访已结束', icon: 'check-circle', color: 'text-emerald-600', activeBg: 'bg-emerald-100', activeBorder: 'border-emerald-300' },
      { id: 'visit_cancelled', name: '外访取消', icon: 'ban', color: 'text-slate-500', activeBg: 'bg-slate-100', activeBorder: 'border-slate-300' },
    ]
  },
  {
    title: '信函反馈',
    collapsible: true,
    items: [
      { id: 'letter_signed', name: '函件已签收', icon: 'envelope-open-text', color: 'text-emerald-600', activeBg: 'bg-emerald-100', activeBorder: 'border-emerald-300' },
      { id: 'letter_rejected', name: '函件已拒收', icon: 'envelope', color: 'text-red-500', activeBg: 'bg-red-100', activeBorder: 'border-red-300' },
      { id: 'letter_delivering', name: '信函投递中', icon: 'shipping-fast', color: 'text-blue-500', activeBg: 'bg-blue-100', activeBorder: 'border-blue-300' },
      { id: 'letter_undelivered', name: '信函未妥投', icon: 'envelope-open', color: 'text-amber-600', activeBg: 'bg-amber-100', activeBorder: 'border-amber-300' },
    ]
  },
  {
    title: '短信动态',
    collapsible: true,
    items: [
       { id: 'sms_replied', name: '短信有回复', icon: 'comment-dots', color: 'text-emerald-600', activeBg: 'bg-emerald-100', activeBorder: 'border-emerald-300' },
    ]
  }
];

// 辅助 UI 组件
export const DateRangePicker = ({ label, icon = "calendar-alt" }) => (
   <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 w-24 text-right flex-shrink-0">{label}</span>
      <div className="flex items-center gap-1 flex-1 bg-white border border-slate-200 rounded px-2 py-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
         <i className={`fa fa-${icon} text-slate-400 text-[10px]`}></i>
         <input className="w-full text-xs outline-none text-slate-600 placeholder:text-slate-300" placeholder="开始日期" />
         <span className="text-slate-400">-</span>
         <input className="w-full text-xs outline-none text-slate-600 placeholder:text-slate-300" placeholder="结束日期" />
      </div>
   </div>
);

export const SelectInput = ({ label, placeholder, options = [] }) => (
   <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 w-24 text-right flex-shrink-0">{label}</span>
      <div className="relative flex-1">
         <select className="w-full appearance-none border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500 bg-white text-slate-600">
            <option value="" disabled selected>{placeholder}</option>
            {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
            ))}
         </select>
         <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 pointer-events-none"></i>
      </div>
   </div>
);

export const TextInput = ({ label, placeholder }) => (
   <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 w-24 text-right flex-shrink-0">{label}</span>
      <input 
         className="flex-1 border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500 transition-all placeholder:text-slate-300"
         placeholder={placeholder}
      />
   </div>
);