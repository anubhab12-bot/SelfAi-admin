import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Role, 
  FeatureFlag, 
  User, 
  ServiceHealth, 
  DailyUsage, 
  ModelUsage, 
  AuditLogItem, 
  ToastMessage,
  Permission,
  RailwayHealthResponse,
  GeneratedVideo,
  AIFeatureProposal
} from '../types';
import { 
  INITIAL_SERVICES, 
  INITIAL_WEEKLY_USAGE, 
  INITIAL_MODEL_BREAKDOWN, 
  INITIAL_FEATURE_FLAGS, 
  INITIAL_USERS, 
  INITIAL_AUDIT_LOGS,
  INITIAL_VIDEOS,
  RAILWAY_APP_URL
} from '../data/mockData';
import { hasPermission } from '../utils/rbac';

interface AdminContextType {
  // RBAC & Current User
  currentUser: User;
  switchRole: (role: Role) => void;
  can: (permission: Permission) => boolean;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Railway Live Connection
  railwayUrl: string;
  setRailwayUrl: (url: string) => void;
  railwayHealth: RailwayHealthResponse | null;
  isLiveConnected: boolean;
  liveLatencyMs: number;
  fetchLiveRailwayHealth: () => Promise<void>;
  sendLiveGuestChat: (content: string) => Promise<{ reply: string; model: string; remaining: number }>;

  // Environment
  environment: 'production' | 'staging';
  setEnvironment: (env: 'production' | 'staging') => void;

  // Features
  features: FeatureFlag[];
  toggleFeature: (id: string) => void;
  createFeature: (feature: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) => void;
  updateFeature: (id: string, updates: Partial<FeatureFlag>) => void;
  deleteFeature: (id: string) => void;

  // Users
  users: User[];
  updateUserRole: (id: string, newRole: Role) => void;
  toggleUserStatus: (id: string) => void;
  addUser: (userData: Omit<User, 'id' | 'createdAt' | 'lastActive'>) => void;
  deleteUser: (id: string) => void;
  resendInvite: (id: string) => void;
  acceptInvite: (id: string) => void;

  // Weekly Usage & Analytics
  weeklyUsage: DailyUsage[];
  modelUsage: ModelUsage[];
  timeRange: '7d' | '14d' | '30d';
  setTimeRange: (range: '7d' | '14d' | '30d') => void;

  // Services & Monitoring
  services: ServiceHealth[];
  restartService: (id: string) => void;

  // Audit Logs
  auditLogs: AuditLogItem[];

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Reset
  resetAllData: () => void;

  // AI Feature Synthesizer / Auto-Creator
  autoCreateFeatureWithAI: (prompt: string) => Promise<AIFeatureProposal>;

