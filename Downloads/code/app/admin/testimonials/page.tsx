import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAdminTestimonials } from "@/lib/supabase/rest-api"
import { DeleteTestimonialButton } from "@/components/admin/delete-testimonial-button"

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Testimonials</h1>
            <p className="text-muted-foreground mt-1">Add, edit, or remove video testimonials</p>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link href="/admin/testimonials/new">Add Testimonial</Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {testimonials && testimonials.length > 0 ? (
          <div className="space-y-4">
            {testimonials.map((testimonial: any) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{testimonial.client_name || "Anonymous"}</h3>
                    <p className="text-sm text-muted-foreground mt-1 break-all">{testimonial.video_url}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/testimonials/${testimonial.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteTestimonialButton id={testimonial.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No testimonials found</p>
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/testimonials/new">Add First Testimonial</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

