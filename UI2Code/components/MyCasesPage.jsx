import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import { MANUAL_TAGS } from './myCases/MyCasesComponents';
import FilterArea from './myCases/FilterArea';
import QuickViewArea from './myCases/QuickViewArea';
import CasesTable from './myCases/CasesTable';
import { 
    CreatePoolModal, 
    BatchTagModal, 
    AddToGroupModal, 
    CreateGroupModal, 
    ContextMenu 
} from './myCases/Modals';

const MyCasesPage = ({ onNavigate, groups, setGroups, isAutoMode, setIsAutoMode, setShowAutoModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  
  // 排序状态
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' });

  // 自定义案件池状态
  const [customPools, setCustomPools] = useState([
    { id: 'p1', name: 'M3高风险组', count: 124 },
    { id: 'p2', name: '本周重点跟进', count: 56 }
  ]);
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
  const [newPoolName, setNewPoolName] = useState('');
  const [activePoolId, setActivePoolId] = useState(null);

  // 批量打标状态
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedBatchTag, setSelectedBatchTag] = useState('');
  const [approvalNote, setApprovalNote] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // 预警筛选状态
  const [activeWarningFilter, setActiveWarningFilter] = useState(null);
  
  // 预警板块折叠状态
  const [warningSectionState, setWarningSectionState] = useState({
     '外访动态': true,
     '信函反馈': true,
     '短信动态': true
  });

  // 右键菜单与群组状态
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, caseId: null });
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDays, setNewGroupDays] = useState(30); // 默认30天
  
  // groups 状态已移除，改为从 props 接收

  const toggleWarningSection = (title) => {
      setWarningSectionState(prev => ({
          ...prev,
          [title]: !prev[title]
      }));
  };

  // 模拟表格数据
  const [cases, setCases] = useState([
    {
      id: 1,
      customerId: 'b2b938df59d948bb846291477b7d60ed',
      actionStatus: '无法接通',
      name: '*友',
      idCard: '370102198001011234',
      age: 43,
      overdueDays: 32,
      overdueAmount: '1,065.62',
      totalAmount: '1,065.62',
      repaidAmount: '0.00',
      lastFollowDays: 8,
      lastFollowTime: '2026-01-20 14:30',
      lastManualCallDays: 5,
      thirdPartyStatus: 'normal',
      distributeDate: '2026-01-20',
      supervisorWarning: false,
      visitStatus: 'visiting',
      tag: '风险账户'
    },
    {
      id: 2,
      customerId: '10cac51ed366449391f7819c1128bd4e',
      actionStatus: '无法接通',
      name: '**林',
      idCard: '110101199005208888',
      age: 33,
      overdueDays: 32,
      overdueAmount: '1,676.74',
      totalAmount: '1,676.74',
      repaidAmount: '500.00',
      lastFollowDays: 1,
      lastFollowTime: '2026-01-27 09:15',
      lastManualCallDays: 1,
      thirdPartyStatus: 'missed',
      distributeDate: '2026-01-28',
      supervisorWarning: true,
      inboundUnhandled: true,
      tag: '星标案件'
    },
    {
      id: 3,
      customerId: '5e00c689587f403c906299242412a1dd',
      actionStatus: '承诺还款',
      name: '**祥',
      idCard: '440304198512126666',
      age: 38,
      overdueDays: 1,
      overdueAmount: '226.65',
      totalAmount: '226.65',
      repaidAmount: '0.00',
      lastFollowDays: 61,
      lastFollowTime: '2025-11-28 10:00',
      lastManualCallDays: 61,
      thirdPartyStatus: 'normal',
      distributeDate: '2026-01-28',
      supervisorWarning: false,
      letterResult: 'signed',
      tag: '承诺还款'
    },
    {
      id: 4,
      customerId: '659b05b18985487385f872da3ff2d577',
      actionStatus: '未触达',
      name: '**林',
      idCard: '320102199508082222',
      age: 28,
      overdueDays: 1,
      overdueAmount: '247.26',
      totalAmount: '247.26',
      repaidAmount: '0.00',
      lastFollowDays: 0,
      lastFollowTime: '-',
      lastManualCallDays: 0,
      thirdPartyStatus: 'normal',
      distributeDate: '2026-01-28',
      supervisorWarning: false,
      hasNewPhone: true,
      smsStatus: 'replied',
      tag: '新案'
    },
    {
      id: 5,
      customerId: 'df1ae8ce764744578e6c07bb380b135b',
      actionStatus: '无人接听',
      name: '**泽',
      idCard: '510104198803159999',
      age: 35,
      overdueDays: 32,
      overdueAmount: '1,047.96',
      totalAmount: '1,047.96',
      repaidAmount: '100.00',
      lastFollowDays: 10,
      lastFollowTime: '2026-01-18 16:20',
      lastManualCallDays: 10,
      thirdPartyStatus: 'missed',
      distributeDate: '2026-01-15',
      supervisorWarning: false,
      visitStatus: 'departed',
      letterResult: 'delivering',
      tag: '失联'
    },
    {
      id: 6,
      customerId: 'fb4e97e1581445f592c271c4fdd6ad3d',
      actionStatus: '已结清',
      name: '**翔',
      idCard: '330106199211117777',
      age: 31,
      overdueDays: 1,
      overdueAmount: '824.18',
      totalAmount: '824.18',
      repaidAmount: '824.18',
      lastFollowDays: 122,
      lastFollowTime: '2025-09-28 11:30',
      lastManualCallDays: 122,
      thirdPartyStatus: 'normal',
      distributeDate: '2026-01-28',
      supervisorWarning: false,
      letterResult: 'rejected',
      tag: '已还款'
    },
    {
      id: 7,
      customerId: '0ee1e6f1b3bb4b4e9af9561884a43993',
      actionStatus: '默认',
      name: '**萍',
      idCard: '210202198707075555',
      age: 36,
      overdueDays: 1,
      overdueAmount: '2,327.49',
      totalAmount: '2,327.49',
      repaidAmount: '0.00',
      lastFollowDays: 0,
      lastFollowTime: '-',
      lastManualCallDays: 0,
      thirdPartyStatus: 'normal',
      distributeDate: '2026-01-28',
      supervisorWarning: false,
      visitStatus: 'cancelled',
      tag: '跳票',
      newClueUnhandled: true,
      letterResult: 'undelivered'
    }
  ]);

  // 判断预警状态
  const getWarningStatus = (item) => {
    const warnings = [];
    if (item.supervisorWarning) warnings.push('supervisor');
    if (item.lastFollowDays > 7) warnings.push('unfollowed_7d');
    if (item.lastManualCallDays > 3) warnings.push('unmanual_3d');
    if (item.inboundUnhandled) warnings.push('inbound_unhandled');
    if (item.thirdPartyStatus === 'missed') warnings.push('missed');
    if (item.newClueUnhandled) warnings.push('new_clue_unhandled');
    if (item.visitStatus === 'departed') warnings.push('visit_departed');
    if (item.visitStatus === 'visiting') warnings.push('visit_visiting');
    if (item.visitStatus === 'ended') warnings.push('visit_ended');
    if (item.visitStatus === 'cancelled') warnings.push('visit_cancelled');
    if (item.letterResult === 'signed') warnings.push('letter_signed');
    if (item.letterResult === 'rejected') warnings.push('letter_rejected');
    if (item.letterResult === 'delivering') warnings.push('letter_delivering');
    if (item.letterResult === 'undelivered') warnings.push('letter_undelivered');
    if (item.hasNewPhone) warnings.push('new_phone');
    if (item.smsStatus === 'replied') warnings.push('sms_replied');
    return warnings;
  };

  const getWarningCount = (typeId) => {
      return cases.filter(c => {
          const status = getWarningStatus(c);
          return status.includes(typeId);
      }).length;
  };

  // 新版标签样式匹配
  const getTagStyle = (tag) => {
     if (['失联', '半失联', '风险账户', '多头贷', '跳票', '禁催案件'].includes(tag)) 
        return 'bg-red-50 text-red-600 border-red-100';
     if (['本人可联', '三方可联', '承诺还款', '已还款', '有线索'].includes(tag)) 
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
     if (['新案', '星标案件', '机转人'].includes(tag)) 
        return 'bg-blue-50 text-blue-600 border-blue-100';
     return 'bg-slate-50 text-slate-500 border-slate-200';
  };

  const maskIdCard = (id) => {
    if (!id || id.length < 2) return id;
    return id[0] + '*'.repeat(id.length - 2) + id[id.length - 1];
  };

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAll = () => {
    if (selectedRows.length === displayedCases.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(displayedCases.map(c => c.id));
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
       direction = 'default';
       key = null;
    }
    setSortConfig({ key, direction });
  };

  // 案件池与标签操作
  const handleSavePool = () => {
    if (!newPoolName.trim()) return;
    const newPool = {
      id: `p${Date.now()}`,
      name: newPoolName,
      count: Math.floor(Math.random() * 200)
    };
    setCustomPools([...customPools, newPool]);
    setNewPoolName('');
    setIsPoolModalOpen(false);
    setActivePoolId(newPool.id);
  };

  const handleDeletePool = (id, e) => {
    e.stopPropagation();
    setCustomPools(customPools.filter(p => p.id !== id));
    if (activePoolId === id) setActivePoolId(null);
  };

  const handleMarkWarning = (isWarning) => {
    if (selectedRows.length === 0) return;
    const updatedCases = cases.map(c => {
      if (selectedRows.includes(c.id)) {
        return { ...c, supervisorWarning: isWarning };
      }
      return c;
    });
    setCases(updatedCases);
    setSelectedRows([]); 
  };

  // 批量打标逻辑
  const handleOpenTagModal = () => {
      if (selectedRows.length === 0) {
          alert('请先选择需要修改标签的案件');
          return;
      }
      setSelectedBatchTag('');
      setApprovalNote('');
      setIsTagModalOpen(true);
  };

  const handleSubmitTags = () => {
      if (!selectedBatchTag) return;
      const updatedCases = cases.map(c => {
          if (selectedRows.includes(c.id)) {
              return { ...c, tag: selectedBatchTag };
          }
          return c;
      });
      setCases(updatedCases);
      setIsTagModalOpen(false);
      setSelectedRows([]);
      setToastMsg(`已提交打标申请，${selectedRows.length}个案件将变更为【${selectedBatchTag}】，待上级审批`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  // 右键菜单逻辑
  const handleContextMenu = (e, caseId) => {
      e.preventDefault();
      setContextMenu({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          caseId: caseId
      });
  };

  // 关闭右键菜单监听
  useEffect(() => {
      const handleClick = () => setContextMenu({ ...contextMenu, visible: false });
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
  }, [contextMenu]);

  const handleAddToGroup = (group) => {
      if (group.status === 'expired') {
          alert('该群组已失效，请先在管理中心启用');
          return;
      }
      setToastMsg(`已将案件（ID: ${contextMenu.caseId}）添加到群组【${group.name}】`);
      setShowToast(true);
      setIsGroupModalOpen(false);
      setTimeout(() => setShowToast(false), 3000);
  };

  const handleCreateGroup = () => {
      if (!newGroupName) return;
      // 计算过期日期
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + parseInt(newGroupDays || 30));

      const newGroup = {
          id: `g${Date.now()}`,
          name: newGroupName,
          count: 1, // 初始1个
          creator: '当前用户',
          createdTime: new Date().toLocaleDateString(),
          expireDate: expireDate.toLocaleDateString(),
          status: 'active',
          shared: false
      };
      // 更新父级状态
      setGroups([newGroup, ...groups]);
      
      setToastMsg(`已新建群组【${newGroupName}】(有效期${newGroupDays}天) 并添加案件`);
      setShowToast(true);
      setIsNewGroupModalOpen(false);
      setIsGroupModalOpen(false);
      setNewGroupName('');
      setNewGroupDays(30);
      setTimeout(() => setShowToast(false), 3000);
  };

  const displayedCases = cases.filter(c => {
      if (!activeWarningFilter) return true;
      const warnings = getWarningStatus(c);
      return warnings.includes(activeWarningFilter);
  });

  return (
    /* 核心修改点：
       1. 最外层改为 h-screen 适应屏幕高度
       2. 使用 overflow-hidden 防止页面级滚动
       3. Flex 布局，主内容 flex-1 占据剩余空间
    */
    <div className="flex flex-col w-full h-screen bg-[#f0f2f5] overflow-hidden">
      <div className="flex-shrink-0">
        <TopNav currentKey="my-cases" onNavigate={onNavigate} isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} setShowAutoModal={setShowAutoModal} />
      </div>
      
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 pb-4 pt-2 flex flex-col gap-3 relative overflow-hidden">
        {/* Toast Notification */}
        {showToast && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] animate-fadeIn">
                <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <i className="fa fa-check-circle text-emerald-400"></i>
                    <span className="text-sm">{toastMsg}</span>
                </div>
            </div>
        )}

        {/* 1. 搜索区域 (固定) */}
        <div className="flex-shrink-0">
            <FilterArea 
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                setIsPoolModalOpen={setIsPoolModalOpen}
            />
        </div>

        {/* 2. 快捷查询 (固定) */}
        <div className="flex-shrink-0">
            <QuickViewArea 
                activePoolId={activePoolId}
                setActivePoolId={setActivePoolId}
                activeWarningFilter={activeWarningFilter}
                setActiveWarningFilter={setActiveWarningFilter}
                warningSectionState={warningSectionState}
                toggleWarningSection={toggleWarningSection}
                customPools={customPools}
                handleDeletePool={handleDeletePool}
                selectedRows={selectedRows}
                getWarningCount={getWarningCount}
                handleMarkWarning={handleMarkWarning}
                setIsPoolModalOpen={setIsPoolModalOpen}
            />
        </div>

        {/* 3. 统计信息条 (固定) */}
        <div className="flex items-center justify-between gap-4 flex-shrink-0">
            <div className="bg-blue-50/50 border border-blue-100 rounded px-4 py-2 flex items-center gap-2 flex-wrap text-xs text-slate-600 flex-1">
               <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    className="rounded text-blue-600 focus:ring-0 w-3.5 h-3.5 border-slate-300" 
                    checked={selectedRows.length === displayedCases.length && displayedCases.length > 0}
                    onChange={toggleAll}
                  />
                  <span>按筛选条件全部选中</span>
               </label>
               <div className="flex-1 flex justify-end items-center gap-4 text-[10px] md:text-xs">
                  <span>案件数量: <strong className="text-slate-800">{displayedCases.length} 件</strong></span>
                  <span>应还金额: <strong className="text-slate-800">8,269,859,643.31 元</strong></span>
               </div>
            </div>
            <button className="px-3 py-2 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm flex items-center gap-2 flex-shrink-0">
               <i className="fa fa-columns"></i>
               自定义列
            </button>
        </div>

        {/* 4. 数据表格 (自适应高度) 
            关键修改：flex-1 min-h-0 确保占据剩余空间并不溢出 
        */}
        <div className="flex-1 min-h-0 flex flex-col">
            <CasesTable 
                displayedCases={displayedCases}
                selectedRows={selectedRows}
                toggleAll={toggleAll}
                toggleRow={toggleRow}
                handleSort={handleSort}
                sortConfig={sortConfig}
                onNavigate={onNavigate}
                handleContextMenu={handleContextMenu}
                handleOpenTagModal={handleOpenTagModal}
                getWarningStatus={getWarningStatus}
                getTagStyle={getTagStyle}
                maskIdCard={maskIdCard}
            />
        </div>
      </main>
      
      {/* 悬浮快捷菜单 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
         <button className="flex flex-col items-center gap-1 p-2 bg-white border border-slate-200 shadow-lg rounded-l-lg text-blue-600 hover:bg-blue-50 transition-colors">
             <i className="fa fa-th-large text-lg"></i>
             <span className="text-[10px] font-medium writing-vertical-lr">快捷菜单</span>
         </button>
      </div>

      {/* 模态框集合 */}
      <CreatePoolModal 
        isOpen={isPoolModalOpen} 
        onClose={() => setIsPoolModalOpen(false)} 
        name={newPoolName} 
        setName={setNewPoolName} 
        onSave={handleSavePool} 
      />

      <BatchTagModal 
        isOpen={isTagModalOpen} 
        onClose={() => setIsTagModalOpen(false)} 
        selectedCount={selectedRows.length} 
        selectedTag={selectedBatchTag} 
        onSelectTag={setSelectedBatchTag} 
        note={approvalNote} 
        setNote={setApprovalNote} 
        onSubmit={handleSubmitTags} 
      />

      <AddToGroupModal 
        isOpen={isGroupModalOpen} 
        onClose={() => setIsGroupModalOpen(false)} 
        caseId={contextMenu.caseId} 
        groups={groups} 
        onAdd={handleAddToGroup} 
        onOpenNewGroup={() => { setIsGroupModalOpen(false); setIsNewGroupModalOpen(true); }} 
      />

      <CreateGroupModal 
        isOpen={isNewGroupModalOpen} 
        onClose={() => setIsNewGroupModalOpen(false)} 
        name={newGroupName} 
        setName={setNewGroupName} 
        days={newGroupDays} 
        setDays={setNewGroupDays} 
        onCreate={handleCreateGroup} 
      />

      <ContextMenu 
        visible={contextMenu.visible} 
        x={contextMenu.x} 
        y={contextMenu.y} 
        caseId={contextMenu.caseId} 
        onSaveGroup={() => { setIsGroupModalOpen(true); }} 
        onCopy={() => { 
            setToastMsg('单号已复制到剪贴板'); 
            setShowToast(true); 
            setTimeout(() => setShowToast(false), 2000);
        }} 
        onViewDetail={() => onNavigate('index')} 
        onClose={() => setContextMenu({ ...contextMenu, visible: false })} 
      />
    </div>
  );
};

export default MyCasesPage;