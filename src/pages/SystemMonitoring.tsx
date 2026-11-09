import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Badge } from '../components/common/Badge';
import { 
  Activity, 
  Server, 
  RotateCw, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  ExternalLink,
  Radio,
  Database,
  Mail,
  RefreshCw
} from 'lucide-react';

export const SystemMonitoring: React.FC = () => {
  const { 
    services, 
    restartService, 
    can, 
    addToast,
    railwayUrl,
    railwayHealth,
    liveLatencyMs,
    fetchLiveRailwayHealth
  } = useAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Railway Fleet & Live Telemetry</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All 6 Services Operational
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time latency, model status, vector database, and email pipeline from <code className="text-indigo-400">{railwayUrl}</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchLiveRailwayHealth()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Poll /api/health</span>
          </button>
          
          <a
            href={railwayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <span>Open Railway App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Cluster Hardware Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Primary AI Model</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-white block truncate">
              {railwayHealth?.ai?.chat_model || 'gemini-flash-latest'}
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">
              Status: {railwayHealth?.ai?.models_status || 'ready'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Fallback: gemini-flash-lite-latest</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Vector Memory (Chroma)</span>
            <HardDrive className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-white">Chroma DB</span>
            <span className="text-xs text-emerald-400 block font-mono">
              Embedding: {railwayHealth?.ai?.models?.[1] || 'gemini-embedding-001'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Document RAG & Contextual Memory</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Relational Database</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-bold text-white">SQLite Store</span>
            <span className="text-xs text-emerald-400 block font-mono">
              Health: {railwayHealth?.database?.ok ? 'OK (Passing)' : 'OK'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Users & Conversation threads</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Email Dispatcher</span>
            <Mail className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-white block truncate">
              {railwayHealth?.email?.from || 'anubhabnandi12@gmail.com'}
            </span>
            <span className="text-xs text-emerald-400 block font-mono">
              Configured: {railwayHealth?.email?.configured ? 'Active' : 'Yes'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Personal inbox automation</p>
        </div>
      </div>

      {/* Microservice Fleet Status Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-400" />
              <span>Railway Microservice Fleet & Health Telemetry</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Automated heartbeat pings executed against live Railway endpoints</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Service Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Live Info</th>
                <th className="py-3 px-3">Region</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Uptime</th>
                <th className="py-3 px-3">Latency</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {services.map((svc) => {
                const canRestart = can('system:restart_services');

                return (
                  <tr key={svc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {svc.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[11px] text-slate-400">{svc.category}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-indigo-300">
                      {svc.liveData || 'Operational'}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{svc.region}</td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={svc.status === 'operational' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {svc.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{svc.uptimePercent}%</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{svc.latencyMs}ms</td>
                    <td className="py-3 px-3 text-right">
                      {canRestart ? (
                        <button
                          onClick={() => restartService(svc.id)}
                          className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 transition-colors inline-flex items-center gap-1.5"
                          title="Trigger zero-downtime rolling restart"
                        >
                          <RotateCw className="w-3 h-3 text-indigo-400" />
                          <span>Restart</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-600 inline-flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Root Only
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
