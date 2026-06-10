"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Shirt,
  Dumbbell,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Cpu,
  Sun,
  Heart,
  Search,
  ArrowRight,
  X,
} from "lucide-react";
import { templates, TEMPLATE_CATEGORIES, getTemplatesByCategory, searchTemplates } from "@/lib/templates";
import type { TemplateCategory, Template } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Shirt,
  Dumbbell,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Cpu,
  Sun,
  Heart,
};

const CATEGORY_COLORS: Record<TemplateCategory, string> = {
  moda: "from-pink-500/20 to-pink-600/5 border-pink-500/30",
  fitness: "from-orange-500/20 to-orange-600/5 border-orange-500/30",
  beleza: "from-rose-500/20 to-rose-600/5 border-rose-500/30",
  financas: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
  food: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  tech: "from-violet-500/20 to-violet-600/5 border-violet-500/30",
  lifestyle: "from-sky-500/20 to-sky-600/5 border-sky-500/30",
  saude: "from-teal-500/20 to-teal-600/5 border-teal-500/30",
};

const CATEGORY_ICON_COLORS: Record<TemplateCategory, string> = {
  moda: "text-pink-400",
  fitness: "text-orange-400",
  beleza: "text-rose-400",
  financas: "text-emerald-400",
  food: "text-amber-400",
  tech: "text-violet-400",
  lifestyle: "text-sky-400",
  saude: "text-teal-400",
};

export default function TemplatesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | null>(null);

  const filteredTemplates = useMemo(() => {
    if (search.trim()) {
      return searchTemplates(search);
    }
    if (activeCategory) {
      return getTemplatesByCategory(activeCategory);
    }
    return templates;
  }, [search, activeCategory]);

  const groupedTemplates = useMemo(() => {
    if (search.trim() || activeCategory) return null;

    const groups: Record<string, Template[]> = {};
    for (const cat of TEMPLATE_CATEGORIES) {
      groups[cat.id] = getTemplatesByCategory(cat.id);
    }
    return groups;
  }, [search, activeCategory]);

  function handleUseTemplate(template: Template) {
    const typeRoute: Record<string, string> = {
      image: "/create/image",
      video: "/create/video",
      voice: "/create/voice",
      face_swap: "/create/face-swap",
      upscale: "/create/upscale",
      motion: "/create/motion",
    };
    const route = typeRoute[template.type] || "/create/image";
    router.push(`${route}?prompt=${encodeURIComponent(template.prompt)}`);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Templates de Prompts
          </h1>
          <p className="text-zinc-400 text-lg">
            Prompts prontos para gerar imagens profissionais. Escolha, personalize e crie.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim()) setActiveCategory(null);
            }}
            placeholder="Buscar templates por nome, tag ou categoria..."
            className="w-full pl-12 pr-10 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => {
              setActiveCategory(null);
              setSearch("");
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !activeCategory && !search
                ? "bg-violet-600 text-white"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            Todos
          </button>
          {TEMPLATE_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {(search || activeCategory) && (
          <p className="text-sm text-zinc-500 mb-4">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? "s" : ""} encontrado{filteredTemplates.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Templates Grid - grouped by category */}
        {groupedTemplates ? (
          <div className="space-y-10">
            {TEMPLATE_CATEGORIES.map((cat) => {
              const catTemplates = groupedTemplates[cat.id];
              if (!catTemplates?.length) return null;
              const Icon = ICON_MAP[cat.icon];

              return (
                <section key={cat.id}>
                  <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                      <div className={`p-2 rounded-lg bg-zinc-900 ${CATEGORY_ICON_COLORS[cat.id]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-white">{cat.label}</h2>
                    <span className="text-sm text-zinc-500">({catTemplates.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onUse={handleUseTemplate}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleUseTemplate}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg mb-2">
              Nenhum template encontrado
            </p>
            <p className="text-zinc-600 text-sm">
              Tente buscar por outro termo ou categoria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  onUse,
}: {
  template: Template;
  onUse: (t: Template) => void;
}) {
  return (
    <div
      className={`group relative rounded-xl border bg-gradient-to-br p-5 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/5 cursor-pointer ${CATEGORY_COLORS[template.category]}`}
      onClick={() => onUse(template)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white text-sm">{template.title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded-full">
          {template.type}
        </span>
      </div>
      <p className="text-xs text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
        {template.prompt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-zinc-500 bg-zinc-900/60 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
      </div>
    </div>
  );
}
