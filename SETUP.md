# PixelAI - Guia de Setup

## 1. Supabase (Banco de dados + Auth)

1. Acesse https://supabase.com e crie uma conta (gratis)
2. Clique em "New Project" e crie o projeto "pixelai"
3. Anote as credenciais em Settings > API:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
4. Va em SQL Editor e cole o conteudo de `supabase/migrations/001_initial_schema.sql`
5. Execute o SQL
6. Em Authentication > Providers, ative Email (ja vem ativo por padrao)
7. Em Authentication > URL Configuration, adicione:
   - Site URL: `http://localhost:3000` (depois trocar pelo dominio)
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 2. Stripe (Pagamentos)

1. Acesse https://dashboard.stripe.com e crie conta
2. Em Developers > API Keys:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
3. Em Developers > Webhooks:
   - Clique "Add endpoint"
   - URL: `https://SEU-DOMINIO/api/webhooks/stripe`
   - Events: selecione `checkout.session.completed`
   - Copie o **Signing secret** → `STRIPE_WEBHOOK_SECRET`
4. Para testar local, instale o Stripe CLI:
   ```
   npm install -g stripe
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Use o webhook secret que o CLI mostrar

## 3. fal.ai (Geracao de imagem, video, face swap, upscale, motion)

1. Acesse https://fal.ai e crie conta
2. Va em https://fal.ai/dashboard/keys
3. Crie uma API key → `FAL_KEY`
4. Adicione creditos (comece com $10, da pra ~200 imagens)

## 4. Replicate (Prompt Cloner / CLIP Interrogator)

1. Acesse https://replicate.com e crie conta
2. Va em https://replicate.com/account/api-tokens
3. Crie um token → `REPLICATE_API_TOKEN`
4. Adicione creditos ($5 ja da pra ~150 reverse prompts)

## 5. ElevenLabs (Voz IA)

1. Acesse https://elevenlabs.io e crie conta
2. Va em Profile > API Key
3. Copie a key → `ELEVENLABS_API_KEY`
4. Plano Free: 10.000 caracteres/mes
5. Para producao: plano Starter $5/mes (30.000 chars)

## 6. Configurar o .env

1. Copie o arquivo de exemplo:
   ```
   cp .env.example .env.local
   ```
2. Preencha TODAS as variaveis com as keys coletadas acima

## 7. Rodar o projeto

```bash
cd C:/Users/amand/Documents/pixelai
npm run dev
```

Acesse http://localhost:3000

## 8. Deploy (Vercel)

1. Acesse https://vercel.com
2. Importe o repositorio do GitHub
3. Adicione TODAS as env vars do .env.local nas Settings do projeto
4. Deploy automatico a cada push

### Dominio customizado
- Em Settings > Domains, adicione seu dominio
- Configure o DNS (Vercel fornece as instrucoes)
- Atualize o Site URL no Supabase e o webhook URL no Stripe

## Custo mensal estimado

| Servico     | Plano         | Custo      |
|-------------|---------------|------------|
| Supabase    | Free tier     | $0         |
| Vercel      | Hobby         | $0         |
| fal.ai      | Pay-as-you-go | ~$10-50    |
| Replicate   | Pay-as-you-go | ~$5        |
| ElevenLabs  | Starter       | $5         |
| Stripe      | 3.49% + R$0.39/tx | por venda |

**Total fixo: ~$15-55/mes** (escala conforme uso)
