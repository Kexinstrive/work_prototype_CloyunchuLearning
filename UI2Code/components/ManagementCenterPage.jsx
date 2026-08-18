import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';

// 引入拆分后的子组件
import DashboardTab from './management/DashboardTab';
import StrategyTab from './management/StrategyTab';
import GroupsTab from './management/GroupsTab';
import ApprovalTab from './management/ApprovalTab';
import CostTab from './management/CostTab';
import ReportTab from './management/ReportTab';
import SystemTab from './management/SystemTab';
import AutoModeConfigTab from './management/AutoModeConfigTab';

const ManagementCenterPage = ({ onNavigate, groups, setGroups, isAutoMode, setIsAutoMode, setShowAutoModal }) => {
  // 多标签页状态管理
  const [tabs, setTabs] = useState([
    { id: 'home', name: '管理大厅', icon: 'th-large', isHome: true, closable: false }
  ]);
  const [activeTabId, setActiveTabId] = useState('home');
  
  // groups 状态已移除，改为从 props 接收

  // 右键菜单状态
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, caseId: null });
  const [isAddToGroupModalOpen, setIsAddToGroupModalOpen] = useState(false);

  const modules = [
    { id: 'dashboard', name: '实时监控', icon: 'desktop', desc: '核心指标实时数据大屏', color: 'blue' },
    { id: 'strategy', name: '智能分案', icon: 'chess-knight', desc: '分案规则配置与自动化执行', color: 'indigo' },
    { id: 'groups', name: '案件群组', icon: 'layer-group', desc: '自定义案件集合与共享协作', color: 'cyan' },
    { id: 'approval', name: '审批中心', icon: 'stamp', desc: '减免、停催、留案等业务审批', color: 'purple' },
    { id: 'cost', name: '费用中心', icon: 'wallet', desc: '外访、诉讼及日常运营成本管理', color: 'emerald' },
    { id: 'report', name: '业绩报表', icon: 'chart-bar', desc: '团队及个人业绩统计分析', color: 'orange' },
    { id: 'system', name: '系统管理', icon: 'cog', desc: '用户、角色、权限与字典配置', color: 'slate' },
    { id: 'autoConfig', name: '全托管配置', icon: 'robot', desc: '坐席全托管模式批量配置与管理', color: 'blue' }
  ];

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const currentModule = modules.find(m => m.id === activeTabId);

  // 处理右键点击
  const handleContextMenu = (e, caseId) => {
      e.preventDefault();
      setContextMenu({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          caseId: caseId
      });
  };

  // 关闭右键菜单
  useEffect(() => {
      const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
  }, [contextMenu]);

  // 打开新标签页
  const handleOpenModule = (module) => {
    const existingTab = tabs.find(t => t.id === module.id);
    if (!existingTab) {
      setTabs([...tabs, { ...module, closable: true }]);
    }
    setActiveTabId(module.id);
  };

  // 关闭标签页
  const handleCloseTab = (e, tabId) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleAddToGroup = (groupId) => {
     // 模拟添加
     alert(`已将案件（ID: ${contextMenu.caseId}）添加到群组。`);
     setIsAddToGroupModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f1f5f9]">
      <TopNav currentKey="management" onNavigate={onNavigate} isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} setShowAutoModal={setShowAutoModal} />
      
      {/* 浏览器风格标签栏 */}
      <div className="bg-[#e2e8f0] px-2 pt-2 flex items-end gap-1 overflow-x-auto border-b border-slate-300 flex-shrink-0">
          {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs font-bold cursor-pointer transition-all select-none min-w-[120px] max-w-[200px] ${
                    activeTabId === tab.id 
                    ? 'bg-white text-blue-600 shadow-[0_-1px_2px_rgba(0,0,0,0.05)] z-10' 
                    : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                }`}
              >
                  <i className={`fa fa-${tab.icon} ${activeTabId === tab.id ? 'text-blue-500' : 'text-slate-400'}`}></i>
                  <span className="truncate flex-1">{tab.name}</span>
                  {tab.closable && (
                      <button 
                        onClick={(e) => handleCloseTab(e, tab.id)}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                          <i className="fa fa-times text-[10px]"></i>
                      </button>
                  )}
                  {/* 分隔线 */}
                  {activeTabId !== tab.id && (
                      <div className="absolute right-0 top-2 bottom-2 w-px bg-slate-300/50"></div>
                  )}
              </div>
          ))}
      </div>
      
      <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-hidden bg-white flex flex-col">
         {/* 1. 管理大厅 (Home) */}
         {activeTabId === 'home' && (
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
               <div className="max-w-7xl mx-auto">
                  <div className="mb-6">
                      <h2 className="text-xl font-bold text-slate-800">管理控制台</h2>
                      <p className="text-sm text-slate-500 mt-1">集中化管理系统配置与业务决策</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
                      {modules.map(module => (
                          <div 
                              key={module.id} 
                              onClick={() => handleOpenModule(module)}
                              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all group flex flex-col h-40 relative overflow-hidden"
                          >
                              <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity bg-${module.color}-50 rounded-bl-3xl`}>
                                   <i className={`fa fa-${module.icon} text-6xl text-${module.color}-600`}></i>
                              </div>
                              <div className={`w-12 h-12 rounded-lg bg-${module.color}-50 text-${module.color}-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                                  <i className={`fa fa-${module.icon}`}></i>
                              </div>
                              <h3 className="font-bold text-slate-800 mb-2">{module.name}</h3>
                              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{module.desc}</p>
                              <div className="mt-auto flex justify-between items-center">
                                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 transition-colors">进入管理</span>
                                  <i className="fa fa-arrow-right text-xs text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"></i>
                              </div>
                          </div>
                      ))}
                  </div>
               </div>
            </div>
         )}

         {/* 2. 具体模块内容 */}
         {activeTabId !== 'home' && currentModule && (
             <div className="flex-1 flex flex-col h-full overflow-hidden animate-fadeIn">
                 {/* Header */}
                 <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-lg bg-${currentModule.color}-50 border border-${currentModule.color}-100 flex items-center justify-center text-${currentModule.color}-600`}>
                          <i className={`fa fa-${currentModule.icon} text-lg`}></i>
                       </div>
                       <div>
                          <h1 className="text-lg font-bold text-slate-800">{currentModule.name}</h1>
                          <p className="text-xs text-slate-500">{currentModule.desc}</p>
                       </div>
                    </div>
                 </div>

                 {/* Body - 使用子组件 */}
                 <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                    {activeTabId === 'dashboard' && <DashboardTab />}
                    
                    {activeTabId === 'strategy' && <StrategyTab handleContextMenu={handleContextMenu} />}
                    
                    {activeTabId === 'groups' && (
                        <GroupsTab 
                            groups={groups} 
                            setGroups={setGroups} 
                            handleAddToGroup={handleAddToGroup} 
                        />
                    )}
                    
                    {activeTabId === 'approval' && <ApprovalTab />}
                    
                    {activeTabId === 'cost' && <CostTab />}
                    
                    {activeTabId === 'report' && <ReportTab />}
                    
                    {activeTabId === 'system' && <SystemTab />}
                    
                    {activeTabId === 'autoConfig' && <AutoModeConfigTab />}
                 </div>
             </div>
         )}
      </main>

      {/* 模态框：添加到群组 (右键触发) */}
      {isAddToGroupModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
                 <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                     <h3 className="font-bold text-slate-800">添加到案件群组</h3>
                     <button onClick={() => setIsAddToGroupModalOpen(false)} className="absolute right-4 text-slate-400 hover:text-slate-600">
                         <i className="fa fa-times"></i>
                     </button>
                 </div>
                 <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                     {groups.map(group => (
                         <div 
                             key={group.id} 
                             onClick={() => handleAddToGroup(group.id)}
                             className={`flex items-center justify-between p-3 rounded-lg group transition-colors border border-transparent ${
                                 group.status === 'expired' ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-cyan-50 cursor-pointer hover:border-cyan-100'
                             }`}
                         >
                             <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded flex items-center justify-center ${
                                     group.status === 'expired' ? 'bg-slate-100 text-slate-300' : 'bg-slate-100 text-slate-400 group-hover:bg-cyan-200 group-hover:text-cyan-700'
                                 }`}>
                                     <i className="fa fa-layer-group"></i>
                                 </div>
                                 <div>
                                     <h4 className="text-sm font-bold text-slate-700 group-hover:text-cyan-700">{group.name}</h4>
                                     <p className="text-xs text-slate-400 flex items-center gap-2">
                                         {group.count} 个案件
                                         {group.status === 'expired' && <span className="text-red-500 font-bold px-1 bg-red-50 rounded">已失效</span>}
                                     </p>
                                 </div>
                             </div>
                             {group.status !== 'expired' && <i className="fa fa-plus text-slate-300 group-hover:text-cyan-600"></i>}
                         </div>
                     ))}
                     {/* 为了简化，这里点击新建群组暂不实现跳转，或者可以引导用户去群组Tab */}
                 </div>
             </div>
          </div>
      )}

      {/* 右键菜单 DOM */}
      {contextMenu.visible && (
          <div 
              className="fixed bg-white border border-slate-200 shadow-xl rounded-lg py-1 z-[9999] w-40 animate-fadeIn"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={(e) => e.stopPropagation()}
          >
              <div className="px-3 py-2 border-b border-slate-50 mb-1">
                  <span className="text-xs text-slate-400 block">案件操作</span>
                  <span className="text-xs font-bold text-slate-700">{contextMenu.caseId}</span>
              </div>
              <button 
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 flex items-center gap-2"
                  onClick={() => { setContextMenu({...contextMenu, visible: false}); setIsAddToGroupModalOpen(true); }}
              >
                  <i className="fa fa-folder-plus w-4"></i> 存为群组
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <i className="fa fa-copy w-4"></i> 复制单号
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <i className="fa fa-external-link-alt w-4"></i> 查看详情
              </button>
          </div>
      )}
    </div>
  );
};

export default ManagementCenterPage;
