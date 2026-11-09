export type Role = 'super_admin' | 'admin' | 'product_manager' | 'analyst' | 'support';

export type Permission =
  // Dashboard
  | 'dashboard:view'
  | 'dashboard:export'
  // Analytics & Weekly Usage
  | 'analytics:view'
  | 'analytics:export'
  // Feature Flags / Management
  | 'features:view'
  | 'features:create'
  | 'features:edit'
  | 'features:toggle'
  | 'features:delete'
  // RBAC & Users
  | 'users:view'
  | 'users:create'
  | 'users:edit_role'
  | 'users:suspend'
  | 'users:delete'
  | 'rbac:manage_matrix'
  // System Monitoring
  | 'system:view'
  | 'system:restart_services'
  // Audit Logs
  | 'audit:view'
  // Settings
  | 'settings:view'
  | 'settings:edit';

export interface RoleInfo {
  id: Role;
  name: string;
  badgeColor: string;
  description: string;
  permissions: Permission[];
}

export type FeatureCategory = 'ai_models' | 'ui_ux' | 'integrations' | 'developer' | 'experimental';

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  category: FeatureCategory;
  enabled: boolean;
  rolloutPercentage: number; // 0 - 100
  targetRoles: Role[];
  environment: 'production' | 'staging' | 'development' | 'all';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: 'active' | 'pending' | 'suspended';
  department: string;
  lastActive: string;
  createdAt: string;
  mfaEnabled: boolean;
  inviteSentAt?: string;
  inviteToken?: string;
}

export interface ServiceHealth {
  id: string;
  name: string;
  category: 'inference' | 'database' | 'gateway' | 'cache' | 'billing' | 'email';
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  uptimePercent: number;
  latencyMs: number;
  lastChecked: string;
  region: string;
  liveData?: string;
  description?: string;
}

export interface RailwayHealthResponse {
  backend: string;
  version: string;
  database: {
    type: string;
    ok: boolean;
  };
  email: {
    enabled: boolean;
    configured: boolean;
    from: string;
  };
  ai: {
    status: string;
    ollama: string;
    models: string[];
    database: {
      type: string;
      ok: boolean;
    };
    provider: string;
    version: string;
    chat_model: string;
    fallback_models: string[];
    models_status: string;
    cpu_only: boolean;
  };
}

export interface DailyUsage {
  date: string;
  dayName: string;
  activeUsers: number;
  queriesCount: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  avgLatencyMs: number;
  costUSD: number;
  errorRatePercent: number;
}

export interface ModelUsage {
  modelName: string;
  provider: string;
  queryCount: number;
  percentage: number;
  avgLatencyMs: number;
  tokensTotal: number;
  costUSD: number;
  color: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    email: string;
    role: Role;
  };
  action: string;
  category: 'feature_flag' | 'rbac' | 'user' | 'system' | 'auth';
  targetResource: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'failed';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: number;
}
