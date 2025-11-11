"use client"

import { motion } from "framer-motion"
import { GalleryGrid } from "@/components/gallery-grid"

interface GalleryClientProps {
  formattedItems: Array<{
    type: "image"
    src: string
    alt: string
  }>
}

export default function GalleryClient({ formattedItems }: GalleryClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">Gallery items coming soon</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

