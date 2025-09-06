"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const riskData = [
  { month: "Jan", high: 45, medium: 78, low: 234 },
  { month: "Feb", high: 52, medium: 82, low: 245 },
  { month: "Mar", high: 38, medium: 75, low: 267 },
  { month: "Apr", high: 41, medium: 88, low: 289 },
  { month: "May", high: 35, medium: 92, low: 312 },
  { month: "Jun", high: 32, medium: 84, low: 334 },
]

const pieData = [
  { name: "Low Risk", value: 2436, color: "#10b981" },
  { name: "Medium Risk", value: 284, color: "#f59e0b" },
  { name: "High Risk", value: 127, color: "#ef4444" },
]

export function RiskAnalytics() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Risk Trends Over Time</CardTitle>
          <CardDescription className="text-slate-400">Monthly breakdown of student risk levels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="high" stackId="a" fill="#ef4444" name="High Risk" />
              <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium Risk" />
              <Bar dataKey="low" stackId="a" fill="#10b981" name="Low Risk" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Current Risk Distribution</CardTitle>
          <CardDescription className="text-slate-400">Overall student population by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
