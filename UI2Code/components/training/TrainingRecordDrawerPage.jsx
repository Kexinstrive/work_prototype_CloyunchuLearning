import React from 'react';

const records = [
  { id: 'r4', order: 4, time: '2026-07-29 10:20:00', duration: '06:35', score: '评分中', pass: '—', status: '评分中' },
  { id: 'r3', order: 3, time: '2026-07-29 09:15:00', duration: '03:10', score: '—', pass: '—', status: '已中断' },
  { id: 'r1', order: 2, time: '2026-07-28 14:30:00', duration: '08:45', score: '92分', pass: '是', status: '已达标' },
  { id: 'r2', order: 1, time: '2026-07-27 10:00:00', duration: '05:20', score: '75分', pass: '否', status: '未达标' }
];

const statusClass = (status) => {
  if (status === '已达标') return 'text-emerald-600 bg-emerald-50 border border-emerald-200';
  if (status === '未达标') return 'text-orange-600 bg-orange-50 border border-orange-200';
  if (status === '已中断') return 'text-slate-500 bg-slate-100 border border-slate-200';
  return 'text-blue-600 bg-blue-50 border border-blue-200';
};

const highestScoreValue = Math.max(...records.map(r => parseInt(r.score)).filter(score => !Number.isNaN(score)));

const normalizePass = (record) => {
  if (record.status === '评分中' || record.status === '已中断') return '—';
  return record.pass === '是' || record.pass === '否' ? record.pass : '—';
};

