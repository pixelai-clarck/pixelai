import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="text-lg font-bold">
            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              PixelAI
            </span>
          </Link>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/termos" className="hover:text-zinc-300 transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-zinc-300 transition-colors">Privacidade</Link>
            <a href="mailto:contato@pixelai.com" className="hover:text-zinc-300 transition-colors">Contato</a>
          </div>
          <p className="text-sm text-zinc-600">&copy; 2026 PixelAI</p>
        </div>
      </div>
    </footer>
  );
}
