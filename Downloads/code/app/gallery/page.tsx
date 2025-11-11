import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getGalleryItems } from "@/lib/supabase/rest-api"
import GalleryClient from "./gallery-client"

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems()

  const formattedItems =
    galleryItems?.map((item: any) => ({
      type: "image" as const,
      src: item.image_url,
      alt: item.caption || "Gallery image",
    })) || []

  return (
    <div className="min-h-screen">
      <Navbar />
      <GalleryClient formattedItems={formattedItems} />
      <Footer />
    </div>
  )
}
