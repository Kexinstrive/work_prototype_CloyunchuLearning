import React from 'react';
import { SystemCard } from '../ManagementComponents';

const SystemTab = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
        <SystemCard title="用户管理" icon="users" desc="管理系统登录账号与组织架构" />
        <SystemCard title="角色权限" icon="lock" desc="配置角色权限与菜单访问控制" />
        <SystemCard title="数据字典" icon="book" desc="维护系统下拉选项与参数配置" />
        <SystemCard title="操作日志" icon="history" desc="查看系统关键操作记录" />
        <SystemCard title="消息通知" icon="bell" desc="配置系统通知模板与推送规则" />
    </div>
  );
};

export default SystemTab;