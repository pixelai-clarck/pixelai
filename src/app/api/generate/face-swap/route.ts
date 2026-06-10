import { NextRequest } from "next/server";
import { faceSwap } from "@/lib/ai/fal";
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
    const { sourceUrl, targetUrl } = body;

    if (!sourceUrl || !targetUrl) {
      return Response.json(
        { error: "URLs de origem e destino sao obrigatorias" },
        { status: 400 }
      );
    }

    // Deduct credits
    const creditResult = await deductCredits(user.id, "face_swap", "Face Swap");
    if (!creditResult.success) {
      return Response.json(
        { error: "Creditos insuficientes", balance: creditResult.balance },
        { status: 402 }
      );
    }

    let result;
    try {
      result = await faceSwap(sourceUrl, targetUrl);
    } catch (aiError) {
      await refundCredits(user.id, "face_swap", "Falha no face swap");
      throw aiError;
    }

    // Save generation
    const supabase = createServiceClient();
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "face_swap",
      prompt: null,
      input_urls: [sourceUrl, targetUrl],
      output_url: result.url,
      status: "completed",
      credits_used: CREDIT_COSTS.face_swap,
      metadata: { requestId: result.requestId },
    });

    return Response.json({ url: result.url, requestId: result.requestId });
  } catch (error: unknown) {
    console.error("Face swap error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 }
    );
  }
}
