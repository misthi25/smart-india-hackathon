"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, TrendingDown, User, Clock } from "lucide-react"

export function RiskTransitions() {
  const recentTransitions = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "STU001",
      fromLevel: "medium",
      toLevel: "high",
      reason: "Failed midterm + 3 consecutive absences",
      timestamp: "2024-01-15 14:30",
      alertCount: 8,
      autoTriggered: true,
    },
    {
      id: 2,
      studentName: "Mike Chen",
      studentId: "STU002",
      fromLevel: "high",
      toLevel: "medium",
      reason: "Improved attendance after intervention",
      timestamp: "2024-01-15 11:20",
      alertCount: 5,
      autoTriggered: false,
    },
    {
      id: 3,
      studentName: "Emma Davis",
      studentId: "STU003",
      fromLevel: "low",
      toLevel: "medium",
      reason: "Payment delays + declining GPA",
      timestamp: "2024-01-14 16:45",
      alertCount: 6,
      autoTriggered: true,
    },
    {
      id: 4,
      studentName: "Alex Rodriguez",
      studentId: "STU004",
      fromLevel: "medium",
      toLevel: "low",
      reason: "Consistent improvement in all metrics",
      timestamp: "2024-01-14 09:15",
      alertCount: 2,
      autoTriggered: false,
    },
    {
      id: 5,
      studentName: "Lisa Wang",
      studentId: "STU005",
      fromLevel: "no",
      toLevel: "low",
      reason: "First attendance warning triggered",
      timestamp: "2024-01-13 13:30",
      alertCount: 3,
      autoTriggered: true,
    },
  ]

  const transitionStats = [
    { label: "Escalations Today", value: "12", trend: "up", color: "text-red-400" },
    { label: "De-escalations Today", value: "8", trend: "down", color: "text-green-400" },
    { label: "Auto-triggered", value: "15", trend: "neutral", color: "text-blue-400" },
    { label: "Manual Reviews", value: "5", trend: "neutral", color: "text-yellow-400" },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "no":
        return "bg-gray-900/50 text-gray-300 border-gray-800"
      case "low":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-800"
      case "medium":
        return "bg-orange-900/50 text-orange-300 border-orange-800"
      case "high":
        return "bg-red-900/50 text-red-300 border-red-800"
      default:
        return "bg-gray-900/50 text-gray-300 border-gray-800"
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case "no":
        return "No Risk"
      case "low":
        return "Low Risk"
      case "medium":
        return "Medium Risk"
      case "high":
        return "High Risk"
      default:
        return "Unknown"
    }
  }

  const getTrendIcon = (from: string, to: string) => {
    const levels = { no: 0, low: 1, medium: 2, high: 3 }
    const fromLevel = levels[from as keyof typeof levels]
    const toLevel = levels[to as keyof typeof levels]

    if (toLevel > fromLevel) {
      return <TrendingUp className="w-4 h-4 text-red-400" />
    } else {
      return <TrendingDown className="w-4 h-4 text-green-400" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-purple-400" />
            Risk Level Transitions
          </CardTitle>
          <div className="grid grid-cols-4 gap-4">
            {transitionStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {recentTransitions.map((transition) => (
            <div key={transition.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-white font-medium">{transition.studentName}</div>
                    <div className="text-slate-400 text-sm">{transition.studentId}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  {transition.timestamp}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <Badge className={getRiskColor(transition.fromLevel)}>{getRiskLabel(transition.fromLevel)}</Badge>
                {getTrendIcon(transition.fromLevel, transition.toLevel)}
                <Badge className={getRiskColor(transition.toLevel)}>{getRiskLabel(transition.toLevel)}</Badge>
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant={transition.autoTriggered ? "destructive" : "secondary"}>
                    {transition.autoTriggered ? "Auto" : "Manual"}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {transition.alertCount} alerts
                  </Badge>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-md p-3 mb-3">
                <span className="text-xs text-slate-400">Reason: </span>
                <span className="text-slate-300 text-sm">{transition.reason}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  Review Case
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Transition Rules Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="text-slate-300 font-medium mb-2">Escalation Triggers:</h5>
              <ul className="space-y-1 text-slate-400">
                <li>• 3+ alerts → Low Risk</li>
                <li>• 6+ alerts → Medium Risk</li>
                <li>• 9+ alerts → High Risk</li>
                <li>• Critical events → Immediate escalation</li>
              </ul>
            </div>
            <div>
              <h5 className="text-slate-300 font-medium mb-2">De-escalation Criteria:</h5>
              <ul className="space-y-1 text-slate-400">
                <li>• Sustained improvement (30 days)</li>
                <li>• Alert count reduction</li>
                <li>• Successful intervention completion</li>
                <li>• Manual counselor review</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
