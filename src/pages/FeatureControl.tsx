import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { FeatureFlag, FeatureCategory } from '../types';
import { Modal } from '../components/common/Modal';
import { 
  Trash2, 
  Search, 
  HelpCircle, 
  Percent, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  ShieldAlert, 
  Sliders, 
  Sparkles,
  Lock,
  Globe,
  Clock,
  Zap,
  Info
} from 'lucide-react';

export const FeatureControl: React.FC = () => {
  const { 
    features, 
    toggleFeature, 
    updateFeature, 
    updateFeatureTier,
    createFeature,
    deleteFeature, 
    can,
    railwayUrl 
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGuide, setShowGuide] = useState(true);
  const [editingRolloutFeat, setEditingRolloutFeat] = useState<FeatureFlag | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Feature Form State
  const [newFeatName, setNewFeatName] = useState('');
  const [newFeatKey, setNewFeatKey] = useState('');
  const [newFeatDesc, setNewFeatDesc] = useState('');
  const [newFeatCategory, setNewFeatCategory] = useState<FeatureCategory>('ai_models');
  const [newFeatTier, setNewFeatTier] = useState<'free' | 'partially_free' | 'pro'>('free');
  const [newFeatDailyLimit, setNewFeatDailyLimit] = useState<number>(5);
  const [newFeatEnabled, setNewFeatEnabled] = useState(true);

  const filteredFeatures = features.filter((feat) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      feat.name.toLowerCase().includes(q) ||
      feat.description.toLowerCase().includes(q) ||
      feat.key.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'all' || feat.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enabledCount = features.filter((f) => f.enabled).length;
  const freeCount = features.filter((f) => (f.tier || 'free') === 'free').length;
  const partiallyFreeCount = features.filter((f) => f.tier === 'partially_free').length;
  const proCount = features.filter((f) => f.tier === 'pro').length;

  const handleCreateFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatName.trim() || !newFeatKey.trim()) return;

    const key = newFeatKey.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');

    createFeature({
      name: newFeatName.trim(),
      key,
      description: newFeatDesc.trim() || 'Custom app feature configured via Admin Portal.',
      category: newFeatCategory,
      enabled: newFeatEnabled,
      rolloutPercentage: 100,
      targetRoles: ['super_admin', 'admin', 'product_manager', 'analyst', 'support'],
      environment: 'production',
      tags: [key, 'custom_admin_feature'],
      tier: newFeatTier,
      dailyLimit: newFeatTier === 'partially_free' ? newFeatDailyLimit : 0,
      route: `/features/${key}`,
      isCustom: true
    });

    // Reset and close
    setNewFeatName('');
    setNewFeatKey('');
    setNewFeatDesc('');
    setNewFeatTier('free');
    setNewFeatDailyLimit(5);
    setNewFeatEnabled(true);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">App Feature Trace & Availability</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
              {features.length} Features Tracked
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Control feature availability in the main app (turn ON or OFF) and configure Free, Partially Free, or Pro paywalls and daily usage limits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{enabledCount} Available in App</span>
          </span>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Feature</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Live Active Features</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-emerald-400 font-mono">{enabledCount}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">Online</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">100% Free Features</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-indigo-400 font-mono">{freeCount}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-950/40 text-indigo-400 border border-indigo-500/20">Unlimited</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Partially Free (Daily Cap)</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-amber-400 font-mono">{partiallyFreeCount}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-500/20">Freemium</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Pro-Only Features</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-purple-400 font-mono">{proCount}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold px-1.5 py-0.5 rounded bg-purple-950/40 text-purple-400 border border-purple-500/20">Pro Tier</span>
          </div>
        </div>
      </div>

      {/* Guide Book: Non-Technical Administrator Handbook */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Guide Book: Controlling App Availability & Access Tiers
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
              <strong className="text-emerald-400 flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>1. ON / OFF Availability Switch</span>
              </strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Flip any feature to <strong>ON</strong> to make it visible and active in the main app. Flip to <strong>OFF</strong> to hide and disable it immediately for all users.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-amber-400 flex items-center gap-1.5 mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>2. Access Model (Free vs Pro)</span>
              </strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Choose <strong>Free</strong> for open access, <strong>Partially Free</strong> for daily usage caps (e.g. 5 free queries/day), or <strong>Paid Pro</strong> for paid subscribers only.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-indigo-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>3. Daily Basis Usage Limits</span>
              </strong>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                For partially free features, adjust how many free uses a user gets each day before the Pro upgrade paywall is displayed.
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
            placeholder="Search features by name, code or description..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {[
            { id: 'all', label: 'All Features' },
            { id: 'ai_models', label: 'Core AI & Art' },
            { id: 'ui_ux', label: 'Productivity' },
            { id: 'integrations', label: 'Career & Email' },
            { id: 'developer', label: 'System' }
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
          const canDelete = can('features:delete');
          const currentTier = feat.tier || 'free';
          const dailyCap = feat.dailyLimit || 0;

          return (
            <div
              key={feat.id}
              className={`p-5 rounded-2xl border transition-all ${
                feat.enabled
                  ? 'bg-slate-900 border-slate-800 shadow-sm'
                  : 'bg-slate-950/70 border-slate-850 opacity-75'
              }`}
            >
              {/* Header: Title, Category & ON/OFF Switch */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-white truncate">{feat.name}</h3>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {feat.category}
                    </span>
                    {feat.enabled ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Active in App
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-850 px-1.5 py-0.5 rounded">
                        Disabled / Hidden
                      </span>
                    )}
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
                    title={feat.enabled ? 'Click to turn OFF (hides from app)' : 'Click to turn ON (activates in app)'}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        feat.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Pricing & Usage Controls Section */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-850 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-indigo-400" />
                    <span>Access & Paywall Tier:</span>
                  </span>

                  {/* Tier Selector Buttons */}
                  <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                    <button
                      onClick={() => updateFeatureTier(feat.id, 'free', 0)}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        currentTier === 'free'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="100% Free for all visitors"
                    >
                      Free
                    </button>
                    <button
                      onClick={() => updateFeatureTier(feat.id, 'partially_free', dailyCap > 0 ? dailyCap : 5)}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        currentTier === 'partially_free'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Partially Free with daily rate limit"
                    >
                      Partially Free
                    </button>
                    <button
                      onClick={() => updateFeatureTier(feat.id, 'pro', 0)}
                      className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                        currentTier === 'pro'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Pro Tier subscribers only"
                    >
                      Pro Only
                    </button>
                  </div>
                </div>

                {/* Daily Usage Quota (shown when partially free) */}
                {currentTier === 'partially_free' && (
                  <div className="pt-2 border-t border-slate-850/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Daily Free Usage Quota:</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {[3, 5, 10, 20].map((num) => (
                        <button
                          key={num}
                          onClick={() => updateFeatureTier(feat.id, 'partially_free', num)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                            dailyCap === num
                              ? 'bg-amber-500 text-slate-950 font-extrabold'
                              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          {num}/day
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Code Key, Live Link & Delete */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">key: <code>{feat.key}</code></span>

                <div className="flex items-center gap-2">
                  <a
                    href={`${railwayUrl}${feat.route || `/features/${feat.key}`}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium bg-indigo-950/40 px-2 py-1 rounded border border-indigo-500/20"
                    title="Open live feature in the Self AI app"
                  >
                    <span>View in App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {feat.isCustom && canDelete && (
                    <button
                      onClick={() => deleteFeature(feat.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Delete custom feature"
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

      {/* Add New Feature Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New App Feature"
          subtitle="Configure a new capability, select its availability, and set paywall rules."
          maxWidth="lg"
        >
          <form onSubmit={handleCreateFeature} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Feature Name</label>
              <input
                type="text"
                required
                value={newFeatName}
                onChange={(e) => {
                  setNewFeatName(e.target.value);
                  if (!newFeatKey) {
                    setNewFeatKey(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '_'));
                  }
                }}
                placeholder="e.g. Code Review Assistant"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Feature Code Key</label>
                <input
                  type="text"
                  required
                  value={newFeatKey}
                  onChange={(e) => setNewFeatKey(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '_'))}
                  placeholder="e.g. code_reviewer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Category</label>
                <select
                  value={newFeatCategory}
                  onChange={(e) => setNewFeatCategory(e.target.value as FeatureCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                >
                  <option value="ai_models">Core AI & Art</option>
                  <option value="ui_ux">Productivity & Tasks</option>
                  <option value="integrations">Career & Email</option>
                  <option value="developer">Developer & System</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Description</label>
              <textarea
                rows={2}
                value={newFeatDesc}
                onChange={(e) => setNewFeatDesc(e.target.value)}
                placeholder="Explain what this feature does in plain English..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs resize-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div>
                <label className="block text-slate-400 mb-1.5 font-medium">Access Tier & Pricing</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFeatTier('free')}
                    className={`py-1.5 px-2 rounded-lg font-bold border transition-colors cursor-pointer text-center ${
                      newFeatTier === 'free'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    100% Free
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFeatTier('partially_free')}
                    className={`py-1.5 px-2 rounded-lg font-bold border transition-colors cursor-pointer text-center ${
                      newFeatTier === 'partially_free'
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Partially Free
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFeatTier('pro')}
                    className={`py-1.5 px-2 rounded-lg font-bold border transition-colors cursor-pointer text-center ${
                      newFeatTier === 'pro'
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    Paid (Pro Only)
                  </button>
                </div>
              </div>

              {newFeatTier === 'partially_free' && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <span className="text-slate-400 text-xs">Free queries per day before upgrade:</span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newFeatDailyLimit}
                    onChange={(e) => setNewFeatDailyLimit(Number(e.target.value))}
                    className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-center font-mono font-bold text-amber-400 text-xs"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                <span className="text-slate-400 text-xs">Initial Availability in App:</span>
                <button
                  type="button"
                  onClick={() => setNewFeatEnabled(!newFeatEnabled)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    newFeatEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {newFeatEnabled ? 'Enabled (ON)' : 'Disabled (OFF)'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                Create & Publish to App
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
