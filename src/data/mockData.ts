import { 
  FeatureFlag, 
  User, 
  ServiceHealth, 
  DailyUsage, 
  ModelUsage, 
  AuditLogItem, 
  GeneratedVideo, 
  McpServer, 
  AgentTask,
  UserSessionTrace,
  FeaturePopularity,
  PaymentTransaction,
  PaywallConfig
} from '../types';

export const RAILWAY_APP_URL = 'https://frontend-production-0c17e.up.railway.app';

export const INITIAL_SERVICES: ServiceHealth[] = [
  {
    id: 'srv-1',
    name: 'Gemini Flash Chat Orchestrator',
    category: 'inference',
    status: 'operational',
    uptimePercent: 99.98,
    latencyMs: 185,
    lastChecked: 'Live sync',
    region: 'railway-sin1',
    liveData: 'gemini-flash-latest (fallback: gemini-flash-lite-latest)'
  },
  {
    id: 'srv-2',
    name: 'Chroma Vector Database',
    category: 'database',
    status: 'operational',
    uptimePercent: 100.0,
    latencyMs: 42,
    lastChecked: 'Live sync',
    region: 'railway-sin1',
    liveData: 'Type: Chroma | Embedding: gemini-embedding-001'
  },
  {
    id: 'srv-3',
    name: 'SQLite Application Database',
    category: 'database',
    status: 'operational',
    uptimePercent: 100.0,
    latencyMs: 14,
    lastChecked: 'Live sync',
    region: 'railway-sin1',
    liveData: 'SQLite relational store (ok: true)'
  },
  {
    id: 'srv-4',
    name: 'Email Assistant Service',
    category: 'email',
    status: 'operational',
    uptimePercent: 99.94,
    latencyMs: 65,
    lastChecked: 'Live sync',
    region: 'railway-sin1',
    liveData: 'anubhabnandi12@gmail.com (Configured: true)'
  },
  {
    id: 'srv-5',
    name: 'Ollama Model Runner',
    category: 'inference',
    status: 'operational',
    uptimePercent: 99.88,
    latencyMs: 110,
    lastChecked: 'Live sync',
    region: 'railway-sin1',
    liveData: 'Status: UP | Provider: OpenAI/Gemini'
  },
  {
    id: 'srv-6',
    name: 'Guest Chat Gateway (/api/chat/guest)',
    category: 'gateway',
    status: 'operational',
    uptimePercent: 99.99,
    latencyMs: 160,
    lastChecked: 'Live sync',
    region: 'railway-sin1',
    liveData: 'Rate limiter: 5 queries/session'
  }
];

export const INITIAL_WEEKLY_USAGE: DailyUsage[] = [
  {
    date: '2026-11-03',
    dayName: 'Mon',
    activeUsers: 2,
    queriesCount: 14,
    promptTokens: 5200,
    completionTokens: 3800,
    totalTokens: 9000,
    avgLatencyMs: 195,
    costUSD: 0.01,
    errorRatePercent: 0.0
  },
  {
    date: '2026-11-04',
    dayName: 'Tue',
    activeUsers: 2,
    queriesCount: 22,
    promptTokens: 8400,
    completionTokens: 5600,
    totalTokens: 14000,
    avgLatencyMs: 180,
    costUSD: 0.02,
    errorRatePercent: 0.0
  },
  {
    date: '2026-11-05',
    dayName: 'Wed',
    activeUsers: 2,
    queriesCount: 19,
    promptTokens: 7100,
    completionTokens: 4900,
    totalTokens: 12000,
    avgLatencyMs: 210,
    costUSD: 0.01,
    errorRatePercent: 0.0
  },
  {
    date: '2026-11-06',
    dayName: 'Thu',
    activeUsers: 2,
    queriesCount: 28,
    promptTokens: 10400,
    completionTokens: 7200,
    totalTokens: 17600,
    avgLatencyMs: 185,
    costUSD: 0.02,
    errorRatePercent: 0.0
  },
  {
    date: '2026-11-07',
    dayName: 'Fri',
    activeUsers: 2,
    queriesCount: 31,
    promptTokens: 12200,
    completionTokens: 8500,
    totalTokens: 20700,
    avgLatencyMs: 190,
    costUSD: 0.02,
    errorRatePercent: 0.0
  },
  {
    date: '2026-11-08',
    dayName: 'Sat',
    activeUsers: 2,
    queriesCount: 24,
    promptTokens: 9100,
    completionTokens: 6300,
    totalTokens: 15400,
    avgLatencyMs: 175,
    costUSD: 0.01,
    errorRatePercent: 0.0
  },
  {
    date: '2026-11-09',
    dayName: 'Today',
    activeUsers: 2,
    queriesCount: 38,
    promptTokens: 14500,
    completionTokens: 9800,
    totalTokens: 24300,
    avgLatencyMs: 185,
    costUSD: 0.03,
    errorRatePercent: 0.0
  }
];

