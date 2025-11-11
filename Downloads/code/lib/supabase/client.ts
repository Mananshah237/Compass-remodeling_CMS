// lib/supabase/client.ts
// Browser-side Supabase client. Use the SSR helper's createBrowserClient so
// auth cookies and client-side auth flows work correctly with the App Router.
import { createBrowserClient } from "@supabase/ssr";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  // In dev, we may not have envs set. Don't throw here — allow the app to boot
  // so dev server/middleware can warn gracefully.
  console.warn("[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
}

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);
