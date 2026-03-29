'use client';

import React, { useState } from 'react';
import { updateUserAccess, updatePurchasedServices, deleteUser } from './actions';
import { UserRole } from '@prisma/client';

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
  _count: {
    accounts: number;
    sessions: number;
    savedArticles: number;
  };
};

export default function UsersTableClient({ initialUsers }: { initialUsers: UserData[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const ROLES = ['MEMBER', 'VIEWER', 'ADMIN'] as const;
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
    } catch (e: any) {
      alert(e.message || 'Error updating user.');
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
    } catch (e: any) {
      alert(e.message || 'Error updating services.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to completely delete this user?')) return;
    setLoadingId(userId);
    try {
      await deleteUser(userId);
    } catch (e: any) {
      alert(e.message || 'Error deleting user.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 hide-scrollbar mt-6">
      <table className="w-full text-sm">
        <thead className="bg-[#1A2B3C] text-gray-300">
          <tr>
            <th className="p-4 text-left">Identity</th>
            <th className="p-4 text-left">Access Role</th>
            <th className="p-4 text-left">Subscription Tier</th>
            <th className="p-4 text-left">B2B Services</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialUsers.map((user) => (
            <React.Fragment key={user.id}>
              {/* Primary Row */}
              <tr className={`border-t border-white/10 hover:bg-white/5 transition-colors ${loadingId === user.id ? 'opacity-50' : ''}`}>
                <td className="p-4">
                  <p className="font-semibold text-white">{user.name || "Anonymous"}</p>
                  <p className="text-gray-400 text-xs">{user.email}</p>
                  <span className="text-[10px] uppercase text-gray-500 bg-gray-900 px-1.5 py-0.5 rounded mt-1 inline-block">ID: {user.id.slice(0, 8)}...</span>
                </td>
                
                {/* Secure Role Selector */}
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleAccessChange(user.id, 'role', e.target.value, user)}
                    className={`bg-[#0B1C2C] border border-white/20 rounded px-2 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-teal-500 outline-none
                      ${user.role === 'ADMIN' ? 'text-yellow-400 border-yellow-500/30' : 'text-gray-300'}
                    `}
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>

                {/* SaaS Subscription Dropsdowns */}
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <select
                      value={user.subscriptionPlan || 'FREE'}
                      onChange={(e) => handleAccessChange(user.id, 'plan', e.target.value, user)}
                      className="bg-[#0B1C2C] border border-white/20 text-gray-300 rounded px-2 py-1.5 text-xs focus:ring-1 focus:ring-teal-500 outline-none"
                    >
                      {PLANS.map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                    </select>

                    <select
                      value={user.subscriptionStatus}
                      onChange={(e) => handleAccessChange(user.id, 'status', e.target.value, user)}
                      className={`bg-[#0B1C2C] border border-white/20 rounded px-2 py-1.5 text-[10px] focus:ring-1 outline-none
                        ${user.subscriptionStatus === 'ACTIVE' ? 'text-green-400' : 'text-gray-400'}
                      `}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-[250px]">
                    {SERVICES.map(service => {
                      const isActive = (user.purchasedServices || []).includes(service);
                      return (
                        <button
                          key={service}
                          onClick={() => toggleService(user.id, service, user)}
                          className={`text-[10px] px-2 py-1 rounded-full border transition-all ${
                            isActive 
                              ? 'bg-brand-teal/20 border-brand-teal text-brand-teal' 
                              : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500'
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </td>

                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-900/40 text-red-500 hover:bg-red-800 hover:text-white px-3 py-1.5 text-xs rounded transition-colors"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
          {initialUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-gray-400">No users found matching filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
