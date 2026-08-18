import React, { useState } from 'react';

const AutoModeConfigTab = () => {
  const [agents, setAgents] = useState([
    { id: '8021', name: '张佳铭', yesterdayRate: 1.2, last7DaysRate: 4.5, last30DaysRate: 8.5, ranks: { group: [1, 2, 1], hand: [3, 5, 2] }, autoMode: true, group: 'M1常规组' },
    { id: '8022', name: '李明', yesterdayRate: 1.0, last7DaysRate: 4.0, last30DaysRate: 8.0, ranks: { group: [2, 3, 2], hand: [5, 8, 4] }, autoMode: false, group: 'M1常规组' },
    { id: '8023', name: '王丽', yesterdayRate: 0.8, last7DaysRate: 3.5, last30DaysRate: 7.5, ranks: { group: [3, 4, 4], hand: [12, 15, 10] }, autoMode: true, group: 'M1常规组' },
    { id: '8024', name: '赵强', yesterdayRate: 0.7, last7DaysRate: 3.0, last30DaysRate: 7.0, ranks: { group: [4, 5, 5], hand: [18, 20, 15] }, autoMode: false, group: 'M1常规组' },
    { id: '8025', name: '孙伟', yesterdayRate: 0.5, last7DaysRate: 2.5, last30DaysRate: 6.0, ranks: { group: [5, 6, 6], hand: [25, 28, 22] }, autoMode: false, group: 'M1常规组' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' });

  const toggleAutoMode = (id) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, autoMode: !agent.autoMode } : agent
    ));
  };

  const toggleAll = (enable) => {
    setAgents(agents.map(agent => ({ ...agent, autoMode: enable })));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
       direction = 'default';
       key = null;
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
     if (sortConfig.key !== columnKey) {
        return <i className="fa fa-sort text-[10px] text-slate-300 ml-1"></i>;
     }
     return (
        <i className={`fa fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} text-[10px] text-blue-600 ml-1`}></i>
     );
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.includes(searchQuery) || agent.id.includes(searchQuery)
  );

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (sortConfig.key === 'groupRankY') { valA = a.ranks.group[0]; valB = b.ranks.group[0]; }
    else if (sortConfig.key === 'groupRank7') { valA = a.ranks.group[1]; valB = b.ranks.group[1]; }
    else if (sortConfig.key === 'groupRank30') { valA = a.ranks.group[2]; valB = b.ranks.group[2]; }
    else if (sortConfig.key === 'handRankY') { valA = a.ranks.hand[0]; valB = b.ranks.hand[0]; }
    else if (sortConfig.key === 'handRank7') { valA = a.ranks.hand[1]; valB = b.ranks.hand[1]; }
    else if (sortConfig.key === 'handRank30') { valA = a.ranks.hand[2]; valB = b.ranks.hand[2]; }

    if (valA < valB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (valA > valB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const isAllAutoMode = agents.length > 0 && agents.every(a => a.autoMode);

  return (
    <div className="flex flex-col h-full animate-fadeIn">
        {/* 顶部操作区 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input 
                        type="text" 
                        className="pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all"
                        placeholder="搜索坐席姓名 / ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
                <i className="fa fa-sitemap text-blue-500 text-xs"></i>
                <span className="text-xs font-bold text-slate-600">我的分组：<span className="text-slate-800">成都分中心-信控三部-信控五组</span></span>
            </div>
        </div>

        {/* 坐席列表 */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
            <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700 text-sm">坐席全托管状态列表</h3>
                <span className="text-xs text-slate-500">共 {sortedAgents.length} 人</span>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-slate-50 font-bold text-slate-600 sticky top-0 z-10 border-b border-slate-200">
                        <tr>
                            <th className="p-4">坐席姓名</th>
                            <th className="p-4">坐席ID</th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('yesterdayRate')}>
                                <div className="flex items-center">昨日回收率 <SortIcon columnKey="yesterdayRate" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('last7DaysRate')}>
                                <div className="flex items-center">近7天回收率 <SortIcon columnKey="last7DaysRate" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('last30DaysRate')}>
                                <div className="flex items-center">近30天回收率 <SortIcon columnKey="last30DaysRate" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('groupRankY')}>
                                <div className="flex items-center">昨日组内排名 <SortIcon columnKey="groupRankY" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('groupRank7')}>
                                <div className="flex items-center">近7天组内排名 <SortIcon columnKey="groupRank7" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('groupRank30')}>
                                <div className="flex items-center">近30天组内排名 <SortIcon columnKey="groupRank30" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('handRankY')}>
                                <div className="flex items-center">昨日手别内排名 <SortIcon columnKey="handRankY" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('handRank7')}>
                                <div className="flex items-center">近7天手别内排名 <SortIcon columnKey="handRank7" /></div>
                            </th>
                            <th className="p-4 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('handRank30')}>
                                <div className="flex items-center">近30天手别内排名 <SortIcon columnKey="handRank30" /></div>
                            </th>
                            <th className="p-4 sticky right-0 bg-slate-50 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)]">
                                <div className="flex items-center gap-2">
                                    全托管模式
                                    <button 
                                        onClick={() => toggleAll(!isAllAutoMode)}
                                        className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none ${isAllAutoMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                                        title={isAllAutoMode ? '一键全关' : '一键全开'}
                                    >
                                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isAllAutoMode ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100" data-ai-list="true">
                        {sortedAgents.map((agent) => (
                            <tr key={agent.id} className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-4 font-bold text-slate-800">{agent.name}</td>
                                <td className="p-4 font-mono text-slate-600">{agent.id}</td>
                                <td className="p-4 font-mono">{agent.yesterdayRate}%</td>
                                <td className="p-4 font-mono">{agent.last7DaysRate}%</td>
                                <td className="p-4 font-mono">{agent.last30DaysRate}%</td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${agent.ranks.group[0] <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>NO.{agent.ranks.group[0]}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${agent.ranks.group[1] <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>NO.{agent.ranks.group[1]}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${agent.ranks.group[2] <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>NO.{agent.ranks.group[2]}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${agent.ranks.hand[0] <= 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>NO.{agent.ranks.hand[0]}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${agent.ranks.hand[1] <= 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>NO.{agent.ranks.hand[1]}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${agent.ranks.hand[2] <= 10 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>NO.{agent.ranks.hand[2]}</span>
                                </td>
                                <td className="p-4 sticky right-0 bg-white shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)]">
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => toggleAutoMode(agent.id)}
                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${agent.autoMode ? 'bg-blue-600' : 'bg-slate-300'}`}
                                        >
                                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${agent.autoMode ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} />
                                        </button>
                                        <span className={`ml-2 font-medium ${agent.autoMode ? 'text-blue-600' : 'text-slate-400'}`}>
                                            {agent.autoMode ? '已开启' : '未开启'}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {sortedAgents.length === 0 && (
                            <tr>
                                <td colSpan="12" className="p-8 text-center text-slate-400">
                                    暂无符合条件的坐席数据
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default AutoModeConfigTab;
