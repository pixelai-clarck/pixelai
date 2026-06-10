"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Download, ImageIcon, Video, Mic, Filter } from "lucide-react";

type GenerationType = "all" | "image" | "video" | "voice";

interface Generation {
  id: string;
  type: "image" | "video" | "voice" | "face_swap" | "upscale" | "motion";
  output_url: string | null;
  created_at: string;
  prompt: string | null;
  status: string;
}

const typeLabels: Record<string, string> = {
  image: "Imagem",
  video: "Video",
  voice: "Voz",
};

const typeIcons: Record<string, typeof ImageIcon> = {
  image: ImageIcon,
  video: Video,
  voice: Mic,
};

const typeBadgeColors: Record<string, string> = {
  image: "bg-blue-500/20 text-blue-400",
  video: "bg-emerald-500/20 text-emerald-400",
  voice: "bg-amber-500/20 text-amber-400",
};

const filters: { label: string; value: GenerationType }[] = [
  { label: "Todos", value: "all" },
  { label: "Imagens", value: "image" },
  { label: "Videos", value: "video" },
  { label: "Vozes", value: "voice" },
];

export default function GalleryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [filter, setFilter] = useState<GenerationType>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      let query = supabase
        .from("generations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("type", filter);
      }

      const { data } = await query;
      setGenerations((data as Generation[]) ?? []);
      setLoading(false);
    }

    fetchGenerations();
  }, [filter]);

  function handleDownload(url: string, type: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = `pixelai-${type}-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Galeria</h1>
          <p className="mt-1 text-zinc-400">
            Todas as suas gerações em um só lugar
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                filter === f.value
                  ? "bg-violet-600/20 text-violet-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      ) : generations.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <ImageIcon className="mb-4 h-12 w-12 text-zinc-600" />
          <p className="text-lg font-medium text-zinc-300">
            Nenhuma geração ainda
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Comece criando algo!
          </p>
        </Card>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {generations.map((gen) => {
            const Icon = typeIcons[gen.type] ?? ImageIcon;

            return (
              <div key={gen.id} className="mb-4 break-inside-avoid">
                <Card padding="none" hover className="group overflow-hidden">
                  {/* Preview */}
                  {gen.type === "image" ? (
                    <div className="relative aspect-square">
                      <img
                        src={gen.output_url || ""}
                        alt={gen.prompt || "Geração PixelAI"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : gen.type === "video" ? (
                    <div className="relative aspect-video">
                      <video
                        src={gen.output_url || ""}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        onMouseEnter={(e) =>
                          (e.target as HTMLVideoElement).play()
                        }
                        onMouseLeave={(e) => {
                          const v = e.target as HTMLVideoElement;
                          v.pause();
                          v.currentTime = 0;
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-zinc-800">
                      <Mic className="h-10 w-10 text-zinc-600" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${typeBadgeColors[gen.type]}`}
                      >
                        <Icon className="h-3 w-3" />
                        {typeLabels[gen.type]}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {formatDate(gen.created_at)}
                      </span>
                    </div>

                    {gen.prompt && (
                      <p className="mt-2 line-clamp-2 text-xs text-zinc-400">
                        {gen.prompt}
                      </p>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 w-full opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleDownload(gen.output_url || "", gen.type)}
                    >
                      <Download className="h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
