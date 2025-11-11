export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

interface FetchOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: any
  headers?: Record<string, string>
}

async function supabaseRequest(table: string, options: FetchOptions = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.statusText}`)
  }

  return response.json()
}

export async function getServices() {
  return supabaseRequest("services?order=order_index.asc")
}

export async function getGalleryItems(notCategory?: string) {
  if (notCategory) {
    return supabaseRequest(`gallery?category=neq.${notCategory}&order=order_index.asc`)
  }
  return supabaseRequest("gallery?order=order_index.asc")
}

export async function getBeforeAfterItems() {
  return supabaseRequest("gallery?category=eq.before-after&order=order_index.asc&limit=2")
}

export async function getHomepageContent() {
  return supabaseRequest("homepage_content")
}

export async function getServiceById(id: string) {
  return supabaseRequest(`services?id=eq.${id}`)
}

export async function getGalleryItemById(id: string) {
  return supabaseRequest(`gallery?id=eq.${id}`)
}
