import React from 'react';

const SimulationWorkspace = ({ onClose, task }) => {
  const [trainingStatus, setTrainingStatus] = React.useState('playing'); // playing, scoring, passed, failed
  const [showTaskDesc, setShowTaskDesc] = React.useState(false);
  const [showEndConfirm, setShowEndConfirm] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('');

  const currentTask = task || {
    title: '新客首次逾期沟通',
    type: '演练(必修)',
    req: '练习≥1次且得分≥85',
    progress: '未带入任务进度',
    duration: '20分钟',
    deadline: '今天 23:59',
    records: []
  };

  const taskRecords = currentTask.records || [];
  const taskPlanName = currentTask.planName || '新人成长训练计划';
  const bestScore = taskRecords.length ? Math.max(...taskRecords.map(record => record.score || 0)) : null;
  const taskFocusList = currentTask.title?.includes('施压')
    ? ['先确认客户诉求与还款障碍，再选择合规施压切入点', '控制施压节奏，避免越过合规边界', '在客户抗拒时完成情绪安抚与方案回收']
    : currentTask.title?.includes('客诉')
      ? ['识别客诉风险信号并及时降温', '避免刺激性表达，优先确认事实与诉求', '在合规范围内引导客户回到还款协商']
      : ['完成开场破冰与身份核实', '准确捕捉客户还款意愿与异议', '保持合规表达并形成下一步跟进'];

  React.useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleMockAction = () => setToastMsg('演练模式下暂不支持该操作');

  const handleConfirmEnd = () => {
    setShowEndConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#f0f2f5] flex flex-col text-[12px] text-slate-700 font-sans overflow-hidden" data-ai-changelog-id="changelog_robot_simulation_workspace" data-ai-changelog-title="机器人演练复刻界面" data-ai-changelog-desc="新增演练作业台1:1真实还原页面" data-ai-alt="演练作业台界面">
      {/* 演练专用 Toast */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] bg-slate-800/80 text-white px-4 py-2 rounded shadow-lg text-sm flex items-center gap-2">
           <i className="fa fa-info-circle text-blue-300"></i> {toastMsg}
        </div>
      )}

      {/* 弹窗：任务说明 */}
      {showTaskDesc && (
        <div className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center">
           <div className="bg-white rounded-lg shadow-xl w-[560px] max-w-[calc(100vw-32px)] flex flex-col overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="font-bold text-[15px] text-slate-800">任务说明 · {currentTask.type}</div>
                 <i className="fa fa-times text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => setShowTaskDesc(false)}></i>
              </div>
              <div className="p-5 flex flex-col gap-4 text-[13px] text-slate-600">
                 <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                       <div>
                          <div className="text-[11px] text-blue-500 font-bold mb-1">当前带入任务</div>
                          <div className="text-[16px] font-black text-slate-800">{currentTask.title}</div>
                       </div>
                       <span className="px-2 py-1 rounded-full bg-white text-blue-700 border border-blue-100 text-[11px] font-bold shrink-0">{currentTask.status || '待训练'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[12px]">
                       <div><span className="text-slate-400">达标条件：</span><span className="font-bold text-slate-700">{currentTask.req}</span></div>
                       <div><span className="text-slate-400">当前进度：</span><span className="font-bold text-orange-600">{currentTask.progress}</span></div>
                       <div><span className="text-slate-400">预估时长：</span><span className="text-slate-700">{currentTask.duration}</span></div>
                       <div><span className="text-slate-400">截止时间：</span><span className="text-red-500 font-bold">{currentTask.deadline || '无'}</span></div>
                    </div>
                 </div>
                 <div>
                    <div className="font-bold text-slate-800 mb-1">训练背景</div>
                    <div>本次演练基于任务清单中的「{currentTask.title}」生成模拟客户对话，不会产生真实外呼或修改案件数据。</div>
                 </div>
                 <div>
                    <div className="font-bold text-slate-800 mb-1">训练目标</div>
                    <div>围绕“{currentTask.req}”完成一轮有效对练，并在结束后根据评分结果决定继续重练或返回任务列表。</div>
                 </div>
                 <div>
                    <div className="font-bold text-slate-800 mb-1">重点考察能力</div>
                    <ul className="list-disc pl-5 text-slate-600 flex flex-col gap-1">
                       {taskFocusList.map((focus, index) => <li key={index}>{focus}</li>)}
                    </ul>
                 </div>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 flex justify-end bg-slate-50/50">
                 <button onClick={() => setShowTaskDesc(false)} className="bg-[#1890ff] text-white px-5 py-1.5 rounded hover:bg-blue-600 transition-colors">我知道了</button>
              </div>
           </div>
        </div>
      )}

      {/* 弹窗：结束演练确认 */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-[2000] bg-black/40 flex items-center justify-center">
           <div className="bg-white rounded-lg shadow-xl w-[400px] flex flex-col overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-2xl mb-2">
                    <i className="fa fa-exclamation-triangle"></i>
                 </div>
                 <div className="font-bold text-[16px] text-slate-800">当前演练尚未完成</div>
                 <div className="text-[13px] text-slate-500 leading-relaxed">
                    结束后本次演练将记为未完成，不生成训练评分，且无法从当前位置继续演练。是否确认结束？
                 </div>
              </div>
              <div className="px-6 py-4 flex justify-center gap-3 bg-slate-50/50 border-t border-slate-100">
                 <button onClick={() => setShowEndConfirm(false)} className="px-5 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors bg-white">继续演练</button>
                 <button onClick={handleConfirmEnd} className="bg-orange-500 text-white px-5 py-1.5 rounded hover:bg-orange-600 transition-colors">确认结束</button>
              </div>
           </div>
        </div>
      )}

      {/* 状态调试工具 (为了演示切换状态，实际可删) */}
      <div className="fixed top-14 right-4 z-[9999] bg-white border border-slate-200 shadow-md p-2 rounded flex gap-2 text-xs opacity-10 hover:opacity-100 transition-opacity">
         <span className="flex items-center font-bold mr-2 text-slate-400">点击调试状态：</span>
         <button onClick={() => setTrainingStatus('playing')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">对练中</button>
         <button onClick={() => setTrainingStatus('scoring')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">评分中</button>
         <button onClick={() => setTrainingStatus('passed')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">已通过</button>
         <button onClick={() => setTrainingStatus('failed')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded">未通过</button>
      </div>

      {/* 水印 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[9999]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctext x=\'20\' y=\'100\' font-size=\'16\' font-family=\'sans-serif\' fill=\'%23000\' transform=\'rotate(-15 100 100)\'%3Ezhukexin26 保密信息，严禁泄露，未经许可请勿外传%3C/text%3E%3C/svg%3E")' }}></div>

      {/* 顶部机器人演练模式标识 */}
      <div className="bg-gradient-to-r from-[#1890ff] to-blue-700 text-white min-h-[48px] flex flex-wrap items-center justify-between gap-3 px-5 py-2 shrink-0 relative z-[60] shadow-md" data-ai-alt="演练模式顶栏" data-ai-changelog-id="changelog_robot_simulation_header" data-ai-changelog-title="顶部演练标识" data-ai-changelog-desc="优化演练横条信息与交互">
         {/* 左侧 */}
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-[16px] tracking-wide">
               <i className="fa fa-robot text-lg text-blue-100"></i>
               培训机器人演练模式
            </div>
            <div className="text-[12px] bg-white/15 px-2 py-0.5 rounded border border-white/20 flex items-center gap-1">
               <i className="fa fa-info-circle opacity-80"></i> 模拟数据，不产生真实作业
            </div>
         </div>
         {/* 中部 */}
         <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[13px] bg-black/10 px-4 py-1.5 rounded-2xl xl:rounded-full max-w-full">
            <div className="flex items-center gap-1.5 truncate max-w-[180px]" title={taskPlanName}><span className="text-blue-200">计划:</span> {taskPlanName}</div>
            <div className="flex items-center gap-1.5 truncate max-w-[220px]" title={currentTask.title}><span className="text-blue-200">任务:</span> {currentTask.title}</div>
            <div className="flex items-center gap-1.5"><span className="text-blue-200">进度:</span> {bestScore !== null ? `最高${bestScore}分` : currentTask.progress}</div>
            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
               <span className="text-blue-200">状态:</span> 
               {trainingStatus === 'playing' && <span className="text-white font-bold flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>对练中 <span className="font-mono tracking-wider ml-1">02:35</span></span>}
               {trainingStatus === 'scoring' && <span className="text-yellow-300 font-bold"><i className="fa fa-spinner fa-spin mr-1.5"></i>评分中</span>}
               {trainingStatus === 'passed' && <span className="text-green-300 font-bold"><i className="fa fa-check-circle mr-1.5"></i>已通过</span>}
               {trainingStatus === 'failed' && <span className="text-red-300 font-bold"><i className="fa fa-times-circle mr-1.5"></i>未通过</span>}
            </div>
         </div>
         {/* 右侧 */}
         <div className="flex items-center gap-4">
            <button onClick={() => setShowTaskDesc(true)} className="text-white hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 rounded text-[13px] transition-colors flex items-center gap-1.5" data-ai-alt="任务说明">
               <i className="fa fa-file-text-o"></i> 任务说明
            </button>
            {trainingStatus === 'playing' ? (
              <button onClick={() => setShowEndConfirm(true)} className="bg-white hover:bg-blue-50 text-blue-600 px-4 py-1.5 rounded text-[13px] font-bold transition-colors flex items-center gap-1.5 shadow-sm" data-ai-alt="结束演练">
                 结束演练
              </button>
            ) : (
              <button onClick={onClose} className="bg-white hover:bg-blue-50 text-blue-600 px-4 py-1.5 rounded text-[13px] font-bold transition-colors flex items-center gap-1.5 shadow-sm" data-ai-alt="返回任务">
                 返回任务
              </button>
            )}
         </div>
      </div>

      {/* Top Nav (电话条悬浮效果) */}
      <div className="mx-3 mt-3 h-[48px] bg-white border border-slate-200/80 rounded-lg flex items-center justify-between px-4 shrink-0 relative z-50 shadow-md" data-ai-alt="悬浮电话条">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded cursor-pointer text-slate-600">
            <i className="fa fa-navicon"></i>
          </div>
          <div className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-slate-50 cursor-pointer">
            <i className="fa fa-times-circle text-slate-400"></i>
            <span className="text-slate-600">置忙</span>
            <i className="fa fa-angle-down text-slate-400 ml-1"></i>
          </div>
          <div className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-white cursor-pointer">
            <span className="text-slate-600">随机属地</span>
            <i className="fa fa-angle-down text-slate-400 ml-1"></i>
          </div>
          
          <div className="flex items-center bg-red-50 text-red-500 border border-red-100 rounded px-2 py-1 gap-1">
             <i className="fa fa-id-card-o"></i>
          </div>

          <div className="relative">
             <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <i className="fa fa-user"></i>
             </div>
             <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center border border-white">!</div>
          </div>
          
          <div className="flex flex-col mx-2 text-slate-500 w-24">
             <div className="text-[10px] leading-tight">未通话</div>
             <div className="text-[12px] leading-tight font-mono">--:--:--</div>
          </div>
          
          <div className="flex items-center gap-1 mr-2 text-slate-400">
             <i className="fa fa-phone bg-slate-100 p-1.5 rounded-full"></i>
             <div className="w-32 h-7 bg-slate-100 rounded border border-slate-200"></div>
          </div>

          <div className="flex items-center gap-2">
             <button className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50"><i className="fa fa-phone"></i></button>
             <button className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50"><i className="fa fa-headphones"></i></button>
             <button className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50"><i className="fa fa-microphone"></i></button>
             <button className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50 relative">
                 <i className="fa fa-clock-o"></i>
                 <span className="absolute -bottom-1 bg-red-50 text-red-500 border border-red-200 text-[8px] px-1 rounded transform scale-75 whitespace-nowrap">登录</span>
             </button>
             <button className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50"><i className="fa fa-desktop"></i></button>
             <button className="w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50"><i className="fa fa-cog"></i></button>
          </div>
        </div>
        <div className="text-blue-500">
           <i className="fa fa-clock-o text-lg"></i>
        </div>
      </div>

      {/* Case Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-start shrink-0 border-b border-slate-200 relative z-10 mt-3 shadow-sm" data-ai-alt="案件基本信息与金额数据">
         <div className="flex flex-col gap-3">
             <div className="flex items-center gap-3">
                 <h1 className="text-xl font-bold text-slate-800 tracking-wide">茹柯耶姆·图然尼亚孜(ru ke ye mu · tu ran ni ya zi) <i className="fa fa-unlock-alt text-yellow-500 text-sm ml-1"></i></h1>
             </div>
             <div className="flex items-center gap-3 text-slate-500">
                 <span>女</span>
                 <span>JDJR_京东账户</span>
                 <span>委托周期: 2026-07-11 - 2026-12-31</span>
                 <div className="flex items-center gap-2 ml-2">
                     <span>行动状态:</span>
                     <select className="border border-slate-200 rounded px-2 py-0.5 text-slate-700 bg-white outline-none w-32" data-ai-alt="行动状态选择">
                         <option>无法接通</option>
                     </select>
                 </div>
             </div>
             <div className="flex items-center gap-2 mt-1">
                 <span className="px-3 py-1 rounded-full border border-orange-200 text-orange-500 bg-orange-50/50">待分类 <i className="fa fa-angle-down ml-1"></i></span>
                 <span className="px-3 py-1 rounded-full bg-orange-500 text-white shadow-sm">全面失联</span>
                 <span className="px-3 py-1 rounded-full border border-red-200 text-red-500">白条划扣</span>
                 <span className="px-3 py-1 rounded-full border border-orange-200 text-orange-500">机组_小额30天不可联</span>
                 <i className="fa fa-question-circle text-slate-400 cursor-help"></i>
             </div>
         </div>

         <div className="flex items-center gap-10 mt-2">
             <div className="flex flex-col items-center">
                 <span className="text-slate-500 mb-1">应催金额</span>
                 <div className="text-red-500 font-medium text-3xl">41.26 <span className="text-sm">元</span></div>
             </div>
             <div className="flex flex-col items-center">
                 <span className="text-slate-500 mb-1">今日总还款金额</span>
                 <div className="text-slate-800 font-medium text-2xl mt-1">- <span className="text-sm">元</span></div>
             </div>
             <div className="flex flex-col items-center">
                 <span className="text-slate-500 mb-1">逾期天数</span>
                 <div className="text-slate-800 font-medium text-3xl">215 <span className="text-sm">天</span></div>
             </div>
             <div className="flex flex-col gap-2 ml-4">
                 <button className="bg-slate-200 text-slate-400 px-6 py-2 rounded shadow-sm cursor-not-allowed flex items-center justify-center w-28" data-ai-alt="上一案件"><i className="fa fa-angle-left mr-1"></i> 上一案件</button>
                 <button 
                    onClick={() => (trainingStatus === 'passed' || trainingStatus === 'scoring') ? handleMockAction() : null}
                    className={`px-6 py-2 rounded shadow-sm flex items-center justify-center w-28 transition-colors ${(trainingStatus === 'passed' || trainingStatus === 'scoring') ? 'bg-[#1890ff] text-white hover:bg-blue-600 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`} 
                    data-ai-alt="下一案件">
                    下一案件 <i className="fa fa-angle-right ml-1"></i>
                 </button>
             </div>
         </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative z-10 w-full min-w-0">
          {/* Left Column */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200 bg-[#f0f2f5] p-2 gap-2 overflow-y-auto custom-scrollbar">
              
              {/* Upper Section: Basic Info */}
              <div className="bg-white rounded shadow-sm border border-slate-200 flex flex-col shrink-0" data-ai-alt="客户业务信息详情">
                  <div className="flex items-center gap-6 px-4 pt-3 border-b border-slate-100 font-medium text-slate-600 relative overflow-x-auto custom-scrollbar whitespace-nowrap">
                      <div className="text-[#1890ff] border-b-2 border-[#1890ff] pb-2 px-1 cursor-pointer">基本信息</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">客户画像</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">账户信息</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">账单信息</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">分案记录</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">还款信息</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">还款减免录入</div>
                      <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">他人帮还信息</div>
                      
                      <div className="absolute right-4 text-[#1890ff] cursor-pointer flex items-center gap-1 text-sm top-3 bg-white pl-2">
                         <i className="fa fa-refresh"></i> 刷新
                      </div>
                  </div>
                  <div className="p-4 grid grid-cols-4 gap-y-4 gap-x-2 text-[12px] leading-relaxed">
                      <div className="flex gap-2"><span className="text-slate-500 w-20">客户ID:</span><span className="text-slate-800">jd_wfZXNpqvhNMt</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-24">案件类型:</span><span className="text-slate-800">BH3</span></div>
                      <div className="flex gap-2 items-center"><span className="text-slate-500 w-28">实时应还金额 <i className="fa fa-question-circle text-slate-400"></i>:</span><span className="text-slate-800">41.26</span></div>
                      <div className="flex gap-2 items-center"><span className="text-slate-500 w-28">实时逾期金额 <i className="fa fa-question-circle text-slate-400"></i>:</span><span className="text-slate-800">40.87</span></div>
                      
                      <div className="flex gap-2"><span className="text-slate-500 w-20">产品类型:</span><span className="text-slate-800">京东白条</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-24">实时逾期状态:</span><span className="text-slate-800">逾期</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">除罚息外总额:</span><span className="text-slate-800">34.82</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">总罚息:</span><span className="text-slate-800">6.44</span></div>
                      
                      <div className="flex gap-2"><span className="text-slate-500 w-20">手机号:</span><span className="text-slate-800">176****69</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-24">企业名称:</span><span className="text-slate-800"></span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">逾期本金总待还:</span><span className="text-slate-800">41.26</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">身份证:</span><span className="text-slate-800">6**************6</span></div>
                      
                      <div className="flex gap-2"><span className="text-slate-500 w-20">年龄:</span><span className="text-slate-800">35</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-24">身份证所在省:</span><span className="text-slate-800">新疆维吾尔自治区</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">身份证所在城市:</span><span className="text-slate-800">和田地区</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">身份证所在区县:</span><span className="text-slate-800">墨玉县</span></div>
                      
                      <div className="flex gap-2"><span className="text-slate-500 w-20">民族:</span><span className="text-slate-800">维吾尔族</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-24">核销后逾期天数:</span><span className="text-slate-800">215</span></div>
                      <div className="flex gap-2"><span className="text-slate-500 w-28">子案件类型:</span><span className="text-slate-800"></span></div>
                  </div>
              </div>

              {/* Lower Section: Tabs & Table split */}
              <div className="flex gap-2 min-h-[300px] flex-1 shrink-0 overflow-hidden">
                  {/* Bottom Left Panel */}
                  <div className="flex-1 bg-white rounded shadow-sm border border-slate-200 flex flex-col min-w-0" data-ai-alt="电话与地址信息区">
                      <div className="flex items-center justify-between px-4 pt-3 border-b border-slate-100 relative">
                          <div className="flex items-center gap-6 font-medium text-slate-600">
                              <div className="text-[#1890ff] border-b-2 border-[#1890ff] pb-2 px-1 cursor-pointer">电话信息</div>
                              <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">地址信息</div>
                              <div className="pb-2 px-1 hover:text-[#1890ff] cursor-pointer">失联修复</div>
                          </div>
                          <div className="text-[#1890ff] cursor-pointer flex items-center gap-1 pb-2" onClick={handleMockAction}>
                             <i className="fa fa-plus-circle"></i> 添加
                          </div>
                      </div>
                      <div className="flex-1 overflow-auto bg-slate-50 p-3 custom-scrollbar">
                          <table className="w-full text-left text-[12px] bg-white border border-slate-200 rounded">
                              <thead className="bg-[#fafafa] border-b border-slate-200 text-slate-600">
                                  <tr>
                                      <th className="px-3 py-2 font-medium w-[25%]">姓名</th>
                                      <th className="px-3 py-2 font-medium w-[15%]">关系</th>
                                      <th className="px-3 py-2 font-medium w-[15%]">备注</th>
                                      <th className="px-3 py-2 font-medium text-center">PC</th>
                                      <th className="px-3 py-2 font-medium text-center">云手机</th>
                                      <th className="px-3 py-2 font-medium text-center">云客</th>
                                      <th className="px-3 py-2 font-medium text-center">其他</th>
                                  </tr>
                              </thead>
                              <tbody className="text-slate-700">
                                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                                      <td className="px-3 py-4">茹柯耶姆·图<br/>然尼亚孜</td>
                                      <td className="px-3 py-4">本人</td>
                                      <td className="px-3 py-4">
                                         <div className="flex flex-col gap-1 items-start">
                                            <div className="flex items-center text-red-500"><i className="fa fa-ban mr-1"></i> 176****69</div>
                                            <div className="bg-orange-100 text-orange-600 px-1 rounded text-[10px]">待观察</div>
                                         </div>
                                      </td>
                                      <td className="px-1 py-4 text-center">
                                         <div className="flex items-center justify-center gap-2">
                                            <div className="flex flex-col items-center cursor-pointer text-[#1890ff]"><span className="text-[10px] scale-90">今0/6</span><i className="fa fa-user"></i></div>
                                            <div className="flex flex-col items-center cursor-pointer text-[#1890ff]"><span className="text-[10px] scale-90">今0/3</span><i className="fa fa-comment"></i></div>
                                         </div>
                                      </td>
                                      <td className="px-1 py-4 text-center">
                                         <div className="flex justify-center text-[#1890ff] cursor-pointer"><i className="fa fa-mobile text-lg"></i></div>
                                      </td>
                                      <td className="px-1 py-4 text-center">
                                         <div className="flex flex-col items-center cursor-pointer text-[#1890ff]"><span className="text-[10px] scale-90">今0/4</span><i className="fa fa-mobile text-lg"></i></div>
                                      </td>
                                      <td className="px-3 py-4 text-center text-slate-500 cursor-pointer hover:text-[#1890ff]">
                                         更多 <i className="fa fa-angle-down"></i>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>

                  {/* Bottom Right Panel */}
                  <div className="flex-[0.8] bg-white rounded shadow-sm border border-slate-200 flex flex-col min-w-0" data-ai-alt="作业与触达记录区">
                      <div className="flex items-center px-2 pt-3 border-b border-slate-100 relative overflow-x-hidden">
                          <i className="fa fa-angle-left text-slate-400 absolute left-2 top-4 cursor-pointer hover:text-blue-500 bg-white"></i>
                          <div className="flex items-center gap-4 font-medium text-slate-600 px-4 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth">
                              <div className="text-[#1890ff] border-b-2 border-[#1890ff] pb-2 px-2 cursor-pointer">电话作业</div>
                              <div className="pb-2 px-2 hover:text-[#1890ff] cursor-pointer">工具作业</div>
                              <div className="pb-2 px-2 hover:text-[#1890ff] cursor-pointer">外访协作</div>
                              <div className="pb-2 px-2 hover:text-[#1890ff] cursor-pointer">还款申请</div>
                              <div className="pb-2 px-2 hover:text-[#1890ff] cursor-pointer">风控</div>
                          </div>
                          <i className="fa fa-angle-right text-slate-400 absolute right-2 top-4 cursor-pointer hover:text-blue-500 bg-white"></i>
                      </div>
                      <div className="p-4 flex flex-col gap-3 text-[12px] text-slate-600 leading-relaxed overflow-y-auto custom-scrollbar">
                          <div><span className="text-slate-400 mr-2">末次沟通时间:</span> 2026-07-17 09:53:50</div>
                          <div><span className="text-slate-400 mr-2">催记类型:</span> 电话</div>
                          <div><span className="text-slate-400 mr-2">催收对象:</span> **孜 (本人: 176****69)</div>
                          <div><span className="text-slate-400 mr-2">接通状态:</span> 未接通</div>
                          <div><span className="text-slate-400 mr-2">行动状态:</span> 无法接通</div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Right Sidebar: Assistant */}
          <div className="w-[320px] shrink-0 bg-[#f8f9fa] border-l border-slate-200 flex flex-col min-h-0" data-ai-alt="AI坐席助手面板">
              <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
                  <div className="text-[#1890ff] font-bold text-[15px] flex items-center gap-2">
                     <i className="fa fa-headphones"></i> 坐席助手
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 cursor-pointer">
                      <span className="hover:text-blue-500"><i className="fa fa-external-link rotate-180"></i> 小窗</span>
                      <span className="hover:text-blue-500"><i className="fa fa-sign-in"></i> 收起</span>
                  </div>
              </div>
              
              <div className="flex items-center gap-4 px-4 pt-3 bg-white border-b border-slate-100 text-slate-600 font-medium">
                  <div className="text-[#1890ff] border-b-2 border-[#1890ff] pb-2 cursor-pointer">沟通策略</div>
                  <div className="hover:text-[#1890ff] pb-2 cursor-pointer">参考话术</div>
                  <div className="hover:text-[#1890ff] pb-2 cursor-pointer">实时对话</div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar">
                  {/* Strategy Block */}
                  <div className="flex flex-col gap-2 bg-white rounded border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between font-bold text-slate-800 px-3 py-2.5 border-b border-slate-100 cursor-pointer">
                          <div className="flex items-center gap-2"><i className="fa fa-dot-circle-o text-yellow-500"></i> 沟通策略</div>
                          <i className="fa fa-angle-up text-slate-400"></i>
                      </div>
                      <div className="px-3 py-2 text-slate-700 leading-relaxed flex flex-col gap-3">
                          <div>
                              <span className="font-bold text-slate-800">客户简要信息:</span>当前案件白条新客户首次逾期; 历史案件白条长期逾期, 白条最长逾期213天; 严重多头借贷; 还款压力低;
                          </div>
                          <div>
                              <span className="font-bold text-[#1890ff] mr-1">沟通策略:</span>核身-&gt;共情了解多头借贷情况-&gt;分析共债风险-&gt;提醒逾期影响-&gt;约定还款时间-&gt;礼貌挂机;
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                              <span className="font-bold text-slate-800">施压提示点:</span> 
                              <div className="mt-1"><span className="font-bold">1.年龄段:</span> 【中年群体】涉及房贷车贷、上有老下有小；潜在施压点: 取消分期全额、核资（暗示资产执行）、失联可能联系三方、核实地址、可能起诉、</div>
                              <div className="mt-1.5"><span className="font-bold">2.地区:</span> 【新疆】职业稳定性高，建议工作日中下午联系；潜在施压点：核资、可能起诉。</div>
                          </div>
                          <div className="flex items-center justify-between mt-1 pt-3 border-t border-slate-100 text-slate-500">
                              <span>策略推荐满意度</span>
                              <div className="flex items-center gap-4">
                                  <i className="fa fa-thumbs-o-up hover:text-[#1890ff] cursor-pointer text-lg"></i>
                                  <i className="fa fa-thumbs-o-down hover:text-red-500 cursor-pointer text-lg mt-1"></i>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Scripts Block */}
                  <div className="flex flex-col gap-2 bg-white rounded border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between font-bold text-slate-800 px-3 py-2.5 cursor-pointer hover:bg-slate-50">
                          <div className="flex items-center gap-2"><i className="fa fa-dot-circle-o text-yellow-500"></i> 参考话术</div>
                          <i className="fa fa-angle-down text-slate-400"></i>
                      </div>
                      <div className="flex flex-wrap gap-2 px-3 pb-3">
                          <span className="px-3 py-1 bg-blue-50 text-[#1890ff] border border-[#1890ff] rounded cursor-pointer">新客户</span>
                          <span className="px-3 py-1 bg-white text-slate-600 border border-slate-200 rounded hover:border-[#1890ff] hover:text-[#1890ff] cursor-pointer">多头借贷</span>
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};

export default SimulationWorkspace;
