"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Phone, Mail, Calendar, Users, FileText } from "lucide-react"

interface InterventionActionsProps {
  studentId: string
}

export function InterventionActions({ studentId }: InterventionActionsProps) {
  const interventions = [
    {
      type: "immediate",
      title: "Schedule Counseling Session",
      description: "Arrange one-on-one meeting with academic counselor",
      icon: Calendar,
      priority: "high",
    },
    {
      type: "communication",
      title: "Contact Student",
      description: "Send email or make phone call to discuss concerns",
      icon: Phone,
      priority: "high",
    },
    {
      type: "academic",
      title: "Tutoring Referral",
      description: "Connect with peer tutoring or academic support services",
      icon: Users,
      priority: "medium",
    },
    {
      type: "financial",
      title: "Financial Aid Review",
      description: "Review financial aid status and payment options",
      icon: FileText,
      priority: "medium",
    },
    {
      type: "family",
      title: "Guardian Notification",
      description: "Notify parents/guardians about academic concerns",
      icon: Mail,
      priority: "low",
    },
    {
      type: "peer",
      title: "Peer Support Group",
      description: "Enroll in student support group or mentorship program",
      icon: MessageSquare,
      priority: "low",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-900/50 text-red-300 border-red-800"
      case "medium":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-800"
      case "low":
        return "bg-green-900/50 text-green-300 border-green-800"
      default:
        return "bg-gray-900/50 text-gray-300 border-gray-800"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          Intervention Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {interventions.map((intervention, index) => (
          <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <intervention.icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{intervention.title}</h4>
                  <Badge className={getPriorityColor(intervention.priority)}>{intervention.priority}</Badge>
                </div>
                <p className="text-slate-300 text-sm mb-3">{intervention.description}</p>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  Execute Action
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-slate-700">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
            Create Custom Intervention Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
