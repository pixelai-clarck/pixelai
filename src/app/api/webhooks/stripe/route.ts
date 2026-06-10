import Stripe from "stripe";
import { addCredits } from "@/lib/credits";
import { createServiceClient } from "@/lib/supabase";
import { getStripe, CREDIT_PACKAGES } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Assinatura ausente", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[stripe webhook] Verificação falhou:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const packageId = session.metadata?.packageId;

    if (!userId || !packageId) {
      console.error("[stripe webhook] Metadata ausente:", { userId, packageId });
      return new Response("Metadata inválida", { status: 400 });
    }

    // Idempotency check — don't process same session twice
    const supabase = createServiceClient();
    const { data: existing } = await supabase
      .from("credit_transactions")
      .select("id")
      .eq("stripe_session_id", session.id)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`[stripe webhook] Sessão ${session.id} já processada, ignorando`);
      return new Response("OK", { status: 200 });
    }

    // Get credits from canonical source
    const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
    if (!pkg) {
      console.error("[stripe webhook] Pacote desconhecido:", packageId);
      return new Response("Pacote inválido", { status: 400 });
    }

    const success = await addCredits(
      userId,
      pkg.credits,
      `Compra: pacote ${pkg.name} (${pkg.credits} créditos)`,
      session.id,
      packageId
    );

    if (!success) {
      console.error("[stripe webhook] Falha ao adicionar créditos:", {
        userId,
        packageId,
        credits: pkg.credits,
      });
      return new Response("Erro ao processar créditos", { status: 500 });
    }

    console.log(
      `[stripe webhook] ${pkg.credits} créditos adicionados para ${userId} (pacote: ${packageId})`
    );
  }

  return new Response("OK", { status: 200 });
}
