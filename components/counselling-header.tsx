"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageSquare, AlertTriangle, Calendar, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function CounsellingHeader() {
  const router = useRouter()

  const stats = [
    { label: "Active Alerts", value: "47", color: "text-red-400", icon: AlertTriangle },
    { label: "Scheduled Sessions", value: "12", color: "text-blue-400", icon: Calendar },
    { label: "Students at Risk", value: "127", color: "text-yellow-400", icon: Users },
    { label: "Interventions", value: "23", color: "text-green-400", icon: MessageSquare },
  ]

  return (
    <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Counselling & Alert Management</h1>
              <p className="text-slate-400">Comprehensive intervention and support system</p>
            </div>
          </div>

          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2">
            Real-time Monitoring Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
