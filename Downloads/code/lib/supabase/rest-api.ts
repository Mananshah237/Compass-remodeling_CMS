import { supabaseServer } from "./server-client"

// Public data fetching functions (for public pages)
// These use the anon key and respect RLS policies
export async function getServices() {
  const { data, error } = await supabaseServer
    .from("services")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4)
  
  if (error) {
    console.error("Error fetching services:", error)
    return []
  }
  
  return data || []
}

export async function getGalleryItems() {
  const { data, error } = await supabaseServer
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }
  
  return data || []
}

export async function getTestimonials() {
  const { data, error } = await supabaseServer
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
  
  return data || []
}

// Admin data fetching functions (for admin pages)
// These use service role key and can read all data
export async function getContactMessages() {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }
  
  return data || []
}

// Admin versions that use service role key (for admin dashboard)
export async function getAdminServices() {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching services:", error)
    return []
  }
  
  return data || []
}

export async function getAdminGalleryItems() {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching gallery items:", error)
    return []
  }
  
  return data || []
}

export async function getAdminTestimonials() {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
  
  return data || []
}

// Public versions (for public pages)
export async function getServiceById(id: string) {
  const { data, error } = await supabaseServer
    .from("services")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching service:", error)
    return null
  }
  
  return data
}

export async function getGalleryItemById(id: string) {
  const { data, error } = await supabaseServer
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching gallery item:", error)
    return null
  }
  
  return data
}

export async function getTestimonialById(id: string) {
  const { data, error } = await supabaseServer
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching testimonial:", error)
    return null
  }
  
  return data
}

// Admin versions (for admin edit pages - use service role key)
export async function getAdminServiceById(id: string) {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching service:", error)
    return null
  }
  
  return data
}

export async function getAdminGalleryItemById(id: string) {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching gallery item:", error)
    return null
  }
  
  return data
}

export async function getAdminTestimonialById(id: string) {
  const { supabaseAdmin } = await import("./server-client")
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching testimonial:", error)
    return null
  }
  
  return data
}
