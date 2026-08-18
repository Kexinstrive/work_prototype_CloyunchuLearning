import React from 'react';

// 卡片上的快捷工具按钮组件
export const ToolBtn = ({ icon, label, color, onClick }) => (
    <button 
        onClick={onClick}
        title={label}
        className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${color}`}
    >
        <i className={`fa fa-${icon} text-[11px]`}></i>
    </button>
);

export const FabItem = ({ icon, label, color }) => (
  <div className="flex items-center gap-2">
     <span className="bg-slate-800/90 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded shadow-sm font-medium">{label}</span>
     <button className={`w-9 h-9 rounded-full ${color} text-white shadow-md flex items-center justify-center hover:brightness-110 transition-all active:scale-95`}>
        <i className={`fa fa-${icon} text-xs`}></i>
     </button>
  </div>
);

// 简单的表单选择组件
export const FormSelect = ({ label, value, onChange, placeholder, required, labelWidth = "w-16" }) => (
   <div className="flex items-center gap-2">
      <div className={`${labelWidth} text-right flex-shrink-0`}>
         {required && <span className="text-red-500 mr-0.5">*</span>}
         <span className="text-xs text-slate-500">{label}:</span>
      </div>
      <div className="relative flex-1">
         <select 
            className="w-full appearance-none bg-white border border-slate-200 text-sm text-slate-700 py-2 pl-3 pr-8 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
            value={value}
            onChange={(e) => onChange(e.target.value)}
         >
            <option value="" disabled selected>{placeholder}</option>
            <option value="1">选项一</option>
            <option value="2">选项二</option>
         </select>
         <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
      </div>
   </div>
);

// 简单的表单输入组件
export const FormInput = ({ label, value, onChange, placeholder, required, type = "text", labelWidth = "w-16" }) => (
   <div className="flex items-center gap-2">
      <div className={`${labelWidth} text-right flex-shrink-0`}>
         {required && <span className="text-red-500 mr-0.5">*</span>}
         <span className="text-xs text-slate-500">{label}:</span>
      </div>
      <div className="relative flex-1">
         <input 
            type={type}
            className="w-full bg-white border border-slate-200 text-sm text-slate-700 py-2 pl-3 pr-3 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            placeholder={placeholder}
         />
      </div>
   </div>
);

// 简单的表单文本域组件
export const FormTextarea = ({ label, value, onChange, placeholder, required, labelWidth = "w-16" }) => (
   <div className="flex items-start gap-2">
      <div className={`${labelWidth} text-right flex-shrink-0 pt-2`}>
         {required && <span className="text-red-500 mr-0.5">*</span>}
         <span className="text-xs text-slate-500">{label}:</span>
      </div>
      <div className="relative flex-1">
         <textarea 
            className="w-full bg-white border border-slate-200 text-sm text-slate-700 p-3 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none transition-all min-h-[80px] resize-none"
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            placeholder={placeholder}
         ></textarea>
         <i className="fa fa-pen absolute right-3 bottom-3 text-[10px] text-slate-300 pointer-events-none"></i>
      </div>
   </div>
);
