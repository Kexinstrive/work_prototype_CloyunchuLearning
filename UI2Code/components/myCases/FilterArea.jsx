import React from 'react';
import { DateRangePicker, SelectInput, TextInput, MANUAL_TAGS } from './MyCasesComponents';

const FilterArea = ({ 
    isExpanded, 
    setIsExpanded, 
    setIsPoolModalOpen 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
       {/* 第一行：主要筛选 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <DateRangePicker label="分案开始日期" />
          <DateRangePicker label="分案截止日期" />
          <DateRangePicker label="下次跟进时间" icon="clock" />
          {/* 人工标签筛选 */}
          <SelectInput label="人工打标" placeholder="请选择标签" options={MANUAL_TAGS} />
       </div>
       
       {/* 第二行：增加年龄筛选 */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SelectInput label="案件类型" placeholder="请选择" options={['类型A', '类型B']} />
          <TextInput label="客户姓名" placeholder="请输入" />
          <TextInput label="客户ID" placeholder="请输入" />
          {/* 年龄筛选 + 反选 */}
          <div className="flex items-center gap-2">
             <span className="text-xs text-slate-500 w-24 text-right flex-shrink-0">年龄范围</span>
             <div className="flex items-center gap-1 flex-1">
                 <input className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500 text-center" placeholder="Min" type="number" />
                 <span className="text-slate-300 text-xs">-</span>
                 <input className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500 text-center" placeholder="Max" type="number" />
             </div>
             <label className="flex items-center gap-1 cursor-pointer select-none">
                 <input type="checkbox" className="rounded text-blue-600 focus:ring-0 w-3 h-3 border-slate-300" />
                 <span className="text-[10px] text-slate-500">反选</span>
             </label>
          </div>
       </div>

       {/* 按钮行 - 单独一行或自适应 */}
       <div className="flex items-end gap-2 justify-end mt-4 pt-4 border-t border-slate-100">
             <button className="px-6 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm">
                搜索
             </button>
             <button className="px-4 py-1.5 bg-white text-slate-600 text-sm font-medium rounded border border-slate-200 hover:bg-slate-50 transition-colors">
                重置
             </button>
             <button 
                onClick={() => setIsPoolModalOpen(true)}
                className="px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1"
             >
                <i className="fa fa-save"></i> 保存筛选
             </button>
             <button 
               onClick={() => setIsExpanded(!isExpanded)} 
               className="text-blue-600 text-sm flex items-center gap-1 hover:underline ml-1"
             >
                {isExpanded ? '收起' : '展开'}
                <i className={`fa fa-chevron-${isExpanded ? 'up' : 'down'} text-xs`}></i>
             </button>
       </div>

       {/* 展开的更多筛选条件 */}
       {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
              <SelectInput label="案件行动状态" placeholder="请选择" options={['状态A', '状态B']} />
              <TextInput label="批次号" placeholder="请输入" />
              <DateRangePicker label="最后处理日期" />
              <DateRangePicker label="最佳拨打时间" />
              
              <div className="col-span-1">
                 <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-24 text-right">逾期金额</span>
                    <div className="flex items-center gap-1 flex-1">
                       <input className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500" placeholder="Min" />
                       <span className="text-slate-400">-</span>
                       <input className="w-full border border-slate-200 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500" placeholder="Max" />
                    </div>
                 </div>
              </div>
          </div>
       )}
    </div>
  );
};

export default FilterArea;