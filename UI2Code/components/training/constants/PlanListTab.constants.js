export const initialPlanData = [
  {
    id: 'PLL1',
    sortOrder: 1,
    name: '2025届新人入职催收员破冰计划',
    businessType: '内催',
    planMode: '闯关模式',
    planType: '通用',
    status: '已生效',
    description: '针对新员工的全面沟通技巧提升。',
    targetText: '2025届新人批次 / M1-M2新员工',
    progressRate: 65,
    progressStats: {
      notStarted: 12,
      inProgress: 38,
      completed: 26,
      overdue: 3
    },
    effectiveTime: '2026-07-20 00:00:00',
    updateTime: '2026-07-18 10:30:00',
    contents: [
      { type: '机器人对练', count: 3 }
    ],
    tasks: [
      { order: 1, type: '机器人对练', name: '破冰沟通演练', status: '已完成', condition: '分值≥60' },
      { order: 2, type: '机器人对练', name: '高风险客户沟通', status: '进行中', condition: '分值≥80' },
      { order: 3, type: '机器人对练', name: '极端情绪安抚', status: '待解锁', condition: '分值≥85' }
    ]
  },
  {
    id: 'PL2',
    sortOrder: 2,
    name: 'M3组专项合规培训',
    businessType: '内催',
    planMode: '自由模式',
    planType: '通用',
    status: '草稿',
    description: '强化法催阶段的合规意识与红线防范。',
    targetText: 'M3催收组',
    progressRate: 0,
    progressStats: {
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0
    },
    effectiveTime: '-',
    updateTime: '2026-07-17 15:45:00',
    contents: [
      { type: '机器人对练', count: 2 }
    ],
    tasks: [
      { order: 1, type: '机器人对练', name: '合规红线模拟', status: '未开始', condition: '分值≥90' },
      { order: 2, type: '机器人对练', name: '违规施压纠正', status: '未开始', condition: '分值≥90' }
    ]
  },
  {
    id: 'PL3',
    sortOrder: 3,
    name: '老员工复训计划',
    businessType: '商单',
    planMode: '自由模式',
    planType: '通用',
    status: '已停用',
    disableReason: '操作人点击停用',
    description: '提升老员工疑难案件处理能力。',
    targetText: '全体老员工',
    progressRate: 100,
    progressStats: {
      notStarted: 0,
      inProgress: 0,
      completed: 50,
      overdue: 0
    },
    effectiveTime: '2026-06-01 00:00:00',
    updateTime: '2026-07-01 10:00:00',
    contents: [
      { type: '机器人对练', count: 5 }
    ],
    tasks: [
      { order: 1, type: '机器人对练', name: '疑难案件沟通模拟', status: '已完成', condition: '分值≥80' },
      { order: 2, type: '机器人对练', name: '高压客户施压演练', status: '已完成', condition: '分值≥80' },
      { order: 3, type: '机器人对练', name: '失联修复场景模拟', status: '已完成', condition: '分值≥85' },
      { order: 4, type: '机器人对练', name: '综合能力验证对练', status: '已完成', condition: '分值≥85' },
      { order: 5, type: '机器人对练', name: '情绪安抚专项演练', status: '已完成', condition: '分值≥80' }
    ]
  },
  {
    id: 'PL4',
    sortOrder: 4,
    name: '存在已停用任务',
    businessType: '内催',
    planMode: '闯关模式',
    planType: '通用',
    status: '已停用',
    disableReason: '计划包含已停用任务',
    description: '因计划中引用了已停用对练任务，当前计划同步置为已停用。',
    targetText: '风险专项训练组',
    progressRate: 40,
    progressStats: {
      notStarted: 8,
      inProgress: 12,
      completed: 20,
      overdue: 10
    },
    effectiveTime: '2026-07-10 00:00:00',
    updateTime: '2026-07-29 16:20:00',
    contents: [
      { type: '机器人对练', count: 3 }
    ],
    tasks: [
      { order: 1, type: '机器人对练', name: '客户身份核验对练', status: '已完成', condition: '分值≥80' },
      { order: 2, type: '机器人对练', name: '强硬态度缓和演练', status: '已停用', condition: '分值≥85' },
      { order: 3, type: '机器人对练', name: '资金困难方案沟通', status: '未开始', condition: '分值≥80' }
    ]
  }
];
