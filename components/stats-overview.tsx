import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertTriangle, TrendingUp, GraduationCap } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "High Risk",
      value: "127",
      change: "-8%",
      changeType: "negative" as const,
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Medium Risk",
      value: "284",
      change: "+3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Low Risk",
      value: "2,436",
      change: "+15%",
      changeType: "positive" as const,
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
            <div
              className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}
            >
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className={`text-xs ${stat.changeType === "positive" ? "text-green-400" : "text-red-400"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
