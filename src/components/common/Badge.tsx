import React from 'react';
import { Role } from '../../types';
import { ROLE_DEFINITIONS } from '../../utils/rbac';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  role?: Role;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  role,
  size = 'md',
  className = ''
}) => {
  if (role) {
    const roleConfig = ROLE_DEFINITIONS[role];
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
        } ${roleConfig ? roleConfig.badgeColor : 'bg-slate-800 text-slate-300 border-slate-700'} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
        {children || (roleConfig ? roleConfig.name : role)}
      </span>
    );
  }

  const variantStyles = {
    primary: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700/60'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border rounded-full ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
