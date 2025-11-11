import { HomepageForm } from "@/components/admin/homepage-form"
import { Card, CardContent } from "@/components/ui/card"
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/rest-api"

async function getHomepageContent() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/homepage_content`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) return null
  const data = await response.json()
  return data[0] || null
}

export default async function AdminHomepagePage() {
  const homepageContent = await getHomepageContent()

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Edit Homepage Content</h1>
          <p className="text-muted-foreground mt-1">Customize your homepage hero section and content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <HomepageForm homepageContent={homepageContent} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
