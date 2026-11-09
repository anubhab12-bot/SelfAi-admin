import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Role, User } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { 
  UserPlus, 
  ShieldCheck, 
  Check, 
  ShieldAlert,
  Trash2,
  Lock
} from 'lucide-react';

export const RbacUsers: React.FC = () => {
  const { 
    users, 
    updateUserRole, 
    addUser, 
    deleteUser, 
    can, 
    currentUser 
  } = useAdmin();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('admin');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    addUser({
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: 'Self AI Team',
      status: 'active',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });

    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('admin');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Team & Access Control (RBAC)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage who has access to this admin site and what permissions they have.
          </p>
        </div>

        {can('users:create') && (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        )}
      </div>

      {/* Role Explanation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <h3 className="text-xs font-bold text-white">Super Admin</h3>
          </div>
          <p className="text-[11px] text-slate-400">Full unrestricted control over features, settings, and team access.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <h3 className="text-xs font-bold text-white">Admin</h3>
          </div>
          <p className="text-[11px] text-slate-400">Can turn features ON/OFF and invite or manage other team members.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h3 className="text-xs font-bold text-white">Viewer</h3>
          </div>
          <p className="text-[11px] text-slate-400">Read-only access to inspect the dashboard and weekly stats.</p>
        </div>
      </div>

      {/* Clean User List */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Authorized Team Members ({users.length})
        </h3>

        <div className="divide-y divide-slate-800/80">
          {users.map((user) => {
            const isSelf = user.id === currentUser.id || user.email === 'anubhabnandi12@gmail.com';
            const canEditRole = can('users:edit_role');
            const canDelete = can('users:delete');

            return (
              <div key={user.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border border-slate-700 object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                      {user.name}
                      {isSelf && <span className="text-[10px] text-indigo-400 font-normal">(You)</span>}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Role Selector or Badge */}
                  {canEditRole && !isSelf ? (
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value as Role)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="analyst">Viewer</option>
                    </select>
                  ) : (
                    <Badge role={user.role} size="sm" />
                  )}

                  {canDelete && !isSelf && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite a Team Member"
        subtitle="Give administrative access to another person."
        maxWidth="md"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role Permission</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="admin">Admin (Can toggle features & manage team)</option>
              <option value="analyst">Viewer (Read-only access)</option>
              <option value="super_admin">Super Admin (Full root access)</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:bg-slate-850"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
            >
              Add Member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
