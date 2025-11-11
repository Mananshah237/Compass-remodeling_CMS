import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DeleteServiceButton } from "@/components/admin/delete-service-button"
import { getAdminServices } from "@/lib/supabase/rest-api"

export default async function AdminServicesPage() {
  const services = await getAdminServices()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Services</h1>
            <p className="text-muted-foreground mt-1">Add, edit, or remove services</p>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white">
            <Link href="/admin/services/new">Add Service</Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {services && services.length > 0 ? (
          <div className="space-y-4">
            {services.map((service: any) => (
              <Card key={service.id}>
                <CardContent className="pt-6 flex items-center justify-between gap-6">
                  {service.image_url && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/services/${service.id}/edit`}>Edit</Link>
                    </Button>
                    <DeleteServiceButton id={service.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No services found</p>
              <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/services/new">Create First Service</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
