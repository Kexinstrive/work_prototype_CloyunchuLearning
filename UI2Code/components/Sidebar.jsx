import React from 'react';

const Sidebar = () => {
  return (
    /* 修改 border-r 为 border-l */
    <div className="w-14 bg-[#ebedf0] flex flex-col items-center py-3 gap-3 flex-shrink-0 border-l border-slate-200 h-full overflow-y-auto custom-scrollbar">
        {/* 顶部微信图标 */}
        <div className="w-10 h-10 rounded-full bg-[#9e9e9e] flex items-center justify-center text-white shadow-sm cursor-pointer hover:bg-[#8e8e8e] transition-colors mb-1">
            <i className="fab fa-weixin text-xl"></i>
        </div>

        {/* 0/4000 计数标记 (模拟图片中的红色角标效果) */}
        <div className="relative w-10 h-10 flex flex-col items-center justify-center rounded-full border-2 border-[#3b82f6] text-[#3b82f6] bg-white cursor-pointer hover:bg-blue-50">
             <i className="fa fa-comments text-lg"></i>
             <div className="absolute -top-2 -left-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full border border-white">0/4000</div>
        </div>

        {/* AI拨打 */}
        <div className="w-10 h-10 rounded-full border-2 border-[#3b82f6] text-[#3b82f6] bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 leading-none">
            <span className="text-[10px] font-bold">AI</span>
            <span className="text-[9px] scale-75">拨打</span>
        </div>

        {/* 提醒 */}
        <div className="w-10 h-10 rounded-full border-2 border-[#3b82f6] text-[#3b82f6] bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 leading-none">
            <i className="fa fa-bell text-sm mb-0.5"></i>
            <span className="text-[9px] scale-75">提醒</span>
        </div>

        <div className="w-8 h-px bg-slate-300 my-1"></div>

        {/* 上箭头 */}
        <button className="w-10 h-10 rounded-lg bg-[#3b82f6] text-white flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors">
            <i className="fa fa-chevron-up text-lg"></i>
        </button>

        {/* 解锁 (黄色锁) */}
        <button className="w-10 h-10 rounded-lg bg-[#3b82f6] flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors">
            <i className="fa fa-unlock text-[#fbbf24] text-lg"></i>
        </button>

        {/* 标签 */}
        <button className="w-10 h-10 rounded-lg bg-[#3b82f6] text-white flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors">
            <i className="fa fa-tag text-lg"></i>
        </button>

        {/* 时钟 */}
        <button className="w-10 h-10 rounded-lg bg-[#3b82f6] text-white flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors">
            <i className="fa fa-clock text-lg"></i>
        </button>

        {/* 下箭头 */}
        <button className="w-10 h-10 rounded-lg bg-[#3b82f6] text-white flex items-center justify-center shadow-sm hover:bg-blue-600 transition-colors">
            <i className="fa fa-chevron-down text-lg"></i>
        </button>

        <div className="w-8 h-px bg-slate-300 my-1"></div>

        {/* 坐席助手 */}
        <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-[#3b82f6] flex flex-col items-center justify-center shadow-sm hover:bg-slate-50 leading-tight font-bold">
            <span className="text-[10px]">坐席</span>
            <span className="text-[10px]">助手</span>
        </button>

        {/* 快捷菜单 */}
        <button className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-[#3b82f6] flex flex-col items-center justify-center shadow-sm hover:bg-slate-50 leading-tight font-bold">
            <span className="text-[10px]">快捷</span>
            <span className="text-[10px]">菜单</span>
        </button>

        {/* 底部鲸鱼吉祥物 */}
        <div className="mt-auto mb-2">
            <img 
                src="http://l-api.jd.com/relay-aigc/design/image/prompt/cute_blue_whale_mascot_logo_simple_vector_style_white_background?width=128&height=128" 
                alt="Mascot" 
                className="w-10 h-10 object-contain drop-shadow-sm"
            />
        </div>
    </div>
  );
};

export default Sidebar;