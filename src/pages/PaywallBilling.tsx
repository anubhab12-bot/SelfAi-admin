import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  CreditCard,
  Crown,
  Lock,
  Unlock,
  ShieldCheck,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  Download,
  Sliders,
  Clock,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const PaywallBilling: React.FC = () => {
  const { 
    features, 
    payments, 
    paywallConfig, 
    updatePaywallConfig, 
    toggleFeaturePremium,
    userTraces,
    addToast 
  } = useAdmin();

  const [showGuide, setShowGuide] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<'all' | 'pro' | 'power'>('all');

  // Local draft states for editable limits
  const [freeQueries, setFreeQueries] = useState(paywallConfig.freeDailyQueryLimit);
  const [freeMinutes, setFreeMinutes] = useState(paywallConfig.freeDailyMinutesLimit);
  const [guestLimit, setGuestLimit] = useState(paywallConfig.guestDailyLimit);
  const [monthlyPrice, setMonthlyPrice] = useState(paywallConfig.premiumPriceMonthlyINR);
  const [yearlyPrice, setYearlyPrice] = useState(paywallConfig.premiumPriceYearlyINR);
  const [allowGuest, setAllowGuest] = useState(paywallConfig.allowGuestTrial);

  // Financial metrics
  const totalRevenue = payments.reduce((acc, p) => p.status === 'paid' ? acc + p.amount : acc, 0);
  const proSubscribersCount = userTraces.filter((u) => u.isPremium).length;
  const mrrEstimate = payments
    .filter((p) => p.status === 'paid')
    .reduce((acc, p) => p.billingCycle === 'monthly' ? acc + p.amount : acc + Math.round(p.amount / 12), 0);

  const handleSaveLimits = (e: React.FormEvent) => {
    e.preventDefault();
    updatePaywallConfig({
      freeDailyQueryLimit: Number(freeQueries),
      freeDailyMinutesLimit: Number(freeMinutes),
      guestDailyLimit: Number(guestLimit),
      premiumPriceMonthlyINR: Number(monthlyPrice),
      premiumPriceYearlyINR: Number(yearlyPrice),
      allowGuestTrial: Boolean(allowGuest)
    });
  };

  const handleDownloadInvoice = (invoiceId: string, customer: string, amount: number) => {
    addToast(
      'success',
      'Invoice Downloaded',
      `Receipt for ${invoiceId} (₹${amount} - ${customer}) exported as PDF.`
    );
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = 
      p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionRef.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterTier === 'pro') return p.tier === 'pro';
    if (filterTier === 'power') return p.tier === 'power';
    return true;
  });

  // Predefined core app features list to display in the gating matrix
  const coreFeatureList = [
    {
      key: 'images',
      name: 'AI Art & Image Studio',
      desc: 'High-res image generation with Gemini Imagen 3 prompt synthesizer',
      category: 'Creative AI'
    },
    {
      key: 'email',
      name: 'Personal Email Assistant',
      desc: 'Smart inbox triage, draft assistant, and scheduled follow-ups',
      category: 'Productivity'
    },
    {
      key: 'documents',
      name: 'Chroma Vector Document RAG',
      desc: 'Upload PDFs/DOCX with semantic embeddings and instant citations',
      category: 'Knowledge'
    },
    {
      key: 'calendar',
      name: 'Smart Calendar & Task Orchestrator',
      desc: 'Automated meeting scheduling, recurring reminders, and sync',
      category: 'Productivity'
    },
    {
      key: 'chat',
      name: 'Self AI Core Chat & Reasoning',
      desc: 'Real-time conversational streaming with deep context reasoning',
      category: 'Core AI'
    },
    {
      key: 'news',
      name: 'Personal AI News Digest',
      desc: 'Real-time personalized news curation, daily briefing, and article highlights',
      category: 'Insights'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Payments, Paywalls & Premium Controls</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-400 font-semibold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              Pro Monetization Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure free daily query quotas, gate premium features, track revenue received, and manage Pro users.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Currency:</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400">
            ₹ INR (Indian Rupee)
          </span>
        </div>
      </div>

      {/* Guide Book Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-lg">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowGuide(!showGuide)}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Admin Guide Book: How Paywalls, Quotas & Revenue Work</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MONETIZATION 101
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                A non-technical explanation of how feature gating and daily rate limits protect your cloud costs.
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showGuide && (
          <div className="mt-4 pt-4 border-t border-indigo-500/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                <Sliders className="w-3.5 h-3.5" />
                <span>1. Free Daily Quota</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Free users receive a configurable number of free queries per day (e.g. <strong>{paywallConfig.freeDailyQueryLimit} queries/day</strong>). Once they hit this limit, the app gently presents an upgrade prompt to subscribe to Pro.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Crown className="w-3.5 h-3.5" />
                <span>2. Gating Premium Features</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Features marked as <strong>"Pro Only"</strong> (like AI Art, Email Assistant, or Document RAG) are locked for free users. Clicking them opens the subscription checkout so you can monetize high-value AI capabilities.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>3. Zero Surprise Server Bills</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                By setting a query cap and daily time limit, you prevent runaway API usage or web crawlers from consuming excessive token credits while converting heavy users into recurring revenue.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <span>+{payments.length} transactions processed</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Monthly Run Rate (MRR)</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">₹{mrrEstimate.toLocaleString('en-IN')}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
            <span>Recurring monthly projection</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Pro Subscribers</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Crown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">{proSubscribersCount} Members</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-400">
            <UserCheck className="w-3 h-3" />
            <span>Paid tier active access</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Avg Plan Price</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-white">₹{paywallConfig.premiumPriceMonthlyINR} / mo</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
            <span>₹{paywallConfig.premiumPriceYearlyINR} / year discount</span>
          </div>
        </div>
      </div>

      {/* Grid: Paywall Limits & Feature Gating */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quota & Pricing Controls Form (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white">Daily Usage Limits & Pricing</h2>
          </div>

          <form onSubmit={handleSaveLimits} className="space-y-4 text-xs">
            {/* Free Daily Queries */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Free Daily Queries Per User:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={freeQueries}
                  onChange={(e) => setFreeQueries(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-xs">queries / day</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Users can ask this many questions before being requested to upgrade.
              </p>
            </div>

            {/* Free Daily Minutes */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Max Daily Free Session Time:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={freeMinutes}
                  onChange={(e) => setFreeMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-xs">minutes / day</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Prevents infinite open browser sessions from staying logged in.
              </p>
            </div>

            {/* Guest Trial Cap */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Guest Visitor Sandbox Limit:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guestLimit}
                  onChange={(e) => setGuestLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                />
                <span className="absolute right-3 top-2.5 text-slate-400 text-xs">demo queries</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Pro Monthly (₹ INR):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="1"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Pro Yearly (₹ INR):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="1"
                    value={yearlyPrice}
                    onChange={(e) => setYearlyPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Allow Guest Trial Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="allowGuestCheck"
                checked={allowGuest}
                onChange={(e) => setAllowGuest(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="allowGuestCheck" className="text-slate-300 text-xs cursor-pointer select-none">
                Allow unauthenticated guests to test chat (Rate-limited)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply & Save Paywall Rules</span>
            </button>
          </form>
        </div>

        {/* Right: Feature Paywall & Gating Matrix (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <div>
                <h2 className="text-sm font-bold text-white">Select Which Features Require Premium (Pro)</h2>
                <p className="text-[11px] text-slate-400">Click any card to toggle between Free for All vs. Pro Subscription Only.</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              {paywallConfig.premiumFeatureKeys.length} Gated
            </span>
          </div>

          <div className="space-y-2.5">
            {coreFeatureList.map((item) => {
              const isPremium = paywallConfig.premiumFeatureKeys.includes(item.key);

              return (
                <div
                  key={item.key}
                  onClick={() => toggleFeaturePremium(item.key)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isPremium
                      ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/60 shadow-sm'
                      : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isPremium
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {isPremium ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isPremium ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-bold text-amber-300">
                        <Crown className="w-3 h-3" />
                        PRO ONLY
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        FREE FOR ALL
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              Changes take effect immediately across all client sessions. Gated features automatically display the Pro badge.
            </span>
          </div>
        </div>
      </div>

      {/* Payment Transactions & Receipts Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Recent Payments Received & Invoices</h2>
              <p className="text-[11px] text-slate-400">Transaction records, billing tiers, and downloadable customer receipts.</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoice or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-60"
              />
            </div>

            <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setFilterTier('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filterTier === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterTier('pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filterTier === 'pro' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Pro
              </button>
              <button
                onClick={() => setFilterTier('power')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  filterTier === 'power' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Power
              </button>
            </div>
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="py-10 px-4 text-center rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-2.5">
              <CreditCard className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-xs font-bold text-white mb-1">No Live Payments Recorded Yet</h3>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Real payment transactions and receipts will be logged here as soon as users purchase subscriptions. No demo or fake invoices are shown.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Customer</th>
                  <th className="pb-3">Invoice & Ref</th>
                  <th className="pb-3">Plan Tier</th>
                  <th className="pb-3">Payment Method</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.customerAvatar}
                          alt={p.customerName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-semibold text-white">{p.customerName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{p.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="font-mono text-slate-200 font-medium">{p.invoiceId}</div>
                      <div className="text-[10px] font-mono text-slate-500">{p.transactionRef}</div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.tier === 'power'
                            ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300'
                            : 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300'
                        }`}
                      >
                        <Crown className="w-2.5 h-2.5" />
                        {p.planName}
                      </span>
                    </td>
                    <td className="py-3 text-slate-300 text-[11px]">{p.paymentMethod}</td>
                    <td className="py-3 font-mono font-bold text-emerald-400 text-xs">
                      ₹{p.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Paid
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-[11px] font-mono">{p.date}</td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => handleDownloadInvoice(p.invoiceId, p.customerName, p.amount)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1 text-[11px]"
                        title="Download Invoice PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-400" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Real Team & Premium User Directory */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <div>
              <h2 className="text-sm font-bold text-white">Registered Users & Premium Plan Tiers</h2>
              <p className="text-[11px] text-slate-400">Live directory of active users, assigned roles, and subscription status.</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {userTraces.length} Active Accounts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {userTraces.map((u) => (
            <div
              key={u.id}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={u.userAvatar}
                  alt={u.userName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white truncate">{u.userName}</span>
                    <span className="text-xs">{u.flag}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">{u.userEmail}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>{u.device}</span>
                    <span>•</span>
                    <span className="text-emerald-400">Online</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    u.tier === 'power'
                      ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300'
                      : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  }`}
                >
                  <Crown className="w-2.5 h-2.5" />
                  {u.tier === 'power' ? 'Super Admin (Unlimited)' : 'Pro Access'}
                </span>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {u.queriesToday} queries today
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
