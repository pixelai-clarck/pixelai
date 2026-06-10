import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Re-export browser client from canonical location
export { createClient as createBrowserClient } from "@/utils/supabase/client";

// Service client for API routes (uses service role key, bypasses RLS)
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
