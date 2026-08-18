import React, { useState } from 'react';
import AssistantPanel from './rightSection/AssistantPanel';
import CallWorkTab from './rightSection/CallWorkTab';
import AddressWorkTab from './rightSection/AddressWorkTab';
import VisitWorkTab from './rightSection/VisitWorkTab';
import RiskAccountConfigTab from './rightSection/RiskAccountConfigTab';
import SupervisorWorkTab from './rightSection/SupervisorWorkTab';
import { FabItem } from './rightSection/RightComponents';

const RightSection = ({ isCollapsed, toggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('电话作业');
  const [showAssistant, setShowAssistant] = useState(false);
  const [memo, setMemo] = useState('');
  const [isMemoExpanded, setIsMemoExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainTabs = ['电话作业', '地址信息', '失联修复', '风险账号配置', '主管协办'];

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200 h-full flex flex-col items-center py-2 gap-2 transition-all w-[48px]">
         <button 
           onClick={toggleCollapse} 
           title="展开操作台"
           className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
         >
            <i className="fa fa-angle-double-left text-xs"></i>
         </button>
         <div className="flex-1 flex flex-col items-center gap-2">
            <button 
               onClick={() => { toggleCollapse(); setTimeout(() => setShowAssistant(true), 300); }}
               className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100" 
               title="坐席助手"
            >
               <i className="fa fa-headset text-xs"></i>
            </button>
            <div className="w-px h-4 bg-slate-200"></div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-not-allowed" title="电话">
               <i className="fa fa-phone text-xs"></i>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-not-allowed" title="短信">
               <i className="fa fa-comment text-xs"></i>
            </div>
         </div>
         <div className="writing-vertical-lr text-xs text-slate-400 font-medium tracking-widest py-2">
            操作台
         </div>
      </div>
    );
  }

  return (
    <div className="flex h-full max-h-[calc(100vh-80px)] gap-2 relative">
      <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200 overflow-hidden flex flex-col h-full relative transition-all group flex-1 min-w-0">
      
      {/* 顶部：简易案件盘 & 折叠按钮 - 紧凑 */}
      <div className="bg-slate-800 p-2 flex items-center justify-between text-white flex-shrink-0 relative z-20">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold">陈</div>
            <span className="text-xs font-bold">张佳铭</span>
            {/* 坐席助手入口 */}
            <button 
               onClick={() => setShowAssistant(!showAssistant)}
               className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] transition-colors border ${showAssistant ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-700 text-indigo-200 border-slate-600 hover:bg-slate-600 hover:text-white'}`}
               title="点击展开坐席助手"
            >
               <i className="fa fa-headset"></i>
               <span>助手</span>
            </button>
         </div>
         <div className="flex items-center gap-2">
            <div className="text-[10px] text-slate-400 font-mono">00:12:45</div>
            <button 
              onClick={toggleCollapse}
              className="text-slate-400 hover:text-white transition-colors"
              title="收起操作台"
            >
               <i className="fa fa-angle-double-right text-xs"></i>
            </button>
         </div>
      </div>

      {/* 坐席助手面板 */}
      {showAssistant && <AssistantPanel setShowAssistant={setShowAssistant} />}

      {/* Main Tabs - 可滚动 */}
      <div className="flex items-center border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
         <div className="flex overflow-x-auto custom-scrollbar" data-ai-list="true">
            {mainTabs.map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`flex-shrink-0 px-4 py-2.5 text-xs font-bold transition-colors border-b-2 ${activeTab === tab ? 'text-blue-600 border-blue-600 bg-white' : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'}`}
               >
                 {tab}
               </button>
            ))}
         </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden flex flex-col relative min-h-0">
        {activeTab === '电话作业' && <CallWorkTab memo={memo} setMemo={setMemo} />}
        {activeTab === '地址信息' && <AddressWorkTab />}
        {activeTab === '失联修复' && <VisitWorkTab />}
        {activeTab === '风险账号配置' && <RiskAccountConfigTab />}
        {activeTab === '主管协办' && <SupervisorWorkTab />}
      </div>

      {/* 底部：工作便签 (全局固定) - 向下折叠 */}
      <div className={`flex-shrink-0 border-t border-slate-200 bg-amber-50 transition-all duration-300 z-20 relative ${isMemoExpanded ? 'p-3' : 'p-0'}`}>
         {/* 标题栏 - 始终显示，作为开关 */}
         <div 
            className={`flex justify-between items-center cursor-pointer hover:bg-amber-100/50 transition-colors ${isMemoExpanded ? 'mb-2' : 'px-3 py-2'}`}
            onClick={() => setIsMemoExpanded(!isMemoExpanded)}
         >
             <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
               <i className={`fa fa-chevron-${isMemoExpanded ? 'down' : 'up'} text-amber-600`}></i>
               工作便签
               <span className="text-[10px] font-normal text-amber-600 ml-1">(随案件提交)</span>
             </span>
             {isMemoExpanded && (
                 <button 
                   className="text-[10px] text-amber-600 hover:text-amber-800 hover:bg-amber-100 px-2 py-1 rounded transition-colors" 
                   onClick={(e) => { e.stopPropagation(); setMemo(''); }}
                   title="清空便签"
                 >
                   清空
                 </button>
             )}
         </div>
         
         {/* 内容区域 - 仅展开时显示 */}
         {isMemoExpanded && (
             <textarea 
                 className="w-full h-24 bg-amber-100/50 border border-amber-200 rounded text-sm p-2 focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-200 outline-none resize-none placeholder:text-amber-400/70 text-slate-700 leading-relaxed custom-scrollbar animate-fadeIn"
                 placeholder="在此记录案件备注信息（将随作业记录一同提交）..."
                 value={memo}
                 onChange={(e) => setMemo(e.target.value)}
             />
         )}
      </div>

      {/* 悬浮菜单 (FAB) - 仅在电话作业显示 */}
      {activeTab === '电话作业' && (
        <div className="absolute bottom-[280px] right-3 z-20 flex flex-col gap-2 items-end">
          {isMenuOpen && (
             <div className="flex flex-col gap-2 animate-fadeIn mb-1">
                <FabItem icon="comment-dots" label="短信" color="bg-emerald-500" />
                <FabItem icon="file-contract" label="信函" color="bg-violet-500" />
             </div>
          )}
          <button 
             onClick={() => setIsMenuOpen(!isMenuOpen)}
             className={`w-10 h-10 rounded-full shadow-lg shadow-blue-900/20 flex items-center justify-center text-white transition-all duration-300 transform ${isMenuOpen ? 'bg-slate-700 rotate-45' : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'}`}
          >
             <i className="fa fa-plus text-sm"></i>
          </button>
        </div>
      )}
      </div>

      {/* 右侧边栏竖条 */}
      <div className="w-[52px] bg-white flex flex-col items-center py-4 flex-shrink-0 h-full overflow-y-auto overflow-x-hidden custom-scrollbar border-l border-slate-100">
         {/* 顶部：气泡/AI拨打/提醒 */} 
         <div className="flex flex-col items-center w-full gap-4 mb-4 shrink-0">
             {/* 气泡 */}
             <div className="relative cursor-pointer flex flex-col items-center justify-center">
                <div className="bg-[#f43f5e] text-white text-[10px] px-1.5 py-0.5 rounded-full scale-90 font-bold leading-none mb-1">
                    0/4000
                </div>
                <i className="fa fa-comment-dots text-slate-300 text-[20px]"></i>
             </div>
             
             {/* AI拨打 */}
             <div className="flex flex-col items-center gap-1 cursor-pointer group mt-2">
                 <div className="w-7 h-7 flex items-center justify-center text-[#3b82f6] group-hover:text-blue-700 transition-colors">
                     <i className="fa fa-robot text-[22px]"></i>
                 </div>
                 <span className="text-[11px] text-[#3b82f6] font-medium leading-tight text-center">AI<br/>拨打</span>
             </div>
             
             {/* 提醒 */}
             <div className="flex flex-col items-center gap-1 cursor-pointer group">
                 <div className="w-7 h-7 flex items-center justify-center text-[#3b82f6] group-hover:text-blue-700 transition-colors">
                     <i className="fa fa-bell text-[20px]"></i>
                 </div>
                 <span className="text-[11px] text-[#3b82f6] font-medium">提醒</span>
             </div>
         </div>

         {/* 中部：快捷蓝色按钮组 */}
         <div className="flex flex-col gap-1.5 w-full shrink-0">
             <button className="w-9 h-9 shrink-0 mx-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-[6px] flex items-center justify-center transition-colors text-[16px] shadow-sm" title="上移"><i className="fa fa-chevron-up"></i></button>
             <button className="w-9 h-9 shrink-0 mx-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-[6px] flex items-center justify-center transition-colors text-[16px] shadow-sm" title="解锁"><i className="fa fa-lock"></i></button>
             <button className="w-9 h-9 shrink-0 mx-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-[6px] flex items-center justify-center transition-colors text-[16px] shadow-sm" title="标签"><i className="fa fa-tag"></i></button>
             <button className="w-9 h-9 shrink-0 mx-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-[6px] flex items-center justify-center transition-colors text-[16px] shadow-sm" title="时钟"><i className="fa fa-clock"></i></button>
             <button className="w-9 h-9 shrink-0 mx-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-[6px] flex items-center justify-center transition-colors text-[16px] shadow-sm" title="刷新"><i className="fa fa-sync-alt"></i></button>
             <button className="w-9 h-9 shrink-0 mx-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-[6px] flex items-center justify-center transition-colors text-[16px] shadow-sm" title="下移"><i className="fa fa-chevron-down"></i></button>
         </div>

         {/* 底部：辅助菜单组 */}
         <div className="flex flex-col gap-2.5 mt-auto w-full pt-6 shrink-0">
             <button className="w-9 shrink-0 mx-auto py-1.5 border border-[#3b82f6] rounded-[6px] text-[#3b82f6] bg-white hover:bg-blue-50 text-[11px] font-medium leading-tight flex flex-col items-center justify-center transition-colors">
                <span>坐席</span>
                <span>助手</span>
             </button>
             <button className="w-9 shrink-0 mx-auto py-1.5 border border-[#3b82f6] rounded-[6px] text-[#3b82f6] bg-white hover:bg-blue-50 text-[11px] font-medium leading-tight flex flex-col items-center justify-center transition-colors">
                <span>快捷</span>
                <span>菜单</span>
             </button>
         </div>
      </div>
    </div>
  );
};

export default RightSection;
