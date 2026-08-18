import React from 'react';
import { MANUAL_TAGS } from './MyCasesComponents';

// 创建案件池模态框
export const CreatePoolModal = ({ isOpen, onClose, name, setName, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                <h3 className="font-bold text-slate-800">创建自定义案件池</h3>
                <button onClick={onClose} className="absolute right-4 text-slate-400 hover:text-slate-600">
                    <i className="fa fa-times"></i>
                </button>
            </div>
            <div className="p-4">
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs text-slate-500">案件池名称</label>
                    <input 
                        autoFocus
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                        placeholder="例如：本月重点、高风险组..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-400 mt-1">* 将当前所有筛选条件保存为自定义标签</p>
                </div>
                <div className="flex gap-2 justify-end">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-1.5 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                    >
                        取消
                    </button>
                    <button 
                        onClick={onSave} 
                        disabled={!name.trim()}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        确认创建
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

// 批量打标模态框
export const BatchTagModal = ({ isOpen, onClose, selectedCount, selectedTag, onSelectTag, note, setNote, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                <h3 className="font-bold text-slate-800">批量打标申请</h3>
                <button onClick={onClose} className="absolute right-4 text-slate-400 hover:text-slate-600">
                    <i className="fa fa-times"></i>
                </button>
            </div>
            <div className="p-5">
                <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">
                        已选择 <span className="font-bold text-blue-600">{selectedCount}</span> 个案件，请选择<span className="text-red-500 font-bold">一个</span>新标签（将覆盖原有标签）：
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {MANUAL_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => onSelectTag(tag)}
                                className={`px-3 py-1.5 rounded text-xs border transition-all ${
                                    selectedTag === tag 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 font-bold' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-xs text-slate-500">审批备注 (必填)</label>
                    <textarea 
                        className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none h-20 resize-none"
                        placeholder="请输入申请打标的原因，以便上级审批..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 p-3 bg-orange-50 text-orange-700 text-xs rounded border border-orange-100 mb-4">
                    <i className="fa fa-info-circle"></i>
                    注意：每个客户只能拥有一个人工标签，批量修改将覆盖原有标签。
                </div>

                <div className="flex gap-2 justify-end border-t border-slate-100 pt-3">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                    >
                        取消
                    </button>
                    <button 
                        onClick={onSubmit} 
                        disabled={!selectedTag || !note.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 font-bold"
                    >
                        提交审批
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

// 添加到群组模态框
export const AddToGroupModal = ({ isOpen, onClose, caseId, groups, onAdd, onOpenNewGroup }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                <h3 className="font-bold text-slate-800">添加到案件群组</h3>
                <button onClick={onClose} className="absolute right-4 text-slate-400 hover:text-slate-600">
                    <i className="fa fa-times"></i>
                </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
                <p className="px-3 py-2 text-xs text-slate-500">将案件 <strong>{caseId}</strong> 添加到：</p>
                {groups.map(group => (
                    <div 
                        key={group.id} 
                        onClick={() => group.status !== 'expired' && onAdd(group)}
                        className={`flex items-center justify-between p-3 rounded-lg group transition-colors border border-transparent ${
                            group.status === 'expired' ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-cyan-50 cursor-pointer hover:border-cyan-100'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${
                                group.status === 'expired' ? 'bg-slate-100 text-slate-300' : 'bg-slate-100 text-slate-400 group-hover:bg-cyan-200 group-hover:text-cyan-700'
                            }`}>
                                <i className="fa fa-layer-group"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-700 group-hover:text-cyan-700">{group.name}</h4>
                                <p className="text-xs text-slate-400 flex items-center gap-2">
                                    {group.count} 个案件
                                    {group.status === 'expired' && <span className="text-red-500 font-bold px-1 bg-red-50 rounded">已失效</span>}
                                </p>
                            </div>
                        </div>
                        {group.status !== 'expired' && <i className="fa fa-plus text-slate-300 group-hover:text-cyan-600"></i>}
                    </div>
                ))}
                <div 
                    onClick={onOpenNewGroup}
                    className="flex items-center gap-3 p-3 text-cyan-600 cursor-pointer hover:bg-slate-50 rounded-lg border-t border-slate-100 mt-2"
                >
                    <div className="w-8 h-8 rounded border border-dashed border-cyan-300 flex items-center justify-center">
                        <i className="fa fa-plus"></i>
                    </div>
                    <span className="text-sm font-bold">新建群组...</span>
                </div>
            </div>
        </div>
    </div>
  );
};

// 新建群组模态框 (更新版：增加有效期)
export const CreateGroupModal = ({ isOpen, onClose, name, setName, days, setDays, onCreate }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fadeIn">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-center relative bg-slate-50">
                <h3 className="font-bold text-slate-800">新建并添加</h3>
                <button onClick={onClose} className="absolute right-4 text-slate-400 hover:text-slate-600">
                    <i className="fa fa-times"></i>
                </button>
            </div>
            <div className="p-4">
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">群组名称 <span className="text-red-500">*</span></label>
                        <input 
                            autoFocus
                            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                            placeholder="例如：临时待处理组..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-500">有效期 (天) <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number"
                                min="1"
                                max="30"
                                className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                                placeholder="最大30天"
                                value={days}
                                onChange={(e) => {
                                    let val = parseInt(e.target.value);
                                    if (val > 30) val = 30;
                                    if (val < 1) val = 1;
                                    setDays(val);
                                }}
                            />
                            <span className="text-xs text-slate-400 whitespace-nowrap">天后失效</span>
                        </div>
                        <p className="text-[10px] text-slate-400">失效后需重新启用才可查看</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-1.5 border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50"
                    >
                        取消
                    </button>
                    <button 
                        onClick={onCreate} 
                        disabled={!name.trim()}
                        className="px-4 py-1.5 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        创建并添加
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

// 右键菜单组件
export const ContextMenu = ({ visible, x, y, caseId, onSaveGroup, onCopy, onViewDetail, onClose }) => {
  if (!visible) return null;
  return (
    <div 
        className="fixed bg-white border border-slate-200 shadow-xl rounded-lg py-1 z-[9999] w-40 animate-fadeIn"
        style={{ top: y, left: x }}
        onClick={(e) => e.stopPropagation()}
    >
        <div className="px-3 py-2 border-b border-slate-50 mb-1">
            <span className="text-xs text-slate-400 block">案件操作</span>
            <span className="text-xs font-bold text-slate-700">#{caseId}</span>
        </div>
        <button 
            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 flex items-center gap-2"
            onClick={() => {
                onClose();
                onSaveGroup();
            }}
        >
            <i className="fa fa-folder-plus w-4"></i> 存为群组
        </button>
        <button 
            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            onClick={() => {
                onClose();
                onCopy();
            }}
        >
            <i className="fa fa-copy w-4"></i> 复制单号
        </button>
        <button 
            className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            onClick={() => {
                onClose();
                onViewDetail();
            }}
        >
            <i className="fa fa-external-link-alt w-4"></i> 查看详情
        </button>
    </div>
  );
};