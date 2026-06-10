"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Repeat2, Download, Sparkles, Upload, User, Image as ImageIcon } from "lucide-react";

export default function FaceSwapPage() {
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [targetPreview, setTargetPreview] = useState<string | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragSource, setDragSource] = useState(false);
  const [dragTarget, setDragTarget] = useState(false);
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File, type: "source" | "target") {
    const url = URL.createObjectURL(file);
    if (type === "source") {
      setSourcePreview(url);
      setSourceUrl(url);
    } else {
      setTargetPreview(url);
      setTargetUrl(url);
    }
  }

  function handleDrop(e: React.DragEvent, type: "source" | "target") {
    e.preventDefault();
    type === "source" ? setDragSource(false) : setDragTarget(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      handleFile(file, type);
    }
  }

  async function handleGenerate() {
    if (!sourceUrl || !targetUrl) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 12));
    }, 600);

    try {
      const res = await fetch("/api/generate/face-swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceUrl, targetUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao trocar rosto");

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
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20">
              <Repeat2 className="h-5 w-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold">Face Swap</h1>
          </div>
          <p className="text-zinc-400">
            Troque rostos entre imagens ou videos com precisao usando IA.
          </p>
        </div>

        <div className="space-y-8">
          {/* Upload areas side by side */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Source face */}
            <Card>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-violet-400" />
                  <label className="text-sm font-medium text-zinc-300">
                    Rosto de origem
                  </label>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragSource(true); }}
                  onDragLeave={() => setDragSource(false)}
                  onDrop={(e) => handleDrop(e, "source")}
                  onClick={() => sourceInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer min-h-[200px]",
                    dragSource
                      ? "border-violet-500 bg-violet-600/10"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  )}
                >
                  {sourcePreview ? (
                    <img src={sourcePreview} alt="Rosto de origem" className="max-h-40 rounded-lg" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-zinc-600" />
                      <p className="text-sm text-zinc-500 text-center">
                        Arraste ou clique para enviar
                      </p>
                    </>
                  )}
                  <input
                    ref={sourceInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file, "source");
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Target image/video */}
            <Card>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-violet-400" />
                  <label className="text-sm font-medium text-zinc-300">
                    Imagem/Video destino
                  </label>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragTarget(true); }}
                  onDragLeave={() => setDragTarget(false)}
                  onDrop={(e) => handleDrop(e, "target")}
                  onClick={() => targetInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer min-h-[200px]",
                    dragTarget
                      ? "border-violet-500 bg-violet-600/10"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  )}
                >
                  {targetPreview ? (
                    <img src={targetPreview} alt="Imagem destino" className="max-h-40 rounded-lg" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-zinc-600" />
                      <p className="text-sm text-zinc-500 text-center">
                        Arraste ou clique para enviar
                      </p>
                    </>
                  )}
                  <input
                    ref={targetInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file, "target");
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Cost + Generate */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Custo: <span className="text-violet-400 font-medium">1 crédito</span>
            </span>
            <Button
              onClick={handleGenerate}
              loading={loading}
              disabled={!sourceUrl || !targetUrl}
              size="lg"
            >
              <Sparkles className="h-4 w-4" />
              Gerar
            </Button>
          </div>

          {/* Result */}
          <Card className="min-h-[300px] flex items-center justify-center overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center gap-4 p-8">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
                  <div className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
                </div>
                <div className="w-48">
                  <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-zinc-500">
                    Processando face swap... {Math.round(progress)}%
                  </p>
                </div>
              </div>
            ) : resultUrl ? (
              <div className="w-full p-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-2">Origem</p>
                    {sourcePreview && (
                      <img src={sourcePreview} alt="Origem" className="rounded-lg mx-auto max-h-48" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-2">Destino</p>
                    {targetPreview && (
                      <img src={targetPreview} alt="Destino" className="rounded-lg mx-auto max-h-48" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-violet-400 mb-2 font-medium">Resultado</p>
                    <img src={resultUrl} alt="Resultado" className="rounded-lg mx-auto max-h-48" />
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-zinc-600">
                <Repeat2 className="h-12 w-12" />
                <p className="text-sm">O resultado aparecerá aqui</p>
              </div>
            )}
          </Card>

          {resultUrl && (
            <a href={resultUrl} download target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="w-full">
                <Download className="h-4 w-4" />
                Baixar Resultado
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
