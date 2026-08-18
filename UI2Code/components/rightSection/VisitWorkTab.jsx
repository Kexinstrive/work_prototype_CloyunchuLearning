import React from 'react';
import { FormSelect, FormTextarea } from './RightComponents';

const VisitWorkTab = () => {
  return (
       <div className="flex-1 flex flex-col p-3 overflow-y-auto custom-scrollbar bg-slate-50/50">
          <div className="flex flex-col gap-4 mt-1">
             <FormSelect 
               label="电话" required 
               placeholder="请选择"
               value=""
               onChange={() => {}}
             />
             <FormSelect 
               label="地址" required 
               placeholder="请选择"
               value=""
               onChange={() => {}}
             />
             <FormSelect 
               label="案件行动状态" required 
               placeholder="请选择"
               value=""
               onChange={() => {}}
               labelWidth="w-24"
             />
             <FormSelect 
               label="外访结果" required 
               placeholder="请选择"
               value=""
               onChange={() => {}}
             />
             <FormTextarea 
               label="备注" 
               placeholder=""
             />
             <div className="flex items-center gap-2">
                <div className="w-16 text-right flex-shrink-0">
                   <span className="text-red-500 mr-0.5">*</span>
                   <span className="text-xs text-slate-500">附件:</span>
                </div>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">上传文件</span>
             </div>
          </div>
          
          <div className="mt-auto pt-4 pb-2 border-t border-slate-200">
             <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold shadow-lg shadow-blue-200 transition-all">
                保存
             </button>
          </div>
       </div>
  );
};

export default VisitWorkTab;
