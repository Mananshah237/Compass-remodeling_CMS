"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { supabase } = await import("@/lib/supabase/client")
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsAdmin(!!user)
      } catch {
        setIsAdmin(false)
      }
    }
    checkAdmin()
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src="/compass-logo.png"
              alt="Compass Remodeling & Maintenance"
              width={280}
              height={60}
              className="h-12 w-auto transition-transform group-hover:scale-105 object-left object-cover"
              style={{ objectPosition: "0% 50%", maxWidth: "380px" }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled ? "text-white" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-white border-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/admin/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="destructive" size="sm">
                  <Link href="/admin/logout" className="flex items-center gap-2">
                    <LogOut size={16} />
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-white border-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/admin/login">Admin</Link>
                </Button>
                <Button asChild className="bg-accent text-white hover:bg-accent/90 transition-all">
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-white/10 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-white hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="block py-3 text-white hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button asChild className="w-full mt-4 bg-destructive text-white hover:bg-destructive/90">
                  <Link href="/admin/logout" onClick={() => setIsMobileMenuOpen(false)}>
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full mt-2 bg-white/10 text-white hover:bg-white/20 border border-white">
                  <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Admin
                  </Link>
                </Button>
                <Button asChild className="w-full mt-2 bg-accent text-white hover:bg-accent/90">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get a Free Quote
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
