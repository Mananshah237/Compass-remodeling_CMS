"use client"
import Link from "next/link"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePosts } from "@/contexts/post-context"
import { Home, Grid3X3, Upload, Bell, User, Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FeedPage() {
  const { posts } = usePosts()
  const firstPost = posts[0] // Show the first post as featured

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Small vertical section for Design subdivisions */}
      <div className="w-32 bg-white border-r border-gray-200 p-3">
        <div className="space-y-1">
          <Link
            href="/design"
            className="flex items-center gap-2 px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs"
          >
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
          <Link
            href="/design/feed"
            className="flex items-center gap-2 px-2 py-2 text-blue-600 bg-blue-50 rounded-lg text-xs"
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

            {/* FEED PAGE: Only 2 filters as shown in third screenshot */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Select defaultValue="All">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select defaultValue="Like">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Like">Like</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Post</h2>
            </div>

            {/* Single large post as shown in third screenshot */}
            <div className="max-w-2xl">
              {firstPost && (
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={firstPost.image || "/placeholder.svg"}
                      alt={firstPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={firstPost.authorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{firstPost.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{firstPost.author}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{firstPost.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{firstPost.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
