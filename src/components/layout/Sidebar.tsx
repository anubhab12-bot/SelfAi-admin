import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  LayoutDashboard, 
  Bot,
  ToggleLeft, 
  Film,
  Users, 
  Activity,
  FileText,
  Settings, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, features, railwayUrl } = useAdmin();

  const enabledCount = features.filter((f) => f.enabled).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview & Analytics',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'features',
      label: 'Feature Controls',
      icon: ToggleLeft,
      badge: `${enabledCount} Active`
    },
    {
      id: 'team',
      label: 'Team & Invitations (RBAC)',
      icon: Users,
      badge: null
    },
    {
      id: 'monitoring',
      label: 'System Health',
      icon: Activity,
      badge: '99.9%'
    },
    {
      id: 'audit',
      label: 'Audit Trail',
      icon: FileText,
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings & Live App',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-900/95 flex flex-col h-screen shrink-0 sticky top-0 select-none">
      {/* Brand Logo */}
      <div className="h-16 border-b border-slate-800/80 flex items-center px-5 gap-3">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-white">Self AI</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Admin
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Control & Telemetry Suite</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Live App Pill */}
      <div className="p-3 m-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div className="flex items-center gap-2 text-xs mb-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">Live on Railway</span>
        </div>
        <p className="text-[11px] text-slate-400 truncate font-mono mb-2">
          frontend-production-0c17e
        </p>
        <a
          href={railwayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-indigo-300 transition-colors"
        >
          <span>Open Live App</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
