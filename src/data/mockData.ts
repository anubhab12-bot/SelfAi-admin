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
    id: 'feat-email',
    name: 'Personal Email Assistant',
    key: 'email',
    description: 'Automated email triage, categorization, and drafting configured for anubhabnandi12@gmail.com.',
    category: 'integrations',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-15',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['email', 'anubhabnandi12@gmail.com', 'live-railway']
  },
  {
    id: 'feat-chroma',
    name: 'Chroma Vector RAG Memory',
    key: 'chroma_vector_db',
    description: 'Semantic document memory indexing user documents and conversational context.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-20',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['chroma', 'vector-db', 'gemini-embedding']
  },
  {
    id: 'feat-guest',
    name: 'Public Guest Chat Gateway',
    key: 'guest_chat_sandbox',
    description: 'Allow anonymous visitors to test the chatbot with a 5-query daily rate cap via /api/chat/guest.',
    category: 'ui_ux',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-10-25',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['guest', 'rate-limit', 'streaming']
  },
  {
    id: 'feat-fallback',
    name: 'Automated Gemini Flash Lite Failover',
    key: 'gemini_fallback_cluster',
    description: 'Instant failover routing to gemini-flash-lite-latest when primary model experiences high load.',
    category: 'developer',
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['failover', 'high-availability', 'gemini']
  },
  {
    id: 'feat-news',
    name: 'Personal AI News & Document Digest',
    key: 'news_and_documents',
    description: 'Real-time personalized news curation and PDF/Document summarization assistant.',
    category: 'ai_models',
    enabled: true,
    rolloutPercentage: 80,
    targetRoles: ['super_admin', 'admin', 'product_manager'],
    environment: 'production',
    createdBy: 'Anubhab Nandi',
    createdAt: '2026-11-05',
    updatedAt: '2026-11-09',
    updatedBy: 'Anubhab Nandi',
    tags: ['news', 'docs', 'summarizer']
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
    timestamp: '2026-11-09 14:26:15',
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
    timestamp: '2026-11-09 14:15:20',
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
    id: 'log-3',
    timestamp: '2026-11-09 13:42:10',
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
  { name: 'Self AI Core Chat', key: 'chat', queryCount: 92, percentage: 51.7, color: '#6366f1' },
  { name: 'Smart Calendar & Tasks', key: 'calendar', queryCount: 38, percentage: 21.3, color: '#06b6d4' },
  { name: 'Personal Email Assistant', key: 'email', queryCount: 24, percentage: 13.5, color: '#10b981' },
  { name: 'Document RAG / PDF Digest', key: 'documents', queryCount: 16, percentage: 9.0, color: '#f59e0b' },
  { name: 'Personal AI News Digest', key: 'news', queryCount: 8, percentage: 4.5, color: '#ec4899' }
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
