"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Service {
  id: string
  title: string
  description: string
  image_url?: string
}

interface ServicesClientProps {
  services: Service[]
}

export default function ServicesClient({ services }: ServicesClientProps) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services && services.length > 0 ? (
              services.map((service: Service, index: number) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {service.image_url && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={service.image_url}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-muted-foreground">No services available at this time.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

