"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { addTestimonial, updateTestimonial } from "@/lib/actions/testimonials"
import { toast } from "sonner"

interface Testimonial {
  id: string
  client_name?: string
  video_url: string
}

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const [clientName, setClientName] = useState(testimonial?.client_name || "")
  const [videoUrl, setVideoUrl] = useState(testimonial?.video_url || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)

      let result

      if (testimonial) {
        result = await updateTestimonial(testimonial.id, formData)
      } else {
        result = await addTestimonial(formData)
      }

      if (result?.error) {
        throw new Error(result.error)
      }

      toast.success(testimonial ? "Testimonial updated successfully" : "Testimonial added successfully")

      router.push("/admin/testimonials")
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
        <Label htmlFor="client_name">Client Name (optional)</Label>
        <Input
          id="client_name"
          name="client_name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g., John Smith"
        />
      </div>

      <div>
        <Label htmlFor="video_url">Video URL *</Label>
        <Input
          id="video_url"
          name="video_url"
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
          required
        />
        <p className="text-sm text-muted-foreground mt-2">
          Enter a YouTube or Vimeo video URL. The video will be embedded on the testimonials page.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Saving..." : testimonial ? "Update Testimonial" : "Add Testimonial"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

