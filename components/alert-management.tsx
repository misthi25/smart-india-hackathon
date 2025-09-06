"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Clock, User, CheckCircle, XCircle, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AlertManagement() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [actionNote, setActionNote] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const { toast } = useToast()

  const alerts = [
    {
      id: 1,
      studentId: "STU001",
      studentName: "Sarah Johnson",
      type: "Attendance",
      severity: "high",
      message: "Missed 8 consecutive classes in CS301",
      timestamp: "2024-01-15 09:30",
      status: "pending",
      department: "Computer Science",
    },
    {
      id: 2,
      studentId: "STU002",
      studentName: "Mike Chen",
      type: "Performance",
      severity: "high",
      message: "Failed midterm exam - score below 40%",
      timestamp: "2024-01-12 14:20",
      status: "in-progress",
      department: "Engineering",
    },
    {
      id: 3,
      studentId: "STU003",
      studentName: "Emma Davis",
      type: "Financial",
      severity: "medium",
      message: "Fee payment overdue by 15 days",
      timestamp: "2024-01-10 11:15",
      status: "pending",
      department: "Business",
    },
    {
      id: 4,
      studentId: "STU004",
      studentName: "Alex Rodriguez",
      type: "Engagement",
      severity: "medium",
      message: "No participation in online discussions",
      timestamp: "2024-01-08 16:45",
      status: "resolved",
      department: "Mathematics",
    },
  ]

  const filteredAlerts = filterSeverity === "all" ? alerts : alerts.filter((alert) => alert.severity === filterSeverity)

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
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "in-progress":
        return <MessageSquare className="w-4 h-4 text-blue-400" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const handleTakeAction = (alert: any) => {
    setSelectedAlert(alert)
  }

  const handleSubmitAction = () => {
    if (!actionNote.trim()) {
      toast({
        title: "Action Note Required",
        description: "Please provide details about the action taken.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Action Recorded",
      description: `Intervention action recorded for ${selectedAlert.studentName}`,
    })

    setSelectedAlert(null)
    setActionNote("")
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Alert Management
          </CardTitle>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-white">
                All Alerts
              </SelectItem>
              <SelectItem value="high" className="text-white">
                High Priority
              </SelectItem>
              <SelectItem value="medium" className="text-white">
                Medium Priority
              </SelectItem>
              <SelectItem value="low" className="text-white">
                Low Priority
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getStatusIcon(alert.status)}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-white font-medium">{alert.studentName}</span>
                    <span className="text-slate-400 text-sm">({alert.studentId})</span>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.type} - {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.timestamp}
              </div>
            </div>

            <p className="text-slate-300 mb-3">{alert.message}</p>
            <p className="text-slate-400 text-sm mb-3">Department: {alert.department}</p>

            <div className="flex items-center justify-between">
              <Badge variant={alert.status === "resolved" ? "secondary" : "destructive"}>
                {alert.status.toUpperCase()}
              </Badge>
              {alert.status !== "resolved" && (
                <Button
                  size="sm"
                  onClick={() => handleTakeAction(alert)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  Take Action
                </Button>
              )}
            </div>
          </div>
        ))}

        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Record Intervention Action</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-300 text-sm">Student: {selectedAlert.studentName}</p>
                  <p className="text-slate-400 text-sm">Alert: {selectedAlert.message}</p>
                </div>
                <Textarea
                  placeholder="Describe the action taken or intervention planned..."
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmitAction}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    Record Action
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAlert(null)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
