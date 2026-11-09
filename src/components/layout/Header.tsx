import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Role } from '../../types';
import { Badge } from '../common/Badge';
import { 
  ShieldCheck, 
  ChevronDown, 
  RotateCcw, 
  ExternalLink,
  Zap
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    resetAllData,
    railwayUrl,
    liveLatencyMs
  } = useAdmin();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const simplifiedRoles: { id: Role; label: string; desc: string }[] = [
    { id: 'super_admin', label: 'Super Admin', desc: 'Full control (you)' },
    { id: 'admin', label: 'Admin', desc: 'Can toggle features & invite team' },
    { id: 'analyst', label: 'Viewer', desc: 'Read-only access to dashboard' }
  ];

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Simple Live Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-300 font-semibold">Self AI Online</span>
          <span className="text-slate-400 font-mono text-[11px] border-l border-emerald-500/30 pl-2">
            {liveLatencyMs}ms
          </span>
        </div>

        <a
          href={railwayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span>frontend-production-0c17e.up.railway.app</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Simple Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 transition-all"
            title="Switch roles to test permissions"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Role:</span>
            <span className="text-indigo-300 font-bold capitalize">
              {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role === 'admin' ? 'Admin' : 'Viewer'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1.5 z-50">
              <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400">
                Test Role Permissions
              </div>
              {simplifiedRoles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    switchRole(r.id);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-800 transition-colors flex flex-col ${
                    currentUser.role === r.id ? 'bg-indigo-500/10 text-indigo-300 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <span className="font-semibold">{r.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{r.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 leading-tight">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
