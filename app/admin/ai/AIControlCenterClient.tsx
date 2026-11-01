// app/admin/ai/AIControlCenterClient.tsx — Institutional AI Control Center Client

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Key,
  Route,
  BookOpen,
  Activity,
  Plus,
  Trash2,
  Play,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Zap,
  Lock,
  Layers,
  FileText,
  Search,
} from 'lucide-react';

interface AIControlCenterClientProps {
  adminEmail: string;
}

type TabKey = 'overview' | 'credentials' | 'routing' | 'knowledge' | 'audit';

interface OverviewData {
  totalRequests: number;
  successRequests: number;
  errorRequests: number;
  fallbackRequests: number;
  avgLatencyMs: number;
  activeProvidersCount: number;
  totalProvidersCount: number;
  activeCredentialsCount: number;
  totalCredentialsCount: number;
  knowledgeDocsCount: number;
  knowledgeChunksCount: number;
  killSwitchActive: boolean;
  recentLogs: Array<{
    id: string;
    task: string;
    provider: string;
    model: string;
    status: string;
    latencyMs: number;
    fallbackUsed: boolean;
    errorCategory?: string;
    createdAt: string;
  }>;
}

interface CredentialItem {
  id: string;
  providerId: 'gemini' | 'groq';
  providerLabel: string;
  label: string;
  maskedKey: string;
  priority: number;
  enabled: boolean;
  status: string;
  requestLimitPerMinute?: number;
  lastTestedAt?: string;
  lastUsedAt?: string;
  lastErrorCode?: string;
  totalRequests: number;
  totalSuccess: number;
  totalErrors: number;
}

interface RouteItem {
  taskKey: string;
  name: string;
  description?: string;
  primaryProvider: 'gemini' | 'groq';
  primaryModel: string;
  fallbackProvider?: 'gemini' | 'groq' | null;
  fallbackModel?: string | null;
  enabled: boolean;
  temperature: number;
  maxTokens: number;
}

interface KnowledgeDocItem {
  id: string;
  title: string;
  sourceUrl?: string;
  sourceType: string;
  category: string;
  status: string;
  chunkCount: number;
  lastIndexedAt?: string;
}

