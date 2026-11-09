import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Modal } from '../components/common/Modal';
import { 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  ToggleLeft,
  Lock
} from 'lucide-react';

export const FeatureControl: React.FC = () => {
  const { 
    features, 
    toggleFeature, 
    createFeature, 
    deleteFeature, 
    can, 
    addToast 
  } = useAdmin();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [featureName, setFeatureName] = useState('');
  const [featureDesc, setFeatureDesc] = useState('');
  const [featureEnabled, setFeatureEnabled] = useState(true);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureName.trim()) {
      addToast('error', 'Missing Name', 'Please enter a name for the feature.');
      return;
    }

    const slug = featureName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_');

    createFeature({
      name: featureName,
      key: slug,
      description: featureDesc || 'Custom application feature for Self AI.',
      category: 'ai_models',
      enabled: featureEnabled,
      rolloutPercentage: 100,
      targetRoles: ['super_admin', 'admin'],
      environment: 'production',
      tags: ['custom']
    });

    setIsAddModalOpen(false);
    setFeatureName('');
    setFeatureDesc('');
    setFeatureEnabled(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">App Features Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Turn capabilities on or off in your app instantly, or add new features.
          </p>
        </div>

        {can('features:create') ? (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Feature</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin only</span>
          </div>
        )}
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feat) => {
          const canToggle = can('features:toggle');
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
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-white truncate">{feat.name}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Big, Friendly ON/OFF Toggle */}
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

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">key: {feat.key}</span>

                {canDelete && (
                  <button
                    onClick={() => deleteFeature(feat.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Delete feature"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Add Feature Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add a New Feature"
        subtitle="Create a new capability toggle for your Self AI app."
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Feature Name
            </label>
            <input
              type="text"
              required
              value={featureName}
              onChange={(e) => setFeatureName(e.target.value)}
              placeholder="e.g. Voice Search, Calendar Integration"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description (What does it do?)
            </label>
            <textarea
              rows={2}
              value={featureDesc}
              onChange={(e) => setFeatureDesc(e.target.value)}
              placeholder="Brief explanation of this feature in your app..."
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="initialEnabled"
              checked={featureEnabled}
              onChange={(e) => setFeatureEnabled(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="initialEnabled" className="text-xs text-slate-300 cursor-pointer font-medium">
              Turn ON immediately upon adding
            </label>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:bg-slate-850"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
            >
              Save Feature
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
