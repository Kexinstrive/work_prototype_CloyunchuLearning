import React from 'react';
import { ToolBtn } from './RightComponents';

const AddressWorkTab = () => {
  const addresses = [
    {
      id: 1,
      name: '陈**',
      relation: '本人',
      type: '户籍地址',
      quality: '高质量',
      address: '山东省济南市历下区经十路****号',
      source: '【用户预留】'
    },
    {
      id: 2,
      name: '陈**',
      relation: '本人',
      type: '激活地址',
      quality: '中质量',
      address: '山东省济南市历下区华能路****号',
      source: '【导入】'
    },
    {
      id: 3,
      name: '柴**',
      relation: '配偶',
      type: '居住地址',
      quality: '低质量',
      address: '山东省济南市历城区花园路****号',
      source: '【第三方修复】'
    },
    {
      id: 4,
      name: '王**',
      relation: '紧急联系人',
      type: '单位地址',
      quality: '待观察',
      address: '山东省济南市高新区舜华路****号',
      source: '【客户进线】'
    }
  ];

  const qualityStyles = {
    '高质量': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    '中质量': 'bg-blue-50 text-blue-600 border-blue-200',
    '低质量': 'bg-orange-50 text-orange-600 border-orange-200',
    '待观察': 'bg-slate-50 text-slate-600 border-slate-200',
  };

  return (
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-slate-50/50 p-2">
         {/* 地址信息列表 */}
        <div className="flex flex-col gap-1">
           <div className="flex justify-between items-center px-1 mb-2">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  地址信息 ({addresses.length})
              </h3>
              <button 
                  onClick={(e) => { e.stopPropagation(); alert('新增地址功能'); }}
                  className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 hover:shadow-sm transition-all flex items-center gap-1"
              >
                  <i className="fa fa-plus"></i> 新增地址
              </button>
           </div>
           
           <div className="flex flex-col gap-2 mt-1 animate-fadeIn" data-ai-list="true">
              {addresses.map(addr => (
                <div 
                  key={addr.id} 
                  className="group flex flex-col p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                                {addr.relation}
                            </span>
                            <span className="text-sm font-bold text-slate-800">
                                {addr.name}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] border ${qualityStyles[addr.quality]} whitespace-nowrap`}>
                                {addr.quality}
                            </span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50">
                            {addr.type}
                        </span>
                    </div>
                    
                    <div className="flex flex-col gap-1 mb-3">
                        <div className="text-xs text-slate-700 leading-relaxed">
                            {addr.address}
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                            <i className="fa fa-database text-slate-300"></i>
                            {addr.source}
                        </div>
                    </div>

                    {/* 操作按钮区 */}
                    <div className="flex items-center gap-1 pt-2 border-t border-slate-100">
                        <div className="relative group/btn">
                            <ToolBtn icon="edit" color="text-slate-500 hover:bg-slate-100" />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">修改地址</div>
                        </div>
                        
                        {addr.relation === '本人' && (
                            <>
                                <div className="relative group/btn">
                                    <ToolBtn icon="envelope" color="text-purple-500 hover:bg-purple-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">信函</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="car-side" color="text-teal-500 hover:bg-teal-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">外访</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="file-signature" color="text-blue-500 hover:bg-blue-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">外访申请</div>
                                </div>
                            </>
                        )}

                        <div className="relative group/btn">
                            <ToolBtn icon="ban" color="text-red-500 hover:bg-red-50" />
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">拉黑</div>
                        </div>
                    </div>
                </div>
              ))}
           </div>
        </div>
      </div>
  );
};

export default AddressWorkTab;
