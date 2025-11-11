"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"
import { motion } from "framer-motion"
import { getGalleryItems } from "@/lib/supabase/rest-api"

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems("before-after")

  const formattedItems =
    galleryItems?.map((item: any) => ({
      type: "image" as const,
      src: item.image_url,
      alt: item.title,
    })) || []

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">Our Gallery</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore our portfolio of completed projects and see the quality craftsmanship we deliver
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {formattedItems.length > 0 ? (
            <GalleryGrid items={formattedItems} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Gallery items coming soon</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
