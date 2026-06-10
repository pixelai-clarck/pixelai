"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ZoomIn, Download, Sparkles, Upload } from "lucide-react";

const SCALES = [
  { label: "2x", value: 2 },
  { label: "4x", value: 4 },
];

export default function UpscalePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [scale, setScale] = useState(4);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImageUrl(url);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  async function handleGenerate() {
    if (!imageUrl && !imagePreview) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 14));
    }, 500);

    try {
      const res = await fetch("/api/generate/upscale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: imageUrl || imagePreview, scale }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao melhorar imagem");

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
              <ZoomIn className="h-5 w-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold">Upscale de Imagem</h1>
          </div>
          <p className="text-zinc-400">
            Aumente a resolução das suas imagens sem perder qualidade usando IA.
          </p>
        </div>

        <div className="space-y-8">
          {/* Upload + Settings */}
          <Card>
            <div className="space-y-5">
              {/* Upload */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer",
                  dragActive
                    ? "border-violet-500 bg-violet-600/10"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                )}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-zinc-600" />
                    <p className="text-sm text-zinc-500">
                      Arraste uma imagem ou clique para selecionar
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </div>

              {/* Scale */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-300">
                  Fator de escala
                </label>
                <div className="flex gap-2">
                  {SCALES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setScale(s.value)}
                      className={cn(
                        "rounded-lg border px-6 py-2 text-sm font-medium transition-all cursor-pointer",
                        scale === s.value
                          ? "border-violet-500 bg-violet-600/20 text-violet-300"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      )}
                    >
                      {s.label}
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
                  disabled={!imageUrl && !imagePreview}
                  size="lg"
                >
                  <Sparkles className="h-4 w-4" />
                  Gerar
                </Button>
              </div>
            </div>
          </Card>

          {/* Result - Before/After */}
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
                    Aumentando resolução... {Math.round(progress)}%
                  </p>
                </div>
              </div>
            ) : resultUrl ? (
              <div className="w-full p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 mb-2">Antes</p>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Antes"
                        className="rounded-lg mx-auto max-h-64 border border-zinc-800"
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-violet-400 mb-2 font-medium">
                      Depois ({scale}x)
                    </p>
                    <img
                      src={resultUrl}
                      alt="Depois"
                      className="rounded-lg mx-auto max-h-64 border border-violet-500/30"
                    />
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-zinc-600">
                <ZoomIn className="h-12 w-12" />
                <p className="text-sm">O resultado aparecerá aqui</p>
              </div>
            )}
          </Card>

          {resultUrl && (
            <a href={resultUrl} download target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="w-full">
                <Download className="h-4 w-4" />
                Baixar Imagem HD
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
