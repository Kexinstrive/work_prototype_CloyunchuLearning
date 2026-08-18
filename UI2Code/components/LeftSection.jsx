import React, { useState, useRef, useEffect } from 'react';

const LeftSection = ({ isShrink = false }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [caseInfoTab, setCaseInfoTab] = useState('JDJR_京东白条');
  const scrollContainerRef = useRef(null);

  // 弹窗与倒计时状态
  const [showPredictiveModal, setShowPredictiveModal] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
      let timer;
      if (showPredictiveModal && countdown > 0) {
          timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      } else if (showPredictiveModal && countdown === 0) {
          setShowPredictiveModal(false);
          // 原型中可以使用自定义事件触发跳转
          const event = new CustomEvent('switch-to-predictive-mode');
          window.dispatchEvent(event);
      }
      return () => clearTimeout(timer);
  }, [showPredictiveModal, countdown]);

  const handleNextCase = () => {
      // 取消预测式外呼提示弹窗
  };

  // 模拟数据 - 账户列表
  const accountData = [
    {
      id: 1,
      productType: 'JDJR_京东金条',
      overdueDays: 0,
      totalDue: '1,308.44',
      overdueAmount: '0.00',
      details: {
        '待还本金': '1,166.69',
        '待还手续费': '141.75',
        '待还罚息': '0.00',
        '除罚息外总额': '1,308.44'
      }
    },
    {
      id: 2,
      productType: 'JDJR_京东白条',
      overdueDays: 30,
      totalDue: '23,429.49',
      overdueAmount: '1,869.09',
      details: {
        '待还本金': '23,380.73',
        '待还罚息': '48.76',
        '待还违约金': '0.00',
        '除罚息外总额': '23,380.73'
      }
    },
    {
      id: 3,
      productType: 'JDJR_联名卡',
      overdueDays: 5,
      totalDue: '5,000.00',
      overdueAmount: '5,000.00',
      details: {
        '待还本金': '4,800.00',
        '待还罚息': '200.00',
        '待还违约金': '0.00',
        '除罚息外总额': '4,800.00'
      }
    }
  ];

  // 模拟数据 - 账单列表
  const billData = [
    {
      pin: 'q1217877330',
      type: '京东金条',
      loanNo: '...380021610455',
      terms: 12,
      principalDue: '1,166.69',
      status: '未逾期',
      overdueAmount: '0',
      overdueStartDate: '2026-03-24',
      rate: '0.05%'
    },
    {
      pin: 'q1217877330',
      type: '京东白条',
      loanNo: 'BT20250101001',
      terms: 1,
      principalDue: '2,300.00',
      status: '逾期',
      overdueAmount: '2,300.00',
      overdueStartDate: '2025-12-25',
      rate: '0.05%'
    }
  ];

  // 模拟数据 - 历史还款
  const repaymentData = [
    { date: '25-01-15', amount: '500.00', channel: '微信', status: '成功' },
    { date: '24-12-12', amount: '812.00', channel: '代扣', status: '成功' },
  ];

  const tabs = [
      { id: 'basic', name: '基本信息', icon: 'user' },
      { id: 'profile', name: '客户画像', icon: 'id-card-alt' },
      { id: 'account', name: '账户信息', icon: 'file-invoice-dollar' },
      { id: 'bill', name: '账单信息', icon: 'receipt' },
      { id: 'assign_record', name: '分案记录', icon: 'list-alt' },
      { id: 'repayment', name: '还款信息', icon: 'history' }
  ];

  // 卡片1：客户信息
  const renderCustomerInfoCard = () => (
    <div className="bg-white rounded-md border border-slate-200 px-2.5 py-1.5 flex flex-col gap-1 h-full overflow-hidden hover:border-blue-300 transition-colors">
        <div className="flex items-center gap-1 border-b border-slate-100 pb-1 flex-shrink-0">
            <i className="fa fa-user-circle text-blue-500 text-[11px]"></i>
            <h4 className="font-bold text-[11px] text-slate-800">客户信息</h4>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-1 pr-1">
            <div className="grid grid-cols-4 gap-x-2 gap-y-3 text-[10px]">
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">客户ID</span>
                    <div className="flex items-center gap-1">
                        <span className="font-mono text-slate-800 truncate" title="jd123456">jd123456</span>
                        <i className="fa fa-copy text-slate-300 hover:text-blue-500 cursor-pointer" title="复制"></i>
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">民族</span>
                    <span className="text-slate-800 truncate" title="汉族">汉族</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">行职业</span>
                    <span className="text-slate-800 truncate" title="未注册个体户">未注册个体户</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-slate-500">资产状态</span>
                  <span className="text-slate-800 truncate" title="有车有房">有车有房</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">共债平台</span>
                    <span className="text-slate-800 truncate" title="至少5家">至少5家</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500">投诉倾向</span>
                    <span className="text-slate-800 truncate" title="否">否</span>
                </div>
            </div>
        </div>
    </div>
  );

  // 卡片2：案件信息
  const renderCaseInfoCard = () => (
    <div className="bg-white rounded-md border border-slate-200 px-2.5 py-1.5 flex flex-col gap-1 h-full overflow-hidden hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1 flex-shrink-0">
            <div className="flex items-center gap-1">
                <i className="fa fa-folder-open text-indigo-500 text-[11px]"></i>
                <h4 className="font-bold text-[11px] text-slate-800">案件信息</h4>
            </div>
            <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">评分A(85分)</span>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* 产品类型Tab */}
            <div className="flex gap-1 bg-slate-50 p-0.5 rounded mb-1 flex-shrink-0">
                {['JDJR_京东白条', 'JDJR_京东金条'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setCaseInfoTab(tab)}
                        className={`flex-1 py-0.5 text-[9px] font-medium rounded transition-colors ${
                            caseInfoTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab.split('_')[1]}
                    </button>
                ))}
            </div>
            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-500">实时应还</span><span className="text-red-600 font-bold font-mono">14,737.93</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">实时逾期</span><span className="text-slate-800 font-mono">14,737.93</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">除罚息外总额</span><span className="text-slate-800 font-mono">14,689.17</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">总罚息</span><span className="text-slate-800 font-mono">48.76</span></div>
                    <div className="flex justify-between col-span-2"><span className="text-slate-500">预期本金总待还</span><span className="text-slate-800 font-mono">23,380.73</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">当前逾期情况</span><span className="text-slate-800">{caseInfoTab === 'JDJR_京东白条' ? '再逾期' : '未逾期'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">历史逾期情况</span><span className="text-slate-800">{caseInfoTab === 'JDJR_京东白条' ? '长期逾期' : '曾逾期 M1'}</span></div>
                </div>
            </div>
        </div>
    </div>
  );

  // 卡片3：还款信息
  const renderRepayInfoCard = () => (
    <div className="bg-white rounded-md border border-slate-200 px-2.5 py-1.5 flex flex-col gap-1 h-full overflow-hidden hover:border-blue-300 transition-colors">
        <div className="flex items-center gap-1 border-b border-slate-100 pb-1 flex-shrink-0">
            <i className="fa fa-wallet text-emerald-500 text-[11px]"></i>
            <h4 className="font-bold text-[11px] text-slate-800">还款信息</h4>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px]">
                <div className="flex justify-between">
                    <span className="text-slate-500">减免类型</span>
                    <span className="text-slate-800">息费全免</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">最大减免</span>
                    <span className="text-slate-800 font-mono">48.76</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">还款券额度</span>
                    <span className="text-emerald-600 font-bold font-mono">2,300.00</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">还款券</span>
                    <span className="text-slate-800">可用1张</span>
                </div>
                <div className="col-span-2 flex justify-between pt-0.5 border-t border-slate-50 mt-0.5">
                    <span className="text-slate-500">最后还款日</span>
                    <span className="text-slate-800">2025-01-15</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">最后还款金额</span>
                    <span className="text-slate-800 font-mono">500.00</span>
                </div>
                <div className="flex justify-between col-span-2">
                    <span className="text-slate-500">最后还款方式</span>
                    <span className="text-slate-800">微信支付</span>
                </div>
            </div>
        </div>
    </div>
  );

  // 卡片4：催记总结
  const renderRecordSummaryCard = () => (
    <div className="bg-[#fff7e6] rounded-md border border-orange-100 px-2.5 py-1.5 flex flex-col gap-1 h-full overflow-hidden hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-1 border-b border-orange-200/50 pb-1 flex-shrink-0">
            <i className="fa fa-history text-orange-500 text-[12px]"></i>
            <h4 className="font-bold text-[11px] text-slate-800">催记总结</h4>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 mt-1">
            <ul className="list-disc list-outside ml-4 text-xs text-slate-700 leading-relaxed flex flex-col gap-2">
                <li>表示在做生意，但目前<span className="text-red-500 font-bold">生意不太好</span>，资金周转困难。</li>
                <li>反馈当前<span className="text-red-500 font-bold">负债较多</span>，暂无稳定的收入来源。</li>
                <li>后期提到偶尔做临时工，但<span className="text-red-500 font-bold">收入不佳</span>，无法维持正常还款。</li>
            </ul>
        </div>
    </div>
  );

  // 卡片5：综合情况总结
  const renderAnalyzeSummaryCard = () => (
    <div className="bg-[#e6f7ff] rounded-md border border-blue-100 px-2.5 py-1.5 flex flex-col gap-1 h-full overflow-hidden hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-1 border-b border-blue-200/50 pb-1 flex-shrink-0">
            <i className="fa fa-chart-pie text-blue-500 text-[12px]"></i>
            <h4 className="font-bold text-[11px] text-slate-800">综合情况总结</h4>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 mt-1">
            <ul className="list-disc list-outside ml-4 text-xs text-slate-700 leading-relaxed flex flex-col gap-2">
                <li>近三个月内<span className="text-blue-600 font-bold">无客服主动进线</span>记录。</li>
                <li>最近一次有效沟通时间为<span className="text-blue-600 font-bold">2026-03-09</span>，通过电话触达本人。</li>
                <li>通话中客户<span className="text-blue-600 font-bold">情绪激动</span>，尝试引导<span className="text-blue-600 font-bold">协商新方案</span>。</li>
            </ul>
        </div>
    </div>
  );

  // 卡片6：历史还款意愿
  const renderRepayWillingnessCard = () => (
    <div className="bg-[#f6ffed] rounded-md border border-emerald-100 px-2.5 py-1.5 flex flex-col gap-1 h-full overflow-hidden hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-1 border-b border-emerald-200/50 pb-1 flex-shrink-0">
            <i className="fa fa-heart text-emerald-500 text-[12px]"></i>
            <h4 className="font-bold text-[11px] text-slate-800">历史还款意愿</h4>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 mt-1">
            <ul className="list-disc list-outside ml-4 text-xs text-slate-700 leading-relaxed flex flex-col gap-2">
                <li>客户有<span className="font-bold text-emerald-600">较强的还款意愿</span>，曾多次主动询问分期。</li>
                <li>对罚息减免<span className="font-bold text-emerald-600">比较敏感</span>，希望能够减免部分利息。</li>
                <li>约定过2次还款，但最终<span className="font-bold text-red-500">未能履约</span>，偿还能力不足。</li>
            </ul>
        </div>
    </div>
  );

  // 紧凑版案件信息（配合事前助手布局）
  const renderCaseInfoCardCompact = () => (
      <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between pb-1.5 flex-shrink-0">
              <h4 className="font-bold text-[12px] text-slate-800">案件信息</h4>
              <span className="text-[10px] text-emerald-500">A (85分)</span>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex gap-3 mb-2 flex-shrink-0 border-b border-slate-100 pb-1">
                  {['JDJR_京东白条', 'JDJR_京东金条'].map(tab => (
                      <button 
                          key={tab}
                          onClick={() => setCaseInfoTab(tab)}
                          className={`text-[10px] pb-0.5 transition-colors ${
                              caseInfoTab === tab ? 'text-blue-600 font-bold border-b border-blue-600' : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                          {tab.split('_')[1]}
                      </button>
                  ))}
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                  <div className="flex flex-col gap-1.5 text-[10px]">
                      <div className="flex justify-between items-center"><span className="text-slate-500">实时应还</span><span className="text-slate-800">14,737.93</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">实时逾期</span><span className="text-slate-800">14,737.93</span></div>
                      <div className="w-full h-[1px] bg-slate-50 my-0.5"></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">除罚息外总额</span><span className="text-slate-800">14,689.17</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">总罚息</span><span className="text-slate-800">48.76</span></div>
                      <div className="w-full h-[1px] bg-slate-50 my-0.5"></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">逾期本金总待还</span><span className="text-slate-800">23,380.73</span></div>
                      <div className="w-full h-[1px] bg-slate-50 my-0.5"></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">当前逾期情况</span><span className="text-slate-800">{caseInfoTab === 'JDJR_京东白条' ? '再逾期' : '未逾期'}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">历史逾期情况</span><span className="text-slate-800">{caseInfoTab === 'JDJR_京东白条' ? '长期逾期' : '曾逾期 M1'}</span></div>
                  </div>
              </div>
          </div>
      </div>
  );

  // 紧凑版还款信息（配合事前助手布局）
  const renderRepayInfoCardCompact = () => (
      <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between pb-1.5 flex-shrink-0">
              <h4 className="font-bold text-[12px] text-slate-800">还款信息</h4>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex gap-3 mb-2 flex-shrink-0 border-b border-slate-100 pb-1">
                  {['JDJR_京东白条', 'JDJR_京东金条'].map(tab => (
                      <button 
                          key={tab}
                          onClick={() => setCaseInfoTab(tab)}
                          className={`text-[10px] pb-0.5 transition-colors ${
                              caseInfoTab === tab ? 'text-blue-600 font-bold border-b border-blue-600' : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                          {tab.split('_')[1]}
                      </button>
                  ))}
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                  <div className="flex flex-col gap-1.5 text-[10px]">
                      <div className="flex justify-between items-center"><span className="text-slate-500">减免类型</span><span className="text-slate-800">息费全免</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">最大减免</span><span className="text-slate-800">48.76</span></div>
                      <div className="w-full h-[1px] bg-slate-50 my-0.5"></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">还款券额度</span><span className="text-slate-800">2,300.00</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">还款券</span><span className="text-slate-800">可用1张</span></div>
                      <div className="w-full h-[1px] bg-slate-50 my-0.5"></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">最后还款日</span><span className="text-slate-800">2025-01-15</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">最后还款金额</span><span className="text-slate-800">500.00</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-500">最后还款方式</span><span className="text-slate-800">主动还款</span></div>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="bg-white flex flex-col w-full h-full relative">
         {/* 预测式外呼提醒弹窗 */}
         {showPredictiveModal && (
             <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                 <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 flex flex-col items-center text-center animate-fadeIn">
                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                         <i className="fa fa-rocket text-blue-600 text-xl"></i>
                     </div>
                     <h3 className="text-lg font-bold text-slate-800 mb-2">模式跳转提示</h3>
                     <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                         您好，当前预测式外呼池内案件已达100件，即将为您跳转至预测式外呼模式处理
                     </p>
                     <div className="text-4xl font-mono font-bold text-blue-600 mb-2">
                         {countdown}s
                     </div>
                     <p className="text-xs text-slate-400">后自动跳转</p>
                 </div>
             </div>
         )}

         {/* 顶部重要信息区域 */}
         <div className="px-4 bg-white flex-shrink-0 pt-3 pb-1.5 relative">
             <div className="flex justify-between items-start gap-4">
                 {/* 左侧信息 */}
                 <div className="flex flex-col gap-2 flex-1 min-w-0">
                     {/* 第一行 */}
                     <div className="flex items-center flex-wrap gap-2 text-xs text-slate-600">
                         <h2 className="font-extrabold text-slate-900 leading-none tracking-tight text-xl">
                           张佳铭 <span className="text-xs font-normal text-slate-500 ml-1">(Zhāng Jiā Míng)</span>
                         </h2>
                         <span className="text-slate-200 ml-1">|</span>
                         <span>男</span>
                         <span className="text-slate-200">|</span>
                         <span>22岁</span>
                         <span className="text-slate-200">|</span>
                         <div className="flex items-center gap-1">
                              <span>山东省 济南市 历下区</span>
                              <i className="fa fa-lock text-amber-500 text-[10px]" title="地址已锁定"></i>
                         </div>
                     </div>
                     
                     {/* 第二行 */}
                     <div className="flex flex-wrap items-center gap-1.5">
                         <div className="relative group">
                             <select className="appearance-none bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[10px] px-1.5 py-0.5 pr-5 rounded focus:outline-none focus:border-blue-300 cursor-pointer">
                                 <option>行动状态: 协商跟进</option>
                                 <option>承诺还款</option>
                                 <option>无意愿</option>
                                 <option>失联</option>
                             </select>
                             <i className="fa fa-caret-down absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-blue-500 pointer-events-none"></i>
                         </div>

                         <div className="relative group">
                             <select className="appearance-none bg-orange-50 border border-orange-200 text-orange-600 font-bold text-[10px] px-1.5 py-0.5 pr-5 rounded focus:outline-none focus:border-orange-300 cursor-pointer">
                                 <option>待分类</option>
                                 <option>高优处理</option>
                                 <option>暂缓催收</option>
                                 <option>重点关注</option>
                                 <option>特殊跟进</option>
                             </select>
                             <i className="fa fa-caret-down absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-orange-500 pointer-events-none"></i>
                         </div>
                         
                         <div className="group relative">
                             <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold shadow-sm cursor-help">R标</span>
                             <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max px-2 py-1 bg-slate-800 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                 高风险案件，需重点把控合规
                                 <div className="absolute left-1/2 -translate-x-1/2 top-full border-[3px] border-transparent border-t-slate-800"></div>
                             </div>
                         </div>

                         <div className="group relative">
                             <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 border border-purple-200 text-[10px] font-bold shadow-sm cursor-help">FX标</span>
                             <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max px-2 py-1 bg-slate-800 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                 反欺诈标签，注意核实身份
                                 <div className="absolute left-1/2 -translate-x-1/2 top-full border-[3px] border-transparent border-t-slate-800"></div>
                             </div>
                         </div>

                         <div className="group relative">
                             <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] cursor-help">还款券减免</span>
                             <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max px-2 py-1 bg-slate-800 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                 满足减免政策条件
                                 <div className="absolute left-1/2 -translate-x-1/2 top-full border-[3px] border-transparent border-t-slate-800"></div>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* 右侧金额与指标及操作按钮 */} 
                 <div className="flex flex-col justify-between items-end flex-shrink-0 max-w-[500px]">
                     {/* 右上角案件操作按钮 */} 
                     <div className="flex items-center gap-1.5 mb-1">
                        <button className="w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-slate-200 bg-white" title="上一个案件">
                            <i className="fa fa-arrow-left text-[10px]"></i>
                        </button>
                        <button 
                            onClick={handleNextCase}
                            className="w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-slate-200 bg-white"
                            title="下一个案件"
                        >
                            <i className="fa fa-arrow-right text-[10px]"></i>
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm border border-slate-200 bg-white relative" title="案件跟进提醒时间">
                            <i className="fa fa-clock text-[10px]"></i>
                            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                        </button>
                     </div>
                     {/* 大字号数据展示 */} 
                     <div className="flex flex-wrap justify-end gap-x-4 gap-y-1">
                         <div className="flex flex-col items-end">
                             <span className="text-[10px] text-slate-500 mb-0.5">应催金额</span>
                             <span className="font-bold text-red-600 font-mono leading-none tracking-tight text-xl">24,737.93</span>
                         </div>
                         <div className="flex flex-col items-end">
                             <span className="text-[10px] text-slate-500 mb-0.5">今日总还款</span>
                             <span className="font-bold text-emerald-600 font-mono leading-none tracking-tight text-xl">5,000.00</span>
                         </div>
                         <div className="flex flex-col items-end">
                             <span className="text-[10px] text-slate-500 mb-0.5">逾期天数</span>
                             <div className="flex items-baseline gap-0.5">
                                 <span className="font-bold text-slate-800 font-mono leading-none text-xl">30</span>
                                 <span className="text-[10px] text-slate-500">天</span>
                             </div>
                         </div>
                         <div className="flex flex-col items-end">
                             <span className="text-[10px] text-slate-500 mb-0.5">委托周期</span>
                             <span className="text-xs font-bold text-slate-700 font-mono leading-none mt-0.5">01.01 - 06.30</span>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         {/* 子tab标题栏 */}
         <div className="flex flex-col border-y border-slate-100 bg-white flex-shrink-0 relative">
             <div className="flex items-end px-2 pt-0.5 gap-0.5 overflow-x-auto no-scrollbar">
                 {tabs.map(tab => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-2.5 py-1.5 text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap leading-none border-b-2 ${
                            activeTab === tab.id 
                            ? 'text-blue-600 border-blue-600 bg-transparent' 
                            : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50 rounded-t'
                        }`}
                     >
                         <i className={`fa fa-${tab.icon} ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'} text-[10px]`}></i>
                         {tab.name}
                     </button>
                 ))}
             </div>
         </div>

         {/* 子tab卡片区内容，改为 flex-1 以充满剩余高度 */}
         <div className="flex-1 bg-white relative transition-all duration-300 overflow-hidden flex flex-col">
            {activeTab === 'basic' && (
                <div className="flex flex-col h-full animate-fadeIn p-1.5 bg-slate-50/30 gap-2 overflow-y-auto custom-scrollbar">
                    {/* 上半部分：事前助手与案件/还款信息 */}
                    <div className="flex gap-1.5 w-full shrink-0">
                        {/* 左侧：事前助手 */}
                        <div className="flex-[5] bg-white rounded-md border border-slate-200 px-3 py-3 flex flex-col hover:border-blue-300 transition-colors shadow-sm relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                            
                            <div className="flex items-center gap-1.5 mb-3 ml-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                <h4 className="font-bold text-[13px] text-slate-800">事前助手</h4>
                            </div>
                            
                            <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4 ml-1 text-[12px]">
                                {/* 左列：用户情况 + 沟通记录 */}
                                <div className="flex flex-col gap-4">
                                    {/* 用户情况 */}
                                    <div className="flex flex-col gap-1.5">
                                        <h5 className="font-bold text-[12px] text-slate-800 border-b border-slate-100 pb-1">用户情况</h5>
                                        <div className="flex flex-col gap-1 text-[11px]">
                                            <div className="flex items-start"><span className="text-slate-500 shrink-0">还款能力：</span><span className="text-orange-500 leading-tight">中</span><span className="text-slate-500 shrink-0 ml-2">还款意愿：</span><span className="text-red-500 leading-tight">低</span></div>
                                            <div className="flex items-start"><span className="text-slate-500 shrink-0">历史习惯：</span><span className="text-slate-700 leading-tight">多次跳票；习惯月末还款</span></div>
                                            <div className="flex items-start"><span className="text-slate-500 shrink-0">还款总结：</span><span className="text-slate-700 leading-tight">历史还款1次，最近一次还款时间为2025-09-27，还款金额为2260.81元</span></div>
                                            <div className="flex items-start"><span className="text-slate-500 shrink-0">情况摘要：</span><span className="text-slate-700 leading-tight">用户因长期未发工资导致资金困难，全程接听且承认欠款，目前明确表示暂无能力<br/>无历史法诉情况、非历史失信被执行人<br/>消费层级为中消费；消费频次为中频；京东app为近7天活跃</span></div>
                                        </div>
                                    </div>
                                    {/* 沟通记录 */}
                                    <div className="flex flex-col gap-1.5">
                                        <h5 className="font-bold text-[12px] text-slate-800 border-b border-slate-100 pb-1">沟通记录</h5>
                                        <div className="flex flex-col gap-1 text-[11px]">
                                            <div className="flex items-start"><span className="text-slate-500 shrink-0">最近有效沟通：</span><span className="text-slate-700 leading-tight">2026-04-18，电催沟通；用户本人接听,用户表示月底前处理欠款，但未明确具体日期，催收员要求确认时间并保持电话畅通。</span></div>
                                            <div className="flex items-start mt-1"><span className="text-slate-500 shrink-0">催记总结：</span><span className="text-slate-700 leading-tight">用户从2026年3月14日至4月15日持续表达还款意愿但能力有限，原因均为失业及工资未到账，期间多次承诺还款时间但均未兑现，催收记录中未提及高风险行为。</span></div>
                                            
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                <div className="flex justify-between items-center bg-blue-50/50 px-2 py-1 rounded">
                                                    <span className="text-slate-500">还款承诺</span>
                                                    <span className="text-blue-500">10-15前还款¥1,000</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-blue-50/50 px-2 py-1 rounded">
                                                    <span className="text-slate-500">法律函件</span>
                                                    <span className="text-blue-500">已送达/最近: 05-06</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-blue-50/50 px-2 py-1 rounded">
                                                    <span className="text-slate-500">客服进线</span>
                                                    <span className="text-blue-500">3次 / 最近: 05-20</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-blue-50/50 px-2 py-1 rounded">
                                                    <span className="text-slate-500">回呼</span>
                                                    <span className="text-blue-500">2次 / 最近: 05-14</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 右列：沟通建议 + 历史方案 */}
                                <div className="flex flex-col gap-4">
                                    {/* 沟通建议 */}
                                    <div className="flex flex-col gap-1.5">
                                        <h5 className="font-bold text-[12px] text-slate-800 border-b border-slate-100 pb-1">沟通建议</h5>
                                        <ul className="list-disc list-outside ml-3 flex flex-col gap-1.5 text-slate-700 leading-tight text-[11px]">
                                            <li><span className="font-bold">肯定态度：</span>肯定客户良好的接听配合度，肯定其还款诚意。</li>
                                            <li><span className="font-bold">共情引导：</span>共情其多头借贷的难处，但务必要求签署线上承诺书，优先保全本平台。</li>
                                            <li><span className="font-bold">小额还款：</span>放弃大额施压，主推微小还款，通过收取小额诚意金避免客户借口拖延。</li>
                                        </ul>
                                        <div className="mt-1">
                                            <div className="flex items-center gap-1 text-blue-500 mb-0.5 text-[11px]"><i className="fa fa-link"></i>建议沟通链路</div>
                                            <div className="text-[11px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded leading-tight w-fit">核身 - 关怀弱化施压 - 分析共债利弊 - 引导协商 - 签署承诺书</div>
                                        </div>
                                    </div>
                                    {/* 历史方案 */}
                                    <div className="flex flex-col gap-1.5">
                                        <h5 className="font-bold text-[12px] text-slate-800 border-b border-slate-100 pb-1">历史方案</h5>
                                        <div className="flex flex-col gap-1.5 text-slate-700 text-[11px]">
                                            <div className="flex justify-between items-start gap-2">
                                                <span className="text-slate-500 shrink-0">03-23</span>
                                                <span className="flex-1 leading-tight">协商分期，要求提供征信报告和首付款</span>
                                                <span className="text-slate-400 shrink-0">外呼</span>
                                                <span className="text-red-500 shrink-0 w-10 text-right">未接受</span>
                                            </div>
                                            <div className="flex justify-between items-start gap-2">
                                                <span className="text-slate-500 shrink-0">05-13</span>
                                                <span className="flex-1 leading-tight">支付30%首期款办理12-24期</span>
                                                <span className="text-slate-400 shrink-0">外呼</span>
                                                <span className="text-red-500 shrink-0 w-10 text-right">未接受</span>
                                            </div>
                                            <div className="flex justify-between items-start gap-2">
                                                <span className="text-slate-500 shrink-0">05-14</span>
                                                <span className="flex-1 leading-tight">提议减免方案</span>
                                                <span className="text-slate-400 shrink-0">短信</span>
                                                <span className="text-red-500 shrink-0 w-10 text-right">未接受</span>
                                            </div>
                                            <div className="flex justify-between items-start gap-2">
                                                <span className="text-slate-500 shrink-0">05-20</span>
                                                <span className="flex-1 leading-tight">减免5%尾款，分6期还清，首期款¥5,000</span>
                                                <span className="text-slate-400 shrink-0">外呼</span>
                                                <span className="text-orange-500 shrink-0 w-12 text-right">承诺考虑</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 右侧：案件信息 和 还款信息 */}
                        <div className="flex-[3] bg-white rounded-md border border-slate-200 p-3 flex gap-4 hover:border-blue-300 transition-colors shadow-sm">
                            <div className="flex-1 flex flex-col min-w-0">
                                {renderCaseInfoCardCompact()}
                            </div>
                            <div className="w-[1px] bg-slate-100 my-1"></div>
                            <div className="flex-1 flex flex-col min-w-0">
                                {renderRepayInfoCardCompact()}
                            </div>
                        </div>
                    </div>
                    
                    {/* 下半部分：作业记录模块 */}
                    {!isShrink && (
                        <div className="flex-1 bg-white rounded-md border border-slate-200 flex flex-col overflow-hidden shadow-sm">
                            {/* 作业记录头部Tab */}
                            <div className="flex items-center gap-2 border-b border-slate-100 px-2 pt-1 text-[11px] overflow-x-auto custom-scrollbar shrink-0">
                                <button className="px-2 py-1.5 text-blue-600 border-b-2 border-blue-600 font-bold whitespace-nowrap">电话作业</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">客户综合作业记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">客服进线</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">呼入记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">客户短信回复</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">微信记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">法律手段</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">还款券发放记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">还款减免记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">划扣记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">他人帮还申请记录</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">催收小结</button>
                                <button className="px-2 py-1.5 text-slate-500 hover:text-slate-800 whitespace-nowrap">订单信息</button>
                            </div>
                            {/* 作业记录筛选区 */}
                            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 shrink-0">
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                    <i className="fa fa-filter text-blue-500 cursor-pointer"></i>
                                    <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" defaultChecked className="rounded text-blue-500" />近3天</label>
                                    <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded text-blue-500" />预测</label>
                                    <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded text-blue-500" />预览</label>
                                    <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded text-blue-500" />已触达</label>
                                    <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded text-blue-500" />小结</label>
                                    <div className="relative ml-2">
                                        <i className="fa fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                                        <input type="text" placeholder="智能搜索催记..." className="pl-7 pr-2 py-0.5 border border-slate-200 rounded-full bg-slate-50 outline-none focus:border-blue-300 w-[180px] transition-all" />
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                                    近7天: 外呼 <span className="font-bold text-slate-700">3</span> / 接通 <span className="font-bold text-slate-700">0</span>
                                </div>
                            </div>
                            {/* 作业记录表格 */}
                            <div className="flex-1 overflow-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse text-[10px] text-slate-700 whitespace-nowrap min-w-[800px]">
                                    <thead className="bg-slate-50 sticky top-0 z-10 text-slate-500">
                                        <tr>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">时间 <i className="fa fa-sort"></i></th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">电话号码 <i className="fa fa-filter"></i></th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">电话来源 <i className="fa fa-filter"></i></th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">通话对象</th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">关系 <i className="fa fa-filter"></i></th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">作业类型 <i className="fa fa-filter"></i></th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">作业结果</th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">触达类型 <i className="fa fa-filter"></i></th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">行动状态</th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100">催收员</th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100 min-w-[120px]">自动催记</th>
                                            <th className="py-1.5 px-3 font-medium border-b border-slate-100 min-w-[150px]">人工催记</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5].map((item, i) => (
                                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                <td className="py-1.5 px-3">01-25 17:04:1{i}</td>
                                                <td className="py-1.5 px-3 font-bold">156****96</td>
                                                <td className="py-1.5 px-3">{i % 2 === 0 ? '导入' : '修复'}</td>
                                                <td className="py-1.5 px-3">{i % 2 === 0 ? '本人' : '未知'}</td>
                                                <td className="py-1.5 px-3">{i % 2 === 0 ? '本人' : '未知'}</td>
                                                <td className="py-1.5 px-3">电话</td>
                                                <td className="py-1.5 px-3">
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] ${i % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{i % 2 === 0 ? '接通' : '未接'}</span>
                                                </td>
                                                <td className="py-1.5 px-3">{i % 2 === 0 ? '成功' : '失败'}</td>
                                                <td className="py-1.5 px-3">
                                                    <span className="border border-slate-200 px-1.5 py-0.5 rounded text-[9px] bg-white">
                                                        {i % 2 === 0 ? '协商跟进' : '无人接听'}
                                                    </span>
                                                </td>
                                                <td className="py-1.5 px-3">Sys</td>
                                                <td className="py-1.5 px-3 truncate max-w-[120px]" title="自动催记：用户本人接听，做效提醒...">自动催记：用户本人接听...</td>
                                                <td className="py-1.5 px-3 truncate max-w-[150px] text-slate-500">
                                                    {i % 2 === 0 ? '人工催记：用户回复表示月底会发工资...' : <span className="text-slate-300 italic">点击添加...</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* 分页栏 */}
                            <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-100 bg-slate-50 shrink-0 text-[10px] text-slate-500">
                                <div>1-10 / 150 条</div>
                                <div className="flex items-center gap-2">
                                    <select className="bg-white border border-slate-200 rounded px-1 py-0.5 outline-none cursor-pointer">
                                        <option>20条/页</option>
                                    </select>
                                    <div className="flex items-center gap-1">
                                        <button className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-100 transition-colors"><i className="fa fa-angle-left"></i></button>
                                        <span className="w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded font-bold shadow-sm">1</span>
                                        <button className="w-5 h-5 flex items-center justify-center bg-white border border-slate-200 rounded hover:bg-slate-100 transition-colors"><i className="fa fa-angle-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'profile' && <div className="h-full"><ProfilePanel /></div>}
            {activeTab === 'account' && (
                <div className="h-full flex flex-col relative group/container">
                     <div 
                        ref={scrollContainerRef}
                        className="flex-1 overflow-x-auto custom-scrollbar flex items-center p-3 gap-3 snap-x snap-mandatory">
                         {accountData.map((account) => (
                             <div key={account.id} className="snap-center flex-shrink-0 w-[240px] bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col gap-2 h-full justify-center hover:border-blue-400 hover:shadow-md transition-all">
                                 <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                                     <div className="flex items-center gap-1.5">
                                         <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                                         <h4 className="font-bold text-slate-800 text-[11px] truncate">{account.productType}</h4>
                                     </div>
                                     {account.overdueDays > 0 && <span className="text-[10px] text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">逾{account.overdueDays}天</span>}
                                 </div>
                                 
                                 <div className="grid grid-cols-2 gap-2 text-[10px]">
                                     <div className="flex flex-col">
                                         <span className="text-slate-400 mb-0.5">总待还</span>
                                         <span className="font-mono font-bold text-slate-800 text-[11px]">{account.totalDue}</span>
                                     </div>
                                     <div className="flex flex-col">
                                         <span className="text-slate-400 mb-0.5">逾期金额</span>
                                         <span className="font-mono font-bold text-red-600 text-[11px]">{account.overdueAmount}</span>
                                     </div>
                                     {Object.entries(account.details).map(([key, value]) => (
                                         <div key={key} className="flex flex-col">
                                             <span className="text-slate-400 truncate mb-0.5" title={key}>{key}</span>
                                             <span className="font-mono text-slate-600 truncate" title={value}>{value}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            )}
            {activeTab === 'bill' && (
                <div className="h-full flex flex-col relative group/container">
                    <div ref={scrollContainerRef} className="flex-1 overflow-x-auto custom-scrollbar flex items-center p-3 gap-3 snap-x snap-mandatory">
                        {billData.map((row, idx) => (
                            <div key={idx} className="snap-center flex-shrink-0 w-[200px] bg-white border border-slate-200 rounded-lg shadow-sm p-3 flex flex-col gap-2 h-full justify-center hover:border-blue-400 hover:shadow-md transition-all">
                                <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                                    <span className="text-[11px] font-bold text-slate-800">{row.type}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${row.status === '未逾期' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{row.status}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 text-[10px]">
                                    <div className="col-span-2 flex flex-col"><span className="text-slate-400 mb-0.5">单号</span><span className="font-mono text-slate-600 truncate font-medium">{row.loanNo}</span></div>
                                    <div className="flex flex-col"><span className="text-slate-400 mb-0.5">本金</span><span className="font-mono text-slate-800 font-bold">{row.principalDue}</span></div>
                                    <div className="flex flex-col"><span className="text-slate-400 mb-0.5">逾期</span><span className="font-mono text-red-600 font-bold">{row.overdueAmount}</span></div>
                                    <div className="flex flex-col"><span className="text-slate-400 mb-0.5">期数</span><span className="text-slate-600">{row.terms}</span></div>
                                    <div className="flex flex-col"><span className="text-slate-400 mb-0.5">利率</span><span className="text-slate-600">{row.rate}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {activeTab === 'repayment' && (
                <div className="h-full overflow-y-auto custom-scrollbar p-3">
                     <div className="grid grid-cols-2 xl:grid-cols-3 gap-3" data-ai-list="true">
                        {repaymentData.map((item, i) => (
                           <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3 hover:bg-white hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between h-[64px]">
                              <div className="flex justify-between items-start">
                                 <span className="text-sm font-bold font-mono text-emerald-600">+{item.amount}</span>
                                 <span className="text-[10px] px-1.5 py-0.5 rounded font-medium ${item.status === '成功' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">{item.status}</span>
                              </div>
                              <div className="flex justify-between items-end text-[10px] text-slate-400">
                                  <span>{item.channel}</span>
                                  <span className="font-mono">{item.date}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                </div>
            )}
            {activeTab === 'assign_record' && <div className="h-full p-4 text-[11px] text-slate-400 flex items-center justify-center">分案记录占位</div>}
         </div>
    </div>
  );
};

const ProfilePanel = () => (
    <div className="h-full p-4 text-[11px] text-slate-400 flex items-center justify-center">画像组件占位</div>
);

export default LeftSection;
