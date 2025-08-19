import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { User, CreditCard, ArrowUpRight, Receipt, LogOut, Menu, X
  ,Scan
 } from "lucide-react"
import axios from "axios"
import  { toast } from "sonner"
import { BACKEND_URL } from "../../assets/backurl"

// A helper function to combine Tailwind CSS classes conditionally
const cn = (...classNames) => classNames.filter(Boolean).join(' ');

// A simple, placeholder Card component since the original import failed
// In a real application, you would use a proper Card component from your UI library
const Card = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);



export function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const location = useLocation()
  const pathname = location.pathname;

  const navigate = useNavigate();

  const handleLogout = () => {
    // remove the token from the localStorage
    console.log("Logout button clicked ");
    localStorage.removeItem('token');
    toast.success("Successfully logged out ! ")
    setTimeout(() => {
      navigate("/")
    },1500)
    
  }
  // Check if user is authenticated
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // In a real app, you'd navigate here, e.g., navigate('/');
      console.log('No token found, user not authenticated.');
      return false;
    }
    return true;
  };

  const fetchUser = async () => {
    if(!checkAuth()) {
      return;
    }
    try{
      const options = {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      }
      const res = await axios.get(`${BACKEND_URL}/user/me`, options);
      const fname = res.data.firstName + ' ' + res.data.lastName;
      setFullName(fname);
      setUserName(res.data.username)
      setProfileUrl(res.data.profileurl);
    }
    catch(e)
    {
      console.log("Error fetching user data from the server:", e);
      setFullName('');
      setUserName('');
      setProfileUrl('')
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your account settings",
      href: "/dashboard/profile",
    },
    {
      id: "scanqr",
      label: "Scan QR",
      icon: Scan,
      description: "Scan the Qr code",
      href: "/dashboard/scanqr",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: Receipt,
      description: "View payment history",
      href: "/dashboard/transactions",
    },
    {
      id: "sendmoney",
      label: "Send Money",
      icon: ArrowUpRight,
      description: "Transfer funds",
      href: "/dashboard/sendmoney",
    },

  ]

  return (
    <>
      {/* Mobile Menu Button - Fixed top-left, only visible on small screens */}
      {!isMobileMenuOpen && (
        <button
          className="fixed top-4 left-4 z-50 md:hidden p-3 bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white shadow-lg border border-slate-200 rounded-2xl transition-all duration-300 transform hover:scale-105"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar - Positioned fixed to the viewport */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200 transition-transform duration-300 ease-in-out shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-10 pt-8 md:pt-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">VirtualPay</h2>
                <p className="text-slate-500 text-sm font-medium">Dashboard</p>
              </div>
            </div>

            {/* Close button - only visible on mobile */}
            <button
              className="md:hidden p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Navigation - Takes up available space */}
          <nav className="flex-1 space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.id} to={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <button
                    className={cn(
                      "w-full flex items-center gap-4 h-auto p-4 text-left transition-all duration-200 rounded-xl",
                      "hover:bg-slate-100 hover:text-slate-900",
                      isActive
                        ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm font-semibold transform scale-[1.02]"
                        : "text-slate-600 font-medium"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-teal-600" : "text-slate-500")} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{item.label}</div>
                      <div className="text-xs opacity-70 truncate text-slate-500">{item.description}</div>
                    </div>
                  </button>
                </Link>
              )
            })}
          </nav>

          {/* User Info Card and Logout - Pushed to the bottom using flex-col and mt-auto */}
          <div className="mt-auto space-y-4 pt-6 border-t border-slate-100">
            <Card className="bg-slate-50 border-slate-200 p-4 rounded-xl shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={profileUrl || "https://placehold.co/44x44/f1f5f9/94a3b8?text=U"} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-medium truncate">{fullName || "John Doe"}</p>
                  <p className="text-slate-500 text-sm truncate">{userName || "johndoe"}</p>
                </div>
              </div>
            </Card>

            {/* Logout Button */}
            <button
              className="w-full justify-start flex items-center gap-3 p-4 rounded-xl font-medium transition-colors duration-200 text-red-600 hover:text-white hover:bg-red-600 hover:shadow-lg"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
