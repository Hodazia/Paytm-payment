import { Link, useNavigate } from "react-router-dom"
import { TrendingUp,Users,BarChart3,Shield,PieChart,Target,
    DollarSign,Activity,Zap, CreditCard

 } from "lucide-react"
import { ArrowRight } from "lucide-react"

export const Hero = () => {
  
    return (
        <>
        <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          {/* The icons at the top left */}
          <div className="absolute top-20 left-10 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center transform rotate-12">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="absolute top-40 left-32 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center transform -rotate-6">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>

          {/* icons at the right */}
          <div className="absolute top-16 right-16 w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center transform -rotate-12">
            <PieChart className="w-7 h-7 text-purple-600" />
          </div>
          <div className="absolute top-48 right-8 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center transform rotate-45">
            <Target className="w-5 h-5 text-orange-600" />
          </div>

          {/* middle left icons */}
          <div className="absolute top-1/2 left-8 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center transform rotate-6">
            <DollarSign className="w-6 h-6 text-teal-600" />
          </div>
          <div className="absolute top-1/2 left-40 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center transform -rotate-12">
            <Activity className="w-4 h-4 text-red-600" />
          </div>

          {/* Middle right  icons */}
          <div className="absolute top-1/2 right-12 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center transform -rotate-6">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="absolute top-1/2 right-36 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center transform rotate-12">
            <Zap className="w-5 h-5 text-yellow-600" />
          </div>

          {/* Bottom icons */}
          <div className="absolute bottom-20 left-20 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center transform rotate-45">
            <Users className="w-5 h-5 text-pink-600" />
          </div>
          <div className="absolute bottom-32 right-24 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center transform -rotate-12">
            <CreditCard className="w-6 h-6 text-cyan-600" />
          </div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center gap-2 mb-6">
            <div style={{ backgroundColor: "#dcfce7", 
                color: "#166534", borderColor: "#bbf7d0" }}
                className="flex items-center justify-center p-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              Track Transactions
            </div>
            <div  style={{ backgroundColor: "#fed7aa",
                 color: "#c2410c", borderColor: "#fdba74" }}
                 className="text-center p-1">
              Financial App
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: "#0f172a" }}>
        Payments made simple <br />
            <span className="relative">
              <span style={{ color: "#0891b2" }}>and Secure</span>
              <div
                className="absolute bottom-2 left-0 right-0 h-1 rounded-full"
                style={{ backgroundColor: "#3b82f6" }}
              />
            </span>
          </h1>

          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "#64748b" }}>
          Send money, request payments, and manage your finances with confidence.
           Trusted by freelancers, small businesses, and individuals worldwide.           
              </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/dashboard">
              <button

                className="px-8 py-3 text-lg text-white flex justify-center items-center
                rounded-lg font-medium"
                style={{ backgroundColor: "#0891b2" }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0e7490")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#0891b2")}
                onClick={() => {
                  
                }}
              >
                View Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <button

              className="px-8 py-3 text-lg text-white bg-teal-200 
              rounded-lg font-medium hover:bg-white 
              hover:text-teal-200"
              style={{ borderColor: "#cbd5e1" }}
              // navigate to github repo
              onClick={() => {
                console.log("Button clicked")
                // navigate("https://github.com/Hodazia/Paytm-payment/")
              }}
            >
              {/*the github repo u navigate to */}
              <Link to="/signin">
              Get Started
              </Link>
            </button>
          </div>

          <div className="flex justify-center items-center gap-8" style={{ color: "#94a3b8" }}>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Instant Transfers</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Secure Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>Transactions Dashboard</span>
            </div>
          </div>
        </div>
      </section>
        </>
    )
}