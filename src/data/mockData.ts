import { FeatureFlag, User, ServiceHealth, DailyUsage, ModelUsage, AuditLogItem } from '../types';

export const INITIAL_SERVICES: ServiceHealth[] = [
  {
    id: 'srv-1',
    name: 'AI Inference Gateway (v2.4)',
    category: 'gateway',
    status: 'operational',
    uptimePercent: 99.98,
    latencyMs: 142,
    lastChecked: 'Just now',
    region: 'us-east-1'
  },
  {
    id: 'srv-2',
    name: 'LLM Orchestrator Cluster',
    category: 'inference',
    status: 'operational',
    uptimePercent: 99.95,
    latencyMs: 380,
    lastChecked: '1 min ago',
    region: 'us-east-1'
  },
  {
    id: 'srv-3',
    name: 'Vector Database (Pinecone RAG)',
    category: 'database',
    status: 'operational',
    uptimePercent: 100.0,
    latencyMs: 38,
    lastChecked: 'Just now',
    region: 'us-west-2'
  },
  {
    id: 'srv-4',
    name: 'Whisper-v3 Speech-to-Text Pipeline',
    category: 'inference',
    status: 'operational',
    uptimePercent: 99.89,
    latencyMs: 290,
    lastChecked: '2 mins ago',
    region: 'eu-central-1'
  },
  {
    id: 'srv-5',
    name: 'Distributed Redis Semantic Cache',
    category: 'cache',
    status: 'operational',
    uptimePercent: 99.99,
    latencyMs: 12,
    lastChecked: 'Just now',
    region: 'us-east-1'
  },
  {
    id: 'srv-6',
    name: 'Token Metering & Billing Webhook',
    category: 'billing',
    status: 'operational',
    uptimePercent: 99.92,
    latencyMs: 65,
    lastChecked: '3 mins ago',
    region: 'us-east-1'
  }
];

export const INITIAL_WEEKLY_USAGE: DailyUsage[] = [
  {
    date: '2026-11-03',
    dayName: 'Mon',
    activeUsers: 3420,
    queriesCount: 48920,
    promptTokens: 18450000,
    completionTokens: 11200000,
    totalTokens: 29650000,
    avgLatencyMs: 320,
    costUSD: 59.30,
    errorRatePercent: 0.12
  },
  {
    date: '2026-11-04',
    dayName: 'Tue',
    activeUsers: 3890,
    queriesCount: 56210,
    promptTokens: 21900000,
    completionTokens: 13400000,
    totalTokens: 35300000,
    avgLatencyMs: 310,
    costUSD: 70.60,
    errorRatePercent: 0.08
  },
  {
    date: '2026-11-05',
    dayName: 'Wed',
    activeUsers: 4120,
    queriesCount: 62450,
    promptTokens: 24800000,
    completionTokens: 14900000,
    totalTokens: 39700000,
    avgLatencyMs: 345,
    costUSD: 79.40,
    errorRatePercent: 0.15
  },
  {
    date: '2026-11-06',
    dayName: 'Thu',
    activeUsers: 4350,
    queriesCount: 68100,
    promptTokens: 27100000,
    completionTokens: 16800000,
    totalTokens: 43900000,
    avgLatencyMs: 330,
    costUSD: 87.80,
    errorRatePercent: 0.09
  },
  {
    date: '2026-11-07',
    dayName: 'Fri',
    activeUsers: 4580,
    queriesCount: 74200,
    promptTokens: 29500000,
    completionTokens: 18400000,
    totalTokens: 47900000,
    avgLatencyMs: 360,
    costUSD: 95.80,
    errorRatePercent: 0.18
  },
  {
    date: '2026-11-08',
    dayName: 'Sat',
    activeUsers: 2890,
    queriesCount: 39800,
    promptTokens: 15300000,
    completionTokens: 9600000,
    totalTokens: 24900000,
    avgLatencyMs: 275,
    costUSD: 49.80,
    errorRatePercent: 0.05
  },
  {
    date: '2026-11-09',
    dayName: 'Sun (Today)',
    activeUsers: 3150,
    queriesCount: 44300,
    promptTokens: 17200000,
    completionTokens: 10800000,
    totalTokens: 28000000,
    avgLatencyMs: 290,
    costUSD: 56.00,
    errorRatePercent: 0.06
  }
];

