import { notFound } from "next/navigation"
import { ServiceForm } from "@/components/admin/service-form"
import { Card, CardContent } from "@/components/ui/card"
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/rest-api"

async function getServiceById(id: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/services?id=eq.${id}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) return null
  const data = await response.json()
  return data[0] || null
}

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = await getServiceById(id)

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
