"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PersonStanding, Download, Sparkles, Upload, Video } from "lucide-react";

export default function MotionTransferPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragImage, setDragImage] = useState(false);
  const [dragVideo, setDragVideo] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  function handleImageFile(file: File) {
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImageUrl(url);
  }

  function handleVideoFile(file: File) {
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
    setVideoUrl(url);
  }

  async function handleGenerate() {
    if (!imageUrl || !videoUrl) return;
    setLoading(true);
    setError(null);
    setResultUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 7));
    }, 900);

    try {
      const res = await fetch("/api/generate/motion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, videoUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao transferir movimento");

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
              <PersonStanding className="h-5 w-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold">Transferencia de Movimento</h1>
          </div>
          <p className="text-zinc-400">
            Aplique movimentos de um video de referencia ao seu personagem usando IA.
          </p>
        </div>

        <div className="space-y-8">
          {/* Upload areas side by side */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Character image */}
            <Card>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-violet-400" />
                  <label className="text-sm font-medium text-zinc-300">
                    Imagem do personagem
                  </label>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragImage(true); }}
                  onDragLeave={() => setDragImage(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragImage(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) handleImageFile(file);
                  }}
                  onClick={() => imageInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer min-h-[200px]",
                    dragImage
                      ? "border-violet-500 bg-violet-600/10"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  )}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Personagem" className="max-h-40 rounded-lg" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-zinc-600" />
                      <p className="text-sm text-zinc-500 text-center">
                        Arraste ou clique para enviar
                      </p>
                    </>
                  )}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageFile(file);
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Reference video */}
            <Card>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-violet-400" />
                  <label className="text-sm font-medium text-zinc-300">
                    Video de referencia (movimento)
                  </label>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragVideo(true); }}
                  onDragLeave={() => setDragVideo(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragVideo(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("video/")) handleVideoFile(file);
                  }}
                  onClick={() => videoInputRef.current?.click()}
                  className={cn(
                    "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer min-h-[200px]",
                    dragVideo
                      ? "border-violet-500 bg-violet-600/10"
                      : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                  )}
                >
                  {videoPreview ? (
                    <video src={videoPreview} className="max-h-40 rounded-lg" muted autoPlay loop />
                  ) : (
                    <>
                      <Video className="h-8 w-8 text-zinc-600" />
                      <p className="text-sm text-zinc-500 text-center">
                        Arraste ou clique para enviar
                      </p>
                    </>
                  )}
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVideoFile(file);
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Cost + Generate */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Custo: <span className="text-violet-400 font-medium">5 creditos</span>
            </span>
            <Button
              onClick={handleGenerate}
              loading={loading}
              disabled={!imageUrl || !videoUrl}
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
                    Transferindo movimento... {Math.round(progress)}%
                  </p>
                </div>
              </div>
            ) : resultUrl ? (
              <div className="w-full p-4">
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
                <PersonStanding className="h-12 w-12" />
                <p className="text-sm">O resultado aparecerá aqui</p>
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
  );
}
