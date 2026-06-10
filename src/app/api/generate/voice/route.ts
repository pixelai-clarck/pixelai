import { NextRequest } from "next/server";
import { generateSpeech } from "@/lib/ai/elevenlabs";
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
    const { text, language, voiceId } = body;

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Texto e obrigatorio" }, { status: 400 });
    }

    if (text.length > 5000) {
      return Response.json({ error: "Texto muito longo (max 5000 caracteres)" }, { status: 400 });
    }

    // Deduct credits
    const creditResult = await deductCredits(user.id, "voice", `Voz: ${text.slice(0, 50)}`);
    if (!creditResult.success) {
      return Response.json(
        { error: "Creditos insuficientes", balance: creditResult.balance },
        { status: 402 }
      );
    }

    let audioBuffer;
    try {
      audioBuffer = await generateSpeech(text, voiceId);
    } catch (aiError) {
      await refundCredits(user.id, "voice", "Falha na geração de voz");
      throw aiError;
    }
    const audioBase64 = audioBuffer.toString("base64");

    // Save generation
    const supabase = createServiceClient();
    await supabase.from("generations").insert({
      user_id: user.id,
      type: "voice",
      prompt: text,
      input_urls: [],
      output_url: null,
      status: "completed",
      credits_used: CREDIT_COSTS.voice,
      metadata: { language, voiceId, textLength: text.length },
    });

    return Response.json({ audioBase64 });
  } catch (error: unknown) {
    console.error("Voice generation error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro interno" },
      { status: 500 }
    );
  }
}
