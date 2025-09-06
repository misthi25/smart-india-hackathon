"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, LogOut, Shield, MessageSquare, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const handleCounsellingPage = () => {
    router.push("/counselling")
  }

  const handleRiskManagement = () => {
    router.push("/risk-management")
  }

  return (
    <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Student Analytics</h1>
                <p className="text-sm text-slate-400">AI-Powered Drop-out Prevention</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                className="pl-10 w-64 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRiskManagement}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <TrendingUp className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleCounsellingPage}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700/50">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700/50">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="text-white font-medium">Admin User</p>
                <p className="text-slate-400">College Administrator</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