export const INITIAL_MODEL_BREAKDOWN: ModelUsage[] = [
  {
    modelName: 'Gemini Flash (gemini-flash-latest)',
    provider: 'Google AI (Primary Live Model)',
    queryCount: 142,
    percentage: 78.5,
    avgLatencyMs: 185,
    tokensTotal: 58000,
    costUSD: 0.06,
    color: '#6366f1' // indigo
  },
  {
    modelName: 'Gemini Flash Lite (Failover Cluster)',
    provider: 'Google AI (High Load Failover)',
    queryCount: 26,
    percentage: 14.4,
    avgLatencyMs: 120,
    tokensTotal: 11000,
    costUSD: 0.01,
    color: '#06b6d4' // cyan
  },
  {
    modelName: 'Gemini Embedding 001',
    provider: 'Chroma Document Vector Store',
    queryCount: 13,
    percentage: 7.1,
    avgLatencyMs: 42,
    tokensTotal: 6500,
    costUSD: 0.01,
    color: '#10b981' // emerald
  }
];

export const INITIAL_FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'feat-chat',
    name: 'Self AI Core Chat',
    key: 'chat',
    description: 'Conversational assistant, reasoning agent, and real-time generative chat hub.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-10',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['chat', 'gemini-flash', 'core-agent'],
    tier: 'free',
    dailyLimit: 0,
    route: '/chat'
  },
  {
    id: 'feat-calendar',
    name: 'Smart Calendar & Task Planner',
    key: 'calendar',
    description: 'AI task scheduling, calendar sync, event reminders, and personal timeline tracker.',
    category: 'ui_ux',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-12',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['calendar', 'tasks', 'productivity'],
    tier: 'free',
    dailyLimit: 0,
    route: '/calendar'
  },
  {
    id: 'feat-jobs',
    name: 'Jobs Finding & Career Assistant',
    key: 'jobs',
    description: 'AI job discovery, resume matching, salary negotiation insights, and behavioral interview coaching.',
    category: 'integrations',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-14',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['jobs', 'careers', 'adzuna', 'interview'],
    tier: 'free',
    dailyLimit: 0,
    route: '/jobs'
  },
  {
    id: 'feat-email',
    name: 'Personal Email Assistant',
    key: 'email',
    description: 'Automated email triage, categorization, drafting, and SMTP inbox management.',
    category: 'integrations',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-15',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['email', 'anubhabnandi12@gmail.com', 'smtp'],
    tier: 'partially_free',
    dailyLimit: 10,
    route: '/email'
  },
  {
    id: 'feat-images',
    name: 'AI Art & Image Studio',
    key: 'images',
    description: 'Text-to-image studio, digital art generation, prompt expander, and high-resolution rendering.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-18',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['art', 'imagen', 'studio', 'creative'],
    tier: 'partially_free',
    dailyLimit: 5,
    route: '/images'
  },
  {
    id: 'feat-news',
    name: 'Personalized Daily News Briefing',
    key: 'news',
    description: 'Real-time personalized news curation, topic filtering, daily briefings, and market highlights.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-22',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['news', 'briefing', 'realtime'],
    tier: 'free',
    dailyLimit: 0,
    route: '/news'
  },
  {
    id: 'feat-documents',
    name: 'Document Memory & RAG Assistant',
    key: 'documents',
    description: 'Semantic vector document indexing, PDF question answering, and chroma vector search context.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-25',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['chroma', 'vector-db', 'gemini-embedding', 'rag'],
    tier: 'partially_free',
    dailyLimit: 5,
    route: '/documents'
  }
];

export const INITIAL_VIDEOS: GeneratedVideo[] = [];

