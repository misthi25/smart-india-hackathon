"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Database,
  MessageSquare,
  AlertTriangle,
  Settings,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Students", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "data", label: "Data Management", icon: Database },
  { id: "counselling", label: "Counselling", icon: MessageSquare },
  { id: "risk", label: "Risk Management", icon: AlertTriangle },
]

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-cyan-500/20 z-50">
      <div className="p-6 border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">EduPredict</h1>
            <p className="text-xs text-cyan-400">AI Analytics</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                activeSection === item.id
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  activeSection === item.id ? "text-cyan-400" : "text-gray-500 group-hover:text-white",
                )}
              />
              <span className="font-medium">{item.label}</span>
              {activeSection === item.id && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />}
            </button>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyan-500/20">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-2">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
