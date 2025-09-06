"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function CounsellingInterface() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Counselling Interface</h1>
        <p className="text-cyan-400 mt-2">Student counselling and intervention management</p>
      </div>

      <Card className="bg-black/40 backdrop-blur-xl border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
            Counselling Dashboard
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage student counselling sessions and interventions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-400">Counselling interface will be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