export const INITIAL_MODEL_BREAKDOWN: ModelUsage[] = [
  {
    modelName: 'SelfAI Pro v2.5 (Flagship)',
    provider: 'SelfAI Custom Fine-tune',
    queryCount: 168400,
    percentage: 42.7,
    avgLatencyMs: 280,
    tokensTotal: 106000000,
    costUSD: 212.00,
    color: '#6366f1' // indigo
  },
  {
    modelName: 'Claude 3.5 Sonnet',
    provider: 'Anthropic Bedrock',
    queryCount: 108200,
    percentage: 27.5,
    avgLatencyMs: 420,
    tokensTotal: 68500000,
    costUSD: 137.00,
    color: '#8b5cf6' // violet
  },
  {
    modelName: 'GPT-4o Reasoning',
    provider: 'OpenAI Azure',
    queryCount: 62100,
    percentage: 15.8,
    avgLatencyMs: 390,
    tokensTotal: 41200000,
    costUSD: 82.40,
    color: '#10b981' // emerald
  },
  {
    modelName: 'SelfAI Fast Flash (Edge)',
    provider: 'SelfAI Quantized',
    queryCount: 41200,
    percentage: 10.5,
    avgLatencyMs: 95,
    tokensTotal: 25400000,
    costUSD: 25.40,
    color: '#06b6d4' // cyan
  },
  {
    modelName: 'Whisper-v3 Speech Audio',
    provider: 'SelfAI Dedicated GPU',
    queryCount: 13980,
    percentage: 3.5,
    avgLatencyMs: 310,
    tokensTotal: 8200000,
    costUSD: 41.90,
    color: '#f59e0b' // amber
  }
];

