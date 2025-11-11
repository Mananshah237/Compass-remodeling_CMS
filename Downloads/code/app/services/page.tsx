"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { motion } from "framer-motion"
import { getServices, getBeforeAfterItems } from "@/lib/supabase/rest-api"

export default async function ServicesPage() {
  const [services, galleryItems] = await Promise.all([getServices(), getBeforeAfterItems()])

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
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">Our Services</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Comprehensive home improvement solutions delivered with expertise and care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services?.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:bg-accent/5"
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      {galleryItems && galleryItems.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">See The Transformation</h2>
              <p className="text-xl text-primary/80 max-w-2xl mx-auto leading-relaxed">
                Real projects, real results. Slide to see the difference we make.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-12">
              {galleryItems.map((item) => (
                <BeforeAfterSlider
                  key={item.id}
                  beforeImage={item.before_image_url || item.image_url}
                  afterImage={item.image_url}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
