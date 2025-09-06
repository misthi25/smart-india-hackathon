import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, User } from "lucide-react"

const alerts = [
  {
    id: 1,
    student: "Sarah Johnson",
    type: "Attendance",
    severity: "high",
    message: "Missed 8 consecutive classes",
    time: "2 hours ago",
  },
  {
    id: 2,
    student: "Mike Chen",
    type: "Performance",
    severity: "medium",
    message: "Declining test scores",
    time: "4 hours ago",
  },
  {
    id: 3,
    student: "Emma Davis",
    type: "Financial",
    severity: "high",
    message: "Fee payment overdue",
    time: "6 hours ago",
  },
  {
    id: 4,
    student: "Alex Rodriguez",
    type: "Engagement",
    severity: "medium",
    message: "Low participation rate",
    time: "1 day ago",
  },
]

export function RecentAlerts() {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Recent Alerts
        </CardTitle>
        <CardDescription className="text-slate-400">Latest student risk notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-white font-medium">{alert.student}</span>
              </div>
              <Badge
                variant={alert.severity === "high" ? "destructive" : "secondary"}
                className={
                  alert.severity === "high" ? "bg-red-900/50 text-red-300" : "bg-yellow-900/50 text-yellow-300"
                }
              >
                {alert.type}
              </Badge>
            </div>
            <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {alert.time}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}

        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
