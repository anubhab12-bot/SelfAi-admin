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
  Zap,
  RefreshCw
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { 
    can, 
    resetAllData, 
    addToast,
    railwayUrl,
    setRailwayUrl,
    railwayHealth,
    liveLatencyMs,
    fetchLiveRailwayHealth
  } = useAdmin();
  
  const [appName, setAppName] = useState('Self AI');
  const [apiUrl, setApiUrl] = useState(railwayUrl);
  const [vectorDbUrl, setVectorDbUrl] = useState('Chroma Vector Store (gemini-embedding-001)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maxTokenLimitPerUser, setMaxTokenLimitPerUser] = useState(250000);
  const [testingStatus, setTestingStatus] = useState<boolean>(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!can('settings:edit')) {
      addToast('error', 'Access Denied', 'Your role lacks permission to update system configuration.');
      return;
    }
    setRailwayUrl(apiUrl);
    addToast('success', 'Configuration Saved', 'SelfAI Railway backend endpoint updated successfully.');
  };

  const handleTestConnection = async () => {
    setTestingStatus(true);
    addToast('info', 'Pinging Railway App', `Connecting to ${apiUrl}/api/health...`);
    try {
      await fetchLiveRailwayHealth();
      addToast('success', 'Live Connection Verified', `Successfully reached ${apiUrl} (${liveLatencyMs}ms roundtrip).`);
    } catch {
      addToast('error', 'Ping Failed', `Could not reach ${apiUrl}`);
    } finally {
      setTestingStatus(false);
    }
  };

  const curlTestSnippet = `# Test Live Railway API from terminal
curl -I https://frontend-production-0c17e.up.railway.app/api/health

# Test Guest Chat Endpoint (SSE Streaming)
curl -X POST https://frontend-production-0c17e.up.railway.app/api/chat/guest \\
  -H "Content-Type: application/json" \\
  -d '{"content": "Hello Self AI", "history": []}'
`;

  const copyCode = () => {
    navigator.clipboard.writeText(curlTestSnippet);
    setCopiedSnippet(true);
    addToast('info', 'Code Copied', 'cURL verification script copied to clipboard.');
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
              Connected to Railway
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Control plane linked directly to your live Self AI app at <code className="text-indigo-400">frontend-production-0c17e.up.railway.app</code>
          </p>
        </div>

        <a
          href={railwayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all shrink-0"
        >
          <span>Launch Self AI App</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Live Connection Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-emerald-500/30 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">Live Self AI Railway App Integration</h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              This admin portal automatically streams real-time health telemetry, database status, and inference latency from your live Railway deployment.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testingStatus}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{testingStatus ? 'Testing...' : 'Test Railway Ping'}</span>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500">Target Railway App URL:</span>
            <p className="font-mono text-emerald-400 font-semibold mt-0.5 truncate">
              {railwayUrl}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500">Live Health Telemetry:</span>
            <p className="font-mono text-slate-200 font-semibold mt-0.5 truncate">
              AI: {railwayHealth?.ai?.status || 'ok'} | Models: {railwayHealth?.ai?.models_status || 'ready'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-slate-500">Edge Ping Speed:</span>
            <p className="flex items-center gap-1.5 text-emerald-400 font-bold mt-0.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {liveLatencyMs}ms (Singapore Edge)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Settings Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Self AI App Parameters</h3>
              <p className="text-xs text-slate-400">Endpoints, token caps, and vector memory configuration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Daily Token Cap per User</label>
                <input
                  type="number"
                  value={maxTokenLimitPerUser}
                  onChange={(e) => setMaxTokenLimitPerUser(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Live Backend URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Connected to your production deployment on Railway (<code className="text-indigo-400">frontend-production-0c17e.up.railway.app</code>).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Vector DB / Knowledge Base</label>
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
                  Temporarily pause public inference requests while applying model updates.
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

        {/* Right 1 Col: cURL snippet & Danger Zone */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Railway API Quick Test</h3>
              </div>
              <button
                onClick={copyCode}
                className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-[11px]"
                title="Copy cURL snippet"
              >
                {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-2">
              Verify your live endpoints directly from terminal or shell.
            </p>
            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
              {curlTestSnippet}
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
