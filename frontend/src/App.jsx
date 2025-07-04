import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Landing } from './pages/Landing';
import { NotFound }  from './pages/NotFound'
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
       <BrowserRouter>
       <AuthProvider>
       <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
       </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App