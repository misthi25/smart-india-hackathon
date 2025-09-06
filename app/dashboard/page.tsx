"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsOverview } from "@/components/stats-overview"
import { RiskAnalytics } from "@/components/risk-analytics"
import { RecentAlerts } from "@/components/recent-alerts"
import { StudentTable } from "@/components/student-table"
import { DataManagement } from "@/components/data-management"
import { CounsellingInterface } from "@/components/counselling-interface"
import { RiskManagement } from "@/components/risk-management"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <StatsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RiskAnalytics />
              </div>
              <div>
                <RecentAlerts />
              </div>
            </div>
            <StudentTable />
          </>
        )
      case "students":
        return <StudentTable />
      case "analytics":
        return <RiskAnalytics />
      case "data":
        return <DataManagement />
      case "counselling":
        return <CounsellingInterface />
      case "risk":
        return <RiskManagement />
      default:
        return <div>Section not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

      <div className="relative z-10 flex">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="flex-1 ml-64">
          <DashboardHeader />

          <main className="container mx-auto px-6 py-8 space-y-8">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}
