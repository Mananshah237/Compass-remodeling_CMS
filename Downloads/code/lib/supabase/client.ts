import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function fetchFromSupabase(
  table: string,
  options?: {
    select?: string
    filters?: Record<string, string | number | boolean>
    order?: { column: string; ascending?: boolean }
  },
) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`, SUPABASE_URL)

  if (options?.select) {
    url.searchParams.append("select", options.select)
  }

  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      url.searchParams.append(`${key}=eq.${value}`)
    })
  }

  if (options?.order) {
    const direction = options.order.ascending ? "asc" : "desc"
    url.searchParams.append("order", `${options.order.column}.${direction}`)
  }

  const response = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${table}`)
  }

  return response.json()
}

export { supabase as createClient }
