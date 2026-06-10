"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Video, Download, Sparkles, Upload, Link } from "lucide-react";

const DURATIONS = [
  { label: "3s", value: 3 },
  { label: "5s", value: 5 },
  { label: "10s", value: 10 },
];

export default function CreateVideoPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(5);
  const [inputMode, setInputMode] = useState<"upload" | "url">("upload");
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
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 8));
    }, 800);

    try {
      const res = await fetch("/api/generate/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: inputMode === "url" ? imageUrl : imagePreview,
          prompt,
          duration,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao gerar video");

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
              <Video className="h-5 w-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold">Gerar Video</h1>
          </div>
          <p className="text-zinc-400">
            Transforme imagens estáticas em vídeos com movimentos naturais usando IA.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-5">
                {/* Input mode toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setInputMode("upload")}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all cursor-pointer",
                      inputMode === "upload"
                        ? "border-violet-500 bg-violet-600/20 text-violet-300"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                    )}
                  >
                    <Upload className="h-3.5 w-3.5" /> Upload
                  </button>
                  <button
                    onClick={() => setInputMode("url")}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all cursor-pointer",
                      inputMode === "url"
                        ? "border-violet-500 bg-violet-600/20 text-violet-300"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                    )}
                  >
                    <Link className="h-3.5 w-3.5" /> URL
                  </button>
                </div>

                {/* Upload / URL */}
                {inputMode === "upload" ? (
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
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg" />
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
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-300">
                      URL da imagem
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                    />
                  </div>
                )}

                {/* Motion prompt */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Prompt de movimento
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Descreva o movimento desejado..."
                    rows={3}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 resize-none"
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Duração
                  </label>
                  <div className="flex gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setDuration(d.value)}
                        className={cn(
                          "rounded-lg border px-4 py-1.5 text-sm transition-all cursor-pointer",
                          duration === d.value
                            ? "border-violet-500 bg-violet-600/20 text-violet-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost + Generate */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-zinc-500">
                    Custo: <span className="text-violet-400 font-medium">5 creditos</span>
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
          </div>

          {/* Result */}
          <div className="space-y-4">
            <Card className="min-h-[400px] flex items-center justify-center overflow-hidden">
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
                      Gerando video... {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              ) : resultUrl ? (
                <div className="w-full">
                  <video
                    src={resultUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full rounded-lg"
                  />
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 p-8 text-zinc-600">
                  <Video className="h-12 w-12" />
                  <p className="text-sm">Seu video aparecerá aqui</p>
                </div>
              )}
            </Card>

            {resultUrl && (
              <a href={resultUrl} download target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full">
                  <Download className="h-4 w-4" />
                  Baixar Video
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
