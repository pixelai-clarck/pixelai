import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelAI — Crie Influenciadores Digitais com IA",
  description:
    "Crie fotos, vídeos e vozes de influenciadores digitais com inteligência artificial. Sem estúdio, sem modelos, sem complicação.",
  keywords: [
    "IA",
    "influenciador digital",
    "criador de conteúdo",
    "inteligência artificial",
    "UGC",
    "marketing digital",
    "AI influencer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
