"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { revalidatePath } from "next/cache"

export async function addTestimonial(data: FormData) {
  const client_name = String(data.get("client_name") || "")
  const video_url = String(data.get("video_url"))

  if (!video_url) {
    throw new Error("Video URL is required")
  }

  const { error } = await supabaseAdmin.from("testimonials").insert({ client_name, video_url })
  if (error) throw error

  revalidatePath("/admin/testimonials")
  // Revalidate testimonials page if you have one
}

export async function updateTestimonial(id: string, data: FormData) {
  const client_name = String(data.get("client_name") || "")
  const video_url = String(data.get("video_url"))

  if (!video_url) {
    throw new Error("Video URL is required")
  }

  const { error } = await supabaseAdmin.from("testimonials").update({ client_name, video_url }).eq("id", id)
  if (error) throw error

  revalidatePath("/admin/testimonials")
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id)
  if (error) throw error

  revalidatePath("/admin/testimonials")
}

