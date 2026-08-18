import React from 'react';
import { FormTextarea } from './RightComponents';

const SupervisorWorkTab = () => {
  return (
       <div className="flex-1 flex flex-col p-3 overflow-y-auto custom-scrollbar bg-slate-50/50">
          <div className="flex flex-col gap-4 mt-1">
             <FormTextarea 
               label="备注" required 
               placeholder=""
             />
          </div>
          
          <div className="mt-auto pt-4 pb-2 border-t border-slate-200">
             <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold shadow-lg shadow-blue-200 transition-all">
                保存
             </button>
          </div>
       </div>
  );
};

export default SupervisorWorkTab;
