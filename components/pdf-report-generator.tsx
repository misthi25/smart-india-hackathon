"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PDFReportGeneratorProps {
  studentId: string
  studentName: string
}

export function PDFReportGenerator({ studentId, studentName }: PDFReportGeneratorProps) {
  const [reportType, setReportType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReport, setGeneratedReport] = useState<any>(null)
  const { toast } = useToast()

  const reportTypes = [
    {
      value: "comprehensive",
      label: "Comprehensive Risk Assessment",
      description: "Complete analysis with all risk factors and recommendations",
    },
    {
      value: "academic",
      label: "Academic Performance Report",
      description: "Focus on GPA, attendance, and academic alerts",
    },
    {
      value: "behavioral",
      label: "Behavioral Analysis Report",
      description: "Engagement, participation, and social factors",
    },
    {
      value: "financial",
      label: "Financial Status Report",
      description: "Fee payments, financial aid, and related alerts",
    },
    {
      value: "intervention",
      label: "Intervention Plan Report",
      description: "Recommended actions and intervention strategies",
    },
  ]

  const handleGenerateReport = async () => {
    if (!reportType) {
      toast({
        title: "Report Type Required",
        description: "Please select a report type before generating.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          reportType,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setGeneratedReport(result.reportData)
        toast({
          title: "Report Generated Successfully",
          description: `${reportTypes.find((t) => t.value === reportType)?.label} has been created.`,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadReport = () => {
    if (generatedReport) {
      // Create a blob with the HTML content
      const blob = new Blob([generatedReport.htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Create download link
      const link = document.createElement("a")
      link.href = url
      link.download = `${studentName}_${reportType}_report_${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Download Started",
        description: "Report file has been downloaded to your device.",
      })
    }
  }

  const handlePreviewReport = () => {
    if (generatedReport) {
      const newWindow = window.open("", "_blank")
      if (newWindow) {
        newWindow.document.write(generatedReport.htmlContent)
        newWindow.document.close()
      }
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          PDF Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm font-medium mb-2 block">Select Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue placeholder="Choose report type..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-700">
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-slate-400">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Report Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Student:</span>
                <span className="text-white">{studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student ID:</span>
                <span className="text-white font-mono">{studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Generated:</span>
                <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerateReport}
            disabled={!reportType || isGenerating}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Report...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generate Report
              </div>
            )}
          </Button>
        </div>

        {generatedReport && (
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Report Generated Successfully</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="bg-green-900/50 text-green-300 border-green-800">
                    {reportTypes.find((t) => t.value === reportType)?.label}
                  </Badge>
                  <p className="text-slate-400 text-sm mt-1">
                    Generated: {new Date(generatedReport.generatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handlePreviewReport}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Preview
                </Button>
                <Button
                  onClick={handleDownloadReport}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
