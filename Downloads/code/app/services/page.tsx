import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getServices } from "@/lib/supabase/rest-api"
import ServicesClient from "./services-client"

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      <Navbar />
      <ServicesClient services={services} />
      <Footer />
    </div>
  )
}
