import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  LayoutDashboard, 
  BarChart3, 
  Sliders, 
  Users, 
  Activity, 
  FileText, 
  Settings, 
  Sparkles,
  Shield,
  Layers,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { activeTab, setActiveTab, features } = useAdmin();

  const enabledFeaturesCount = features.filter((f) => f.enabled).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'weekly-usage',
      label: 'Weekly Usage & Stats',
      icon: BarChart3,
      badge: 'Live'
    },
    {
      id: 'feature-control',
      label: 'Feature Control',
      icon: Sliders,
      badge: `${enabledFeaturesCount} Active`
    },
    {
      id: 'rbac-users',
      label: 'RBAC & Team Access',
      icon: Shield,
      badge: null
    },
    {
      id: 'monitoring',
      label: 'System Monitoring',
      icon: Activity,
      badge: '99.98%'
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      icon: FileText,
      badge: null
    },
    {
      id: 'settings',
      label: 'App Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/95 flex flex-col h-screen shrink-0 sticky top-0 select-none">
      {/* Brand Logo */}
      <div className="h-16 border-b border-slate-800 flex items-center px-6 gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-white">SelfAI</span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Admin
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Enterprise Control Plane</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Application Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-indigo-700 text-indigo-100'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cluster Quick Status Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 m-3 rounded-2xl border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-200">LLM Inference Node</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Normal</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Cluster Load</span>
            <span className="font-mono text-slate-300">42%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <span>v2.8.4-prod</span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Sync OK
          </span>
        </div>
      </div>
    </aside>
  );
};
