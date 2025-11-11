import { supabase } from "./client"

export async function createService(data: any) {
  return supabase.from("services").insert(data)
}

export async function updateService(id: string, data: any) {
  return supabase.from("services").update(data).eq("id", id)
}

export async function deleteService(id: string) {
  return supabase.from("services").delete().eq("id", id)
}

export async function createGalleryItem(data: any) {
  return supabase.from("gallery").insert(data)
}

export async function updateGalleryItem(id: string, data: any) {
  return supabase.from("gallery").update(data).eq("id", id)
}

export async function deleteGalleryItem(id: string) {
  return supabase.from("gallery").delete().eq("id", id)
}

export async function updateHomepageContent(data: any) {
  return supabase.from("homepage_content").update(data).eq("id", "1")
}
