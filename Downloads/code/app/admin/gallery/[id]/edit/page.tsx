import { notFound } from "next/navigation"
import { GalleryForm } from "@/components/admin/gallery-form"
import { Card, CardContent } from "@/components/ui/card"
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/rest-api"

async function getGalleryItemById(id: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/gallery?id=eq.${id}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) return null
  const data = await response.json()
  return data[0] || null
}

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const galleryItem = await getGalleryItemById(id)

  if (!galleryItem) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Edit Gallery Item</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <GalleryForm item={galleryItem} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
