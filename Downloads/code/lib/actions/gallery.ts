"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { revalidatePath } from "next/cache"

export async function addGalleryItem(data: FormData) {
  const caption = String(data.get("caption") || "")
  const file = data.get("image") as File | null

  if (!file || file.size === 0) {
    throw new Error("Image is required")
  }

  const path = `gallery/${crypto.randomUUID()}-${file.name}`
  const { error: upErr } = await supabaseAdmin.storage.from("media").upload(path, file)
  if (upErr) throw upErr

  const { data: publicUrl } = supabaseAdmin.storage.from("media").getPublicUrl(path)
  const image_url = publicUrl.publicUrl

  const { error } = await supabaseAdmin.from("gallery").insert({ image_url, caption })
  if (error) throw error

  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
}

export async function updateGalleryItem(id: string, data: FormData) {
  const caption = String(data.get("caption") || "")
  const file = data.get("image") as File | null
  const existingImageUrl = String(data.get("existingImageUrl") || "")

  let image_url: string | null = existingImageUrl || null

  if (file && file.size > 0) {
    // Delete old image if exists
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("/").slice(-2).join("/")
      await supabaseAdmin.storage.from("media").remove([oldPath])
    }

    const path = `gallery/${crypto.randomUUID()}-${file.name}`
    const { error: upErr } = await supabaseAdmin.storage.from("media").upload(path, file)
    if (upErr) throw upErr

    const { data: publicUrl } = supabaseAdmin.storage.from("media").getPublicUrl(path)
    image_url = publicUrl.publicUrl
  }

  const { error } = await supabaseAdmin.from("gallery").update({ image_url, caption }).eq("id", id)
  if (error) throw error

  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
}

export async function deleteGalleryItem(id: string) {
  // Get gallery item to delete image
  const { data: item } = await supabaseAdmin.from("gallery").select("image_url").eq("id", id).single()
  
  if (item?.image_url) {
    const path = item.image_url.split("/").slice(-2).join("/")
    await supabaseAdmin.storage.from("media").remove([path])
  }

  const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id)
  if (error) throw error

  revalidatePath("/admin/gallery")
  revalidatePath("/gallery")
}

