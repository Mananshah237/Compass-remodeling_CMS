"use client"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Video,
  CheckSquare,
  Compass,
  Palette,
  FolderOpen,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Meeting", href: "/meeting", icon: Video },
  { name: "Task", href: "/task", icon: CheckSquare },
  {
    name: "CAD",
    href: "/cad",
    icon: Compass,
    hasSubmenu: true,
    submenu: [
      {
        name: "Design",
        href: "/design",
        icon: Palette,
      },
    ],
  },
  { name: "Project", href: "/project", icon: FolderOpen, hasSubmenu: true },
  { name: "Users", href: "/users", icon: Users, hasSubmenu: true },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(pathname.startsWith("/design") ? ["CAD", "Design"] : [])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const renderNavItem = (item: any, level = 0) => {
    const isExpanded = expandedItems.includes(item.name)
    const isActive = pathname === item.href || (item.name === "Design" && pathname.startsWith("/design"))
    const hasActiveChild = item.submenu?.some(
      (child: any) =>
        pathname === child.href ||
        (child.submenu && child.submenu.some((grandchild: any) => pathname === grandchild.href)),
    )

    return (
      <div key={item.name}>
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
            level === 0 && "ml-0",
            level === 1 && "ml-4",
            level === 2 && "ml-8",
            isActive || hasActiveChild
              ? "bg-blue-500 text-white"
              : "text-blue-100 hover:bg-blue-500/20 hover:text-white",
          )}
          onClick={() => {
            if (item.hasSubmenu) {
              toggleExpanded(item.name)
            }
          }}
        >
          <item.icon className="w-5 h-5" />
          <span className="flex-1">{item.name}</span>
          {item.hasSubmenu && (isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
        </div>

        {item.hasSubmenu && isExpanded && item.submenu && (
          <div className="mt-1 space-y-1">{item.submenu.map((subItem: any) => renderNavItem(subItem, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="sidebar-gradient w-64 min-h-screen p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-600 rounded transform rotate-45"></div>
        </div>
        <span className="text-white text-xl font-semibold">Smiley Task</span>
      </div>

      <nav className="space-y-2">{navigation.map((item) => renderNavItem(item))}</nav>
    </div>
  )
}
