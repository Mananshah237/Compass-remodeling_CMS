import { TestimonialForm } from "@/components/admin/testimonial-form"
import { Card, CardContent } from "@/components/ui/card"

export default function NewTestimonialPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Add New Testimonial</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <TestimonialForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

