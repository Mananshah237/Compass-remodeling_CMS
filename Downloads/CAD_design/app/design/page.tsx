"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePosts } from "@/contexts/post-context"
import { Home, Grid3X3, Upload, Bell, User, Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DesignPage() {
  const { posts } = usePosts()
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("Like")
  const [userFilter, setUserFilter] = useState("All")
  const [designFilter, setDesignFilter] = useState("1")

  const filteredPosts = posts.filter((post) => {
    if (categoryFilter !== "All" && post.category !== categoryFilter) return false
    if (statusFilter !== "Like" && post.status !== statusFilter) return false
    return true
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Small vertical section for Design subdivisions */}
      <div className="w-32 bg-white border-r border-gray-200 p-3">
        <div className="space-y-1">
          <Link
            href="/design"
            className="flex items-center gap-2 px-2 py-2 text-blue-600 bg-blue-50 rounded-lg text-xs"
          >
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
          <Link
            href="/design/feed"
            className="flex items-center gap-2 px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs"
          >
            <Grid3X3 className="w-3 h-3" />
            <span>Feed</span>
          </Link>
          <Link
            href="/design/upload"
            className="flex items-center gap-2 px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs"
          >
            <Upload className="w-3 h-3" />
            <span>Upload Post</span>
          </Link>
          <Link
            href="/design/notifications"
            className="flex items-center gap-2 px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs"
          >
            <Bell className="w-3 h-3" />
            <span>Notification</span>
          </Link>
          <Link
            href="/design/account"
            className="flex items-center gap-2 px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs"
          >
            <User className="w-3 h-3" />
            <span>Account</span>
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <div className="bg-white rounded-2xl p-6 min-h-[calc(100vh-120px)]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Design</h1>
              <p className="text-gray-600">Your team. Your tasks. One smooth workflow.</p>
            </div>

            {/* HOME PAGE: 4 filters as shown in first screenshot */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Branding">Branding</SelectItem>
                    <SelectItem value="UI/UX">UI/UX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Like">Like</SelectItem>
                    <SelectItem value="Dislike">Dislike</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Selection</label>
                <Select value={designFilter} onValueChange={setDesignFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Post</h2>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/design/post/${post.id}`}>
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
