import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  RotateCcw, 
  ExternalLink,
  Zap,
  CheckCircle2,
  Radio,
  Server
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { 
    resetAllData, 
    addToast,
    railwayUrl,
    liveLatencyMs,
    fetchLiveRailwayHealth,
    railwayHealth
  } = useAdmin();
  
  const [testingStatus, setTestingStatus] = useState<boolean>(false);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);

  const handleTestConnection = async () => {
    setTestingStatus(true);
    addToast('info', 'Checking Railway App', 'Testing connection to your backend...');
    try {
      await fetchLiveRailwayHealth();
      addToast('success', 'Connection Verified', `Connected to Railway (${liveLatencyMs}ms response time).`);
    } catch {
      addToast('error', 'Ping Failed', 'Could not reach Railway app.');
    } finally {
      setTestingStatus(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">App Settings & Live Connection</h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor your Railway connection and manage platform settings.
        </p>
      </div>

      {/* 1. Connected App Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Connected Railway Application</h2>
              <p className="text-xs text-slate-400 mt-0.5">Your production backend on Railway</p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live & Active
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="font-mono text-indigo-300 truncate">
            {railwayUrl}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTestConnection}
              disabled={testingStatus}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold transition-all text-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{testingStatus ? 'Checking...' : 'Check Status'}</span>
            </button>

            <a
              href={railwayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold transition-colors text-xs border border-slate-700"
            >
              <span>Open App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850">
            <span className="text-slate-500 text-[11px]">AI Model</span>
            <p className="font-semibold text-slate-200 mt-0.5 truncate">
              {railwayHealth?.ai?.chat_model || 'gemini-flash-latest'}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850">
            <span className="text-slate-500 text-[11px]">Database Type</span>
            <p className="font-semibold text-slate-200 mt-0.5 truncate">
              Chroma Vector DB + SQLite
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850">
            <span className="text-slate-500 text-[11px]">Response Time</span>
            <p className="font-semibold text-emerald-400 mt-0.5 font-mono">
              {liveLatencyMs}ms (Singapore Edge)
            </p>
          </div>
        </div>
      </div>

      {/* 2. Simple Maintenance Toggle */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Maintenance Mode</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Temporarily pause public requests if performing model updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${maintenanceMode ? 'text-amber-400' : 'text-slate-500'}`}>
            {maintenanceMode ? 'ON' : 'OFF'}
          </span>
          <button
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
      </div>

      {/* 3. Reset Demo Data */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">Reset Default Data</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Restores the initial sample features and weekly numbers if you want a clean slate.
          </p>
        </div>

        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
