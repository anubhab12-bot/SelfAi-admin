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
  Globe
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { can, resetAllData, addToast } = useAdmin();
  const [appName, setAppName] = useState('SelfAI');
  const [apiEndpoint, setApiEndpoint] = useState('https://api.selfai.app/v2');
  const [vectorDbUrl, setVectorDbUrl] = useState('pinecone://prod-cluster-us-west.pinecone.io');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maxTokenLimitPerUser, setMaxTokenLimitPerUser] = useState(250000);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!can('settings:edit')) {
      addToast('error', 'Access Denied', 'Your role lacks permission to update system configuration.');
      return;
    }
    addToast('success', 'Configuration Saved', 'SelfAI environment variables updated successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Platform Configuration & Controls</h1>
          <p className="text-xs text-slate-400 mt-1">
            Global parameters, inference endpoints, rate limits, and demo data controls.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Settings Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">General Settings</h3>
              <p className="text-xs text-slate-400">Core application identifiers and public endpoints.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Inference Gateway URL</label>
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Vector DB Pinecone Host</label>
              <input
                type="text"
                value={vectorDbUrl}
                onChange={(e) => setVectorDbUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-indigo-400 font-mono rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Maintenance Mode */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-855 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-200">System Maintenance Mode</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Temporarily pause public inference requests while applying model weights update.
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

        {/* Right 1 Col: Data Reset & Danger Zone */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1">Demo State Management</h3>
            <p className="text-xs text-slate-400 mb-4">
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

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Root Security Notice</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modifications to cluster configuration and feature toggles are logged to the immutable audit stream. Only users with the <strong className="text-white">Super Admin</strong> role can reconfigure API keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
