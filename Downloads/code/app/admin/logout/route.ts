import { supabase } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

export async function GET() {
  await supabase.auth.signOut()
  redirect("/admin/login")
}
