"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface GalleryItem {
  id: string
  title: string
  description?: string
  image_url: string
  before_image_url?: string
  category: string
  order_index: number
}

export function GalleryForm({ item }: { item?: GalleryItem }) {
  const [title, setTitle] = useState(item?.title || "")
  const [description, setDescription] = useState(item?.description || "")
  const [imageUrl, setImageUrl] = useState(item?.image_url || "")
  const [beforeImageUrl, setBeforeImageUrl] = useState(item?.before_image_url || "")
  const [category, setCategory] = useState(item?.category || "general")
  const [orderIndex, setOrderIndex] = useState(item?.order_index || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (item) {
        const { error } = await supabase
          .from("gallery")
          .update({
            title,
            description,
            image_url: imageUrl,
            before_image_url: beforeImageUrl,
            category,
            order_index: orderIndex,
            updated_at: new Date(),
          })
          .eq("id", item.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("gallery").insert({
          title,
          description,
          image_url: imageUrl,
          before_image_url: beforeImageUrl,
          category,
          order_index: orderIndex,
        })

        if (error) throw error
      }

      router.push("/admin/gallery")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Gallery Item Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Modern Kitchen Transformation"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optional)</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this project..."
          className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL (After)</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/after-image.jpg"
          required
        />
      </div>

      <div>
        <Label htmlFor="beforeImageUrl">Before Image URL (optional)</Label>
        <Input
          id="beforeImageUrl"
          value={beforeImageUrl}
          onChange={(e) => setBeforeImageUrl(e.target.value)}
          placeholder="https://example.com/before-image.jpg"
        />
        <p className="text-xs text-muted-foreground mt-1">
          If provided, this will show as a before/after slider in the services page
        </p>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <option value="general">General</option>
          <option value="kitchen">Kitchen</option>
          <option value="bathroom">Bathroom</option>
          <option value="landscaping">Landscaping</option>
          <option value="before-after">Before/After Slider</option>
        </select>
      </div>

      <div>
        <Label htmlFor="orderIndex">Display Order</Label>
        <Input
          id="orderIndex"
          type="number"
          value={orderIndex}
          onChange={(e) => setOrderIndex(Number.parseInt(e.target.value))}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Saving..." : item ? "Update Item" : "Create Item"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
