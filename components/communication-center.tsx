"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Mail, Phone, Send, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CommunicationCenter() {
  const [messageType, setMessageType] = useState("")
  const [recipient, setRecipient] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const recentCommunications = [
    {
      id: 1,
      type: "email",
      recipient: "Sarah Johnson",
      subject: "Academic Support Meeting",
      timestamp: "2024-01-15 14:30",
      status: "sent",
    },
    {
      id: 2,
      type: "phone",
      recipient: "Mike Chen's Parent",
      subject: "Progress Update Call",
      timestamp: "2024-01-15 11:00",
      status: "completed",
    },
    {
      id: 3,
      type: "sms",
      recipient: "Emma Davis",
      subject: "Appointment Reminder",
      timestamp: "2024-01-14 16:45",
      status: "delivered",
    },
  ]

  const recipients = [
    { value: "STU001", label: "Sarah Johnson (Student)" },
    { value: "STU001_PARENT", label: "Sarah Johnson (Parent)" },
    { value: "STU002", label: "Mike Chen (Student)" },
    { value: "STU002_PARENT", label: "Mike Chen (Parent)" },
    { value: "STU003", label: "Emma Davis (Student)" },
    { value: "STU003_PARENT", label: "Emma Davis (Parent)" },
  ]

  const messageTypes = [
    { value: "email", label: "Email", icon: Mail },
    { value: "sms", label: "SMS", icon: MessageSquare },
    { value: "phone", label: "Phone Call", icon: Phone },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4 text-blue-400" />
      case "phone":
        return <Phone className="w-4 h-4 text-green-400" />
      case "sms":
        return <MessageSquare className="w-4 h-4 text-purple-400" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-900/50 text-blue-300"
      case "delivered":
        return "bg-green-900/50 text-green-300"
      case "completed":
        return "bg-green-900/50 text-green-300"
      case "failed":
        return "bg-red-900/50 text-red-300"
      default:
        return "bg-gray-900/50 text-gray-300"
    }
  }

  const handleSendMessage = () => {
    if (!messageType || !recipient || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Message Sent",
      description: `${messageType.toUpperCase()} sent successfully.`,
    })

    // Reset form
    setMessageType("")
    setRecipient("")
    setMessage("")
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          Communication Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-white font-medium">Send Message</h4>

          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Message Type</label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {messageTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-white">
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Recipient</label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Select recipient..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {recipients.map((rec) => (
                  <SelectItem key={rec.value} value={rec.value} className="text-white">
                    {rec.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              rows={4}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-medium">Recent Communications</h4>
          {recentCommunications.map((comm) => (
            <div key={comm.id} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(comm.type)}
                  <div>
                    <div className="text-white text-sm font-medium">{comm.subject}</div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <User className="w-3 h-3" />
                      {comm.recipient}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(comm.status)}>{comm.status}</Badge>
              </div>
              <div className="text-slate-400 text-xs">{comm.timestamp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
