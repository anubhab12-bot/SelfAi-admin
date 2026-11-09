import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  Send, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Terminal, 
  Code, 
  Server, 
  ArrowRight, 
  Plus, 
  Trash2, 
  ExternalLink, 
  HelpCircle,
  RotateCw,
  Zap,
  Check,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { AgentStep, AgentTask, McpServer, McpTool } from '../types';
import { Modal } from '../components/common/Modal';

export const AgenticMcpStudio: React.FC = () => {
  const { 
    mcpServers, 
    addMcpServer, 
    removeMcpServer, 
    executeAgenticInjection, 
    features, 
    can, 
    addToast,
    setActiveTab,
    railwayUrl
  } = useAdmin();

  const [activeSubTab, setActiveSubTab] = useState<'agent' | 'mcp_servers'>('agent');
  const [prompt, setPrompt] = useState('Add a Stripe payment checkout gateway with customer billing history');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null);
  const [liveSteps, setLiveSteps] = useState<AgentStep[]>([]);
  const [showGuide, setShowGuide] = useState(true);

  // New MCP Server modal
  const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
  const [serverFormData, setServerFormData] = useState({
    name: '',
    description: '',
    transport: 'sse' as 'sse' | 'websocket' | 'stdio',
    url: ''
  });

  const featureSuggestions = [
    'Add a Stripe payment checkout gateway with customer billing history',
    'Add Voice Note audio recorder with Whisper speech transcription',
    'Add PDF document exporter with AI key takeaways summarizer',
    'Add Autonomous Web Research agent with live Google grounding',
    'Add Dark / Cyberpunk theme customizer for all user profiles'
  ];

  const handleRunAgent = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isRunning) return;

    setIsRunning(true);
    setLiveSteps([]);
    setActiveTask(null);

    try {
      const task = await executeAgenticInjection(prompt, (newStep) => {
        setLiveSteps((prev) => [...prev, newStep]);
      });
      setActiveTask(task);
    } catch (err: any) {
      addToast('error', 'Agent Execution Failed', err.message || 'Error running agentic pipeline');
    } finally {
      setIsRunning(false);
    }
  };

  const handleCreateServer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverFormData.name.trim() || !serverFormData.url.trim()) return;

    addMcpServer({
      name: serverFormData.name,
      description: serverFormData.description || 'Custom MCP Tool Server connected via Model Context Protocol.',
      transport: serverFormData.transport,
      url: serverFormData.url,
      tools: [
        {
          name: `${serverFormData.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_execute`,
          description: `Custom execution tool for ${serverFormData.name}`,
          serverName: serverFormData.name,
          inputSchema: { type: 'object', properties: { payload: { type: 'string' } } }
        }
      ]
    });

    setIsAddServerModalOpen(false);
    setServerFormData({ name: '', description: '', transport: 'sse', url: '' });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <span>Agentic AI & Model Context Protocol (MCP) Studio</span>
            </h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Autonomous Agentic Engineer that writes code, calls MCP tools, and directly injects any feature you want into your app.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => setActiveSubTab('agent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'agent'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Agentic Engineer</span>
            </button>
            <button
              onClick={() => setActiveSubTab('mcp_servers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'mcp_servers'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>MCP Servers ({mcpServers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 💡 Plain-English Guide */}
      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              How Agentic AI & MCP Directly Injects Features Into Your Main App
            </h3>
          </div>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
          >
            {showGuide ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-emerald-500/10">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-[10px]">1</span>
                <span>Type Any Feature Request</span>
              </strong>
              <p className="text-[11px] text-slate-400">
                You don't need to write code. Ask for <em>anything</em> (e.g. Stripe payments, voice notes, PDF export, or video tools).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-[10px]">2</span>
                <span>Autonomous MCP Execution</span>
              </strong>
              <p className="text-[11px] text-slate-400">
                The AI loops through Model Context Protocol tools: inspects your backend schema, writes the component, and configures the API contract.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block mb-0.5 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
                <span>Direct Live Injection</span>
              </strong>
              <p className="text-[11px] text-slate-400">
                The agent directly writes the new feature into your live feature registry with 100% rollout. It is immediately toggleable and active in your app.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 2. SUBTAB CONTENT */}
      {activeSubTab === 'agent' ? (
        <div className="space-y-6">
          {/* Prompt & Control Console */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <form onSubmit={handleRunAgent} className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Feature You Want Directly Added into Main App</span>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-ping" />
                  Target App: frontend-production-0c17e.up.railway.app
                </span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe whatever feature you want to add into the app..."
                  className="flex-1 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  disabled={isRunning || !prompt.trim()}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all shrink-0 cursor-pointer"
                >
                  {isRunning ? (
                    <RotateCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>{isRunning ? 'Agent Executing...' : 'Execute Agentic Injection'}</span>
                </button>
              </div>

              {/* Suggestions Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {featureSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(s);
                    }}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors truncate max-w-[280px] ${
                      prompt === s
                        ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Agent Execution Terminal / Output */}
          {(isRunning || liveSteps.length > 0) && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    Agentic Execution & MCP Tool Call Stream
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
                  <span className="text-slate-400">{isRunning ? 'Running Tool Loop' : 'Execution Completed'}</span>
                </div>
              </div>

              {/* Step by Step Feed */}
              <div className="space-y-3 font-mono text-xs">
                {liveSteps.map((step) => {
                  if (step.type === 'thought') {
                    return (
                      <div key={step.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                        <Bot className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-bold uppercase mb-0.5">
                            <span>Agent Thought</span>
                            <span className="text-slate-500 font-normal">{step.timestamp}</span>
                          </div>
                          <p className="text-slate-200 leading-relaxed font-sans text-xs">{step.content}</p>
                        </div>
                      </div>
                    );
                  }

                  if (step.type === 'tool_call') {
                    return (
                      <div key={step.id} className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-start gap-2.5">
                        <Zap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[10px] text-purple-300 font-bold uppercase mb-1">
                            <span>MCP Tool Call: <code>{step.toolName}</code></span>
                            <span className="text-slate-500 font-normal">{step.timestamp}</span>
                          </div>
                          <p className="text-slate-300 font-sans text-xs mb-1.5">{step.content}</p>
                          {step.payload && (
                            <pre className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-purple-300 overflow-x-auto">
                              {JSON.stringify(step.payload, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (step.type === 'tool_result') {
                    return (
                      <div key={step.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[10px] text-teal-300 font-bold uppercase mb-1">
                            <span>MCP Tool Observation</span>
                            <span className="text-slate-500 font-normal">{step.timestamp}</span>
                          </div>
                          <p className="text-slate-300 font-sans text-xs mb-1">{step.content}</p>
                          {step.payload && (
                            <pre className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-teal-300 overflow-x-auto">
                              {JSON.stringify(step.payload, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    );
                  }

                  if (step.type === 'injection') {
                    return (
                      <div key={step.id} className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase mb-1">
                            <span>Direct Runtime Injection Confirmed</span>
                            <span className="text-slate-500 font-normal text-[10px]">{step.timestamp}</span>
                          </div>
                          <p className="text-white font-sans text-xs font-semibold mb-2">{step.content}</p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              Live in /api/features
                            </span>
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                              100% Rollout
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Injected Feature Showcase & Test Widget */}
              {activeTask?.createdFeature && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Injected Feature Live Playground</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('features')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <span>View in Feature Controls ({features.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Injected Feature Card */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{activeTask.createdFeature.name}</h4>
                        <p className="text-xs text-slate-300 mt-0.5">{activeTask.createdFeature.description}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        ONLINE & INJECTED
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Key: <code>{activeTask.createdFeature.key}</code></span>
                      <span>Target: {railwayUrl}</span>
                    </div>
                  </div>

                  {/* Code Inspection */}
                  {activeTask.generatedCode && (
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="flex items-center gap-1 font-mono text-[10px]">
                          <Code className="w-3 h-3 text-emerald-400" />
                          <span>Generated Production Code Module</span>
                        </span>
                      </div>
                      <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                        {activeTask.generatedCode}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* MCP SERVERS REGISTRY SUBTAB */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Model Context Protocol (MCP) Servers</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Active MCP endpoints providing tools, context, and execution capabilities to the autonomous agent.
              </p>
            </div>

            <button
              onClick={() => setIsAddServerModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect MCP Server</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mcpServers.map((server) => (
              <div key={server.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <h3 className="text-xs font-bold text-white">{server.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-bold bg-slate-800 text-slate-400">
                      {server.transport}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{server.description}</p>
                  
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-850 font-mono text-[10px] text-slate-400 truncate mb-2">
                    {server.url}
                  </div>

                  {/* Available Tools */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Provided Tools ({server.tools.length}):
                    </span>
                    <div className="space-y-1">
                      {server.tools.map((t) => (
                        <div key={t.name} className="p-1.5 rounded bg-slate-950/70 border border-slate-850 text-[11px] text-slate-300">
                          <code className="text-emerald-400 font-bold text-[10px] block">{t.name}</code>
                          <span className="text-[10px] text-slate-400 block line-clamp-1">{t.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Ping: <strong className="text-emerald-400 font-mono">{server.lastPing}</strong></span>
                  {server.id !== 'mcp-selfai-core' && (
                    <button
                      onClick={() => removeMcpServer(server.id)}
                      className="text-slate-500 hover:text-rose-400"
                      title="Disconnect MCP server"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connect MCP Server Modal */}
      <Modal
        isOpen={isAddServerModalOpen}
        onClose={() => setIsAddServerModalOpen(false)}
        title="Connect Model Context Protocol (MCP) Server"
        subtitle="Connect an external MCP server to expand the Agentic AI's tool capabilities."
        maxWidth="md"
      >
        <form onSubmit={handleCreateServer} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Server Name</label>
            <input
              type="text"
              required
              value={serverFormData.name}
              onChange={(e) => setServerFormData({ ...serverFormData, name: e.target.value })}
              placeholder="e.g. Stripe Billing MCP Server"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Transport</label>
              <select
                value={serverFormData.transport}
                onChange={(e) => setServerFormData({ ...serverFormData, transport: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
              >
                <option value="sse">Server-Sent Events (SSE)</option>
                <option value="websocket">WebSocket (WS)</option>
                <option value="stdio">Standard I/O (STDIO)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Endpoint URL</label>
              <input
                type="text"
                required
                value={serverFormData.url}
                onChange={(e) => setServerFormData({ ...serverFormData, url: e.target.value })}
                placeholder="https://.../mcp"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={serverFormData.description}
              onChange={(e) => setServerFormData({ ...serverFormData, description: e.target.value })}
              placeholder="What tools or data does this MCP server provide?"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddServerModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:bg-slate-850"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30"
            >
              Connect MCP Server
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};