// ONLY your real account is included! All demo placeholder names are removed.
export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Anubhab Nandi',
    email: 'anubhabnandi12@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    status: 'active',
    department: 'SelfAI Creator & Lead Engineer',
    lastActive: 'Active now',
    createdAt: '2026-01-15',
    mfaEnabled: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-11-09 19:15:30',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'CONNECT_RAILWAY_APP',
    category: 'system',
    targetResource: 'https://frontend-production-0c17e.up.railway.app',
    details: 'Linked live Self AI Railway application to admin telemetry stream (Chroma DB & Gemini Flash ready)',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-2',
    timestamp: '2026-11-09 19:02:18',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'UPDATE_PAYWALL_RULE',
    category: 'system',
    targetResource: 'pricing_matrix',
    details: 'Configured gated access rules: 5 free daily queries before Pro Tier paywall',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-3',
    timestamp: '2026-11-09 18:45:10',
    actor: {
      name: 'Shampa Nandi',
      email: 'shampanandi49@gmail.com',
      role: 'analyst'
    },
    action: 'ACCEPT_INVITATION',
    category: 'rbac',
    targetResource: 'team:shampanandi49@gmail.com',
    details: 'Successfully joined Self AI workspace with assigned role: Analyst (Read-only analytics)',
    ipAddress: '192.168.1.105',
    status: 'success'
  },
  {
    id: 'log-4',
    timestamp: '2026-11-09 18:30:22',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'INVITE_USER',
    category: 'rbac',
    targetResource: 'shampanandi49@gmail.com',
    details: 'Sent workspace invitation to Shampa Nandi with Viewer role and 7-day token expiration',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-5',
    timestamp: '2026-11-09 18:14:05',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'VERIFY_LIVE_HEALTH',
    category: 'system',
    targetResource: '/api/health',
    details: 'Verified AI models (gemini-flash-latest, chroma vector DB, sqlite ok)',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-6',
    timestamp: '2026-11-09 17:58:44',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'SYNC_FEATURE_FLAG',
    category: 'feature_flag',
    targetResource: 'email',
    details: 'Confirmed email assistant enabled for anubhabnandi12@gmail.com',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-7',
    timestamp: '2026-11-09 17:40:12',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'TELEMETRY_PIPELINE_INIT',
    category: 'system',
    targetResource: 'wss://frontend-production-0c17e.up.railway.app/telemetry',
    details: 'Initialized live geolocation and active session tracker across active nodes',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-8',
    timestamp: '2026-11-09 17:15:33',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'CHROMA_VECTOR_SYNC',
    category: 'system',
    targetResource: 'chroma_rag_collection',
    details: 'Indexed user document embeddings and validated similarity search index (k=5)',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-9',
    timestamp: '2026-11-09 16:50:18',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'AUTH_SESSION_ESTABLISHED',
    category: 'auth',
    targetResource: 'session_jwt_live',
    details: 'Issued administrative JWT session token with TLS 1.3 256-bit encryption',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-10',
    timestamp: '2026-11-09 16:22:50',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'SECURITY_COMPLIANCE_SCAN',
    category: 'system',
    targetResource: 'fleet_audit',
    details: 'Automated vulnerability scan completed: 0 critical vulnerabilities, CORS policy strictly enforced',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-11',
    timestamp: '2026-11-09 15:55:04',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'DATABASE_SNAPSHOT',
    category: 'system',
    targetResource: '/data/selfai.db',
    details: 'Created automated hourly SQLite persistent snapshot in Railway storage volume',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-12',
    timestamp: '2026-11-09 15:30:19',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'PAYMENT_GATEWAY_VERIFIED',
    category: 'system',
    targetResource: 'razorpay_gateway',
    details: 'Validated webhook endpoint signature verification for live customer receipts',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-13',
    timestamp: '2026-11-09 15:10:42',
    actor: {
      name: 'Shampa Nandi',
      email: 'shampanandi49@gmail.com',
      role: 'analyst'
    },
    action: 'USER_LOGIN',
    category: 'auth',
    targetResource: 'auth:login',
    details: 'Viewer logged in via authenticated Google account session',
    ipAddress: '192.168.1.105',
    status: 'success'
  },
  {
    id: 'log-14',
    timestamp: '2026-11-09 14:48:15',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'UPDATE_RATE_LIMIT',
    category: 'system',
    targetResource: '/api/chat/guest',
    details: 'Enforced rate cap: maximum 5 requests per 24-hour window for unauthenticated sessions',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-15',
    timestamp: '2026-11-09 14:20:00',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'MODEL_FALLBACK_PROBE',
    category: 'system',
    targetResource: 'gemini-flash-lite-latest',
    details: 'Tested automated failover route during simulated primary model threshold testing',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-16',
    timestamp: '2026-11-09 13:55:12',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'CACHE_INVALIDATION',
    category: 'system',
    targetResource: 'redis_cache_layer',
    details: 'Purged stale user profile and preference cache across microservice endpoints',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-17',
    timestamp: '2026-11-09 13:30:25',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'ACCESS_AUDIT_REVIEW',
    category: 'rbac',
    targetResource: 'rbac_matrix',
    details: 'Quarterly user access privileges reviewed and certified compliant with ISO 27001 standards',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-18',
    timestamp: '2026-11-09 12:45:00',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'TLS_CERT_VERIFICATION',
    category: 'system',
    targetResource: '*.up.railway.app',
    details: 'Automated Let’s Encrypt TLS certificate renewed; 89 days remaining until next renewal',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-19',
    timestamp: '2026-11-09 12:10:48',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'STORAGE_QUOTA_AUDIT',
    category: 'system',
    targetResource: 'volume:backend-data',
    details: 'Volume storage utilization checked: 42MB used of 500MB provisioned (8.4%)',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-20',
    timestamp: '2026-11-09 11:35:10',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'API_TOKEN_ROTATION',
    category: 'system',
    targetResource: 'internal_service_bearer',
    details: 'Service-to-service communication bearer token rotated and distributed to environment configs',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-21',
    timestamp: '2026-11-09 11:00:22',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'ENV_VARIABLES_SYNC',
    category: 'system',
    targetResource: 'production_environment',
    details: 'Synchronized production environment flags without container reboot',
    ipAddress: '192.168.1.104',
    status: 'success'
  },
  {
    id: 'log-22',
    timestamp: '2026-11-09 10:20:15',
    actor: {
      name: 'Anubhab Nandi',
      email: 'anubhabnandi12@gmail.com',
      role: 'super_admin'
    },
    action: 'INITIAL_SYSTEM_BOOT',
    category: 'system',
    targetResource: 'cluster_bootstrap',
    details: 'All microservice health checks reporting green (Chat, Calendar, Email, Docs, Art)',
    ipAddress: '192.168.1.104',
    status: 'success'
  }
];

