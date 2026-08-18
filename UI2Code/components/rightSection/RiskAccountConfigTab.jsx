import React from 'react';

const RiskAccountConfigTab = () => {
  return (
       <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 animate-fadeIn">
          {/* 内容区 */}
          <div className="flex-1 flex flex-col p-4 overflow-y-auto custom-scrollbar gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>账户类型</label>
                  <div className="relative">
                      <select className="w-full appearance-none border border-slate-200 rounded px-3 py-2 bg-slate-50 text-slate-500 outline-none cursor-not-allowed" disabled>
                          <option>JDJR_京东白条</option>
                      </select>
                      <i className="fa fa-times-circle absolute right-8 top-1/2 -translate-y-1/2 text-slate-300"></i>
                      <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  </div>
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>停催类型</label>
                  <div className="relative">
                      <select className="w-full appearance-none border border-slate-200 rounded px-3 py-2 bg-slate-50 text-slate-500 outline-none cursor-not-allowed" disabled>
                          <option>再分期停催</option>
                      </select>
                      <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>分期总金额</label>
                  <div className="flex items-center gap-2 pt-1">
                     <span className="text-base font-medium text-slate-700">9292.96</span>
                     <span className="text-slate-400">(展示为案件应还总金额，以实际还款为准)</span>
                  </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>首付款金额</label>
                  <input type="number" className="border border-slate-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>首付款比例</label>
                  <div className="flex items-center gap-2 pt-1">
                     <span className="text-slate-700 font-medium">-</span>
                     <span className="text-slate-400">(估算值)</span>
                  </div>
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>分期期数</label>
                  <div className="relative">
                      <select className="w-full appearance-none border border-slate-200 rounded px-3 py-2 bg-white outline-none focus:border-blue-400 text-slate-600 transition-colors">
                          <option value="" disabled selected>请选择</option>
                          <option>3期</option>
                          <option>6期</option>
                          <option>12期</option>
                      </select>
                      <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"></i>
                  </div>
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">还款日</label>
                  <span className="text-slate-600 pt-1">还款日与审批通过日一致</span>
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>每月还款金额</label>
                  <input type="number" defaultValue="0" className="border border-slate-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-white transition-colors" />
                  <span className="text-slate-400 text-[10px] leading-tight">(最后一期以实际还款为准)</span>
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">截止日期</label>
                  <span className="text-slate-600 pt-1">默认为最后一个还款日当日，审批通过后可见</span>
              </div>
              <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">备注</label>
                  <textarea className="border border-slate-200 rounded px-3 py-2 outline-none focus:border-blue-400 bg-white h-24 resize-none transition-colors"></textarea>
              </div>
              <div className="flex flex-col gap-2 relative mt-2">
                  <label className="text-slate-600"><span className="text-red-500 mr-0.5">*</span>附件材料</label>
                  <div className="w-24 h-24 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 bg-white hover:bg-slate-50 cursor-pointer transition-colors relative">
                      <i className="fa fa-plus text-2xl font-light"></i>
                      {/* 水印样式背景 */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
                          <span className="transform -rotate-12 text-xs font-bold whitespace-nowrap">jd_admin 保密信息</span>
                      </div>
                  </div>
                  <span className="text-slate-500 text-[11px] leading-relaxed mt-1 break-words">
                      一次申请最多上传5个附件，只能上传jpg/png文件，且单个不超过5M
                  </span>
                  <button className="w-fit bg-[#3b82f6] text-white px-5 py-2 text-[11px] rounded shadow-sm hover:bg-blue-600 transition-colors mt-2">
                      选择资料
                  </button>
              </div>
          </div>
          
          <div className="p-3 border-t border-slate-200 bg-white flex-shrink-0 flex items-center justify-between gap-2">
             <button className="px-4 py-2 bg-blue-200/50 text-blue-500 rounded text-xs font-medium hover:bg-blue-100 transition-colors">
                 还款计划预览
             </button>
             <div className="flex gap-2">
                 <button className="px-5 py-2 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50 transition-colors">取消</button>
                 <button className="px-5 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded text-xs hover:bg-blue-100 transition-colors">保存</button>
                 <button className="px-5 py-2 bg-[#3b82f6] text-white rounded text-xs shadow-sm hover:bg-blue-700 transition-colors">确定</button>
             </div>
          </div>
       </div>
  );
};

export default RiskAccountConfigTab;
