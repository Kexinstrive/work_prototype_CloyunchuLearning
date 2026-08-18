import React, { useState, useEffect, useRef } from 'react';
import TopNav from './TopNav';

const OperationCenterPage = ({ onNavigate, isAutoMode, setIsAutoMode, setShowAutoModal }) => {
  // 多标签页状态管理
  const [tabs, setTabs] = useState([
    { id: 'home', name: '应用大厅', icon: 'th-large', isHome: true, closable: false }
  ]);
  const [activeTabId, setActiveTabId] = useState('home');
  
  // 模块内部状态
  const [moduleSubTab, setModuleSubTab] = useState('create'); 
  // 记录查询子模块状态
  const [recordQuerySubTab, setRecordQuerySubTab] = useState('repayment');

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 模块配置
  const modules = [
    { id: 'call', name: '预测式外呼', icon: 'headset', desc: '基于AI算法的高效自动外呼系统', color: 'blue' },
    { id: 'sms', name: '批量短信', icon: 'comment-alt', desc: '大规模短信发送与触达管理', color: 'emerald' },
    { id: 'letter', name: '批量信函', icon: 'envelope-open-text', desc: '电子律师函、函速达等信函寄送', color: 'purple' },
    { id: 'robot', name: '智能机器人', icon: 'robot', desc: '智能语音/文本机器人交互任务', color: 'indigo' },
    { id: 'logistics', name: '物流协作', icon: 'truck', desc: '信函物流状态跟踪与异常处理', color: 'orange' },
    { id: 'quality', name: '质检管理', icon: 'check-double', desc: '全量录音质检与合规性分析', color: 'cyan' },
    { id: 'legal', name: '法诉管理', icon: 'gavel', desc: '批量诉讼案件流转与进度监控', color: 'red' },
    { id: 'visit', name: '外访管理', icon: 'walking', desc: '外访任务分配与实地签到管理', color: 'teal' },
    { id: 'record_query', name: '记录查询', icon: 'database', desc: '还款、呼叫、短信等综合记录查询', color: 'rose' },
    { id: 'external', name: '外部查询工具', icon: 'search', desc: '第三方数据查询与信息修复', color: 'slate' }
  ];

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const currentModule = modules.find(m => m.id === activeTabId);

  // 打开新标签页
  const handleOpenModule = (module) => {
    const existingTab = tabs.find(t => t.id === module.id);
    if (!existingTab) {
      setTabs([...tabs, { ...module, closable: true }]);
    }
    setActiveTabId(module.id);
    setModuleSubTab('create'); // 重置通用子Tab
    setRecordQuerySubTab('repayment'); // 重置记录查询子Tab
  };

  // 关闭标签页
  const handleCloseTab = (e, tabId) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  // 模拟效果追踪数据渲染图表
  useEffect(() => {
    if (moduleSubTab === 'track' && chartRef.current && window.echarts && currentModule && activeTabId !== 'record_query') {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      chartInstance.current = window.echarts.init(chartRef.current);
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: { lineStyle: { color: '#cbd5e1' } },
          axisLabel: { color: '#64748b' }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { type: 'dashed', color: '#f1f5f9' } },
          axisLabel: { color: '#64748b' }
        },
        series: [
          {
            name: '触达量',
            type: 'line',
            stack: 'Total',
            smooth: true,
            areaStyle: { opacity: 0.1, color: '#3b82f6' },
            itemStyle: { color: '#3b82f6' },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '转化量',
            type: 'line',
            stack: 'Total',
            smooth: true,
            areaStyle: { opacity: 0.1, color: '#10b981' },
            itemStyle: { color: '#10b981' },
            data: [20, 32, 11, 34, 20, 50, 40]
          }
        ]
      };
      
      chartInstance.current.setOption(option);
      
      const handleResize = () => chartInstance.current?.resize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [moduleSubTab, activeTabId]);

  // 记录查询的配置
  const recordQueryConfigs = [
      { id: 'repayment', name: '还款明细查询', columns: ['流水号', '客户姓名', '还款金额', '还款渠道', '还款时间', '入账状态'] },
      { id: 'inbound', name: '呼入记录查询', columns: ['呼入号码', '客户姓名', '关联案件', '呼入时间', '通话时长', '接听坐席'] },
      { id: 'deduction', name: '划扣记录查询', columns: ['划扣单号', '客户姓名', '划扣金额', '银行卡号', '划扣时间', '失败原因'] },
      { id: 'reply_sms', name: '客户回复短信', columns: ['回复号码', '客户姓名', '回复内容', '回复时间', '关联任务', '处理状态'] },
      { id: 'cloud_sms', name: '云手机短信', columns: ['发送号码', '接收号码', '短信内容', '发送时间', '发送状态', '费用'] },
      { id: 'service', name: '客服进线查询', columns: ['进线ID', '客户姓名', '咨询类型', '进线时间', '处理结果', '工单号'] }
  ];

  const currentQueryConfig = recordQueryConfigs.find(c => c.id === recordQuerySubTab);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f1f5f9]">
      <TopNav currentKey="operation" onNavigate={onNavigate} isAutoMode={isAutoMode} setIsAutoMode={setIsAutoMode} setShowAutoModal={setShowAutoModal} />
      
      {/* 浏览器风格标签栏 */}
      <div className="bg-[#dbeafe] px-2 pt-2 flex items-end gap-1 overflow-x-auto border-b border-slate-300 flex-shrink-0">
          {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-t-lg text-xs font-bold cursor-pointer transition-all select-none min-w-[120px] max-w-[200px] border-t border-x ${
                    activeTabId === tab.id 
                    ? 'bg-white text-blue-600 border-transparent shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-10 translate-y-[1px]' 
                    : 'bg-slate-200/80 text-slate-500 border-transparent hover:bg-slate-200'
                }`}
              >
                  <i className={`fa fa-${tab.icon} ${activeTabId === tab.id ? 'text-blue-500' : 'text-slate-400'}`}></i>
                  <span className="truncate flex-1">{tab.name}</span>
                  {tab.closable && (
                      <button 
                        onClick={(e) => handleCloseTab(e, tab.id)}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                          <i className="fa fa-times text-[10px]"></i>
                      </button>
                  )}
                  {/* 分隔线 (仅在非激活状态显示) */}
                  {activeTabId !== tab.id && (
                      <div className="absolute right-0 top-2 bottom-2 w-px bg-slate-300/50"></div>
                  )}
              </div>
          ))}
      </div>

      {/* 主内容区域 */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-hidden bg-white">
          {/* 场景1: 应用大厅 (首页平铺) */}
          {activeTabId === 'home' && (
             <div className="h-full overflow-y-auto p-6 bg-slate-50">
                 <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800">欢迎回到运营中心</h2>
                        <p className="text-sm text-slate-500 mt-1">请选择您需要处理的业务模块</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
                        {modules.map(module => (
                            <div 
                                key={module.id} 
                                onClick={() => handleOpenModule(module)}
                                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group flex flex-col h-40 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity bg-${module.color}-50 rounded-bl-3xl`}>
                                     <i className={`fa fa-${module.icon} text-6xl text-${module.color}-600`}></i>
                                </div>
                                <div className={`w-12 h-12 rounded-lg bg-${module.color}-50 text-${module.color}-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                                    <i className={`fa fa-${module.icon}`}></i>
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">{module.name}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{module.desc}</p>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-[10px] text-slate-400 group-hover:text-blue-600 transition-colors">点击打开</span>
                                    <i className="fa fa-arrow-right text-xs text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
             </div>
          )}

          {/* 场景2: 具体模块内容 */}
          {activeTabId !== 'home' && currentModule && (
            <div className="h-full flex flex-col animate-fadeIn">
               {/* Module Header */}
               <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
                  <div className="flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-lg bg-${currentModule.color}-50 border border-${currentModule.color}-100 flex items-center justify-center text-${currentModule.color}-600`}>
                        <i className={`fa fa-${currentModule.icon}`}></i>
                     </div>
                     <div>
                        <h1 className="text-sm font-bold text-slate-800">{currentModule.name}</h1>
                     </div>
                  </div>
                  
                  {/* 记录查询使用特殊的子导航 */}
                  {activeTabId === 'record_query' ? (
                      <div className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-[600px] no-scrollbar">
                        {recordQueryConfigs.map(conf => (
                            <button
                                key={conf.id}
                                onClick={() => setRecordQuerySubTab(conf.id)}
                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all whitespace-nowrap ${
                                    recordQuerySubTab === conf.id 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {conf.name}
                            </button>
                        ))}
                      </div>
                  ) : (
                      /* 其他模块使用通用子导航 */
                      <div className="flex bg-slate-100 p-1 rounded-lg">
                         {['create', 'list', 'track'].map(tab => (
                            <button
                              key={tab}
                              onClick={() => setModuleSubTab(tab)}
                              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                                 moduleSubTab === tab 
                                 ? 'bg-white text-blue-600 shadow-sm' 
                                 : 'text-slate-500 hover:text-slate-700'
                              }`}
                            >
                               {tab === 'create' && '任务创建'}
                               {tab === 'list' && '任务清单'}
                               {tab === 'track' && '效果追踪'}
                            </button>
                         ))}
                      </div>
                  )}
               </div>

               {/* Module Body */}
               <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                  {/* 记录查询模块视图 */}
                  {activeTabId === 'record_query' ? (
                      <div className="max-w-7xl mx-auto flex flex-col gap-4 animate-fadeIn">
                          {/* 查询条件区域 */}
                          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                              <div className="flex flex-wrap gap-4 items-end">
                                  <div className="w-48">
                                      <label className="block text-xs font-bold text-slate-700 mb-1.5">客户姓名/ID</label>
                                      <input className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="请输入..." />
                                  </div>
                                  <div className="w-48">
                                      <label className="block text-xs font-bold text-slate-700 mb-1.5">手机号码</label>
                                      <input className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:border-blue-500 outline-none" placeholder="请输入..." />
                                  </div>
                                  <div className="w-64">
                                      <label className="block text-xs font-bold text-slate-700 mb-1.5">时间范围</label>
                                      <div className="flex items-center gap-2">
                                          <input type="date" className="flex-1 border border-slate-200 rounded px-2 py-2 text-xs focus:border-blue-500 outline-none" />
                                          <span className="text-slate-400">-</span>
                                          <input type="date" className="flex-1 border border-slate-200 rounded px-2 py-2 text-xs focus:border-blue-500 outline-none" />
                                      </div>
                                  </div>
                                  {recordQuerySubTab === 'repayment' && (
                                      <div className="w-40">
                                          <label className="block text-xs font-bold text-slate-700 mb-1.5">入账状态</label>
                                          <select className="w-full border border-slate-200 rounded px-3 py-2 text-xs focus:border-blue-500 outline-none bg-white">
                                              <option>全部</option>
                                              <option>入账成功</option>
                                              <option>处理中</option>
                                              <option>入账失败</option>
                                          </select>
                                      </div>
                                  )}
                                  <button className="px-6 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-sm transition-colors h-[34px]">
                                      查询
                                  </button>
                                  <button className="px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded text-xs font-bold hover:bg-slate-50 transition-colors h-[34px]">
                                      重置
                                  </button>
                              </div>
                          </div>

                          {/* 数据表格区域 */}
                          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                  <h3 className="font-bold text-slate-700 text-sm">查询结果 <span className="font-normal text-slate-400 text-xs ml-2">(共 24 条)</span></h3>
                                  <button className="text-blue-600 text-xs hover:underline"><i className="fa fa-download mr-1"></i>导出数据</button>
                              </div>
                              <table className="w-full text-left text-xs">
                                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                                      <tr>
                                          {currentQueryConfig?.columns.map((col, idx) => (
                                              <th key={idx} className="p-3">{col}</th>
                                          ))}
                                          <th className="p-3 text-center">操作</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100" data-ai-list="true">
                                      {[1, 2, 3, 4, 5].map(i => (
                                          <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                              {currentQueryConfig?.id === 'repayment' && (
                                                  <>
                                                      <td className="p-3 font-mono text-slate-500">TXN20250128{i}99</td>
                                                      <td className="p-3 font-medium">张*三</td>
                                                      <td className="p-3 font-mono font-bold">¥ {(Math.random() * 1000).toFixed(2)}</td>
                                                      <td className="p-3">微信支付</td>
                                                      <td className="p-3 text-slate-500">2025-01-28 10:23:{i}0</td>
                                                      <td className="p-3"><span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">成功</span></td>
                                                  </>
                                              )}
                                              {currentQueryConfig?.id === 'inbound' && (
                                                  <>
                                                      <td className="p-3 font-mono">138****123{i}</td>
                                                      <td className="p-3 font-medium">李*四</td>
                                                      <td className="p-3 text-blue-600 cursor-pointer">CASE-2025-{i}</td>
                                                      <td className="p-3 text-slate-500">2025-01-28 09:15:{i}0</td>
                                                      <td className="p-3">{120 + i * 10}秒</td>
                                                      <td className="p-3">工号8021</td>
                                                  </>
                                              )}
                                              {currentQueryConfig?.id === 'deduction' && (
                                                  <>
                                                      <td className="p-3 font-mono">DK20250128{i}</td>
                                                      <td className="p-3 font-medium">王*五</td>
                                                      <td className="p-3 font-mono font-bold">¥ 500.00</td>
                                                      <td className="p-3 font-mono">6222****888{i}</td>
                                                      <td className="p-3 text-slate-500">2025-01-28 14:00</td>
                                                      <td className="p-3"><span className="text-red-500">余额不足</span></td>
                                                  </>
                                              )}
                                              {/* 默认渲染逻辑，防止空白 */}
                                              {!['repayment', 'inbound', 'deduction'].includes(currentQueryConfig?.id) && (
                                                  <>
                                                      <td className="p-3 font-mono text-slate-500">ID-{i}000{i}</td>
                                                      <td className="p-3 font-medium">模拟客户{i}</td>
                                                      <td className="p-3 text-slate-500">示例内容数据...</td>
                                                      <td className="p-3 text-slate-500">2025-01-28 10:00</td>
                                                      <td className="p-3">状态正常</td>
                                                      <td className="p-3">-</td>
                                                  </>
                                              )}
                                              <td className="p-3 text-center">
                                                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">详情</button>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                              {/* 分页 */}
                              <div className="p-3 border-t border-slate-200 flex justify-between items-center">
                                  <span className="text-[10px] text-slate-400">显示 1-5 共 24 条</span>
                                  <div className="flex gap-1">
                                      <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50"><i className="fa fa-chevron-left text-[10px] text-slate-400"></i></button>
                                      <button className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">1</button>
                                      <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-[10px] text-slate-600">2</button>
                                      <button className="w-6 h-6 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50"><i className="fa fa-chevron-right text-[10px] text-slate-400"></i></button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ) : activeTabId === 'external' ? (
                      <div className="max-w-6xl mx-auto flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <ExternalToolCard title="社保信息查询" icon="building" desc="查询最新的社保缴纳状态与单位信息" />
                              <ExternalToolCard title="公积金查询" icon="home" desc="获取公积金缴纳基数与单位" />
                              <ExternalToolCard title="工商信息查询" icon="briefcase" desc="查询企业法人、股东及经营异常信息" />
                              <ExternalToolCard title="司法涉诉查询" icon="gavel" desc="查询目标对象的开庭公告与裁判文书" />
                              <ExternalToolCard title="号码状态修复" icon="mobile-alt" desc="检测手机号实名状态与在网时长" />
                              <ExternalToolCard title="地址信息修复" icon="map-marker-alt" desc="基于大数据的物流地址挖掘" />
                          </div>
                          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                              <h3 className="font-bold text-slate-800 mb-4">快速查询入口</h3>
                              <div className="flex gap-4">
                                  <input className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm" placeholder="请输入身份证号/手机号/企业名称" />
                                  <button className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold">立即查询</button>
                              </div>
                              <div className="mt-4">
                                  <span className="text-xs text-slate-400">最近查询记录：</span>
                                  <div className="mt-2 flex flex-col gap-2" data-ai-list="true">
                                      <div className="flex justify-between text-xs py-2 border-b border-slate-50">
                                          <span>3701***********35 (社保)</span>
                                          <span className="text-slate-400">2025-01-28 10:23</span>
                                      </div>
                                      <div className="flex justify-between text-xs py-2 border-b border-slate-50">
                                          <span>156****8899 (号码修复)</span>
                                          <span className="text-slate-400">2025-01-28 09:15</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <div className="max-w-6xl mx-auto">
                          {/* 1. 任务创建视图 */}
                          {moduleSubTab === 'create' && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
                                <div className="p-6 border-b border-slate-100">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <i className="fa fa-plus-circle text-blue-500"></i>
                                    新建{currentModule.name}任务
                                </h3>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormGroup label="任务名称" placeholder="请输入任务名称，如：1月M2批次催收" required colSpan={2} />
                                
                                <FormGroup label="任务类型" type="select" required>
                                    <option>常规催收</option>
                                    <option>节日关怀</option>
                                    <option>紧急通知</option>
                                </FormGroup>

                                <FormGroup label="执行时间" type="datetime" required />

                                {/* 差异化字段 */}
                                {activeTabId === 'letter' && (
                                    <FormGroup label="信函类型" type="select" required>
                                        <option>电子律师函</option>
                                        <option>函速达</option>
                                        <option>普通信函</option>
                                        <option>法务催告函</option>
                                    </FormGroup>
                                )}

                                {activeTabId === 'sms' && (
                                    <FormGroup label="短信通道" type="select" required>
                                        <option>营销通道A</option>
                                        <option>通知通道B</option>
                                        <option>催收专用通道</option>
                                    </FormGroup>
                                )}

                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        <span className="text-red-500 mr-1">*</span>目标客群筛选
                                    </label>
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                                        <div className="flex flex-wrap gap-2">
                                            <FilterTag text="逾期天数 > 30" />
                                            <FilterTag text="金额 > 1000" />
                                            <FilterTag text="未接通次数 > 3" />
                                            <button className="px-3 py-1 text-xs text-blue-600 bg-white border border-blue-200 rounded-full hover:bg-blue-50 transition-colors">
                                            <i className="fa fa-plus mr-1"></i>添加条件
                                            </button>
                                        </div>
                                        <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                                            <i className="fa fa-users text-slate-400"></i>
                                            预计覆盖人数：<span className="font-bold text-slate-800">12,450</span> 人
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <FormGroup label="任务备注" type="textarea" placeholder="请输入任务说明..." />
                                </div>
                                </div>
                                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                                <button className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-white transition-colors">取消</button>
                                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">创建任务</button>
                                </div>
                            </div>
                          )}

                          {/* 2. 任务清单视图 */}
                          {moduleSubTab === 'list' && (
                            <div className="flex flex-col gap-4 animate-fadeIn">
                                {/* 筛选栏 */}
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-wrap items-end gap-4">
                                <div className="flex-1 min-w-[200px]">
                                    <FormGroup label="任务ID/名称" placeholder="请输入关键词搜索" mb={0} />
                                </div>
                                <div className="w-40">
                                    <FormGroup label="状态" type="select" mb={0}>
                                        <option>全部</option>
                                        <option>进行中</option>
                                        <option>已完成</option>
                                        <option>暂停</option>
                                    </FormGroup>
                                </div>
                                <div className="w-40">
                                    <FormGroup label="创建人" placeholder="请输入" mb={0} />
                                </div>
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors h-[38px]">
                                    查询
                                </button>
                                </div>

                                {/* 列表 */}
                                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                        <tr>
                                            <th className="p-4">任务ID</th>
                                            <th className="p-4">任务名称</th>
                                            <th className="p-4">类型</th>
                                            <th className="p-4">目标数量</th>
                                            <th className="p-4">当前进度</th>
                                            <th className="p-4">状态</th>
                                            <th className="p-4">创建时间</th>
                                            <th className="p-4 text-center">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100" data-ai-list="true">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="p-4 font-mono text-slate-500">TASK-20260128-{i.toString().padStart(3, '0')}</td>
                                            <td className="p-4 font-bold text-slate-700">1月下旬{currentModule.name}专项-{i}</td>
                                            <td className="p-4 text-slate-600">常规任务</td>
                                            <td className="p-4 font-mono">{(Math.random() * 5000 + 1000).toFixed(0)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-20">
                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                                                    </div>
                                                    <span className="text-xs text-slate-500">{(Math.random() * 100).toFixed(0)}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${i % 2 === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {i % 2 === 0 ? '已完成' : '进行中'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-500">2026-01-28 10:00</td>
                                            <td className="p-4 text-center">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium mx-1">详情</button>
                                                <button className="text-slate-400 hover:text-red-500 font-medium mx-1">停止</button>
                                            </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Pagination */}
                                <div className="p-4 border-t border-slate-200 flex justify-between items-center">
                                    <span className="text-xs text-slate-400">显示 1-5 共 128 条</span>
                                    <div className="flex gap-1">
                                        <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50"><i className="fa fa-chevron-left text-xs text-slate-400"></i></button>
                                        <button className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center text-xs">1</button>
                                        <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-xs text-slate-600">2</button>
                                        <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50"><i className="fa fa-chevron-right text-xs text-slate-400"></i></button>
                                    </div>
                                </div>
                                </div>
                            </div>
                          )}

                          {/* 3. 效果追踪视图 */}
                          {moduleSubTab === 'track' && (
                            <div className="flex flex-col gap-6 animate-fadeIn">
                                {/* 概览卡片 */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <StatCard title="总触达人数" value="124,592" unit="人" trend="+12%" color="blue" icon="users" />
                                <StatCard title="平均响应率" value="34.2" unit="%" trend="+5%" color="emerald" icon="check-circle" />
                                <StatCard title="转化/承诺还款" value="1,204" unit="笔" trend="-2%" color="purple" icon="hand-holding-usd" />
                                <StatCard title="异常/投诉" value="0.4" unit="%" trend="-0.1%" color="red" icon="exclamation-triangle" />
                                </div>

                                {/* 图表区域 */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
                                        <span>触达与转化趋势</span>
                                        <select className="text-xs border border-slate-200 rounded px-2 py-1 font-normal">
                                            <option>最近7天</option>
                                            <option>最近30天</option>
                                        </select>
                                    </h3>
                                    <div className="h-[300px] w-full" ref={chartRef}></div>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-4">执行效果排行</h3>
                                    <div className="flex flex-col gap-4" data-ai-list="true">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${i <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{i}</span>
                                                <span className="text-xs text-slate-700 font-medium">策略组 A-{i}</span>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-slate-800">{(98 - i * 5).toFixed(1)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                </div>
                            </div>
                          )}
                      </div>
                  )}
               </div>
            </div>
          )}
      </main>
    </div>
  );
};

// 辅助组件
const FormGroup = ({ label, type = 'text', placeholder, required, mb = 4, colSpan = 1, children }) => (
  <div className={`flex flex-col gap-1.5 mb-${mb} ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
     <label className="text-xs font-bold text-slate-700">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
     </label>
     {type === 'select' ? (
        <div className="relative">
           <select className="w-full appearance-none border border-slate-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 bg-white text-slate-600 transition-all">
              {children}
           </select>
           <i className="fa fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none"></i>
        </div>
     ) : type === 'textarea' ? (
        <textarea 
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 min-h-[100px] resize-none transition-all placeholder:text-slate-300"
          placeholder={placeholder}
        ></textarea>
     ) : type === 'datetime' ? (
        <input 
          type="datetime-local" 
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-slate-300"
        />
     ) : (
        <input 
          type={type} 
          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-slate-300"
          placeholder={placeholder}
        />
     )}
  </div>
);

const FilterTag = ({ text }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 shadow-sm">
     <span>{text}</span>
     <button className="text-slate-400 hover:text-red-500 transition-colors"><i className="fa fa-times"></i></button>
  </div>
);

const ExternalToolCard = ({ title, icon, desc }) => (
    <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-start gap-3 hover:shadow-md transition-shadow cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <i className={`fa fa-${icon}`}></i>
        </div>
        <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
            <p className="text-xs text-slate-500 leading-tight">{desc}</p>
        </div>
    </div>
);

const StatCard = ({ title, value, unit, trend, color, icon }) => {
   const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
      red: 'bg-red-50 text-red-600 border-red-100'
   };
   
   const isPositive = trend.startsWith('+');
   
   return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
         <div className="flex items-start justify-between">
            <div className="flex flex-col">
               <span className="text-xs text-slate-500 mb-1">{title}</span>
               <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-800 font-mono">{value}</span>
                  <span className="text-xs text-slate-400">{unit}</span>
               </div>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
               <i className={`fa fa-${icon}`}></i>
            </div>
         </div>
         <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
               {trend} 
               <i className={`fa fa-arrow-${isPositive ? 'up' : 'down'} ml-1`}></i>
            </span>
            <span className="text-[10px] text-slate-400">较上周</span>
         </div>
      </div>
   );
}

export default OperationCenterPage;