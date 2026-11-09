import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export const AcceptInvite: React.FC = () => {
  const { users, acceptInvite, setActiveTab, addToast, railwayUrl } = useAdmin();
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [targetUser, setTargetUser] = useState<any>(null);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Parse email from URL query or hash: e.g. #/accept-invite?email=...
    const hash = window.location.hash;
    const searchPart = hash.includes('?') ? hash.split('?')[1] : window.location.search.substring(1);
    const params = new URLSearchParams(searchPart);
    const emailParam = params.get('email');

    if (emailParam) {
      setInviteEmail(emailParam);
      // Check local users
      const user = users.find((u) => u.email.toLowerCase() === emailParam.toLowerCase());
      if (user) {
        setTargetUser(user);
      }

      // Also query live Railway backend for user details
      fetch(`${railwayUrl}/api/admin/team`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data?.users)) {
            const remoteUser = data.users.find((u: any) => u.email.toLowerCase() === emailParam.toLowerCase());
            if (remoteUser) {
              setTargetUser(remoteUser);
              if (remoteUser.status === 'active') {
                setIsAccepted(true);
              }
            }
          }
        })
        .catch(() => {});
    }
  }, [users, railwayUrl]);

  const handleAccept = async () => {
    setIsSubmitting(true);
    const emailToAccept = inviteEmail || targetUser?.email;

    try {
      // 1. Notify Railway backend cloud server so status is updated globally in database
      await fetch(`${railwayUrl}/api/admin/team/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToAccept }),
      });
    } catch (err) {
      console.warn('Backend acceptance sync failed:', err);
    }

    // 2. Update local state
    if (targetUser) {
      acceptInvite(targetUser.id);
    } else if (emailToAccept) {
      acceptInvite(emailToAccept);
    }

    setIsAccepted(true);
    addToast('success', 'Invitation Accepted!', `Welcome to Self AI Admin! Access granted.`);
    setTimeout(() => {
      window.location.hash = '#dashboard';
      setActiveTab('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-center animate-slide-in">
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-3">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Self AI Admin Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Official Team Invitation Verification</p>
        </div>

        {/* Invitation Details Card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-850">
            <span className="text-slate-400">Invited By:</span>
            <span className="font-semibold text-slate-200">Anubhab Nandi (Super Admin)</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Your Email:</span>
            <span className="font-mono text-indigo-400 font-semibold truncate max-w-[200px]">
              {inviteEmail || 'Team Member'}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Assigned Role:</span>
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
              {targetUser?.role || 'Admin'}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-850">
            <span className="text-slate-400">App Backend:</span>
            <span className="text-slate-300 font-mono text-[10px]">frontend-production-0c17e</span>
          </div>
        </div>

        {/* Consent Notice */}
        <div className="text-[11px] text-slate-400 leading-relaxed bg-indigo-950/20 p-3 rounded-xl border border-indigo-500/20 text-left">
          <span className="font-semibold text-slate-300 block mb-0.5">🔒 Explicit Consent Notice:</span>
          By accepting this invitation, you authorize access to the Self AI control suite with the assigned role permissions. No permissions are granted until you click below.
        </div>

        {/* Action Button */}
        {isAccepted ? (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Invitation Accepted! Redirecting to Dashboard...</span>
          </div>
        ) : (
          <button
            onClick={handleAccept}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>Accept Invitation & Authorize Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};