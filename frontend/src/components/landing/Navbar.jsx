import { CreditCard } from "lucide-react"
import { Button } from "../Button"
import { useState } from "react"
import { Menu,X } from "lucide-react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();

    return (
        <>
        <header className="fixed top-0 left-0 right-0 z-50 border-b
         border-white/20 bg-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center
         justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">VirtualPay</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Features
            </a>
            <a href="#demo" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              Demo
            </a>
            <a href="#faq" className="text-slate-700 hover:text-slate-900 transition-colors font-medium">
              FAQ
            </a>
            <Link to="/signup">
              <button className="bg-teal-600 hover:bg-teal-700 
              text-white px-6 py-2 rounded-lg font-medium">
                Get Started
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> :
             <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#features"
                className="text-slate-700 hover:text-slate-900 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-slate-700 hover:text-slate-900 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </a>
              <a
                href="#faq"
                className="text-slate-700 hover:text-slate-900 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full mt-2">Get Started</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
        
        </>
    )
    
}