export default function AIControlCenterClient({ adminEmail }: AIControlCenterClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Data states
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [credentials, setCredentials] = useState<CredentialItem[]>([]);
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [documents, setDocuments] = useState<KnowledgeDocItem[]>([]);

  // Testing states
  const [testingCredId, setTestingCredId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<Record<string, { success: boolean; latencyMs: number; error?: string }>>({});

  // Add Credential Modal
  const [showAddCredModal, setShowAddCredModal] = useState(false);
  const [newCredProvider, setNewCredProvider] = useState<'gemini' | 'groq'>('gemini');
  const [newCredLabel, setNewCredLabel] = useState('');
  const [newCredApiKey, setNewCredApiKey] = useState('');
  const [newCredPriority, setNewCredPriority] = useState(1);
  const [submittingCred, setSubmittingCred] = useState(false);

  // Add Document Modal
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('general');
  const [newDocContent, setNewDocContent] = useState('');
  const [submittingDoc, setSubmittingDoc] = useState(false);
  const [reindexing, setReindexing] = useState(false);

  // Search filter for knowledge docs
  const [docFilter, setDocFilter] = useState('');

  const fetchOverview = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/ai/overview', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) setOverview(json.data);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchCredentials = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/ai/credentials', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) setCredentials(json.credentials);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchRoutes = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/ai/routes', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) setRoutes(json.routes);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/ai/knowledge', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success) setDocuments(json.documents);
      }
    } catch {
      // ignore
    }
  }, []);

  const reloadAll = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchOverview(), fetchCredentials(), fetchRoutes(), fetchDocuments()]);
    setRefreshing(false);
  }, [fetchOverview, fetchCredentials, fetchRoutes, fetchDocuments]);

  useEffect(() => {
    reloadAll().then(() => setLoading(false));
  }, [reloadAll]);

  // Handle Kill Switch
  const toggleKillSwitch = async (active: boolean) => {
    try {
      const res = await fetch('/api/admin/ai/kill-switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      });
      if (res.ok) {
        setMessage({
          text: active ? 'Emergency AI Kill-Switch activated. All AI calls halted.' : 'AI Kill-Switch deactivated. Normal operations resumed.',
          type: active ? 'error' : 'success',
        });
        fetchOverview();
      }
    } catch {
      setMessage({ text: 'Failed to toggle kill-switch', type: 'error' });
    }
  };

  // Handle Add Credential
  const handleAddCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCredLabel || !newCredApiKey) return;

    setSubmittingCred(true);
    try {
      const res = await fetch('/api/admin/ai/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: newCredProvider,
          label: newCredLabel,
          apiKey: newCredApiKey,
          priority: newCredPriority,
        }),
      });

      if (res.ok) {
        setMessage({ text: 'Credential encrypted and saved securely.', type: 'success' });
        setShowAddCredModal(false);
        setNewCredLabel('');
        setNewCredApiKey('');
        fetchCredentials();
        fetchOverview();
      } else {
        const err = await res.json();
        setMessage({ text: err.error || 'Failed to add credential', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Error connecting to server', type: 'error' });
    } finally {
      setSubmittingCred(false);
    }
  };

  // Test Credential
  const handleTestCredential = async (id: string) => {
    setTestingCredId(id);
    try {
      const res = await fetch(`/api/admin/ai/credentials/${id}/test`, { method: 'POST' });
      const json = await res.json();
      setTestResult((prev) => ({
        ...prev,
        [id]: {
          success: Boolean(json.success),
          latencyMs: json.latencyMs || 0,
          error: json.error,
        },
      }));
      fetchCredentials();
    } catch {
      setTestResult((prev) => ({
        ...prev,
        [id]: { success: false, latencyMs: 0, error: 'Network test failed' },
      }));
    } finally {
      setTestingCredId(null);
    }
  };

  // Delete Credential
  const handleDeleteCredential = async (id: string) => {
    if (!window.confirm('Delete this encrypted credential from the database?')) return;
    try {
      const res = await fetch(`/api/admin/ai/credentials?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ text: 'Credential deleted successfully.', type: 'success' });
        fetchCredentials();
        fetchOverview();
      }
    } catch {
      setMessage({ text: 'Failed to delete credential', type: 'error' });
    }
  };

  // Toggle Credential Enabled
  const handleToggleCredential = async (id: string, currentEnabled: boolean) => {
    try {
      const res = await fetch(`/api/admin/ai/credentials/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !currentEnabled }),
      });
      if (res.ok) {
        fetchCredentials();
        fetchOverview();
      }
    } catch {
      // ignore
    }
  };

  // Save Route
  const handleSaveRoute = async (route: RouteItem) => {
    try {
      const res = await fetch('/api/admin/ai/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(route),
      });
      if (res.ok) {
        setMessage({ text: `Routing updated for "${route.name}".`, type: 'success' });
        fetchRoutes();
      }
    } catch {
      setMessage({ text: 'Failed to update route.', type: 'error' });
    }
  };

  // Trigger Website Re-Index
  const handleReindexWebsite = async () => {
    setReindexing(true);
    try {
      const res = await fetch('/api/admin/ai/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reindex_website' }),
      });
      if (res.ok) {
        const json = await res.json();
        setMessage({
          text: `Website indexing complete. ${json.result?.totalIndexed || 0} pages indexed into ${json.result?.totalChunks || 0} chunks.`,
          type: 'success',
        });
        fetchDocuments();
        fetchOverview();
      }
    } catch {
      setMessage({ text: 'Failed to re-index website.', type: 'error' });
    } finally {
      setReindexing(false);
    }
  };

  // Add Manual Document
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle || !newDocContent) return;

    setSubmittingDoc(true);
    try {
      const res = await fetch('/api/admin/ai/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newDocTitle,
          category: newDocCategory,
          content: newDocContent,
          sourceType: 'ADMIN_UPLOAD',
        }),
      });

      if (res.ok) {
        setMessage({ text: 'Knowledge document indexed successfully.', type: 'success' });
        setShowAddDocModal(false);
        setNewDocTitle('');
        setNewDocContent('');
        fetchDocuments();
        fetchOverview();
      }
    } catch {
      setMessage({ text: 'Failed to ingest document.', type: 'error' });
    } finally {
      setSubmittingDoc(false);
    }
  };

  const filteredDocs = documents.filter((d) =>
    (d.title + ' ' + d.category + ' ' + (d.sourceUrl || '')).toLowerCase().includes(docFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                AI Control Center
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-mono">
                  v2.0 Architecture
                </span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Centralized Multi-Provider Gateway • AES-256-GCM Credential Security • Grounded RAG Knowledge
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={reloadAll}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary/80 hover:bg-secondary text-foreground border border-border/60 transition"
          >
            <RotateCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-teal-400' : ''}`} />
            Refresh Telemetry
          </button>

          {overview?.killSwitchActive ? (
            <button
              onClick={() => toggleKillSwitch(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
            >
              <Zap className="h-3.5 w-3.5" />
              Resume AI Operations
            </button>
          ) : (
            <button
              onClick={() => toggleKillSwitch(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-rose-600/90 hover:bg-rose-500 text-white transition shadow-sm"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Emergency Kill-Switch
            </button>
          )}
        </div>
      </div>

      {/* Global Kill Switch Alert */}
      {overview?.killSwitchActive && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/40 p-4 text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold">EMERGENCY KILL-SWITCH IS CURRENTLY ACTIVE</p>
              <p className="text-xs text-rose-300/80">
                All platform AI inferences (Gemini & Groq) are paused. Public queries gracefully fall back to local deterministic and extractive knowledge.
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleKillSwitch(false)}
            className="px-3 py-1 rounded bg-rose-700 hover:bg-rose-600 text-xs font-bold text-white transition shrink-0"
          >
            Reactivate Now
          </button>
        </div>
      )}

      {/* Notification Toast */}
      {message && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-muted-foreground hover:text-white ml-4">
            ×
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-1 border-b border-border/50 pb-px">
        {[
          { key: 'overview', label: 'System Overview & Telemetry', icon: Activity },
          { key: 'credentials', label: 'Providers & Multi-Credentials', icon: Key },
          { key: 'routing', label: 'Task Routing Engine', icon: Route },
          { key: 'knowledge', label: 'Knowledge Intelligence Base', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition -mb-px ${
                isActive
                  ? 'border-teal-400 text-teal-300 bg-teal-500/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ─── TAB 1: SYSTEM OVERVIEW & TELEMETRY ─── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Total Inferences</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {overview?.totalRequests.toLocaleString() ?? '—'}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <CheckCircle2 className="h-3 w-3" />
                {overview ? Math.round((overview.successRequests / Math.max(1, overview.totalRequests)) * 100) : 0}% success rate
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Average Latency</span>
              <div className="text-2xl font-bold font-mono text-teal-400 mt-1">
                {overview?.avgLatencyMs ? `${overview.avgLatencyMs}ms` : '—'}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                Across Gemini & Groq calls
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Active Keys</span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {overview?.activeCredentialsCount ?? 0}
                <span className="text-xs text-muted-foreground font-normal"> / {overview?.totalCredentialsCount ?? 0}</span>
              </div>
              <div className="text-[11px] text-teal-400 mt-1 font-mono">
                AES-256-GCM Encrypted
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Knowledge Chunks</span>
              <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                {overview?.knowledgeChunksCount.toLocaleString() ?? '0'}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                From {overview?.knowledgeDocsCount ?? 0} indexed documents
              </div>
            </div>
          </div>

          {/* Recent Inferences Table */}
          <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-teal-400" />
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                  Live AI Usage Logs (Telemetry)
                </h3>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">
                Real database records only • Zero mock data
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-secondary/40 text-muted-foreground border-b border-border/40">
                  <tr>
                    <th className="py-2.5 px-4">Task</th>
                    <th className="py-2.5 px-4">Provider</th>
                    <th className="py-2.5 px-4">Model</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Latency</th>
                    <th className="py-2.5 px-4">Fallback</th>
                    <th className="py-2.5 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {overview?.recentLogs && overview.recentLogs.length > 0 ? (
                    overview.recentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-secondary/20 transition">
                        <td className="py-2.5 px-4 font-semibold text-foreground">{log.task}</td>
                        <td className="py-2.5 px-4 uppercase text-teal-400">{log.provider}</td>
                        <td className="py-2.5 px-4 text-muted-foreground">{log.model}</td>
                        <td className="py-2.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.status === 'SUCCESS'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : log.status === 'FALLBACK_TRIGGERED'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-foreground">{log.latencyMs}ms</td>
                        <td className="py-2.5 px-4">
                          {log.fallbackUsed ? (
                            <span className="text-amber-400 font-bold">YES</span>
                          ) : (
                            <span className="text-muted-foreground">NO</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-muted-foreground">
                          {new Date(log.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-muted-foreground font-sans">
                        No AI inference logs recorded yet. Once users interact with Ask Kunwar, Company Intelligence, or Placement War Room, live telemetry appears here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: PROVIDERS & MULTI-CREDENTIAL MANAGEMENT ─── */}
      {activeTab === 'credentials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="h-4 w-4 text-teal-400" />
                Multi-Credential Provider Management
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure multiple API keys per provider. Secrets are encrypted with AES-256-GCM. Raw keys are never stored in plaintext or sent to the browser.
              </p>
            </div>

            <button
              onClick={() => setShowAddCredModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-teal-600 hover:bg-teal-500 text-white transition shadow-sm shrink-0"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Provider Credential
            </button>
          </div>

          {/* Credentials List */}
          <div className="space-y-4">
            {credentials.length > 0 ? (
              credentials.map((cred) => {
                const testState = testResult[cred.id];
                const isTesting = testingCredId === cred.id;

                return (
                  <div
                    key={cred.id}
                    className="p-4 rounded-xl border border-border/60 bg-card/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary text-foreground border border-border/80 font-mono">
                          {cred.providerId}
                        </span>
                        <h4 className="text-sm font-semibold text-white">{cred.label}</h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                            cred.enabled && cred.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : cred.status === 'RATE_LIMITED'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {cred.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1 text-teal-300 bg-teal-950/40 px-2 py-0.5 rounded border border-teal-800/40">
                          <Lock className="h-3 w-3" />
                          {cred.maskedKey}
                        </span>
                        <span>Priority: <strong className="text-foreground">{cred.priority}</strong></span>
                        <span>Limit: <strong className="text-foreground">{cred.requestLimitPerMinute || 60}/min</strong></span>
                        <span>Requests: <strong className="text-foreground">{cred.totalRequests}</strong></span>
                        <span>Errors: <strong className="text-foreground">{cred.totalErrors}</strong></span>
                      </div>

                      {testState && (
                        <div
                          className={`text-xs mt-2 flex items-center gap-1.5 font-mono ${
                            testState.success ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {testState.success ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Live connection verified ({testState.latencyMs}ms)
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" />
                              Connection test failed: {testState.error}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleTestCredential(cred.id)}
                        disabled={isTesting}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-secondary hover:bg-secondary/80 text-foreground border border-border transition"
                      >
                        <Play className={`h-3 w-3 ${isTesting ? 'animate-spin text-teal-400' : ''}`} />
                        {isTesting ? 'Testing...' : 'Test Connection'}
                      </button>

                      <button
                        onClick={() => handleToggleCredential(cred.id, cred.enabled)}
                        className={`px-3 py-1.5 text-xs font-medium rounded border transition ${
                          cred.enabled
                            ? 'bg-amber-950/20 text-amber-300 border-amber-800/40 hover:bg-amber-950/40'
                            : 'bg-emerald-950/20 text-emerald-300 border-emerald-800/40 hover:bg-emerald-950/40'
                        }`}
                      >
                        {cred.enabled ? 'Disable' : 'Enable'}
                      </button>

                      <button
                        onClick={() => handleDeleteCredential(cred.id)}
                        className="p-1.5 text-xs font-medium rounded bg-rose-950/20 text-rose-400 border border-rose-800/40 hover:bg-rose-950/50 transition"
                        title="Delete credential"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-border/80 text-center">
                <Key className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <h3 className="text-sm font-semibold text-white">No Database Credentials Stored</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  Click &ldquo;Add Provider Credential&rdquo; to configure your Google Gemini and Groq API keys with AES-256-GCM encryption. You can add multiple keys per provider for non-random priority and failover.
                </p>
                <button
                  onClick={() => setShowAddCredModal(true)}
                  className="mt-4 px-4 py-2 text-xs font-semibold rounded bg-teal-600 hover:bg-teal-500 text-white transition"
                >
                  Add First Credential
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 3: TASK ROUTING ENGINE ─── */}
      {activeTab === 'routing' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Route className="h-4 w-4 text-teal-400" />
              Task-Specific Model Routing & Failover
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Assign primary and fallback AI providers and models per platform task. If primary encounters a 429 rate-limit or network timeout, the gateway performs max 1 failover to fallback.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {routes.map((route, i) => (
              <div
                key={route.taskKey}
                className="p-5 rounded-xl border border-border/60 bg-card/60 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/30 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="font-mono text-teal-400">#{i + 1}</span> {route.name}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                        {route.taskKey}
                      </span>
                    </h3>
                    {route.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{route.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={route.enabled}
                        onChange={(e) => {
                          const updated = { ...route, enabled: e.target.checked };
                          setRoutes((prev) => prev.map((r) => (r.taskKey === route.taskKey ? updated : r)));
                        }}
                        className="rounded border-border text-teal-500 focus:ring-teal-500/20"
                      />
                      Task Enabled
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-muted-foreground mb-1 font-mono uppercase tracking-wider text-[10px]">
                      Primary Provider
                    </label>
                    <select
                      value={route.primaryProvider}
                      onChange={(e) => {
                        const updated = { ...route, primaryProvider: e.target.value as 'gemini' | 'groq' };
                        setRoutes((prev) => prev.map((r) => (r.taskKey === route.taskKey ? updated : r)));
                      }}
                      className="w-full bg-secondary border border-border rounded px-2.5 py-1.5 text-foreground"
                    >
                      <option value="gemini">Google Gemini</option>
                      <option value="groq">Groq</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-1 font-mono uppercase tracking-wider text-[10px]">
                      Primary Model
                    </label>
                    <input
                      type="text"
                      value={route.primaryModel}
                      onChange={(e) => {
                        const updated = { ...route, primaryModel: e.target.value };
                        setRoutes((prev) => prev.map((r) => (r.taskKey === route.taskKey ? updated : r)));
                      }}
                      className="w-full bg-secondary border border-border rounded px-2.5 py-1.5 text-foreground font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-1 font-mono uppercase tracking-wider text-[10px]">
                      Fallback Provider
                    </label>
                    <select
                      value={route.fallbackProvider || ''}
                      onChange={(e) => {
                        const updated = { ...route, fallbackProvider: (e.target.value as 'gemini' | 'groq') || null };
                        setRoutes((prev) => prev.map((r) => (r.taskKey === route.taskKey ? updated : r)));
                      }}
                      className="w-full bg-secondary border border-border rounded px-2.5 py-1.5 text-foreground"
                    >
                      <option value="">(None / No Failover)</option>
                      <option value="groq">Groq</option>
                      <option value="gemini">Google Gemini</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-1 font-mono uppercase tracking-wider text-[10px]">
                      Fallback Model
                    </label>
                    <input
                      type="text"
                      value={route.fallbackModel || ''}
                      onChange={(e) => {
                        const updated = { ...route, fallbackModel: e.target.value };
                        setRoutes((prev) => prev.map((r) => (r.taskKey === route.taskKey ? updated : r)));
                      }}
                      placeholder="e.g. llama-3.3-70b-versatile"
                      className="w-full bg-secondary border border-border rounded px-2.5 py-1.5 text-foreground font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleSaveRoute(route)}
                    className="px-3.5 py-1.5 rounded bg-teal-600/90 hover:bg-teal-500 text-white font-medium text-xs transition"
                  >
                    Save Route Changes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: KNOWLEDGE INTELLIGENCE BASE ─── */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-teal-400" />
                Knowledge Intelligence Base (RAG)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Indexes published website content, tools, PGDM courses, research reports, and custom admin documents.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleReindexWebsite}
                disabled={reindexing}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-secondary hover:bg-secondary/80 text-foreground border border-border transition"
              >
                <RotateCw className={`h-3.5 w-3.5 ${reindexing ? 'animate-spin text-teal-400' : ''}`} />
                {reindexing ? 'Re-Indexing...' : 'Re-Index Entire Website'}
              </button>

              <button
                onClick={() => setShowAddDocModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-teal-600 hover:bg-teal-500 text-white transition shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Document
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter knowledge documents by title, category, or URL..."
              value={docFilter}
              onChange={(e) => setDocFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-xs text-foreground focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Documents Table */}
          <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-secondary/40 text-muted-foreground border-b border-border/40">
                <tr>
                  <th className="py-2.5 px-4">Document Title</th>
                  <th className="py-2.5 px-4">Source Type</th>
                  <th className="py-2.5 px-4">Category</th>
                  <th className="py-2.5 px-4">Chunks</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Last Indexed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-secondary/20 transition">
                      <td className="py-2.5 px-4 font-sans font-semibold text-foreground max-w-xs truncate">
                        {doc.title}
                        {doc.sourceUrl && (
                          <span className="block text-[10px] font-mono text-muted-foreground truncate">
                            {doc.sourceUrl}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground border border-border/60">
                          {doc.sourceType}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 uppercase text-teal-400">{doc.category}</td>
                      <td className="py-2.5 px-4 text-purple-300 font-bold">{doc.chunkCount}</td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-muted-foreground">
                        {doc.lastIndexedAt ? new Date(doc.lastIndexedAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground font-sans">
                      No matching documents found. Click &ldquo;Re-Index Entire Website&rdquo; to ingest all published research, calculators, and curriculum.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD CREDENTIAL ─── */}
      {showAddCredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="h-4 w-4 text-teal-400" />
                Add Provider API Credential
              </h3>
              <button
                onClick={() => setShowAddCredModal(false)}
                className="text-muted-foreground hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCredential} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  AI Provider
                </label>
                <select
                  value={newCredProvider}
                  onChange={(e) => setNewCredProvider(e.target.value as 'gemini' | 'groq')}
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground"
                >
                  <option value="gemini">Google Gemini</option>
                  <option value="groq">Groq</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  Credential Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Gemini Production Key 1"
                  value={newCredLabel}
                  onChange={(e) => setNewCredLabel(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground font-mono"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  Raw API Key (Encrypted with AES-256-GCM)
                </label>
                <input
                  type="password"
                  placeholder="Paste secret key here..."
                  value={newCredApiKey}
                  onChange={(e) => setNewCredApiKey(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground font-mono"
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  The key is immediately encrypted before persisting. It will only be displayed as masked (e.g. gsk_••••1234) thereafter.
                </p>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  Priority (1 = Highest)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={newCredPriority}
                  onChange={(e) => setNewCredPriority(parseInt(e.target.value, 10) || 1)}
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setShowAddCredModal(false)}
                  className="px-3 py-1.5 rounded border border-border text-muted-foreground hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingCred}
                  className="px-4 py-1.5 rounded bg-teal-600 hover:bg-teal-500 text-white font-semibold transition"
                >
                  {submittingCred ? 'Encrypting & Saving...' : 'Save Credential'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD KNOWLEDGE DOCUMENT ─── */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-teal-400" />
                Add Knowledge Document (RAG)
              </h3>
              <button
                onClick={() => setShowAddDocModal(false)}
                className="text-muted-foreground hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  Document Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q3 2026 Indian Banking Sector Review"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground font-sans"
                />
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  Category
                </label>
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value)}
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground"
                >
                  <option value="research">Research</option>
                  <option value="markets">Markets</option>
                  <option value="tools">Tools & Calculators</option>
                  <option value="pgdm">PGDM & Curriculum</option>
                  <option value="placement">Placement War Room</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground mb-1 font-mono uppercase text-[10px]">
                  Document Content (Markdown / Text / CSV)
                </label>
                <textarea
                  rows={8}
                  placeholder="Paste document text or notes here. Content will be automatically split into grounded semantic chunks."
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  required
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-foreground font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-3 py-1.5 rounded border border-border text-muted-foreground hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDoc}
                  className="px-4 py-1.5 rounded bg-teal-600 hover:bg-teal-500 text-white font-semibold transition"
                >
                  {submittingDoc ? 'Chunking & Indexing...' : 'Index Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

