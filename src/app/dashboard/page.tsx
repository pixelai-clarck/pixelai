"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { formatCredits } from "@/lib/utils";
import {
  ImagePlus,
  Video,
  ScanFace,
  Mic,
  Maximize,
  Move,
  Coins,
} from "lucide-react";

const quickActions = [
  {
    label: "Gerar Imagem",
    description: "Crie imagens com IA",
    href: "/create/image",
    icon: ImagePlus,
  },
  {
    label: "Gerar Video",
    description: "Vídeos com IA generativa",
    href: "/create/video",
    icon: Video,
  },
  {
    label: "Troca de Rosto",
    description: "Face swap realista",
    href: "/create/face-swap",
    icon: ScanFace,
  },
  {
    label: "Voz IA",
    description: "Clone e gere vozes",
    href: "/create/voice",
    icon: Mic,
  },
  {
    label: "Upscale 4K",
    description: "Melhore a resolução",
    href: "/create/upscale",
    icon: Maximize,
  },
  {
    label: "Motion Transfer",
    description: "Transfira movimentos",
    href: "/create/motion",
    icon: Move,
  },
];

interface Generation {
  id: string;
  type: string;
  prompt: string | null;
  output_url: string | null;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("");
  const [credits, setCredits] = useState(0);
  const [recentGenerations, setRecentGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    const supabase = createClient();

    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {

        setUserName(
          user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuário"
        );

        const { data: creditData } = await supabase
          .from("credits")
          .select("balance")
          .eq("user_id", user.id)
          .single();

        if (creditData) {
          setCredits(creditData.balance ?? 0);
        }

        // Buscar geracoes recentes
        const { data: gens } = await supabase
          .from("generations")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(6);

        if (gens) {
          setRecentGenerations(gens);
        }
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Olá, {userName}
        </h1>
        <p className="mt-1 text-zinc-400">
          O que vamos criar hoje?
        </p>
      </div>

      {/* Credit balance */}
      <Card className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/20">
          <Coins className="h-7 w-7 text-violet-400" />
        </div>
        <div>
          <p className="text-sm text-zinc-400">Seus créditos</p>
          <p className="text-3xl font-bold text-white">
            {formatCredits(credits)}
          </p>
        </div>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          Ações rápidas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link key={action.href} href={action.href}>
                <Card hover className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-600/20">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{action.label}</p>
                    <p className="text-sm text-zinc-400">
                      {action.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent generations */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Gerações recentes
          </h2>
          {recentGenerations.length > 0 && (
            <Link href="/gallery" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Ver todas
            </Link>
          )}
        </div>
        {recentGenerations.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentGenerations.map((gen) => (
              <Card key={gen.id} padding="sm" hover>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                    {gen.output_url && gen.type === "image" ? (
                      <img src={gen.output_url} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <span className="text-xs text-zinc-400">{gen.type}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">
                      {gen.prompt?.slice(0, 40) || gen.type}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(gen.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                    gen.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {gen.status === "completed" ? "OK" : gen.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-zinc-400">
              Nenhuma geração ainda. Comece criando algo!
            </p>
            <Link
              href="/create/image"
              className="mt-3 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Criar primeira imagem
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
