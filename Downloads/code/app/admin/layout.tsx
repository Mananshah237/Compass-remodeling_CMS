import type React from "react"

// Admin layout - middleware handles auth protection
// No need for client-side auth guard since middleware redirects unauthenticated users
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
