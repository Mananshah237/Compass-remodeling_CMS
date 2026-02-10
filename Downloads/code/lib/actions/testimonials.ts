"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { revalidatePath } from "next/cache"
import { checkAuth } from "@/lib/supabase/check-auth"

export async function addTestimonial(data: FormData) {
  try {
    await checkAuth()
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Server Misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing")

    const client_name = String(data.get("client_name") || "")
    const video_url = String(data.get("video_url"))

    if (!video_url) {
      throw new Error("Video URL is required")
    }

    const { error } = await supabaseAdmin.from("testimonials").insert({ client_name, video_url })
    if (error) throw error

    revalidatePath("/admin/testimonials")
    // Revalidate testimonials page if you have one
    return { success: true }
  } catch (error) {
    console.error("Error in addTestimonial:", error)
    return { error: error instanceof Error ? error.message : "Failed to add testimonial" }
  }
}

export async function updateTestimonial(id: string, data: FormData) {
  try {
    await checkAuth()
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Server Misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing")

    const client_name = String(data.get("client_name") || "")
    const video_url = String(data.get("video_url"))

    if (!video_url) {
      throw new Error("Video URL is required")
    }

    const { error } = await supabaseAdmin.from("testimonials").update({ client_name, video_url }).eq("id", id)
    if (error) throw error

    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (error) {
    console.error("Error in updateTestimonial:", error)
    return { error: error instanceof Error ? error.message : "Failed to update testimonial" }
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await checkAuth()
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Server Misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing")

    const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id)
    if (error) throw error

    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteTestimonial:", error)
    return { error: error instanceof Error ? error.message : "Failed to delete testimonial" }
  }
}

