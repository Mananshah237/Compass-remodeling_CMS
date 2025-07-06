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
  likePost: (id: string) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

const initialPosts: Post[] = [
  {
    id: "1",
    title: "Mountain Lake",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    author: "Sagar Panchal",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 2,
    comments: 3,
    category: "Design",
    status: "Like",
  },
  {
    id: "2",
    title: "City Sunset",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    author: "John Smith",
    authorAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    likes: 5,
    comments: 7,
    category: "Branding",
    status: "Like",
  },
  {
    id: "3",
    title: "Forest Path",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    author: "Sarah Wilson",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 1,
    comments: 2,
    category: "UI/UX",
    status: "Like",
  },
  {
    id: "4",
    title: "Desert Adventure",
    image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    author: "Mike Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    likes: 3,
    comments: 4,
    category: "Web Design",
    status: "Like",
  },
  {
    id: "5",
    title: "Product Packaging",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    author: "Emma Davis",
    authorAvatar: "https://randomuser.me/api/portraits/women/46.jpg",
    likes: 0,
    comments: 1,
    category: "Packaging",
    status: "Like",
  },
  {
    id: "6",
    title: "Logo Design Collection",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    author: "Alex Brown",
    authorAvatar: "https://randomuser.me/api/portraits/men/47.jpg",
    likes: 4,
    comments: 5,
    category: "Logo",
    status: "Like",
  },
  {
    id: "7",
    title: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    author: "Lisa Chen",
    authorAvatar: "https://randomuser.me/api/portraits/women/48.jpg",
    likes: 2,
    comments: 2,
    category: "E-commerce",
    status: "Like",
  },
  {
    id: "8",
    title: "Marketing Materials",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    author: "David Lee",
    authorAvatar: "https://randomuser.me/api/portraits/men/49.jpg",
    likes: 1,
    comments: 3,
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

  const likePost = (id: string) => {
    setPosts((prev) => prev.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post))
  }

  return <PostContext.Provider value={{ posts, addPost, getPost, likePost }}>{children}</PostContext.Provider>
}

export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider")
  }
  return context
}
