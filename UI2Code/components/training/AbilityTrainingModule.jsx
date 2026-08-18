import React, { useState, useMemo } from 'react';
import SimulationWorkspace from './SimulationWorkspace';

// ============ Mock 数据 ============
const mockPlans = [
  { id: 'p1', name: '进阶谈判技巧培训', type: '能力进阶', status: '未完成', statusDesc: '1项任务未达标', finished: 3, total: 6, deadline: '2026-07-29', deadlineType: 'today', currentTask: '进阶施压技巧模拟测试', currentIssue: '得分78分，达标要求85分', priority: 1, ruleDesc: '必修任务全部达标，综合得分≥85', desc: '面向进入L2阶段的催员，全面提升高压场景下的谈判、施压与情绪安抚能力。', startTime: '2026-07-01' },
  { id: 'p2', name: '合规红线专项复训', type: '合规培训', status: '已逾期', statusDesc: '超过截止时间2天', finished: 1, total: 4, deadline: '2026-07-22', deadlineType: 'overdue', currentTask: '合规话术专项测试', currentIssue: '尚未开始，需尽快完成', priority: 0, ruleDesc: '全部任务必须达标', desc: '针对季度合规质检问题下发的强制复训。', startTime: '2026-07-15' },
  { id: 'p3', name: '新人破冰基础训练', type: '入职培训', status: '未完成', statusDesc: '剩余3项任务', finished: 2, total: 5, deadline: '2026-08-05', deadlineType: 'normal', currentTask: '新人破冰沟通实战', currentIssue: '待开始训练', priority: 3, ruleDesc: '全部任务完成', desc: '面向新入职员工的基础话术、流程与合规入门。', startTime: '2026-06-20' },
];

const mockPlanTasks = {
  p1: [
    { id: 't1', order: 1, name: '基础话术对练', type: '机器人对练', req: '得分≥85', result: '90分', status: '已完成', practiceCount: 2, finishTime: '2026-07-28' },
    { id: 't2', order: 2, name: '进阶沟通对练', type: '机器人对练', req: '得分≥85', result: '88分', status: '已完成', practiceCount: 1, finishTime: '2026-07-28' },
    { id: 't3', order: 3, name: '进阶施压技巧对练', type: '机器人对练', req: '得分≥85', result: '78分', status: '未达标待重练', practiceCount: 3, finishTime: '—' },
    { id: 't4', order: 4, name: '综合场景对练', type: '机器人对练', req: '得分≥85', result: '—', status: '未开始', unlockCond: '完成前置任务后可学习', practiceCount: 0, finishTime: '—' },
    { id: 't5', order: 5, name: '实战复盘对练', type: '机器人对练', req: '得分≥85', result: '—', status: '未开始', unlockCond: '完成前置任务后可学习', practiceCount: 0, finishTime: '—' },
    { id: 't6', order: 6, name: '综合能力验证对练', type: '机器人对练', req: '得分≥85', result: '—', status: '未开始', unlockCond: '完成前置任务后可学习', practiceCount: 0, finishTime: '—' },
  ],
  p2: [
    { id: 't21', order: 1, name: '合规红线场景对练', type: '机器人对练', req: '得分≥90', result: '92分', status: '已完成', practiceCount: 1, finishTime: '2026-07-20' },
    { id: 't22', order: 2, name: '合规话术专项对练', type: '机器人对练', req: '得分≥90', result: '—', status: '未开始', practiceCount: 0, finishTime: '—' },
    { id: 't23', order: 3, name: '合规综合场景对练', type: '机器人对练', req: '得分≥90', result: '—', status: '未开始', unlockCond: '完成前置任务后可学习', practiceCount: 0, finishTime: '—' },
    { id: 't24', order: 4, name: '合规能力验证对练', type: '机器人对练', req: '得分≥90', result: '—', status: '未开始', unlockCond: '完成前置任务后可学习', practiceCount: 0, finishTime: '—' },
  ],
  p3: [
    { id: 't31', order: 1, name: '客户情绪识别对练', type: '机器人对练', req: '得分≥80', result: '85分', status: '已完成', practiceCount: 2, finishTime: '2026-07-25' },
    { id: 't32', order: 2, name: '情绪安抚话术对练', type: '机器人对练', req: '得分≥80', result: '88分', status: '已完成', practiceCount: 1, finishTime: '2026-07-26' },
    { id: 't33', order: 3, name: '高客诉场景沟通对练', type: '机器人对练', req: '得分≥80', result: '—', status: '进行中', practiceCount: 1, finishTime: '—' },
    { id: 't34', order: 4, name: '情绪安抚综合对练', type: '机器人对练', req: '得分≥80', result: '—', status: '未开始', unlockCond: '完成前置任务后可学习', practiceCount: 0, finishTime: '—' },
  ],
};

const mockDonePlans = [
  { id: 'dp1', name: '基础催收话术培训', type: '入职培训', finishTime: '2026-05-10', taskCount: 4, finalResult: '优秀（92分）', practiceCount: 8, dispatchTime: '2026-04-20', desc: '面向新入职催收员，覆盖基础沟通话术、客户情绪识别与标准流程演练。' },
  { id: 'dp2', name: 'M1阶段能力认证', type: '能力认证', finishTime: '2026-04-28', taskCount: 5, finalResult: '达标（86分）', practiceCount: 6, dispatchTime: '2026-04-10', desc: '针对 M1 阶段催收员的综合能力认证，验证沟通、施压与合规三项核心技能。' },
  { id: 'dp3', name: '基础合规知识考核', type: '合规培训', finishTime: '2026-03-30', taskCount: 3, finalResult: '优秀（95分）', practiceCount: 3, dispatchTime: '2026-03-15', desc: '季度合规专项考核，覆盖红线话术、敏感信息处理与录音规范。' },
];

