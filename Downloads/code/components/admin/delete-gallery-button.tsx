"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteGalleryButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting gallery item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isLoading}>
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  )
}
