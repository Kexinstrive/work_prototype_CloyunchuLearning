import React, { useState } from 'react';
import { FilterSection } from '../ManagementComponents';

const GroupsTab = ({ groups, setGroups, handleAddToGroup }) => {
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isShareGroupModalOpen, setIsShareGroupModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [newGroupData, setNewGroupData] = useState({ name: '', desc: '', days: 30 });
  
  // 分享配置状态
  const [shareConfig, setShareConfig] = useState({ userId: '', permission: 'view', days: 7 });
  
  // 高级分案功能状态 (新建群组时使用)
  const [showBatchInput, setShowBatchInput] = useState(false);
  const [batchIds, setBatchIds] = useState('');

  // UI 交互状态
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // 显示 Toast
  const triggerToast = (msg) => {
      setToastMsg(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  // 打开分享模态框并重置状态
  const openShareModal = (group) => {
      setCurrentGroup(group);
      setShareConfig({ userId: '', permission: 'view', days: 7 });
      setIsShareGroupModalOpen(true);
  };

  // 群组操作逻辑
  const handleCreateGroup = () => {
      if (!newGroupData.name) return;
      setIsLoading(true);
      
      setTimeout(() => {
          const expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + parseInt(newGroupData.days || 30));

          const newGroup = {
              id: `g${Date.now()}`,
              name: newGroupData.name,
              count: 0,
              creator: '当前用户',
              createdTime: new Date().toLocaleDateString(),
              expireDate: expireDate.toLocaleDateString(),
              status: 'active',
              shared: false
          };
          setGroups([newGroup, ...groups]);
          setIsCreateGroupModalOpen(false);
          setNewGroupData({ name: '', desc: '', days: 30 });
          setIsLoading(false);
          triggerToast(`群组【${newGroup.name}】创建成功`);
      }, 600);
  };

  const handleDeleteGroup = (id, e) => {
      e.stopPropagation();
      if(window.confirm('确定要删除该群组吗？此操作不可恢复。')) {
          setGroups(groups.filter(g => g.id !== id));
          triggerToast('群组已删除');
      }
  };

  const handleEnableGroup = (id, e) => {
      e.stopPropagation();
      // 重新启用，默认续期30天
      const newExpireDate = new Date();
      newExpireDate.setDate(newExpireDate.getDate() + 30);
      
      const updatedGroups = groups.map(g => {
          if (g.id === id) {
              return { ...g, status: 'active', expireDate: newExpireDate.toLocaleDateString() };
          }
          return g;
      });
      setGroups(updatedGroups);
      triggerToast('群组已重新启用，有效期已延长30天');
  };

  const handleShareGroup = () => {
      if (!shareConfig.userId) return;
      setIsLoading(true);

      setTimeout(() => {
          // 模拟分享
          const updatedGroups = groups.map(g => {
              if (g.id === currentGroup.id) return { ...g, shared: true };
              return g;
          });
          setGroups(updatedGroups);
          setIsShareGroupModalOpen(false);
          setIsLoading(false);
          triggerToast(`已成功将群组分享给 ${shareConfig.userId}`);
      }, 800);
  };

  return (
    <div className="flex flex-col gap-4 animate-fadeIn relative">
        {/* Toast Notification */}
        {showToast && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] animate-fadeIn">
                <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <i className="fa fa-check-circle text-emerald-400"></i>
                    <span className="text-sm">{toastMsg}</span>
                </div>
            </div>
        )}

        {/* 顶部工具栏 */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input 
                        type="text" 
                        className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs w-64 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100 transition-all"
                        placeholder="搜索群组名称 / 创建人"
                        value={groupSearchQuery}
                        onChange={(e) => setGroupSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <button 
                onClick={() => setIsCreateGroupModalOpen(true)}
                className="px-4 py-2 bg-cyan-600 text-white text-xs font-bold rounded-lg hover:bg-cyan-700 shadow-sm flex items-center gap-2"
            >
                <i className="fa fa-plus"></i> 新建群组
            </button>
        </div>

        {/* 群组列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groups.filter(g => g.name.includes(groupSearchQuery)).map(group => (
                <div 
                    key={group.id} 
                    className={`bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all group relative ${group.status === 'expired' ? 'border-red-100 opacity-75' : 'border-slate-200'}`}
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${group.status === 'expired' ? 'bg-red-50 text-red-500' : 'bg-cyan-50 text-cyan-600'}`}>
                            <i className="fa fa-layer-group"></i>
                        </div>
                        <div className="flex items-center gap-1">
                            {group.status === 'expired' ? (
                                <button 
                                    onClick={(e) => handleEnableGroup(group.id, e)}
                                    className="px-2 py-1 bg-white border border-red-200 text-red-600 text-[10px] rounded hover:bg-red-50 font-bold z-20"
                                >
                                    启用
                                </button>
                            ) : (
                                <>
                                    {group.shared && (
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">已分享</span>
                                    )}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); openShareModal(group); }}
                                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                                        title="分享群组"
                                    >
                                        <i className="fa fa-share-alt text-xs"></i>
                                    </button>
                                </>
                            )}
                            
                            <button 
                                onClick={(e) => handleDeleteGroup(group.id, e)}
                                className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <i className="fa fa-trash text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <h3 className={`font-bold text-sm mb-1 line-clamp-1 ${group.status === 'expired' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {group.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                        包含 {group.count} 个案件 
                        {group.status === 'expired' && <span className="text-red-500 font-bold ml-2">(已失效)</span>}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-50 pt-3">
                        <div className="flex items-center gap-1.5">
                            <i className="fa fa-user-circle"></i>
                            <span>{group.creator}</span>
                        </div>
                        <span className={group.status === 'expired' ? 'text-red-400' : ''}>
                            {group.status === 'expired' ? `失效于 ${group.expireDate}` : `有效期至 ${group.expireDate}`}
                        </span>
                    </div>
                    
                    {/* 点击区域覆盖 */}
                    <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => alert(`进入群组详情：${group.name}`)}></div>
                    {/* 按钮区域提升z-index */}
                    <div className="absolute top-4 right-4 z-10 w-32 h-8 pointer-events-none"></div>
                </div>
            ))}
            {/* 快捷新建卡片 */}
            <button 
                onClick={() => setIsCreateGroupModalOpen(true)}
                className="bg-slate-50 rounded-xl border border-slate-200 border-dashed p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-100 hover:border-cyan-300 transition-all text-slate-400 hover:text-cyan-600"
            >
                <i className="fa fa-plus-circle text-2xl"></i>
                <span className="text-xs font-bold">新建群组</span>
            </button>
        </div>

        {/* 模态框：新建群组 */}
        {isCreateGroupModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-center bg-slate-50 relative">
                        <h3 className="font-bold text-slate-800">新建案件群组</h3>
                        <button onClick={() => setIsCreateGroupModalOpen(false)} className="absolute right-6 text-slate-400 hover:text-slate-600">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col gap-6">
                            {/* 1. 基础信息 */}
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <h4 className="font-bold text-slate-700 text-sm mb-3">基础信息</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-600">群组名称 <span className="text-red-500">*</span></label>
                                        <input 
                                            className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:border-cyan-500 outline-none"
                                            placeholder="请输入群组名称..."
                                            value={newGroupData.name}
                                            onChange={(e) => setNewGroupData({...newGroupData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-600">有效期 (天) <span className="text-red-500">*</span></label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="number"
                                                min="1"
                                                max="30"
                                                className="flex-1 border border-slate-200 rounded px-3 py-2 text-xs focus:border-cyan-500 outline-none"
                                                placeholder="最大30天"
                                                value={newGroupData.days}
                                                onChange={(e) => {
                                                    let val = parseInt(e.target.value);
                                                    if (val > 30) val = 30;
                                                    if (val < 1) val = 1;
                                                    setNewGroupData({...newGroupData, days: val});
                                                }}
                                            />
                                            <span className="text-xs text-slate-400 whitespace-nowrap">天后失效</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 col-span-2">
                                        <label className="text-xs font-bold text-slate-600">群组描述</label>
                                        <input 
                                            className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:border-cyan-500 outline-none"
                                            placeholder="可选，输入描述备注..."
                                            value={newGroupData.desc}
                                            onChange={(e) => setNewGroupData({...newGroupData, desc: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 2. 筛选加入案件 (复用筛选器) */}
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm mb-3">筛选加入案件 (可选)</h4>
                                <FilterSection 
                                    showBatchToggle={true} 
                                    onToggleBatch={() => setShowBatchInput(!showBatchInput)} 
                                    showBatchInput={showBatchInput}
                                    batchIds={batchIds}
                                    setBatchIds={setBatchIds}
                                />
                                <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700 flex items-center gap-2">
                                    <i className="fa fa-info-circle"></i>
                                    <span>当前筛选条件预计将加入 1,245 个案件到该群组</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
                        <button 
                            onClick={() => setIsCreateGroupModalOpen(false)} 
                            className="px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-50"
                        >
                            取消
                        </button>
                        <button 
                            onClick={handleCreateGroup}
                            disabled={!newGroupData.name || isLoading}
                            className="px-6 py-2 bg-cyan-600 text-white rounded text-xs font-bold hover:bg-cyan-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading && <i className="fa fa-spinner fa-spin"></i>}
                            确认创建
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* 模态框：分享群组 (增强版) */}
        {isShareGroupModalOpen && currentGroup && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                        <h3 className="font-bold text-slate-800">分享群组: {currentGroup.name}</h3>
                        <button onClick={() => setIsShareGroupModalOpen(false)} className="absolute right-4 text-slate-400 hover:text-slate-600">
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-col gap-4 mb-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">分享对象 (仅限管理员) <span className="text-red-500">*</span></label>
                                <select 
                                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:border-cyan-500 outline-none bg-white text-slate-600"
                                    value={shareConfig.userId}
                                    onChange={(e) => setShareConfig({...shareConfig, userId: e.target.value})}
                                >
                                    <option value="" disabled>请选择分享对象</option>
                                    <option value="张主管 (M1组)">张主管 (M1组)</option>
                                    <option value="李经理 (法务)">李经理 (法务)</option>
                                    <option value="王总监 (运营)">王总监 (运营)</option>
                                </select>
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">分享有效期 (天)</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number"
                                        min="1"
                                        max="30"
                                        className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                                        value={shareConfig.days}
                                        onChange={(e) => {
                                            let val = parseInt(e.target.value);
                                            if (val > 30) val = 30;
                                            if (val < 1) val = 1;
                                            setShareConfig({...shareConfig, days: val});
                                        }}
                                    />
                                    <span className="text-xs text-slate-400">天</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">权限设置</label>
                                <div className="flex gap-4">
                                    <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded border flex-1 transition-all ${shareConfig.permission === 'view' ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                                        <input 
                                            type="radio" 
                                            name="permission" 
                                            checked={shareConfig.permission === 'view'}
                                            onChange={() => setShareConfig({...shareConfig, permission: 'view'})}
                                            className="text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-xs font-bold">仅查看</span>
                                    </label>
                                    <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded border flex-1 transition-all ${shareConfig.permission === 'edit' ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                                        <input 
                                            type="radio" 
                                            name="permission" 
                                            checked={shareConfig.permission === 'edit'}
                                            onChange={() => setShareConfig({...shareConfig, permission: 'edit'})}
                                            className="text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-xs font-bold">可编辑</span>
                                    </label>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1">
                                    {shareConfig.permission === 'view' ? '对方仅可查看群组内的案件列表，无法增删' : '对方拥有完整权限，可增加或移除案件'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end border-t border-slate-100 pt-3">
                            <button 
                                onClick={() => setIsShareGroupModalOpen(false)} 
                                className="px-4 py-1.5 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                            >
                                取消
                            </button>
                            <button 
                                onClick={handleShareGroup} 
                                disabled={!shareConfig.userId || isLoading}
                                className="px-4 py-1.5 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
                            >
                                {isLoading && <i className="fa fa-spinner fa-spin"></i>}
                                确认分享
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default GroupsTab;