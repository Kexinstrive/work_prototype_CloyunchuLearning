import React from 'react';

// 筛选组件
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

// 筛选区域组件
export const FilterSection = ({ showBatchToggle = false, onToggleBatch, showBatchInput, batchIds, setBatchIds }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4">
       {/* 第一行：主要筛选 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <DateRangePicker label="分案开始日期" />
          <DateRangePicker label="分案截止日期" />
          <DateRangePicker label="下次跟进时间" icon="clock" />
          <SelectInput 
            label="人工打标" 
            placeholder="请选择标签" 
            options={["新案", "本人可联", "三方可联", "有线索", "失联", "半失联", "跳票", "承诺还款", "星标案件", "风险账户", "禁催案件", "机转人", "已还款", "多头贷"]} 
          />
       </div>
       
       {/* 第二行 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SelectInput label="案件类型" placeholder="请选择" options={['类型A', '类型B']} />
          <TextInput label="客户姓名" placeholder="请输入" />
          <TextInput label="客户ID" placeholder="请输入" />
          <div className="flex items-end gap-2 justify-end">
             {showBatchToggle && (
                <button 
                  onClick={onToggleBatch}
                  className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors flex items-center gap-1 ${showBatchInput ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  <i className="fa fa-list-ol"></i> 批量ID
                </button>
             )}
             <button className="px-6 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm">
                搜索
             </button>
             <button className="px-4 py-1.5 bg-white text-slate-600 text-sm font-medium rounded border border-slate-200 hover:bg-slate-50 transition-colors">
                重置
             </button>
          </div>
       </div>

       {/* 批量ID输入区域 */}
       {showBatchInput && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
             <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <i className="fa fa-layer-group text-indigo-500"></i>
                      批量案件编号筛选
                   </label>
                   <span className="text-[10px] text-slate-400">已输入 <span className="font-mono font-bold text-indigo-600">{batchIds ? batchIds.split('\n').length : 0}</span> / 10000 个</span>
                </div>
                <textarea 
                   className="w-full border border-slate-200 rounded-md p-3 text-xs font-mono h-32 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 outline-none resize-y placeholder:text-slate-300"
                   placeholder="请粘贴案件编号，支持Excel直接复制，自动识别换行符、逗号或空格..."
                   value={batchIds}
                   onChange={(e) => setBatchIds && setBatchIds(e.target.value)}
                ></textarea>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                   <i className="fa fa-info-circle"></i>
                   <span>支持跨类型混合筛选，系统将自动匹配存在的案件。</span>
                </div>
             </div>
          </div>
       )}
    </div>
);

// 辅助 UI 组件
export const MonitorCard = ({ title, value, unit, trend, color }) => (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <p className="text-xs text-slate-500">{title}</p>
        <div className="flex items-baseline gap-1 my-2">
            <span className="text-2xl font-bold text-slate-800 font-mono">{value}</span>
            <span className="text-xs text-slate-400">{unit}</span>
        </div>
        <p className={`text-xs ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend} <span className="text-slate-400">较昨日</span>
        </p>
    </div>
);

export const ProgressBar = ({ label, percent, color }) => (
    <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs">
            <span>{label}</span>
            <span className="font-mono">{percent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

export const SystemCard = ({ title, icon, desc }) => (
    <div className="bg-white p-6 rounded-lg border border-slate-200 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer group">
        <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
            <i className={`fa fa-${icon}`}></i>
        </div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
    </div>
);
