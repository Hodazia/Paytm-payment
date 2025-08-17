import { BarChart3,TrendingUp,Shield,
    Zap,ArrowRight,Users,
 } from "lucide-react"
 import { Link } from "react-router-dom"

export const FinalCTA = () => {
    return (
        <>
        
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-16 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center transform rotate-12">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center transform -rotate-6">
            <TrendingUp className="w-6 h-6 text-teal-600" />
          </div>
          <div className="absolute bottom-16 left-12 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center transform rotate-45">
            <Shield className="w-4 h-4 text-purple-600" />
          </div>
          <div className="absolute bottom-24 right-16 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center transform -rotate-12">
            <Zap className="w-5 h-5 text-orange-600" />
          </div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-16 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div

                className="px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: "#dcfce7", color: "#166534", borderColor: "#bbf7d0" }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Ready to Explore
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#0f172a" }}>
              Ready to dive into the{" "}
              <span className="relative">
                <span style={{ color: "#0891b2" }}>dashboard?</span>
                <div
                  className="absolute bottom-2 left-0 right-0 h-1 rounded-full"
                  style={{ backgroundColor: "#3b82f6" }}
                />
              </span>
            </h2>

            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: "#64748b" }}>
              
            See exactly how our powerful payment recovery dashboard works—without any commitment. Explore a live, 
            interactive demo with real-time analytics and a complete user interface
                  </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/dashboard">
                <button
                  className="px-12 py-4 text-xl text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: "#0891b2" }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#0e7490")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#0891b2")}
                >
                  <BarChart3 className="w-6 h-6 mr-3" />
                  Explore Dashboard
                  <ArrowRight className="w-6 h-6 ml-3" />
                </button>
              </Link>
              <button
                variant="outline"
                className="px-12 py-4 text-xl bg-white/50 backdrop-blur-sm rounded-xl font-semibold border-2 hover:bg-white hover:shadow-lg transition-all duration-300"
                style={{ borderColor: "#0891b2", color: "#0891b2" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f0fdfa"
                  e.target.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
                  e.target.style.transform = "scale(1)"
                }}
              >
                <Users className="w-6 h-6 mr-3" />
                View Source Code
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Secure & Fast</h3>
                <p className="text-slate-600 text-sm">Built with modern security practices</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Real-time Data</h3>
                <p className="text-slate-600 text-sm">Live dashboard with interactive charts</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Full-Stack Demo</h3>
                <p className="text-slate-600 text-sm">Complete application showcase</p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">No Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Full Features</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm py-8 px-4">
        <div className="container mx-auto text-center text-slate-500">
          <p>&copy; 2025 VirtualPay. All rights reserved.</p>
        </div>
      </footer>
        </>
    )
}