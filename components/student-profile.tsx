"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { PDFReportGenerator } from "@/components/pdf-report-generator"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

interface StudentProfileProps {
  studentId: string
}

export function StudentProfile({ studentId }: StudentProfileProps) {
  const router = useRouter()

  // Mock student data - in real app, fetch based on studentId
  const student = {
    id: "STU001",
    name: "Sarah Johnson",
    email: "sarah.j@college.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Drive, College Town, CT 06511",
    department: "Computer Science",
    year: "3rd Year",
    enrollmentDate: "September 2022",
    riskLevel: "high",
    riskScore: 85,
    gpa: 2.1,
    attendance: 65,
    creditsCompleted: 78,
    totalCredits: 120,
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const getRiskColor = (level: string) => {
    switch (level) {
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
    <div className="space-y-8">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/dashboard")}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-white">Student Profile</CardTitle>
            </div>
            <Badge className={getRiskColor(student.riskLevel)}>{student.riskLevel.toUpperCase()} RISK</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={student.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{student.name}</h2>
                <p className="text-slate-400">{student.id}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {student.phone}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {student.address}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Enrolled: {student.enrollmentDate}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">Department</span>
              </div>
              <p className="text-white font-semibold">{student.department}</p>
              <p className="text-slate-400 text-sm">{student.year}</p>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-slate-300 text-sm mb-2">Risk Score</div>
              <div className="text-2xl font-bold text-red-400">{student.riskScore}%</div>
              <Progress value={student.riskScore} className="mt-2 h-2" />
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-slate-300 text-sm mb-2">Current GPA</div>
              <div className="text-2xl font-bold text-yellow-400">{student.gpa}</div>
              <p className="text-slate-400 text-sm">Below threshold</p>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="text-slate-300 text-sm mb-2">Attendance</div>
              <div className="text-2xl font-bold text-red-400">{student.attendance}%</div>
              <Progress value={student.attendance} className="mt-2 h-2" />
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="text-slate-300 text-sm mb-2">Academic Progress</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">
                {student.creditsCompleted} / {student.totalCredits} Credits
              </span>
              <span className="text-slate-400">
                {Math.round((student.creditsCompleted / student.totalCredits) * 100)}%
              </span>
            </div>
            <Progress value={(student.creditsCompleted / student.totalCredits) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <PDFReportGenerator studentId={student.id} studentName={student.name} />
    </div>
  )
}
