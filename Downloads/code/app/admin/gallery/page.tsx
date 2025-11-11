import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteGalleryButton } from "@/components/admin/delete-gallery-button"
import { getAdminGalleryItems } from "@/lib/supabase/rest-api"

export default async function AdminGalleryPage() {
  const galleryItems = await getAdminGalleryItems()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Gallery</h1>
            <p className="text-muted-foreground mt-1">Add, edit, or remove gallery items</p>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link href="/admin/gallery/new">Add Gallery Item</Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {galleryItems && galleryItems.length > 0 ? (
          <div className="space-y-4">
            {galleryItems.map((item: any) => (
              <Card key={item.id}>
                <CardContent className="pt-6 flex items-center justify-between gap-6">
                  {item.image_url && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.caption || "Gallery image"}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {item.caption && (
                      <p className="text-sm text-muted-foreground">{item.caption}</p>
                    )}
                    {!item.caption && (
                      <p className="text-sm text-muted-foreground italic">No caption</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/gallery/${item.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteGalleryButton id={item.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No gallery items found</p>
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/gallery/new">Create First Gallery Item</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
