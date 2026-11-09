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
  | 'settings:edit'
  // Video Studio
  | 'video:view'
  | 'video:generate'
  // MCP & Agentic AI
  | 'mcp:view'
  | 'mcp:execute'
  | 'agent:run';

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
  tier?: 'free' | 'partially_free' | 'pro';
  dailyLimit?: number; // 0 = unlimited, otherwise number of free queries/day
  route?: string;
  isCustom?: boolean;
  usageCount?: number;
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

export interface GeneratedVideo {
  id: string;
  title: string;
  type: 'text_to_video' | 'image_to_video';
  prompt: string;
  sourceImageUrl?: string;
  videoUrl: string;
  thumbnailUrl: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  durationSeconds: number;
  modelName: string;
  createdAt: string;
  status: 'completed' | 'generating' | 'failed';
}

export interface AIFeatureProposal {
  name: string;
  key: string;
  description: string;
  category: FeatureCategory;
  rolloutPercentage: number;
  targetRoles: Role[];
  endpoint: string;
  implementationCodeSnippet: string;
  recommendedModel: string;
}

export interface McpTool {
  name: string;
  description: string;
  serverName: string;
  inputSchema: Record<string, any>;
}

export interface McpServer {
  id: string;
  name: string;
  description: string;
  transport: 'sse' | 'stdio' | 'websocket';
  url: string;
  status: 'connected' | 'offline' | 'degraded';
  tools: McpTool[];
  lastPing: string;
}

export interface AgentStep {
  id: string;
  timestamp: string;
  type: 'thought' | 'tool_call' | 'tool_result' | 'injection';
  toolName?: string;
  content: string;
  payload?: any;
}

export interface AgentTask {
  id: string;
  prompt: string;
  status: 'planning' | 'executing' | 'completed' | 'failed';
  steps: AgentStep[];
  createdFeature?: FeatureFlag;
  generatedCode?: string;
  previewWidget?: string;
}

// User Tracing & Telemetry
export interface UserSessionTrace {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  isPremium: boolean;
  tier: 'free' | 'pro' | 'power';
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  ipAddress: string;
  device: string;
  os: string;
  browser: string;
  status: 'online' | 'idle' | 'offline';
  sessionDurationMinutes: number;
  totalTimeSpentHours: number;
  queriesToday: number;
  lastActive: string;
  favoriteFeature: string;
}

// Feature Popularity for Dashboard Pie Chart
export interface FeaturePopularity {
  name: string;
  key: string;
  queryCount: number;
  percentage: number;
  color: string;
}

// Payments & Premium Subscriptions
export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  planName: string;
  tier: 'pro' | 'power';
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  paymentMethod: string;
  status: 'paid' | 'refunded' | 'failed';
  date: string;
  invoiceId: string;
}

// Paywall & Daily Quota Rules
export interface PaywallConfig {
  freeDailyQueryLimit: number;
  freeDailyMinutesLimit: number;
  premiumPriceMonthlyINR: number;
  premiumPriceYearlyINR: number;
  premiumFeatureKeys: string[]; // Keys restricted to Pro
  allowGuestTrial: boolean;
  guestDailyLimit: number;
  updatedAt: string;
}
