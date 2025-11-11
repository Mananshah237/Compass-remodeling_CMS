import { createClient } from "@supabase/supabase-js"

// Server-side client for admin operations (uses service role key)
// This bypasses RLS and should only be used in server actions and API routes
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Server-side client for public reads (uses anon key)
// Use this for server components that need to read public data
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

