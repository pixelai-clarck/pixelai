import { NextRequest } from "next/server";
import { generateVideo } from "@/lib/ai/fal";
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
    const { imageUrl, prompt, duration } = body;

    if (!imageUrl || typeof imageUrl !== "string") {
      return Response.json({ error: "URL da imagem e obrigatoria" }, { status: 400 });
    }

    // Deduct credits
    const creditResult = await deductCredits(user.id, "video", `Video: ${prompt?.slice(0, 50) || "sem prompt"}`);
    if (!creditResult.success) {
      return Response.json(
        { error: "Creditos insuficientes", balance: creditResult.balance },
        { status: 402 }
      );
    }

    let result;
    try {
      result = await generateVideo(imageUrl, prompt || "", { duration });
    } catch (aiError) {
      await refundCredits(user.id, "video", "Falha na geração de vídeo");
      throw aiError;
    }

    // Save generation
    const supabase = createServiceClient();
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "video",
      prompt: prompt || null,
      input_urls: [imageUrl],
      output_url: result.url,
      status: "completed",
      credits_used: CREDIT_COSTS.video,
      metadata: { duration, requestId: result.requestId },
    });

    return Response.json({ url: result.url, requestId: result.requestId });
  } catch (error: unknown) {
    console.error("Video generation error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 }
    );
  }
}
