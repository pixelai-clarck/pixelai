"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useLocale } from "@/lib/locale-context";
import { useState } from "react";
import {
  ImagePlus, Video, ScanFace, Mic, Maximize, Move, Zap, Download,
  Sparkles, ArrowRight, ChevronDown, ChevronUp, BookOpen, TrendingUp,
  Wand2, Users, Shield, Clock,
} from "lucide-react";

const featureKeys = [
  { icon: ImagePlus, key: "influencer" },
  { icon: Video, key: "video" },
  { icon: Move, key: "motion" },
  { icon: ScanFace, key: "faceswap" },
  { icon: BookOpen, key: "prompts" },
  { icon: Mic, key: "voice" },
  { icon: Maximize, key: "upscale" },
  { icon: TrendingUp, key: "trends" },
  { icon: Wand2, key: "cloner" },
];

const stepIcons = [Sparkles, Zap, Download];

const competitors = [
  { name: "Google Veo Ultra", price: 1375 },
  { name: "ChatGPT Pro", price: 1100 },
  { name: "Kling AI Pro", price: 200 },
  { name: "Magnific AI", price: 540 },
  { name: "ElevenLabs Pro", price: 540 },
  { name: "Midjourney", price: 220 },
];

export default function HomePage() {
  const { t } = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const total = competitors.reduce((s, c) => s + c.price, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTI0LDU4LDIzNywwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero.title1")}{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500 hover:shadow-violet-500/30"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-violet-400 to-purple-600" />
                  ))}
                </div>
                <span className="text-sm text-zinc-400">
                  <span className="font-semibold text-white">1.000+</span> {t("hero.creators")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Shield className="h-4 w-4 text-violet-400" />
                {t("hero.trust")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results placeholder */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">{t("results.title")}</h2>
          <p className="mt-3 text-zinc-400">{t("results.subtitle")}</p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <Users className="mx-auto h-8 w-8 text-zinc-600" />
                  <p className="mt-2 text-xs text-zinc-600">AI Influencer</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">{t("results.cta")}</p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{t("features.title")}</h2>
            <p className="mt-3 text-zinc-400">{t("features.subtitle")}</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureKeys.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.key} className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-violet-500/40 hover:bg-zinc-900/60">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-600/15 transition-colors group-hover:bg-violet-600/25">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t(`feat.${f.key}`)}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{t(`feat.${f.key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-zinc-800/50 bg-zinc-950/80 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white">{t("steps.title")}</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[1, 2, 3].map((i) => {
              const Icon = stepIcons[i - 1];
              return (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/15 ring-1 ring-violet-500/20">
                    <Icon className="h-8 w-8 text-violet-400" />
                  </div>
                  <div className="mb-2 text-sm font-medium text-violet-400">
                    {i}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{t(`step${i}.title`)}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{t(`step${i}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Do the math */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{t("math.title")}</h2>
            <p className="mt-3 text-zinc-400">{t("math.subtitle")}</p>
          </div>
          <div className="mt-12 space-y-3">
            {competitors.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/30 px-6 py-4">
                <span className="text-sm font-medium text-zinc-300">{c.name}</span>
                <span className="text-sm font-semibold text-zinc-400">R$ {c.price.toLocaleString("pt-BR")}{t("math.month")}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/5 px-6 py-4">
              <span className="text-sm font-bold text-red-400">{t("math.total")}</span>
              <span className="text-lg font-bold text-red-400">R$ {total.toLocaleString("pt-BR")}{t("math.month")}</span>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-violet-500/30 bg-violet-600/10 p-8 text-center">
            <p className="text-lg font-semibold text-white">{t("math.pitch")}</p>
            <p className="mt-2 text-zinc-400">{t("math.pitch2")}</p>
            <Link href="/auth/register" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500">
              {t("math.cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-zinc-800/50 bg-zinc-950/80 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            {[
              { icon: Shield, title: t("trust.payment"), desc: t("trust.payment.desc") },
              { icon: Clock, title: t("trust.credits"), desc: t("trust.credits.desc") },
              { icon: Zap, title: t("trust.speed"), desc: t("trust.speed.desc") },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white">{t("faq.title")}</h2>
          <div className="mt-12 space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/30">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-white cursor-pointer"
                >
                  {t(`faq.${i}.q`)}
                  {openFaq === i ? <ChevronUp className="h-4 w-4 shrink-0 text-zinc-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />}
                </button>
                {openFaq === i && (
                  <div className="border-t border-zinc-800 px-6 py-4 text-sm text-zinc-400">{t(`faq.${i}.a`)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50 bg-gradient-to-b from-zinc-950 to-violet-950/20 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">{t("cta.title")}</h2>
          <p className="mt-4 text-zinc-400">{t("cta.subtitle")}</p>
          <Link href="/auth/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500">
            {t("cta.button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