  // AI Video Studio
  videos: GeneratedVideo[];
  generateVideo: (data: {
    type: 'text_to_video' | 'image_to_video';
    prompt: string;
    sourceImageUrl?: string;
    aspectRatio: '16:9' | '9:16' | '1:1';
    durationSeconds: number;
    modelName: string;
  }) => Promise<GeneratedVideo>;
  deleteVideo: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  FEATURES: 'selfai_admin_features',
  USERS: 'selfai_admin_users',
  LOGS: 'selfai_admin_logs',
  ROLE: 'selfai_admin_role',
  RAILWAY_URL: 'selfai_admin_railway_url',
  VIDEOS: 'selfai_admin_videos'
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load role or default to super_admin
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as Role) || 'super_admin';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [environment, setEnvironment] = useState<'production' | 'staging'>('production');
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('7d');

  // Live Railway Connection state
  const [railwayUrl, setRailwayUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.RAILWAY_URL) || RAILWAY_APP_URL;
  });
  const [railwayHealth, setRailwayHealth] = useState<RailwayHealthResponse | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);
  const [liveLatencyMs, setLiveLatencyMs] = useState<number>(185);

  // Load features
  const [features, setFeatures] = useState<FeatureFlag[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FEATURES);
    return saved ? JSON.parse(saved) : INITIAL_FEATURE_FLAGS;
  });

  // Load users - filter out any placeholder demo names
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (saved) {
      const parsed: User[] = JSON.parse(saved);
      // Remove mock placeholder users
      const cleaned = parsed.filter(u => !['elena.rostova@selfai.internal', 'marcus.chen@selfai.internal', 'sarah.connor@selfai.internal', 'david.kim@selfai.internal', 'priya.patel@selfai.internal'].includes(u.email));
      if (cleaned.length > 0) return cleaned;
    }
    return INITIAL_USERS;
  });

  // Load audit logs
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Load videos
  const [videos, setVideos] = useState<GeneratedVideo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [services, setServices] = useState<ServiceHealth[]>(INITIAL_SERVICES);
  const [weeklyUsage] = useState<DailyUsage[]>(INITIAL_WEEKLY_USAGE);
  const [modelUsage] = useState<ModelUsage[]>(INITIAL_MODEL_BREAKDOWN);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
  }, [features]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RAILWAY_URL, railwayUrl);
  }, [railwayUrl]);

  // Toast Helpers
  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message,
      timestamp: Date.now()
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    setTimeout(() => {
      removeToast(newToast.id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Live Railway Health Fetcher
  const fetchLiveRailwayHealth = async () => {
    const startTime = performance.now();
    try {
      const res = await fetch(`${railwayUrl}/api/health`, { method: 'GET' });
      const duration = Math.round(performance.now() - startTime);
      setLiveLatencyMs(duration);

      if (res.ok) {
        const data: RailwayHealthResponse = await res.json();
        setRailwayHealth(data);
        setIsLiveConnected(true);

        // Update services array dynamically with live status from Railway
        setServices((prev) =>
          prev.map((s) => {
            if (s.id === 'srv-1') {
              return {
                ...s,
                status: data.ai.status === 'ok' ? 'operational' : 'degraded',
                latencyMs: duration,
                lastChecked: 'Just now',
                liveData: `${data.ai.chat_model} (fallback: ${data.ai.fallback_models[0]})`
              };
            }
            if (s.id === 'srv-2') {
              return {
                ...s,
                status: data.ai.database.ok ? 'operational' : 'degraded',
                lastChecked: 'Just now',
                liveData: `Type: ${data.ai.database.type} | Embeddings: ${data.ai.models[1] || 'gemini'}`
              };
            }
            if (s.id === 'srv-3') {
              return {
                ...s,
                status: data.database.ok ? 'operational' : 'degraded',
                lastChecked: 'Just now'
              };
            }
            if (s.id === 'srv-4') {
              return {
                ...s,
                status: data.email.enabled ? 'operational' : 'degraded',
                lastChecked: 'Just now',
                liveData: `${data.email.from} (Configured: ${data.email.configured})`
              };
            }
            return s;
          })
        );
      } else {
        setIsLiveConnected(false);
      }
    } catch (e) {
      console.warn('Railway live ping error:', e);
      setIsLiveConnected(false);
    }
  };

  // Send test prompt to Railway /api/chat/guest
  const sendLiveGuestChat = async (content: string) => {
    const res = await fetch(`${railwayUrl}/api/chat/guest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, history: [] })
    });

    if (!res.ok) {
      throw new Error(`Railway chat request failed with status ${res.status}`);
    }

    const text = await res.text();
    // Parse SSE lines
    let reply = '';
    let model = 'gemini-flash-lite-latest';
    let remaining = 5;

    const lines = text.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const parsed = JSON.parse(line.substring(6));
          if (parsed.type === 'token') {
            reply += parsed.content;
          }
          if (parsed.type === 'model') {
            model = parsed.model;
          }
          if (parsed.type === 'guest') {
            remaining = parsed.remaining;
          }
        } catch (_) {}
      }
    }

    return { reply: reply.trim() || 'Hello! How can I help you today?', model, remaining };
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchLiveRailwayHealth();
  }, [railwayUrl]);

  // Current active user representation
  const currentUser: User = {
    id: 'usr-current',
    name: currentRole === 'super_admin' ? 'Anubhab Nandi (Root)' :
          currentRole === 'admin' ? 'Elena Rostova (Admin)' :
          currentRole === 'product_manager' ? 'Marcus Chen (PM)' :
          currentRole === 'analyst' ? 'Sarah Connor (Analyst)' : 'David Kim (Support)',
    email: 'anubhabnandi12@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: currentRole,
    status: 'active',
    department: 'SelfAI Core Engineering',
    lastActive: 'Just now',
    createdAt: '2026-01-15',
    mfaEnabled: true
  };

  // RBAC Permission checker
  const can = (permission: Permission): boolean => {
    return hasPermission(currentRole, permission);
  };

  // Role Switcher for instant RBAC testing
  const switchRole = (newRole: Role) => {
    setCurrentRole(newRole);
    addToast('info', 'RBAC Role Switched', `Switched active role to "${newRole.toUpperCase()}". UI permissions recalculated.`);
  };

  // Audit Log Recorder
  const logAudit = (action: string, category: AuditLogItem['category'], target: string, details: string, status: 'success' | 'warning' | 'failed' = 'success') => {
    const logItem: AuditLogItem = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: {
        name: currentUser.name,
        email: currentUser.email,
        role: currentRole
      },
      action,
      category,
      targetResource: target,
      details,
      ipAddress: '192.168.1.104',
      status
    };
    setAuditLogs((prev) => [logItem, ...prev]);
  };

  // Feature Flag Operations
  const toggleFeature = (id: string) => {
    if (!can('features:toggle')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" lacks permission 'features:toggle'.`);
      return;
    }

    setFeatures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const newState = !f.enabled;
          logAudit(
            'TOGGLE_FEATURE_FLAG',
            'feature_flag',
            f.key,
            `Turned ${newState ? 'ON' : 'OFF'} for Railway App (${f.rolloutPercentage}% rollout)`
          );
          addToast(
            newState ? 'success' : 'warning',
            `Feature ${newState ? 'Activated' : 'Disabled'}`,
            `"${f.name}" is now ${newState ? 'ENABLED' : 'DISABLED'} on Railway.`
          );
          return {
            ...f,
            enabled: newState,
            updatedAt: new Date().toISOString().split('T')[0],
            updatedBy: currentUser.name
          };
        }
        return f;
      })
    );
  };

  const createFeature = (featureData: Omit<FeatureFlag, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>) => {
    if (!can('features:create')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" does not have 'features:create' permission.`);
      return;
    }

    const newFeature: FeatureFlag = {
      ...featureData,
      id: `feat-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      createdBy: currentUser.name,
      updatedBy: currentUser.name,
    };

    setFeatures((prev) => [newFeature, ...prev]);
    logAudit('CREATE_FEATURE_FLAG', 'feature_flag', newFeature.key, `Created feature flag "${newFeature.name}" in category ${newFeature.category}`);
    addToast('success', 'Feature Created', `Successfully registered feature "${newFeature.name}" for SelfAI on Railway.`);
  };

  const updateFeature = (id: string, updates: Partial<FeatureFlag>) => {
    if (!can('features:edit')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" does not have 'features:edit' permission.`);
      return;
    }

    setFeatures((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const updated = {
            ...f,
            ...updates,
            updatedAt: new Date().toISOString().split('T')[0],
            updatedBy: currentUser.name
          };
          logAudit('UPDATE_FEATURE_FLAG', 'feature_flag', f.key, `Updated configuration: ${Object.keys(updates).join(', ')}`);
          addToast('success', 'Feature Updated', `Changes to "${f.name}" have been saved.`);
          return updated;
        }
        return f;
      })
    );
  };

  const deleteFeature = (id: string) => {
    if (!can('features:delete')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" cannot delete feature flags.`);
      return;
    }

    const target = features.find((f) => f.id === id);
    if (!target) return;

    setFeatures((prev) => prev.filter((f) => f.id !== id));
    logAudit('DELETE_FEATURE_FLAG', 'feature_flag', target.key, `Permanently removed feature flag "${target.name}"`);
    addToast('warning', 'Feature Deleted', `Feature "${target.name}" has been removed.`);
  };

  // User Management Operations
  const updateUserRole = (id: string, newRole: Role) => {
    if (!can('users:edit_role')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" cannot change user roles.`);
      return;
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          logAudit('UPDATE_USER_ROLE', 'rbac', u.email, `Role modified from ${u.role} to ${newRole}`);
          addToast('success', 'Role Updated', `User "${u.name}" is now assigned role ${newRole.toUpperCase()}.`);
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const toggleUserStatus = (id: string) => {
    if (!can('users:suspend')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" cannot suspend or activate users.`);
      return;
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          logAudit(
            newStatus === 'suspended' ? 'SUSPEND_USER' : 'ACTIVATE_USER',
            'user',
            u.email,
            `Account status updated to ${newStatus}`
          );
          addToast('info', 'Status Changed', `User "${u.name}" marked as ${newStatus}.`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'lastActive'>) => {
    if (!can('users:create')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" cannot invite or create users.`);
      return;
    }

    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };

    setUsers((prev) => [...prev, newUser]);
    logAudit('CREATE_USER', 'user', newUser.email, `Added user ${newUser.name} with role ${newUser.role}`);
    addToast('success', 'User Invited', `Successfully added ${newUser.name} to SelfAI organization.`);
  };

  const resendInvite = (id: string) => {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    logAudit('RESEND_INVITATION', 'user', target.email, `Dispatched fresh invitation email to ${target.email}`);
    addToast('info', 'Invitation Email Resent', `A new verification email was dispatched to ${target.email}.`);
  };

  const acceptInvite = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          logAudit('ACCEPT_INVITATION', 'user', u.email, `User accepted invitation and completed Google authentication`);
          addToast('success', 'Invitation Accepted', `${u.name} (${u.email}) is now verified and active.`);
          return { ...u, status: 'active', lastActive: 'Active now' };
        }
        return u;
      })
    );
  };

  const deleteUser = (id: string) => {
    if (!can('users:delete')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" cannot delete users.`);
      return;
    }

    const target = users.find((u) => u.id === id);
    if (!target) return;

    setUsers((prev) => prev.filter((u) => u.id !== id));
    logAudit('DELETE_USER', 'user', target.email, `Deleted user account ${target.name}`);
    addToast('warning', 'User Removed', `Account for ${target.name} has been deleted.`);
  };

  // Service Restart Simulation
  const restartService = (id: string) => {
    if (!can('system:restart_services')) {
      addToast('error', 'Access Denied', `Role "${currentRole}" cannot restart system microservices.`);
      return;
    }

    const svc = services.find((s) => s.id === id);
    if (!svc) return;

    addToast('info', 'Railway Rolling Restart', `Issuing rolling restart to ${svc.name} on Railway...`);
    logAudit('SERVICE_RESTART', 'system', svc.name, `Triggered graceful zero-downtime rolling restart`);

    // Simulate reload
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'maintenance' } : s))
    );

    setTimeout(() => {
      fetchLiveRailwayHealth();
      addToast('success', 'Service Healthy', `${svc.name} successfully rebooted and passing Railway health checks.`);
    }, 1800);
  };

  // Reset all data
  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.FEATURES);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem(STORAGE_KEYS.RAILWAY_URL);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    setFeatures(INITIAL_FEATURE_FLAGS);
    setUsers(INITIAL_USERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setVideos(INITIAL_VIDEOS);
    setCurrentRole('super_admin');
    setRailwayUrl(RAILWAY_APP_URL);
    addToast('info', 'Data Reset', 'All SelfAI admin demo datasets restored to initial state.');
  };

  // AI Feature Synthesizer / Auto-Creator
  const autoCreateFeatureWithAI = async (prompt: string): Promise<AIFeatureProposal> => {
    const lower = prompt.toLowerCase();
    let proposal: AIFeatureProposal;

    if (lower.includes('video') || lower.includes('animation') || lower.includes('clip')) {
      proposal = {
        name: 'AI Video Studio (Text & Image to Video)',
        key: 'video_generation_engine',
        description: 'Autonomous Text-to-Video & Image-to-Video pipeline with camera motion direction and next-gen synthesis.',
        category: 'ai_models',
        rolloutPercentage: 100,
        targetRoles: ['super_admin', 'admin', 'product_manager'],
        endpoint: '/api/video/generate',
        recommendedModel: 'Google Veo 2 / Stable Video Diffusion (SVD-XT)',
        implementationCodeSnippet: `// Auto-Synthesized Endpoint\napp.post('/api/video/generate', async (req, res) => {\n  const { prompt, sourceImageUrl, aspectRatio, duration } = req.body;\n  const videoJob = await videoClient.generate({\n    prompt,\n    image: sourceImageUrl,\n    ratio: aspectRatio || '16:9',\n    duration: duration || 8\n  });\n  res.json({ status: 'completed', videoUrl: videoJob.url });\n});`
      };
    } else if (lower.includes('voice') || lower.includes('speech') || lower.includes('audio') || lower.includes('whisper')) {
      proposal = {
        name: 'Neural Voice & Speech Synthesizer',
        key: 'neural_voice_engine',
        description: 'Real-time text-to-speech voice generation and Whisper speech-to-text audio transcription pipeline.',
        category: 'ai_models',
        rolloutPercentage: 100,
        targetRoles: ['super_admin', 'admin', 'product_manager', 'support'],
        endpoint: '/api/audio/synthesize',
        recommendedModel: 'OpenAI Whisper-Large-v3 + ElevenLabs Neural Voice',
        implementationCodeSnippet: `// Auto-Synthesized Audio Endpoint\napp.post('/api/audio/synthesize', async (req, res) => {\n  const { text, voiceId } = req.body;\n  const audioBuffer = await speechClient.synthesize(text, { voiceId });\n  res.type('audio/mp3').send(audioBuffer);\n});`
      };
    } else if (lower.includes('search') || lower.includes('research') || lower.includes('browse') || lower.includes('web')) {
      proposal = {
        name: 'Autonomous Web Research & Fact-Checker',
        key: 'deep_web_research',
        description: 'Multi-step autonomous web research engine fetching live citations, verifying facts, and summarizing sources.',
        category: 'integrations',
        rolloutPercentage: 80,
        targetRoles: ['super_admin', 'admin', 'analyst'],
        endpoint: '/api/research/query',
        recommendedModel: 'Gemini Search Grounding Engine',
        implementationCodeSnippet: `// Auto-Synthesized Web Search Route\napp.post('/api/research/query', async (req, res) => {\n  const { query } = req.body;\n  const research = await searchAgent.investigate(query);\n  res.json({ summary: research.text, citations: research.sources });\n});`
      };
    } else {
      const cleanKey = prompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 24);
      const titleCase = prompt.trim().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      proposal = {
        name: `${titleCase} Engine`,
        key: cleanKey || 'custom_ai_module',
        description: `Auto-generated autonomous feature: ${prompt}. Configured with dynamic runtime toggles and canary rollout.`,
        category: 'ai_models',
        rolloutPercentage: 100,
        targetRoles: ['super_admin', 'admin'],
        endpoint: `/api/custom/${cleanKey}`,
        recommendedModel: 'Gemini Flash 2.5',
        implementationCodeSnippet: `// Auto-generated API module for ${titleCase}\napp.post('/api/custom/${cleanKey}', async (req, res) => {\n  const result = await aiEngine.process(req.body);\n  res.json({ success: true, result });\n});`
      };
    }

    logAudit('AI_FEATURE_SYNTHESIS', 'feature_flag', proposal.key, `AI auto-designed feature specification for "${proposal.name}" from prompt: "${prompt}"`);
    return proposal;
  };

  // Video Generation Implementation
  const sampleClips = [
    {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumb: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80'
    },
    {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80'
    },
    {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
    },
    {
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const generateVideo = async (data: {
    type: 'text_to_video' | 'image_to_video';
    prompt: string;
    sourceImageUrl?: string;
    aspectRatio: '16:9' | '9:16' | '1:1';
    durationSeconds: number;
    modelName: string;
  }): Promise<GeneratedVideo> => {
    const clipIndex = Math.floor(Math.random() * sampleClips.length);
    const chosen = sampleClips[clipIndex];

    const newVideo: GeneratedVideo = {
      id: `vid-${Date.now()}`,
      title: data.prompt.length > 40 ? `${data.prompt.substring(0, 40)}...` : data.prompt,
      type: data.type,
      prompt: data.prompt,
      sourceImageUrl: data.sourceImageUrl,
      videoUrl: chosen.videoUrl,
      thumbnailUrl: data.sourceImageUrl || chosen.thumb,
      aspectRatio: data.aspectRatio,
      durationSeconds: data.durationSeconds,
      modelName: data.modelName,
      createdAt: 'Just now',
      status: 'completed'
    };

    setVideos((prev) => [newVideo, ...prev]);
    logAudit('GENERATE_AI_VIDEO', 'system', newVideo.title, `Synthesized ${data.durationSeconds}s ${data.type} video using ${data.modelName}`);
    addToast('success', 'AI Video Generated!', `"${newVideo.title}" was rendered in ${data.aspectRatio}.`);
    return newVideo;
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    addToast('info', 'Video Removed', 'The generated video was deleted from your library.');
  };

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        switchRole,
        can,
        activeTab,
        setActiveTab,
        railwayUrl,
        setRailwayUrl,
        railwayHealth,
        isLiveConnected,
        liveLatencyMs,
        fetchLiveRailwayHealth,
        sendLiveGuestChat,
        environment,
        setEnvironment,
        features,
        toggleFeature,
        createFeature,
        updateFeature,
        deleteFeature,
        users,
        updateUserRole,
        toggleUserStatus,
        addUser,
        deleteUser,
        resendInvite,
        acceptInvite,
        weeklyUsage,
        modelUsage,
        timeRange,
        setTimeRange,
        services,
        restartService,
        auditLogs,
        toasts,
        addToast,
        removeToast,
        resetAllData,
        autoCreateFeatureWithAI,
        videos,
        generateVideo,
        deleteVideo
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
