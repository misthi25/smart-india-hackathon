"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, AlertTriangle } from "lucide-react"

export function RiskLevelMatrix() {
  const riskLevels = [
    {
      level: "No Risk",
      range: "0-25 points",
      color: "bg-green-500",
      textColor: "text-green-300",
      bgColor: "bg-green-900/20",
      count: 2436,
      percentage: 85.6,
      criteria: ["GPA > 3.0", "Attendance > 90%", "No financial issues", "Active engagement"],
      actions: ["Regular monitoring", "Positive reinforcement"],
    },
    {
      level: "Low Risk",
      range: "26-50 points",
      color: "bg-yellow-500",
      textColor: "text-yellow-300",
      bgColor: "bg-yellow-900/20",
      count: 284,
      percentage: 10.0,
      criteria: ["GPA 2.5-3.0", "Attendance 80-90%", "Minor financial delays", "Moderate engagement"],
      actions: ["Monthly check-ins", "Academic support offers"],
    },
    {
      level: "Medium Risk",
      range: "51-75 points",
      color: "bg-orange-500",
      textColor: "text-orange-300",
      bgColor: "bg-orange-900/20",
      count: 127,
      percentage: 4.5,
      criteria: ["GPA 2.0-2.5", "Attendance 70-80%", "Payment issues", "Low engagement"],
      actions: ["Bi-weekly meetings", "Intervention planning", "Parent contact"],
    },
    {
      level: "High Risk",
      range: "76-100 points",
      color: "bg-red-500",
      textColor: "text-red-300",
      bgColor: "bg-red-900/20",
      count: 47,
      percentage: 1.7,
      criteria: ["GPA < 2.0", "Attendance < 70%", "Serious financial issues", "No engagement"],
      actions: ["Daily monitoring", "Immediate intervention", "Emergency support"],
    },
  ]

  const alertThresholds = [
    { alerts: "1-2", action: "Monitor", level: "No Risk → Low Risk" },
    { alerts: "3-5", action: "Intervene", level: "Low Risk → Medium Risk" },
    { alerts: "6-8", action: "Escalate", level: "Medium Risk → High Risk" },
    { alerts: "9+", action: "Emergency", level: "Critical Intervention" },
  ]

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Risk Level Matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {riskLevels.map((level, index) => (
            <div key={index} className={`p-4 rounded-lg border ${level.bgColor} border-slate-600/50`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                  <div>
                    <h4 className={`font-semibold ${level.textColor}`}>{level.level}</h4>
                    <p className="text-slate-400 text-sm">{level.range}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-white font-bold">{level.count}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{level.percentage}%</p>
                </div>
              </div>

              <div className="mb-3">
                <Progress value={level.percentage} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="text-slate-300 font-medium mb-2">Criteria:</h5>
                  <ul className="space-y-1">
                    {level.criteria.map((criterion, idx) => (
                      <li key={idx} className="text-slate-400 flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-slate-300 font-medium mb-2">Actions:</h5>
                  <ul className="space-y-1">
                    {level.actions.map((action, idx) => (
                      <li key={idx} className="text-slate-400 flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Alert-Based Escalation Thresholds
          </h4>
          <div className="space-y-2">
            {alertThresholds.map((threshold, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {threshold.alerts} Alerts
                  </Badge>
                  <span className="text-slate-300 text-sm">{threshold.action}</span>
                </div>
                <span className="text-slate-400 text-sm">{threshold.level}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
