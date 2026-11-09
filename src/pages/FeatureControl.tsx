import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { FeatureFlag } from '../types';
import { Modal } from '../components/common/Modal';
import { 
  Trash2, 
  Search, 
  HelpCircle, 
  Percent, 
  ExternalLink,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export const FeatureControl: React.FC = () => {
  const { 
    features, 
    toggleFeature, 
    updateFeature, 
    deleteFeature, 
    can 
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGuide, setShowGuide] = useState(true);
  const [editingRolloutFeat, setEditingRolloutFeat] = useState<FeatureFlag | null>(null);

  const filteredFeatures = features.filter((feat) => {
    const matchesSearch = 
      feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || feat.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enabledCount = features.filter((f) => f.enabled).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">App Feature Management & Controls</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
              {features.length} Features Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Turn app capabilities on or off in real-time, adjust rollout percentages, and manage live modules.
          </p>
        </div>

        {/* Live Active Pill */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{enabledCount} Active in Live App</span>
          </span>
        </div>
      </div>

      {/* Plain-English Guide: Non-Technical Admin Guide */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Guide: How Feature Flags & Controls Work
            </h3>
          </div>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
          >
            {showGuide ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-indigo-500/10">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">1. Instant Kill Switch</strong>
              <p className="text-[11px] text-slate-400">
                Flip any switch to <strong>OFF</strong> if a feature needs maintenance. It turns off immediately in your live app without redeploying.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">2. Safe Canary Rollouts</strong>
              <p className="text-[11px] text-slate-400">
                Instead of giving an AI feature to 100% of users right away, click <strong>"Change %"</strong> to set it to <strong>25%</strong> or <strong>50%</strong> to test it safely first.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">3. Live Real-Time Sync</strong>
              <p className="text-[11px] text-slate-400">
                Your admin dashboard connects directly to Railway backend. Any switch you flip reflects in the main application instantly.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features by name or key..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'ai_models', label: 'AI & Models' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'ui_ux', label: 'UI & Chat' },
            { id: 'developer', label: 'Failover' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeatures.map((feat) => {
          const canToggle = can('features:toggle');
          const canEdit = can('features:edit');
          const canDelete = can('features:delete');

          return (
            <div
              key={feat.id}
              className={`p-5 rounded-2xl border transition-all ${
                feat.enabled
                  ? 'bg-slate-900 border-slate-800 shadow-sm'
                  : 'bg-slate-950/60 border-slate-850 opacity-75'
              }`}
            >
              {/* Header: Title, Category & Toggle */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white truncate">{feat.name}</h3>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {feat.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Big ON/OFF Switch */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-bold ${feat.enabled ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {feat.enabled ? 'ON' : 'OFF'}
                  </span>
                  <button
                    onClick={() => toggleFeature(feat.id)}
                    disabled={!canToggle}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      feat.enabled ? 'bg-indigo-600' : 'bg-slate-700'
                    } ${!canToggle ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                    title={feat.enabled ? 'Click to turn OFF' : 'Click to turn ON'}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        feat.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Rollout Progress Bar */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-850">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <Percent className="w-3 h-3 text-indigo-400" />
                    <span>User Rollout:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-200 text-xs">{feat.rolloutPercentage}%</span>
                    {canEdit && (
                      <button
                        onClick={() => setEditingRolloutFeat(feat)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
                      >
                        Change %
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      feat.enabled ? (feat.rolloutPercentage === 100 ? 'bg-emerald-500' : 'bg-indigo-500') : 'bg-slate-600'
                    }`}
                    style={{ width: `${feat.rolloutPercentage}%` }}
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">code: <code>{feat.key}</code></span>

                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://frontend-production-0c17e.up.railway.app/features/${feat.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium bg-indigo-950/40 px-2 py-1 rounded border border-indigo-500/20"
                    title="Open and view this feature live in the main application"
                  >
                    <span>View in App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {canDelete && (
                    <button
                      onClick={() => deleteFeature(feat.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete feature"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Adjust Rollout Modal */}
      {editingRolloutFeat && (
        <Modal
          isOpen={!!editingRolloutFeat}
          onClose={() => setEditingRolloutFeat(null)}
          title={`Adjust User Rollout for "${editingRolloutFeat.name}"`}
          subtitle="Control what percentage of active users can see and use this feature."
          maxWidth="md"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Rollout Percentage:</span>
                <span className="font-mono font-bold text-indigo-400 text-sm">{editingRolloutFeat.rolloutPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={editingRolloutFeat.rolloutPercentage}
                onChange={(e) =>
                  setEditingRolloutFeat({
                    ...editingRolloutFeat,
                    rolloutPercentage: parseInt(e.target.value)
                  })
                }
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
                {[10, 25, 50, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setEditingRolloutFeat({ ...editingRolloutFeat, rolloutPercentage: pct })}
                    className="py-1.5 px-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-indigo-500 font-mono cursor-pointer"
                  >
                    {pct}% {pct === 100 ? '(All)' : pct === 25 ? '(Canary)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingRolloutFeat(null)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 cursor-pointer hover:bg-slate-850"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateFeature(editingRolloutFeat.id, {
                    rolloutPercentage: editingRolloutFeat.rolloutPercentage
                  });
                  setEditingRolloutFeat(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
              >
                Save Rollout %
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
