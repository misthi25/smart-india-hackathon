import { RiskManagementHeader } from "@/components/risk-management-header"
import { RiskLevelMatrix } from "@/components/risk-level-matrix"
import { AlertThresholds } from "@/components/alert-thresholds"
import { RiskTransitions } from "@/components/risk-transitions"
import { AutomatedActions } from "@/components/automated-actions"

export default function RiskManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.jpg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      <div className="relative z-10">
        <RiskManagementHeader />

        <main className="container mx-auto px-6 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RiskLevelMatrix />
            <AlertThresholds />
          </div>

          <RiskTransitions />
          <AutomatedActions />
        </main>
      </div>
    </div>
  )
}
