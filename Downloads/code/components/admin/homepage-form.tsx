"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface HomepageContent {
  id: string
  hero_title?: string
  hero_subtitle?: string
  hero_cta_text?: string
  about_section?: string
  testimonials?: any[]
}

export function HomepageForm({ homepageContent }: { homepageContent?: HomepageContent }) {
  const [heroTitle, setHeroTitle] = useState(homepageContent?.hero_title || "Transform Your Home")
  const [heroSubtitle, setHeroSubtitle] = useState(
    homepageContent?.hero_subtitle || "Premium remodeling and maintenance services",
  )
  const [heroCtaText, setHeroCtaText] = useState(homepageContent?.hero_cta_text || "Get Started")
  const [aboutSection, setAboutSection] = useState(homepageContent?.about_section || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (homepageContent) {
        const { error } = await supabase
          .from("homepage")
          .update({
            hero_title: heroTitle,
            hero_subtitle: heroSubtitle,
            hero_cta_text: heroCtaText,
            about_section: aboutSection,
            updated_at: new Date(),
          })
          .eq("id", homepageContent.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("homepage").insert({
          hero_title: heroTitle,
          hero_subtitle: heroSubtitle,
          hero_cta_text: heroCtaText,
          about_section: aboutSection,
        })

        if (error) throw error
      }

      router.push("/admin/dashboard")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="heroTitle">Hero Title</Label>
        <Input
          id="heroTitle"
          value={heroTitle}
          onChange={(e) => setHeroTitle(e.target.value)}
          placeholder="e.g., Transform Your Home"
          required
        />
      </div>

      <div>
        <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
        <Input
          id="heroSubtitle"
          value={heroSubtitle}
          onChange={(e) => setHeroSubtitle(e.target.value)}
          placeholder="e.g., Premium remodeling services"
          required
        />
      </div>

      <div>
        <Label htmlFor="heroCtaText">Hero Button Text</Label>
        <Input
          id="heroCtaText"
          value={heroCtaText}
          onChange={(e) => setHeroCtaText(e.target.value)}
          placeholder="e.g., Get Started"
          required
        />
      </div>

      <div>
        <Label htmlFor="aboutSection">About Section</Label>
        <textarea
          id="aboutSection"
          value={aboutSection}
          onChange={(e) => setAboutSection(e.target.value)}
          placeholder="Tell us about your company..."
          className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-white" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
