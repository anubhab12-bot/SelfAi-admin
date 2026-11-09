import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { FeatureFlag, FeatureCategory, Role } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { 
  Sliders, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Edit3, 
  Layers, 
  Sparkles, 
  ShieldAlert,
  Percent,
  Tag,
  AlertTriangle,
  Lock
} from 'lucide-react';

export const FeatureControl: React.FC = () => {
  const { 
    features, 
    toggleFeature, 
    createFeature, 
    updateFeature, 
    deleteFeature, 
    can, 
    addToast 
  } = useAdmin();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEnv, setSelectedEnv] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<FeatureFlag | null>(null);
  const [featureToDelete, setFeatureToDelete] = useState<FeatureFlag | null>(null);
  const [rolloutAdjustFeature, setRolloutAdjustFeature] = useState<FeatureFlag | null>(null);

  // New Feature Form State
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    category: 'ai_models' as FeatureCategory,
    enabled: true,
    rolloutPercentage: 100,
    targetRoles: ['super_admin', 'admin', 'product_manager'] as Role[],
    environment: 'production' as 'production' | 'staging' | 'all',
    tags: 'ai, flagship'
  });

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    setFormData((prev) => ({ ...prev, name, key: slug }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('error', 'Validation Error', 'Feature name is required.');
      return;
    }
    if (!formData.key.trim()) {
      addToast('error', 'Validation Error', 'Feature key slug is required.');
      return;
    }

    createFeature({
      name: formData.name,
      key: formData.key,
      description: formData.description,
      category: formData.category,
      enabled: formData.enabled,
      rolloutPercentage: formData.rolloutPercentage,
      targetRoles: formData.targetRoles,
      environment: formData.environment,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      key: '',
      description: '',
      category: 'ai_models',
      enabled: true,
      rolloutPercentage: 100,
      targetRoles: ['super_admin', 'admin', 'product_manager'],
      environment: 'production',
      tags: 'ai, flagship'
    });
  };

  // Filtered features
  const filteredFeatures = features.filter((feat) => {
    const matchesSearch = 
      feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || feat.category === selectedCategory;
    const matchesEnv = selectedEnv === 'all' || feat.environment === selectedEnv || feat.environment === 'all';
    const matchesStatus = 
      selectedStatus === 'all' || 
      (selectedStatus === 'enabled' && feat.enabled) ||
      (selectedStatus === 'disabled' && !feat.enabled);

    return matchesSearch && matchesCategory && matchesEnv && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Feature Management & Rollouts</h1>
            <Badge variant="primary" size="sm">{features.length} Total Modules</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamically add, toggle, and canary-rollout AI features and capabilities across the SelfAI application.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {can('features:create') ? (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Feature</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>Add Feature (Super Admin / PM only)</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features by name, key, or tag..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="ai_models">AI Models & LLMs</option>
            <option value="developer">Developer & Sandboxes</option>
            <option value="ui_ux">UI / UX Features</option>
            <option value="integrations">Third-party Integrations</option>
            <option value="experimental">Experimental Labs</option>
          </select>

          {/* Environment Filter */}
          <select
            value={selectedEnv}
            onChange={(e) => setSelectedEnv(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Environments</option>
            <option value="production">Production Only</option>
            <option value="staging">Staging Only</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="enabled">Active / ON</option>
            <option value="disabled">Disabled / OFF</option>
          </select>
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
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                feat.enabled
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
                  : 'bg-slate-950/70 border-slate-850 opacity-80'
              }`}
            >
              <div>
                {/* Header: Name, Category, Toggle */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white truncate">{feat.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {feat.category}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {feat.environment}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 mt-1">key: {feat.key}</p>
                  </div>

                  {/* Toggle Switch */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleFeature(feat.id)}
                      disabled={!canToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        feat.enabled ? 'bg-indigo-600' : 'bg-slate-700'
                      } ${!canToggle ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                      title={canToggle ? `Click to ${feat.enabled ? 'disable' : 'enable'}` : 'Requires features:toggle permission'}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          feat.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {feat.description}
                </p>

                {/* Rollout Progress Bar */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-850">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Traffic Rollout</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-200">{feat.rolloutPercentage}%</span>
                      {canEdit && (
                        <button
                          onClick={() => setRolloutAdjustFeature(feat)}
                          className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium"
                        >
                          Adjust
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        feat.enabled
                          ? feat.rolloutPercentage === 100
                            ? 'bg-emerald-500'
                            : 'bg-indigo-500'
                          : 'bg-slate-600'
                      }`}
                      style={{ width: `${feat.rolloutPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Target Roles */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-500 font-medium">Audience:</span>
                  {feat.targetRoles.map((role) => (
                    <span key={role} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      {role}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                {feat.tags.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    {feat.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded text-slate-400 bg-slate-950 border border-slate-800 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Metadata and Actions */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Updated by {feat.updatedBy} ({feat.updatedAt})</span>
                
                <div className="flex items-center gap-1">
                  {canEdit && (
                    <button
                      onClick={() => setEditingFeature(feat)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit feature"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => setFeatureToDelete(feat)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
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

      {filteredFeatures.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800">
          <Sliders className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No matching features found</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or filters.</p>
        </div>
      )}

      {/* MODAL 1: ADD NEW FEATURE */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Feature Flag to SelfAI"
        subtitle="Register an experimental or production capability to the SelfAI application."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Feature Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Autonomous Code Interpreter"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Feature Key Slug <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              placeholder="e.g. autonomous_code_interpreter"
              className="w-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">Unique programmatic identifier used in client SDKs.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as FeatureCategory })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="ai_models">AI Models & LLMs</option>
                <option value="developer">Developer & Sandboxes</option>
                <option value="ui_ux">UI / UX Features</option>
                <option value="integrations">Third-party Integrations</option>
                <option value="experimental">Experimental Labs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Environment</label>
              <select
                value={formData.environment}
                onChange={(e) => setFormData({ ...formData, environment: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="all">All Environments</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of what this feature enables in the app..."
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Rollout Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label className="font-semibold text-slate-300">Initial Traffic Rollout %</label>
              <span className="font-mono text-indigo-400 font-bold">{formData.rolloutPercentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.rolloutPercentage}
              onChange={(e) => setFormData({ ...formData, rolloutPercentage: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0% (Disabled)</span>
              <span>25% (Canary)</span>
              <span>50% (Staged)</span>
              <span>100% (Full GA)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. voice, latency, pro-tier"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="enabledCheck"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="enabledCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
              Activate feature flag immediately upon creation
            </label>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-xs font-medium text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
            >
              Create Feature Flag
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL 2: ADJUST ROLLOUT */}
      {rolloutAdjustFeature && (
        <Modal
          isOpen={!!rolloutAdjustFeature}
          onClose={() => setRolloutAdjustFeature(null)}
          title={`Adjust Rollout for "${rolloutAdjustFeature.name}"`}
          subtitle="Increase or decrease canary percentage safely."
          maxWidth="md"
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Current Rollout:</span>
                <span className="font-mono font-bold text-indigo-400">{rolloutAdjustFeature.rolloutPercentage}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={rolloutAdjustFeature.rolloutPercentage}
                onChange={(e) =>
                  setRolloutAdjustFeature({
                    ...rolloutAdjustFeature,
                    rolloutPercentage: parseInt(e.target.value)
                  })
                }
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[10, 25, 50, 100].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setRolloutAdjustFeature({ ...rolloutAdjustFeature, rolloutPercentage: pct })}
                    className="py-1 px-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:border-indigo-500 font-mono"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setRolloutAdjustFeature(null)}
                className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateFeature(rolloutAdjustFeature.id, {
                    rolloutPercentage: rolloutAdjustFeature.rolloutPercentage
                  });
                  setRolloutAdjustFeature(null);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Save Rollout %
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 3: DELETE CONFIRMATION */}
      {featureToDelete && (
        <Modal
          isOpen={!!featureToDelete}
          onClose={() => setFeatureToDelete(null)}
          title="Delete Feature Flag?"
          maxWidth="sm"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete <strong className="text-white">"{featureToDelete.name}"</strong>?
              Client apps referencing this key (<code className="text-indigo-400 font-mono">{featureToDelete.key}</code>) will fallback to default values.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setFeatureToDelete(null)}
                className="px-3 py-1.5 rounded-xl border border-slate-800 hover:bg-slate-850 text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteFeature(featureToDelete.id);
                  setFeatureToDelete(null);
                }}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Delete Flag
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
