"use client";

import { useState, useMemo } from "react";
import {
  Shirt,
  Dumbbell,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Cpu,
  Sun,
  Heart,
  ChevronDown,
  ChevronRight,
  Search,
  X,
  Wand2,
} from "lucide-react";
import { TEMPLATE_CATEGORIES, getTemplatesByCategory, searchTemplates } from "@/lib/templates";
import type { Template, TemplateCategory, GenerationType } from "@/types";

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

interface PromptTemplatesProps {
  currentType?: GenerationType;
  onSelect: (prompt: string) => void;
  onClose?: () => void;
}

export function PromptTemplates({ currentType, onSelect, onClose }: PromptTemplatesProps) {
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredBySearch = useMemo(() => {
    if (!search.trim()) return null;
    let results = searchTemplates(search);
    if (currentType) {
      results = results.filter((t) => t.type === currentType);
    }
    return results;
  }, [search, currentType]);

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Templates</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-zinc-800/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar template..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
        {currentType && (
          <p className="text-[10px] text-zinc-600 mt-1 px-1">
            Filtrando por: {currentType}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Search results */}
        {filteredBySearch ? (
          <div className="p-3 space-y-2">
            {filteredBySearch.length === 0 ? (
              <p className="text-xs text-zinc-600 text-center py-4">
                Nenhum template encontrado
              </p>
            ) : (
              filteredBySearch.map((template) => (
                <TemplateItem
                  key={template.id}
                  template={template}
                  onSelect={onSelect}
                />
              ))
            )}
          </div>
        ) : (
          /* Category accordion */
          <div className="py-1">
            {TEMPLATE_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon];
              const isExpanded = expandedCategories.has(cat.id);
              let categoryTemplates = getTemplatesByCategory(cat.id);
              if (currentType) {
                categoryTemplates = categoryTemplates.filter(
                  (t) => t.type === currentType
                );
              }

              if (categoryTemplates.length === 0) return null;

              return (
                <div key={cat.id}>
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900/50 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
                    )}
                    {Icon && <Icon className="h-4 w-4 text-violet-400" />}
                    <span className="font-medium">{cat.label}</span>
                    <span className="text-[10px] text-zinc-600 ml-auto">
                      {categoryTemplates.length}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-2 space-y-1.5">
                      {categoryTemplates.map((template) => (
                        <TemplateItem
                          key={template.id}
                          template={template}
                          onSelect={onSelect}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateItem({
  template,
  onSelect,
}: {
  template: Template;
  onSelect: (prompt: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(template.prompt)}
      className="w-full text-left p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/30 hover:bg-zinc-900 transition-all group"
    >
      <p className="text-xs font-medium text-zinc-200 mb-1 group-hover:text-violet-300 transition-colors">
        {template.title}
      </p>
      <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
        {template.prompt}
      </p>
      <div className="flex gap-1 mt-2">
        {template.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[9px] text-zinc-600 bg-zinc-800/80 px-1.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
