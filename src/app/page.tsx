"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import {
  ImagePlus,
  Video,
  ScanFace,
  Mic,
  Maximize,
  Move,
  Zap,
  Download,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
  TrendingUp,
  Wand2,
  Users,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: ImagePlus,
    title: "Criação de Influenciadores",
    description: "Gere influenciadores digitais ultra-realistas com prompts simples. Sem modelos, sem estúdio.",
  },
  {
    icon: Video,
    title: "Vídeos Ultra-Realistas",
    description: "Transforme imagens em vídeos com movimentos naturais para Reels, TikTok e Stories.",
  },
  {
    icon: Move,
    title: "Motion Control",
    description: "Copie movimentos de qualquer vídeo de referência e aplique no seu personagem IA.",
  },
  {
    icon: ScanFace,
    title: "Troca de Rosto",
    description: "Face swap profissional em fotos e vídeos com um clique. Resultado instantâneo.",
  },
  {
    icon: BookOpen,
    title: "Biblioteca de Prompts",
    description: "Templates prontos por nicho: moda, fitness, beleza, finanças, tech e mais.",
  },
  {
    icon: Mic,
    title: "Áudio Realista",
    description: "Vozes naturais em português, inglês, espanhol e árabe. Multilíngue.",
  },
  {
    icon: Maximize,
    title: "Upscale 4K",
    description: "Aumente a resolução de qualquer imagem para qualidade ultra HD profissional.",
  },
  {
    icon: TrendingUp,
    title: "Tendências Virais",
    description: "Templates atualizados semanalmente com as tendências que estão bombando.",
  },
  {
    icon: Wand2,
    title: "Prompt Cloner",
    description: "Envie qualquer imagem e a IA gera o prompt perfeito para reproduzi-la.",
  },
];

const steps = [
  {
    icon: Sparkles,
    title: "Descreva sua ideia",
    description: "Escreva um prompt ou escolha um dos nossos templates prontos por nicho.",
  },
  {
    icon: Zap,
    title: "A IA gera em segundos",
    description: "Nossa IA cria fotos, vídeos ou áudio com qualidade profissional.",
  },
  {
    icon: Download,
    title: "Baixe e publique",
    description: "Download em alta resolução, pronto para Reels, TikTok e Stories.",
  },
];

const competitors = [
  { name: "Google Veo Ultra", price: "R$ 1.375" },
  { name: "ChatGPT Pro", price: "R$ 1.100" },
  { name: "Kling AI Pro", price: "R$ 200" },
  { name: "Magnific AI", price: "R$ 540" },
  { name: "ElevenLabs Pro", price: "R$ 540" },
  { name: "Midjourney", price: "R$ 220" },
];

