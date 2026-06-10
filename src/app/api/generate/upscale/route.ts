import { NextRequest } from "next/server";
import { upscaleImage } from "@/lib/ai/fal";
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
    const { imageUrl, scale } = body;

    if (!imageUrl || typeof imageUrl !== "string") {
      return Response.json({ error: "URL da imagem e obrigatoria" }, { status: 400 });
    }

    const validScale = scale === 2 || scale === 4 ? scale : 4;

    // Deduct credits
    const creditResult = await deductCredits(user.id, "upscale", `Upscale ${validScale}x`);
    if (!creditResult.success) {
      return Response.json(
        { error: "Creditos insuficientes", balance: creditResult.balance },
        { status: 402 }
      );
    }

    let result;
    try {
      result = await upscaleImage(imageUrl, validScale);
    } catch (aiError) {
      await refundCredits(user.id, "upscale", "Falha no upscale");
      throw aiError;
    }

    // Save generation
    const supabase = createServiceClient();
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "upscale",
      prompt: null,
      input_urls: [imageUrl],
      output_url: result.url,
      status: "completed",
      credits_used: CREDIT_COSTS.upscale,
      metadata: { scale: validScale, requestId: result.requestId },
    });

    return Response.json({ url: result.url, requestId: result.requestId });
  } catch (error: unknown) {
    console.error("Upscale error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 }
    );
  }
}
