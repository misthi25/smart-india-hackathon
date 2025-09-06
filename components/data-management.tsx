"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Download, Plus, Trash2, Users, FileSpreadsheet } from "lucide-react"

export function DataManagement() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@college.edu", department: "Computer Science", year: 3 },
    { id: 2, name: "Jane Smith", email: "jane@college.edu", department: "Mathematics", year: 2 },
    { id: 3, name: "Mike Johnson", email: "mike@college.edu", department: "Physics", year: 4 },
  ])

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  })

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([
        ...students,
        {
          id: Date.now(),
          ...newStudent,
          year: Number.parseInt(newStudent.year) || 1,
        },
      ])
      setNewStudent({ name: "", email: "", department: "", year: "" })
    }
  }

  const handleRemoveStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate CSV processing
      console.log("[v0] Processing CSV file:", file.name)
      // In real implementation, parse CSV and add students
    }
  }

  const handleCSVDownload = () => {
    const csvContent = [
      "Name,Email,Department,Year",
      ...students.map((s) => `${s.name},${s.email},${s.department},${s.year}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "students_data.csv"
    a.click()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Data Management</h1>
          <p className="text-cyan-400 mt-2">Manage student data and AI training datasets</p>
        </div>
        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black">
          <Users className="w-4 h-4 mr-2" />
          {students.length} Students
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Plus className="w-5 h-5 mr-2 text-cyan-400" />
              Add Individual Student
            </CardTitle>
            <CardDescription className="text-gray-400">
              Add new students to the system for AI risk analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                  placeholder="Enter student name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                  placeholder="student@college.edu"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department" className="text-gray-300">
                  Department
                </Label>
                <Input
                  id="department"
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <Label htmlFor="year" className="text-gray-300">
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={newStudent.year}
                  onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                  className="bg-gray-900/50 border-gray-700 text-white"
                  placeholder="1-4"
                />
              </div>
            </div>
            <Button
              onClick={handleAddStudent}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2 text-cyan-400" />
              Bulk Data Management
            </CardTitle>
            <CardDescription className="text-gray-400">
              Import/export student data via CSV for AI model training
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="csv-upload" className="text-gray-300">
                  Upload CSV File
                </Label>
                <div className="mt-2">
                  <Input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="bg-gray-900/50 border-gray-700 text-white file:bg-cyan-500 file:text-black file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  CSV format: Name, Email, Department, Year, Attendance, GPA, etc.
                </p>
              </div>

              <Button
                onClick={handleCSVDownload}
                variant="outline"
                className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Current Data as CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-white">Current Students</CardTitle>
          <CardDescription className="text-gray-400">
            Manage existing student records in the AI training dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{student.name}</h3>
                  <p className="text-sm text-gray-400">{student.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                      {student.department}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Year {student.year}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => handleRemoveStudent(student.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
