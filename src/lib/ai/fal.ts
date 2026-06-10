import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY });

export async function generateImage(
  prompt: string,
  options?: { aspectRatio?: string; style?: string }
) {
  const styledPrompt = options?.style
    ? `${prompt}, ${options.style} style, professional photography`
    : prompt;

  const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
    input: {
      prompt: styledPrompt,
      image_size: options?.aspectRatio === "9:16"
        ? "portrait_16_9"
        : options?.aspectRatio === "16:9"
        ? "landscape_16_9"
        : "square",
      num_images: 1,
      safety_tolerance: "2",
    },
  });

  return {
    url: result.data.images[0].url,
    requestId: result.requestId,
  };
}

export async function generateVideo(
  imageUrl: string,
  prompt: string,
  options?: { duration?: number }
) {
  const result = await fal.subscribe("fal-ai/minimax/video-01-live", {
    input: {
      prompt,
      first_frame_image: imageUrl,
    },
  });

  return {
    url: result.data.video.url,
    requestId: result.requestId,
  };
}

export async function faceSwap(sourceUrl: string, targetUrl: string) {
  const result = await fal.subscribe("fal-ai/face-swap", {
    input: {
      base_image_url: targetUrl,
      swap_image_url: sourceUrl,
    },
  });

  return {
    url: result.data.image.url,
    requestId: result.requestId,
  };
}

export async function upscaleImage(imageUrl: string, scale: number = 4) {
  const result = await fal.subscribe("fal-ai/esrgan", {
    input: {
      image_url: imageUrl,
      scale,
    },
  });

  return {
    url: result.data.image.url,
    requestId: result.requestId,
  };
}

export async function motionTransfer(imageUrl: string, videoUrl: string) {
  const result = await fal.subscribe("fal-ai/wan/motion", {
    input: {
      image_url: imageUrl,
      video_url: videoUrl,
    },
  });

  return {
    url: result.data.video.url,
    requestId: result.requestId,
  };
}
