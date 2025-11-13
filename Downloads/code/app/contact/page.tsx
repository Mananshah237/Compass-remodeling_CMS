"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "(214)621-3033",
      link: "tel:2146213033",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@compassremodeling.com",
      link: "mailto:info@compassremodeling.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "1800 Jay Circle #A, Arlington, TX 76012",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      link: null,
    },
  ]

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
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-balance">Get In Touch</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Ready to start your project? Contact us today for a free consultation and quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2 text-primary">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-muted-foreground hover:text-accent transition-colors">
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">Send Us a Message</h2>
              <ContactForm />
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full min-h-[500px]"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">Visit Our Office</h2>
              <div className="w-full h-[calc(100%-4rem)] rounded-lg overflow-hidden shadow-lg">
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.9230944657687!2d-97.14149672483028!3d32.74846828712655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d44cb5b6977%3A0x48ee3ae7ddc5a352!2s1800%20Jay%20Cir%20A%2C%20Arlington%2C%20TX%2076012!5e0!3m2!1sen!2sus!4v1731379489234!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
                            
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
