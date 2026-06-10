const ELEVENLABS_BASE = "https://api.elevenlabs.io/v1";

const VOICE_MAP: Record<string, string> = {
  feminina_suave: "21m00Tcm4TlvDq8ikWAM",    // Rachel
  masculina_grave: "29vD33N1CtxCmqQRPOHJ",    // Drew
  feminina_energetica: "EXAVITQu4vr4xnSDxMaL", // Bella
  masculina_jovem: "ErXwobaYiN019PkySvjV",      // Antoni
};

export async function generateSpeech(
  text: string,
  voiceId?: string,
  modelId?: string
): Promise<Buffer> {
  const voice = voiceId && VOICE_MAP[voiceId] ? VOICE_MAP[voiceId] : VOICE_MAP.feminina_suave;
  const model = modelId || "eleven_multilingual_v2";

  const response = await fetch(
    `${ELEVENLABS_BASE}/text-to-speech/${voice}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text,
        model_id: model,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs error: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
