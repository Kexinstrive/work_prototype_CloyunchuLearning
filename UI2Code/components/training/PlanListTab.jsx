import React from 'react';
import usePlanListState from './hooks/PlanListTab.hooks';
import DispatchDrawer from './DispatchDrawer';
import PlanWizardDrawer from './PlanWizardDrawer';
import PlanListModals from './PlanListModals';
import PlanDetailViewModal from './PlanDetailViewModal';

const PlanListTab = () => {
    const {
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
        handleSaveSort
    } = usePlanListState();

    const SortLabel = ({ children }) => (
        <span className="inline-flex items-center gap-1 cursor-pointer select-none">
            {children}
            <i className="fa fa-sort text-[10px] text-slate-300"></i>
        </span>
    );

    const handleSaveDraftPlan = (selectedTasks) => {
        const nextIndex = planData.length + 1;
        const nextPlan = {
            id: `P${nextIndex}`,
            sortOrder: nextIndex,
            name: '新人专项对练草稿计划',
            businessType: '内催',
            planMode: '闯关模式',
            planType: '新人培训',
            status: '草稿',
            description: '保存后先进入草稿状态，确认内容后可在列表中点击下发。',
            targetText: '待下发对象',
            progressRate: 0,
            progressStats: { notStarted: 0, inProgress: 0, completed: 0, overdue: 0 },
            effectiveTime: '-',
            updateTime: '2026-07-29 10:00:00',
            contents: [{ type: '机器人对练', count: selectedTasks.length }],
            tasks: selectedTasks.map((task, idx) => ({
                order: idx + 1,
                type: task.t,
                name: task.n,
                status: '未开始',
                condition: task.requirement?.type === 'none' ? '无要求' : `分值≥${task.requirement?.score || task.score}`
            }))
        };
        setPlanData([nextPlan, ...planData]);
        setPlanWizardStep(1);
        setShowNewPlanDrawer(false);
    };

    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            {/* 顶部操作与筛选区 */}
            <div className="flex justify-end gap-2" data-ai-alt="顶部操作栏" data-ai-changelog-id="changelog_training_top_actions" data-ai-changelog-title="提取顶部操作按钮" data-ai-changelog-desc="将新建、排序、记录按钮提至筛选区上方">
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors" onClick={() => { setShowNewPlanDrawer(true); setIsReadOnly(false); setPlanWizardStep(1); }}>新建培训计划</button>
                <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors" onClick={() => setShowDispatchRecordModal(true)} data-ai-alt="下发记录按钮">下发记录</button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-wrap items-end gap-4" data-ai-alt="筛选栏" data-ai-changelog-id="changelog_training_plan_filter" data-ai-changelog-title="更新筛选栏字段" data-ai-changelog-desc="筛选栏增加下发对象、调整使用状态并增加筛选重置按钮">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                    <label className="text-xs font-bold text-slate-700">关键词搜索</label>
                    <input type="text" placeholder="请输入计划名称" className="w-full border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">业务类型</label>
                    <select className="w-28 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                        <option>全部</option><option>通用</option><option>内催</option><option>委外</option><option>商单</option><option>在案</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">计划类型</label>
                    <select className="w-32 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                        <option>全部类型</option><option>通用</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">使用状态</label>
                    <select className="w-28 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                        <option>全部状态</option><option>草稿</option><option>已生效</option><option>已停用</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700">下发对象</label>
                    <select className="w-28 border border-slate-200 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white">
                        <option>全部对象</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button className="px-5 py-1.5 bg-blue-600 text-white rounded text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors" data-ai-alt="筛选查询按钮">查询</button>
                    <button className="px-5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors" data-ai-alt="重置按钮">重置</button>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <i className="fa fa-info-circle"></i>
                    <span data-ai-alt="核心原则提示文案" data-ai-changelog-id="changelog_training_core_rule_tip" data-ai-changelog-title="修改核心原则提示" data-ai-changelog-desc="更新文案明确下发前后的可操作权限"><strong>核心原则：</strong>培训内容必须组合进计划后统一下发；计划下发前可编辑，计划下发后不可修改内容。已生效计划可查看配置及数据、继续下发、复制或停用；已停用计划仅可查看和复制。</span>
                </div>
            </div>

            {/* 计划列表表格视图 */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse" data-ai-alt="培训计划列表" data-ai-changelog-id="changelog_training_plan_table_view" data-ai-changelog-title="列表切换为表格视图" data-ai-changelog-desc="将培训计划列表卡片视图切换为表格，并调整列头显示">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>ID</SortLabel></th>
                            <th className="px-4 py-3 font-medium min-w-[150px]"><SortLabel>计划名称</SortLabel></th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>计划状态</SortLabel></th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>业务类型</SortLabel></th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>计划类型</SortLabel></th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>计划模式</SortLabel></th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>内容构成</SortLabel></th>
                            <th className="px-4 py-3 font-medium whitespace-nowrap"><SortLabel>变更时间</SortLabel></th>
                            <th className="px-4 py-3 font-medium min-w-[200px]"><SortLabel>下发完成数据</SortLabel></th>
                            <th className="px-4 py-3 font-medium text-center whitespace-nowrap">操作</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm" data-ai-alt="计划数据" data-ai-list="true" data-ai-changelog-id="training-plan-disabled-reason-tooltip" data-ai-changelog-title="已停用计划原因提示" data-ai-changelog-desc="培训计划列表新增存在已停用任务示例，老员工复训计划与存在已停用任务计划均为已停用状态，鼠标悬停状态标签分别提示操作人点击停用和计划包含已停用任务">
                        {planData.map(plan => {
                            const totalPeople = plan.progressStats.notStarted + plan.progressStats.inProgress + plan.progressStats.completed + plan.progressStats.overdue;
                            const robotCount = plan.contents.find(c => c.type === '机器人对练')?.count || 0;
                            const isExpanded = expandedPlanId === plan.id;

                            return (
                                <React.Fragment key={plan.id}>
                                    <tr 
                                        className={`border-b border-slate-100 hover:bg-blue-50/50 cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50/30' : ''}`}
                                        onClick={() => setExpandedPlanId(isExpanded ? null : plan.id)}
                                    >
                                        <td className="px-4 py-3 text-slate-500 font-mono text-xs">{plan.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-bold text-slate-800 line-clamp-2" title={plan.name}>{plan.name}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span title={plan.status === '已停用' ? plan.disableReason : ''} data-ai-alt="计划状态" className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                                                plan.status === '已生效' ? 'bg-emerald-50 text-emerald-600' : 
                                                plan.status === '已停用' ? 'bg-red-50 text-red-600 cursor-help' :
                                                'bg-slate-100 text-slate-500'
                                            }`}>
                                                {plan.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-700">{plan.businessType}</td>
                                        <td className="px-4 py-3 text-slate-700">{plan.planType}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${plan.planMode === '闯关模式' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                                {plan.planMode}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-indigo-600 font-bold text-xs">
                                            {robotCount} 个对练
                                        </td>
                                        <td className="px-4 py-3 text-slate-500 text-xs">{plan.updateTime}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="text-slate-600">完成 <strong className="text-slate-800">{plan.progressStats.completed}</strong>/{totalPeople}</span>
                                                    <span className="text-blue-600 font-bold">{plan.progressRate}%</span>
                                                </div>
                                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden w-full">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${plan.progressRate}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                {plan.status === '草稿' && (
                                                    <>
                                                        <button className="text-slate-600 hover:text-blue-600 text-xs font-medium" onClick={(e) => { e.stopPropagation(); setShowNewPlanDrawer(true); setPlanWizardStep(1); setIsReadOnly(false); }} data-ai-alt="编辑计划按钮">编辑</button>
                                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" onClick={() => { setShowDispatchDrawer(true); setDispatchStep(1); }} data-ai-alt="下发计划按钮">下发</button>
                                                        <button className="text-slate-600 hover:text-slate-800 text-xs font-medium" onClick={() => { setCurrentCopyPlanId(plan.id); setShowCopyConfirmModal(true); }} data-ai-alt="复制计划按钮">复制</button>
                                                        <button className="text-slate-600 hover:text-red-600 text-xs font-medium" data-ai-alt="删除计划按钮">删除</button>
                                                    </>
                                                )}
                                                {(plan.status === '已生效') && (
                                                    <>
                                                        <button className="text-slate-600 hover:text-blue-600 text-xs font-medium" onClick={(e) => { e.stopPropagation(); setCurrentDetailPlanId(plan.id); setShowDetailModal(true); }} data-ai-alt="查看按钮">查看</button>
                                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" onClick={() => { setShowDispatchDrawer(true); setDispatchStep(1); }} data-ai-alt="下发计划按钮">下发</button>
                                                        <button className="text-slate-600 hover:text-slate-800 text-xs font-medium" onClick={() => { setCurrentCopyPlanId(plan.id); setShowCopyConfirmModal(true); }} data-ai-alt="复制计划按钮">复制</button>
                                                        <button className="text-slate-600 hover:text-orange-600 text-xs font-medium" onClick={(e) => { e.stopPropagation(); setCurrentDisablePlanId(plan.id); setShowDisableConfirmModal(true); }} data-ai-alt="停用计划按钮"
                                                        data-ai-changelog-id="changelog_training_operation_buttons" data-ai-changelog-title="调整操作列按钮" data-ai-changelog-desc="按状态(草稿/已生效/已停用)重新规划列表操作按钮展示逻辑">停用</button>
                                                    </>
                                                )}
                                                {plan.status === '已停用' && (
                                                    <>
                                                        <button className="text-slate-600 hover:text-blue-600 text-xs font-medium" onClick={(e) => { e.stopPropagation(); setCurrentDetailPlanId(plan.id); setShowDetailModal(true); }} data-ai-alt="查看按钮">查看</button>
                                                        <button className="text-slate-600 hover:text-slate-800 text-xs font-medium" onClick={() => { setCurrentCopyPlanId(plan.id); setShowCopyConfirmModal(true); }} data-ai-alt="复制计划按钮">复制</button>
                                                    </>
                                                )}
                                                <i className={`fa fa-chevron-${isExpanded ? 'up' : 'down'} text-slate-400 ml-1`}></i>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* 展开的详情行 */}
                                    {isExpanded && (
                                        <tr className="bg-slate-50">
                                            <td colSpan="10" className="p-0 border-b border-slate-200">
                                                <div className="p-4 flex gap-4 animate-fadeIn border-t border-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                                                    {/* 左侧：任务顺序 */}
                                                    <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                                        <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                                                            <i className="fa fa-list-ol text-blue-500"></i> 任务学习顺序
                                                        </h4>
                                                        <div className="flex flex-col gap-3">
                                                            {plan.tasks.map((task, idx) => (
                                                                <div key={idx} className="flex items-center gap-3">
                                                                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                                                                        {task.order}
                                                                    </div>
                                                                    <div className="flex-1 flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-slate-100">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">{task.type}</span>
                                                                            <span className="text-xs font-bold text-slate-800">{task.name}</span>
                                                                        </div>
                                                                        <span className="text-[10px] text-slate-500">达标要求: {task.condition}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* 右侧：说明与机器人数据页签 */}
                                                    <div className="flex-1 flex flex-col gap-4">
                                                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                                            <h4 className="font-bold text-slate-800 text-sm mb-2">计划说明</h4>
                                                            <p className="text-xs text-slate-600 leading-relaxed">{plan.description}</p>
                                                        </div>
                                                        
                                                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-1">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <h4 className="font-bold text-indigo-700 text-sm flex items-center gap-2">
                                                                    <i className="fa fa-robot"></i> 机器人训练数据
                                                                </h4>
                                                                <div className="text-[10px] text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                                                                    包含 {robotCount} 个对练任务
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col gap-1">
                                                                    <span className="text-[10px] text-slate-500">场均得分</span>
                                                                    <span className="text-lg font-bold text-indigo-600">85.6 <span className="text-xs font-normal text-slate-400">分</span></span>
                                                                </div>
                                                                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col gap-1">
                                                                    <span className="text-[10px] text-slate-500">对练通关率</span>
                                                                    <span className="text-lg font-bold text-emerald-600">72.4%</span>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 text-xs text-indigo-600 cursor-pointer hover:underline flex justify-end">
                                                                查看详细对练报表 <i className="fa fa-angle-right ml-1"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* 新建计划抽屉 */}
            {/* 下发抽屉 */}
            <DispatchDrawer
                showDispatchDrawer={showDispatchDrawer}
                setShowDispatchDrawer={setShowDispatchDrawer}
                dispatchStep={dispatchStep}
                setDispatchStep={setDispatchStep}
                dispatchImportType={dispatchImportType}
                setDispatchImportType={setDispatchImportType}
                setShowImportHistoryModal={setShowImportHistoryModal}
            />

            {showNewPlanDrawer && (
                <PlanWizardDrawer
                    showNewPlanDrawer={showNewPlanDrawer}
                    setShowNewPlanDrawer={setShowNewPlanDrawer}
                    planWizardStep={planWizardStep}
                    setPlanWizardStep={setPlanWizardStep}
                    isReadOnly={isReadOnly}
                    onSaveDraftPlan={handleSaveDraftPlan}
                />
            )}

            {/* 其他模态框 */}
            <PlanListModals
                showSortModal={showSortModal}
                setShowSortModal={setShowSortModal}
                sortablePlans={sortablePlans}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDragEnd={handleDragEnd}
                handleSaveSort={handleSaveSort}
                draggedIndex={draggedIndex}
                showDispatchRecordModal={showDispatchRecordModal}
                setShowDispatchRecordModal={setShowDispatchRecordModal}
                showCopyConfirmModal={showCopyConfirmModal}
                setShowCopyConfirmModal={setShowCopyConfirmModal}
                currentCopyPlanId={currentCopyPlanId}
                showDisableConfirmModal={showDisableConfirmModal}
                setShowDisableConfirmModal={setShowDisableConfirmModal}
                planData={planData}
                setPlanData={setPlanData}
                currentDisablePlanId={currentDisablePlanId}
                showImportHistoryModal={showImportHistoryModal}
                setShowImportHistoryModal={setShowImportHistoryModal}
            />

            {/* 查看只读详情弹窗 */}
            {showDetailModal && (
                <PlanDetailViewModal
                    plan={planData.find(p => p.id === currentDetailPlanId)}
                    onClose={() => { setShowDetailModal(false); setCurrentDetailPlanId(null); }}
                />
            )}
        </div>
    );
};
export default PlanListTab;
