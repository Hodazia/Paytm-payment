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
import { SendMoneyPage } from "./pages/Sendmoneypage";
import { TransactionPage } from "./pages/TransactionPage";
import { ScanQRPage } from "./pages/ScanQrPage";

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
            <Route path="/dashboard/profile" element={<ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>}/>
            <Route path="/dashboard/scanqr" element={<ProtectedRoute>
              <ScanQRPage />
            </ProtectedRoute>}/>
            <Route path="/dashboard/transactions" element={<ProtectedRoute>
              <TransactionPage/>
            </ProtectedRoute>}/>
            <Route path="/dashboard/sendmoney" element={<ProtectedRoute>
              <SendMoneyPage />
            </ProtectedRoute>}/>
            {/* <Route path="/dashboard/scan" element={<ProtectedRoute>
              <ScanQr />
            </ProtectedRoute>}/> */}
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