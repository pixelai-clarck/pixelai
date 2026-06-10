"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ImagePlus,
  Video,
  ScanFace,
  Mic,
  Maximize,
  Move,
  Images,
  BookOpen,
  LogOut,
  Coins,
  Menu,
  X,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Gerar Imagem", href: "/create/image", icon: ImagePlus },
  { label: "Gerar Vídeo", href: "/create/video", icon: Video },
  { label: "Troca de Rosto", href: "/create/face-swap", icon: ScanFace },
  { label: "Voz IA", href: "/create/voice", icon: Mic },
  { label: "Upscale 4K", href: "/create/upscale", icon: Maximize },
  { label: "Motion Transfer", href: "/create/motion", icon: Move },
  { label: "Galeria", href: "/gallery", icon: Images },
  { label: "Templates", href: "/dashboard/templates", icon: BookOpen },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);

      const { data: creditData } = await supabase
        .from("credits")
        .select("balance")
        .eq("user_id", user.id)
        .single();

      if (creditData) {
        setCredits(creditData.balance ?? 0);
      }

      setLoading(false);
    }

    getUser();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 md:hidden">
        <Link href="/dashboard" className="text-lg font-bold text-white">
          Pixel<span className="text-violet-500">AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-zinc-400">
            <Coins className="h-3.5 w-3.5 text-violet-400" />
            <span className="font-semibold text-white">{credits}</span>
          </span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-zinc-400">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950 transition-transform md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-16 items-center px-6">
          <Link href="/dashboard" className="text-xl font-bold text-white">
            Pixel<span className="text-violet-500">AI</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-violet-600/20 text-violet-400"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2.5">
            <Coins className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-zinc-300">
              <span className="font-semibold text-white">{credits}</span> créditos
            </span>
          </div>

          <Link href="/pricing">
            <Button variant="primary" size="sm" className="mb-3 w-full">
              Comprar Créditos
            </Button>
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Content */}
      <main className="flex-1 pt-14 md:ml-64 md:pt-0 p-4 md:p-8">{children}</main>
    </div>
  );
}
