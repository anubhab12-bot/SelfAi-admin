import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Role } from '../../types';
import { ROLE_DEFINITIONS } from '../../utils/rbac';
import { Badge } from '../common/Badge';
import { 
  ShieldCheck, 
  ChevronDown, 
  Activity, 
  RotateCcw, 
  Globe, 
  Search, 
  Sliders
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    environment, 
    setEnvironment, 
    resetAllData
  } = useAdmin();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [envMenuOpen, setEnvMenuOpen] = useState(false);

  const availableRoles: Role[] = ['super_admin', 'admin', 'product_manager', 'analyst', 'support'];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search features, users, system metrics, logs... (Ctrl+K)"
            className="w-full bg-slate-950/70 border border-slate-800/80 text-sm text-slate-200 placeholder:text-slate-500 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Environment Switcher */}
        <div className="relative">
          <button
            onClick={() => setEnvMenuOpen(!envMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 text-xs font-medium text-slate-300 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="capitalize">{environment}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {envMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-40">
              <button
                onClick={() => { setEnvironment('production'); setEnvMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                  environment === 'production' ? 'text-indigo-400 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>Production (Live)</span>
                {environment === 'production' && <span className="w-2 h-2 rounded-full bg-indigo-500"></span>}
              </button>
              <button
                onClick={() => { setEnvironment('staging'); setEnvMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                  environment === 'staging' ? 'text-indigo-400 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>Staging (Test)</span>
                {environment === 'staging' && <span className="w-2 h-2 rounded-full bg-indigo-500"></span>}
              </button>
            </div>
          )}
        </div>

        {/* Live System Uptime */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800/80 bg-slate-950/40 text-xs text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 font-mono text-[11px]">API 99.98% OK</span>
        </div>

        {/* RBAC ROLE SWITCHER (PROMINENT FOR DEMO/TESTING) */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-xs font-semibold text-indigo-300 transition-all shadow-sm"
            title="Click to test different RBAC permission tiers"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-normal">Active Role (RBAC)</span>
              <span className="text-slate-100 font-bold">{ROLE_DEFINITIONS[currentUser.role].name}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-400 ml-1" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-slate-200">Switch RBAC Role</p>
                <p className="text-[11px] text-slate-400">Instantly simulate permissions across the admin portal.</p>
              </div>

              <div className="py-1">
                {availableRoles.map((role) => {
                  const info = ROLE_DEFINITIONS[role];
                  const isCurrent = currentUser.role === role;
                  return (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-800/80 transition-colors flex items-start gap-2.5 ${
                        isCurrent ? 'bg-indigo-500/10' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        <Badge role={role} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{info.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={resetAllData}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors border border-transparent hover:border-slate-800"
          title="Reset to factory demo data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
