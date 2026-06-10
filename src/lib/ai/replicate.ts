import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function reversePrompt(imageUrl: string): Promise<string> {
  const output = await replicate.run(
    "pharmapsychotic/clip-interrogator:a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1edd90",
    {
      input: {
        image: imageUrl,
        clip_model_name: "ViT-L-14/openai",
        mode: "fast",
      },
    }
  );

  return output as unknown as string;
}
