import React, { useState } from 'react';
import TopNav from './TopNav';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import BottomSection from './BottomSection';
import CaseQueue from './CaseQueue';
import Sidebar from './Sidebar';

const MainPage = ({ onNavigate, isAutoMode, setIsAutoMode, setShowAutoModal }) => {
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isBasicInfoShrink, setIsBasicInfoShrink] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-[#f0f2f5] overflow-hidden">
      {/* 顶部导航 */}
      <div className="flex-shrink-0">
        <TopNav currentKey="index" onNavigate={onNavigate} isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} setShowAutoModal={setShowAutoModal} />
      </div>
      
      {/* 主体布局：内容区域 + 右侧边栏 */}
      <div className="flex-1 flex overflow-hidden min-h-0">

          {/* 主体内容区域 */}
          <main className="flex-1 w-full max-w-[1920px] mx-auto p-2.5 flex flex-col min-h-0 overflow-hidden gap-2">
            
            {/* 顶部 Tab 行（仅左侧有内容，右侧留出等宽占位） */}
            <div className="flex flex-row gap-2.5 w-full flex-shrink-0">
                <div className="flex-1 min-w-0">
                    <CaseQueue />
                </div>
                {/* 右侧占位，保持右侧操作区与卡片对齐 */}
                <div className={`flex-shrink-0 transition-all duration-300 ${isRightCollapsed ? 'w-[48px]' : 'w-[356px] xl:w-[376px]'}`}></div>
            </div>

            {/* 下方卡片与操作区（顶部齐平） */}
            <div className="flex flex-row gap-2.5 w-full flex-1 min-h-0 items-stretch">
              
              {/* 左侧：主要工作区 (子tab卡片 + 作业记录) */}
              <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden gap-2">
                {/* 上半部分：顶部重要信息 + 子tab卡片区 */}
                <div className="flex-shrink-0 flex flex-col rounded-xl shadow-sm bg-white transition-all duration-300 ease-in-out overflow-hidden">
                  <LeftSection isShrink={isBasicInfoShrink} />
                </div>

                {/* 下半部分：作业记录区 */}
                <div className="flex-1 min-h-[200px] overflow-hidden rounded-xl shadow-sm bg-white">
                  <BottomSection onScrollShrink={setIsBasicInfoShrink} />
                </div>
              </div>

              {/* 右侧：操作区 */}
              <div className={`flex-shrink-0 flex flex-col transition-all duration-300 h-full ${isRightCollapsed ? 'w-[48px]' : 'w-[404px] xl:w-[424px]'}`}>
                <RightSection isCollapsed={isRightCollapsed} toggleCollapse={() => setIsRightCollapsed(!isRightCollapsed)} />
              </div>
              
            </div>

          </main>

          {/* 左侧工具栏移到最右侧 */}
          <Sidebar />
      </div>
    </div>
  );
};

export default MainPage;