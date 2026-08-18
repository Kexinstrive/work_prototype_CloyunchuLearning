import React, { useState } from 'react';
import { ToolBtn, FormSelect, FormTextarea } from './RightComponents';
import { useDraggable } from '../useDraggable';

const CallWorkTab = ({ memo, setMemo }) => {
  const [callingNumber, setCallingNumber] = useState(null);
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, ended
  const [selectedContact, setSelectedContact] = useState(null);
  const [note, setNote] = useState('');
  const [result, setResult] = useState('');
  const [wasConnected, setWasConnected] = useState(false);
  const [isSmartHostingEnabled, setIsSmartHostingEnabled] = useState(false);
  const [isContactsExpanded, setIsContactsExpanded] = useState(true);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const [inputType, setInputType] = useState('voice'); // 'voice' | 'text'
  const [voiceState, setVoiceState] = useState('idle'); // 'idle' | 'recording' | 'processing' | 'review'

  // 短信弹窗状态
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [smsContact, setSmsContact] = useState(null);
  const [smsForm, setSmsForm] = useState({
      channel: '',
      attr: '',
      type: '',
      template: '',
      content: ''
  });

  // 云手机短信弹窗状态
  const [isCloudSmsModalOpen, setIsCloudSmsModalOpen] = useState(false);
  const [cloudSmsContact, setCloudSmsContact] = useState(null);
  const [cloudSmsInput, setCloudSmsInput] = useState('');

  // 电子函弹窗状态
  const [isEletterModalOpen, setIsEletterModalOpen] = useState(false);
  const [eletterContact, setEletterContact] = useState(null);
  const [eletterForm, setEletterForm] = useState({
      phone: '',
      templateType: '',
      letterTemplate: '',
      touchMethod: '电子函(短信)'
  });
  
  // 引入拖拽 Hook，供不同弹窗使用
  const smsDrag = useDraggable();
  const cloudSmsDrag = useDraggable();
  const eletterDrag = useDraggable();

  // 模拟联系人数据
  const contacts = [
    { 
      id: 1, 
      name: '陈**', 
      relation: '本人', 
      phone: '156****9611', 
      operator: '中国联通',
      quality: '高质量',
      source: '【导入】',
      lastSuccessTime: '2023-10-24 14:30:22',
      phoneStatus: '正常',
      isUsable: true,
      unusableReason: ''
    },
    { 
      id: 2, 
      name: '柴**', 
      relation: '配偶', 
      phone: '187****3922', 
      operator: '中国移动',
      quality: '待观察',
      source: '【用户预留】',
      lastSuccessTime: '-',
      phoneStatus: '停机',
      isUsable: false,
      unusableReason: '🚫号码失效:内部失联修复状态变更'
    },
    { 
      id: 3, 
      name: '杜**', 
      relation: '同事', 
      phone: '187****1533', 
      operator: '中国电信',
      quality: '中质量',
      source: '【第三方修复】',
      lastSuccessTime: '2023-08-15 09:20:11',
      phoneStatus: '正常',
      isUsable: true,
      unusableReason: ''
    },
    { 
      id: 4, 
      name: '王**', 
      relation: '紧急联系人', 
      phone: '139****2244', 
      operator: '中国移动',
      quality: '低质量',
      source: '【用户预留】',
      lastSuccessTime: '-',
      phoneStatus: '空号',
      isUsable: false,
      unusableReason: '🚫号码失效:经检测为空号'
    }
  ];

  const qualityStyles = {
    '高质量': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    '中质量': 'bg-blue-50 text-blue-600 border-blue-200',
    '低质量': 'bg-orange-50 text-orange-600 border-orange-200',
    '待观察': 'bg-slate-50 text-slate-600 border-slate-200',
  };

  const quickResults = ['承诺还款', '协商跟进', '无人接听', '拒接', '第三方转告', '空号/停机'];

  const handleCall = (contact) => {
    if (!contact.isUsable) return;
    if (callStatus === 'calling' || callStatus === 'connected') return;
    setSelectedContact(contact);
    setCallingNumber(contact.phone);
    setCallStatus('calling');
    setTimeout(() => { 
        setCallStatus('connected'); 
        setWasConnected(true);
    }, 2000);
  };

  const handleHangup = () => {
    setCallStatus('ended');
    setTimeout(() => setCallStatus('idle'), 1000);
  };

  const handleStartRecording = () => {
      setVoiceState('recording');
      setTimeout(() => {
          setVoiceState('processing');
          setTimeout(() => {
              setNote('客户表示这几天资金周转困难，但承诺月底前会想办法还上一部分，态度还算配合。');
              setVoiceState('review');
          }, 800);
      }, 2000);
  };

  const handleSubmitWork = () => {
      const connectedResults = ['承诺还款', '协商跟进'];
      const isConnectedResult = connectedResults.includes(result);
      
      if ((wasConnected || isConnectedResult) && !note.trim()) {
          alert('当前案件已接通或结果涉及沟通，请务必填写人工催记（备注）后再提交！');
          return;
      }

      alert(`作业已提交！\n结果：${result || '未选择'}\n备注：${note}\n随案便签：${memo}`);
      setNote('');
      setResult('');
      setMemo('');
      setWasConnected(false);
      if (inputType === 'voice') setVoiceState('idle');
  };

  const handleOpenSmsModal = (contact) => {
      setSmsContact(contact);
      setIsSmsModalOpen(true);
  };

  const handleOpenCloudSmsModal = (contact) => {
      setCloudSmsContact(contact);
      setCloudSmsInput('');
      setIsCloudSmsModalOpen(true);
  };

  const handleOpenEletterModal = (contact) => {
      setEletterContact(contact);
      setEletterForm({
          phone: '',
          templateType: '',
          letterTemplate: '',
          touchMethod: '电子函(短信)'
      });
      setIsEletterModalOpen(true);
  };

  return (
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-slate-50/50 relative">
         {/* 智能托管操作区 */}
         <div className="bg-blue-50/30 px-3 py-2 border-b border-blue-100 flex items-center justify-between flex-shrink-0">
             <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700">智能托管</span>
                <div className="group relative flex items-center">
                    <i className="fa fa-info-circle text-slate-400 text-[10px] cursor-help hover:text-blue-500"></i>
                    <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100] leading-relaxed">
                        开启托管后，系统将自动收集、分析客户及案件信息，执行智能触达策略，及给出人工触达建议
                        <div className="absolute left-3 bottom-full w-0 h-0 border-4 border-transparent border-b-slate-800"></div>
                    </div>
                </div>
             </div>
             <button 
                onClick={() => setIsSmartHostingEnabled(!isSmartHostingEnabled)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isSmartHostingEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
             >
                <span 
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isSmartHostingEnabled ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}
                />
             </button>
         </div>

         {/* 通话状态面板 */}
        <div className={`transition-all duration-300 overflow-hidden flex-shrink-0 ${callStatus !== 'idle' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
           <div className="mx-2 mt-2 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg text-white shadow-lg flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${callStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}>
                   <i className="fa fa-phone text-sm"></i>
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-medium opacity-80">
                     {callStatus === 'calling' && '正在呼叫...'}
                     {callStatus === 'connected' && '通话中'}
                     {callStatus === 'ended' && '通话结束'}
                   </span>
                   <span className="text-sm font-bold font-mono tracking-wide">{callingNumber}</span>
                </div>
             </div>
             {callStatus === 'connected' && <span className="font-mono text-emerald-400 text-sm">00:12</span>}
             <button onClick={handleHangup} className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                <i className="fa fa-phone-slash text-xs"></i>
             </button>
           </div>
        </div>

        {/* 电话信息（联系人列表） */}
        <div className="p-2 flex flex-col gap-1">
           <div 
               className="flex justify-between items-center px-1 cursor-pointer group"
               onClick={() => setIsContactsExpanded(!isContactsExpanded)}
           >
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <i className={`fa fa-chevron-${isContactsExpanded ? 'down' : 'right'} text-[10px] text-slate-400`}></i>
                  电话信息 ({contacts.length})
              </h3>
              <button 
                  onClick={(e) => { e.stopPropagation(); alert('新增号码功能'); }}
                  className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 hover:shadow-sm transition-all flex items-center gap-1"
              >
                  <i className="fa fa-plus"></i> 新增号码
              </button>
           </div>
           
           {isContactsExpanded && (
               <div className="flex flex-col gap-2 mt-1 animate-fadeIn" data-ai-list="true">
                  {contacts.map(contact => {
                    const isDisabled = !contact.isUsable;

                    return (
                      <div 
                        key={contact.id} 
                        title={isDisabled ? contact.unusableReason : undefined}
                        className={`group flex flex-col p-3 rounded-xl border transition-all duration-200 relative
                          ${isDisabled ? 'bg-slate-50 border-slate-200 opacity-70 grayscale' : 
                            selectedContact?.id === contact.id ? 'bg-blue-50/40 border-blue-300 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
                      >
                          <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isDisabled ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-700'}`}>
                                      {contact.relation}
                                  </span>
                                  <span className={`text-sm font-bold ${isDisabled ? 'text-slate-500' : 'text-slate-800'}`}>
                                      张**
                                  </span>
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] border ${qualityStyles[contact.quality]} whitespace-nowrap`}>
                                      {contact.quality}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[9px] whitespace-nowrap flex items-center gap-0.5">
                                      {contact.operator === '中国移动' && <i className="fa fa-signal text-blue-500"></i>}
                                      {contact.operator === '中国联通' && <i className="fa fa-broadcast-tower text-orange-500"></i>}
                                      {contact.operator === '中国电信' && <i className="fa fa-satellite-dish text-blue-400"></i>}
                                      {contact.operator}
                                  </span>
                              </div>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${contact.phoneStatus === '正常' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                  {contact.phoneStatus}
                              </span>
                          </div>

                          <div className="flex flex-col gap-1 mb-2">
                              <div className="flex items-end gap-2">
                                  <span className={`text-xl font-bold font-mono tracking-wider ${isDisabled ? 'text-slate-500' : 'text-slate-800'}`}>
                                      {contact.phone}
                                  </span>
                                  <span className="text-[10px] text-slate-500 mb-1">{contact.source}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                                  <i className="fa fa-history"></i>
                                  最后成功通话: {contact.lastSuccessTime}
                              </div>
                              {isDisabled && (
                                  <div className="text-[10px] text-red-500 mt-1">
                                      {contact.unusableReason}
                                  </div>
                              )}
                          </div>

                          {!isDisabled && (
                            /* 调整按钮区域：去掉分类文字，紧密排列，压缩高度 */
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                                <div className="relative group/btn">
                                    <ToolBtn icon="phone" color="text-blue-500 hover:bg-blue-50" onClick={() => handleCall(contact)} />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">电话</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="comment-dots" color="text-blue-500 hover:bg-blue-50" onClick={() => handleOpenSmsModal(contact)} />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">短信</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="mobile-alt" color="text-teal-500 hover:bg-teal-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">云手机外呼</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="tty" color="text-blue-500 hover:bg-blue-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">工作手机外呼</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="envelope-open" color="text-blue-500 hover:bg-blue-50" onClick={() => handleOpenCloudSmsModal(contact)} />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">云手机短信</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="envelope-open-text" color="text-purple-500 hover:bg-purple-50" onClick={() => handleOpenEletterModal(contact)} />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">电子函</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="edit" color="text-slate-500 hover:bg-slate-100" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">编辑</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="hands-helping" color="text-orange-500 hover:bg-orange-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">协催</div>
                                </div>
                                <div className="relative group/btn">
                                    <ToolBtn icon="ban" color="text-red-500 hover:bg-red-50" />
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">拉黑</div>
                                </div>
                                {contact.relation === '本人' && (
                                    <>
                                        <div className="relative group/btn">
                                            <ToolBtn icon="gavel" color="text-red-600 hover:bg-red-50" />
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">法律手段</div>
                                        </div>
                                        <div className="relative group/btn">
                                            <ToolBtn icon="wrench" color="text-cyan-600 hover:bg-cyan-50" />
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none z-10">信息修复</div>
                                        </div>
                                    </>
                                )}
                            </div>
                          )}
                      </div>
                    );
                  })}
               </div>
           )}
        </div>

         {/* 智能修复入口 */}
         <div className="px-2 pb-2 mt-auto flex-shrink-0">
           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-md p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <i className="fa fa-magic text-[9px]"></i>
                 </div>
                 <span className="text-xs font-bold text-blue-800">发现 2 个新号码</span>
              </div>
              <button className="px-2 py-0.5 bg-white shadow-sm border border-blue-100 text-blue-600 text-xs rounded hover:bg-blue-600 hover:text-white transition-colors">
                 查看
              </button>
           </div>
        </div>

         {/* 底部：高效处置录入区 (电话作业专属) - 向下折叠 */}
         <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-10 sticky bottom-0 flex-shrink-0 border-t border-slate-200">
             {/* 折叠控制头部 */}
             <div 
                 className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
                 onClick={() => setIsInputExpanded(!isInputExpanded)}
             >
                 <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                     <i className="fa fa-keyboard text-blue-500"></i>
                     催记录入 (语音/快捷)
                 </span>
                 <i className={`fa fa-chevron-${isInputExpanded ? 'down' : 'up'} text-[10px] text-slate-400`}></i>
             </div>

             {/* 折叠内容区 */}
             {isInputExpanded && (
                <div className="p-3 pt-1 border-t border-slate-50 animate-fadeIn">
                    {/* 智能话术提示 */}
                    <div className="mb-2 flex items-center gap-1.5 text-amber-700 bg-amber-50/50 px-2 py-1 rounded border border-amber-100 text-xs">
                        <i className="fa fa-lightbulb text-amber-500 text-[10px]"></i>
                        <span className="flex-1 truncate">话术推荐：客户资金困难，建议...</span>
                        <span className="font-bold cursor-pointer hover:underline text-amber-600">使用</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-1.5">
                            {quickResults.map(r => (
                                <button 
                                    key={r} 
                                    onClick={() => setResult(r)}
                                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${result === r ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-white'}`}
                                >
                                    {r}
                                </button>
                            ))}
                            {/* 切换输入方式的小按钮 */}
                            <button 
                                onClick={() => setInputType(inputType === 'voice' ? 'text' : 'voice')}
                                className="ml-auto px-2 py-1 rounded text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200 hover:text-blue-600 hover:bg-blue-50"
                                title={inputType === 'voice' ? "切换到键盘输入" : "切换到语音输入"}
                            >
                                <i className={`fa fa-${inputType === 'voice' ? 'keyboard' : 'microphone'} mr-1`}></i>
                                {inputType === 'voice' ? '文字' : '语音'}
                            </button>
                        </div>
                        
                        <div className="relative flex-1 min-h-[100px]">
                            {/* 语音输入界面 */}
                            {inputType === 'voice' && voiceState === 'idle' && (
                                <button 
                                    onClick={handleStartRecording}
                                    className="w-full h-full border border-dashed border-blue-300 bg-blue-50/50 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-blue-100/50 transition-colors group p-4"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                        <i className="fa fa-microphone text-lg"></i>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-600">点击开始说话</span>
                                    <span className="text-[10px] text-slate-400">自动转文字 · 智能识别</span>
                                </button>
                            )}

                            {/* 录音中界面 */}
                            {inputType === 'voice' && voiceState === 'recording' && (
                                <div className="w-full h-full border border-blue-200 bg-blue-50 rounded-lg flex flex-col items-center justify-center gap-2 animate-pulse p-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shadow-sm">
                                        <i className="fa fa-microphone-alt text-lg animate-bounce"></i>
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700">正在聆听...</span>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                                        <div className="w-1.5 h-5 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-1.5 h-3 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            )}

                            {/* 处理中界面 */}
                            {inputType === 'voice' && voiceState === 'processing' && (
                                <div className="w-full h-full border border-slate-200 bg-slate-50 rounded-lg flex flex-col items-center justify-center gap-2 p-4">
                                    <i className="fa fa-circle-notch fa-spin text-blue-600 text-lg"></i>
                                    <span className="text-[11px] text-slate-500">正在转文字...</span>
                                </div>
                            )}

                            {/* 结果确认与编辑 (Textarea) - 语音转完后也是这个界面 */}
                            {(inputType === 'text' || voiceState === 'review') && (
                                <>
                                    <textarea 
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full border border-slate-200 rounded-md p-2 text-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none h-24 bg-slate-50 focus:bg-white transition-all leading-relaxed"
                                        placeholder="请输入催记..."
                                    ></textarea>
                                    {inputType === 'text' && (
                                        <div className="absolute bottom-2 right-2 flex gap-1">
                                            <button className="p-1.5 rounded-full bg-slate-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="语音输入" onClick={() => setInputType('voice')}>
                                                <i className="fa fa-microphone text-[10px]"></i>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* 提交按钮区域 */}
                        <div className="flex gap-2">
                            {voiceState === 'review' && (
                                <button 
                                    onClick={() => { setVoiceState('idle'); setNote(''); }}
                                    className="px-4 py-2 border border-slate-200 rounded-md text-slate-600 text-xs hover:bg-slate-50"
                                >
                                    重录
                                </button>
                            )}
                            <button 
                                onClick={handleSubmitWork}
                                className="flex-1 py-2 bg-blue-600 rounded-md text-white text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-200 active:scale-[0.98] transition-all"
                            >
                                {voiceState === 'review' ? '确认并提交' : '提交本次作业'}
                            </button>
                        </div>
                    </div>
                </div>
             )}
          </div>

          {/* 短信操作弹窗 - 可拖拽 */}
          {isSmsModalOpen && smsContact && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
                  <div 
                     className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh] pointer-events-auto"
                     style={{ transform: `translate(${smsDrag.position.x}px, ${smsDrag.position.y}px)` }}
                  >
                      <div 
                          className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0 cursor-move select-none"
                          onMouseDown={smsDrag.handleMouseDown}
                      >
                          <h3 className="font-bold text-slate-800 flex items-center gap-2">
                              <i className="fa fa-comment-dots text-blue-500"></i>
                              发送短信
                          </h3>
                          <button onClick={() => setIsSmsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer" onMouseDown={e => e.stopPropagation()}>
                              <i className="fa fa-times"></i>
                          </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                          {/* 短信表单区 */}
                          <div className="flex flex-col gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                              <div className="flex items-center gap-2 mb-2">
                                 <span className="text-xs text-slate-500 w-16 text-right">催收对象:</span>
                                 <span className="text-sm font-bold text-slate-800">{smsContact.name}</span>
                                 <span className="text-xs text-slate-500">({smsContact.relation}: {smsContact.phone})</span>
                              </div>
                              <FormSelect 
                                 label="发送渠道" 
                                 required 
                                 value={smsForm.channel} 
                                 onChange={(v) => setSmsForm({...smsForm, channel: v})}
                                 placeholder="请选择"
                              />
                              <FormSelect 
                                 label="短信属性" 
                                 value={smsForm.attr} 
                                 onChange={(v) => setSmsForm({...smsForm, attr: v})}
                                 placeholder="请选择"
                              />
                              <FormSelect 
                                 label="短信分类" 
                                 value={smsForm.type} 
                                 onChange={(v) => setSmsForm({...smsForm, type: v})}
                                 placeholder="请选择"
                              />
                              <FormSelect 
                                 label="短信模板" 
                                 required 
                                 value={smsForm.template} 
                                 onChange={(v) => setSmsForm({...smsForm, template: v})}
                                 placeholder="请选择"
                              />
                              <FormTextarea 
                                  label="模板内容"
                                  placeholder=""
                                  value={smsForm.content}
                                  onChange={(v) => setSmsForm({...smsForm, content: v})}
                              />
                              <div className="flex justify-end mt-2">
                                  <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md shadow-sm hover:bg-blue-700">
                                      短信发送
                                  </button>
                              </div>
                          </div>

                          {/* 历史短信记录区 */}
                          <div className="flex flex-col gap-3">
                              <h4 className="font-bold text-slate-700 text-sm border-b border-slate-100 pb-2">
                                  历史记录
                              </h4>
                              <div className="flex flex-col gap-3">
                                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                      <div className="flex items-center justify-between mb-2 text-xs text-slate-500">
                                          <span>末次沟通时间: 2026-04-08 13:45:07</span>
                                          <span>催收对象: **华 (本人: 188****52)</span>
                                      </div>
                                      <div className="text-xs text-slate-700 leading-relaxed bg-white p-2 rounded border border-slate-100">
                                          <span className="font-bold text-slate-600">发送内容: </span>徐娟华，您金条/白条欠款，经多次通知仍不归还，今日会安排函件寄送，一旦寄出无法驳回。相关责任由您本人承担，请您今天15点前处理全部账单，可申请撤销此流程，致电01086310519进行沟通及获取帮助。
                                      </div>
                                  </div>
                              </div>
                              <div className="flex justify-end mt-2">
                                  <button className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-md shadow-sm hover:bg-blue-700">
                                      添加短信
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* 云手机短信弹窗 - 可拖拽 */}
          {isCloudSmsModalOpen && cloudSmsContact && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none">
                  <div 
                      className="bg-white rounded-[24px] shadow-2xl w-[320px] h-[600px] flex flex-col overflow-hidden relative border-[6px] border-slate-800 animate-fadeIn pointer-events-auto"
                      style={{ transform: `translate(${cloudSmsDrag.position.x}px, ${cloudSmsDrag.position.y}px)` }}
                  >
                      {/* 顶部标题栏 */}
                      <div 
                          className="flex items-center justify-between px-3 py-3 bg-blue-100/50 border-b border-blue-200 flex-shrink-0 cursor-move select-none"
                          onMouseDown={cloudSmsDrag.handleMouseDown}
                      >
                          <button 
                              onClick={() => setIsCloudSmsModalOpen(false)}
                              className="text-blue-600 font-medium text-sm flex items-center cursor-pointer"
                              onMouseDown={e => e.stopPropagation()}
                          >
                              <i className="fa fa-chevron-left mr-1"></i> 返回
                          </button>
                          <div className="flex flex-col items-center justify-center">
                              <span className="text-sm font-bold text-blue-600">{cloudSmsContact.name} ({cloudSmsContact.relation}:{cloudSmsContact.phone.replace(/(\d{3})\d{4}(\d{2})/, '$1****$2')})</span>
                              <span className="text-[10px] text-blue-500">13719562000_p</span>
                          </div>
                          <button 
                              onClick={() => setIsCloudSmsModalOpen(false)}
                              className="text-slate-600 w-6 h-6 flex items-center justify-center cursor-pointer"
                              onMouseDown={e => e.stopPropagation()}
                          >
                              <i className="fa fa-times"></i>
                          </button>
                      </div>
                      {/* 聊天内容区 */}
                      <div className="flex-1 bg-slate-50 relative p-3 overflow-y-auto">
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
                              <span className="transform -rotate-45 text-2xl font-bold tracking-widest">jd_admin 保密信息，严禁泄露</span>
                          </div>
                          {/* 此处可放置历史消息气泡，当前为空 */}
                      </div>
                      {/* 底部输入区 */}
                      <div className="p-3 bg-white border-t border-slate-200 flex flex-col gap-2 flex-shrink-0">
                          <div className="relative">
                              <textarea 
                                  className="w-full h-20 border border-slate-200 rounded-md p-2 text-sm focus:border-blue-400 focus:outline-none resize-none bg-slate-50 focus:bg-white"
                                  placeholder="请输入"
                                  value={cloudSmsInput}
                                  onChange={(e) => setCloudSmsInput(e.target.value)}
                              ></textarea>
                              <div className="absolute right-2 bottom-2">
                                  <button className="px-4 py-1.5 bg-blue-500 text-white text-xs rounded shadow-sm hover:bg-blue-600">
                                      发送(0/2)
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* 电子函弹窗 - 可拖拽 */}
          {isEletterModalOpen && eletterContact && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none p-4">
                  <div 
                      className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden animate-fadeIn flex flex-col pointer-events-auto"
                      style={{ transform: `translate(${eletterDrag.position.x}px, ${eletterDrag.position.y}px)` }}
                  >
                      <div 
                          className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 flex-shrink-0 cursor-move select-none"
                          onMouseDown={eletterDrag.handleMouseDown}
                      >
                          <h3 className="font-bold text-slate-800 flex items-center gap-2">
                              <i className="fa fa-envelope-open-text text-purple-500"></i>
                              发送电子函
                          </h3>
                          <button onClick={() => setIsEletterModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer" onMouseDown={e => e.stopPropagation()}>
                              <i className="fa fa-times"></i>
                          </button>
                      </div>
                      <div className="p-5 flex flex-col gap-4 relative overflow-hidden">
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02]">
                              <span className="transform -rotate-12 text-2xl font-bold tracking-widest whitespace-nowrap">jd_admin 保密信息，严禁泄露</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2 ml-4">
                              <span className="text-xs text-slate-500 w-16 text-right">接收对象:</span>
                              <span className="text-sm font-bold text-slate-800">{eletterContact.name}</span>
                          </div>
                          <FormSelect 
                              label="接收手机" 
                              required 
                              value={eletterForm.phone} 
                              onChange={(v) => setEletterForm({...eletterForm, phone: v})}
                              placeholder="请选择"
                          />
                          <FormSelect 
                              label="模板类型" 
                              required 
                              value={eletterForm.templateType} 
                              onChange={(v) => setEletterForm({...eletterForm, templateType: v})}
                              placeholder="请选择"
                          />
                          <FormSelect 
                              label="信函模板" 
                              required 
                              value={eletterForm.letterTemplate} 
                              onChange={(v) => setEletterForm({...eletterForm, letterTemplate: v})}
                              placeholder="请选择"
                          />
                          <FormSelect 
                              label="触达方式" 
                              required 
                              value={eletterForm.touchMethod} 
                              onChange={(v) => setEletterForm({...eletterForm, touchMethod: v})}
                              placeholder="请选择"
                          />
                          <div className="border-t border-slate-100 mt-4 pt-4 flex justify-end">
                              <button 
                                  onClick={() => {
                                      alert('申请发送已提交');
                                      setIsEletterModalOpen(false);
                                  }}
                                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded shadow-sm"
                              >
                                  申请发送
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
};

export default CallWorkTab;
