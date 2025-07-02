"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HelpCircle, Bell, LogOut, ChevronUp, ChevronDown } from "lucide-react"
import React from "react"

interface HeaderProps {
  collapsible?: boolean
  visible?: boolean
  onToggle?: () => void
}

export function Header({ collapsible = false, visible = true, onToggle }: HeaderProps) {
  // Header height (px)
  const headerHeight = 64
  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
        visible ? 'h-16' : 'h-6'
      }`}
      style={{ background: '#155fa0', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      <div className={`flex items-center justify-between px-8 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`} style={{ height: visible ? headerHeight : 0 }}>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">{">"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-white font-medium">Welcome Back, John Doe 👋</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white">
            <HelpCircle className="w-5 h-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell className="w-5 h-5 text-white" />
          </Button>
          <Button variant="ghost" className="text-white gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">J</span>
          </div>
        </div>
      </div>
      {collapsible && (
        <Button
          onClick={onToggle}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1.5 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors z-40 text-white"
          aria-label={visible ? 'Collapse header' : 'Expand header'}
        >
          {visible ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      )}
    </header>
  )
}
