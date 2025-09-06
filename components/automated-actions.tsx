"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bot, Mail, Phone, Calendar, Users, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function AutomatedActions() {
  const [automationSettings, setAutomationSettings] = useState({
    emailNotifications: true,
    smsAlerts: true,
    parentNotifications: true,
    counselorAssignment: true,
    interventionScheduling: false,
    reportGeneration: true,
  })

  const automatedActions = [
    {
      id: 1,
      trigger: "Student escalated to High Risk",
      student: "Sarah Johnson (STU001)",
      actions: [
        { type: "email", target: "Academic Counselor", status: "sent", time: "14:30" },
        { type: "sms", target: "Student", status: "delivered", time: "14:31" },
        { type: "email", target: "Parent/Guardian", status: "sent", time: "14:32" },
        { type: "schedule", target: "Emergency Meeting", status: "scheduled", time: "14:35" },
      ],
      timestamp: "2024-01-15 14:30",
    },
    {
      id: 2,
      trigger: "Payment overdue threshold reached",
      student: "Emma Davis (STU003)",
      actions: [
        { type: "email", target: "Financial Aid Office", status: "sent", time: "11:15" },
        { type: "email", target: "Student", status: "sent", time: "11:16" },
        { type: "report", target: "Risk Assessment", status: "generated", time: "11:20" },
      ],
      timestamp: "2024-01-15 11:15",
    },
    {
      id: 3,
      trigger: "Attendance below 70% for 5 days",
      student: "Mike Chen (STU002)",
      actions: [
        { type: "sms", target: "Student", status: "delivered", time: "09:00" },
        { type: "email", target: "Department Head", status: "sent", time: "09:05" },
        { type: "schedule", target: "Check-in Meeting", status: "scheduled", time: "09:10" },
      ],
      timestamp: "2024-01-15 09:00",
    },
  ]

  const getActionIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4 text-blue-400" />
      case "sms":
        return <Phone className="w-4 h-4 text-green-400" />
      case "schedule":
        return <Calendar className="w-4 h-4 text-purple-400" />
      case "report":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default:
        return <Bot className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-900/50 text-green-300"
      case "delivered":
        return "bg-green-900/50 text-green-300"
      case "scheduled":
        return "bg-blue-900/50 text-blue-300"
      case "generated":
        return "bg-purple-900/50 text-purple-300"
      case "failed":
        return "bg-red-900/50 text-red-300"
      default:
        return "bg-gray-900/50 text-gray-300"
    }
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setAutomationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-green-400" />
          Automated Actions & Responses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-4">Automation Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Email Notifications</Label>
              <Switch
                checked={automationSettings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">SMS Alerts</Label>
              <Switch
                checked={automationSettings.smsAlerts}
                onCheckedChange={(checked) => handleSettingChange("smsAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Parent Notifications</Label>
              <Switch
                checked={automationSettings.parentNotifications}
                onCheckedChange={(checked) => handleSettingChange("parentNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Auto Counselor Assignment</Label>
              <Switch
                checked={automationSettings.counselorAssignment}
                onCheckedChange={(checked) => handleSettingChange("counselorAssignment", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Auto Intervention Scheduling</Label>
              <Switch
                checked={automationSettings.interventionScheduling}
                onCheckedChange={(checked) => handleSettingChange("interventionScheduling", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Auto Report Generation</Label>
              <Switch
                checked={automationSettings.reportGeneration}
                onCheckedChange={(checked) => handleSettingChange("reportGeneration", checked)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-medium">Recent Automated Actions</h4>
          {automatedActions.map((action) => (
            <div key={action.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">{action.trigger}</div>
                    <div className="text-slate-400 text-sm">{action.student}</div>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">{action.timestamp}</div>
              </div>

              <div className="space-y-2">
                <h5 className="text-slate-300 font-medium text-sm">Actions Executed:</h5>
                {action.actions.map((actionItem, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                    <div className="flex items-center gap-3">
                      {getActionIcon(actionItem.type)}
                      <span className="text-slate-300 text-sm">{actionItem.target}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(actionItem.status)}>{actionItem.status}</Badge>
                      <span className="text-slate-400 text-xs">{actionItem.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  View Log
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  Review Actions
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            System Performance
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">98.5%</div>
              <div className="text-slate-400 text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">2.3s</div>
              <div className="text-slate-400 text-sm">Avg Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">247</div>
              <div className="text-slate-400 text-sm">Actions Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">12</div>
              <div className="text-slate-400 text-sm">Interventions Triggered</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
