"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingDown, TrendingUp, Minus } from "lucide-react"

interface RiskFactorsProps {
  studentId: string
}

export function RiskFactors({ studentId }: RiskFactorsProps) {
  const riskFactors = [
    {
      category: "Academic Performance",
      score: 85,
      trend: "down",
      factors: [
        { name: "GPA Below 2.5", impact: "High", value: "2.1 GPA" },
        { name: "Failed Courses", impact: "Medium", value: "2 courses" },
        { name: "Late Assignments", impact: "Medium", value: "15 submissions" },
      ],
    },
    {
      category: "Attendance & Engagement",
      score: 75,
      trend: "down",
      factors: [
        { name: "Class Attendance", impact: "High", value: "65%" },
        { name: "Lab Participation", impact: "Medium", value: "45%" },
        { name: "Online Activity", impact: "Low", value: "Minimal" },
      ],
    },
    {
      category: "Financial Status",
      score: 60,
      trend: "stable",
      factors: [
        { name: "Fee Payment Delays", impact: "High", value: "3 instances" },
        { name: "Financial Aid Status", impact: "Medium", value: "Pending" },
        { name: "Work-Study Hours", impact: "Low", value: "20 hrs/week" },
      ],
    },
    {
      category: "Social & Personal",
      score: 40,
      trend: "up",
      factors: [
        { name: "Counseling Sessions", impact: "Medium", value: "2 attended" },
        { name: "Peer Interactions", impact: "Low", value: "Limited" },
        { name: "Extracurricular", impact: "Low", value: "None" },
      ],
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-400" />
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-900/50 text-red-300"
      case "Medium":
        return "bg-yellow-900/50 text-yellow-300"
      case "Low":
        return "bg-green-900/50 text-green-300"
      default:
        return "bg-gray-900/50 text-gray-300"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Risk Factor Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {riskFactors.map((category, index) => (
          <div key={index} className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-white font-semibold">{category.category}</h3>
                {getTrendIcon(category.trend)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-300 text-sm">Risk Score:</span>
                <span className="text-red-400 font-bold">{category.score}%</span>
              </div>
            </div>

            <Progress value={category.score} className="mb-4 h-2" />

            <div className="space-y-3">
              {category.factors.map((factor, factorIndex) => (
                <div key={factorIndex} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                  <div className="flex items-center gap-3">
                    <Badge className={getImpactColor(factor.impact)}>{factor.impact}</Badge>
                    <span className="text-slate-300">{factor.name}</span>
                  </div>
                  <span className="text-white font-medium">{factor.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
