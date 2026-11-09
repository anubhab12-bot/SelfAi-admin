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
    activeUsers: 3420,
    queriesCount: 48920,
    promptTokens: 18450000,
    completionTokens: 11200000,
    totalTokens: 29650000,
    avgLatencyMs: 220,
    costUSD: 41.30,
    errorRatePercent: 0.08
  },
  {
    date: '2026-11-04',
    dayName: 'Tue',
    activeUsers: 3890,
    queriesCount: 56210,
    promptTokens: 21900000,
    completionTokens: 13400000,
    totalTokens: 35300000,
    avgLatencyMs: 205,
    costUSD: 49.60,
    errorRatePercent: 0.05
  },
  {
    date: '2026-11-05',
    dayName: 'Wed',
    activeUsers: 4120,
    queriesCount: 62450,
    promptTokens: 24800000,
    completionTokens: 14900000,
    totalTokens: 39700000,
    avgLatencyMs: 230,
    costUSD: 55.40,
    errorRatePercent: 0.11
  },
  {
    date: '2026-11-06',
    dayName: 'Thu',
    activeUsers: 4350,
    queriesCount: 68100,
    promptTokens: 27100000,
    completionTokens: 16800000,
    totalTokens: 43900000,
    avgLatencyMs: 210,
    costUSD: 61.80,
    errorRatePercent: 0.06
  },
  {
    date: '2026-11-07',
    dayName: 'Fri',
    activeUsers: 4580,
    queriesCount: 74200,
    promptTokens: 29500000,
    completionTokens: 18400000,
    totalTokens: 47900000,
    avgLatencyMs: 240,
    costUSD: 67.80,
    errorRatePercent: 0.12
  },
  {
    date: '2026-11-08',
    dayName: 'Sat',
    activeUsers: 2890,
    queriesCount: 39800,
    promptTokens: 15300000,
    completionTokens: 9600000,
    totalTokens: 24900000,
    avgLatencyMs: 195,
    costUSD: 35.80,
    errorRatePercent: 0.04
  },
  {
    date: '2026-11-09',
    dayName: 'Sun (Today)',
    activeUsers: 3150,
    queriesCount: 44300,
    promptTokens: 17200000,
    completionTokens: 10800000,
    totalTokens: 28000000,
    avgLatencyMs: 185,
    costUSD: 39.00,
    errorRatePercent: 0.03
  }
];

