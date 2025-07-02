"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Post {
  id: string
  title: string
  image: string
  author: string
  authorAvatar: string
  likes: number
  comments: number
  category: string
  status: string
}

interface PostContextType {
  posts: Post[]
  addPost: (post: Omit<Post, "id">) => void
  getPost: (id: string) => Post | undefined
}

const PostContext = createContext<PostContextType | undefined>(undefined)

const initialPosts: Post[] = [
  {
    id: "1",
    title: "Smart Product Management",
    image: "/placeholder.svg?height=300&width=400",
    author: "Sagar Panchal",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 10,
    comments: 3,
    category: "Design",
    status: "Like",
  },
  {
    id: "2",
    title: "Brand Identity Design",
    image: "/placeholder.svg?height=300&width=400",
    author: "John Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 15,
    comments: 7,
    category: "Branding",
    status: "Like",
  },
  {
    id: "3",
    title: "Mobile App Interface",
    image: "/placeholder.svg?height=300&width=400",
    author: "Sarah Wilson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 22,
    comments: 12,
    category: "UI/UX",
    status: "Like",
  },
  {
    id: "4",
    title: "Web Dashboard Design",
    image: "/placeholder.svg?height=300&width=400",
    author: "Mike Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 8,
    comments: 4,
    category: "Web Design",
    status: "Like",
  },
  {
    id: "5",
    title: "Product Packaging",
    image: "/placeholder.svg?height=300&width=400",
    author: "Emma Davis",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 18,
    comments: 9,
    category: "Packaging",
    status: "Like",
  },
  {
    id: "6",
    title: "Logo Design Collection",
    image: "/placeholder.svg?height=300&width=400",
    author: "Alex Brown",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 25,
    comments: 15,
    category: "Logo",
    status: "Like",
  },
  {
    id: "7",
    title: "E-commerce Platform",
    image: "/placeholder.svg?height=300&width=400",
    author: "Lisa Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 12,
    comments: 6,
    category: "E-commerce",
    status: "Like",
  },
  {
    id: "8",
    title: "Marketing Materials",
    image: "/placeholder.svg?height=300&width=400",
    author: "David Lee",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    likes: 14,
    comments: 8,
    category: "Marketing",
    status: "Like",
  },
]

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const addPost = (newPost: Omit<Post, "id">) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
    }
    setPosts((prev) => [post, ...prev])
  }

  const getPost = (id: string) => {
    return posts.find((post) => post.id === id)
  }

  return <PostContext.Provider value={{ posts, addPost, getPost }}>{children}</PostContext.Provider>
}

export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider")
  }
  return context
}
