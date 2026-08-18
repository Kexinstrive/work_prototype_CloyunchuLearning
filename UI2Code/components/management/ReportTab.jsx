import React, { useEffect, useRef } from 'react';

const ReportTab = () => {
  const dashboardChartRef = useRef(null);
  const dashboardChartInstance = useRef(null);

  useEffect(() => {
    if (dashboardChartRef.current && window.echarts) {
      if (dashboardChartInstance.current) dashboardChartInstance.current.dispose();
      dashboardChartInstance.current = window.echarts.init(dashboardChartRef.current);
      
      const option = {
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, data: ['回收金额', '目标达成'] },
        grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
        xAxis: { type: 'category', data: ['一组', '二组', '三组', '四组', '五组', '六组'] },
        yAxis: [
            { type: 'value', name: '金额(万)' },
            { type: 'value', name: '达成率', min: 0, max: 100, interval: 20 }
        ],
        series: [
            { name: '回收金额', type: 'bar', data: [320, 280, 450, 390, 210, 180], itemStyle: { color: '#3b82f6' } },
            { name: '目标达成', type: 'line', yAxisIndex: 1, data: [85, 78, 98, 92, 60, 55], itemStyle: { color: '#10b981' } }
        ],
        animation: false
      };
      dashboardChartInstance.current.setOption(option);
      const resize = () => dashboardChartInstance.current?.resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">团队业绩排行 (本月)</h3>
            <div ref={dashboardChartRef} className="w-full h-[350px]"></div>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200 h-60 flex items-center justify-center text-slate-400">报表A占位</div>
            <div className="bg-white p-4 rounded-lg border border-slate-200 h-60 flex items-center justify-center text-slate-400">报表B占位</div>
        </div>
    </div>
  );
};

export default ReportTab;