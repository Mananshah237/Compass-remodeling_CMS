"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { addGalleryItem, updateGalleryItem } from "@/lib/actions/gallery"
import { toast } from "sonner"
import Image from "next/image"

interface GalleryItem {
  id: string
  image_url: string
  caption?: string
}

export function GalleryForm({ item }: { item?: GalleryItem }) {
  const [caption, setCaption] = useState(item?.caption || "")
  const [imagePreview, setImagePreview] = useState<string | null>(item?.image_url || null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      
      if (item) {
        await updateGalleryItem(item.id, formData)
        toast.success("Gallery item updated successfully")
      } else {
        await addGalleryItem(formData)
        toast.success("Gallery item added successfully")
      }

      router.push("/admin/gallery")
      router.refresh()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="image">Image *</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
          required={!item}
        />
        {item?.image_url && (
          <input type="hidden" name="existingImageUrl" value={item.image_url} />
        )}
        {imagePreview && (
          <div className="mt-4 relative w-full max-w-md h-64 border rounded-lg overflow-hidden">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Upload an image for the gallery. Recommended: 1200x800px or larger.
        </p>
      </div>

      <div>
        <Label htmlFor="caption">Caption (optional)</Label>
        <Textarea
          id="caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption for this image..."
          className="min-h-24"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Saving..." : item ? "Update Gallery Item" : "Add Gallery Item"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
