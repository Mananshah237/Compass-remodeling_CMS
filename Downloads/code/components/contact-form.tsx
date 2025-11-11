"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const { error } = await supabase.from("contact_messages").insert({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone") || "") || null,
        message: String(formData.get("message")),
      })

      if (error) throw error

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                Name *
              </label>
              <Input id="name" name="name" required placeholder="Your name" className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                Email *
              </label>
              <Input id="email" name="email" type="email" required placeholder="your@email.com" className="w-full" />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
              Phone
            </label>
            <Input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="w-full" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Tell us about your project..."
              rows={6}
              className="w-full resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-primary hover:bg-accent/90 text-lg py-6 transition-all"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
