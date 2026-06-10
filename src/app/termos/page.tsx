import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-zinc-950 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">Termos de Uso</h1>
          <p className="mt-2 text-sm text-zinc-500">Última atualização: Junho de 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-zinc-400">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar a plataforma PixelAI, você concorda com estes Termos de Uso. Se você não concorda com algum dos termos, não utilize a plataforma.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">2. Descrição do Serviço</h2>
              <p>A PixelAI é uma plataforma de criação de conteúdo digital utilizando inteligência artificial. Oferecemos ferramentas para geração de imagens, vídeos, áudio, troca de rosto, upscale e transferência de movimentos, todas baseadas em modelos de IA de terceiros.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">3. Conta e Cadastro</h2>
              <p>Para utilizar os serviços, é necessário criar uma conta gratuita. Você é responsável por manter a segurança das suas credenciais de acesso. Ao se cadastrar, você recebe 5 créditos gratuitos de boas-vindas.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">4. Créditos e Pagamentos</h2>
              <p>A PixelAI funciona com um sistema de créditos. Créditos podem ser adquiridos através de pacotes avulsos, sem assinatura mensal. Os créditos adquiridos não possuem prazo de validade. Pagamentos são processados de forma segura através do Stripe. Em caso de falha na geração por erro da plataforma, os créditos são devolvidos automaticamente.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">5. Uso Aceitável</h2>
              <p>Você concorda em não utilizar a plataforma para:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Criar conteúdo ilegal, difamatório ou que viole direitos de terceiros</li>
                <li>Gerar conteúdo de natureza sexual envolvendo menores</li>
                <li>Criar deepfakes com intenção de enganar ou prejudicar</li>
                <li>Violar leis de proteção de dados ou privacidade</li>
                <li>Realizar engenharia reversa ou tentar acessar sistemas internos</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">6. Propriedade do Conteúdo</h2>
              <p>O conteúdo gerado através da PixelAI pertence a você e pode ser utilizado para fins comerciais. A PixelAI não reivindica propriedade sobre o conteúdo gerado por seus usuários.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">7. Limitação de Responsabilidade</h2>
              <p>A PixelAI é fornecida "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso da plataforma.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">8. Modificações</h2>
              <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas por email. O uso continuado da plataforma após as alterações constitui aceitação dos novos termos.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-semibold text-white">9. Contato</h2>
              <p>Para questões sobre estes termos, entre em contato através do email: <a href="mailto:contato@pixelai.com" className="text-violet-400 hover:text-violet-300">contato@pixelai.com</a></p>
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