export const INITIAL_MODEL_BREAKDOWN: ModelUsage[] = [
  {
    modelName: 'Gemini Flash Latest (Primary)',
    provider: 'Google AI (Railway Engine)',
    queryCount: 214500,
    percentage: 54.4,
    avgLatencyMs: 185,
    tokensTotal: 135000000,
    costUSD: 148.50,
    color: '#6366f1' // indigo
  },
  {
    modelName: 'Gemini 2.5 Flash Lite (Fallback)',
    provider: 'Google AI (Failover Cluster)',
    queryCount: 98400,
    percentage: 25.0,
    avgLatencyMs: 120,
    tokensTotal: 62000000,
    costUSD: 49.60,
    color: '#06b6d4' // cyan
  },
  {
    modelName: 'Gemini Embedding 001',
    provider: 'Chroma RAG Vector Store',
    queryCount: 52100,
    percentage: 13.2,
    avgLatencyMs: 38,
    tokensTotal: 34200000,
    costUSD: 27.30,
    color: '#10b981' // emerald
  },
  {
    modelName: 'Ollama Local Host',
    provider: 'Self-Hosted Ollama',
    queryCount: 29000,
    percentage: 7.4,
    avgLatencyMs: 95,
    tokensTotal: 18100000,
    costUSD: 14.50,
    color: '#f59e0b' // amber
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

export const INITIAL_VIDEOS: GeneratedVideo[] = [
  {
    id: 'vid-1',
    title: 'Futuristic Cyberpunk Metropolis in Rain',
    type: 'text_to_video',
    prompt: 'Cinematic hyperlapse of neon glowing cyberpunk skyscrapers, flying vehicles, rainy night reflections, 8k resolution, photorealistic.',
    videoUrl: './cyberpunk-metropolis.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    durationSeconds: 8,
    modelName: 'Google Veo 2 (Gemini Video Synthesis)',
    createdAt: '10 mins ago',
    status: 'completed'
  },
  {
    id: 'vid-2',
    title: 'Celestial Nebula & Cosmic Voyage',
    type: 'text_to_video',
    prompt: 'Slow cinematic dolly zoom through a glowing purple and turquoise cosmic nebula with orbiting starlight particles and distant galaxy.',
    videoUrl: './selfai-generated-video.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    durationSeconds: 10,
    modelName: 'Google Veo 2 Ultra',
    createdAt: '45 mins ago',
    status: 'completed'
  },
  {
    id: 'vid-3',
    title: 'Mountain Lake Sunrise Drone Glide',
    type: 'image_to_video',
    prompt: 'Dynamic camera pan forward across misty alpine lake with reflection of snowcapped peaks at golden hour.',
    sourceImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    videoUrl: './alpine-lake.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    durationSeconds: 6,
    modelName: 'Stable Video Diffusion (SVD-XT)',
    createdAt: '2 hours ago',
    status: 'completed'
  }
];

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
  {
    name: 'AI Chat & Copilot',
    key: 'chat',
    queryCount: 168400,
    percentage: 46.2,
    color: '#6366f1' // Indigo
  },
  {
    name: 'Calendar & Tasks',
    key: 'calendar',
    queryCount: 76500,
    percentage: 21.0,
    color: '#10b981' // Emerald
  },
  {
    name: 'AI Art & FLUX Studio',
    key: 'images',
    queryCount: 54700,
    percentage: 15.0,
    color: '#f59e0b' // Amber
  },
  {
    name: 'Email Assistant',
    key: 'email',
    queryCount: 38200,
    percentage: 10.5,
    color: '#06b6d4' // Cyan
  },
  {
    name: 'Docs & News Digest',
    key: 'documents',
    queryCount: 26500,
    percentage: 7.3,
    color: '#a855f7' // Purple
  }
];

// Real-Time User Sessions & Geo-Tracing
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
    ipAddress: '103.212.144.18',
    device: 'Windows Desktop',
    os: 'Windows 11',
    browser: 'Chrome 124',
    status: 'online',
    sessionDurationMinutes: 68,
    totalTimeSpentHours: 42.5,
    queriesToday: 34,
    lastActive: 'Active now',
    favoriteFeature: 'AI Chat & Copilot'
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
    ipAddress: '103.212.144.25',
    device: 'Samsung Galaxy S24',
    os: 'Android 14',
    browser: 'Chrome Mobile',
    status: 'online',
    sessionDurationMinutes: 32,
    totalTimeSpentHours: 18.2,
    queriesToday: 19,
    lastActive: '2m ago',
    favoriteFeature: 'Email Assistant'
  },
  {
    id: 'trace-3',
    userId: 'usr-anirban',
    userName: 'Anirban Mukherjee',
    userEmail: 'manirban0202@gmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isPremium: true,
    tier: 'pro',
    city: 'Bengaluru',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ipAddress: '49.207.218.91',
    device: 'MacBook Air M2',
    os: 'macOS Sonoma',
    browser: 'Safari 17.4',
    status: 'idle',
    sessionDurationMinutes: 85,
    totalTimeSpentHours: 31.0,
    queriesToday: 42,
    lastActive: '14m ago',
    favoriteFeature: 'AI Art & FLUX Studio'
  },
  {
    id: 'trace-4',
    userId: 'usr-rohit',
    userName: 'Rohit Sharma',
    userEmail: 'rohit.tech@gmail.com',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isPremium: false,
    tier: 'free',
    city: 'Mumbai',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ipAddress: '182.74.88.102',
    device: 'Dell XPS Laptop',
    os: 'Windows 10',
    browser: 'Edge 123',
    status: 'online',
    sessionDurationMinutes: 24,
    totalTimeSpentHours: 8.4,
    queriesToday: 5,
    lastActive: 'Active now',
    favoriteFeature: 'AI Chat & Copilot'
  },
  {
    id: 'trace-5',
    userId: 'usr-alex',
    userName: 'Alex Montgomery',
    userEmail: 'alex.m@aurora-labs.io',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isPremium: true,
    tier: 'pro',
    city: 'San Francisco',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    ipAddress: '172.56.21.89',
    device: 'iPhone 15 Pro',
    os: 'iOS 17.5',
    browser: 'Mobile Safari',
    status: 'offline',
    sessionDurationMinutes: 55,
    totalTimeSpentHours: 52.8,
    queriesToday: 18,
    lastActive: '1h ago',
    favoriteFeature: 'Docs & News Digest'
  },
  {
    id: 'trace-6',
    userId: 'usr-sophia',
    userName: 'Sophia Müller',
    userEmail: 'sophia.m@berlin-tech.de',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    isPremium: true,
    tier: 'power',
    city: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    ipAddress: '91.132.84.14',
    device: 'Linux Workstation',
    os: 'Ubuntu 22.04',
    browser: 'Firefox 125',
    status: 'online',
    sessionDurationMinutes: 110,
    totalTimeSpentHours: 64.0,
    queriesToday: 49,
    lastActive: 'Active now',
    favoriteFeature: 'AI Chat & Copilot'
  },
  {
    id: 'trace-7',
    userId: 'usr-priya',
    userName: 'Priya Sen',
    userEmail: 'priya.sen@outlook.in',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isPremium: false,
    tier: 'free',
    city: 'New Delhi',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    ipAddress: '115.240.90.17',
    device: 'MacBook Pro',
    os: 'macOS Ventura',
    browser: 'Chrome 124',
    status: 'offline',
    sessionDurationMinutes: 18,
    totalTimeSpentHours: 4.2,
    queriesToday: 4,
    lastActive: '3h ago',
    favoriteFeature: 'Calendar & Tasks'
  }
];

