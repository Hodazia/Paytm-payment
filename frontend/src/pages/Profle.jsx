import { ProfileSection } from "../components/dashboard/profile-section";
import { DashboardSidebar } from "../components/dashboard/dashboard-sidebar";
export const ProfilePage = () => {
    return (
        <div
      className="min-h-screen"
      style={{
        background: "#ffffff",
        backgroundImage: `
        linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 bg-blue-500 rounded-full opacity-60 transform rotate-12"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-green-500 rounded-lg opacity-50 transform -rotate-45"></div>
        <div className="absolute top-64 left-1/4 w-4 h-8 bg-purple-500 rounded-full opacity-40 transform rotate-45"></div>
        <div className="absolute bottom-32 right-10 w-10 h-4 bg-orange-500 rounded-full opacity-50 transform -rotate-12"></div>
        <div className="absolute bottom-64 left-16 w-6 h-6 bg-pink-500 rounded-lg opacity-60 transform rotate-30"></div>
        <div className="absolute top-1/2 right-1/4 w-5 h-5 bg-teal-500 rounded-full opacity-45 transform -rotate-30"></div>
      </div>

        <div className="relative flex min-h-screen">
          <DashboardSidebar />

              <main className="flex-1 w-full md:ml-100 p-4 
             transition-all duration-300">
                <ProfileSection />
                </main>

        </div>
    </div>
    )
}