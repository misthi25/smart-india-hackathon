"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Plus, Video, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CounsellingScheduler() {
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [sessionType, setSessionType] = useState("")
  const [sessionDate, setSessionDate] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const { toast } = useToast()

  const upcomingSessions = [
    {
      id: 1,
      studentName: "Sarah Johnson",
      studentId: "STU001",
      date: "2024-01-16",
      time: "10:00 AM",
      type: "Academic Support",
      mode: "In-Person",
      location: "Counseling Office 201",
      priority: "high",
    },
    {
      id: 2,
      studentName: "Mike Chen",
      studentId: "STU002",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "Career Guidance",
      mode: "Virtual",
      location: "Zoom Meeting",
      priority: "medium",
    },
    {
      id: 3,
      studentName: "Emma Davis",
      studentId: "STU003",
      date: "2024-01-17",
      time: "11:30 AM",
      type: "Financial Counseling",
      mode: "In-Person",
      location: "Financial Aid Office",
      priority: "high",
    },
  ]

  const students = [
    { id: "STU001", name: "Sarah Johnson" },
    { id: "STU002", name: "Mike Chen" },
    { id: "STU003", name: "Emma Davis" },
    { id: "STU004", name: "Alex Rodriguez" },
    { id: "STU005", name: "Lisa Wang" },
  ]

  const sessionTypes = [
    "Academic Support",
    "Career Guidance",
    "Financial Counseling",
    "Personal Counseling",
    "Intervention Meeting",
    "Follow-up Session",
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

  const handleScheduleSession = () => {
    if (!selectedStudent || !sessionType || !sessionDate || !sessionTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Session Scheduled",
      description: `Counseling session scheduled successfully.`,
    })

    // Reset form
    setSelectedStudent("")
    setSessionType("")
    setSessionDate("")
    setSessionTime("")
    setShowScheduleForm(false)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Counselling Scheduler
          </CardTitle>
          <Button
            onClick={() => setShowScheduleForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Schedule Session
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h4 className="text-white font-medium">Upcoming Sessions</h4>
          {upcomingSessions.map((session) => (
            <div key={session.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-white font-medium">{session.studentName}</div>
                    <div className="text-slate-400 text-sm">{session.studentId}</div>
                  </div>
                </div>
                <Badge className={getPriorityColor(session.priority)}>{session.priority.toUpperCase()}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {session.date}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {session.time}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  {session.mode === "Virtual" ? (
                    <Video className="w-3 h-3 text-slate-400" />
                  ) : (
                    <MapPin className="w-3 h-3 text-slate-400" />
                  )}
                  {session.location}
                </div>
                <div className="text-slate-300">Type: {session.type}</div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Reschedule
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  Start Session
                </Button>
              </div>
            </div>
          ))}
        </div>

        {showScheduleForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-white font-semibold mb-4">Schedule New Session</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Student</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select student..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id} className="text-white">
                          {student.name} ({student.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-2 block">Session Type</label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {sessionTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-sm font-medium mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={sessionDate}
                      onChange={(e) => setSessionDate(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm font-medium mb-2 block">Time</label>
                    <Input
                      type="time"
                      value={sessionTime}
                      onChange={(e) => setSessionTime(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleScheduleSession}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    Schedule
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowScheduleForm(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
