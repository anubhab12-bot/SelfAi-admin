import { FeatureFlag, User, ServiceHealth, DailyUsage, ModelUsage, AuditLogItem } from '../types';

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
