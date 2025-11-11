"use server"

import { supabaseAdmin } from "@/lib/supabase/server-client"
import { revalidatePath } from "next/cache"

export async function deleteMessage(id: string) {
  const { error } = await supabaseAdmin.from("contact_messages").delete().eq("id", id)
  if (error) throw error

  revalidatePath("/admin/messages")
}