export const INITIAL_FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'feat-1',
    name: 'AI Voice Streaming Agent',
    key: 'ai_voice_streaming_agent',
    description: 'Real-time duplex speech interaction via WebSockets with <350ms turn-around time.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-15',
    updatedAt: '2026-11-05',
    updatedBy: 'Anubhab Nandi',
    tags: ['audio', 'latency-critical', 'flagship']
  },
  {
    id: 'feat-2',
    name: 'Deep Reasoning CoT Mode',
    key: 'deep_reasoning_cot',
    description: 'Enables step-by-step mathematical reasoning and verified source cross-checking.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 80,
    targetRoles: ['super_admin', 'admin', 'product_manager'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-20',
    updatedAt: '2026-11-08',
    updatedBy: 'Elena Rostova',
    tags: ['reasoning', 'high-tokens', 'beta']
  },
  {
    id: 'feat-3',
    name: 'Autonomous Code Sandbox',
    key: 'autonomous_code_sandbox',
    description: 'Isolated Docker sandbox allowing the SelfAI agent to execute Python and generate charts safely.',
    category: 'developer',
    enabled: true,
    rolloutPercentage: 50,
    targetRoles: ['super_admin', 'admin', 'product_manager'],
    environment: 'production',
    createdBy: 'Marcus Chen',
    createdAt: '2026-10-28',
    updatedAt: '2026-11-07',
    updatedBy: 'Marcus Chen',
    tags: ['sandbox', 'security-reviewed', 'execution']
  },
  {
    id: 'feat-4',
    name: 'Multi-Modal Visual Search (RAG)',
    key: 'multimodal_vision_rag',
    description: 'Visual vector indexing for PDF schematics, diagrams, and scanned invoices.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-10',
    updatedAt: '2026-11-01',
    updatedBy: 'Anubhab Nandi',
    tags: ['vision', 'embeddings', 'rag']
  },
  {
    id: 'feat-5',
    name: 'Slack & Notion Real-time Sync',
    key: 'slack_notion_knowledge_sync',
    description: 'Continuous background crawler syncing company documentation directly into the vector DB.',
    category: 'integrations',
    enabled: false,
    rolloutPercentage: 15,
    targetRoles: ['super_admin', 'admin'],
    environment: 'staging',
    createdBy: 'Sarah Connor',
    createdAt: '2026-11-02',
    updatedAt: '2026-11-08',
    updatedBy: 'Sarah Connor',
    tags: ['webhook', 'third-party', 'sync']
  },
  {
    id: 'feat-6',
    name: 'Multi-Agent Collaborative Mesh',
    key: 'agent_mesh_swarm',
    description: 'Enables leader agents to spin up parallel sub-agents for research, coding, and review.',
    category: 'experimental',
    enabled: true,
    rolloutPercentage: 30,
    targetRoles: ['super_admin', 'admin', 'product_manager'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-11-04',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['agents', 'experimental', 'next-gen']
  },
  {
    id: 'feat-7',
    name: 'Interactive Canvas UI Mode',
    key: 'interactive_canvas_ui',
    description: 'Split-screen generative artifact canvas with inline Markdown, code, and live previews.',
    category: 'ui_ux',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Elena Rostova',
    createdAt: '2026-10-12',
    updatedAt: '2026-10-30',
    updatedBy: 'Elena Rostova',
    tags: ['ui', 'frontend', 'canvas']
  },
  {
    id: 'feat-8',
    name: 'Automated Token Rate-Limiting Tier 2',
    key: 'rate_limiting_tier_2',
    description: 'Dynamic rate throttling based on user token credit exhaustion to prevent API abuse.',
    category: 'developer',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin'],
    environment: 'production',
    createdBy: 'Marcus Chen',
    createdAt: '2026-09-18',
    updatedAt: '2026-10-01',
    updatedBy: 'Marcus Chen',
    tags: ['safety', 'rate-limit', 'billing']
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Anubhab Nandi',
    email: 'anubhabnandi12@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    status: 'active',
    department: 'Engineering & Core AI',
    lastActive: 'Active now',
    createdAt: '2026-01-15',
    mfaEnabled: true
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@selfai.internal',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    status: 'active',
    department: 'Platform Infrastructure',
    lastActive: '12 mins ago',
    createdAt: '2026-02-01',
    mfaEnabled: true
  },
  {
    id: 'usr-3',
    name: 'Marcus Chen',
    email: 'marcus.chen@selfai.internal',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'product_manager',
    status: 'active',
    department: 'Product & Features',
    lastActive: '45 mins ago',
    createdAt: '2026-03-10',
    mfaEnabled: true
  },
  {
    id: 'usr-4',
    name: 'Sarah Connor',
    email: 'sarah.connor@selfai.internal',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'analyst',
    status: 'active',
    department: 'Data & Growth',
    lastActive: '3 hours ago',
    createdAt: '2026-04-20',
    mfaEnabled: true
  },
  {
    id: 'usr-5',
    name: 'David Kim',
    email: 'david.kim@selfai.internal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'support',
    status: 'active',
    department: 'Customer Success',
    lastActive: '20 mins ago',
    createdAt: '2026-05-12',
    mfaEnabled: false
  },
  {
    id: 'usr-6',
    name: 'Priya Patel',
    email: 'priya.patel@selfai.internal',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'product_manager',
    status: 'suspended',
    department: 'AI Safety & Policy',
    lastActive: '4 days ago',
    createdAt: '2026-06-01',
    mfaEnabled: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-11-09 13:42:10',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'TOGGLE_FEATURE_FLAG',
    category: 'feature_flag',
    targetResource: 'ai_voice_streaming_agent',
    details: 'Enabled feature flag globally (Rollout set to 100%)',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-2',
    timestamp: '2026-11-09 12:15:44',
    actor: {
      name: 'Marcus Chen',
      email: 'marcus.chen@selfai.internal',
      role: 'product_manager'
    },
    action: 'CREATE_FEATURE_FLAG',
    category: 'feature_flag',
    targetResource: 'agent_mesh_swarm',
    details: 'Created canary feature flag with 30% rollout for Pro users',
    ipAddress: '10.0.4.88',
    status: 'success'
  },
  {
    id: 'log-3',
    timestamp: '2026-11-09 10:28:19',
    actor: {
      name: 'Elena Rostova',
      email: 'elena.rostova@selfai.internal',
      role: 'admin'
    },
    action: 'UPDATE_USER_ROLE',
    category: 'rbac',
    targetResource: 'david.kim@selfai.internal',
    details: 'Changed role assignment from Viewer to Support Agent',
    ipAddress: '10.0.2.14',
    status: 'success'
  },
  {
    id: 'log-4',
    timestamp: '2026-11-08 18:40:02',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'CLUSTER_REBALANCE',
    category: 'system',
    targetResource: 'Inference Gateway v2.4',
    details: 'Increased GPU allocation from 8x H100 to 12x H100 for peak hours',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-5',
    timestamp: '2026-11-08 14:12:33',
    actor: {
      name: 'Marcus Chen',
      email: 'marcus.chen@selfai.internal',
      role: 'product_manager'
    },
    action: 'UPDATE_FEATURE_FLAG',
    category: 'feature_flag',
    targetResource: 'deep_reasoning_cot',
    details: 'Incremented rollout percentage from 60% to 80%',
    ipAddress: '10.0.4.88',
    status: 'success'
  },
  {
    id: 'log-6',
    timestamp: '2026-11-07 09:30:15',
    actor: {
      name: 'Elena Rostova',
      email: 'elena.rostova@selfai.internal',
      role: 'admin'
    },
    action: 'SECURITY_SUSPEND_USER',
    category: 'user',
    targetResource: 'priya.patel@selfai.internal',
    details: 'Temporarily suspended account due to password rotation cycle',
    ipAddress: '10.0.2.14',
    status: 'warning'
  }
];
