"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function InterventionTracker() {
  const interventions = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "STU001",
      type: "Academic Support",
      startDate: "2024-01-10",
      status: "active",
      progress: 65,
      actions: [
        { action: "Tutoring sessions scheduled", date: "2024-01-10", completed: true },
        { action: "Study plan created", date: "2024-01-12", completed: true },
        { action: "Weekly check-ins", date: "2024-01-15", completed: false },
        { action: "Parent meeting", date: "2024-01-18", completed: false },
      ],
      outcome: "Attendance improved to 75%",
    },
    {
      id: 2,
      studentName: "Mike Chen",
      studentId: "STU002",
      type: "Financial Assistance",
      startDate: "2024-01-08",
      status: "completed",
      progress: 100,
      actions: [
        { action: "Financial aid review", date: "2024-01-08", completed: true },
        { action: "Payment plan arranged", date: "2024-01-10", completed: true },
        { action: "Emergency fund application", date: "2024-01-12", completed: true },
      ],
      outcome: "Payment plan established, fees current",
    },
    {
      id: 3,
      studentName: "Emma Davis",
      studentId: "STU003",
      type: "Behavioral Intervention",
      startDate: "2024-01-05",
      status: "active",
      progress: 40,
      actions: [
        { action: "Counseling sessions", date: "2024-01-05", completed: true },
        { action: "Peer support group", date: "2024-01-08", completed: true },
        { action: "Academic accommodation", date: "2024-01-15", completed: false },
        { action: "Follow-up assessment", date: "2024-01-20", completed: false },
      ],
      outcome: "Engagement levels improving",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-900/50 text-blue-300 border-blue-800"
      case "completed":
        return "bg-green-900/50 text-green-300 border-green-800"
      case "paused":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-800"
      default:
        return "bg-gray-900/50 text-gray-300 border-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="w-4 h-4 text-blue-400" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "paused":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Intervention Tracker
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-slate-400">Active: 2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-slate-400">Completed: 1</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {interventions.map((intervention) => (
          <div key={intervention.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(intervention.status)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-white font-medium">{intervention.studentName}</span>
                    <span className="text-slate-400 text-sm">({intervention.studentId})</span>
                  </div>
                  <Badge className={getStatusColor(intervention.status)}>{intervention.type}</Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-sm">Started: {intervention.startDate}</div>
                <div className="text-slate-300 text-sm">Progress: {intervention.progress}%</div>
              </div>
            </div>

            <div className="mb-4">
              <Progress value={intervention.progress} className="h-2" />
            </div>

            <div className="space-y-2 mb-4">
              <h5 className="text-slate-300 font-medium text-sm">Action Items:</h5>
              {intervention.actions.map((action, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  {action.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-400" />
                  )}
                  <span className={action.completed ? "text-slate-300 line-through" : "text-white"}>
                    {action.action}
                  </span>
                  <span className="text-slate-400 text-xs">({action.date})</span>
                </div>
              ))}
            </div>

            {intervention.outcome && (
              <div className="bg-slate-800/50 rounded-md p-3 mb-3">
                <span className="text-xs text-slate-400">Current Outcome: </span>
                <span className="text-green-400 text-sm">{intervention.outcome}</span>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                Update Progress
              </Button>
              {intervention.status === "active" && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  Add Action
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
