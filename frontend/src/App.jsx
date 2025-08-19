import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";

import { Landing } from './pages/Landing';
import { NotFound }  from './pages/NotFound'

import ProtectedRoute from "./components/ProtectedRoute";
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
          </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App