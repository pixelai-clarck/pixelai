"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useLocale } from "@/lib/locale-context";
import type { Locale } from "@/lib/i18n";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold">
          <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            PixelAI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/create/image" className="text-sm text-zinc-400 hover:text-white transition-colors">
            {t("nav.tools")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              <span>{activeLang.flag}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setLangOpen(false); }}
                    className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors cursor-pointer ${
                      locale === lang.code
                        ? "text-violet-400 bg-violet-600/10"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
            >
              {t("nav.dashboard")}
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="rounded-lg px-4 py-2 text-sm text-zinc-300 hover:text-white transition-colors">
                {t("nav.login")}
              </Link>
              <Link href="/auth/register" className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors">
                {t("nav.register")}
              </Link>
            </>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-zinc-400 hover:text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-800 bg-black/90 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex gap-2 mb-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm cursor-pointer ${
                    locale === lang.code ? "bg-violet-600/20 text-violet-400" : "text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href="/create/image" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
              {t("nav.tools")}
            </Link>
            <hr className="border-zinc-800" />
            {isLoggedIn ? (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-lg bg-violet-600 px-3 py-2 text-center text-sm font-medium text-white">
                {t("nav.dashboard")}
              </Link>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
                  {t("nav.login")}
                </Link>
                <Link href="/auth/register" onClick={() => setMenuOpen(false)} className="rounded-lg bg-violet-600 px-3 py-2 text-center text-sm font-medium text-white">
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
