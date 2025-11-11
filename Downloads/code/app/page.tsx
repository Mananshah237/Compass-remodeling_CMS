import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { getServices } from "@/lib/supabase/rest-api"
import HomeClient from "./home-client"

export default async function HomePage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HomeClient services={services} />
      <Footer />
    </div>
  )
}
