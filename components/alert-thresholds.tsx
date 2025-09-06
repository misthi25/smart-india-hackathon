"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AlertThresholds() {
  const [thresholds, setThresholds] = useState({
    attendance: { enabled: true, threshold: 75, weight: 25 },
    gpa: { enabled: true, threshold: 2.5, weight: 30 },
    financial: { enabled: true, threshold: 15, weight: 20 },
    engagement: { enabled: true, threshold: 50, weight: 15 },
    assignments: { enabled: true, threshold: 80, weight: 10 },
  })

  const [escalationRules, setEscalationRules] = useState({
    lowRisk: 3,
    mediumRisk: 6,
    highRisk: 9,
    autoNotify: true,
    parentNotify: true,
  })

  const { toast } = useToast()

  const handleThresholdChange = (category: string, field: string, value: any) => {
    setThresholds((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleEscalationChange = (field: string, value: any) => {
    setEscalationRules((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Risk threshold configuration has been updated successfully.",
    })
  }

  const thresholdCategories = [
    {
      key: "attendance",
      label: "Attendance Rate",
      description: "Minimum attendance percentage",
      unit: "%",
      min: 0,
      max: 100,
    },
    {
      key: "gpa",
      label: "GPA Threshold",
      description: "Minimum acceptable GPA",
      unit: "",
      min: 0,
      max: 4,
      step: 0.1,
    },
    {
      key: "financial",
      label: "Payment Delay",
      description: "Maximum days for payment delay",
      unit: "days",
      min: 0,
      max: 90,
    },
    {
      key: "engagement",
      label: "Engagement Score",
      description: "Minimum engagement percentage",
      unit: "%",
      min: 0,
      max: 100,
    },
    {
      key: "assignments",
      label: "Assignment Completion",
      description: "Minimum completion rate",
      unit: "%",
      min: 0,
      max: 100,
    },
  ]

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Alert Threshold Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-white font-medium">Risk Factor Thresholds</h4>
          {thresholdCategories.map((category) => (
            <div key={category.key} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <Label className="text-slate-300 font-medium">{category.label}</Label>
                  <p className="text-slate-400 text-sm">{category.description}</p>
                </div>
                <Switch
                  checked={thresholds[category.key as keyof typeof thresholds].enabled}
                  onCheckedChange={(checked) => handleThresholdChange(category.key, "enabled", checked)}
                />
              </div>

              {thresholds[category.key as keyof typeof thresholds].enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Threshold Value</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={category.min}
                        max={category.max}
                        step={category.step || 1}
                        value={thresholds[category.key as keyof typeof thresholds].threshold}
                        onChange={(e) =>
                          handleThresholdChange(category.key, "threshold", Number.parseFloat(e.target.value))
                        }
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                      <span className="text-slate-400 text-sm">{category.unit}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Weight (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={thresholds[category.key as keyof typeof thresholds].weight}
                      onChange={(e) => handleThresholdChange(category.key, "weight", Number.parseInt(e.target.value))}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Escalation Rules
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300 text-sm">Low Risk Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={escalationRules.lowRisk}
                  onChange={(e) => handleEscalationChange("lowRisk", Number.parseInt(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <span className="text-slate-400 text-sm">alerts</span>
              </div>
            </div>
            <div>
              <Label className="text-slate-300 text-sm">Medium Risk Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={escalationRules.mediumRisk}
                  onChange={(e) => handleEscalationChange("mediumRisk", Number.parseInt(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <span className="text-slate-400 text-sm">alerts</span>
              </div>
            </div>
            <div>
              <Label className="text-slate-300 text-sm">High Risk Threshold</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={escalationRules.highRisk}
                  onChange={(e) => handleEscalationChange("highRisk", Number.parseInt(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <span className="text-slate-400 text-sm">alerts</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Auto-notify counselors</Label>
              <Switch
                checked={escalationRules.autoNotify}
                onCheckedChange={(checked) => handleEscalationChange("autoNotify", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Notify parents/guardians</Label>
              <Switch
                checked={escalationRules.parentNotify}
                onCheckedChange={(checked) => handleEscalationChange("parentNotify", checked)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSaveSettings}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  )
}
