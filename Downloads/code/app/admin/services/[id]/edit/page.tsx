import { notFound } from "next/navigation"
import { ServiceForm } from "@/components/admin/service-form"
import { Card, CardContent } from "@/components/ui/card"
import { getAdminServiceById } from "@/lib/supabase/rest-api"

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = await getAdminServiceById(id)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Edit Service</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <ServiceForm service={service} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
