"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Check, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const plans = [
  {
    name: "Grátis",
    id: "free",
    credits: 5,
    price: "R$ 0",
    priceNum: 0,
    desc: "Para experimentar a plataforma",
    features: [
      "Créditos de boas-vindas",
      "Acesso a todas as ferramentas",
      "Download em alta qualidade",
    ],
  },
  {
    name: "Starter",
    id: "starter",
    credits: 50,
    price: "R$ 19,90",
    priceNum: 19.9,
    desc: "Para quem está começando",
    features: [
      "50 créditos",
      "~50 imagens ou ~10 vídeos",
      "Todos os estilos e templates",
      "Download em alta qualidade",
      "Sem validade",
    ],
  },
  {
    name: "Creator",
    id: "creator",
    credits: 200,
    price: "R$ 59,90",
    priceNum: 59.9,
    popular: true,
    desc: "Para criadores de conteúdo",
    features: [
      "200 créditos",
      "~200 imagens ou ~40 vídeos",
      "Todos os estilos e templates",
      "Face swap + motion transfer",
      "Voz IA multilíngue",
      "Upscale 4K",
      "Sem validade",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    credits: 500,
    price: "R$ 129,90",
    priceNum: 129.9,
    desc: "Para profissionais e agências",
    features: [
      "500 créditos",
      "~500 imagens ou ~100 vídeos",
      "Tudo do Creator",
      "Prioridade na fila",
      "Sem validade",
    ],
  },
  {
    name: "Business",
    id: "business",
    credits: 2000,
    price: "R$ 397,00",
    priceNum: 397,
    desc: "Para operações em escala",
    features: [
      "2.000 créditos",
      "~2000 imagens ou ~400 vídeos",
      "Tudo do Pro",
      "Melhor custo por crédito",
      "Sem validade",
    ],
  },
];

const creditTable = [
  { tool: "Gerar Imagem", cost: 1 },
  { tool: "Gerar Vídeo", cost: 5 },
  { tool: "Troca de Rosto", cost: 1 },
  { tool: "Voz IA", cost: 2 },
  { tool: "Upscale 4K", cost: 1 },
  { tool: "Motion Transfer", cost: 5 },
  { tool: "Prompt Cloner", cost: 1 },
];

const faqs = [
  {
    q: "Os créditos expiram?",
    a: "Não. Seus créditos nunca expiram. Use quando quiser, no seu ritmo.",
  },
  {
    q: "Posso comprar mais de um pacote?",
    a: "Sim! Os créditos são cumulativos. Compre quantos pacotes precisar.",
  },
  {
    q: "Qual a diferença entre 1 crédito e 5 créditos?",
    a: "Ferramentas mais simples como gerar imagem custam 1 crédito. Ferramentas mais complexas como vídeo e motion transfer custam 5 créditos por usarem mais processamento.",
  },
  {
    q: "Tem reembolso?",
    a: "Se a geração falhar por erro da plataforma, os créditos são devolvidos automaticamente.",
  },
  {
    q: "Aceita PIX?",
    a: "Sim! No checkout, você pode pagar com cartão de crédito, PIX ou boleto.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/register");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-zinc-800/50 bg-zinc-950 py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h1 className="text-4xl font-bold text-white">
              Preços simples,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                sem surpresas
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Sem assinatura mensal. Compre créditos e use quando quiser.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="bg-zinc-950 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-xl border p-6 ${
                    plan.popular
                      ? "border-violet-500 bg-violet-600/10 shadow-lg shadow-violet-600/10"
                      : "border-zinc-800 bg-zinc-900/30"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-violet-600 px-3 py-0.5 text-xs font-medium text-white">
                      <Zap className="h-3 w-3" /> Mais Popular
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{plan.desc}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{plan.credits} créditos</p>
                  {plan.priceNum > 0 && (
                    <p className="mt-1 text-xs text-zinc-600">
                      R$ {(plan.priceNum / plan.credits).toFixed(2)} por crédito
                    </p>
                  )}

                  <ul className="mt-6 flex-1 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.id === "free" ? "/auth/register" : "/auth/register"}
                    className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                      plan.popular
                        ? "bg-violet-600 text-white hover:bg-violet-500"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {plan.id === "free" ? "Criar Conta Grátis" : "Comprar Agora"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credit cost table */}
        <section className="border-t border-zinc-800/50 bg-zinc-950/80 py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Custo por ferramenta
            </h2>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="px-6 py-3 text-left font-medium text-zinc-400">Ferramenta</th>
                    <th className="px-6 py-3 text-right font-medium text-zinc-400">Créditos</th>
                  </tr>
                </thead>
                <tbody>
                  {creditTable.map((row) => (
                    <tr key={row.tool} className="border-b border-zinc-800/50 last:border-0">
                      <td className="px-6 py-3 text-zinc-300">{row.tool}</td>
                      <td className="px-6 py-3 text-right font-medium text-violet-400">
                        {row.cost} {row.cost === 1 ? "crédito" : "créditos"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-zinc-800/50 bg-zinc-950 py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Perguntas frequentes
            </h2>
            <div className="space-y-3">
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
                      <ChevronUp className="h-4 w-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-zinc-400" />
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
      </main>

      <Footer />
    </div>
  );
}
