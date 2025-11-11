import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Compass Remodeling | Transforming Homes. Elevating Spaces.",
  description: "From remodeling and plumbing to gardening and maintenance — we handle everything under one roof.",
  generator: "v0.app",
  openGraph: {
    title: "Compass Remodeling | Transforming Homes. Elevating Spaces.",
    description: "From remodeling and plumbing to gardening and maintenance — we handle everything under one roof.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
