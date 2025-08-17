import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
// import { Dashboard } from "./pages/Dashboard";
// import { SendMoney } from "./pages/SendMoney";
import { Landing } from './pages/Landing';
import { NotFound }  from './pages/NotFound'
// import { AuthProvider } from "./contexts/AuthContext";
// import Dashboard1 from "./pages/Dashboard1";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardSidebar } from "./components/dashboard/dashboard-sidebar";
import { ProfilePage } from "./pages/Profle";
import { Toaster } from "sonner";

function App() {
  return (
    <>
       <BrowserRouter>
       <Toaster position="top-right"/>
       <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/xyz" element={<ProtectedRoute>

              <DashboardSidebar/>

            </ProtectedRoute>}/>
            <Route path="/dashboard/profile" element={<ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>}/>
            <Route path="/dashboard/transactions" element={<ProtectedRoute>
              <h1>Transactions send!</h1>
            </ProtectedRoute>}/>
            <Route path="/dashboard/sendmoney" element={<ProtectedRoute>
              <h1>Send email</h1>
            </ProtectedRoute>}/>
            {/* <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard1 />
              </ProtectedRoute>
            }/> */}
          </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App