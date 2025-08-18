import { DashboardSidebar } from "../components/dashboard/dashboard-sidebar"
import { ScanQr } from "../components/dashboard/ScanQr"

export const ScanQRPage = () => {
    return (
        <>
         <div className="min-h-screen">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute top-20 left-10 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-green-500 rounded-lg opacity-30 rotate-45"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500 rounded-full opacity-25"></div>
      <div className="absolute bottom-20 right-40 w-14 h-14 bg-orange-500 rounded-lg opacity-20 rotate-12"></div>


      <div className="relative min-h-screen">
            <DashboardSidebar />
            <main className="md:ml-80 flex flex-1 justify-center items-center p-6
             transition-all duration-300">
                <ScanQr />
                </main>
        </div>
        </div>
        
        
        </>
    )
}