import { Role, Permission, RoleInfo } from '../types';

export const ROLE_DEFINITIONS: Record<Role, RoleInfo> = {
  super_admin: {
    id: 'super_admin',
    name: 'Super Admin',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    description: 'Unrestricted root access. Can modify system settings, manage RBAC matrix, and access all endpoints.',
    permissions: [
      'dashboard:view',
      'dashboard:export',
      'analytics:view',
      'analytics:export',
      'features:view',
      'features:create',
      'features:edit',
      'features:toggle',
      'features:delete',
      'users:view',
      'users:create',
      'users:edit_role',
      'users:suspend',
      'users:delete',
      'rbac:manage_matrix',
      'system:view',
      'system:restart_services',
      'audit:view',
      'settings:view',
      'settings:edit'
    ]
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    description: 'Full operational control over features, users, system telemetry, and analytics.',
    permissions: [
      'dashboard:view',
      'dashboard:export',
      'analytics:view',
      'analytics:export',
      'features:view',
      'features:create',
      'features:edit',
      'features:toggle',
      'features:delete',
      'users:view',
      'users:create',
      'users:edit_role',
      'users:suspend',
      'system:view',
      'audit:view',
      'settings:view'
    ]
  },
  product_manager: {
    id: 'product_manager',
    name: 'Product Manager',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    description: 'Feature rollout owner. Can create, edit, toggle, and target feature flags, and view telemetry.',
    permissions: [
      'dashboard:view',
      'dashboard:export',
      'analytics:view',
      'analytics:export',
      'features:view',
      'features:create',
      'features:edit',
      'features:toggle',
      'audit:view',
      'users:view'
    ]
  },
  analyst: {
    id: 'analyst',
    name: 'Analyst',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'Read-only access to dashboard KPIs, weekly usage analytics, model consumption, and reports.',
    permissions: [
      'dashboard:view',
      'dashboard:export',
      'analytics:view',
      'analytics:export',
      'features:view',
      'audit:view'
    ]
  },
  support: {
    id: 'support',
    name: 'Support Agent',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    description: 'Frontline operations. Can view system health, inspect user activity, and check feature rollout states.',
    permissions: [
      'dashboard:view',
      'features:view',
      'users:view',
      'system:view',
      'audit:view'
    ]
  }
};

export const hasPermission = (userRole: Role, permission: Permission): boolean => {
  const roleConfig = ROLE_DEFINITIONS[userRole];
  if (!roleConfig) return false;
  return roleConfig.permissions.includes(permission);
};

export const ALL_PERMISSIONS: { key: Permission; label: string; module: string; description: string }[] = [
  { key: 'dashboard:view', label: 'View Dashboard', module: 'Dashboard', description: 'Access overview dashboard & KPIs' },
  { key: 'dashboard:export', label: 'Export Dashboard Data', module: 'Dashboard', description: 'Export summary stats to CSV/JSON' },
  { key: 'analytics:view', label: 'View Weekly Usage', module: 'Analytics', description: 'Inspect 7-day usage trends & model tokens' },
  { key: 'analytics:export', label: 'Export Analytics', module: 'Analytics', description: 'Download deep usage datasets' },
  { key: 'features:view', label: 'View Feature Flags', module: 'Feature Control', description: 'Inspect active feature catalog' },
  { key: 'features:create', label: 'Create Feature', module: 'Feature Control', description: 'Add new feature flags and modules' },
  { key: 'features:edit', label: 'Edit Feature Config', module: 'Feature Control', description: 'Modify rollout % and targeting' },
  { key: 'features:toggle', label: 'Toggle Feature States', module: 'Feature Control', description: 'Turn features ON/OFF instantly' },
  { key: 'features:delete', label: 'Delete Features', module: 'Feature Control', description: 'Remove deprecated features permanently' },
  { key: 'users:view', label: 'View Users Directory', module: 'RBAC & Users', description: 'List all team members & roles' },
  { key: 'users:create', label: 'Invite / Add Users', module: 'RBAC & Users', description: 'Invite new admins or staff' },
  { key: 'users:edit_role', label: 'Change User Roles', module: 'RBAC & Users', description: 'Elevate or demote user permissions' },
  { key: 'users:suspend', label: 'Suspend User Access', module: 'RBAC & Users', description: 'Revoke login credentials temporarily' },
  { key: 'users:delete', label: 'Delete Users', module: 'RBAC & Users', description: 'Permanently remove user accounts' },
  { key: 'rbac:manage_matrix', label: 'Modify RBAC Matrix', module: 'RBAC & Users', description: 'Update permissions mapped to roles' },
  { key: 'system:view', label: 'View System Health', module: 'Monitoring', description: 'Inspect microservice latency & cluster load' },
  { key: 'system:restart_services', label: 'Restart Microservices', module: 'Monitoring', description: 'Trigger service reload/reboot' },
  { key: 'audit:view', label: 'View Audit Logs', module: 'Audit Trail', description: 'Inspect immutable admin action trail' },
  { key: 'settings:view', label: 'View App Settings', module: 'Settings', description: 'Inspect general config & API keys' },
  { key: 'settings:edit', label: 'Modify App Settings', module: 'Settings', description: 'Update production endpoints & policies' },
];
