export type GenerationType = "image" | "video" | "face_swap" | "voice" | "upscale" | "motion";

export interface Generation {
  id: string;
  user_id: string;
  type: GenerationType;
  prompt: string | null;
  input_urls: string[];
  output_url: string | null;
  status: "processing" | "completed" | "failed";
  credits_used: number;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface CreditTransaction {
  id: string;
  user_id: string;
  type: "purchase" | "usage" | "bonus" | "refund";
  amount: number;
  description: string | null;
  stripe_session_id: string | null;
  package_id: string | null;
  created_at: string;
}

export interface CreditBalance {
  id: string;
  user_id: string;
  balance: number;
  total_purchased: number;
  total_used: number;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number; // in centavos BRL
  priceDisplay: string;
  popular?: boolean;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Template {
  id: string;
  title: string;
  prompt: string;
  category: TemplateCategory;
  type: GenerationType;
  tags: string[];
}

export type TemplateCategory =
  | "moda"
  | "fitness"
  | "beleza"
  | "financas"
  | "food"
  | "tech"
  | "lifestyle"
  | "saude";
