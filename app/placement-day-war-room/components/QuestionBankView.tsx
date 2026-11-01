'use client';

import { useState, useMemo } from 'react';
import { type InterviewQuestion, type InterviewRole, ROLE_LABELS } from '@/lib/interview-engine';

interface Props {
  questions: InterviewQuestion[];
  onSelectQuestionForWarRoom?: (question: InterviewQuestion) => void;
}

export default function QuestionBankView({ questions, onSelectQuestionForWarRoom }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Extract unique categories / tags
  const categories = [
    'ALL',
    'Valuation & DCF',
    'Accounting & Statements',
    'Corporate Finance',
    'Credit Analysis',
    'Derivatives & Risk',
    'Aptitude & Quant',
    'Behavioral & HR',
  ];

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      // Role filter
      if (selectedRole !== 'ALL' && !q.role.includes(selectedRole as InterviewRole)) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'ALL' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL') {
        const catLower = selectedCategory.toLowerCase();
        const hasTag = q.tags.some((t) => catLower.includes(t) || t.includes(catLower));
        const hasText = q.question.toLowerCase().includes(catLower);
        if (!hasTag && !hasText) return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        const inQ = q.question.toLowerCase().includes(s);
        const inKey = q.keyPoints.some((kp) => kp.toLowerCase().includes(s));
        const inTag = q.tags.some((t) => t.toLowerCase().includes(s));
        if (!inQ && !inKey && !inTag) return false;
      }
      return true;
    });
  }, [questions, selectedRole, selectedDifficulty, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6 pt-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Finance & Placement Question Bank
          </h2>
          <p className="text-sm text-slate-400">
            Over {questions.length} verified interview questions across investment banking, equity research, valuation, credit, and behavioral rounds.
          </p>
        </div>
        <div className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-full font-mono">
          Showing <span className="text-amber-400 font-bold">{filtered.length}</span> of {questions.length}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by formula, concept, or term (e.g. DCF, WACC, Ind AS, Beta, DSCR, STAR)..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
          <span className="absolute left-3.5 top-3.5 text-slate-500 text-sm">🔍</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white text-xs"
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Target Role:
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Roles ({questions.length})</option>
              {Object.entries(ROLE_LABELS).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Difficulty:
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">All Difficulties</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
              <option value="KILLER">KILLER</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-300 focus:outline-none focus:border-amber-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-sm">No questions matched your search criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRole('ALL'); setSelectedDifficulty('ALL'); setSelectedCategory('ALL'); }}
              className="mt-3 text-xs text-amber-400 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filtered.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition overflow-hidden"
              >
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        q.difficulty === 'KILLER' ? 'bg-rose-500/20 text-rose-400' :
                        q.difficulty === 'HARD' ? 'bg-orange-500/20 text-orange-400' :
                        q.difficulty === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-semibold">
                        {q.type.replace(/_/g, ' ')}
                      </span>
                      {q.tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-slate-200 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-500 hover:text-white transition">
                      {isExpanded ? '▲ Hide' : '▼ Details'}
                    </span>
                  </div>
                </div>

                {/* Expanded Details View */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800 space-y-4 bg-slate-950/40">
                    {q.keyPoints.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                          Key Evaluation Points:
                        </h4>
                        <ul className="space-y-1.5">
                          {q.keyPoints.map((kp, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-amber-400">•</span> {kp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {q.commonMistakes.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                          Common Pitfalls:
                        </h4>
                        <ul className="space-y-1">
                          {q.commonMistakes.map((cm, i) => (
                            <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                              <span className="text-rose-400">✕</span> {cm}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {q.indianContext && (
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-slate-300">
                        🇮🇳 <span className="font-semibold text-amber-300">Indian Market Nuance:</span> {q.indianContext}
                      </div>
                    )}

                    {onSelectQuestionForWarRoom && (
                      <div className="pt-2">
                        <button
                          onClick={() => onSelectQuestionForWarRoom(q)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition shadow-md"
                        >
                          Practice in Interview War Room →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
