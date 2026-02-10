"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { createClient } from "@/lib/supabase/server"
import { STORAGE_BUCKET, getBucketPath } from "@/lib/supabase/config"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function addService(data: FormData) {
  console.log("Starting addService..."); 
  
  // Verify Auth
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth failed in addService:", authError);
    redirect("/admin/login");
  }

  try {
    const title = String(data.get("title"))
    const description = String(data.get("description"))
    const file = data.get("image") as File | null

    let image_url: string | null = null

    if (file && file.size > 0) {
      console.log("Uploading file:", file.name, "Size:", file.size); 
      const path = getBucketPath("services", `${crypto.randomUUID()}-${file.name}`)
      
      // Try uploading
      let { error: upErr } = await supabaseAdmin.storage.from(STORAGE_BUCKET).upload(path, file, {
        contentType: file.type,
        upsert: false
      })

      if (upErr) {
        console.error("Initial upload failed:", upErr); 
        const code = (upErr as any).status || (upErr as any).statusCode || null
        // If bucket not found, try to create it (requires service role key)
        if (code === 404 || String(code) === "404") {
          console.log("Bucket not found, attempting to create..."); 
          const { error: createErr } = await supabaseAdmin.storage.createBucket(STORAGE_BUCKET, { public: true })
          if (createErr) {
            console.error("Failed to create bucket:", createErr)
          } else {
              // Retry upload once
              console.log("Bucket created, retrying upload..."); 
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
      console.log("Image URL generated:", image_url); 
    }

    console.log("Inserting into database..."); 
    const { error } = await supabaseAdmin.from("services").insert({ title, description, image_url })
    if (error) {
        console.error("Database insert error:", error)
        throw new Error(`Database insert failed: ${error.message}`)
    }

    console.log("Service added successfully!"); 
    revalidatePath("/admin/services")
    revalidatePath("/services")
  } catch (error) {
    console.error("CRITICAL ERROR in addService:", error);
    throw error; 
  }
}

export async function updateService(id: string, data: FormData) {
  console.log("Starting updateService for ID:", id); 
  
  // Verify Auth
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth failed in updateService:", authError);
    redirect("/admin/login");
  }

  try {
    const title = String(data.get("title"))
    const description = String(data.get("description"))
    const file = data.get("image") as File | null
    const existingImageUrl = String(data.get("existingImageUrl") || "")

    let image_url: string | null = existingImageUrl || null

    if (file && file.size > 0) {
      console.log("New file detected, uploading..."); 
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
  } catch (error) {
    console.error("CRITICAL ERROR in updateService:", error);
    throw error;
  }
}

export async function deleteService(id: string) {
  console.log("Starting deleteService for ID:", id); 

  // Verify Auth
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Auth failed in deleteService:", authError);
    redirect("/admin/login");
  }

  try {
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
  } catch (error) {
    console.error("CRITICAL ERROR in deleteService:", error);
    throw error;
  }
}
