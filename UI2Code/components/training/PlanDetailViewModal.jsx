import React from 'react';

// 职责：培训计划下发列表「查看」操作的只读详情弹窗
// 展示：计划基础信息 / 训练内容配置
// 全字段只读，底部仅保留「关闭」按钮
function PlanDetailViewModal({ plan, onClose }) {
  if (!plan) return null;

  const statusStyle = (s) => {
    if (s === '已生效' || s === '已完成') return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
    if (s === '已停用' || s === '已逾期') return 'bg-red-50 text-red-600 border border-red-100';
    if (s === '草稿' || s === '未开始' || s === '待解锁') return 'bg-slate-100 text-slate-500 border border-slate-200';
    return 'bg-blue-50 text-blue-600 border border-blue-100';
  };

  // 训练内容配置：已生效/已停用计划均展示明细行，标题数量与实际行数一致
  const fallbackTaskCount = plan.contents?.find((c) => c.type === '机器人对练')?.count || 1;
  const sourceTasks = plan.tasks && plan.tasks.length > 0 ? plan.tasks : Array.from({ length: fallbackTaskCount }, (_, index) => ({
    order: index + 1,
    type: '机器人对练',
    name: `对练任务 ${index + 1}`,
    status: plan.status === '已停用' ? '已停用' : plan.status,
    condition: '按任务配置达标线'
  }));
  const contentTasks = sourceTasks.map((t) => ({
    order: t.order,
    name: t.name,
    robotType: t.type === '机器人对练' ? '标准对练机器人' : '智能陪练机器人',
    bizAccount: `${plan.businessType} / 京东金条`,
    condition: t.condition,
    status: t.status
  }));

  const baseInfo = [
    { label: '计划名称', value: plan.name },
    { label: '计划状态', value: plan.status, isStatus: true },
    { label: '业务类型', value: plan.businessType },
    { label: '计划类型', value: plan.planType },
    { label: '计划模式', value: plan.planMode },
    { label: '创建人', value: '张**（管理员）' },
    { label: '更新人', value: '张**（管理员）' },
    { label: '创建时间', value: plan.effectiveTime !== '-' ? plan.effectiveTime : '2026-07-15 09:00:00' },
    { label: '变更时间', value: plan.updateTime }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/45 z-40" onClick={onClose} data-ai-alt="遮罩层"></div>
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[880px] max-w-full bg-slate-50 flex flex-col shadow-2xl animate-slideInRight" data-ai-alt="查看详情弹窗" data-ai-changelog-id="changelog_training_plan_view" data-ai-changelog-title="查看计划" data-ai-changelog-desc="点击已生效或已停用计划的查看，打开只读详情弹窗，仅展示计划基础信息和训练内容配置；基础信息包含计划类型、计划模式、计划说明和变更时间，弹窗仅支持关闭和任务详情，不支持编辑">
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0" data-ai-alt="弹窗头部">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800">查看培训计划</h3>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${statusStyle(plan.status)}`}>{plan.status}</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-400 border border-slate-200">只读</span>
          </div>
          <button onClick={onClose} className="w-[28px] h-[28px] rounded-full text-slate-400 hover:bg-slate-100 flex items-center justify-center" data-ai-alt="关闭图标">
            <i className="fa fa-times w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="关闭符号"></i>
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4" data-ai-alt="详情内容区">
          {/* 1. 计划基础信息 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" data-ai-alt="计划基础信息卡">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
              <i className="fa fa-info-circle text-blue-500 w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="信息图标"></i>
              <span className="text-sm font-bold text-slate-700">计划基础信息</span>
            </div>
            <div className="p-5 flex flex-wrap" data-ai-list="true">
              {baseInfo.map((item) => (
                <div key={item.label} className="w-1/3 flex flex-col gap-1 py-2 pr-4">
                  <span className="text-[11px] text-slate-400">{item.label}</span>
                  {item.isStatus ? (
                    <span className={`self-start px-2 py-0.5 text-[11px] font-bold rounded-full ${statusStyle(item.value)}`}>{item.value}</span>
                  ) : (
                    <span className="text-xs font-bold text-slate-700">{item.value}</span>
                  )}
                </div>
              ))}
              <div className="w-full flex flex-col gap-1 py-2">
                <span className="text-[11px] text-slate-400">计划说明</span>
                <span className="text-xs text-slate-600 leading-relaxed">{plan.description}</span>
              </div>
            </div>
          </div>

          {/* 2. 训练内容配置 */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" data-ai-alt="训练内容配置卡" data-ai-changelog-id="plan-view-task-detail-rows" data-ai-changelog-title="查看弹窗训练内容任务明细" data-ai-changelog-desc="查看培训计划弹窗的训练内容配置区在已生效和已停用状态下均展示任务明细行，包含排序、任务名称、机器人类型、业务账户类型、达标要求、任务状态和操作，操作仅保留任务详情，并保证标题共 X 项对练任务与列表实际行数一致" data-knowledge-citationId="kg://2027723788674772994/2074339904977940482/2074339905040855041/1#1783396147396905_b35e0a1c8146b6c2_20260707114909_0">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
              <i className="fa fa-list-ol text-indigo-500 w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="列表图标"></i>
              <span className="text-sm font-bold text-slate-700">训练内容配置</span>
              <span className="text-[11px] text-slate-400">共 {contentTasks.length} 项对练任务</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" data-ai-alt="训练内容表格">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] text-slate-500">
                    <th className="px-4 py-2.5 font-medium whitespace-nowrap">排序</th>
                    <th className="px-4 py-2.5 font-medium min-w-[140px]">任务名称</th>
                    <th className="px-4 py-2.5 font-medium whitespace-nowrap">机器人类型</th>
                    <th className="px-4 py-2.5 font-medium whitespace-nowrap">业务/账户类型</th>
                    <th className="px-4 py-2.5 font-medium whitespace-nowrap">达标要求</th>
                    <th className="px-4 py-2.5 font-medium whitespace-nowrap">任务状态</th>
                    <th className="px-4 py-2.5 font-medium text-center whitespace-nowrap">操作</th>
                  </tr>
                </thead>
                <tbody className="text-xs" data-ai-list="true">
                  {contentTasks.map((t) => (
                    <tr key={t.order} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-500 font-bold">{t.order}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{t.name}</td>
                      <td className="px-4 py-3 text-slate-600">{t.robotType}</td>
                      <td className="px-4 py-3 text-slate-600">{t.bizAccount}</td>
                      <td className="px-4 py-3 text-slate-600">{t.condition}</td>
                      <td className="px-4 py-3">
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${statusStyle(t.status)}`}>{t.status}</span>
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-blue-600 hover:text-blue-800 text-[11px] font-medium" data-ai-alt="任务详情按钮">任务详情</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* 底部：仅保留关闭按钮 */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex justify-end shrink-0" data-ai-alt="弹窗底部">
          <button onClick={onClose} className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50" data-ai-alt="关闭按钮">关闭</button>
        </div>
      </div>
    </>
  );
}

export default PlanDetailViewModal;