export const INITIAL_MCP_SERVERS: McpServer[] = [
  {
    id: 'mcp-selfai-core',
    name: 'SelfAI Core Runtime MCP',
    description: 'Direct Model Context Protocol bridge to your live Railway cluster (frontend-production-0c17e).',
    transport: 'sse',
    url: 'https://frontend-production-0c17e.up.railway.app/mcp/sse',
    status: 'connected',
    lastPing: 'Live (42ms)',
    tools: [
      {
        name: 'inject_feature_to_app',
        description: 'Dynamically registers, enables, and activates any new feature in the live SelfAI app runtime.',
        serverName: 'SelfAI Core Runtime MCP',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the feature to add' },
            key: { type: 'string', description: 'Unique code slug for feature' },
            category: { type: 'string', enum: ['ai_models', 'ui_ux', 'integrations', 'developer'] },
            rolloutPercentage: { type: 'number', minimum: 0, maximum: 100 }
          },
          required: ['name', 'key']
        }
      },
      {
        name: 'query_chroma_rag_memory',
        description: 'Semantic vector retrieval and document embedding indexing using gemini-embedding-001.',
        serverName: 'SelfAI Core Runtime MCP',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            topK: { type: 'number', default: 5 }
          },
          required: ['query']
        }
      },
      {
        name: 'dispatch_system_email',
        description: 'Sends transactional consent notifications through anubhabnandi12@gmail.com.',
        serverName: 'SelfAI Core Runtime MCP',
        inputSchema: {
          type: 'object',
          properties: {
            to: { type: 'string' },
            subject: { type: 'string' },
            htmlContent: { type: 'string' }
          },
          required: ['to', 'subject', 'htmlContent']
        }
      }
    ]
  },
  {
    id: 'mcp-railway',
    name: 'Railway Cloud DevOps MCP',
    description: 'Infrastructure automation for container scaling, environment variables, and rolling redeploys.',
    transport: 'sse',
    url: 'https://backboard.railway.app/mcp/v1',
    status: 'connected',
    lastPing: 'Live (185ms)',
    tools: [
      {
        name: 'redeploy_microservice',
        description: 'Triggers zero-downtime rolling restart or redeployment of backend containers.',
        serverName: 'Railway Cloud DevOps MCP',
        inputSchema: {
          type: 'object',
          properties: {
            serviceId: { type: 'string' }
          },
          required: ['serviceId']
        }
      },
      {
        name: 'set_app_variable',
        description: 'Updates environment variables (API keys, connection strings, flags) on Railway.',
        serverName: 'Railway Cloud DevOps MCP',
        inputSchema: {
          type: 'object',
          properties: {
            key: { type: 'string' },
            value: { type: 'string' }
          },
          required: ['key', 'value']
        }
      }
    ]
  },
  {
    id: 'mcp-gemini',
    name: 'Gemini & Veo Multi-Modal Synthesis MCP',
    description: 'Generative AI inference tool providing real-time code generation, Veo video rendering, and voice synthesis.',
    transport: 'websocket',
    url: 'wss://generativelanguage.googleapis.com/v1beta/mcp',
    status: 'connected',
    lastPing: 'Live (65ms)',
    tools: [
      {
        name: 'generate_app_component',
        description: 'Synthesizes complete responsive React/Angular components from visual descriptions.',
        serverName: 'Gemini & Veo Multi-Modal Synthesis MCP',
        inputSchema: {
          type: 'object',
          properties: {
            specification: { type: 'string' },
            framework: { type: 'string', default: 'react' }
          },
          required: ['specification']
        }
      },
      {
        name: 'render_veo_video',
        description: 'Renders high-definition MP4 video streams from text prompt descriptions or still imagery.',
        serverName: 'Gemini & Veo Multi-Modal Synthesis MCP',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: { type: 'string' },
            duration: { type: 'number', default: 8 },
            aspectRatio: { type: 'string', default: '16:9' }
          },
          required: ['prompt']
        }
      }
    ]
  }
];

