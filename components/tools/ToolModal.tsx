'use client';

import { useState } from 'react';

export interface Tool {
  id: number;
  icon: string;
  title: string;
  category: string;
  tool: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  gated: boolean;
  desc: string;
  includes: string[];
}

interface ToolModalProps {
  tool: Tool;
  onClose: () => void;
  onSuccess: (toolId: number) => void;
}

export default function ToolModal({ tool, onClose, onSuccess }: ToolModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: `tool:${tool.id}` }),
      });
      if (response.ok) {
        onSuccess(tool.id);
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl anim-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <span className="text-4xl mb-4 block">{tool.icon}</span>
          <h3 className="text-xl font-bold text-brand-navy mb-2">{tool.title}</h3>
          <p className="text-sm text-brand-slate">{tool.desc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input w-full"
            required
          />
          <button
            type="submit"
            id="tool-modal-submit"
            disabled={loading}
            className="btn btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Me the Download Link →'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
