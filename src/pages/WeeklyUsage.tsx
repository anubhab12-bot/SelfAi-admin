import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Badge } from '../components/common/Badge';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Coins, 
  Zap, 
  Clock, 
  Users, 
  PieChart as PieIcon,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export const WeeklyUsage: React.FC = () => {
  const { weeklyUsage, modelUsage, timeRange, setTimeRange, can, addToast } = useAdmin();
  const [selectedMetric, setSelectedMetric] = useState<'queries' | 'tokens' | 'cost'>('queries');

  const totalQueries = weeklyUsage.reduce((acc: number, curr) => acc + curr.queriesCount, 0);
  const totalTokens = weeklyUsage.reduce((acc: number, curr) => acc + curr.totalTokens, 0);
  const totalCost = weeklyUsage.reduce((acc: number, curr) => acc + curr.costUSD, 0);
  const avgLatency = Math.round(weeklyUsage.reduce((acc: number, curr) => acc + curr.avgLatencyMs, 0) / weeklyUsage.length);

  const exportCSV = () => {
    if (!can('analytics:export')) {
      addToast('error', 'Access Denied', 'Your role lacks permission to export analytics data.');
      return;
    }

    const headers = ['Date', 'Day', 'Active Users', 'Queries', 'Prompt Tokens', 'Completion Tokens', 'Total Tokens', 'Avg Latency (ms)', 'Cost (USD)', 'Error Rate (%)'];
    const rows = weeklyUsage.map((d) => [
      d.date,
      d.dayName,
      d.activeUsers,
      d.queriesCount,
      d.promptTokens,
      d.completionTokens,
      d.totalTokens,
      d.avgLatencyMs,
      d.costUSD,
      `${d.errorRatePercent}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `selfai-weekly-usage-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    addToast('success', 'Report Exported', 'Weekly usage report downloaded as CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Weekly Usage & Consumption</h1>
            <Badge variant="primary" size="sm">Last 7 Days</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inference query volume, token burn breakdown, and multi-model cost distribution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Time range pills */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            {(['7d', '14d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Export CSV button */}
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs font-medium text-slate-400">Total Queries</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{totalQueries.toLocaleString()}</span>
            <span className="text-xs text-emerald-400 flex items-center font-semibold">+14.2%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Week-over-week growth</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs font-medium text-slate-400">Tokens Processed</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{(totalTokens / 1000000).toFixed(1)}M</span>
            <span className="text-xs text-emerald-400 flex items-center font-semibold">+18.5%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Prompt + Completion</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs font-medium text-slate-400">Total Inference Cost</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">${totalCost.toFixed(2)}</span>
            <span className="text-xs text-slate-400 font-mono">~$0.0012/query</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Under budget ($750 limit)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs font-medium text-slate-400">Average Turnaround</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{avgLatency}ms</span>
            <span className="text-xs text-emerald-400 font-semibold">-5.4%</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">p50 inference speed</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Daily Trends */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Traffic & Activity Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Daily completed AI completions and unique users</p>
            </div>

            {/* Metric Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedMetric('queries')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMetric === 'queries' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
                }`}
              >
                Queries
              </button>
              <button
                onClick={() => setSelectedMetric('tokens')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMetric === 'tokens' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
                }`}
              >
                Tokens
              </button>
              <button
                onClick={() => setSelectedMetric('cost')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedMetric === 'cost' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400'
                }`}
              >
                Cost ($)
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'queries' ? (
                <AreaChart data={weeklyUsage}>
                  <defs>
                    <linearGradient id="qGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="uGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="dayName" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                  <Area type="monotone" name="Queries" dataKey="queriesCount" stroke="#6366f1" strokeWidth={2} fill="url(#qGrad)" />
                  <Area type="monotone" name="Active Users" dataKey="activeUsers" stroke="#06b6d4" strokeWidth={2} fill="url(#uGrad)" />
                </AreaChart>
              ) : selectedMetric === 'tokens' ? (
                <BarChart data={weeklyUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="dayName" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: number) => [`${(val / 1000000).toFixed(2)}M tokens`, '']}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="promptTokens" name="Prompt Tokens" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="completionTokens" name="Completion Tokens" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={weeklyUsage}>
                  <defs>
                    <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="dayName" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: number) => [`$${val.toFixed(2)}`, 'Spend']}
                  />
                  <Area type="monotone" name="Inference Spend" dataKey="costUSD" stroke="#10b981" strokeWidth={2} fill="url(#costGrad)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: AI Model Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-indigo-400" />
                <span>AI Model Share</span>
              </h3>
              <Badge variant="neutral" size="sm">5 Models</Badge>
            </div>
            <p className="text-xs text-slate-400 mb-4">Volume breakdown across connected AI backends</p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelUsage}
                    dataKey="percentage"
                    nameKey="modelName"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {modelUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: number) => [`${val}%`, 'Traffic Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              {modelUsage.map((m) => (
                <div key={m.modelName} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                    <span className="text-slate-300 font-medium truncate">{m.modelName}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-slate-200">{m.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Granular Daily Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
              <span>Day-by-Day Performance Breakdown</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Audited daily log of user counts, token volumes, and SLA metrics</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Day</th>
                <th className="py-3 px-3">Active Users</th>
                <th className="py-3 px-3">Queries</th>
                <th className="py-3 px-3">Total Tokens</th>
                <th className="py-3 px-3">Avg Latency</th>
                <th className="py-3 px-3">Cost ($)</th>
                <th className="py-3 px-3">Error Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
              {weeklyUsage.map((day) => (
                <tr key={day.date} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 text-slate-400">{day.date}</td>
                  <td className="py-3 px-3 font-semibold text-slate-200">{day.dayName}</td>
                  <td className="py-3 px-3">{day.activeUsers.toLocaleString()}</td>
                  <td className="py-3 px-3 text-indigo-300 font-bold">{day.queriesCount.toLocaleString()}</td>
                  <td className="py-3 px-3">{(day.totalTokens / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-3">{day.avgLatencyMs}ms</td>
                  <td className="py-3 px-3 text-emerald-400 font-semibold">${day.costUSD.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className="text-emerald-400 font-semibold">{day.errorRatePercent}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
