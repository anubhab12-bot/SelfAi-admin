import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { AuditLogItem } from '../types';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  Clock, 
  ShieldCheck,
  Tag
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { auditLogs } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetResource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Audit Trail & Security Logs</h1>
            <Badge variant="primary" size="sm">{auditLogs.length} Events Logged</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident record of all feature toggles, permission elevations, and system operations.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by actor, action or resource..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="feature_flag">Feature Flags</option>
          <option value="rbac">RBAC & Roles</option>
          <option value="user">User Management</option>
          <option value="system">System & Fleet</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Actor (Admin)</th>
                <th className="py-3 px-3">Action</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Target Resource</th>
                <th className="py-3 px-3">Details</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{log.actor.name}</span>
                      <Badge role={log.actor.role} size="sm" />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[11px] font-bold text-indigo-300">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300 font-semibold">
                    {log.targetResource}
                  </td>
                  <td className="py-3 px-3 text-slate-400 max-w-xs truncate">
                    {log.details}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.ipAddress}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Inspect Event"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedLog && (
        <Modal
          isOpen={!!selectedLog}
          onClose={() => setSelectedLog(null)}
          title="Audit Log Event Inspection"
          subtitle={`Event ID: ${selectedLog.id}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500">Timestamp:</span>
                <p className="font-mono text-slate-300 mt-0.5">{selectedLog.timestamp}</p>
              </div>
              <div>
                <span className="text-slate-500">IP Address:</span>
                <p className="font-mono text-slate-300 mt-0.5">{selectedLog.ipAddress}</p>
              </div>
              <div>
                <span className="text-slate-500">Actor Name:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{selectedLog.actor.name}</p>
              </div>
              <div>
                <span className="text-slate-500">Actor Role:</span>
                <p className="mt-0.5"><Badge role={selectedLog.actor.role} size="sm" /></p>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400">Raw JSON Payload</span>
              <pre className="mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto">
                {JSON.stringify(selectedLog, null, 2)}
              </pre>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
