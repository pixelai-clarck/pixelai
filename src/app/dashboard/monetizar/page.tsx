"use client";

import { useState } from "react";
import {
  DollarSign, ShoppingBag, Camera, Play, Heart, Megaphone,
  Palette, Globe, Package, Laptop, TrendingUp, Users, ChevronDown,
  ChevronUp, Zap, Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Strategy {
  id: string;
  icon: typeof DollarSign;
  title: string;
  description: string;
  earnings: string;
  difficulty: "Fácil" | "Médio" | "Avançado";
  difficultyColor: string;
  platforms: string[];
  tips: string[];
  howToStart: string[];
}

const strategies: Strategy[] = [
  {
    id: "ugc",
    icon: Camera,
    title: "UGC para Marcas",
    description: "Crie conteúdo publicitário (User Generated Content) para marcas usando influenciadores gerados por IA. Marcas pagam entre R$500 a R$5.000 por pacote de conteúdo sem saber que é IA.",
    earnings: "R$ 2.000 — R$ 15.000/mês",
    difficulty: "Médio",
    difficultyColor: "text-yellow-400 bg-yellow-400/10",
    platforms: ["TikTok", "Instagram", "Plataformas UGC"],
    tips: [
      "Crie 3-5 personas de influenciadores com estilos diferentes",
      "Monte um portfólio com 10 vídeos de demonstração por persona",
      "Precifique por pacote: 5 vídeos = R$1.500, 10 vídeos = R$2.500",
    ],
    howToStart: [
      "Gere influenciadores realistas com diferentes etnias e estilos",
      "Crie vídeos curtos (15-30s) mostrando 'reviews' de produtos",
      "Se cadastre em plataformas de UGC como Billo, JoinBrands ou Insense",
      "Ofereça seus serviços diretamente para e-commerces no Instagram",
    ],
  },
  {
    id: "tiktok-shop",
    icon: ShoppingBag,
    title: "TikTok Shop com IA",
    description: "Crie vídeos de demonstração de produtos com influenciadores IA para vender no TikTok Shop. Você ganha comissão por cada venda sem precisar aparecer.",
    earnings: "R$ 1.000 — R$ 20.000/mês",
    difficulty: "Médio",
    difficultyColor: "text-yellow-400 bg-yellow-400/10",
    platforms: ["TikTok Shop", "TikTok"],
    tips: [
      "Foque em produtos virais com ticket baixo (R$30-100)",
      "Poste 3-5 vídeos por dia para maximizar alcance",
      "Use Motion Transfer para dar vida aos vídeos de produto",
    ],
    howToStart: [
      "Cadastre-se no TikTok Shop como afiliado",
      "Escolha produtos com boa comissão (15-30%)",
      "Gere um influenciador IA que combine com o nicho do produto",
      "Crie vídeos de review/unboxing usando Face Swap + Voz IA",
    ],
  },
  {
    id: "faceless",
    icon: Play,
    title: "Canais Faceless (YouTube/TikTok)",
    description: "Crie canais no YouTube e TikTok sem mostrar o rosto. Use influenciadores IA como apresentadores, gerando receita com AdSense, patrocínios e afiliados.",
    earnings: "R$ 500 — R$ 30.000/mês",
    difficulty: "Médio",
    difficultyColor: "text-yellow-400 bg-yellow-400/10",
    platforms: ["YouTube", "TikTok", "Instagram Reels"],
    tips: [
      "Nichos que funcionam: finanças, curiosidades, motivação, tech, beleza",
      "Publique no mínimo 1 vídeo por dia no TikTok e 3 por semana no YouTube",
      "Monetize com AdSense + links de afiliados na descrição",
    ],
    howToStart: [
      "Escolha um nicho com alta demanda de conteúdo",
      "Crie um personagem IA consistente (mesmo rosto em todos os vídeos)",
      "Use Voz IA para narração em múltiplos idiomas",
      "Poste shorts no YouTube + vídeos no TikTok simultaneamente",
    ],
  },
  {
    id: "ai-influencer",
    icon: Heart,
    title: "Perfil de Influenciador IA",
    description: "Crie um perfil completo de influenciador digital no Instagram/TikTok. Construa audiência e monetize com publis, afiliados e produtos próprios.",
    earnings: "R$ 1.000 — R$ 50.000/mês",
    difficulty: "Avançado",
    difficultyColor: "text-red-400 bg-red-400/10",
    platforms: ["Instagram", "TikTok", "OnlyFans"],
    tips: [
      "Mantenha consistência visual — mesmo rosto, mesmo estilo",
      "Poste stories e reels diariamente para engajamento",
      "Com 10k seguidores já é possível fechar publis de R$500+",
    ],
    howToStart: [
      "Defina a persona: nome, idade, estilo, nicho",
      "Gere 30+ fotos variadas para ter banco de imagens",
      "Crie um calendário de postagem: 1 post/dia + 5 stories",
      "Interaja com o público nos comentários (pode usar ChatGPT)",
    ],
  },
  {
    id: "ecommerce",
    icon: Package,
    title: "Fotos para E-commerce",
    description: "Ofereça serviço de criação de fotos de produto com modelos IA para lojas online. Muito mais barato e rápido que uma sessão de fotos tradicional.",
    earnings: "R$ 3.000 — R$ 15.000/mês",
    difficulty: "Fácil",
    difficultyColor: "text-green-400 bg-green-400/10",
    platforms: ["Shopify", "Mercado Livre", "Amazon"],
    tips: [
      "Precifique: R$50-150 por foto com modelo, R$300-800 por pacote de 10",
      "Foque em nichos: moda, beleza, acessórios, fitness",
      "Use Face Swap para colocar rostos em fotos de catálogo existentes",
    ],
    howToStart: [
      "Monte um portfólio com 20 exemplos de fotos de produto com modelo IA",
      "Ofereça para lojas do Shopify/Instagram via DM",
      "Cadastre-se no Fiverr e 99Freelas com serviço de 'model photography'",
      "Entregue em 24h — velocidade é seu diferencial",
    ],
  },
  {
    id: "agency",
    icon: Megaphone,
    title: "Agência de Conteúdo IA",
    description: "Monte uma agência que produz conteúdo social media usando IA. Atenda múltiplos clientes com uma equipe pequena (ou sozinho), gerando posts, vídeos e criativos.",
    earnings: "R$ 5.000 — R$ 50.000/mês",
    difficulty: "Avançado",
    difficultyColor: "text-red-400 bg-red-400/10",
    platforms: ["Instagram", "TikTok", "LinkedIn"],
    tips: [
      "Comece com 3-5 clientes pagando R$1.500-3.000/mês cada",
      "Entregue 20-30 posts/mês por cliente usando templates",
      "Ofereça pacotes: básico (posts), premium (posts + vídeos + stories)",
    ],
    howToStart: [
      "Crie exemplos de conteúdo para 3 nichos diferentes",
      "Ofereça 1 semana grátis para os primeiros 3 clientes",
      "Use templates da PixelAI para escalar produção",
      "Documente processos para poder delegar depois",
    ],
  },
  {
    id: "digital-products",
    icon: Palette,
    title: "Produtos Digitais",
    description: "Crie e venda produtos digitais como presets, templates de prompts, cursos sobre IA, packs de imagens e vídeos de stock.",
    earnings: "R$ 500 — R$ 10.000/mês",
    difficulty: "Fácil",
    difficultyColor: "text-green-400 bg-green-400/10",
    platforms: ["Hotmart", "Kiwify", "Gumroad", "Etsy"],
    tips: [
      "Packs de prompts por nicho vendem bem (R$27-97)",
      "Cursos sobre 'como criar influenciadores IA' são muito procurados",
      "Venda packs de imagens de stock geradas por IA no Etsy",
    ],
    howToStart: [
      "Crie um pack de 50 prompts otimizados para um nicho",
      "Monte uma página de vendas na Hotmart ou Kiwify",
      "Grave um mini-curso de 1h mostrando como usar IA para conteúdo",
      "Divulgue no TikTok/Instagram com vídeos mostrando os resultados",
    ],
  },
  {
    id: "freelance",
    icon: Laptop,
    title: "Freelancer de IA",
    description: "Ofereça serviços de geração de imagens, vídeos e vozes em plataformas de freelance. Clientes pagam por projeto sem saber que você usa IA.",
    earnings: "R$ 2.000 — R$ 12.000/mês",
    difficulty: "Fácil",
    difficultyColor: "text-green-400 bg-green-400/10",
    platforms: ["Fiverr", "Upwork", "99Freelas", "Workana"],
    tips: [
      "No Fiverr, gigs de 'AI portrait' e 'product photography' são populares",
      "Entregue rápido — seu diferencial é velocidade, não preço",
      "Ofereça revisões ilimitadas (cada revisão custa centavos pra você)",
    ],
    howToStart: [
      "Crie perfis no Fiverr, Upwork e 99Freelas",
      "Monte 5 gigs diferentes: retrato IA, foto produto, vídeo, voz, upscale",
      "Comece com preços baixos para acumular reviews (R$50-100 por gig)",
      "Suba os preços gradualmente conforme ganhar reputação",
    ],
  },
  {
    id: "affiliate",
    icon: TrendingUp,
    title: "Marketing de Afiliados com IA",
    description: "Use vídeos com influenciadores IA para promover produtos como afiliado. Crie reviews, comparativos e demonstrações sem precisar comprar os produtos.",
    earnings: "R$ 1.000 — R$ 20.000/mês",
    difficulty: "Médio",
    difficultyColor: "text-yellow-400 bg-yellow-400/10",
    platforms: ["TikTok", "YouTube", "Instagram", "Blog"],
    tips: [
      "Foque em produtos com comissão alta: cursos (40-80%), SaaS (20-40%)",
      "Crie vídeos de review com influenciador IA narrando benefícios",
      "Use links de afiliado na bio e na descrição dos vídeos",
    ],
    howToStart: [
      "Cadastre-se em programas: Hotmart, Amazon Associates, Shopee Afiliados",
      "Escolha 5-10 produtos do mesmo nicho para promover",
      "Gere um influenciador IA que seja 'expert' naquele nicho",
      "Poste 1 vídeo de review por dia com link de afiliado",
    ],
  },
  {
    id: "stock",
    icon: Globe,
    title: "Banco de Imagens IA",
    description: "Gere imagens e vídeos em massa e venda como stock content em plataformas como Shutterstock, Adobe Stock e Getty Images.",
    earnings: "R$ 300 — R$ 5.000/mês",
    difficulty: "Fácil",
    difficultyColor: "text-green-400 bg-green-400/10",
    platforms: ["Shutterstock", "Adobe Stock", "Freepik", "Etsy"],
    tips: [
      "Foque em nichos com pouca oferta: diversidade, cenários específicos",
      "Gere em lote: 50-100 imagens por sessão usando templates",
      "Renda passiva — uma vez upado, gera dinheiro enquanto você dorme",
    ],
    howToStart: [
      "Cadastre-se como contribuidor no Shutterstock e Adobe Stock",
      "Gere 100 imagens de alta qualidade em nichos populares",
      "Use Upscale 4K para garantir resolução profissional",
      "Suba consistentemente: 50+ imagens por semana",
    ],
  },
  {
    id: "dropshipping",
    icon: ShoppingBag,
    title: "Dropshipping com Conteúdo IA",
    description: "Monte uma loja de dropshipping e crie todo o conteúdo de marketing (fotos, vídeos, ads) usando IA. Zero custo com produção de conteúdo.",
    earnings: "R$ 2.000 — R$ 30.000/mês",
    difficulty: "Avançado",
    difficultyColor: "text-red-400 bg-red-400/10",
    platforms: ["Shopify", "TikTok Ads", "Meta Ads"],
    tips: [
      "Use Face Swap para colocar influenciadores IA em vídeos de produto",
      "Crie 10-20 variações de criativos para testar em ads",
      "Voz IA para narração de anúncios em múltiplos idiomas = mais mercados",
    ],
    howToStart: [
      "Escolha um produto vencedor (AliExpress, CJDropshipping)",
      "Monte a loja no Shopify com fotos de produto + modelo IA",
      "Crie 10 vídeos de ad com influenciador IA usando PixelAI",
      "Teste com R$50-100/dia em TikTok Ads ou Meta Ads",
    ],
  },
  {
    id: "local",
    icon: Users,
    title: "Serviço para Negócios Locais",
    description: "Ofereça criação de conteúdo para negócios locais (restaurantes, clínicas, lojas) que não têm equipe de marketing. Produza posts e vídeos usando IA.",
    earnings: "R$ 2.000 — R$ 10.000/mês",
    difficulty: "Fácil",
    difficultyColor: "text-green-400 bg-green-400/10",
    platforms: ["Instagram", "Google Meu Negócio", "WhatsApp"],
    tips: [
      "Cobre R$800-2.000/mês por cliente com 15-20 posts/mês",
      "Com 5 clientes locais você já tem R$5.000-10.000/mês",
      "Negócios locais valorizam rapidez e consistência, não perfeição",
    ],
    howToStart: [
      "Visite 10 negócios locais e ofereça 1 semana grátis de conteúdo",
      "Mostre antes/depois: o feed atual vs o que você pode fazer com IA",
      "Crie templates reutilizáveis por segmento (food, beleza, fitness)",
      "Entregue via WhatsApp — simplicidade é chave para clientes locais",
    ],
  },
];

export default function MonetizarPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/20">
            <DollarSign className="h-5 w-5 text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Monetizar com IA</h1>
        </div>
        <p className="text-zinc-400">
          12 formas comprovadas de ganhar dinheiro usando conteúdo gerado por IA. Clique em cada estratégia para ver o guia completo.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card padding="sm" className="text-center">
          <p className="text-2xl font-bold text-violet-400">12</p>
          <p className="text-xs text-zinc-500">Estratégias</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xl font-bold text-green-400">4</p>
          <p className="text-xs text-zinc-500">Nível Fácil</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xl font-bold text-yellow-400">5</p>
          <p className="text-xs text-zinc-500">Nível Médio</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xl font-bold text-red-400">3</p>
          <p className="text-xs text-zinc-500">Nível Avançado</p>
        </Card>
      </div>

      {/* Strategies */}
      <div className="space-y-4">
        {strategies.map((s) => {
          const Icon = s.icon;
          const isExpanded = expandedId === s.id;

          return (
            <Card key={s.id} padding="none" className="overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
                className="flex w-full items-center gap-4 p-5 text-left cursor-pointer hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600/15">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-white">{s.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.difficultyColor}`}>
                      {s.difficulty}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-400 line-clamp-1">{s.description}</p>
                </div>
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="text-sm font-semibold text-green-400">{s.earnings}</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-zinc-500" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-zinc-800 p-5 space-y-6">
                  {/* Description */}
                  <p className="text-sm text-zinc-400">{s.description}</p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-zinc-300">{s.earnings}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-violet-400" />
                      <span className="text-sm text-zinc-300">{s.difficulty}</span>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase mb-2">Plataformas</p>
                    <div className="flex flex-wrap gap-2">
                      {s.platforms.map((p) => (
                        <span key={p} className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* How to start */}
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase mb-2">Como Começar</p>
                    <ol className="space-y-2">
                      {s.howToStart.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-zinc-400">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-xs font-medium text-violet-400">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tips */}
                  <div>
                    <p className="text-xs font-medium text-zinc-500 uppercase mb-2">Dicas Pro</p>
                    <ul className="space-y-2">
                      {s.tips.map((tip, i) => (
                        <li key={i} className="flex gap-2 text-sm text-zinc-400">
                          <Star className="h-4 w-4 shrink-0 text-yellow-400 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