// Payments Received & Invoices
export const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'tx-101',
    transactionRef: 'pay_OM92kL18x9',
    customerName: 'Anubhab Nandi',
    customerEmail: 'anubhabnandi12@gmail.com',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    planName: 'Self AI Power Tier (Annual)',
    tier: 'power',
    amount: 1490,
    currency: 'INR',
    billingCycle: 'yearly',
    paymentMethod: 'UPI / Direct NetBanking',
    status: 'paid',
    date: '2026-11-08',
    invoiceId: 'INV-2026-0084'
  },
  {
    id: 'tx-102',
    transactionRef: 'pay_LK83pQ21y4',
    customerName: 'Shampa Nandi',
    customerEmail: 'shampanandi49@gmail.com',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    planName: 'Self AI Pro Tier (Monthly)',
    tier: 'pro',
    amount: 149,
    currency: 'INR',
    billingCycle: 'monthly',
    paymentMethod: 'UPI / GPay (shampanandi49@okhdfc)',
    status: 'paid',
    date: '2026-11-09',
    invoiceId: 'INV-2026-0085'
  },
  {
    id: 'tx-103',
    transactionRef: 'pay_RT94bN55z1',
    customerName: 'Anirban Mukherjee',
    customerEmail: 'manirban0202@gmail.com',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    planName: 'Self AI Pro Tier (Monthly)',
    tier: 'pro',
    amount: 149,
    currency: 'INR',
    billingCycle: 'monthly',
    paymentMethod: 'Credit Card (Axis Bank Visa)',
    status: 'paid',
    date: '2026-11-09',
    invoiceId: 'INV-2026-0086'
  },
  {
    id: 'tx-104',
    transactionRef: 'pay_US82aM99x2',
    customerName: 'Alex Montgomery',
    customerEmail: 'alex.m@aurora-labs.io',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    planName: 'Self AI Pro Tier (Monthly)',
    tier: 'pro',
    amount: 149,
    currency: 'INR',
    billingCycle: 'monthly',
    paymentMethod: 'International Card (Stripe)',
    status: 'paid',
    date: '2026-11-07',
    invoiceId: 'INV-2026-0082'
  },
  {
    id: 'tx-105',
    transactionRef: 'pay_DE44xL11q8',
    customerName: 'Sophia Müller',
    customerEmail: 'sophia.m@berlin-tech.de',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    planName: 'Self AI Power Tier (Annual)',
    tier: 'power',
    amount: 1490,
    currency: 'INR',
    billingCycle: 'yearly',
    paymentMethod: 'SEPA Direct Debit',
    status: 'paid',
    date: '2026-11-06',
    invoiceId: 'INV-2026-0081'
  }
];

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
