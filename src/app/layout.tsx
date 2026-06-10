import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelAI — Crie Influenciadores Digitais com IA",
  description:
    "Crie fotos, vídeos e vozes de influenciadores digitais com inteligência artificial. Sem estúdio, sem modelos, sem complicação. A partir de R$19.",
  keywords: [
    "IA",
    "influenciador digital",
    "criador de conteúdo",
    "inteligência artificial",
    "UGC",
    "marketing digital",
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
        {children}
      </body>
    </html>
  );
}
