import { NextRequest } from "next/server";
import { motionTransfer } from "@/lib/ai/fal";
import { deductCredits, refundCredits, CREDIT_COSTS } from "@/lib/credits";
import { createServiceClient } from "@/lib/supabase";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  try {
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { cookies: { getAll() { return request.cookies.getAll(); }, setAll() {} } }
    );
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      return Response.json({ error: "Nao autorizado" }, { status: 401 });
    }

    // Parse body
    const body = await request.json();
    const { imageUrl, videoUrl } = body;

    if (!imageUrl || !videoUrl) {
      return Response.json(
        { error: "URLs da imagem e do video sao obrigatorias" },
        { status: 400 }
      );
    }

    // Deduct credits
    const creditResult = await deductCredits(user.id, "motion", "Transferencia de movimento");
    if (!creditResult.success) {
      return Response.json(
        { error: "Creditos insuficientes", balance: creditResult.balance },
        { status: 402 }
      );
    }

    let result;
    try {
      result = await motionTransfer(imageUrl, videoUrl);
    } catch (aiError) {
      await refundCredits(user.id, "motion", "Falha na transferência de motion");
      throw aiError;
    }

    // Save generation
    const supabase = createServiceClient();
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "motion",
      prompt: null,
      input_urls: [imageUrl, videoUrl],
      output_url: result.url,
      status: "completed",
      credits_used: CREDIT_COSTS.motion,
      metadata: { requestId: result.requestId },
    });

    return Response.json({ url: result.url, requestId: result.requestId });
  } catch (error: unknown) {
    console.error("Motion transfer error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 }
    );
  }
}
