import { NextRequest } from "next/server";
import { generateImage } from "@/lib/ai/fal";
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
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt, style, aspectRatio } = body;

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt é obrigatório" }, { status: 400 });
    }

    const creditResult = await deductCredits(user.id, "image", `Imagem: ${prompt.slice(0, 50)}`);
    if (!creditResult.success) {
      return Response.json(
        { error: "Créditos insuficientes", balance: creditResult.balance },
        { status: 402 }
      );
    }

    let result;
    try {
      result = await generateImage(prompt, { style, aspectRatio });
    } catch (aiError) {
      await refundCredits(user.id, "image", "Falha na geração de imagem");
      throw aiError;
    }

    const supabase = createServiceClient();
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "image",
      prompt,
      input_urls: [],
      output_url: result.url,
      status: "completed",
      credits_used: CREDIT_COSTS.image,
      metadata: { style, aspectRatio, requestId: result.requestId },
    });

    return Response.json({ url: result.url, balance: creditResult.balance });
  } catch (error: unknown) {
    console.error("Image generation error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro ao gerar imagem" },
      { status: 500 }
    );
  }
}
