"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, Grid3X3, Upload, Bell, User, Heart, Share2 } from "lucide-react";
import { usePosts } from "@/contexts/post-context";

const tabs = [
  { key: "all", label: "All Post" },
  { key: "like", label: "Like Post" },
  { key: "shared", label: "Shared Post" },
];

const likeOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const dummyUsers = [
  {
    id: 1,
    name: "Sagar Panchal",
    username: "@sagar.panchal",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    postIds: ["1", "2", "3", "4"],
  },
  {
    id: 2,
    name: "Jignesh Prajapati",
    username: "@jignesh.super",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    postIds: ["5", "6", "7", "8"],
  },
  {
    id: 3,
    name: "Om Waghela",
    username: "@om_waghela",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    postIds: ["1", "4", "6", "8"],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [likeFilter, setLikeFilter] = useState("0");
  const { posts, likePost } = usePosts();

  // Share handler (copies image URL to clipboard)
  const handleShare = (image: string) => {
    navigator.clipboard.writeText(image);
    alert("Image URL copied to clipboard!");
  };

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
            className="flex items-center gap-2 px-2 py-2 text-blue-600 bg-blue-50 rounded-lg text-xs"
          >
            <User className="w-3 h-3" />
            <span>Account</span>
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <main className="p-6">
          <div className="bg-white rounded-2xl p-6 min-h-[calc(100vh-120px)]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Design</h1>
              <p className="text-gray-600">Your team. Your tasks. One smooth workflow.</p>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`px-6 py-2 font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-600 hover:bg-gray-50"
                  } rounded-t-lg`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            {activeTab === "all" && (
              <div className="grid grid-cols-4 gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden relative group">
                    <div className="aspect-square relative">
                      <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
                      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" onClick={() => likePost(post.id)} aria-label="Like">
                          <Heart className="w-5 h-5 text-red-500" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleShare(post.image)} aria-label="Share">
                          <Share2 className="w-5 h-5 text-blue-500" />
                        </Button>
                      </div>
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{post.likes} Likes</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "like" && (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-medium text-gray-700">Likes</span>
                  <select
                    className="border rounded px-2 py-1 text-gray-700"
                    value={likeFilter}
                    onChange={(e) => setLikeFilter(e.target.value)}
                  >
                    {likeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  {posts.filter((p) => String(p.likes) === likeFilter).map((post) => (
                    <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden relative group">
                      <div className="aspect-square relative">
                        <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
                        <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" onClick={() => likePost(post.id)} aria-label="Like">
                            <Heart className="w-5 h-5 text-red-500" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleShare(post.image)} aria-label="Share">
                            <Share2 className="w-5 h-5 text-blue-500" />
                          </Button>
                        </div>
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{post.likes} Likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === "shared" && (
              <div className="space-y-6">
                {dummyUsers.map((user) => (
                  <div key={user.id} className="flex items-center bg-gray-50 rounded-lg p-4">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-sm">{user.username}</div>
                      <div className="flex gap-2 mt-2">
                        {user.postIds.map((postId) => {
                          const post = posts.find((p) => p.id === postId);
                          return post ? (
                            <div key={post.id} className="w-16 h-16 rounded overflow-hidden bg-white border relative group">
                              <img src={post.image} alt={post.title} className="object-cover w-full h-full" />
                              <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" onClick={() => likePost(post.id)} aria-label="Like" className="p-1">
                                  <Heart className="w-4 h-4 text-red-500" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => handleShare(post.image)} aria-label="Share" className="p-1">
                                  <Share2 className="w-4 h-4 text-blue-500" />
                                </Button>
                              </div>
                              <span className="absolute top-1 left-1 bg-blue-600 text-white text-[10px] px-1 py-0.5 rounded">{post.likes} Likes</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <Button className="ml-4 bg-blue-600 text-white hover:bg-blue-700">View Profile</Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 