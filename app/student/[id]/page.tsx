import { StudentProfile } from "@/components/student-profile"
import { RiskFactors } from "@/components/risk-factors"
import { AlertHistory } from "@/components/alert-history"
import { InterventionActions } from "@/components/intervention-actions"

interface StudentPageProps {
  params: {
    id: string
  }
}

export default function StudentPage({ params }: StudentPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.jpg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StudentProfile studentId={params.id} />
            <RiskFactors studentId={params.id} />
          </div>
          <div className="space-y-8">
            <AlertHistory studentId={params.id} />
            <InterventionActions studentId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
