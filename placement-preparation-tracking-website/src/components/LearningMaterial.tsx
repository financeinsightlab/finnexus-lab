import { useState } from "react";
import { ALL_MODULES, CATEGORY_ORDER } from "../data/materials";
import { CATEGORY_META } from "../data/plan";

type Props = {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
};

export function LearningMaterial({ activeCategory, setActiveCategory }: Props) {
  const [openModule, setOpenModule] = useState<string | null>(null);

  const filteredModules =
    activeCategory === "All" ? ALL_MODULES : ALL_MODULES.filter((m) => m.category === activeCategory);

  return (
    <div>
      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-5">
        <button
          onClick={() => { setActiveCategory("All"); setOpenModule(null); }}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
            activeCategory === "All"
              ? "bg-slate-900 text-white shadow-lg"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          📚 All ({ALL_MODULES.length})
        </button>
        {CATEGORY_ORDER.map((cat) => {
          const count = ALL_MODULES.filter((m) => m.category === cat).length;
          const meta = CATEGORY_META[cat as keyof typeof CATEGORY_META];
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenModule(null); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-1.5 ${
                active ? `${meta.bg} ${meta.color} ring-2 ${meta.ring} shadow-lg`
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{meta.icon}</span> {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filteredModules.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200">
            No content in this category yet.
          </div>
        )}
        {filteredModules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} open={openModule === mod.id} onToggle={() => setOpenModule(openModule === mod.id ? null : mod.id)} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ module, open, onToggle }: { module: import("../data/materials").LearningModule; open: boolean; onToggle: () => void }) {
  const meta = CATEGORY_META[module.category as keyof typeof CATEGORY_META];
  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-slate-50 transition"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${meta.bg}`}>
            {module.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                {module.category}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">{module.items.length} sections</span>
            </div>
            <h3 className="font-bold text-slate-800 text-base mt-1">{module.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{module.summary}</p>
          </div>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-transform ${open ? "rotate-180 bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-600"}`}>
          ▾
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">
          <div className="space-y-4">
            {module.items.map((item: import("../data/materials").LearningItem, idx: number) => (
              <Section key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ item }: { item: import("../data/materials").LearningItem }) {
  const typeMeta: Record<string, { bg: string; color: string; label: string }> = {
    Concept: { bg: "bg-sky-100", color: "text-sky-700", label: "💡 Concept" },
    Formula: { bg: "bg-emerald-100", color: "text-emerald-700", label: "🧮 Formula" },
    "Q&A": { bg: "bg-amber-100", color: "text-amber-700", label: "❓ Q&A" },
    Script: { bg: "bg-violet-100", color: "text-violet-700", label: "📝 Script / Template" },
    Cheatsheet: { bg: "bg-rose-100", color: "text-rose-700", label: "📋 Cheat Sheet" },
    Example: { bg: "bg-indigo-100", color: "text-indigo-700", label: "🔢 Example" },
  };
  const t = typeMeta[item.type] ?? typeMeta.Concept;

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden">
      <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${t.bg} ${t.color}`}>
          {t.label}
        </span>
      </div>

      <div className="p-4">
        {item.content && (
          <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
            {item.content}
          </div>
        )}

        {item.qa && item.qa.length > 0 && (
          <div className="mt-3 space-y-3">
            {item.qa.map((pair, i) => (
              <div key={i} className="rounded-lg border border-slate-200 overflow-hidden bg-white">
                <div className="px-3 py-2 bg-amber-50 text-sm font-semibold text-amber-900">
                  {pair.q}
                </div>
                <div className="px-3 py-2.5 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed border-t border-amber-100">
                  <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded font-bold mr-2 mb-1">Answer</span>
                  <div>{pair.a}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
