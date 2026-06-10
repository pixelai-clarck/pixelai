import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-zinc-950 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">Política de Privacidade</h1>
          <p className="mt-2 text-sm text-zinc-500">Última atualização: Junho de 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">1. Dados que Coletamos</h2>
              <p>Ao utilizar a PixelAI, coletamos:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li><strong className="text-zinc-300">Dados de cadastro:</strong> nome, email e senha (criptografada)</li>
                <li><strong className="text-zinc-300">Dados de uso:</strong> histórico de gerações, créditos utilizados</li>
                <li><strong className="text-zinc-300">Dados de pagamento:</strong> processados diretamente pelo Stripe, não armazenamos dados de cartão</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">2. Como Usamos seus Dados</h2>
              <p>Seus dados são utilizados para:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Fornecer e manter o serviço funcionando</li>
                <li>Processar pagamentos e gerenciar créditos</li>
                <li>Enviar comunicações sobre sua conta</li>
                <li>Melhorar a qualidade do serviço</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">3. Armazenamento e Segurança</h2>
              <p>Seus dados são armazenados de forma segura em servidores protegidos pelo Supabase (infraestrutura AWS). Utilizamos criptografia em trânsito (TLS) e em repouso. Senhas são armazenadas com hash bcrypt e nunca em texto simples.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">4. Conteúdo Gerado</h2>
              <p>As imagens, vídeos e áudios que você gera na plataforma são armazenados temporariamente para permitir download. Não utilizamos seu conteúdo gerado para treinar modelos de IA ou para qualquer outro fim além de fornecer o serviço a você.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">5. Compartilhamento de Dados</h2>
              <p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li><strong className="text-zinc-300">Stripe:</strong> para processamento de pagamentos</li>
                <li><strong className="text-zinc-300">Provedores de IA:</strong> prompts são enviados para geração (sem dados pessoais)</li>
                <li><strong className="text-zinc-300">Obrigação legal:</strong> quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">6. Seus Direitos</h2>
              <p>Você tem o direito de:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incorretos</li>
                <li>Solicitar a exclusão da sua conta e dados</li>
                <li>Exportar seus dados</li>
              </ul>
              <p className="mt-2">Para exercer qualquer desses direitos, entre em contato pelo email abaixo.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">7. Cookies</h2>
              <p>Utilizamos cookies essenciais para autenticação e funcionamento da plataforma. Não utilizamos cookies de rastreamento ou publicidade.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">8. Alterações</h2>
              <p>Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas por email ou através de aviso na plataforma.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">9. Contato</h2>
              <p>Para questões sobre privacidade: <a href="mailto:contato@pixelai.com" className="text-violet-400 hover:text-violet-300">contato@pixelai.com</a></p>
            </section>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Voltar ao início
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
