"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileText, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const students = [
  {
    id: "STU001",
    name: "Sarah Johnson",
    email: "sarah.j@college.edu",
    department: "Computer Science",
    year: "3rd Year",
    riskLevel: "high",
    attendance: "65%",
    gpa: "2.1",
    alerts: 8,
  },
  {
    id: "STU002",
    name: "Mike Chen",
    email: "mike.c@college.edu",
    department: "Engineering",
    year: "2nd Year",
    riskLevel: "medium",
    attendance: "78%",
    gpa: "2.8",
    alerts: 3,
  },
  {
    id: "STU003",
    name: "Emma Davis",
    email: "emma.d@college.edu",
    department: "Business",
    year: "4th Year",
    riskLevel: "high",
    attendance: "82%",
    gpa: "3.2",
    alerts: 5,
  },
  {
    id: "STU004",
    name: "Alex Rodriguez",
    email: "alex.r@college.edu",
    department: "Mathematics",
    year: "1st Year",
    riskLevel: "low",
    attendance: "92%",
    gpa: "3.7",
    alerts: 1,
  },
  {
    id: "STU005",
    name: "Lisa Wang",
    email: "lisa.w@college.edu",
    department: "Physics",
    year: "3rd Year",
    riskLevel: "medium",
    attendance: "85%",
    gpa: "3.1",
    alerts: 2,
  },
]

export function StudentTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge className="bg-red-900/50 text-red-300 border-red-800">High Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-800">Medium Risk</Badge>
      case "low":
        return <Badge className="bg-green-900/50 text-green-300 border-green-800">Low Risk</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleViewStudent = (studentId: string) => {
    router.push(`/student/${studentId}`)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Student Overview</CardTitle>
            <CardDescription className="text-slate-400">
              Comprehensive student risk assessment and monitoring
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-700/30">
              <TableHead className="text-slate-300">Student ID</TableHead>
              <TableHead className="text-slate-300">Name</TableHead>
              <TableHead className="text-slate-300">Department</TableHead>
              <TableHead className="text-slate-300">Year</TableHead>
              <TableHead className="text-slate-300">Risk Level</TableHead>
              <TableHead className="text-slate-300">Attendance</TableHead>
              <TableHead className="text-slate-300">GPA</TableHead>
              <TableHead className="text-slate-300">Alerts</TableHead>
              <TableHead className="text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell className="text-slate-300 font-mono">{student.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="text-white font-medium">{student.name}</div>
                    <div className="text-slate-400 text-sm">{student.email}</div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">{student.department}</TableCell>
                <TableCell className="text-slate-300">{student.year}</TableCell>
                <TableCell>{getRiskBadge(student.riskLevel)}</TableCell>
                <TableCell className="text-slate-300">{student.attendance}</TableCell>
                <TableCell className="text-slate-300">{student.gpa}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">{student.alerts}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Report
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleViewStudent(student.id)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
