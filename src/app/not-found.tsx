import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-violet-500">404</h1>
        <p className="mt-4 text-xl font-medium text-white">Página não encontrada</p>
        <p className="mt-2 text-zinc-400">A página que você procura não existe ou foi movida.</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