function TrainingRecordDrawerPage() {
  return (
    <div className="w-full h-full bg-slate-900/45 flex justify-end" data-ai-alt="抽屉页面" data-ai-changelog-id="training-record-drawer-page" data-ai-changelog-title="训练记录抽屉独立页面" data-ai-changelog-desc="平铺视图中独立展示训练记录右侧抽屉，包含任务概要、倒序训练记录列表、最高分标识与详情区兜底内容" data-knowledge-citationId="kg://2056317797395558401/100000001/2057464365306941441/1#joyspace_LchDtrQ9dTxvJNtyP9Xm_chunk_4_v202605132200">
      <div className="h-full w-[860px] max-w-[calc(100vw-32px)] bg-white shadow-2xl flex overflow-hidden" data-ai-alt="记录抽屉">
        <div className="w-[55%] h-full flex flex-col border-r border-slate-100" data-ai-alt="记录主区">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0" data-ai-alt="记录标题栏">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2" data-ai-alt="记录标题"><i className="fa fa-history text-blue-500 w-[16px] h-[16px] flex items-center justify-center" data-ai-alt="记录图标"></i> 训练记录</h3>
          </div>
          <div className="p-4 border-b border-slate-100 bg-white shrink-0" data-ai-alt="任务概要">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs" data-ai-alt="概要内容" data-ai-list="true" data-knowledge-citationId="kg://2027723788674772994/2074339768847876098/2074339768919179265/1#1783396114941773_0781377a6ace5867_20260707114838_0">
              <div className="flex items-center gap-2 w-full" data-ai-alt="计划名称"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">计划名称:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">进阶谈判技巧培训</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="任务名称"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">任务名称:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">进阶施压技巧对练</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="任务状态"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">任务状态:</span><span className="px-1.5 py-0.5 rounded text-[10px] font-bold border bg-emerald-50 text-emerald-600 border-emerald-200" data-ai-alt="状态值">已达标</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="当前得分"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">当前得分:</span><span className="font-bold text-emerald-600 truncate" data-ai-alt="字段值">92分</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="最高得分"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">历史最高分:</span><span className="font-bold text-emerald-600 truncate" data-ai-alt="字段值">92分</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="达标要求"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">达标要求:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">90分</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="练习次数"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">练习次数:</span><span className="font-bold text-slate-700" data-ai-alt="字段值">4次</span></div>
              <div className="flex items-center gap-2 w-[45%]" data-ai-alt="完成时间"><span className="text-slate-500 w-[92px]" data-ai-alt="字段名">完成时间:</span><span className="font-bold text-slate-700 truncate" data-ai-alt="字段值">2026-07-28 14:38:45</span></div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-50/30" data-ai-alt="记录滚动区">
            <div className="flex px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 border-b border-slate-200 sticky top-0 z-10" data-ai-alt="记录表头">
              <div className="w-[60px]" data-ai-alt="序号列">训练序号</div>
              <div className="flex-1 min-w-0" data-ai-alt="时间列">训练时间</div>
              <div className="w-[80px]" data-ai-alt="时长列">演练时长</div>
              <div className="w-[80px]" data-ai-alt="得分列">本次得分</div>
              <div className="w-[60px]" data-ai-alt="达标列">是否达标</div>
              <div className="w-[70px]" data-ai-alt="状态列">训练状态</div>
              <div className="w-[70px] text-right" data-ai-alt="操作列">操作</div>
            </div>
            <div className="flex flex-col divide-y divide-slate-100" data-ai-alt="记录列表" data-ai-list="true" data-knowledge-citationId="kg://2027723788674772994/2074339768847876098/2074339768919179265/1#1783396114941773_0781377a6ace5867_20260707114838_0">
              {records.map(r => {
                const recordScore = parseInt(r.score);
                const isHighestRecord = !Number.isNaN(recordScore) && recordScore === highestScoreValue;
                return (
                  <div key={r.id} className={`flex px-4 py-3 items-center text-xs ${r.id === 'r4' ? 'bg-blue-50/60 shadow-inner' : 'hover:bg-slate-50'}`} data-ai-alt="记录行">
                    <div className="w-[60px] text-slate-500 font-bold" data-ai-alt="记录序号">{r.order}</div>
                    <div className="flex-1 min-w-0 text-slate-700 truncate pr-2" data-ai-alt="训练时间">{r.time}</div>
                    <div className="w-[80px] text-slate-600" data-ai-alt="演练时长">{r.duration}</div>
                    <div className="w-[80px] flex items-center gap-1" data-ai-alt="本次得分"><span className={`font-bold ${r.score === '—' ? 'text-slate-500' : r.score === '评分中' ? 'text-blue-600' : 'text-slate-800'}`} data-ai-alt="得分值">{r.score}</span>{isHighestRecord && <span className="px-1 py-0.5 bg-orange-100 text-orange-600 rounded text-[9px] font-bold shrink-0" data-ai-alt="最高分标">最高分</span>}</div>
                    <div className="w-[60px] text-slate-600" data-ai-alt="达标结果">{normalizePass(r)}</div>
                    <div className="w-[70px]" data-ai-alt="记录状态"><span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${statusClass(r.status)}`} data-ai-alt="状态值">{r.status}</span></div>
                    <div className="w-[70px] text-right" data-ai-alt="详情操作">{r.status === '评分中' ? <button disabled title="评分中，暂无法查看详情" className="text-[11px] font-bold text-slate-400 cursor-not-allowed" data-ai-alt="评分禁用">评分中</button> : <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800" data-ai-alt="查看详情">查看详情</button>}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-[45%] bg-slate-50 flex flex-col h-full" data-ai-alt="详情区域">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0" data-ai-alt="详情标题栏">
            <h3 className="font-bold text-slate-800 text-sm" data-ai-alt="详情标题">训练详情 <span className="text-slate-400 font-normal ml-1" data-ai-alt="详情序号">第4次</span></h3>
          </div>
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4" data-ai-alt="详情内容">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2" data-ai-alt="基础信息"><div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2" data-ai-alt="区块标题">基础信息</div><div className="text-xs text-slate-600 pt-1" data-ai-alt="区块内容">本次训练已提交，系统正在生成评分结果。</div></div>
            <div className="flex gap-4" data-ai-alt="得分结果"><div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2" data-ai-alt="本次得分"><div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2" data-ai-alt="区块标题">本次得分</div><div className="text-xl font-black text-blue-600 pt-1" data-ai-alt="得分值">评分中</div></div><div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2" data-ai-alt="达标结果"><div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2" data-ai-alt="区块标题">达标结果</div><div className="text-sm font-bold text-slate-700 pt-1 flex items-center h-full pb-1" data-ai-alt="结果值">评分中</div></div></div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2" data-ai-alt="得分说明"><div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2" data-ai-alt="区块标题">得分说明</div><div className="text-xs text-slate-600 leading-relaxed pt-1" data-ai-alt="区块内容">系统正在分析对练过程、关键话术命中与合规表现。</div></div>
            <div className="bg-orange-50/50 rounded-lg p-4 shadow-sm border border-orange-100 flex flex-col gap-2" data-ai-alt="改进建议"><div className="text-xs font-bold text-orange-800 border-l-2 border-orange-500 pl-2" data-ai-alt="区块标题">改进建议</div><div className="text-xs text-orange-700 leading-relaxed pt-1" data-ai-alt="区块内容">评分完成后将自动生成改进建议。</div></div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col gap-2 flex-1 min-h-[200px]" data-ai-alt="过程记录"><div className="text-xs font-bold text-slate-800 border-l-2 border-blue-500 pl-2" data-ai-alt="区块标题">对练过程记录</div><div className="text-xs text-slate-600 bg-slate-50 p-3 rounded mt-2 flex-1 whitespace-pre-line leading-relaxed border border-slate-100 overflow-y-auto" data-ai-alt="过程内容">机器人：您好，方便沟通一下当前逾期款项吗？\n员工：您好，我先和您确认一下身份信息，并说明本次来电目的...</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingRecordDrawerPage;
