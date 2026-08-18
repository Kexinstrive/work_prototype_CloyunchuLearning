import React from 'react';

function PlanListModals(props) {
  const {
    showSortModal,
    setShowSortModal,
    sortablePlans,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleSaveSort,
    draggedIndex,
    showDispatchRecordModal,
    setShowDispatchRecordModal,
    showCopyConfirmModal,
    setShowCopyConfirmModal,
    currentCopyPlanId,
    showDisableConfirmModal,
    setShowDisableConfirmModal,
    planData,
    setPlanData,
    currentDisablePlanId,
    showImportHistoryModal,
    setShowImportHistoryModal,
  } = props;

  const handleConfirmCopy = () => {
    const sourcePlan = planData.find(plan => plan.id === currentCopyPlanId);
    if (!sourcePlan) {
      setShowCopyConfirmModal(false);
      return;
    }
    const maxNumericId = planData.reduce((max, plan) => {
      const numericId = Number(String(plan.id).replace(/[^0-9]/g, ''));
      return Number.isNaN(numericId) ? max : Math.max(max, numericId);
    }, 0);
    const maxSortOrder = planData.reduce((max, plan) => Math.max(max, plan.sortOrder || 0), 0);
    const copiedPlan = {
      ...sourcePlan,
      id: `P${maxNumericId + 1}`,
      sortOrder: maxSortOrder + 1,
      name: `${sourcePlan.name}-副本`,
      status: '草稿',
      targetText: '待下发对象',
      progressRate: 0,
      progressStats: { notStarted: 0, inProgress: 0, completed: 0, overdue: 0 },
      effectiveTime: '-',
      updateTime: '2026-07-29 10:30:00',
      dispatchObjects: [],
      dispatchTime: '-',
      executionData: null,
      trainingRecords: [],
      tasks: (sourcePlan.tasks || []).map(task => ({ ...task, status: '未开始' }))
    };
    setPlanData([copiedPlan, ...planData]);
    setShowCopyConfirmModal(false);
  };

  return (
    <>
      {/* 排序弹窗 */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black/45 z-[60] flex items-center justify-center" onClick={() => setShowSortModal(false)}>
          <div className="bg-white rounded-lg w-[600px] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">任务排序</h3>
              <button className="text-slate-400 hover:text-slate-600" onClick={() => setShowSortModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto max-h-[60vh]">
              <p className="text-xs text-slate-500 mb-4">提示：长按拖拽下方卡片可对草稿和已生效的任务进行排序。</p>
              <div className="flex flex-col gap-2">
                {sortablePlans.map((plan, index) => (
                  <div 
                    key={plan.id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-3 bg-white border rounded cursor-move transition-all ${draggedIndex === index ? 'opacity-50 border-blue-500 shadow-md scale-[1.02]' : 'border-slate-200 hover:border-blue-300'}`}
                  >
                    <i className="fas fa-grip-vertical text-slate-400"></i>
                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{plan.name}</div>
                      <div className="text-xs text-slate-500">ID: {plan.id} | 状态: {plan.status}</div>
                    </div>
                  </div>
                ))}
                {sortablePlans.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm">暂无可排序的任务（仅草稿和已生效的任务可排序）</div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 bg-white rounded hover:bg-slate-50" onClick={() => setShowSortModal(false)}>取消</button>
              <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 shadow-sm" onClick={handleSaveSort}>保存排序</button>
            </div>
          </div>
        </div>
      )}

      {/* 下发记录弹窗 */}
      {showDispatchRecordModal && (
        <div className="fixed inset-0 bg-black/45 z-[60] flex items-center justify-center" onClick={() => setShowDispatchRecordModal(false)}>
          <div className="bg-white rounded-lg w-[900px] max-h-[80vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">下发记录</h3>
              <button className="text-slate-400 hover:text-slate-600" onClick={() => setShowDispatchRecordModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex gap-3 mb-4">
                <input type="text" placeholder="搜索计划名称" className="flex-1 border border-slate-200 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-500" />
                <div className="flex items-center gap-2 border border-slate-200 rounded px-3 py-1.5 bg-white" data-ai-alt="下发时间范围筛选" data-ai-changelog-id="changelog_training_dispatch_date_range" data-ai-changelog-title="新增下发时间范围" data-ai-changelog-desc="增加下发时间范围筛选条件">
                  <input type="date" className="text-sm outline-none text-slate-600 bg-transparent" data-ai-alt="开始时间" />
                  <span className="text-slate-400">-</span>
                  <input type="date" className="text-sm outline-none text-slate-600 bg-transparent" data-ai-alt="结束时间" />
                </div>
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium">查询</button>
                <button className="px-4 py-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 rounded text-sm font-medium whitespace-nowrap" data-ai-alt="导出全部数据" data-ai-changelog-id="changelog_training_export_all_btn" data-ai-changelog-title="新增导出全部数据按钮" data-ai-changelog-desc="点击可导出当前筛选条件下的全部数据">导出全部数据</button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                    <th className="px-3 py-2 font-medium">计划名称</th>
                    <th className="px-3 py-2 font-medium">下发对象</th>
                    <th className="px-3 py-2 font-medium">下发人数</th>
                    <th className="px-3 py-2 font-medium">计划开始时间</th>
                    <th className="px-3 py-2 font-medium">计划完成期限</th>
                    <th className="px-3 py-2 font-medium">完成进度</th>
                    <th className="px-3 py-2 font-medium">数据下载</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-800">2025届新人入职催收员破冰计划</td>
                    <td className="px-3 py-3 text-slate-600">M1催收一组</td>
                    <td className="px-3 py-3 text-slate-600">45人</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">2026-07-20 09:00</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">2026-07-30 18:00</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-xs text-slate-600">65%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" data-ai-alt="下载按钮" data-ai-changelog-id="changelog_training_download_btn_1" data-ai-changelog-title="新增数据下载按钮" data-ai-changelog-desc="点击可下载该下发记录下的数据">下载</button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-800">M3组专项合规培训</td>
                    <td className="px-3 py-3 text-slate-600">法务部</td>
                    <td className="px-3 py-3 text-slate-600">32人</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">2026-07-18 09:00</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">2026-07-28 18:00</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-xs text-slate-600">100%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" data-ai-alt="下载按钮" data-ai-changelog-id="changelog_training_download_btn_2" data-ai-changelog-title="新增数据下载按钮" data-ai-changelog-desc="点击可下载该下发记录下的数据">下载</button>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-800">老员工复训计划</td>
                    <td className="px-3 py-3 text-slate-600">全体老员工</td>
                    <td className="px-3 py-3 text-slate-600">120人</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">2026-06-01 09:00</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">2026-06-30 18:00</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-xs text-slate-600">100%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium" data-ai-alt="下载按钮" data-ai-changelog-id="changelog_training_download_btn_3" data-ai-changelog-title="新增数据下载按钮" data-ai-changelog-desc="点击可下载该下发记录下的数据">下载</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
                <span>共 3 条记录</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">上一页</button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                  <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">下一页</button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex justify-end">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 bg-white rounded hover:bg-slate-50" onClick={() => setShowDispatchRecordModal(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}

      {/* 复制确认弹窗 */}
      {showCopyConfirmModal && (
        <div className="fixed inset-0 bg-black/45 z-[60] flex items-center justify-center" onClick={() => setShowCopyConfirmModal(false)}>
          <div className="bg-white rounded-lg w-[520px] overflow-hidden shadow-xl" onClick={e => e.stopPropagation()} data-ai-alt="复制确认弹窗" data-ai-changelog-id="changelog_training_plan_copy" data-ai-changelog-title="优化复制培训计划确认" data-ai-changelog-desc="复制培训计划确认弹窗明确复制范围与不复制内容，确认复制后生成名称为原计划名称-副本的新草稿计划">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">确认复制</h3>
              <button className="text-slate-400 hover:text-slate-600" onClick={() => setShowCopyConfirmModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <i className="fas fa-copy"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-700 leading-6">是否确认复制该培训计划？复制后将生成一份新的草稿计划，保留原计划的基础信息、训练内容、任务顺序和达标要求；下发对象、下发时间、执行数据和训练记录不会复制。</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-2">
              <button 
                className="px-4 py-2 rounded text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                onClick={() => setShowCopyConfirmModal(false)}
              >
                取消
              </button>
              <button 
                className="px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                onClick={handleConfirmCopy}
              >
                确认复制
              </button>
            </div>
          </div>
        </div>
      )}

      {showDisableConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-96 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-orange-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <i className="fa fa-exclamation-triangle text-orange-600"></i>
                </div>
                <h3 className="text-lg font-medium text-orange-800">停用计划确认</h3>
              </div>
              <button 
                className="text-orange-400 hover:text-orange-600 transition-colors"
                onClick={() => setShowDisableConfirmModal(false)}
              >
                <i className="fa fa-times text-lg"></i>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                您确定要停用该计划吗？
              </p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside ml-4">
                <li>停用后计划将无法下发（已下发内容不受影响）；</li>
                <li><span className="text-orange-600 font-medium">停用后不可恢复，仅可复制/查看。</span></li>
              </ul>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                className="px-4 py-2 rounded text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                onClick={() => setShowDisableConfirmModal(false)}
              >
                取消
              </button>
              <button 
                className="px-4 py-2 rounded text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-sm"
                onClick={() => {
                  setPlanData(planData.map(p => 
                    p.id === currentDisablePlanId ? { ...p, status: '已停用' } : p
                  ));
                  setShowDisableConfirmModal(false);
                }}
              >
                确认停用
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportHistoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-fadeIn">
          <div className="bg-white text-slate-900 w-[600px] rounded-lg shadow-xl overflow-hidden flex flex-col" data-knowledge-citationId="kg://1420794678174883841/2074785720783908865/2074785720863600641/2#1783507934198466_893244d7f85e0bfc_20260708185216_31">
            <div className="px-6 py-4 border-b border-slate-100 bg-white flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-800">导入历史</h3>
              <button 
                className="text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setShowImportHistoryModal(false)}
              >
                <i className="fa fa-times text-lg"></i>
              </button>
            </div>
            <div className="p-6 bg-white">
              <div className="bg-slate-50 p-4 rounded text-sm text-slate-800">
                <ul className="list-disc list-inside space-y-2">
                  <li>于2026-05-26 15:32:54批量导入， 导入失败35 <a href="#" className="text-blue-600 hover:underline ml-1">下载错误报告</a></li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                className="px-6 py-2 rounded text-sm font-medium bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors"
                onClick={() => setShowImportHistoryModal(false)}
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlanListModals;
