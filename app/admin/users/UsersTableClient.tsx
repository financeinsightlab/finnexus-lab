'use client';

import React, { useState } from 'react';
import { updateUserAccess, updatePurchasedServices, deleteUser } from './actions';
import { UserRole } from '@prisma/client';
import { Shield, Trash2, CheckCircle2, XCircle, ChevronDown, User as UserIcon } from 'lucide-react';

type UserData = {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  subscriptionPlan: string | null;
  subscriptionStatus: string;
  purchasedServices: string[];
  createdAt: Date;
  updatedAt: Date;
  emailVerified: Date | null;
  stripeCustomerId: string | null;
  isOnline: boolean;
  lastLogin: Date | null;
  _count: {
    accounts: number;
    sessions: number;
    savedArticles: number;
  };
};

export default function UsersTableClient({ initialUsers }: { initialUsers: UserData[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const ROLES = ['MEMBER', 'VIEWER', 'ANALYST', 'ADMIN'] as const;
  const PLANS = ['FREE', 'PRO', 'ELITE', 'TEAM', 'PROFESSIONAL', 'ENTERPRISE', 'API_ONLY'];
  const STATUSES = ['ACTIVE', 'INACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED'];
  const SERVICES = [
    'Market Research Report',
    'Financial Modelling',
    'Competitive Intelligence',
    'Analytics Dashboard',
    'Strategy Note'
  ];

  const handleAccessChange = async (userId: string, field: string, value: string, currentUser: UserData) => {
    setLoadingId(userId);
    try {
      const newRole = field === 'role' ? value as UserRole : currentUser.role;
      const newPlan = field === 'plan' ? value : (currentUser.subscriptionPlan || 'FREE');
      const newStatus = field === 'status' ? value : currentUser.subscriptionStatus;

      await updateUserAccess(userId, newRole, newStatus, newPlan);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Error updating user.';
      alert(errorMessage);
    } finally {
      setLoadingId(null);
    }
  };

  const toggleService = async (userId: string, service: string, currentUser: UserData) => {
    setLoadingId(userId);
    try {
      const currentServices = currentUser.purchasedServices || [];
      let newServices;
      if (currentServices.includes(service)) {
        newServices = currentServices.filter(s => s !== service);
      } else {
        newServices = [...currentServices, service];
      }
      await updatePurchasedServices(userId, newServices);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Error updating services.';
      alert(errorMessage);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to completely delete this user?')) return;
    setLoadingId(userId);
    try {
      await deleteUser(userId);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Error deleting user.';
      alert(errorMessage);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-muted">
            <th className="px-8 py-5 text-xs font-bold text-content-muted uppercase tracking-[0.2em]">Identity</th>
            <th className="px-8 py-5 text-xs font-bold text-content-muted uppercase tracking-[0.2em]">Access Role</th>
            <th className="px-8 py-5 text-xs font-bold text-content-muted uppercase tracking-[0.2em]">Subscription</th>
            <th className="px-8 py-5 text-xs font-bold text-content-muted uppercase tracking-[0.2em]">Procured Services</th>
            <th className="px-8 py-5 text-xs font-bold text-content-muted uppercase tracking-[0.2em] text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {initialUsers.map((user) => (
            <tr key={user.id} className={`hover:bg-surface-muted transition-all group ${loadingId === user.id ? 'opacity-40 animate-pulse' : ''}`}>
              {/* Identity Column */}
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-inner">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    {user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-surface shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-content-primary group-hover:text-brand transition-colors">{user.name || "Anonymous User"}</p>
                    <p className="text-[11px] text-content-muted font-medium mt-0.5">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-content-muted bg-surface-muted px-2 py-0.5 rounded-md border border-border-subtle">UID: {user.id.slice(0, 8)}</span>
                      {user.isOnline ? (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">● ONLINE</span>
                      ) : user.lastLogin ? (
                        <span className="text-[9px] text-content-muted">Last seen {new Date(user.lastLogin).toLocaleDateString()}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </td>
              
              {/* Role Column */}
              <td className="px-8 py-6">
                <div className="relative inline-block w-32 group/select">
                  <select
                    value={user.role}
                    onChange={(e) => handleAccessChange(user.id, 'role', e.target.value, user)}
                    className={`appearance-none w-full bg-surface-muted border border-border rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-brand/50 transition-all cursor-pointer
                      ${user.role === 'ADMIN' ? 'text-amber-400 border-amber-500/30' : 'text-content-secondary'}
                    `}
                  >
                    {ROLES.map(r => <option key={r} value={r} className="bg-surface">{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-content-muted pointer-events-none group-hover/select:text-content-secondary transition-colors" />
                </div>
              </td>

              {/* Tier Column */}
              <td className="px-8 py-6">
                <div className="flex flex-col gap-3 w-48">
                  {/* Subscription Plan Dropdown */}
                  <div className="relative group/select">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-content-muted mb-1 block">Plan</label>
                    <select
                      value={user.subscriptionPlan || 'FREE'}
                      onChange={(e) => handleAccessChange(user.id, 'plan', e.target.value, user)}
                      className="appearance-none w-full bg-surface-muted border border-border text-content-secondary rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-wider outline-none focus:border-brand/50 transition-all cursor-pointer"
                    >
                      {PLANS.map(p => <option key={p} value={p} className="bg-surface">{p.replace('_', ' ')}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-9 -translate-y-1/2 w-3 h-3 text-content-muted pointer-events-none" />
                  </div>

                  {/* Subscription Status Dropdown */}
                  <div className="relative group/select">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-content-muted mb-1 block">Status</label>
                    <select
                      value={user.subscriptionStatus}
                      onChange={(e) => handleAccessChange(user.id, 'status', e.target.value, user)}
                      className="appearance-none w-full bg-surface-muted border border-border text-content-secondary rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-wider outline-none focus:border-brand/50 transition-all cursor-pointer"
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s} className="bg-surface">
                          {s}
                          {s === 'ACTIVE' ? ' ✅' : s === 'INACTIVE' ? ' ❌' : ''}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-9 -translate-y-1/2 w-3 h-3 text-content-muted pointer-events-none" />
                  </div>
                </div>
              </td>

              {/* Services Column */}
              <td className="px-8 py-6">
                <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                  {SERVICES.map(service => {
                    const isActive = (user.purchasedServices || []).includes(service);
                    return (
                      <button
                        key={service}
                        onClick={() => toggleService(user.id, service, user)}
                        className={`text-[9px] font-bold px-3 py-1.5 rounded-lg border transition-all uppercase tracking-tight ${
                          isActive 
                            ? 'bg-brand/10 border-brand/40 text-brand'
                            : 'bg-transparent border-border-subtle text-content-muted hover:border-border-strong hover:text-content-secondary'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </td>

              {/* Status/Actions Column */}
              <td className="px-8 py-6 text-center">
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="p-3 text-content-muted hover:text-error bg-surface-muted hover:bg-error-muted rounded-2xl transition-all border border-transparent hover:border-error/20 shadow-sm"
                  title="Sever Identity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {initialUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-20 text-center">
                 <div className="flex flex-col items-center justify-center space-y-3">
                   <XCircle className="w-12 h-12 text-content-muted" />
                   <p className="text-content-muted font-medium">Zero identities match the current parameters.</p>
                 </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
