"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { STORAGE_BUCKET, getBucketPath } from "@/lib/supabase/config"
import { revalidatePath } from "next/cache"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Helper to check authentication
async function checkAuth() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("Unauthorized: You must be logged in to perform this action")
  }
  return user
}

export async function addService(data: FormData) {
  console.log("Starting addService..."); // Debug log
  try {
    await checkAuth()

    // Check if Service Role Key is available (critical for storage/admin writes)
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Server Misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing")
    }

    const title = String(data.get("title"))
    const description = String(data.get("description"))
    const file = data.get("image") as File | null

    let image_url: string | null = null

    if (file && file.size > 0) {
      console.log("Uploading file:", file.name, "Size:", file.size); // Debug log
      const path = getBucketPath("services", `${crypto.randomUUID()}-${file.name}`)

      // Try uploading
      let { error: upErr } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, file, {
        contentType: file.type,
        upsert: false
      })

      if (upErr) {
        console.error("Initial upload failed:", upErr); // Debug log
        const code = (upErr as any).status || (upErr as any).statusCode || null
        // If bucket not found, try to create it (requires service role key)
        if (code === 404 || String(code) === "404") {
          console.log("Bucket not found, attempting to create..."); // Debug log
          const { error: createErr } = await supabaseAdmin.storage.createBucket(STORAGE_BUCKET, { public: true })
          if (createErr) {
            console.error("Failed to create bucket:", createErr)
          } else {
            // Retry upload once
            console.log("Bucket created, retrying upload..."); // Debug log
            const retry = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, file, {
              contentType: file.type,
              upsert: false
            })
            upErr = retry.error
          }
        }
      }

      if (upErr) {
        console.error("Upload error details (Final):", upErr)
        throw new Error(`Upload failed: ${upErr.message}`)
      }

      const { data: publicUrl } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      image_url = publicUrl.publicUrl
      console.log("Image URL generated:", image_url); // Debug log
    }

    console.log("Inserting into database..."); // Debug log
    const { error } = await supabaseAdmin.from("services").insert({ title, description, image_url })
    if (error) {
      console.error("Database insert error:", error)
      throw new Error(`Database insert failed: ${error.message}`)
    }

    console.log("Service added successfully!"); // Debug log
    revalidatePath("/admin/services")
    revalidatePath("/services")
    return { success: true }
  } catch (error) {
    console.error("CRITICAL ERROR in addService:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

export async function updateService(id: string, data: FormData) {
  console.log("Starting updateService for ID:", id); // Debug log
  try {
    await checkAuth()

    // Check if Service Role Key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Server Misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing")
    }
    const title = String(data.get("title"))
    const description = String(data.get("description"))
    const file = data.get("image") as File | null
    const existingImageUrl = String(data.get("existingImageUrl") || "")

    let image_url: string | null = existingImageUrl || null

    if (file && file.size > 0) {
      console.log("New file detected, uploading..."); // Debug log
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
      if (upErr) {
        console.error("Upload failed in update:", upErr);
        throw upErr
      }

      const { data: publicUrl } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path)
      image_url = publicUrl.publicUrl
    }

    const { error } = await supabaseAdmin.from("services").update({ title, description, image_url }).eq("id", id)
    if (error) {
      console.error("Database update failed:", error);
      throw error
    }

    revalidatePath("/admin/services")
    revalidatePath("/services")
    return { success: true }
  } catch (error) {
    console.error("CRITICAL ERROR in updateService:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

export async function deleteService(id: string) {
  console.log("Starting deleteService for ID:", id); // Debug log
  try {
    await checkAuth()

    // Check if Service Role Key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Server Misconfiguration: SUPABASE_SERVICE_ROLE_KEY is missing")
    }
    // Get service to delete image
    const { data: service, error: fetchError } = await supabaseAdmin.from("services").select("image_url").eq("id", id).single()

    if (fetchError) {
      console.error("Error fetching service to delete:", fetchError);
    }

    if (service?.image_url) {
      const path = service.image_url.split("/").slice(-2).join("/")
      await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([path])
    }

    const { error } = await supabaseAdmin.from("services").delete().eq("id", id)
    if (error) {
      console.error("Database delete failed:", error);
      throw error
    }

    revalidatePath("/admin/services")
    revalidatePath("/services")
    return { success: true }
  } catch (error) {
    console.error("CRITICAL ERROR in deleteService:", error);
    return { error: error instanceof Error ? error.message : "An unexpected error occurred" }
  }
}