const faqs = [
  {
    q: "O que é a PixelAI?",
    a: "PixelAI é uma plataforma all-in-one que reúne as melhores ferramentas de IA para criação de conteúdo digital. Você pode gerar influenciadores digitais, vídeos, trocar rostos, criar vozes e muito mais — tudo em um só lugar.",
  },
  {
    q: "Preciso pagar para criar uma conta?",
    a: "Não. Criar conta é 100% gratuito e você já recebe 5 créditos de boas-vindas para testar todas as ferramentas. Você só paga quando quiser comprar mais créditos.",
  },
  {
    q: "O que posso fazer com os créditos?",
    a: "Cada crédito permite uma geração. Por exemplo: 1 crédito = 1 imagem, 5 créditos = 1 vídeo, 2 créditos = 1 áudio, 1 crédito = 1 face swap ou upscale. Os créditos nunca expiram.",
  },
  {
    q: "Tem assinatura mensal?",
    a: "Não. A PixelAI funciona com pacotes de créditos avulsos. Você compra quando quiser e usa no seu ritmo, sem compromisso mensal.",
  },
  {
    q: "Posso usar para criar conteúdo comercial?",
    a: "Sim. Todo conteúdo gerado na PixelAI é seu para usar comercialmente — em anúncios, redes sociais, e-commerce ou qualquer outro fim.",
  },
  {
    q: "Quais formas de pagamento aceita?",
    a: "Aceitamos cartão de crédito, PIX e boleto bancário via Stripe, a plataforma de pagamentos mais segura do mundo.",
  },
  {
    q: "Em quantos idiomas a IA gera vozes?",
    a: "Atualmente geramos vozes em português, inglês, espanhol e árabe, com qualidade indistinguível de uma voz humana real.",
  },
  {
    q: "O que acontece se a geração falhar?",
    a: "Se uma geração falhar por erro da plataforma, seus créditos são devolvidos automaticamente. Sem risco.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const totalCompetitors = competitors.reduce(
    (sum, c) => sum + parseInt(c.price.replace(/\D/g, "")),
    0
  );

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
              100% Inteligência Artificial
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              A Plataforma para Criar a Próxima Geração de{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Influenciadores Digitais
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 sm:text-xl">
              Sem estúdio, sem modelos, sem complicação. Gere fotos, vídeos e vozes
              de influenciadores 100% criados por IA. Crie sua conta grátis.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500 hover:shadow-violet-500/30"
              >
                Começar Grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Social proof */}
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-violet-400 to-purple-600"
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-400">
                  <span className="font-semibold text-white">1.000+</span> criadores ativos
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Shield className="h-4 w-4 text-violet-400" />
                <span>5 créditos grátis ao criar conta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">
            100% inteligência artificial
          </h2>
          <p className="mt-3 text-zinc-400">
            Sem fotos reais. Sem modelos. Sem estúdio. Tudo gerado por IA.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center"
              >
                <div className="text-center">
                  <Users className="mx-auto h-8 w-8 text-zinc-600" />
                  <p className="mt-2 text-xs text-zinc-600">Influencer IA</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Crie sua conta grátis para ver exemplos reais de influenciadores gerados.
          </p>
        </div>
      </section>

      {/* Features — 9 cards */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="mt-3 text-zinc-400">
              9 ferramentas de IA integradas para criar conteúdo profissional.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 transition-all hover:border-violet-500/40 hover:bg-zinc-900/60"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-600/15 transition-colors group-hover:bg-violet-600/25">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800/50 bg-zinc-950/80 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white">
            Simples assim. 3 passos.
          </h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/15 ring-1 ring-violet-500/20">
                    <Icon className="h-8 w-8 text-violet-400" />
                  </div>
                  <div className="mb-2 text-sm font-medium text-violet-400">
                    Passo {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{s.description}</p>
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
            <h2 className="text-3xl font-bold text-white">FAÇA AS CONTAS</h2>
            <p className="mt-3 text-zinc-400">
              Quanto você gastaria contratando cada ferramenta separadamente?
            </p>
          </div>
          <div className="mt-12 space-y-3">
            {competitors.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/30 px-6 py-4"
              >
                <span className="text-sm font-medium text-zinc-300">{c.name}</span>
                <span className="text-sm font-semibold text-zinc-400">{c.price}/mês</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/5 px-6 py-4">
              <span className="text-sm font-bold text-red-400">Total por mês</span>
              <span className="text-lg font-bold text-red-400">
                R$ {totalCompetitors.toLocaleString("pt-BR")}/mês
              </span>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-violet-500/30 bg-violet-600/10 p-8 text-center">
            <p className="text-lg font-semibold text-white">
              A PixelAI não tem mensalidade.
            </p>
            <p className="mt-2 text-zinc-400">
              Você compra pacotes de créditos e usa quando quiser. Sem compromisso.
            </p>
            <Link
              href="/auth/register"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500"
            >
              Criar Conta Grátis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-zinc-800/50 bg-zinc-950/80 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15">
                <Shield className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="font-semibold text-white">Pagamento Seguro</h3>
              <p className="mt-1 text-sm text-zinc-400">Stripe, a plataforma mais segura do mundo</p>
            </div>
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15">
                <Clock className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="font-semibold text-white">Créditos sem Validade</h3>
              <p className="mt-1 text-sm text-zinc-400">Use quando quiser, no seu ritmo</p>
            </div>
            <div>
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/15">
                <Zap className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="font-semibold text-white">Geração Instantânea</h3>
              <p className="mt-1 text-sm text-zinc-400">Resultados em segundos, não horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-white">
            Perguntas Frequentes
          </h2>
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-800 bg-zinc-900/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-white cursor-pointer"
                >
                  {faq.q}
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-zinc-800 px-6 py-4 text-sm text-zinc-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50 bg-gradient-to-b from-zinc-950 to-violet-950/20 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">
            Comece a criar agora
          </h2>
          <p className="mt-4 text-zinc-400">
            Crie sua conta grátis e receba 5 créditos para testar todas as ferramentas.
            Sem cartão de crédito, sem compromisso.
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500"
          >
            Criar Conta Grátis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
