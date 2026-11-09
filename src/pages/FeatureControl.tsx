import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { FeatureFlag, FeatureCategory, Role, AIFeatureProposal } from '../types';
import { Modal } from '../components/common/Modal';
import { 
  Plus, 
  Trash2, 
  Check, 
  Sparkles,
  ToggleLeft,
  Lock,
  Search,
  HelpCircle,
  Percent,
  Tag,
  Sliders,
  Filter,
  Wand2,
  Code,
  Cpu,
  ArrowRight,
  RotateCw
} from 'lucide-react';

export const FeatureControl: React.FC = () => {
  const { 
    features, 
    toggleFeature, 
    createFeature, 
    updateFeature,
    deleteFeature, 
    can, 
    addToast,
    autoCreateFeatureWithAI,
    setActiveTab 
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGuide, setShowGuide] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [editingRolloutFeat, setEditingRolloutFeat] = useState<FeatureFlag | null>(null);

  // AI Feature Synthesizer State
  const [aiPrompt, setAiPrompt] = useState('I want to add a video feature from text to video or image to video');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [proposal, setProposal] = useState<AIFeatureProposal | null>(null);

  // New Feature Form State
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
    category: 'ai_models' as FeatureCategory,
    enabled: true,
    rolloutPercentage: 100
  });

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_');
    setFormData((prev) => ({ ...prev, name, key: slug }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    createFeature({
      name: formData.name,
      key: formData.key || formData.name.toLowerCase().replace(/\s+/g, '_'),
      description: formData.description || 'Feature flag for Self AI.',
      category: formData.category,
      enabled: formData.enabled,
      rolloutPercentage: formData.rolloutPercentage,
      targetRoles: ['super_admin', 'admin'],
      environment: 'production',
      tags: ['app-feature']
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      key: '',
      description: '',
      category: 'ai_models',
      enabled: true,
      rolloutPercentage: 100
    });
  };

  const handleSynthesizeAI = async (customPrompt?: string) => {
    const textToSynthesize = customPrompt || aiPrompt;
    if (!textToSynthesize.trim()) return;

    setIsSynthesizing(true);
    try {
      const generated = await autoCreateFeatureWithAI(textToSynthesize);
      setProposal(generated);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleDeploySynthesizedFeature = () => {
    if (!proposal) return;

    createFeature({
      name: proposal.name,
      key: proposal.key,
      description: proposal.description,
      category: proposal.category,
      enabled: true,
      rolloutPercentage: proposal.rolloutPercentage,
      targetRoles: proposal.targetRoles,
      environment: 'production',
      tags: ['ai-synthesized', proposal.key]
    });

    setIsAiModalOpen(false);
    addToast('success', 'Feature Auto-Deployed!', `"${proposal.name}" is now live and active in your app.`);

    if (proposal.key === 'video_generation_engine') {
      setActiveTab('video');
    }
  };

  const filteredFeatures = features.filter((feat) => {
    const matchesSearch = 
      feat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || feat.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">App Feature Management & Controls</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
              {features.length} Features
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Turn app capabilities on or off in real-time, control rollout percentages, or register new modules.
          </p>
        </div>

        {can('features:create') ? (
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                setIsAiModalOpen(true);
                if (!proposal) {
                  handleSynthesizeAI();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Auto-Create Feature with AI</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-semibold transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-400" />
              <span>Manual Add</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin only</span>
          </div>
        )}
      </div>

      {/* 💡 Plain-English Guide: How Someone Understands and Uses This */}
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
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {showGuide ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-indigo-500/10">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">1. Instant Kill Switch</strong>
              <p className="text-[11px] text-slate-400">
                Flip any switch to <strong>OFF</strong> if a feature has a bug or needs maintenance. It turns off immediately in the live app without redeploying.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">2. Safe Canary Rollouts</strong>
              <p className="text-[11px] text-slate-400">
                Instead of giving a new AI feature to 100% of users right away, set it to <strong>25%</strong> or <strong>50%</strong> to test it safely first.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5">3. Add New Capabilities</strong>
              <p className="text-[11px] text-slate-400">
                Click <strong>"+ Add New Feature"</strong> to register a new module (like Voice Search or Document Summarizer) and toggle it whenever ready.
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
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
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
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-medium"
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
                    className="py-1.5 px-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-indigo-500 font-mono"
                  >
                    {pct}% {pct === 100 ? '(All)' : pct === 25 ? '(Canary)' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingRolloutFeat(null)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400"
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
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Save Rollout %
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Feature Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Feature Flag"
        subtitle="Register a new toggleable capability for the Self AI application."
        maxWidth="md"
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
              placeholder="e.g. Real-Time Speech Synthesis"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as FeatureCategory })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value="ai_models">AI Models & LLMs</option>
                <option value="integrations">Integrations (Email, Calendar)</option>
                <option value="ui_ux">UI & Chat Features</option>
                <option value="developer">Developer & Failover</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Rollout %</label>
              <select
                value={formData.rolloutPercentage}
                onChange={(e) => setFormData({ ...formData, rolloutPercentage: parseInt(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
              >
                <option value={100}>100% (All Users)</option>
                <option value={50}>50% (Staged Testing)</option>
                <option value={25}>25% (Canary Pilot)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What does this feature enable in Self AI?"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="initialOn"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
            />
            <label htmlFor="initialOn" className="text-xs text-slate-300 cursor-pointer font-medium">
              Activate and turn ON immediately
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
              Create Feature
            </button>
          </div>
        </form>
      </Modal>

      {/* AI FEATURE AUTO-CREATOR & SYNTHESIZER MODAL */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="✨ Auto-Create & Deploy Feature with AI"
        subtitle="Tell the AI what feature you want in plain words. It will synthesize the specs, register endpoints, and inject it into your app."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>What feature do you want to add?</span>
              <span className="text-[10px] text-purple-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Autonomous Feature Synthesizer
              </span>
            </label>
            <textarea
              rows={2}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. I want to add a video feature from text to video or image to video..."
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-3 focus:outline-none focus:border-purple-500 leading-relaxed"
            />

            {/* Quick Inspiration Chips */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                'I want to add a video feature from text to video or image to video',
                'Neural Voice & Whisper audio transcription pipeline',
                'Autonomous Web Research & citation fact-checker',
                'Real-time Multilingual chat translator'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAiPrompt(chip);
                    handleSynthesizeAI(chip);
                  }}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors truncate max-w-[260px] ${
                    aiPrompt === chip
                      ? 'bg-purple-600/20 text-purple-300 border-purple-500/40 font-semibold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleSynthesizeAI()}
              disabled={isSynthesizing || !aiPrompt.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
            >
              {isSynthesizing ? (
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Wand2 className="w-3.5 h-3.5" />
              )}
              <span>{isSynthesizing ? 'Synthesizing Feature...' : 'Synthesize Specification'}</span>
            </button>
          </div>

          {/* Synthesized Proposal Box */}
          {proposal && (
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-3 animate-slide-in">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    AI Synthesized Feature Specification
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
                  Ready to Inject
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Feature Name</span>
                  <p className="font-bold text-white mt-0.5">{proposal.name}</p>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block">Feature Code Key</span>
                  <p className="font-mono text-purple-300 mt-0.5 font-semibold"><code>{proposal.key}</code></p>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block">Description</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{proposal.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Recommended AI Model</span>
                  <p className="text-indigo-400 font-semibold mt-0.5">{proposal.recommendedModel}</p>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block">Target API Endpoint</span>
                  <p className="font-mono text-emerald-400 mt-0.5 font-semibold">{proposal.endpoint}</p>
                </div>
              </div>

              {/* Code Snippet */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="flex items-center gap-1 font-mono text-[10px]">
                    <Code className="w-3 h-3 text-purple-400" />
                    <span>Auto-Generated Backend Contract</span>
                  </span>
                  <span className="text-[10px] text-slate-500">TypeScript / Node</span>
                </div>
                <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-purple-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                  {proposal.implementationCodeSnippet}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Canary Rollout by default</span>
                </span>

                <button
                  type="button"
                  onClick={handleDeploySynthesizedFeature}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <span>Approve & Inject Feature into App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
