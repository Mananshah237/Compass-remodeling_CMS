"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePosts } from "@/contexts/post-context"
import { Home, Grid3X3, Upload, Bell, User, CloudUpload } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const { addPost } = usePosts()
  const [category, setCategory] = useState("All")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (selectedFile && category !== "All") {
      const newPost = {
        title: selectedFile.name.replace(/\.[^/.]+$/, ""),
        image: "/placeholder.svg?height=300&width=400",
        author: "John Doe",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        likes: 0,
        comments: 0,
        category: category,
        status: "Like",
      }

      addPost(newPost)
      router.push("/design")
    }
  }

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
            className="flex items-center gap-2 px-2 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-xs"
          >
            <Grid3X3 className="w-3 h-3" />
            <span>Feed</span>
          </Link>
          <Link
            href="/design/upload"
            className="flex items-center gap-2 px-2 py-2 text-blue-600 bg-blue-50 rounded-lg text-xs"
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

            {/* Upload area as shown in second screenshot - no filters above */}
            <div className="max-w-2xl mx-auto">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <CloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">Drop your file here or click to upload</p>
                <p className="text-sm text-gray-500 mb-4">Supports JPG or PNG files</p>
                <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                    <span>Choose file</span>
                  </Button>
                </label>
                {selectedFile && <p className="mt-4 text-sm text-green-600">Selected: {selectedFile.name}</p>}
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Branding">Branding</SelectItem>
                    <SelectItem value="UI/UX">UI/UX</SelectItem>
                    <SelectItem value="Web Design">Web Design</SelectItem>
                    <SelectItem value="Packaging">Packaging</SelectItem>
                    <SelectItem value="Logo">Logo</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 mt-8 justify-end">
                <Button variant="outline" onClick={() => router.push("/design")}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedFile || category === "All"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Post Now
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
