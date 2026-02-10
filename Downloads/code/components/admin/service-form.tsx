"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { addService, updateService } from "@/lib/actions/services"
import { toast } from "sonner"
import Image from "next/image"

interface Service {
  id: string
  title: string
  description: string
  image_url?: string
}

export function ServiceForm({ service }: { service?: Service }) {
  const [title, setTitle] = useState(service?.title || "")
  const [description, setDescription] = useState(service?.description || "")
  const [imagePreview, setImagePreview] = useState<string | null>(service?.image_url || null)
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

      let result

      // If updating, we need to pass the ID separately
      if (service) {
        // updateService signature: (id: string, data: FormData)
        result = await updateService(service.id, formData)
      } else {
        // addService signature: (data: FormData)
        result = await addService(formData)
      }

      if (result?.error) {
        throw new Error(result.error)
      }

      toast.success(service ? "Service updated successfully" : "Service created successfully")

      router.push("/admin/services")
      router.refresh()
    } catch (err: unknown) {
      console.error("Submission error:", err)
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Service Title *</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Kitchen Remodeling"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this service..."
          required
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        />
      </div>

      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        {service?.image_url && (
          <input type="hidden" name="existingImageUrl" value={service.image_url} />
        )}
        {imagePreview && (
          <div className="mt-4 relative w-64 h-48 border rounded-lg overflow-hidden">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          Upload an image for this service. Recommended: 800x600px or larger.
        </p>
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
