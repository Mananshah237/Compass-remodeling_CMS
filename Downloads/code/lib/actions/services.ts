"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { STORAGE_BUCKET, getBucketPath } from "@/lib/supabase/config"
import { revalidatePath } from "next/cache"

export async function addService(data: FormData) {
  const title = String(data.get("title"))
  const description = String(data.get("description"))
  const file = data.get("image") as File | null

  let image_url: string | null = null

  if (file && file.size > 0) {
    const path = getBucketPath("services", `${crypto.randomUUID()}-${file.name}`)
    // Try uploading; if the storage bucket doesn't exist, attempt to create it
    let { error: upErr } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false
    })

    if (upErr) {
      const code = (upErr as any).status || (upErr as any).statusCode || null
      // If bucket not found, try to create it (requires service role key)
      if (code === 404 || String(code) === "404") {
        const { error: createErr } = await supabaseAdmin.storage.createBucket(STORAGE_BUCKET, { public: true })
        if (createErr) {
          throw new Error(`Failed to create storage bucket '${STORAGE_BUCKET}': ${createErr.message}`)
        }

        // Retry upload once
        ;({ error: upErr } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, file, {
          contentType: file.type,
          upsert: false
        }))
      }
    }

    if (upErr) throw upErr

    const { data: publicUrl } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    image_url = publicUrl.publicUrl
  }

  const { error } = await supabaseAdmin.from("services").insert({ title, description, image_url })
  if (error) throw error

  revalidatePath("/admin/services")
  revalidatePath("/services")
}

export async function updateService(id: string, data: FormData) {
  const title = String(data.get("title"))
  const description = String(data.get("description"))
  const file = data.get("image") as File | null
  const existingImageUrl = String(data.get("existingImageUrl") || "")

  let image_url: string | null = existingImageUrl || null

  if (file && file.size > 0) {
    // Delete old image if exists
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("/").slice(-2).join("/")
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([oldPath])
    }

    const path = getBucketPath("services", `${crypto.randomUUID()}-${file.name}`)
    const { error: upErr } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false
    })
    if (upErr) throw upErr

    const { data: publicUrl } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    image_url = publicUrl.publicUrl
  }

  const { error } = await supabaseAdmin.from("services").update({ title, description, image_url }).eq("id", id)
  if (error) throw error

  revalidatePath("/admin/services")
  revalidatePath("/services")
}

export async function deleteService(id: string) {
  // Get service to delete image
  const { data: service } = await supabaseAdmin.from("services").select("image_url").eq("id", id).single()
  
  if (service?.image_url) {
    const path = service.image_url.split("/").slice(-2).join("/")
    await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([path])
  }

  const { error } = await supabaseAdmin.from("services").delete().eq("id", id)
  if (error) throw error

  revalidatePath("/admin/services")
  revalidatePath("/services")
}

