import { CounsellingHeader } from "@/components/counselling-header"
import { AlertManagement } from "@/components/alert-management"
import { CounsellingScheduler } from "@/components/counselling-scheduler"
import { InterventionTracker } from "@/components/intervention-tracker"
import { CommunicationCenter } from "@/components/communication-center"

export default function CounsellingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.jpg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      <div className="relative z-10">
        <CounsellingHeader />

        <main className="container mx-auto px-6 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AlertManagement />
            <CounsellingScheduler />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <InterventionTracker />
            </div>
            <div>
              <CommunicationCenter />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
