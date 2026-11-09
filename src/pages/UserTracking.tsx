import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Globe, 
  Clock, 
  MapPin, 
  Laptop, 
  Smartphone, 
  Monitor, 
  Search, 
  Filter, 
  RefreshCw, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Zap, 
  Crown,
  Activity,
  UserCheck
} from 'lucide-react';

export const UserTracking: React.FC = () => {
  const { userTraces, refreshUserTraces, addToast } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'premium' | 'free'>('all');
  const [showGuide, setShowGuide] = useState(true);

  // Filtered traces
  const filteredTraces = userTraces.filter((trace) => {
    const matchesSearch = 
      trace.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trace.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trace.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trace.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trace.ipAddress.includes(searchTerm);

    if (!matchesSearch) return false;

    if (statusFilter === 'online') return trace.status === 'online';
    if (statusFilter === 'premium') return trace.isPremium;
    if (statusFilter === 'free') return !trace.isPremium;
    return true;
  });

  const onlineCount = userTraces.filter((t) => t.status === 'online').length;
  const avgDuration = Math.round(userTraces.reduce((acc, t) => acc + t.sessionDurationMinutes, 0) / (userTraces.length || 1));
  const totalHours = Math.round(userTraces.reduce((acc, t) => acc + t.totalTimeSpentHours, 0));

  const getDeviceIcon = (device: string) => {
    const lower = device.toLowerCase();
    if (lower.includes('phone') || lower.includes('android') || lower.includes('samsung')) {
      return <Smartphone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
    }
    if (lower.includes('macbook') || lower.includes('laptop')) {
      return <Laptop className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
    }
    return <Monitor className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">User Activity & Location Telemetry</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Geolocation Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of active user sessions, login locations, devices, and total time spent in app.
          </p>
        </div>

        <button
          onClick={refreshUserTraces}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700/60 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
          <span>Refresh Live Sessions</span>
        </button>
      </div>

      {/* Guide Book Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-lg">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowGuide(!showGuide)}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Admin Guide Book: User Telemetry & Time Tracking</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ESSENTIAL GUIDE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                How user geolocations, session durations, and device fingerprints are collected and analyzed.
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white">
            {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-slate-800 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="font-bold text-indigo-300 block mb-1">📍 1. Geolocation & IP Tracing</span>
              When a user logs into your Railway app, their IP address is resolved to city and country coordinates without capturing invasive private data.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="font-bold text-indigo-300 block mb-1">⏱️ 2. Session Time Tracking</span>
              Tracks active heartbeat pings to calculate how many minutes a user spends per session and their total cumulative hours on the platform.
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="font-bold text-indigo-300 block mb-1">👑 3. User Retention Insights</span>
              Helps you identify power users who spend hours daily versus free users who might be ready to upgrade to Pro tier.
            </div>
          </div>
        )}
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Online Right Now</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-2xl font-bold text-white">{onlineCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <span>Active live sessions</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Session Time</span>
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{avgDuration}m</div>
          <div className="text-[11px] text-indigo-300 mt-1 flex items-center gap-1 font-medium">
            <span>Per active login session</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Hours Spent</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalHours}h</div>
          <div className="text-[11px] text-purple-300 mt-1 flex items-center gap-1 font-medium">
            <span>Cumulative user engagement</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Top Country</span>
            <Globe className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white flex items-center gap-1.5">
            <span>🇮🇳 India</span>
            <span className="text-xs font-semibold text-slate-400">(71%)</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Followed by 🇺🇸 US & 🇩🇪 Germany
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by user name, email, IP address, city or country..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Users ({userTraces.length})
            </button>
            <button
              onClick={() => setStatusFilter('online')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'online'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🟢 Online Now ({onlineCount})
            </button>
            <button
              onClick={() => setStatusFilter('premium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'premium'
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              👑 Pro Members ({userTraces.filter((t) => t.isPremium).length})
            </button>
            <button
              onClick={() => setStatusFilter('free')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === 'free'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Free Users ({userTraces.filter((t) => !t.isPremium).length})
            </button>
          </div>
        </div>

        {/* User Sessions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">User & Plan</th>
                <th className="py-2.5 px-3">Login Location</th>
                <th className="py-2.5 px-3">Device & Browser</th>
                <th className="py-2.5 px-3">Session Time</th>
                <th className="py-2.5 px-3">Queries Today</th>
                <th className="py-2.5 px-3">Favorite Feature</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredTraces.map((trace) => (
                <tr key={trace.id} className="hover:bg-slate-850/50 transition-colors">
                  {/* User & Plan */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={trace.userAvatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-white truncate">{trace.userName}</span>
                          {trace.isPremium && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30 flex items-center gap-0.5">
                              <Crown className="w-2.5 h-2.5" />
                              PRO
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono truncate block">
                          {trace.userEmail}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location & IP */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{trace.flag}</span>
                      <div>
                        <span className="font-semibold text-slate-200 block">
                          {trace.city}, {trace.country}
                        </span>
                        <code className="text-[10px] text-slate-500 font-mono">
                          {trace.ipAddress}
                        </code>
                      </div>
                    </div>
                  </td>

                  {/* Device & Browser */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      {getDeviceIcon(trace.device)}
                      <div>
                        <span className="text-slate-200 block text-[11px] font-medium">{trace.device}</span>
                        <span className="text-[10px] text-slate-400">{trace.os} • {trace.browser}</span>
                      </div>
                    </div>
                  </td>

                  {/* Time Spent */}
                  <td className="py-3 px-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-slate-200 font-bold">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        <span>{trace.sessionDurationMinutes} mins today</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {trace.totalTimeSpentHours} hrs total lifetime
                      </span>
                    </div>
                  </td>

                  {/* Queries Today */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">{trace.queriesToday}</span>
                      <span className="text-[10px] text-slate-500">prompts</span>
                    </div>
                  </td>

                  {/* Favorite Feature */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 text-[11px] font-medium">
                      {trace.favoriteFeature}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex flex-col items-end">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            trace.status === 'online'
                              ? 'bg-emerald-400 animate-pulse'
                              : trace.status === 'idle'
                              ? 'bg-amber-400'
                              : 'bg-slate-500'
                          }`}
                        />
                        <span
                          className={`font-semibold capitalize text-xs ${
                            trace.status === 'online'
                              ? 'text-emerald-400'
                              : trace.status === 'idle'
                              ? 'text-amber-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {trace.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">{trace.lastActive}</span>
                    </div>
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
