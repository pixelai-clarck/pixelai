import { createServiceClient } from "./supabase";
import type { GenerationType } from "@/types";

export const CREDIT_COSTS: Record<GenerationType, number> = {
  image: 1,
  video: 5,
  face_swap: 1,
  voice: 2,
  upscale: 1,
  motion: 5,
};

export async function getUserCredits(userId: string): Promise<number> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("credits")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (error || !data) return 0;
  return data.balance;
}

export async function deductCredits(
  userId: string,
  action: GenerationType,
  description?: string
): Promise<{ success: boolean; balance: number }> {
  const cost = CREDIT_COSTS[action];
  const supabase = createServiceClient();

  // Atomic read + check
  const { data: creditRow, error: fetchError } = await supabase
    .from("credits")
    .select("balance, total_used")
    .eq("user_id", userId)
    .single();

  if (fetchError || !creditRow) {
    return { success: false, balance: 0 };
  }

  if (creditRow.balance < cost) {
    return { success: false, balance: creditRow.balance };
  }

  const newBalance = creditRow.balance - cost;
  const newTotalUsed = (creditRow.total_used || 0) + cost;

  const { error: updateError } = await supabase
    .from("credits")
    .update({
      balance: newBalance,
      total_used: newTotalUsed,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("balance", creditRow.balance); // optimistic lock

  if (updateError) {
    return { success: false, balance: creditRow.balance };
  }

  await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "usage",
    amount: -cost,
    description: description || `Geração: ${action}`,
  });

  return { success: true, balance: newBalance };
}

export async function addCredits(
  userId: string,
  amount: number,
  description?: string,
  stripeSessionId?: string,
  packageId?: string
): Promise<boolean> {
  const supabase = createServiceClient();

  const { data: creditRow, error: fetchError } = await supabase
    .from("credits")
    .select("balance, total_purchased")
    .eq("user_id", userId)
    .single();

  if (fetchError || !creditRow) return false;

  const { error } = await supabase
    .from("credits")
    .update({
      balance: creditRow.balance + amount,
      total_purchased: (creditRow.total_purchased || 0) + amount,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (error) return false;

  await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "purchase",
    amount,
    description: description || `Compra de ${amount} créditos`,
    stripe_session_id: stripeSessionId,
    package_id: packageId,
  });

  return true;
}

export async function refundCredits(
  userId: string,
  action: GenerationType,
  reason?: string
): Promise<void> {
  const cost = CREDIT_COSTS[action];
  const supabase = createServiceClient();

  const { data: creditRow } = await supabase
    .from("credits")
    .select("balance, total_used")
    .eq("user_id", userId)
    .single();

  if (!creditRow) return;

  await supabase
    .from("credits")
    .update({
      balance: creditRow.balance + cost,
      total_used: Math.max(0, (creditRow.total_used || 0) - cost),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  await supabase.from("credit_transactions").insert({
    user_id: userId,
    type: "refund",
    amount: cost,
    description: reason || `Reembolso: falha na geração ${action}`,
  });
}
