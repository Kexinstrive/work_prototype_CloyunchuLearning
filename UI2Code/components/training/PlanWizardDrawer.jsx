import React from 'react';

function PlanWizardDrawer(props) {
  const {
    showNewPlanDrawer, // 父级已做条件渲染
    setShowNewPlanDrawer,
    planWizardStep,
    setPlanWizardStep,
    isReadOnly,
    onSaveDraftPlan,
  } = props;

  const selectedTasks = [
    { id: 1, t: '机器人对练', n: '破冰沟通演练', score: 60, requirementType: 'score' },
    { id: 2, t: '机器人对练', n: '高风险客户沟通', score: 80, requirementType: 'score' },
    { id: 3, t: '机器人对练', n: '极端情绪安抚', score: 85, requirementType: 'none' }
  ];
  const [taskRequirements, setTaskRequirements] = React.useState(() => selectedTasks.reduce((acc, item) => ({ ...acc, [item.id]: { type: item.requirementType, score: item.score } }), {}));
  const handleRequirementTypeChange = (taskId, type) => {
    setTaskRequirements(prev => ({ ...prev, [taskId]: { ...prev[taskId], type } }));
  };
  const handleSavePlan = () => {
    if (onSaveDraftPlan) {
      onSaveDraftPlan(selectedTasks.map(item => ({ ...item, requirement: taskRequirements[item.id] })));
      return;
    }
    setShowNewPlanDrawer(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-[700px] bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-bold text-slate-800 text-lg">{isReadOnly ? '查看培训计划' : '新建培训计划'}</h3>
          <button onClick={() => setShowNewPlanDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"><i className="fa fa-times text-lg"></i></button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex items-center px-8 py-6 border-b border-slate-100 shrink-0">
            {[1, 2].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${planWizardStep >= step ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                    {planWizardStep > step ? <i className="fa fa-check"></i> : step}
                  </div>
                  <span className={`text-xs font-bold ${planWizardStep >= step ? 'text-blue-600' : 'text-slate-400'}`}>
                    {step === 1 ? '基础信息' : '内容与顺序'}
                  </span>
                </div>
                {idx < 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${planWizardStep > step ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="p-8 flex-1">
            {planWizardStep === 1 && (
              <div className="flex flex-col gap-5 animate-fadeIn">
                <div className="bg-blue-50 text-blue-600 p-3 rounded text-xs mb-2"><i className="fa fa-info-circle mr-1"></i>首先，为这个培训容器定义基础属性。</div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>计划名称</label>
                  <input type="text" disabled={isReadOnly} placeholder="例如：2025届新人破冰计划" className={`border border-slate-200 rounded px-3 py-2 focus:border-blue-500 outline-none w-full ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>业务类型</label>
                    <select disabled={isReadOnly} data-ai-alt="业务类型配置" data-ai-changelog-id="changelog_training_plan_biz_type_cfg" data-ai-changelog-title="新增业务类型配置" data-ai-changelog-desc="在新建计划中增加业务类型选择" className={`border border-slate-200 rounded px-3 py-2 focus:border-blue-500 outline-none w-full ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white'}`}>
                      <option>通用</option><option>内催</option><option>委外</option><option>商单</option><option>在案</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>计划类型</label>
                    <select disabled={isReadOnly} className={`border border-slate-200 rounded px-3 py-2 focus:border-blue-500 outline-none w-full ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white'}`}>
                      <option>通用</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-slate-700"><span className="text-red-500 mr-1">*</span>计划模式</label>
                    <select disabled={isReadOnly} data-ai-alt="计划模式配置" data-ai-changelog-id="changelog_training_plan_mode" data-ai-changelog-title="修改计划模式配置" data-ai-changelog-desc="将必修/选修改为自由模式/闯关模式选项" className={`border border-slate-200 rounded px-3 py-2 focus:border-blue-500 outline-none w-full ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white'}`}>
                      <option>闯关模式</option><option>自由模式</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">计划说明</label>
                  <textarea disabled={isReadOnly} className={`border border-slate-200 rounded px-3 py-2 focus:border-blue-500 outline-none w-full h-24 resize-none ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`} placeholder="请输入计划背景、目标等说明..."></textarea>
                </div>
              </div>
            )}

            {planWizardStep === 2 && (
              <div className="flex flex-col gap-6 animate-fadeIn">
                <div className="flex flex-col gap-4" data-ai-alt="内容选择" data-ai-changelog-id="training-plan-task-wording" data-ai-changelog-title="统一对练任务文案" data-ai-changelog-desc="新建培训计划第 2 步内容与顺序中，将对练场景统一调整为对练任务，并将提示文案与选择按钮同步改为对练任务">
                  <div className="bg-orange-50 text-orange-600 p-3 rounded text-xs mb-2" data-ai-alt="任务提示">
                    <i className="fa fa-lightbulb-o mr-1 w-[12px] h-[12px] inline-flex items-center justify-center" data-ai-alt="提示图标"></i>
                    从任务配置库中选取需要组合进本计划的机器人对练任务，并设定学习/解锁顺序。
                  </div>
                  <div className="flex flex-wrap gap-3" data-ai-alt="选择区域" data-ai-list="true">
                    <div className={`border rounded-lg p-4 flex flex-col items-center gap-2 transition-all ${isReadOnly ? 'border-slate-200 opacity-50 cursor-not-allowed bg-slate-50' : 'border-slate-200 cursor-pointer hover:border-blue-500 hover:shadow-md'}`} data-ai-alt="选择任务">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500" data-ai-alt="新增图标"><i className="fa fa-plus w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="加号图标"></i></div>
                      <span className="text-sm font-bold text-slate-700" data-ai-alt="按钮文案">选择对练任务</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-slate-100 pt-6" data-ai-alt="内容编排" data-ai-changelog-id="changelog_training_plan_req" data-ai-changelog-title="统一为达标要求" data-ai-changelog-desc="将解锁要求替换为达标要求，并限制输入分值">
                  <h4 className="font-bold text-sm text-slate-800" data-ai-alt="编排标题">已选内容与顺序编排 (3)</h4>
                  <div className="flex flex-col gap-3" data-ai-alt="已选列表" data-ai-list="true" data-ai-changelog-id="training-plan-requirement-type" data-ai-changelog-title="达标要求类型选择" data-ai-changelog-desc="已选任务列表保留拖拽排序、序号、任务类型、任务名称、达标要求和删除结构，达标要求支持无要求与分值大于等于 X 两种类型，选择无要求时隐藏分值输入框">
                    {selectedTasks.map((item, i) => {
                      const requirement = taskRequirements[item.id] || { type: item.requirementType, score: item.score };
                      return (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded bg-white shadow-sm hover:border-blue-300 transition-colors" data-ai-alt="任务行">
                          {!isReadOnly && <div className="cursor-move text-slate-300 hover:text-blue-500" data-ai-alt="拖拽排序"><i className="fa fa-bars w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="拖拽图标"></i></div>}
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0" data-ai-alt="任务序号">{item.id}</div>
                          <div className="w-20 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded text-center shrink-0" data-ai-alt="任务类型">{item.t}</div>
                          <div className="font-bold text-sm text-slate-800 w-40 truncate" title={item.n} data-ai-alt="任务名称" data-ai-clip="true">{item.n}</div>
                          <div className="flex-1 flex items-center gap-2" data-ai-alt="达标要求">
                            <span data-ai-alt="要求标签" className="text-xs text-slate-500 whitespace-nowrap">达标要求:</span>
                            <select disabled={isReadOnly} value={requirement.type} onChange={(e) => handleRequirementTypeChange(item.id, e.target.value)} className={`w-28 border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-500 ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white'}`} data-ai-alt="要求类型">
                              <option value="none">无要求</option>
                              <option value="score">分值 ≥ X</option>
                            </select>
                            {requirement.type === 'score' && <input type="number" disabled={isReadOnly} min="0" max="100" value={requirement.score} onChange={(e) => setTaskRequirements(prev => ({ ...prev, [item.id]: { ...prev[item.id], score: e.target.value } }))} className={`w-20 border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-500 ${isReadOnly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}`} data-ai-alt="分值输入" />}
                          </div>
                          {!isReadOnly && <button className="text-slate-300 hover:text-red-500 w-8 h-8 rounded flex items-center justify-center transition-colors" data-ai-alt="删除任务"><i className="fa fa-trash w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="删除图标"></i></button>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
          <button 
            onClick={() => setShowNewPlanDrawer(false)}
            className="px-6 py-2 rounded font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            取消
          </button>
          <div className="flex gap-3">
            {planWizardStep > 1 && (
              <button 
                onClick={() => setPlanWizardStep(s => s - 1)}
                className="px-6 py-2 border border-slate-200 bg-white rounded font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                上一步
              </button>
            )}
            {planWizardStep < 2 ? (
              <button 
                onClick={() => setPlanWizardStep(s => s + 1)}
                className="px-8 py-2 bg-blue-600 text-white rounded font-bold shadow-md hover:bg-blue-700 transition-colors"
              >
                下一步
              </button>
            ) : (
              !isReadOnly && (
                <button 
                  onClick={handleSavePlan}
                  className="px-8 py-2 bg-emerald-600 text-white rounded font-bold shadow-md hover:bg-emerald-700 transition-colors"
                  data-ai-alt="保存计划"
                  data-ai-changelog-id="training-plan-save-draft"
                  data-ai-changelog-title="保存计划生成草稿"
                  data-ai-changelog-desc="新建培训计划点击保存计划后生成草稿计划，后续在培训计划列表中通过下发操作完成下发"
                >
                  保存计划
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanWizardDrawer;
