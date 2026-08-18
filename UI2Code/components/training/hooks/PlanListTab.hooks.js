import { useState } from 'react';
import { initialPlanData } from '../constants/PlanListTab.constants';

// 职责：管理计划列表的全部状态与拖拽排序逻辑
// 返回：{ 所有 useState 状态与 set 方法，以及排序/拖拽/保存等 handler }
function usePlanListState() {
  const [expandedPlanId, setExpandedPlanId] = useState(null);
  const [showNewPlanDrawer, setShowNewPlanDrawer] = useState(false);
  const [planWizardStep, setPlanWizardStep] = useState(1);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [showDispatchDrawer, setShowDispatchDrawer] = useState(false);
  const [dispatchStep, setDispatchStep] = useState(1);
  const [dispatchImportType, setDispatchImportType] = useState('single');
  const [showCopyConfirmModal, setShowCopyConfirmModal] = useState(false);
  const [currentCopyPlanId, setCurrentCopyPlanId] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showDispatchRecordModal, setShowDispatchRecordModal] = useState(false);
  const [showDisableConfirmModal, setShowDisableConfirmModal] = useState(false);
  const [currentDisablePlanId, setCurrentDisablePlanId] = useState(null);
  const [showImportHistoryModal, setShowImportHistoryModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentDetailPlanId, setCurrentDetailPlanId] = useState(null);

  const [planData, setPlanData] = useState(initialPlanData);

  // 拖拽相关状态
  const [sortablePlans, setSortablePlans] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleOpenSort = () => {
    const filterPlans = planData
      .filter(p => p.status === '草稿' || p.status === '已生效')
      .sort((a, b) => a.sortOrder - b.sortOrder);
    setSortablePlans(filterPlans);
    setShowSortModal(true);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const newSortable = [...sortablePlans];
    const draggedItem = newSortable[draggedIndex];
    newSortable.splice(draggedIndex, 1);
    newSortable.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setSortablePlans(newSortable);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSaveSort = () => {
    const newPlanData = [...planData];
    const updatedMap = {};
    sortablePlans.forEach((plan, idx) => {
      updatedMap[plan.id] = idx + 1;
    });
    const nextPlans = newPlanData.map(p => {
      if (updatedMap[p.id] !== undefined) {
        return { ...p, sortOrder: updatedMap[p.id] };
      }
      return p;
    });
    setPlanData(nextPlans);
    setShowSortModal(false);
  };

  return {
    expandedPlanId, setExpandedPlanId,
    showNewPlanDrawer, setShowNewPlanDrawer,
    planWizardStep, setPlanWizardStep,
    isReadOnly, setIsReadOnly,
    showDispatchDrawer, setShowDispatchDrawer,
    dispatchStep, setDispatchStep,
    dispatchImportType, setDispatchImportType,
    showCopyConfirmModal, setShowCopyConfirmModal,
    currentCopyPlanId, setCurrentCopyPlanId,
    showSortModal, setShowSortModal,
    showDispatchRecordModal, setShowDispatchRecordModal,
    showDisableConfirmModal, setShowDisableConfirmModal,
    currentDisablePlanId, setCurrentDisablePlanId,
    showImportHistoryModal, setShowImportHistoryModal,
    showDetailModal, setShowDetailModal,
    currentDetailPlanId, setCurrentDetailPlanId,

    planData, setPlanData,
    sortablePlans, setSortablePlans,
    draggedIndex, setDraggedIndex,

    handleOpenSort,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleSaveSort,
  };
}

export default usePlanListState;
