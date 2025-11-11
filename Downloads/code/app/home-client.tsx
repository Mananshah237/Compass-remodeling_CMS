"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award, Users, CheckCircle, Clock } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  image_url?: string
}

interface HomeClientProps {
  services: Service[]
}

export default function HomeClient({ services }: HomeClientProps) {
  const whyChooseUs = [
    { icon: Award, title: "Expert Craftsmanship", description: "20+ years of experience" },
    { icon: Users, title: "Dedicated Team", description: "Professional & reliable" },
    { icon: CheckCircle, title: "Quality Guaranteed", description: "100% satisfaction promise" },
    { icon: Clock, title: "On-Time Delivery", description: "We respect your schedule" },
  ]

  return (
    <>
      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive home improvement solutions tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services && services.length > 0 ? (
              services.slice(0, 4).map((service, index) => (
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Services coming soon</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Why Choose Us</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto leading-relaxed">
              We're committed to excellence in every project we undertake
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                <p className="text-primary/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/home-renovation-tools-pattern.jpg"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Get a free consultation and quote for your next project. Let's bring your vision to life.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 text-lg px-10 py-6 transition-all hover:scale-105"
            >
              <Link href="/contact">Get Your Free Quote Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

