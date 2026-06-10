import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
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
  Check,
} from "lucide-react";

const features = [
  {
    icon: ImagePlus,
    title: "Gerar Fotos IA",
    description: "Crie influenciadores digitais realistas em segundos com prompts simples.",
  },
  {
    icon: Video,
    title: "Foto para Vídeo",
    description: "Transforme imagens estáticas em vídeos com movimentos naturais.",
  },
  {
    icon: ScanFace,
    title: "Troca de Rosto",
    description: "Face swap profissional em fotos e vídeos com um clique.",
  },
  {
    icon: Mic,
    title: "Voz Realista",
    description: "Gere vozes naturais em português, inglês, espanhol e árabe.",
  },
  {
    icon: Maximize,
    title: "Upscale 4K",
    description: "Aumente a resolução das suas imagens para qualidade ultra HD.",
  },
  {
    icon: Move,
    title: "Motion Transfer",
    description: "Copie movimentos de um vídeo de referência para seu personagem IA.",
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

const plans = [
  { name: "Grátis", credits: 5, price: "R$ 0", desc: "Para experimentar" },
  { name: "Starter", credits: 50, price: "R$ 19,90", desc: "Para começar" },
  {
    name: "Creator",
    credits: 200,
    price: "R$ 59,90",
    desc: "Mais popular",
    popular: true,
  },
  { name: "Pro", credits: 500, price: "R$ 129,90", desc: "Para profissionais" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTI0LDU4LDIzNywwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Crie Influenciadores Digitais com IA{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                em Segundos
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 sm:text-xl">
              Sem estúdio, sem modelos, sem complicação. Gere fotos, vídeos e vozes
              de influenciadores 100% criados por IA. A partir de R$ 19,90.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:bg-violet-500 hover:shadow-violet-500/30"
              >
                Começar Grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-3.5 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
              >
                Ver Preços
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="mt-3 text-zinc-400">
              6 ferramentas de IA integradas para criar conteúdo profissional.
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
            Como funciona
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

      {/* Pricing preview */}
      <section className="border-t border-zinc-800/50 bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Preços acessíveis para todos
            </h2>
            <p className="mt-3 text-zinc-400">
              Comece grátis. Sem assinatura. Pague apenas pelo que usar.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-xl border p-6 transition-all ${
                  p.popular
                    ? "border-violet-500 bg-violet-600/10 shadow-lg shadow-violet-600/10"
                    : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{p.desc}</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">{p.price}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  {p.credits} créditos
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" /> 1 crédito = 1 imagem
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" /> 5 créditos = 1 vídeo
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" /> Sem validade
                  </li>
                </ul>
                <Link
                  href="/auth/register"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                    p.popular
                      ? "bg-violet-600 text-white hover:bg-violet-500"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {p.price === "R$ 0" ? "Criar Conta Grátis" : "Começar Agora"}
                </Link>
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
            Junte-se a milhares de criadores que já usam PixelAI para produzir
            conteúdo profissional com inteligência artificial.
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
