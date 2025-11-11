import { notFound } from "next/navigation"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { Card, CardContent } from "@/components/ui/card"
import { getAdminTestimonialById } from "@/lib/supabase/rest-api"

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const testimonial = await getAdminTestimonialById(id)

  if (!testimonial) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Edit Testimonial</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <TestimonialForm testimonial={testimonial} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

