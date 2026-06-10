"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mic, Download, Sparkles } from "lucide-react";

const LANGUAGES = [
  { label: "Portugues", value: "pt" },
  { label: "English", value: "en" },
  { label: "Espanol", value: "es" },
  { label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", value: "ar" },
];

const VOICES = [
  { label: "Feminina Suave", value: "feminina_suave" },
  { label: "Masculina Grave", value: "masculina_grave" },
  { label: "Feminina Energetica", value: "feminina_energetica" },
  { label: "Masculina Jovem", value: "masculina_jovem" },
];

export default function CreateVoicePage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("pt");
  const [voiceId, setVoiceId] = useState("feminina_suave");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + Math.random() * 18));
    }, 400);

    try {
      const res = await fetch("/api/generate/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, voiceId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao gerar voz");

      setProgress(100);

      if (data.audioBase64) {
        const blob = new Blob(
          [Uint8Array.from(atob(data.audioBase64), (c) => c.charCodeAt(0))],
          { type: "audio/mpeg" }
        );
        setAudioUrl(URL.createObjectURL(blob));
      } else if (data.url) {
        setAudioUrl(data.url);
      }
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
              <Mic className="h-5 w-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold">Gerar Voz</h1>
          </div>
          <p className="text-zinc-400">
            Transforme texto em audio com vozes naturais em vários idiomas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-5">
                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Texto
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Digite o texto que será convertido em áudio..."
                    rows={5}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-950 resize-none"
                  />
                  <span className="text-xs text-zinc-600 text-right">
                    {text.length} caracteres
                  </span>
                </div>

                {/* Language */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Idioma
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => setLanguage(lang.value)}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm transition-all cursor-pointer",
                          language === lang.value
                            ? "border-violet-500 bg-violet-600/20 text-violet-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-zinc-300">
                    Voz
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {VOICES.map((voice) => (
                      <button
                        key={voice.value}
                        onClick={() => setVoiceId(voice.value)}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-sm transition-all cursor-pointer text-left",
                          voiceId === voice.value
                            ? "border-violet-500 bg-violet-600/20 text-violet-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                        )}
                      >
                        {voice.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost + Generate */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-zinc-500">
                    Custo: <span className="text-violet-400 font-medium">2 créditos</span>
                  </span>
                  <Button
                    onClick={handleGenerate}
                    loading={loading}
                    disabled={!text.trim()}
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
                      Sintetizando voz... {Math.round(progress)}%
                    </p>
                  </div>
                </div>
              ) : audioUrl ? (
                <div className="w-full p-6 space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600/20">
                      <Mic className="h-10 w-10 text-violet-400" />
                    </div>
                    <p className="text-sm text-zinc-400 text-center">
                      Áudio gerado com sucesso
                    </p>
                  </div>
                  <audio
                    src={audioUrl}
                    controls
                    autoPlay
                    className="w-full"
                  />
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 p-8 text-zinc-600">
                  <Mic className="h-12 w-12" />
                  <p className="text-sm">Seu audio aparecerá aqui</p>
                </div>
              )}
            </Card>

            {audioUrl && (
              <a href={audioUrl} download="audio-pixelai.mp3">
                <Button variant="secondary" className="w-full">
                  <Download className="h-4 w-4" />
                  Baixar Áudio
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
