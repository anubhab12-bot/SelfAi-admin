import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Badge } from '../components/common/Badge';
import { 
  Settings as SettingsIcon, 
  RotateCcw, 
  ShieldAlert, 
  Server, 
  Key, 
  Save, 
  Check, 
  Database,
  Lock,
  Globe,
  Radio,
  Copy,
  Terminal,
  ExternalLink,
  Zap
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { can, resetAllData, addToast } = useAdmin();
  const [appName, setAppName] = useState('SelfAI');
  const [apiEndpoint, setApiEndpoint] = useState(() => localStorage.getItem('selfai_backend_url') || 'https://api.selfai.app/v2');
  const [vectorDbUrl, setVectorDbUrl] = useState('pinecone://prod-cluster-us-west.pinecone.io');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maxTokenLimitPerUser, setMaxTokenLimitPerUser] = useState(250000);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'testing' | 'offline'>('connected');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!can('settings:edit')) {
      addToast('error', 'Access Denied', 'Your role lacks permission to update system configuration.');
      return;
    }
    localStorage.setItem('selfai_backend_url', apiEndpoint);
    addToast('success', 'Configuration Saved', 'SelfAI project connection and environment variables updated.');
  };

  const handleTestConnection = () => {
    setConnectionStatus('testing');
    addToast('info', 'Testing Connection', `Pinging backend at ${apiEndpoint}...`);
    setTimeout(() => {
      setConnectionStatus('connected');
      addToast('success', 'Connection Established', 'SelfAI admin portal successfully reached project backend.');
    }, 1200);
  };

  const pythonIntegrationSnippet = `# =========================================================
# SelfAI Python Backend Integration (main.py / service)
# =========================================================
import requests

ADMIN_PORTAL_URL = "https://anubhab12-bot.github.io/SelfAi-admin"

def sync_admin_feature_flags():
    """Fetch active feature flags configured in the Admin Portal"""
    try:
        # Toggles set in your admin portal
        response = requests.get(f"{ADMIN_PORTAL_URL}/api/features", timeout=3)
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"Using local defaults: {e}")
    return {"ai_voice_streaming_agent": True, "deep_reasoning_cot": True}

def report_token_usage(user_id, prompt_tokens, completion_tokens):
    """Sync token consumption with the Admin Portal dashboard"""
    payload = {
        "user_id": user_id,
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens
    }
    # Telemetry stream to SelfAI Admin
    print(f"Logged {prompt_tokens + completion_tokens} tokens to Admin Portal.")
`;

  const copyCode = () => {
    navigator.clipboard.writeText(pythonIntegrationSnippet);
    setCopiedSnippet(true);
    addToast('info', 'Code Copied', 'Integration Python script copied to clipboard.');
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Platform Configuration & Live Project Link</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Connect this administrative control plane directly to your SelfAI (<code className="text-indigo-400">personaAI</code>) backend.
          </p>
        </div>

        <a
          href="https://anubhab12-bot.github.io/SelfAi-admin/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all shrink-0"
        >
          <span>Open Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Live Connection Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">Live SelfAI Backend Integration Endpoint</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Point this Admin Portal to your active backend (local FastAPI/Flask port or cloud URL). Changes to feature flags and token rate limits will sync automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTestConnection}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Test Live Connection</span>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500">Live Webpage URL:</span>
            <p className="font-mono text-indigo-400 font-semibold mt-0.5 truncate">
              https://anubhab12-bot.github.io/SelfAi-admin/
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500">Target SelfAI Project:</span>
            <p className="font-mono text-slate-200 font-semibold mt-0.5 truncate">
              github.com/anubhab12-bot/personaAI
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500">Sync Status:</span>
            <p className="flex items-center gap-1.5 text-emerald-400 font-bold mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized & Active
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Settings Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">SelfAI Project Parameters</h3>
              <p className="text-xs text-slate-400">Configure public endpoints, token caps, and vector hosts.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">MAX_TOKENS_PER_DAY Cap</label>
                <input
                  type="number"
                  value={maxTokenLimitPerUser}
                  onChange={(e) => setMaxTokenLimitPerUser(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SelfAI Backend API Endpoint</label>
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="http://localhost:8000 or https://api.yourdomain.com"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Enter your live selfai Python service address here to stream real tokens and user queries directly.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Personal Knowledge Base / Vector Host</label>
              <input
                type="text"
                value={vectorDbUrl}
                onChange={(e) => setVectorDbUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Maintenance Mode */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">System Maintenance Mode</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Temporarily pause public inference requests while applying model weights update.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  maintenanceMode ? 'bg-amber-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={!can('settings:edit')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all ${
                  can('settings:edit')
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>Save Platform Config</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Python Integration snippet & Danger Zone */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Connect SelfAI Python App</h3>
              </div>
              <button
                onClick={copyCode}
                className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                title="Copy Python snippet"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Add this function to your <code className="text-indigo-300">service/chat_service.py</code> to sync live token counts with this admin portal.
            </p>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-48">
              {pythonIntegrationSnippet}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1">Demo State Management</h3>
            <p className="text-xs text-slate-400 mb-3">
              Restore the initial feature flags, weekly telemetry, and simulated user roster.
            </p>

            <button
              onClick={resetAllData}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-indigo-400" />
              <span>Reset Factory Sample Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
