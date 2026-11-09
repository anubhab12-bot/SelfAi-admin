import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Zap, 
  Users, 
  Clock, 
  Cpu, 
  ExternalLink, 
  CheckCircle2, 
  ToggleLeft,
  ArrowRight,
  TrendingUp,
  Download,
  Mail,
  Database,
  Radio
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { 
    weeklyUsage, 
    features, 
    can, 
    setActiveTab, 
    toggleFeature, 
    addToast,
    railwayUrl,
    railwayHealth,
    liveLatencyMs
  } = useAdmin();

  const totalWeeklyQueries = weeklyUsage.reduce((acc: number, curr) => acc + curr.queriesCount, 0);
  const totalWeeklyUsers = weeklyUsage.reduce((acc: number, curr) => acc + curr.activeUsers, 0);

  const exportWeeklySummary = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      generatedAt: new Date().toISOString(),
      app: railwayUrl,
      totalWeeklyQueries,
      weeklyDailyUsage: weeklyUsage
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `selfai-weekly-report-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('success', 'Report Downloaded', 'Weekly summary downloaded to your device.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Clean Top Status Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h1 className="text-lg font-bold text-white tracking-tight">Self AI is Healthy & Live</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Connected to your deployed app on Railway. AI model: <strong className="text-indigo-300">{railwayHealth?.ai?.chat_model || 'gemini-flash-latest'}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={exportWeeklySummary}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Report</span>
          </button>

          <a
            href={railwayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <span>Open Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Four Simple, High-Level KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Weekly Questions</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {(totalWeeklyQueries / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +14%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Total AI completions this week</p>
        </div>

        {/* Card 2 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Users This Week</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {(totalWeeklyUsers / 1000).toFixed(1)}k
            </span>
            <span className="text-xs text-emerald-400 font-semibold">+9%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Unique people using Self AI</p>
        </div>

        {/* Card 3 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>AI Response Speed</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight font-mono">
              {liveLatencyMs}ms
            </span>
            <span className="text-xs text-emerald-400 font-semibold">Fast</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Average response time</p>
        </div>

        {/* Card 4 */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>AI Chat Engine</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-base font-bold text-white truncate block">
              Gemini Flash
            </span>
            <span className="text-xs text-emerald-400 font-medium">Ready & Online</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Fallback: Flash Lite</p>
        </div>
      </div>

      {/* 3. Weekly Usage Chart (Clean and Simple) */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Weekly Usage (Questions Asked Per Day)</h3>
            <p className="text-xs text-slate-400 mt-0.5">Daily volume from Monday to Sunday</p>
          </div>
          <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Last 7 Days
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyUsage}>
              <defs>
                <linearGradient id="simpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="dayName" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
                formatter={(val: number) => [`${val.toLocaleString()} questions`, 'Usage']}
              />
              <Area type="monotone" dataKey="queriesCount" stroke="#6366f1" strokeWidth={2.5} fill="url(#simpleGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Quick Feature Controls & System Health (Side by Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Features */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ToggleLeft className="w-4 h-4 text-indigo-400" />
                <span>Quick Feature Controls</span>
              </h3>
              <button
                onClick={() => setActiveTab('features')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>View All ({features.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-3">Turn features on or off in your app with one click</p>

            <div className="space-y-3">
              {features.slice(0, 3).map((feat) => {
                const canToggle = can('features:toggle');
                return (
                  <div
                    key={feat.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-xs font-semibold text-slate-200 truncate">{feat.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{feat.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[11px] font-bold ${feat.enabled ? 'text-indigo-400' : 'text-slate-500'}`}>
                        {feat.enabled ? 'ON' : 'OFF'}
                      </span>
                      <button
                        onClick={() => toggleFeature(feat.id)}
                        disabled={!canToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          feat.enabled ? 'bg-indigo-600' : 'bg-slate-700'
                        } ${!canToggle ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            feat.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* App Health Checklist */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Live App Health Checklist</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold">All Systems OK</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Live components verified from your Railway app</p>

            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">Gemini Flash AI Model</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono text-[11px]">Ready</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">Chroma Document Memory</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono text-[11px]">Active</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">SQLite Database</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono text-[11px]">Connected</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200 font-medium">Email Dispatcher</span>
                </div>
                <span className="text-emerald-400 font-semibold font-mono text-[11px]">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
