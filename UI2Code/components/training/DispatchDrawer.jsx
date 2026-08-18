import React from 'react';

function DispatchDrawer({
  showDispatchDrawer,
  setShowDispatchDrawer,
  dispatchStep,
  setDispatchStep,
  dispatchImportType,
  setDispatchImportType,
  setShowImportHistoryModal
}) {
  const [planStartTime, setPlanStartTime] = React.useState('2026-07-20T09:00');
  const [planEndTime, setPlanEndTime] = React.useState('2026-07-30T18:00');
  const [timeError, setTimeError] = React.useState('');
  const [objectAddType, setObjectAddType] = React.useState('department');
  const isTimeInvalid = Boolean(planStartTime && planEndTime && new Date(planEndTime).getTime() < new Date(planStartTime).getTime());
  const handleNextStep = () => {
    if (isTimeInvalid) {
      setTimeError('计划完成期限不可早于计划开始时间');
      return;
    }
    setTimeError('');
    setDispatchStep(s => s + 1);
  };

  if (!showDispatchDrawer) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-[700px] bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-bold text-slate-800 text-lg">下发培训计划</h3>
          <button onClick={() => setShowDispatchDrawer(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"><i className="fa fa-times text-lg"></i></button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex items-center px-8 py-6 border-b border-slate-100 shrink-0">
            {[1, 2].map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${dispatchStep >= step ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                    {dispatchStep > step ? <i className="fa fa-check"></i> : step}
                  </div>
                  <span className={`text-xs font-bold ${dispatchStep >= step ? 'text-blue-600' : 'text-slate-400'}`}>
                    {step === 1 ? '下发配置' : '发布确认'}
                  </span>
                </div>
                {idx < 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${dispatchStep > step ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="p-8 flex-1">
            {dispatchStep === 1 && (
              <div className="flex flex-col gap-6 animate-fadeIn">
                {/* 时间配置模块 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden" data-ai-alt="时间配置" data-ai-changelog-id="training-dispatch-time-datetime" data-ai-changelog-title="下发时间精确到时分" data-ai-changelog-desc="下发培训计划的计划开始时间和计划完成期限改为日期时间选择器，支持选择到具体时分，并校验完成期限不可早于开始时间">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200" data-ai-alt="时间标题">
                    <h4 className="font-bold text-slate-800 text-sm" data-ai-alt="标题文本">1. 时间配置</h4>
                  </div>
                  <div className="p-4 flex flex-wrap gap-6" data-ai-alt="时间表单">
                    <div className="flex-1 min-w-[260px] flex flex-col gap-2" data-ai-alt="开始时间">
                      <label className="font-bold text-sm text-slate-700" data-ai-alt="开始标签">
                        计划开始时间 <span className="text-red-500" data-ai-alt="必填标识">*</span>
                      </label>
                      <input type="datetime-local" value={planStartTime} onChange={(e) => { setPlanStartTime(e.target.value); setTimeError(''); }} className="border border-slate-200 rounded px-3 py-2 text-sm w-full outline-none focus:border-blue-500" data-ai-alt="开始选择" />
                    </div>
                    <div className="flex-1 min-w-[260px] flex flex-col gap-2" data-ai-alt="完成期限">
                      <label className="font-bold text-sm text-slate-700" data-ai-alt="期限标签">
                        计划完成期限 <span className="text-red-500" data-ai-alt="必填标识">*</span>
                      </label>
                      <input type="datetime-local" value={planEndTime} onChange={(e) => { setPlanEndTime(e.target.value); setTimeError(''); }} className={`border rounded px-3 py-2 text-sm w-full outline-none focus:border-blue-500 ${isTimeInvalid || timeError ? 'border-red-300 bg-red-50/40' : 'border-slate-200'}`} data-ai-alt="期限选择" />
                    </div>
                    {(isTimeInvalid || timeError) && <div className="w-full text-xs text-red-500" data-ai-alt="时间校验">计划完成期限不可早于计划开始时间</div>}
                  </div>
                </div>

                {/* 下发对象模块 */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h4 className="font-bold text-slate-800 text-sm">2. 下发对象</h4>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-6 mb-4">
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input type="radio" name="importType" checked={dispatchImportType === 'single'} onChange={() => setDispatchImportType('single')} className="w-4 h-4 text-blue-600" />
                        单个导入
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input type="radio" name="importType" checked={dispatchImportType === 'batch'} onChange={() => setDispatchImportType('batch')} className="w-4 h-4 text-blue-600" />
                        批量导入
                      </label>
                    </div>

                    {dispatchImportType === 'single' ? (
                      <div className="flex flex-col gap-4 border border-slate-100 p-4 rounded bg-slate-50/50" data-ai-alt="单个导入" data-ai-changelog-id="training-dispatch-object-list" data-ai-changelog-title="下发对象添加与列表字段" data-ai-changelog-desc="下发对象单个导入支持按部门添加和按个人添加切换，列表标题改为已选对象列表，表格字段调整为对象名称、对象类型、账号或部门编码、所属部门和操作">
                        <div className="flex flex-col gap-3" data-ai-alt="添加区域">
                          <div className="flex items-center gap-2" data-ai-alt="添加切换">
                            <button onClick={() => setObjectAddType('department')} className={`px-3 py-1.5 rounded text-xs font-bold border ${objectAddType === 'department' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`} data-ai-alt="按部门">按部门添加</button>
                            <button onClick={() => setObjectAddType('person')} className={`px-3 py-1.5 rounded text-xs font-bold border ${objectAddType === 'person' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`} data-ai-alt="按个人">按个人添加</button>
                          </div>
                          <div className="flex items-end gap-4" data-ai-alt="搜索行">
                            <div className="flex-1 flex flex-col gap-1" data-ai-alt="搜索表单">
                              <span className="text-xs text-slate-500" data-ai-alt="搜索说明">{objectAddType === 'department' ? '部门搜索' : '人员搜索'}</span>
                              <div className="flex gap-2" data-ai-alt="输入组合">
                                {objectAddType === 'department' ? <input type="text" placeholder="请输入企业/部门名称搜索" className="border border-slate-200 rounded px-3 py-2 text-sm flex-1 outline-none focus:border-blue-500" data-ai-alt="部门搜索" /> : <input type="text" placeholder="请输入人员 pin 号搜索" className="border border-slate-200 rounded px-3 py-2 text-sm flex-1 outline-none focus:border-blue-500" data-ai-alt="人员搜索" />}
                                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded text-sm font-bold border border-blue-100 hover:bg-blue-100" data-ai-alt="添加至列表">添加至列表</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border border-slate-200 rounded bg-white overflow-hidden" data-ai-alt="对象列表">
                          <div className="flex justify-between items-center p-2 bg-slate-50 border-b border-slate-200 text-xs" data-ai-alt="列表标题">
                            <span className="text-slate-600 font-bold ml-2" data-ai-alt="标题文案">已选对象列表 (45 个对象)</span>
                            <button className="text-red-500 hover:text-red-600 mr-2" data-ai-alt="移除全部">移除全部</button>
                          </div>
                          <div className="max-h-[150px] overflow-y-auto" data-ai-alt="表格滚动">
                            <table className="w-full text-sm text-left" data-ai-alt="对象表格">
                              <thead className="bg-slate-50 text-slate-500 text-xs sticky top-0" data-ai-alt="表格头部">
                                <tr data-ai-alt="表头行">
                                  <th className="py-2 px-4 font-normal" data-ai-alt="对象名称">对象名称</th>
                                  <th className="py-2 px-4 font-normal" data-ai-alt="对象类型">对象类型</th>
                                  <th className="py-2 px-4 font-normal" data-ai-alt="对象编码">账号/部门编码</th>
                                  <th className="py-2 px-4 font-normal" data-ai-alt="所属部门">所属部门</th>
                                  <th className="py-2 px-4 font-normal w-16" data-ai-alt="操作列">操作</th>
                                </tr>
                              </thead>
                              <tbody data-ai-alt="表格内容">
                                <tr className="border-t border-slate-100 hover:bg-slate-50" data-ai-alt="部门行">
                                  <td className="py-2 px-4 text-slate-800" data-ai-alt="部门名称">M1 催收一组</td>
                                  <td className="py-2 px-4 text-slate-500" data-ai-alt="部门类型">部门</td>
                                  <td className="py-2 px-4 text-slate-500" data-ai-alt="部门编码">DPT-M1-01</td>
                                  <td className="py-2 px-4 text-slate-500" data-ai-alt="上级部门">运营中心 / 催收部</td>
                                  <td className="py-2 px-4" data-ai-alt="删除格">
                                    <button className="text-red-500 hover:text-red-600" data-ai-alt="删除对象"><i className="fa fa-trash-alt w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="删除图标"></i></button>
                                  </td>
                                </tr>
                                <tr className="border-t border-slate-100 hover:bg-slate-50" data-ai-alt="人员行">
                                  <td className="py-2 px-4 text-slate-800" data-ai-alt="人员名称">陈*</td>
                                  <td className="py-2 px-4 text-slate-500" data-ai-alt="人员类型">人员</td>
                                  <td className="py-2 px-4 text-slate-500" data-ai-alt="人员账号">chen***</td>
                                  <td className="py-2 px-4 text-slate-500" data-ai-alt="人员部门">M1 催收一组</td>
                                  <td className="py-2 px-4" data-ai-alt="删除格">
                                    <button className="text-red-500 hover:text-red-600" data-ai-alt="删除对象"><i className="fa fa-trash-alt w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="删除图标"></i></button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 border border-slate-100 p-4 rounded bg-slate-50/50" data-ai-alt="批量导入" data-ai-changelog-id="training-dispatch-batch-import" data-ai-changelog-title="批量导入入口保留" data-ai-changelog-desc="下发对象批量导入保留下载导入模板、上传文件和查看导入历史入口，并保留支持 Excel 文件导入且单次最多 5000 条记录的说明">
                        <div className="flex items-center gap-4" data-ai-alt="批量操作">
                          <button className="px-4 py-2 border border-slate-300 bg-white rounded text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2" data-ai-alt="下载导入模板">
                            <i className="fa fa-download w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="下载图标"></i> 下载导入模板
                          </button>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700 flex items-center gap-2" data-ai-alt="上传文件">
                            <i className="fa fa-upload w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="上传图标"></i> 上传文件
                          </button>
                          <button className="px-4 py-2 text-blue-600 text-sm hover:underline" data-ai-alt="查看导入历史" onClick={() => setShowImportHistoryModal(true)}>查看导入历史</button>
                        </div>
                        <div className="text-xs text-slate-500" data-ai-alt="导入说明">
                          支持 Excel 文件导入，单次最多导入 5000 条记录。
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {dispatchStep === 2 && (
              <div className="flex flex-col gap-6 animate-fadeIn">
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg flex gap-3" data-ai-alt="风险提示" data-ai-changelog-id="training-dispatch-confirmation" data-ai-changelog-title="发布确认汇总与风险提示" data-ai-changelog-desc="发布确认将包含培训环节数改为包含培训任务数和 3 个对练任务，保留计划时间范围、下发对象数量和对象明细，并补充确认发布后的任务接收、内容不可改和已生效计划继续下发不改变状态提示">
                  <i className="fa fa-exclamation-triangle text-xl mt-0.5 w-[20px] h-[20px] flex items-center justify-center" data-ai-alt="提示图标"></i>
                  <div data-ai-alt="提示内容">
                    <div className="font-bold mb-1" data-ai-alt="提示标题">发布风险提示</div>
                    <div className="text-sm leading-relaxed" data-ai-alt="提示文案">确认发布后，所选对象将在对应时间段内收到培训任务；下发后不可修改计划内容；已生效计划继续下发不改变计划状态。</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden" data-ai-alt="下发汇总">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200" data-ai-alt="汇总标题">
                    <h4 className="font-bold text-slate-800 text-sm" data-ai-alt="标题文本">本次下发汇总</h4>
                  </div>
                  <div className="p-6 flex flex-col gap-6" data-ai-alt="汇总内容">
                    <div className="flex flex-wrap gap-x-8 gap-y-6" data-ai-alt="汇总字段">
                      <div className="w-[calc(50%-16px)] flex flex-col gap-2" data-ai-alt="任务数量">
                        <span className="text-xs text-slate-500" data-ai-alt="字段名">包含培训任务数</span>
                        <span className="font-bold text-slate-800 text-base" data-ai-alt="字段值">3 个对练任务</span>
                      </div>
                      <div className="w-[calc(50%-16px)] flex flex-col gap-2" data-ai-alt="时间范围">
                        <span className="text-xs text-slate-500" data-ai-alt="字段名">计划时间范围</span>
                        <span className="font-bold text-slate-800 text-base" data-ai-alt="字段值">2026-07-20 09:00 至 2026-07-30 18:00</span>
                      </div>
                      <div className="w-full flex flex-col gap-2" data-ai-alt="对象数量">
                        <span className="text-xs text-slate-500" data-ai-alt="字段名">下发对象数量</span>
                        <span className="font-bold text-slate-800 text-base" data-ai-alt="字段值">45 个对象</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded text-sm text-slate-600 border border-slate-100 max-h-32 overflow-y-auto" data-ai-alt="对象明细">
                      <span className="font-bold text-slate-700 mr-2" data-ai-alt="明细标签">对象明细:</span>
                      M1 催收一组（DPT-M1-01）、陈*（chen***）、刘*（liu***）... 及其他已选对象
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
          <button 
            onClick={() => setShowDispatchDrawer(false)}
            className="px-6 py-2 rounded font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            取消
          </button>
          <div className="flex gap-3">
            {dispatchStep > 1 && (
              <button 
                onClick={() => setDispatchStep(s => s - 1)}
                className="px-6 py-2 border border-slate-200 bg-white rounded font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                上一步
              </button>
            )}
            {dispatchStep < 2 ? (
              <button 
                onClick={handleNextStep}
                className="px-8 py-2 bg-blue-600 text-white rounded font-bold shadow-md hover:bg-blue-700 transition-colors"
              >
                下一步
              </button>
            ) : (
              <button 
                onClick={() => setShowDispatchDrawer(false)}
                className="px-8 py-2 bg-emerald-600 text-white rounded font-bold shadow-md hover:bg-emerald-700 transition-colors"
              >
                确认发布
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispatchDrawer;
