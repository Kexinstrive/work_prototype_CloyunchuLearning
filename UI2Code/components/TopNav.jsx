import React from 'react';

const TopNav = ({ currentKey, onNavigate, isAutoMode, setIsAutoMode, setShowAutoModal }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-12 flex items-center justify-between px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-6">
        {/* Logo 与 标题 */}
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => onNavigate && onNavigate('index')}>
           <span className="font-bold text-base text-slate-800 tracking-tight hidden md:inline-block">鲸小助资管平台</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
          <NavItem 
            text="作业台" 
            icon="desktop" 
            active={currentKey === 'index'} 
            onClick={() => onNavigate && onNavigate('index')}
          />
          <NavItem 
            text="全托管" 
            icon="robot" 
            active={currentKey === 'autoMode'} 
            onClick={() => onNavigate && onNavigate('autoMode')}
          />
          <NavItem 
            text="运营中心" 
            icon="cogs" 
            active={currentKey === 'operation'} 
            onClick={() => onNavigate && onNavigate('operation')}
          />
          <NavItem 
            text="管理中心" 
            icon="chart-line" 
            active={currentKey === 'management'} 
            onClick={() => onNavigate && onNavigate('management')}
          />
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        {/* 状态控制 - 胶囊样式 */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-full border border-slate-200 flex-shrink-0">
          <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white shadow-sm text-[10px] text-slate-700 font-bold border border-slate-100 transition-all hover:shadow-md whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]"></span>
            在线
          </button>
           <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-full hover:bg-slate-200/50 text-[10px] text-slate-500 transition-colors whitespace-nowrap">
            <i className="fa fa-coffee text-[9px]"></i>
            小休
          </button>
        </div>

        {/* 全局模糊搜索框 */}
        <div className="relative group hidden xl:block">
            <input 
                type="text" 
                placeholder="搜索..." 
                className="w-40 pl-7 pr-3 py-1 text-[11px] border border-slate-200 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-slate-50/50 focus:bg-white placeholder:text-slate-400"
            />
            <i className="fa fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-[10px]"></i>
        </div>

        {/* 软电话条 */}
        <div className="flex items-center gap-0 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden h-7 group focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all hidden sm:flex">
           <div className="flex flex-col justify-center px-2 border-r border-slate-100 bg-slate-50 h-full min-w-[44px]">
              <span className="text-[7px] text-slate-400 font-medium tracking-wide scale-90 origin-left">STATUS</span>
              <span className="text-[9px] font-mono text-slate-600 font-bold leading-none">IDLE</span>
           </div>
           <input 
             type="text" 
             placeholder="拨号..." 
             className="w-20 text-[11px] border-none focus:ring-0 px-2 py-0 text-slate-700 placeholder:text-slate-300 h-full"
           />
           <div className="flex items-center px-1 gap-1">
              <button className="w-5 h-5 flex items-center justify-center rounded hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all">
                <i className="fa fa-phone transform rotate-90 text-[10px]"></i>
              </button>
           </div>
        </div>

        {/* 用户信息 */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
           <div className="flex flex-col items-end leading-tight">
              <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">工号 8021</span>
              <span className="text-[9px] text-slate-400 whitespace-nowrap">催收二组</span>
           </div>
           <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-[9px]">
             JD
           </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ text, active, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
  >
    {icon && <i className={`fa fa-${icon} text-[10px] ${active ? 'text-blue-500' : 'text-slate-400'}`}></i>}
    {text}
  </button>
);

export default TopNav;
