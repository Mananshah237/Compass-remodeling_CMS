"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
  image_url?: string
  order_index: number
}

export function ServiceForm({ service }: { service?: Service }) {
  const [title, setTitle] = useState(service?.title || "")
  const [description, setDescription] = useState(service?.description || "")
  const [imageUrl, setImageUrl] = useState(service?.image_url || "")
  const [orderIndex, setOrderIndex] = useState(service?.order_index || 0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        default: { updateService, createService },
      } = await import("@/lib/supabase/db-client")

      if (service) {
        const { error } = await updateService(service.id, {
          title,
          description,
          image_url: imageUrl,
          order_index: orderIndex,
          updated_at: new Date(),
        })
        if (error) throw error
      } else {
        const { error } = await createService({
          title,
          description,
          image_url: imageUrl,
          order_index: orderIndex,
        })
        if (error) throw error
      }

      router.push("/admin/services")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Service Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Kitchen Remodeling"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this service..."
          required
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
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
          {isLoading ? "Saving..." : service ? "Update Service" : "Create Service"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