const mockTrainingRecords = [
  { id: 'r1', order: 2, startTime: '2026-07-28 14:30:00', duration: '08:45', score: '92分', isPass: '是', status: '已达标', detail: { baseInfo: '本次为第2次练习，完整完成了对练流程。', score: '92分', passResult: '已达标', scoreDesc: '客户安抚得当，语速适中，各项流程合规。', advice: '可继续提升施压话术的连贯性。', logs: '机器人：你好。\n员工：您好，我是京东催收，本次致电是关于您的逾期欠款...\n机器人：我现在没钱。\n员工：我理解您的难处，但欠款逾期会影响您的征信...' } },
  { id: 'r2', order: 1, startTime: '2026-07-27 10:00:00', duration: '05:20', score: '75分', isPass: '否', status: '未达标', detail: { baseInfo: '本次为首次练习，对练提前结束。', score: '75分', passResult: '未达标', scoreDesc: '施压不够，未能有效引导客户给出还款方案。', advice: '需要加强施压环节的沟通技巧，注意语气和节奏。', logs: '机器人：你好。\n员工：您好，我是京东...\n机器人：我没钱，别打了。\n员工：那您看怎么办...' } },
  { id: 'r3', order: 3, startTime: '2026-07-29 09:15:00', duration: '03:10', score: '—', isPass: '—', status: '已中断', detail: { baseInfo: '本次练习中途退出', score: '—', passResult: '—', scoreDesc: '—', advice: '—', logs: '机器人：嘟嘟嘟...\n员工：喂？您好？' } },
  { id: 'r4', order: 4, startTime: '2026-07-29 10:20:00', duration: '06:35', score: '评分中', isPass: '—', status: '评分中', detail: { baseInfo: '本次训练已提交，系统正在生成评分结果。', score: '评分中', passResult: '—', scoreDesc: '系统正在分析对练过程、关键话术命中与合规表现。', advice: '评分完成后将自动生成改进建议。', logs: '机器人：您好，方便沟通一下当前逾期款项吗？\n员工：您好，我先和您确认一下身份信息，并说明本次来电目的...' } },
];

const mockDoneTasks = [
  { id: 'dt1', name: '基础催收话术对练', type: '机器人对练', sourcePlan: '基础催收话术培训', finishTime: '2026-05-10', maxScore: 92, practiceCount: 3 },
  { id: 'dt2', name: '合规基础考试', type: '考试', sourcePlan: '基础合规知识考核', finishTime: '2026-03-30', maxScore: 95, practiceCount: 2, isMulti: true, planCount: 2 },
  { id: 'dt3', name: '失联修复场景模拟', type: '机器人对练', sourcePlan: 'M1阶段能力认证', finishTime: '2026-05-08', maxScore: 85, practiceCount: 1 },
  { id: 'dt4', name: '情绪安抚专项演练', type: '机器人对练', sourcePlan: '客户情绪安抚专项计划', finishTime: '2026-05-01', maxScore: 88, practiceCount: 2 },
  { id: 'dt5', name: '基础话术课件', type: '课件', sourcePlan: '基础催收话术培训', finishTime: '2026-05-05', maxScore: null, practiceCount: 1 },
  { id: 'dt6', name: '施压节奏基础测试', type: '试题', sourcePlan: '施压节奏基础训练', finishTime: '2026-03-18', maxScore: 84, practiceCount: 2 },
];

const buildCompletedPlanTasks = (plan) => {
  const planTasks = mockDoneTasks.filter(t => t.sourcePlan === plan.name);
  const sourceTasks = planTasks.length > 0 ? planTasks : [
    { id: `${plan.id}-summary`, name: `${plan.name}完成记录`, type: '课件', maxScore: null, practiceCount: plan.practiceCount, finishTime: plan.finishTime }
  ];
  return sourceTasks.map((task, index) => ({
    id: `${plan.id}-${task.id}`,
    order: index + 1,
    name: task.name,
    type: task.type,
    req: task.maxScore !== null ? '达到计划要求' : '完成学习',
    result: task.maxScore !== null ? `${task.maxScore}分` : '已完成',
    status: '已完成',
    finishTime: task.finishTime,
    practiceCount: task.practiceCount
  }));
};

const skills = [
  { id: 1, name: '沟通技巧', score: 85 },
  { id: 2, name: '施压能力', score: 70 },
  { id: 3, name: '情绪安抚', score: 90 },
  { id: 4, name: '合规意识', score: 95 },
  { id: 5, name: '综合应变', score: 88 },
];

const getStatusStyle = (status) => {
  const map = {
    '未完成': 'bg-blue-50 text-blue-600 border-blue-200',
    '未开始': 'bg-slate-100 text-slate-600 border-slate-200',
    '进行中': 'bg-blue-50 text-blue-600 border-blue-200',
    '待继续': 'bg-orange-50 text-orange-600 border-orange-200',
    '已完成': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    '已逾期': 'bg-red-50 text-red-600 border-red-200',
    '已失效': 'bg-slate-100 text-slate-400 border-slate-200',
    '未达标待重练': 'bg-orange-50 text-orange-600 border-orange-200',

    '已过期': 'bg-slate-100 text-slate-400 border-slate-200',
  };
  return map[status] || 'bg-slate-100 text-slate-600 border-slate-200';
};

const getTypeIcon = (type) => {
  const map = {
    '课件': { icon: 'fa-book', color: 'text-blue-500 bg-blue-50' },
    '试题': { icon: 'fa-file-text-o', color: 'text-indigo-500 bg-indigo-50' },
    '考试': { icon: 'fa-graduation-cap', color: 'text-purple-500 bg-purple-50' },
    '机器人对练': { icon: 'fa-android', color: 'text-emerald-500 bg-emerald-50' },
  };
  return map[type] || { icon: 'fa-tasks', color: 'text-slate-500 bg-slate-50' };
};

