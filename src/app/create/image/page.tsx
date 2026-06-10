"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ImageIcon, Download, Sparkles } from "lucide-react";

const STYLES = ["Realista", "Fashion", "Fitness", "Casual", "Profissional"];
const ASPECT_RATIOS = ["1:1", "9:16", "16:9"];

export default function CreateImagePage() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const templatePrompt = searchParams.get("prompt");
    if (templatePrompt) setPrompt(templatePrompt);
  }, [searchParams]);
  const [style, setStyle] = useState("Realista");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 15));
    }, 500);

    try {
      const res = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, aspectRatio }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao gerar imagem");

      setProgress(100);
      setResultUrl(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }

  return (
    <div className="text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20">
              <ImageIcon className="h-5 w-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold">Gerar Imagem</h1>
          </div>
          <p className="text-zinc-400">
            Crie influenciadores digitais realistas com IA. Descreva o visual desejado e escolha o estilo.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-5">
                {/* Prompt */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Descreva o influenciador digital que voce quer criar..."
                    rows={4}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 resize-none"
                  />
                </div>

                {/* Style */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Estilo
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STYLES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm transition-all cursor-pointer",
                          style === s
                            ? "border-violet-500 bg-violet-600/20 text-violet-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Proporção
                  </label>
                  <div className="flex gap-2">
                    {ASPECT_RATIOS.map((ar) => (
                      <button
                        key={ar}
                        onClick={() => setAspectRatio(ar)}
                        className={cn(
                          "rounded-lg border px-4 py-1.5 text-sm transition-all cursor-pointer",
                          aspectRatio === ar
                            ? "border-violet-500 bg-violet-600/20 text-violet-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost + Generate */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-zinc-500">
                    Custo: <span className="text-violet-400 font-medium">1 crédito</span>
                  </span>
                  <Button
                    onClick={handleGenerate}
                    loading={loading}
                    disabled={!prompt.trim()}
                    size="lg"
                  >
                    <Sparkles className="h-4 w-4" />
                    Gerar
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Result */}
          <div className="space-y-4">
            <Card className="min-h-[400px] flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center gap-4 p-8">
                  <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
                    <div
                      className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"
                    />
                  </div>
                  <div className="w-48">
                    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-center text-xs text-zinc-500">
                      Gerando imagem... {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              ) : resultUrl ? (
                <div className="w-full">
                  <img
                    src={resultUrl}
                    alt="Imagem gerada"
                    className="w-full rounded-lg"
                  />
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 p-8 text-zinc-600">
                  <ImageIcon className="h-12 w-12" />
                  <p className="text-sm">Sua imagem aparecerá aqui</p>
                </div>
              )}
            </Card>

            {resultUrl && (
              <a
                href={resultUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" className="w-full">
                  <Download className="h-4 w-4" />
                  Baixar Imagem
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
