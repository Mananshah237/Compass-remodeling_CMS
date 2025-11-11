import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminServices, getAdminGalleryItems, getAdminTestimonials, getContactMessages } from "@/lib/supabase/rest-api"

export default async function AdminDashboard() {
  const [services, gallery, testimonials, messages] = await Promise.all([
    getAdminServices(),
    getAdminGalleryItems(),
    getAdminTestimonials(),
    getContactMessages(),
  ])

  const servicesCount = services?.length || 0
  const galleryCount = gallery?.length || 0
  const testimonialsCount = testimonials?.length || 0
  const messagesCount = messages?.length || 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/">Back to Site</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/logout">Logout</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Services Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">{servicesCount}</p>
              <p className="text-sm text-muted-foreground">Total services published</p>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/services">Manage Services</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Gallery Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">{galleryCount}</p>
              <p className="text-sm text-muted-foreground">Total gallery items</p>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/gallery">Manage Gallery</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Testimonials Management Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Testimonials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">{testimonialsCount}</p>
              <p className="text-sm text-muted-foreground">Total video testimonials</p>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/testimonials">Manage Testimonials</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Messages Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">{messagesCount}</p>
              <p className="text-sm text-muted-foreground">Contact form messages</p>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/messages">View Messages</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Homepage Content Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Homepage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Edit homepage content and hero section</p>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white">
                <Link href="/admin/homepage">Edit Homepage</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <Link href="/admin/services/new">Add New Service</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/gallery/new">Add Gallery Item</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/testimonials/new">Add Testimonial</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/messages">View Messages</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