const AbilityTrainingModule = () => {
  const [view, setView] = useState('list');
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [tab, setTab] = useState('todo');
  const [doneSubTab, setDoneSubTab] = useState('byPlan');
  const [searchKw, setSearchKw] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [sortByDeadline, setSortByDeadline] = useState(true);
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const [selectedPracticeTask, setSelectedPracticeTask] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [taskSearchKw, setTaskSearchKw] = useState('');
  const [taskTypeFilter, setTaskTypeFilter] = useState('全部类型');
  const [taskPlanFilter, setTaskPlanFilter] = useState('全部来源计划');
  const [taskDateFilter, setTaskDateFilter] = useState('');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recordTask, setRecordTask] = useState(null);
  const [selectedRecordDetail, setSelectedRecordDetail] = useState(null);

  const openRecordModal = (task) => {
    setRecordTask(task);
    setShowRecordModal(true);
    setSelectedRecordDetail(null);
  };

  const allPlans = useMemo(() => {
    return [
      ...mockPlans,
      ...mockDonePlans.map(dp => ({
         id: dp.id,
         name: dp.name,
         type: dp.type,
         status: '已完成',
         statusDesc: dp.finalResult,
         finished: dp.taskCount,
         total: dp.taskCount,
         deadline: dp.finishTime,
         deadlineType: 'normal',
         currentTask: '已完成，可查看记录',
         currentIssue: `最终结果：${dp.finalResult} · 共练习${dp.practiceCount}次`,
         priority: 99,
         desc: dp.desc,
         startTime: dp.dispatchTime,
         ruleDesc: '历史计划已达标',
         finishTime: dp.finishTime
      }))
    ];
  }, []);

  const sortedPlans = useMemo(() => {
    let arr = [...allPlans];
    if (searchKw) arr = arr.filter(p => p.name.includes(searchKw));
    if (statusFilter !== '全部') {
      if (statusFilter === '未完成') {
        arr = arr.filter(p => ['未开始', '进行中'].includes(p.status));
      } else {
        arr = arr.filter(p => p.status === statusFilter);
      }
    }
    arr.sort((a, b) => {
      const isADone = a.status === '已完成' ? 1 : 0;
      const isBDone = b.status === '已完成' ? 1 : 0;
      if (isADone !== isBDone) return isADone - isBDone;
      return a.priority - b.priority;
    });
    return arr;
  }, [searchKw, statusFilter, sortByDeadline, allPlans]);

  const priorityPlans = useMemo(() => mockPlans.filter(p => p.priority <= 1).sort((a, b) => a.priority - b.priority), []);

  const overview = useMemo(() => ({
    todo: mockPlans.length,
    soon: mockPlans.filter(p => p.deadlineType === 'today' || p.deadlineType === 'soon').length,
    overdue: mockPlans.filter(p => p.deadlineType === 'overdue').length,
    finished: mockDonePlans.length,
  }), []);

  const currentPlan = useMemo(() => allPlans.find(p => p.id === selectedPlanId), [selectedPlanId, allPlans]);
  const currentPlanTasks = useMemo(() => {
    if (mockPlanTasks[selectedPlanId]) return mockPlanTasks[selectedPlanId];
    const completedPlan = mockDonePlans.find(p => p.id === selectedPlanId);
    return completedPlan ? buildCompletedPlanTasks(completedPlan) : [];
  }, [selectedPlanId]);

  const sortedTrainingRecords = useMemo(() => {
    return [...mockTrainingRecords].sort((a, b) => new Date(b.startTime.replace(/-/g, '/')).getTime() - new Date(a.startTime.replace(/-/g, '/')).getTime());
  }, []);

  const historyHighestScoreValue = useMemo(() => {
    const scores = sortedTrainingRecords.map(r => parseInt(r.score)).filter(score => !Number.isNaN(score));
    return scores.length > 0 ? Math.max(...scores) : null;
  }, [sortedTrainingRecords]);

  const historyHighestScore = historyHighestScoreValue !== null ? `${historyHighestScoreValue}分` : '—';

  const normalizePassResult = (record) => {
    if (record.status === '评分中' || record.status === '已中断') return '—';
    return record.isPass === '是' || record.isPass === '否' ? record.isPass : '—';
  };

  const filteredDoneTasks = useMemo(() => {
    return mockDoneTasks.filter(t => {
      const matchName = !taskSearchKw || t.name.includes(taskSearchKw);
      const matchType = taskTypeFilter === '全部类型' || t.type === taskTypeFilter;
      const matchPlan = taskPlanFilter === '全部来源计划' || t.sourcePlan === taskPlanFilter;
      const matchDate = !taskDateFilter || t.finishTime === taskDateFilter;
      return matchName && matchType && matchPlan && matchDate;
    });
  }, [taskSearchKw, taskTypeFilter, taskPlanFilter, taskDateFilter]);


  const SortLabel = ({ children }) => (
    <span className="inline-flex items-center gap-1 cursor-pointer select-none">
      {children}
      <i className="fa fa-sort text-[10px] text-slate-300"></i>
    </span>
  );

  const openPlanDetail = (planId) => {
    setSelectedPlanId(planId);
    setView('detail');
  };

  return (
    <div className="w-full h-full flex flex-col gap-3" data-ai-alt="能力培训模块" data-ai-changelog-id="training-plan-first-page" data-ai-changelog-title="以培训计划为一级入口的能力培训页" data-ai-changelog-desc="重构一线员工侧能力培训页，将综合能力进阶与我的培训计划拆分为两个平级主页签；培训计划为任务的唯一入口，任务下沉到计划详情内执行，已完成内容支持按计划/按任务两种维度回顾">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col min-w-0 overflow-hidden" data-ai-alt="我的培训计划区">
        <div className="flex-1 overflow-y-auto" data-ai-alt="计划内容区">
          {/* 视图1：计划列表首页 */}
          {view === 'list' && (
            <div className="p-6 flex flex-col gap-4" data-ai-alt="我的培训计划首页">
              <div className="bg-white border border-slate-200 rounded-xl h-[80px] flex items-center px-5 shadow-sm shrink-0" data-ai-alt="计划概览数据" data-ai-list="true">
                <div className="flex flex-1 items-center gap-8">
                  <div className="flex flex-col gap-0.5" data-ai-alt="已完成计划数">
                    <div className="text-[11px] text-slate-500 font-bold">已完成计划</div>
                    <div className="text-[24px] font-black text-green-600">{overview.finished}</div>
                  </div>
                  
                  <div className="w-[1px] h-8 bg-slate-100"></div>
                  
                  <div className="flex flex-col gap-0.5" data-ai-alt="待完成计划数">
                    <div className="text-[11px] text-slate-500 font-bold">待完成计划</div>
                    <div className="text-[24px] font-black text-blue-600">{overview.todo}</div>
                  </div>
                  
                  <div className="w-[1px] h-8 bg-slate-100"></div>
                  
                  <div className="flex flex-col gap-0.5" data-ai-alt="已逾期数">
                    <div className="text-[11px] text-slate-500 font-bold">已逾期</div>
                    <div className="text-[24px] font-black text-red-500">{overview.overdue}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pl-6 border-l border-slate-100 shrink-0">
                  <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors" data-ai-alt="本月学习次数" data-ai-changelog-id="monthly-study-count" data-ai-changelog-title="本月学习次数展示" data-ai-changelog-desc="新增本月学习次数指标">
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[11px] text-slate-500 font-bold">本月学习次数</div>
                      <div className="flex items-end gap-1">
                        <div className="text-[24px] font-black text-slate-800 leading-none">12</div>
                        <div className="text-[10px] text-slate-500 font-bold mb-[2px]">次</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-100"></div>
                  <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors" data-ai-alt="综合得分" data-ai-changelog-id="current-ability-score" data-ai-changelog-title="综合得分展示" data-ai-changelog-desc="将综合得分作为重要指标移至最右侧并增加查看详情按钮">
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[11px] text-slate-500 font-bold">综合得分</div>
                      <div className="flex items-end gap-1">
                        <div className="text-[24px] font-black text-slate-800 leading-none">85</div>
                        <div className="text-[10px] text-green-500 font-bold mb-[2px]"><i className="fa fa-arrow-up mr-0.5"></i>2.5</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors" data-ai-alt="查看详情按钮">
                      <i className="fa fa-angle-right text-lg"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 flex flex-wrap gap-3 items-center" data-ai-alt="计划搜索筛选">
                <div className="relative w-[200px]">
                  <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input type="text" placeholder="搜索计划名称" value={searchKw} onChange={e => setSearchKw(e.target.value)} className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs bg-white focus:border-blue-500 outline-none" data-ai-alt="搜索输入框" />
                </div>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-slate-200 rounded px-3 py-1.5 text-xs bg-white focus:border-blue-500 outline-none" data-ai-alt="状态筛选">
                  {['全部', '未完成', '已逾期', '已完成'].map(s => <option key={s}>{s === '全部' ? '全部状态' : s}</option>)}
                </select>
                <div className="flex items-center gap-2" data-ai-alt="下发时间筛选">
                  <span className="text-xs text-slate-500">下发时间:</span>
                  <div className="flex items-center gap-1 border border-slate-200 rounded bg-white px-1 py-1 focus-within:border-blue-500">
                    <input type="date" className="text-xs bg-transparent focus:outline-none text-slate-600 w-[100px]" />
                    <span className="text-slate-400 text-[10px]">-</span>
                    <input type="date" className="text-xs bg-transparent focus:outline-none text-slate-600 w-[100px]" />
                  </div>
                </div>
                <div className="flex items-center gap-2" data-ai-alt="截止日期筛选">
                  <span className="text-xs text-slate-500">截止日期:</span>
                  <div className="flex items-center gap-1 border border-slate-200 rounded bg-white px-1 py-1 focus-within:border-blue-500">
                    <input type="date" className="text-xs bg-transparent focus:outline-none text-slate-600 w-[100px]" />
                    <span className="text-slate-400 text-[10px]">-</span>
                    <input type="date" className="text-xs bg-transparent focus:outline-none text-slate-600 w-[100px]" />
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded text-xs bg-blue-600 text-white hover:bg-blue-700 font-bold ml-auto" data-ai-alt="查询按钮">
                  查询
                </button>
                <button onClick={() => { setSearchKw(''); setStatusFilter('全部'); }} className="px-4 py-1.5 rounded text-xs border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-bold" data-ai-alt="重置按钮">
                  重置
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 text-xs text-blue-700 flex justify-between items-center min-h-[38px]">
                <div className="flex items-center gap-2">
                  <i className="fa fa-info-circle"></i>
                  <span>计划内容支持反复学习，请在最晚完成时间前完成学习计划。</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col" data-ai-changelog-id="plan-list-view" data-ai-changelog-title="计划为一级入口的列表视图" data-ai-changelog-desc="以表格形式展示所有计划(包含待完成与已完成)，展示计划名/状态/下发时间/最晚完成时间/训练进度/操作">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50" data-ai-alt="计划数量说明">
                  <span className="text-sm font-bold text-slate-700">培训计划列表 <span className="text-slate-500 font-normal ml-1 text-xs">共 {sortedPlans.length} 个</span></span>
                </div>
                <div className="flex px-4 py-2.5 bg-slate-50 text-[11px] font-bold text-slate-500 border-b border-slate-200" data-ai-alt="计划列表表头">
                  <div className="flex-[2] min-w-0"><SortLabel>计划名称</SortLabel></div>
                  <div className="w-[100px]"><SortLabel>计划状态</SortLabel></div>
                  <div className="w-[130px]"><SortLabel>计划下发时间</SortLabel></div>
                  <div className="w-[140px]"><SortLabel>最晚完成时间</SortLabel></div>
                  <div className="w-[140px]"><SortLabel>实际完成时间</SortLabel></div>
                  <div className="w-[140px]"><SortLabel>训练进度</SortLabel></div>
                  <div className="w-[100px] text-right">操作</div>
                </div>
                <div className="flex flex-col divide-y divide-slate-100" data-ai-list="true" data-ai-alt="计划列表主体" data-ai-changelog-id="completed-plan-dispatch-time" data-ai-changelog-title="已完成计划下发时间与说明修正" data-ai-changelog-desc="已完成计划的计划下发时间列展示实际下发日期而非横杠，计划名称下方说明文案改为培训说明或训练目标，完成结果统一由实际完成时间列展示">
                  {sortedPlans.map(p => (
                    <div key={p.id} className="flex items-center px-4 py-3 hover:bg-blue-50/40 cursor-pointer transition-colors text-xs" onClick={() => openPlanDetail(p.id)} data-ai-alt="计划行">
                      <div className="flex-[2] flex flex-col gap-1 min-w-0 pr-4">
                        <div className="font-bold text-slate-800 truncate text-sm">{p.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{p.desc || p.type}</div>
                      </div>
                      <div className="w-[100px]">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(p.status)}`}>{p.status}</span>
                      </div>
                      <div className="w-[130px] text-slate-600">
                        {p.startTime || '2026-07-01'}
                      </div>
                      <div className="w-[140px]">
                        <span className={`font-bold ${p.status === '已完成' ? 'text-slate-700' : p.deadlineType === 'overdue' ? 'text-red-500' : p.deadlineType === 'today' ? 'text-orange-500' : 'text-slate-700'}`}>{p.deadline || '—'}</span>
                      </div>
                      <div className="w-[140px] text-slate-600">
                        {p.status === '已完成' ? (p.finishTime || '2026-07-28') : '—'}
                      </div>
                      <div className="w-[140px] pr-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-[6px] bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${p.status === '已逾期' ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${(p.finished / p.total) * 100}%` }}></div>
                          </div>
                          <span className="text-slate-700 font-bold shrink-0 text-[11px]">{p.finished}/{p.total}</span>
                        </div>
                      </div>
                      <div className="w-[100px] text-right shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); openPlanDetail(p.id); }} className={`px-3 py-1.5 rounded font-bold ${p.status === '已逾期' ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : p.status === '已完成' ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50' : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'} transition-colors`} data-ai-alt="计划操作按钮">
                          {p.status === '已完成' ? '查看记录' : '进入计划'}
                        </button>
                      </div>
                    </div>
                  ))}
                  {sortedPlans.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm" data-ai-alt="空状态">
                      暂无匹配的计划
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 视图2：计划详情 */}
          {view === 'detail' && currentPlan && (
            <div className="p-6 flex flex-col gap-4" data-ai-alt="培训计划详情页" data-ai-changelog-id="plan-detail-view" data-ai-changelog-title="培训计划详情与任务列表" data-ai-changelog-desc="点击计划后进入独立详情页，顶部展示计划基本信息与整体进度，下方以紧凑表格展示计划内全部任务；任务只能在计划详情中执行，未解锁任务不可操作">
              <div className="flex items-center gap-2 text-xs" data-ai-alt="详情面包屑">
                <button onClick={() => { setView('list'); setSelectedPlanId(null); setTab('todo'); }} className="w-[24px] h-[24px] rounded-full text-slate-500 hover:bg-slate-100 flex items-center justify-center" data-ai-alt="返回按钮">
                  <i className="fa fa-arrow-left"></i>
                </button>
                <span className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => { setView('list'); setSelectedPlanId(null); setTab('todo'); }}>我的培训计划</span>
                <i className="fa fa-angle-right text-slate-300"></i>
                <span className="text-slate-700 font-bold">{currentPlan.name}</span>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 rounded-xl p-4" data-ai-alt="计划头信息">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-lg font-bold text-slate-800">{currentPlan.name}</span>
                      <span className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] rounded font-bold">{currentPlan.type}</span>
                      {currentPlan.status && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(currentPlan.status)}`}>{currentPlan.status}</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">{currentPlan.desc}</div>
                  </div>
                </div>
                <div className="flex gap-3" data-ai-list="true">
                  <div className="flex-1 bg-white/70 rounded-lg p-2" data-ai-alt="整体进度卡">
                    <div className="text-[10px] text-slate-500">整体进度</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-[6px] bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${(currentPlan.finished / currentPlan.total) * 100}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-blue-700">{currentPlan.finished}/{currentPlan.total}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white/70 rounded-lg p-2" data-ai-alt="开始时间卡">
                    <div className="text-[10px] text-slate-500">开始时间</div>
                    <div className="text-xs font-bold text-slate-700 mt-1">{currentPlan.startTime || '—'}</div>
                  </div>
                  <div className="flex-1 bg-white/70 rounded-lg p-2" data-ai-alt="截止时间卡">
                    <div className="text-[10px] text-slate-500">截止时间</div>
                    <div className={`text-xs font-bold mt-1 ${currentPlan.status === '已完成' ? 'text-slate-700' : currentPlan.deadlineType === 'overdue' ? 'text-red-500' : currentPlan.deadlineType === 'today' ? 'text-orange-500' : 'text-slate-700'}`}>{currentPlan.deadline || '—'}</div>
                  </div>
                  <div className="flex-1 bg-white/70 rounded-lg p-2" data-ai-alt="完成时间卡" data-ai-changelog-id="plan-detail-finish-time-card" data-ai-changelog-title="计划详情完成时间展示" data-ai-changelog-desc="计划详情顶部信息卡去除达标规则，改为展示当前计划完成时间，未完成或无完成时间时显示横杠">
                    <div className="text-[10px] text-slate-500" data-ai-alt="字段名">完成时间</div>
                    <div className="text-xs font-bold text-slate-700 mt-1 truncate" title={currentPlan.finishTime || '—'} data-ai-alt="字段值">{currentPlan.finishTime || '—'}</div>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden" data-ai-alt="计划内任务列表" data-ai-changelog-id="task-action-two-slots" data-ai-changelog-title="任务操作列双操作位" data-ai-changelog-desc="任务学习页任务列表操作列固定保留训练记录与开始学习两个操作位；有训练记录展示可点击训练记录，无训练记录统一展示不可点击的无，未满足前置条件的任务也保留无占位并置灰开始学习" data-knowledge-citationId="kg://2056317797395558401/100000001/2057464365306941441/1#joyspace_LchDtrQ9dTxvJNtyP9Xm_chunk_4_v202605132200">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">任务列表</span>
                  <span className="text-[11px] text-slate-500">共 {currentPlanTasks.length} 项任务</span>
                </div>
                <div className="flex px-4 py-2 bg-slate-50/50 text-[11px] font-bold text-slate-500 border-b border-slate-100" data-ai-alt="任务表头">
                  <div className="w-[40px]">序号</div>
                  <div className="flex-[2] min-w-0">任务名称</div>
                  <div className="w-[80px]">任务类型</div>
                  <div className="w-[80px]">达标要求</div>
                  <div className="w-[80px]">当前得分</div>
                  <div className="w-[70px]">练习次数</div>
                  <div className="w-[90px]">状态</div>
                  <div className="w-[100px]">完成时间</div>
                  <div className="w-[140px] text-right">操作</div>
                </div>
                <div className="flex flex-col divide-y divide-slate-100" data-ai-list="true">
                  {currentPlanTasks.map((task, idx) => {
                    const typeStyle = getTypeIcon(task.type);
                    const nextIdx = currentPlanTasks.findIndex(t => t.status !== '已完成');
                    const isCurrent = idx === nextIdx;
                    const displayStatus = (isCurrent && task.status === '未开始') ? '进行中' : task.status;
                    const isLocked = displayStatus === '未开始' && task.unlockCond;
                    return (
                      <div key={task.id} className={`flex px-4 py-3 items-center text-xs ${isCurrent ? 'bg-blue-50/40 border-l-2 border-blue-500' : 'hover:bg-slate-50'} ${isLocked ? 'opacity-60' : ''}`} data-ai-alt="任务行">
                        <div className="w-[40px] text-slate-500 font-bold">{task.order}</div>
                        <div className="flex-[2] flex items-center gap-2 min-w-0">
                          <div className={`w-[28px] h-[28px] rounded flex items-center justify-center shrink-0 ${typeStyle.color}`}>
                            <i className={`fa ${typeStyle.icon} text-[12px]`}></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-slate-800 truncate">{task.name}</div>
                            {isLocked && (
                              <div className="text-[10px] text-slate-400 mt-0.5"><i className="fa fa-lock mr-1"></i>{task.unlockCond}</div>
                            )}
                            {isCurrent && <div className="text-[10px] text-blue-600 font-bold mt-0.5">当前应执行任务</div>}
                          </div>
                        </div>
                        <div className="w-[80px] text-slate-600">{task.type}</div>
                        <div className="w-[80px] text-slate-600">{task.req}</div>
                        <div className="w-[80px]">
                          <span className={`font-bold ${task.result && task.result !== '—' ? (parseInt(task.result) >= 85 ? 'text-emerald-600' : 'text-orange-500') : 'text-slate-600'}`}>{task.result}</span>
                        </div>
                        <div className="w-[70px] text-slate-600">{task.practiceCount || 0}次</div>
                        <div className="w-[90px]">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(displayStatus)}`}>{displayStatus}</span>
                        </div>
                        <div className="w-[100px] text-slate-600">
                          {task.finishTime || '—'}
                        </div>
                        <div className="w-[140px] text-right flex items-center justify-end gap-2">
                          <div className="w-[58px] flex justify-end" data-ai-alt="记录操作位">
                            {(task.practiceCount || 0) > 0 ? (
                              <button onClick={() => openRecordModal(task)} className="text-[11px] font-bold text-blue-600 hover:text-blue-700" data-action="go-trainingRecordDrawer" data-ai-alt="训练记录按钮">训练记录</button>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-300" data-ai-alt="无记录占位">无</span>
                            )}
                          </div>
                          {isLocked ? (
                            <button className="px-3 py-1.5 rounded text-[11px] font-bold bg-slate-100 text-slate-400 cursor-not-allowed" title={task.unlockCond} data-ai-alt="禁用学习按钮">开始学习</button>
                          ) : (
                            <button onClick={() => { if (task.type === '机器人对练') { setSelectedPracticeTask({ ...task, title: task.name }); setShowPracticeMode(true); } }} className="px-3 py-1.5 rounded text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700" data-ai-alt="开始学习按钮">
                              开始学习
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-2 px-1" data-ai-alt="任务说明">
                <i className="fa fa-info-circle text-slate-400"></i>
                <span>完成当前任务后，计划进度将自动刷新，并定位到下一项待执行任务；已完成任务可查看训练记录，也可再次点击开始学习进行训练。</span>
              </div>
            </div>
          )}

          {/* 视图3：历史任务记录 */}
          {view === 'taskHistory' && (
            <div className="p-6 flex flex-col gap-4" data-ai-alt="已完成任务查询页">
              <div className="flex items-center gap-2 text-xs" data-ai-alt="历史任务返回面包屑">
                <button onClick={() => { setView('list'); }} className="w-[24px] h-[24px] rounded-full text-slate-500 hover:bg-slate-100 flex items-center justify-center" data-ai-alt="返回按钮">
                  <i className="fa fa-arrow-left"></i>
                </button>
                <span className="text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => { setView('list'); }}>我的培训计划</span>
                <i className="fa fa-angle-right text-slate-300"></i>
                <span className="text-slate-700 font-bold">历史任务记录</span>
              </div>
              <div className="flex flex-col gap-3" data-ai-alt="按任务查看区">
                <div className="bg-blue-50/60 border border-blue-100 rounded-lg px-3 py-2 text-xs text-blue-700 flex items-center gap-2" data-ai-alt="历史任务说明">
                  <i className="fa fa-info-circle"></i>
                  <span>历史任务记录仅用于查询已完成训练与成绩，不作为当前待办入口；当前训练请回到计划列表进入对应培训计划。</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 flex flex-wrap gap-2 items-center" data-ai-alt="任务筛选栏">
                  <div className="relative flex-1 min-w-[180px]">
                    <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input type="text" placeholder="搜索任务名称" value={taskSearchKw} onChange={e => setTaskSearchKw(e.target.value)} className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs bg-white focus:border-blue-500 outline-none" data-ai-alt="任务名搜索" />
                  </div>
                  <select value={taskTypeFilter} onChange={e => setTaskTypeFilter(e.target.value)} className="border border-slate-200 rounded px-3 py-1.5 text-xs bg-white focus:border-blue-500 outline-none" data-ai-alt="任务类型筛选">
                    <option>全部类型</option><option>课件</option><option>试题</option><option>考试</option><option>机器人对练</option>
                  </select>
                  <select value={taskPlanFilter} onChange={e => setTaskPlanFilter(e.target.value)} className="border border-slate-200 rounded px-3 py-1.5 text-xs bg-white focus:border-blue-500 outline-none" data-ai-alt="来源计划筛选">
                    <option>全部来源计划</option>
                    {mockDonePlans.map(p => <option key={p.id}>{p.name}</option>)}
                  </select>
                  <input type="date" value={taskDateFilter} onChange={e => setTaskDateFilter(e.target.value)} className="border border-slate-200 rounded px-3 py-1.5 text-xs bg-white focus:border-blue-500 outline-none" data-ai-alt="完成时间筛选" />
                  {(taskSearchKw || taskTypeFilter !== '全部类型' || taskPlanFilter !== '全部来源计划' || taskDateFilter) && (
                    <button onClick={() => { setTaskSearchKw(''); setTaskTypeFilter('全部类型'); setTaskPlanFilter('全部来源计划'); setTaskDateFilter(''); }} className="px-3 py-1.5 rounded text-xs border border-slate-200 text-slate-600 font-bold bg-white hover:bg-slate-50" data-ai-alt="清空筛选按钮">
                      清空筛选
                    </button>
                  )}
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden" data-ai-alt="已完成任务列表">
                  <div className="px-4 py-2 bg-white border-b border-slate-100 text-[11px] text-slate-500 flex items-center justify-between" data-ai-alt="历史任务结果说明">
                    <span>查询结果 · 共 {filteredDoneTasks.length} 条记录</span>
                    <span className="text-slate-400">可查看记录或对机器人对练任务再次练习</span>
                  </div>
                  <div className="flex px-4 py-2.5 bg-slate-50 text-[11px] font-bold text-slate-500 border-b border-slate-200" data-ai-alt="已完成任务表头">
                    <div className="flex-[2] min-w-0">任务名称</div>
                    <div className="w-[90px]">类型</div>
                    <div className="flex-[1.5] min-w-0">来源计划</div>
                    <div className="w-[100px]">完成时间</div>
                    <div className="w-[80px]">最高分</div>
                    <div className="w-[80px]">练习次数</div>
                    <div className="w-[130px] text-right">操作</div>
                  </div>
                  <div className="flex flex-col divide-y divide-slate-100" data-ai-list="true">
                    {filteredDoneTasks.map(t => {
                      const ts = getTypeIcon(t.type);
                      return (
                        <div key={t.id} className="flex px-4 py-3 items-center text-xs hover:bg-slate-50" data-ai-alt="已完成任务行">
                          <div className="flex-[2] flex items-center gap-2 min-w-0">
                            <div className={`w-[24px] h-[24px] rounded flex items-center justify-center shrink-0 ${ts.color}`}>
                              <i className={`fa ${ts.icon} text-[11px]`}></i>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-slate-800 truncate">{t.name}</div>
                              {t.isMulti && <div className="text-[10px] text-blue-500 mt-0.5">完成 {t.practiceCount} 次 · 来源 {t.planCount} 个计划</div>}
                            </div>
                          </div>
                          <div className="w-[90px] text-slate-600">{t.type}</div>
                          <div className="flex-[1.5] text-slate-600 truncate min-w-0">{t.sourcePlan}</div>
                          <div className="w-[100px] text-slate-500">{t.finishTime}</div>
                          <div className="w-[80px]">
                            {t.maxScore !== null ? (
                              <span className="text-emerald-600 font-bold">{t.maxScore}分</span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </div>
                          <div className="w-[80px] text-slate-600">{t.practiceCount}次</div>
                          <div className="w-[130px] text-right flex justify-end gap-2">
                            <button className="text-blue-600 hover:text-blue-800 font-bold text-[11px]" data-ai-alt="查看记录按钮">查看记录</button>
                            {t.type === '机器人对练' && (
                              <button onClick={() => { setSelectedPracticeTask({ ...t, title: t.name }); setShowPracticeMode(true); }} className="text-slate-600 hover:text-slate-800 font-bold text-[11px]" data-ai-alt="再次练习按钮">再次练习</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {filteredDoneTasks.length === 0 && (
                      <div className="py-10 text-center text-sm text-slate-400" data-ai-alt="历史任务空结果">
                        暂无匹配的历史任务记录，请调整任务名称、类型、来源计划或完成时间后重试
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPracticeMode && (
        <SimulationWorkspace task={selectedPracticeTask} onClose={() => setShowPracticeMode(false)} />
      )}

      {showRecordModal && recordTask && (
        <div className="fixed inset-0 z-[120] bg-slate-900/45 backdrop-blur-sm" data-ai-alt="训练记录遮罩" data-ai-changelog-id="training-record-modal" data-ai-changelog-title="训练记录右侧抽屉" data-ai-changelog-desc="点击可用训练记录后从页面右侧打开训练记录抽屉，顶部展示计划与任务概要，下方按训练时间倒序展示记录列表，最高分记录增加标识，并支持查看详情展示基础信息、得分、达标结果、说明、建议和对练过程" data-knowledge-citationId="kg://2056317797395558401/100000001/2057464365306941441/1#joyspace_LchDtrQ9dTxvJNtyP9Xm_chunk_4_v202605132200">
          <div className="fixed right-0 top-0 h-full w-[860px] max-w-[calc(100vw-32px)] bg-white shadow-2xl flex overflow-hidden" data-ai-alt="记录抽屉">
            <div className={`flex flex-col h-full transition-all duration-300 ${selectedRecordDetail ? 'w-[55%] border-r border-slate-100' : 'w-full'}`} data-ai-alt="记录主区">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0" data-ai-alt="记录标题栏">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2" data-ai-alt="记录标题"><i className="fa fa-history text-blue-500 w-[16px] h-[16px] flex items-center justify-center" data-ai-alt="记录图标"></i> 训练记录</h3>
                {!selectedRecordDetail && (
                  <button onClick={() => setShowRecordModal(false)} className="w-[32px] h-[32px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200" data-ai-alt="关闭抽屉">
                    <i className="fa fa-times w-[14px] h-[14px] flex items-center justify-center" data-ai-alt="关闭图标"></i>
                  </button>
                )}
              </div>
              <div className="p-4 border-b border-slate-100 bg-white shrink-0" data-ai-alt="任务概要">
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs" data-ai-alt="概要内容" data-ai-list="true" data-ai-changelog-id="training-record-score-summary" data-ai-changelog-title="训练记录得分概要拆分" data-ai-changelog-desc="训练记录抽屉顶部任务概要将当前得分、历史最高分和达标要求拆分展示，避免将达标要求误认为历史最高分" data-knowledge-citationId="kg://2027723788674772994/2074339768847876098/2074339768919179265/1#1783396114941773_0781377a6ace5867_20260707114838_0">
                  <div className="flex items-center gap-2 w-full" data-ai-alt="计划名称"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">计划名称:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">{currentPlan?.name || recordTask.sourcePlan || '—'}</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="任务名称"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">任务名称:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">{recordTask.name}</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="任务状态"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">任务状态:</span><span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getStatusStyle(recordTask.status)}`} data-ai-alt="状态值">{recordTask.status}</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="当前得分"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">当前得分:</span><span className="font-bold text-emerald-600 truncate" data-ai-alt="字段值">{recordTask.result || (recordTask.maxScore ? `${recordTask.maxScore}分` : '—')}</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="最高得分"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">历史最高分:</span><span className="font-bold text-emerald-600 truncate" data-ai-alt="字段值">{historyHighestScore}</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="达标要求"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">达标要求:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">{recordTask.req || '—'}</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="练习次数"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">练习次数:</span><span className="font-bold text-slate-700" data-ai-alt="字段值">{recordTask.practiceCount}次</span></div>
                  <div className="flex items-center gap-2 w-[45%]" data-ai-alt="完成时间"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">完成时间:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">{recordTask.finishTime || '—'}</span></div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-slate-50/30" data-ai-alt="记录滚动区">
                <div className="flex px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 border-b border-slate-200 sticky top-0 z-10" data-ai-alt="记录表头">
                  <div className="w-[60px]" data-ai-alt="序号列">训练序号</div>
                  <div className="flex-1 min-w-0" data-ai-alt="时间列">训练时间</div>
                  {!selectedRecordDetail && <div className="w-[80px]" data-ai-alt="时长列">演练时长</div>}
                  <div className="w-[80px]" data-ai-alt="得分列">本次得分</div>
                  {!selectedRecordDetail && <div className="w-[60px]" data-ai-alt="达标列">是否达标</div>}
                  <div className="w-[70px]" data-ai-alt="状态列">训练状态</div>
                  <div className="w-[70px] text-right" data-ai-alt="操作列">操作</div>
                </div>
                <div className="divide-y divide-slate-100 flex flex-col" data-ai-alt="记录列表" data-ai-list="true" data-ai-changelog-id="training-record-list-rules" data-ai-changelog-title="训练记录列表字段规则" data-ai-changelog-desc="训练记录列表保留训练序号、训练时间、演练时长、本次得分、是否达标、训练状态和操作字段；是否达标仅显示是、否或横杠，评分中和已中断显示横杠，最高分标识跟随本次得分最高记录，评分中记录操作列禁用查看详情入口" data-knowledge-citationId="kg://2027723788674772994/2074337484411813890/2074337484491505665/1#1783395570295231_775b9bea5245cd71_20260707113933_0">
                  {sortedTrainingRecords.map((r) => {
                    const recordScore = parseInt(r.score);
                    const isHighestRecord = !Number.isNaN(recordScore) && historyHighestScoreValue !== null && recordScore === historyHighestScoreValue;
                    return (
                      <div key={r.id} className={`flex px-4 py-3 items-center text-xs ${selectedRecordDetail?.id === r.id ? 'bg-blue-50/60 shadow-inner' : 'hover:bg-slate-50 transition-colors'}`} data-ai-alt="记录行">
                        <div className="w-[60px] text-slate-500 font-bold" data-ai-alt="记录序号">{r.order}</div>
                        <div className="flex-1 min-w-0 text-slate-700 truncate pr-2" data-ai-alt="训练时间">{r.startTime}</div>
                        {!selectedRecordDetail && <div className="w-[80px] text-slate-600" data-ai-alt="演练时长">{r.duration}</div>}
                        <div className="w-[80px] flex items-center gap-1" data-ai-alt="本次得分">
                          <span className={`font-bold ${r.score === '—' ? 'text-slate-500' : r.score === '评分中' ? 'text-blue-600' : 'text-slate-800'}`} data-ai-alt="得分值">{r.score}</span>
                          {isHighestRecord && <span className="px-1 py-0.5 bg-orange-100 text-orange-600 rounded text-[9px] font-bold shrink-0" data-ai-alt="最高分标">最高分</span>}
                        </div>
                        {!selectedRecordDetail && <div className="w-[60px] text-slate-600" data-ai-alt="达标结果">{normalizePassResult(r)}</div>}
                        <div className="w-[70px]" data-ai-alt="记录状态">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${r.status === '已达标' ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' : r.status === '未达标' ? 'text-orange-600 bg-orange-50 border border-orange-200' : r.status === '已中断' ? 'text-slate-500 bg-slate-100 border border-slate-200' : 'text-blue-600 bg-blue-50 border border-blue-200'}`}>{r.status}</span>
                        </div>
                        <div className="w-[70px] text-right" data-ai-alt="详情操作">
                          {r.status === '评分中' ? (
                            <button disabled title="评分中，暂无法查看详情" className="text-[11px] font-bold text-slate-400 cursor-not-allowed" data-ai-alt="评分禁用">评分中</button>
                          ) : (
                            <button onClick={() => setSelectedRecordDetail(r)} className={`text-[11px] font-bold ${selectedRecordDetail?.id === r.id ? 'text-blue-800' : 'text-blue-600 hover:text-blue-800'}`} data-ai-alt="查看详情">查看详情</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {sortedTrainingRecords.length === 0 && (
                    <div className="py-12 flex items-center justify-center flex-col gap-2 text-slate-400" data-ai-alt="记录空态">
                      <i className="fa fa-inbox w-[24px] h-[24px] flex items-center justify-center text-2xl" data-ai-alt="空态图标"></i>
                      <span className="text-sm" data-ai-alt="空态文案">暂无训练记录</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* 详情抽屉区 */}
            {selectedRecordDetail && (
              <div className="w-[45%] bg-slate-50 flex flex-col h-full relative shadow-[-4px_0_15px_rgba(0,0,0,0.05)] animate-slideInRight">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
                  <h3 className="font-bold text-slate-800 text-sm">训练详情 <span className="text-slate-400 font-normal ml-1">第{selectedRecordDetail.order}次</span></h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelectedRecordDetail(null)} className="w-[28px] h-[28px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="收起详情">
                      <i className="fa fa-angle-right text-lg"></i>
                    </button>
                    <button onClick={() => { setShowRecordModal(false); setSelectedRecordDetail(null); }} className="w-[28px] h-[28px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="关闭弹窗">
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                   <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
                     <div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2">基础信息</div>
                     <div className="text-xs text-slate-600 pt-1">{selectedRecordDetail.detail.baseInfo}</div>
                   </div>
                   <div className="flex gap-4">
                     <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
                       <div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2">本次得分</div>
                       <div className="text-xl font-black text-slate-700 pt-1">{selectedRecordDetail.detail.score}</div>
                     </div>
                     <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
                       <div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2">达标结果</div>
                       <div className="text-sm font-bold text-slate-700 pt-1 flex items-center h-full pb-1">{selectedRecordDetail.detail.passResult}</div>
                     </div>
                   </div>
                   <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2">
                     <div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2">得分说明</div>
                     <div className="text-xs text-slate-600 leading-relaxed pt-1">{selectedRecordDetail.detail.scoreDesc}</div>
                   </div>
                   <div className="bg-orange-50/50 rounded-lg p-4 shadow-sm border border-orange-100 flex flex-col gap-2">
                     <div className="text-xs font-bold text-orange-800 border-l-2 border-orange-500 pl-2">改进建议</div>
                     <div className="text-xs text-orange-700 leading-relaxed pt-1">{selectedRecordDetail.detail.advice}</div>
                   </div>
                   <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2 flex-1 min-h-[200px]">
                     <div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2">对练过程记录</div>
                     <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded mt-2 flex-1 whitespace-pre-line leading-relaxed border border-slate-100 overflow-y-auto">
                       {selectedRecordDetail.detail.logs}
                     </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" data-ai-alt="能力详情弹窗">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[640px] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <i className="fa fa-line-chart text-blue-500"></i> 完整能力分析
              </h3>
              <button onClick={() => setShowDetailModal(false)} className="w-[32px] h-[32px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200" data-ai-alt="关闭弹窗按钮">
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="flex gap-3 mb-6" data-ai-list="true">
                <div className="flex-1 bg-blue-50/50 p-4 rounded-xl border border-blue-100" data-ai-alt="当前能力分卡">
                  <div className="text-[11px] text-slate-500 font-bold">当前能力分</div>
                  <div className="text-[24px] font-black text-blue-700">85.6</div>
                  <div className="text-[10px] text-emerald-500 font-bold"><i className="fa fa-arrow-up"></i> 2.4</div>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100" data-ai-alt="历史平均分卡">
                  <div className="text-[11px] text-slate-500 font-bold">历史平均分</div>
                  <div className="text-[24px] font-black text-slate-700">81.2</div>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100" data-ai-alt="累计训练卡">
                  <div className="text-[11px] text-slate-500 font-bold">累计训练</div>
                  <div className="text-[24px] font-black text-slate-700">128<span className="text-xs font-normal text-slate-400 ml-1">次</span></div>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100" data-ai-alt="最高得分卡">
                  <div className="text-[11px] text-slate-500 font-bold">最高得分</div>
                  <div className="text-[24px] font-black text-slate-700">94.0</div>
                </div>
              </div>
              <div className="flex flex-col gap-3" data-ai-list="true">
                {skills.map(s => (
                  <div key={s.id} className="flex items-center gap-3" data-ai-alt="能力维度详情">
                    <span className="text-xs text-slate-600 w-[64px]">{s.name}</span>
                    <div className="flex-1 h-[8px] bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${s.score >= 85 ? 'bg-emerald-500' : s.score >= 75 ? 'bg-blue-500' : 'bg-orange-500'}`} style={{ width: `${s.score}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-[32px] text-right">{s.score}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button onClick={() => setShowDetailModal(false)} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700" data-ai-alt="关闭按钮">关闭</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilityTrainingModule;
