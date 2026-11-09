import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Role, User } from '../types';
import { ROLE_DEFINITIONS, ALL_PERMISSIONS } from '../utils/rbac';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { 
  ShieldCheck, 
  Users as UsersIcon, 
  UserPlus, 
  ShieldAlert, 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  Search, 
  Lock, 
  Unlock, 
  Key,
  ShieldQuestion,
  Info
} from 'lucide-react';

export const RbacUsers: React.FC = () => {
  const { 
    users, 
    updateUserRole, 
    toggleUserStatus, 
    addUser, 
    deleteUser, 
    can, 
    currentUser 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'users' | 'matrix'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Modals
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingRoleUser, setEditingRoleUser] = useState<User | null>(null);
  const [selectedNewRole, setSelectedNewRole] = useState<Role>('analyst');

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'product_manager' as Role,
    department: 'Product & AI Systems',
    status: 'active' as const,
    mfaEnabled: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(newUserForm);
    setIsInviteModalOpen(false);
    setNewUserForm({
      name: '',
      email: '',
      role: 'product_manager',
      department: 'Product & AI Systems',
      status: 'active',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const allRoles: Role[] = ['super_admin', 'admin', 'product_manager', 'analyst', 'support'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Role-Based Access Control (RBAC)</h1>
            <Badge variant="primary" size="sm">{users.length} Team Members</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enforce granular permissions across SelfAI control plane, managing who can toggle features, restart clusters, or view financial metrics.
          </p>
        </div>

        {/* View Switcher & Invite */}
        <div className="flex items-center gap-2.5">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'users' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UsersIcon className="w-3.5 h-3.5" />
              <span>Team Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === 'matrix' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Permission Matrix</span>
            </button>
          </div>

          {can('users:create') && (
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'users' ? (
        /* USERS DIRECTORY VIEW */
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team members by name or email..."
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admins</option>
              <option value="admin">Admins</option>
              <option value="product_manager">Product Managers</option>
              <option value="analyst">Analysts</option>
              <option value="support">Support Agents</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Member</th>
                    <th className="py-3 px-3">Assigned Role (RBAC)</th>
                    <th className="py-3 px-3">Department</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">MFA</th>
                    <th className="py-3 px-3">Last Active</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredUsers.map((user) => {
                    const isSelf = user.id === currentUser.id;
                    const canEditRole = can('users:edit_role');
                    const canSuspend = can('users:suspend');
                    const canDelete = can('users:delete');

                    return (
                      <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Member profile */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                            />
                            <div>
                              <p className="font-semibold text-slate-100 flex items-center gap-1.5">
                                {user.name}
                                {isSelf && <span className="text-[10px] text-indigo-400">(You)</span>}
                              </p>
                              <p className="text-[11px] text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-3 px-3">
                          <Badge role={user.role} size="sm" />
                        </td>

                        {/* Department */}
                        <td className="py-3 px-3 text-slate-400">{user.department}</td>

                        {/* Status */}
                        <td className="py-3 px-3">
                          <Badge
                            variant={user.status === 'active' ? 'success' : 'warning'}
                            size="sm"
                          >
                            {user.status}
                          </Badge>
                        </td>

                        {/* MFA */}
                        <td className="py-3 px-3">
                          {user.mfaEnabled ? (
                            <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                              <Check className="w-3.5 h-3.5" /> Enforced
                            </span>
                          ) : (
                            <span className="text-amber-400 text-[11px]">Optional</span>
                          )}
                        </td>

                        {/* Last Active */}
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {user.lastActive}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {canEditRole && (
                              <button
                                onClick={() => {
                                  setEditingRoleUser(user);
                                  setSelectedNewRole(user.role);
                                }}
                                className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                                title="Change Role"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {canSuspend && !isSelf && (
                              <button
                                onClick={() => toggleUserStatus(user.id)}
                                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                                title={user.status === 'active' ? 'Suspend Account' : 'Re-activate Account'}
                              >
                                {user.status === 'active' ? (
                                  <Lock className="w-3.5 h-3.5" />
                                ) : (
                                  <Unlock className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}

                            {canDelete && !isSelf && (
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* PERMISSION MATRIX VIEW */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Role-Based Access Control Policy:</strong> Antigravity SelfAI applies strict principle of least privilege.
              Changes to production feature rollouts and infrastructure restarts require either <code>Super Admin</code> or <code>Admin</code> clearance.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="py-3 px-4 w-1/3">Capability / Permission</th>
                    {allRoles.map((role) => (
                      <th key={role} className="py-3 px-3 text-center">
                        <Badge role={role} size="sm" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {ALL_PERMISSIONS.map((perm) => (
                    <tr key={perm.key} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">{perm.label}</span>
                          <span className="text-[10px] font-mono text-slate-500">[{perm.key}]</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{perm.description}</p>
                      </td>

                      {allRoles.map((role) => {
                        const hasPerm = ROLE_DEFINITIONS[role].permissions.includes(perm.key);
                        return (
                          <td key={role} className="py-3 px-3 text-center">
                            {hasPerm ? (
                              <span className="inline-flex p-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            ) : (
                              <span className="inline-flex p-1 rounded-md bg-slate-800/50 text-slate-600">
                                <X className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ROLE MODAL */}
      {editingRoleUser && (
        <Modal
          isOpen={!!editingRoleUser}
          onClose={() => setEditingRoleUser(null)}
          title={`Change Role for ${editingRoleUser.name}`}
          subtitle="Modify RBAC permissions and module access clearance."
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              {allRoles.map((role) => {
                const info = ROLE_DEFINITIONS[role];
                const isSelected = selectedNewRole === role;
                return (
                  <label
                    key={role}
                    onClick={() => setSelectedNewRole(role)}
                    className={`block p-3 rounded-xl border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-indigo-600/10 border-indigo-500/40'
                        : 'bg-slate-950 border-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge role={role} size="sm" />
                      <input
                        type="radio"
                        name="userRole"
                        checked={isSelected}
                        onChange={() => setSelectedNewRole(role)}
                        className="accent-indigo-600"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">{info.description}</p>
                  </label>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setEditingRoleUser(null)}
                className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-xs text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateUserRole(editingRoleUser.id, selectedNewRole);
                  setEditingRoleUser(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
              >
                Save Role Assignment
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* INVITE MEMBER MODAL */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New Team Member"
        subtitle="Grant administrative or analyst access to SelfAI."
        maxWidth="md"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={newUserForm.name}
              onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
              placeholder="e.g. Dr. Jennifer Wu"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={newUserForm.email}
              onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
              placeholder="e.g. jennifer@selfai.internal"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
            <input
              type="text"
              required
              value={newUserForm.department}
              onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
              placeholder="e.g. AI Safety & Evaluation"
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Role</label>
            <select
              value={newUserForm.role}
              onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as Role })}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="admin">Admin</option>
              <option value="product_manager">Product Manager</option>
              <option value="analyst">Analyst</option>
              <option value="support">Support Agent</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-800 hover:bg-slate-850 text-xs font-medium text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
