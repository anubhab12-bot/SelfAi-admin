import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Role, User } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { 
  UserPlus, 
  ShieldCheck, 
  Check, 
  Trash2, 
  Mail, 
  Send, 
  Clock, 
  ExternalLink, 
  Copy, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const RbacUsers: React.FC = () => {
  const { 
    users, 
    updateUserRole, 
    addUser, 
    deleteUser, 
    resendInvite,
    acceptInvite,
    can, 
    currentUser,
    addToast 
  } = useAdmin();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('admin');
  const [showHowItWorks, setShowHowItWorks] = useState(true);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) {
      addToast('error', 'Missing Information', 'Please provide both name and Gmail address.');
      return;
    }

    addUser({
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: 'Self AI Admin Team',
      status: 'pending',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      inviteSentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      inviteToken: Math.random().toString(36).substring(2, 12)
    });

    addToast('success', 'Invitation Dispatched', `Consent email sent to ${inviteEmail}. Access remains blocked until accepted.`);
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
    setInviteRole('admin');
  };

  const copyInviteLink = (email: string) => {
    const link = `https://anubhab12-bot.github.io/SelfAi-admin/#/accept-invite?email=${encodeURIComponent(email)}`;
    navigator.clipboard.writeText(link);
    addToast('info', 'Invite Link Copied', `Direct consent link copied for ${email}.`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Team & Role-Based Access (RBAC)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Invite team members via Gmail with explicit consent verification before granting access.
          </p>
        </div>

        {can('users:create') && (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite via Gmail</span>
          </button>
        )}
      </div>

      {/* 💡 Plain-English Explanation: How Gmail Invitations & Permissions Work */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              How Gmail Admin Invites & Permission Consent Work
            </h3>
          </div>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {showHowItWorks ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showHowItWorks && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-300 border-t border-indigo-500/10">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-white mb-1">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-[10px]">1</span>
                <span>You Send Invitation</span>
              </div>
              <p className="text-[11px] text-slate-400">
                You enter their Gmail. The user is marked as <strong className="text-amber-400">"Pending"</strong>. They have <strong>0 access</strong> to your app or data yet.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-white mb-1">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-[10px]">2</span>
                <span>They Receive Email</span>
              </div>
              <p className="text-[11px] text-slate-400">
                An invitation email is sent from your email service (<code>anubhabnandi12@gmail.com</code>) with a secure, one-time acceptance link.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-white mb-1">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-[10px]">3</span>
                <span>Consent & Activation</span>
              </div>
              <p className="text-[11px] text-slate-400">
                The recipient clicks <em>"Accept Invitation & Sign In with Google"</em>. Only after they give explicit consent is their role activated!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Role Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <h3 className="text-xs font-bold text-white">Super Admin (Root)</h3>
          </div>
          <p className="text-[11px] text-slate-400">
            Unrestricted access: full feature control, invitation authority, and system restart power.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <h3 className="text-xs font-bold text-white">Admin (Operational)</h3>
          </div>
          <p className="text-[11px] text-slate-400">
            Can toggle feature flags ON/OFF, adjust rollout %, and invite other team members.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h3 className="text-xs font-bold text-white">Viewer / Analyst</h3>
          </div>
          <p className="text-[11px] text-slate-400">
            Read-only access: can view weekly charts, usage statistics, and live health telemetry.
          </p>
        </div>
      </div>

      {/* Team Directory Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Authorized Team Members & Invitations ({users.length})
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            {users.filter(u => u.status === 'active').length} Active • {users.filter(u => u.status === 'pending').length} Pending Consent
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {users.map((user) => {
            const isSelf = user.id === currentUser.id || user.email === 'anubhabnandi12@gmail.com';
            const canEditRole = can('users:edit_role');
            const canDelete = can('users:delete');
            const isPending = user.status === 'pending';

            return (
              <div key={user.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-slate-700 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-slate-100">{user.name}</p>
                      {isSelf && <span className="text-[10px] text-indigo-400 font-normal">(You)</span>}
                      {isPending ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="w-3 h-3" />
                          Pending Acceptance
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                  {/* Role Selector or Badge */}
                  {canEditRole && !isSelf ? (
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value as Role)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="analyst">Viewer</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  ) : (
                    <Badge role={user.role} size="sm" />
                  )}

                  {/* Actions for Pending Users */}
                  {isPending && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => resendInvite(user.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                        title="Resend verification email to their Gmail"
                      >
                        Resend
                      </button>

                      <button
                        onClick={() => copyInviteLink(user.email)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                        title="Copy direct verification link"
                      >
                        Copy Link
                      </button>

                      {/* Test simulation button so admin can test recipient acceptance */}
                      <button
                        onClick={() => acceptInvite(user.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold border border-emerald-500/30 transition-colors"
                        title="Simulate recipient clicking 'Accept Invitation' in their Gmail"
                      >
                        Simulate Accept
                      </button>
                    </div>
                  )}

                  {/* Delete / Revoke */}
                  {canDelete && !isSelf && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title={isPending ? 'Revoke Invitation' : 'Remove Member'}
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

      {/* INVITE MODAL WITH GMAIL DISPATCH PREVIEW */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member via Gmail"
        subtitle="The recipient must explicitly accept the invitation to gain access."
        maxWidth="lg"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Gmail Address</label>
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="e.g. sarah.jenkins@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role Permission</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="admin">Admin (Can toggle app features & manage team)</option>
              <option value="analyst">Viewer (Read-only access to stats)</option>
              <option value="super_admin">Super Admin (Full root access)</option>
            </select>
          </div>

          {/* Email Preview Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              What They Will Receive in Their Gmail Inbox:
            </span>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <p><strong className="text-white">From:</strong> Self AI Service &lt;anubhabnandi12@gmail.com&gt;</p>
              <p><strong className="text-white">Subject:</strong> You have been invited to join Self AI Admin as an {inviteRole.toUpperCase()}</p>
              <p className="pt-1 text-slate-300">
                Hi {inviteName || 'there'}, <strong>Anubhab Nandi</strong> has invited you to manage the Self AI application.
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-[11px]">
                  Accept Invitation & Verify Gmail
                </span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">
                * Note: If you do not accept, no access or permissions will be granted to your Google account.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:bg-slate-850"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Invitation Email</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
