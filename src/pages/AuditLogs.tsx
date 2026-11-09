import React, { useState, useMemo, useEffect } from 'react';
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
  Tag,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  ArrowUpDown
} from 'lucide-react';

export const AuditLogs: React.FC = () => {
  const { auditLogs } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Reset to page 1 whenever search, filters, or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter, pageSize]);

  // Filter & Sort logs
  const filteredLogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = auditLogs.filter((log) => {
      const matchesSearch = !q ||
        log.action.toLowerCase().includes(q) ||
        log.targetResource.toLowerCase().includes(q) ||
        log.actor.name.toLowerCase().includes(q) ||
        log.actor.email.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.ipAddress.toLowerCase().includes(q);

      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    result.sort((a, b) => {
      const timeA = new Date(a.timestamp.replace(' ', 'T')).getTime() || 0;
      const timeB = new Date(b.timestamp.replace(' ', 'T')).getTime() || 0;
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [auditLogs, searchQuery, categoryFilter, statusFilter, sortOrder]);

  // Pagination calculations
  const totalItems = filteredLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  // Helper for smart page numbers (1 ... 4 5 6 ... 12)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // CSV export handler
  const exportToCSV = () => {
    const headers = ['ID', 'Timestamp', 'Actor Name', 'Actor Email', 'Actor Role', 'Action', 'Category', 'Target Resource', 'Details', 'IP Address', 'Status'];
    const rows = filteredLogs.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.actor.name}"`,
      `"${l.actor.email}"`,
      `"${l.actor.role}"`,
      `"${l.action}"`,
      `"${l.category}"`,
      `"${l.targetResource.replace(/"/g, '""')}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.ipAddress}"`,
      `"${l.status}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `selfai-audit-trail-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Audit Trail & Security Logs</h1>
            <Badge variant="primary" size="sm">{auditLogs.length} Events Total</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident record of all feature toggles, permission elevations, paywall updates, and system operations.
          </p>
        </div>

        {/* Quick CSV Export */}
        <button
          onClick={exportToCSV}
          disabled={filteredLogs.length === 0}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          title="Export filtered events as CSV file"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export CSV ({filteredLogs.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by actor, action, resource, or IP..."
            className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="system">System & Fleet</option>
            <option value="rbac">RBAC & Roles</option>
            <option value="feature_flag">Feature Flags</option>
            <option value="auth">Authentication</option>
            <option value="user">User Management</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="failed">Failed</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={() => setSortOrder(s => s === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={`Sorted: ${sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Actor (Admin)</th>
                <th className="py-3 px-3">Action</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Target Resource</th>
                <th className="py-3 px-3">Details</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {log.status === 'success' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>OK</span>
                        </span>
                      )}
                      {log.status === 'warning' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Warn</span>
                        </span>
                      )}
                      {log.status === 'failed' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Fail</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{log.actor.name}</span>
                        <Badge role={log.actor.role} size="sm" />
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-mono text-[11px] font-bold text-indigo-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300 font-semibold whitespace-nowrap">
                      {log.targetResource}
                    </td>
                    <td className="py-3 px-3 text-slate-400 max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Inspect Event"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-60" />
                    <p className="text-sm font-semibold text-slate-300">No audit events match your search</p>
                    <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching for another term.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Info & Rows per page */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{totalItems === 0 ? 0 : startIndex + 1}</strong> to{' '}
            <strong className="text-white">{endIndex}</strong> of <strong className="text-white">{totalItems}</strong> events
          </span>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Page Buttons */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="First Page"
              aria-label="First Page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Prev Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Previous Page"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Number Pills */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`dots-${idx}`} className="px-1.5 text-slate-600 text-xs select-none">
                      ...
                    </span>
                  );
                }
                const isCurrent = page === safeCurrentPage;
                return (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page as number)}
                    className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'border border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Next Page"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={safeCurrentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Last Page"
              aria-label="Last Page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        )}
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
                <span className="text-slate-500">Status:</span>
                <p className="font-semibold text-slate-300 mt-0.5 uppercase text-[11px]">
                  {selectedLog.status}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Actor Name:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{selectedLog.actor.name}</p>
              </div>
              <div>
                <span className="text-slate-500">Actor Role:</span>
                <p className="mt-0.5"><Badge role={selectedLog.actor.role} size="sm" /></p>
              </div>
              <div>
                <span className="text-slate-500">Action:</span>
                <p className="font-mono text-indigo-300 font-semibold mt-0.5">{selectedLog.action}</p>
              </div>
              <div>
                <span className="text-slate-500">IP Address:</span>
                <p className="font-mono text-slate-300 mt-0.5">{selectedLog.ipAddress}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Target Resource:</span>
                <p className="font-mono text-slate-200 mt-0.5">{selectedLog.targetResource}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Details:</span>
                <p className="text-slate-300 mt-0.5">{selectedLog.details}</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400">Raw JSON Payload</span>
              <pre className="mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto max-h-56">
                {JSON.stringify(selectedLog, null, 2)}
              </pre>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 cursor-pointer"
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
