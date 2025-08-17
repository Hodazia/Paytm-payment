import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import { Wallet,CreditCard,DollarSign,TrendingUp,Shield,Zap,
  BarChart3,
 } from "lucide-react";
import axios from "axios"; 

import { BACKEND_URL } from "../assets/backurl";
import { Link } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async () => {
    setError("");
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      
      const res = await axios.post(`${BACKEND_URL}/user/signin`, {
        username,
        password,
      });

      if (res.data?.token) {
        // Save token in localStorage
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard/profile");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Sign up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "#ffffff",
        backgroundImage: `
        linear-gradient(rgba(14, 165, 233, 0.4) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14, 165, 233, 0.4) 1px, transparent 1px)
      `,
        backgroundSize: "50px 50px",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full" style={{ backgroundColor: "#3b82f6" }} />
        <div
          className="absolute top-32 right-20 w-12 h-12 rounded-lg rotate-45"
          style={{ backgroundColor: "#10b981" }}
        />
        <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
        <div
          className="absolute top-1/2 right-10 w-14 h-14 rounded-lg rotate-12"
          style={{ backgroundColor: "#ef4444" }}
        />
        <div className="absolute bottom-20 right-1/3 w-18 h-18 rounded-full" style={{ backgroundColor: "#8b5cf6" }} />
        <div
          className="absolute top-1/4 left-1/4 w-10 h-10 rounded-lg rotate-45"
          style={{ backgroundColor: "#06b6d4" }}
        />

        <div className="absolute top-16 right-1/4 p-3 rounded-full" style={{ backgroundColor: "#dbeafe" }}>
          <DollarSign className="w-6 h-6" style={{ color: "#3b82f6" }} />
        </div>
        <div className="absolute bottom-32 left-1/3 p-3 rounded-full" style={{ backgroundColor: "#dcfce7" }}>
          <TrendingUp className="w-6 h-6" style={{ color: "#10b981" }} />
        </div>
        <div className="absolute top-1/3 right-16 p-3 rounded-full" style={{ backgroundColor: "#fef3c7" }}>
          <Shield className="w-6 h-6" style={{ color: "#f59e0b" }} />
        </div>
        <div className="absolute bottom-1/4 left-16 p-3 rounded-full" style={{ backgroundColor: "#fce7f3" }}>
          <Zap className="w-6 h-6" style={{ color: "#ec4899" }} />
        </div>
        <div className="absolute top-2/3 right-1/3 p-3 rounded-full" style={{ backgroundColor: "#ede9fe" }}>
          <BarChart3 className="w-6 h-6" style={{ color: "#8b5cf6" }} />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <Card className="w-full
         max-w-md mx-auto shadow-2xl border border-gray-200
         bg-white rounded-2xl overflow-hidden p-2">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 rounded-lg mt-1" style={{ backgroundColor: "#0d9488" }}>
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold" style={{ color: "#1e293b" }}>
                  VirtualPay
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: "#1e293b" }}>
                Signin to your Account
              </h1>
              <p className="text-center" style={{ color: "#64748b" }}>
                Enter the credentials to sign in
              </p>
            </div>

            <div className="space-y-6">

              <div className="space-y-2">
                <label htmlFor="email" style={{ color: "#374151" }}>
                  Username
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-gray-300 bg-gray-50 focus:border-blue-500 
                  focus:ring-blue-500 m-1 p-1"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" style={{ color: "#374151" }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 bg-gray-50
                   focus:border-blue-500 focus:ring-blue-500
                   m-1 p-1"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg text-center" style={{ backgroundColor: "#fef2f2", color: "#dc2626" }}>
                {error}
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={handleSignin}
                disabled={loading}
                className="w-full py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: "#0d9488",
                  color: "#ffffff",
                }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            
            <div className="mt-6 text-center text-lg">
              <p style={{ color: "#64748b" }}>
              <BottomWarning label={<span className="text-gray-500 text-lg">
                Don't have an account?</span>}
             buttonText={<span className="font-semibold bg-[#0d9488] text-white hover:underline transition-colors
               duration-200 text-lg p-2 rounded-lg
              hover:text-gray-200 underline-none">Sign Up</span>} 
             to={"/signup"} />
                </p>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}