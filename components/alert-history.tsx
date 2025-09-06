"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react"

interface AlertHistoryProps {
  studentId: string
}

export function AlertHistory({ studentId }: AlertHistoryProps) {
  const alerts = [
    {
      id: 1,
      type: "Attendance",
      severity: "high",
      message: "Missed 8 consecutive classes in CS301",
      timestamp: "2024-01-15 09:30",
      status: "active",
      actionTaken: null,
    },
    {
      id: 2,
      type: "Performance",
      severity: "high",
      message: "Failed midterm exam - score below 40%",
      timestamp: "2024-01-12 14:20",
      status: "active",
      actionTaken: "Counselor notified",
    },
    {
      id: 3,
      type: "Financial",
      severity: "medium",
      message: "Fee payment overdue by 15 days",
      timestamp: "2024-01-10 11:15",
      status: "resolved",
      actionTaken: "Payment plan arranged",
    },
    {
      id: 4,
      type: "Engagement",
      severity: "medium",
      message: "No participation in online discussions",
      timestamp: "2024-01-08 16:45",
      status: "active",
      actionTaken: "Email sent to student",
    },
    {
      id: 5,
      type: "Attendance",
      severity: "low",
      message: "Attendance dropped below 80%",
      timestamp: "2024-01-05 10:00",
      status: "resolved",
      actionTaken: "Meeting scheduled",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-900/50 text-red-300 border-red-800"
      case "medium":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-800"
      case "low":
        return "bg-blue-900/50 text-blue-300 border-blue-800"
      default:
        return "bg-gray-900/50 text-gray-300 border-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Alert History
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-slate-400">Active: 3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-slate-400">Resolved: 2</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(alert.status)}
                <Badge className={getSeverityColor(alert.severity)}>{alert.type}</Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {alert.timestamp}
              </div>
            </div>

            <p className="text-slate-300 mb-3">{alert.message}</p>

            {alert.actionTaken && (
              <div className="bg-slate-800/50 rounded-md p-2 mb-3">
                <span className="text-xs text-slate-400">Action Taken: </span>
                <span className="text-green-400 text-xs">{alert.actionTaken}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>
                {alert.status.toUpperCase()}
              </Badge>
              {alert.status === "active" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Take Action
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
          View Full History
        </Button>
      </CardContent>
    </Card>
  )
}