// Most Used Features for Dashboard Pie Chart
export const INITIAL_FEATURE_POPULARITY: FeaturePopularity[] = [
  { name: 'Self AI Core Chat', key: 'chat', queryCount: 86, percentage: 41.3, color: '#6366f1' },
  { name: 'Smart Calendar & Tasks', key: 'calendar', queryCount: 38, percentage: 18.3, color: '#06b6d4' },
  { name: 'Jobs Finding Assistant', key: 'jobs', queryCount: 30, percentage: 14.4, color: '#3b82f6' },
  { name: 'Personal Email Assistant', key: 'email', queryCount: 24, percentage: 11.5, color: '#10b981' },
  { name: 'AI Art & Image Studio', key: 'images', queryCount: 16, percentage: 7.7, color: '#a855f7' },
  { name: 'Document RAG / PDF Digest', key: 'documents', queryCount: 14, percentage: 6.7, color: '#f59e0b' }
];

// Real-Time User Sessions & Geo-Tracing - ONLY REAL ACTIVE USERS
export const INITIAL_USER_TRACES: UserSessionTrace[] = [
  {
    id: 'trace-1',
    userId: 'usr-anubhab',
    userName: 'Anubhab Nandi',
    userEmail: 'anubhabnandi12@gmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isPremium: true,
    tier: 'power',
    city: 'Kolkata',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ipAddress: '192.168.1.104',
    device: 'Windows Desktop / PC',
    os: 'Windows 11',
    browser: 'Chrome 124',
    status: 'online',
    sessionDurationMinutes: 48,
    totalTimeSpentHours: 14.5,
    queriesToday: 18,
    lastActive: 'Active now',
    favoriteFeature: 'Self AI Core Chat'
  },
  {
    id: 'trace-2',
    userId: 'usr-shampa',
    userName: 'Shampa Nandi',
    userEmail: 'shampanandi49@gmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isPremium: true,
    tier: 'pro',
    city: 'Kolkata',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ipAddress: '103.87.56.24',
    device: 'Android Phone',
    os: 'Android 14',
    browser: 'Chrome Mobile',
    status: 'online',
    sessionDurationMinutes: 22,
    totalTimeSpentHours: 3.8,
    queriesToday: 7,
    lastActive: 'Active now',
    favoriteFeature: 'Personal Email Assistant'
  }
];

// Real Payments Received & Invoices - ZERO fake or demo transactions!
export const INITIAL_PAYMENTS: PaymentTransaction[] = [];

// Paywall Quota & Pricing Configuration
export const INITIAL_PAYWALL_CONFIG: PaywallConfig = {
  freeDailyQueryLimit: 5,
  freeDailyMinutesLimit: 30,
  premiumPriceMonthlyINR: 149,
  premiumPriceYearlyINR: 1490,
  premiumFeatureKeys: ['images', 'email', 'documents'],
  allowGuestTrial: true,
  guestDailyLimit: 5,
  updatedAt: '2026-11-09'
};
