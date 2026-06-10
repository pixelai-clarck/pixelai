import Stripe from "stripe";
import type { CreditPackage } from "@/types";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "starter",
    name: "Starter",
    credits: 50,
    price: 1990,
    priceDisplay: "R$ 19,90",
  },
  {
    id: "creator",
    name: "Creator",
    credits: 200,
    price: 5990,
    priceDisplay: "R$ 59,90",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 500,
    price: 12990,
    priceDisplay: "R$ 129,90",
  },
  {
    id: "business",
    name: "Business",
    credits: 2000,
    price: 39700,
    priceDisplay: "R$ 397,00",
  },
];

interface CheckoutParams {
  userId: string;
  userEmail: string;
  packageId: string;
  packageName: string;
  credits: number;
  priceInCents: number;
}

export async function createCheckoutSession(
  params: CheckoutParams
): Promise<{ url: string; sessionId: string }>;
export async function createCheckoutSession(
  userId: string,
  packageId: string,
  origin: string
): Promise<string>;
export async function createCheckoutSession(
  paramsOrUserId: CheckoutParams | string,
  packageId?: string,
  origin?: string
): Promise<string | { url: string; sessionId: string }> {
  // Overload 1: new object-based signature
  if (typeof paramsOrUserId === "object") {
    const p = paramsOrUserId;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: p.userEmail,
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: `PixelAI - Pacote ${p.packageName}`,
              description: `${p.credits} créditos para geração de conteúdo`,
            },
            unit_amount: p.priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: p.userId,
        packageId: p.packageId,
        credits: String(p.credits),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
    });

    if (!session.url) {
      throw new Error("Stripe não retornou URL de checkout");
    }

    return { url: session.url, sessionId: session.id };
  }

  // Overload 2: legacy positional args
  const userId = paramsOrUserId;
  const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) throw new Error("Pacote inválido");

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: `PixelAI ${pkg.name} — ${pkg.credits} créditos`,
            description: `Pacote de ${pkg.credits} créditos para usar na PixelAI`,
          },
          unit_amount: pkg.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      packageId: pkg.id,
      credits: String(pkg.credits),
    },
    success_url: `${origin}/dashboard?purchase=success`,
    cancel_url: `${origin}/pricing?purchase=cancelled`,
  });

  return session.url!;
}
