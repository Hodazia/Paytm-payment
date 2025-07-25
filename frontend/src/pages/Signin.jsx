import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { BACKEND_URL } from "../assets/backurl"
import {useNavigate} from "react-router-dom"
import  axios from "axios"
import { useState } from "react"
import { Card, CardContent } from '../components/Card';
import { Wallet } from 'lucide-react';
import './Landing.css';
import { useAuth } from '../contexts/AuthContext';

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br
      from-gray-900 via-blue-900 to-purple-900 
      transition-colors duration-700">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md -z-10" />
        <Card className="w-full max-w-md mx-auto shadow-2xl 
        border-2 border-white/10 bg-white/10 backdrop-blur-lg 
        rounded-2xl p-0">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-8 w-8 text-white bg-gradient-to-br 
            from-blue-500 to-purple-600 rounded-lg p-1" />
                <span className="text-2xl font-bold text-white">VirtualPay</span>
              </div>
              <Heading label={<span className="text-white drop-shadow-lg">Sign in</span>} />
              <SubHeading label={<span className="text-white">Enter your credentials to access your account</span>} />
            </div>
            <div className="space-y-4 text-white">
              <InputBox onChange={e => setUsername(e.target.value)} placeholder="ziahoda@gmail.com" label={"Username"} />
              <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
            </div>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            <div className="pt-6">
              <Button className="w-full rounded-full px-8 py-3 
              text-lg group bg-gradient-to-r from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold
               transition-all duration-300 transform hover:scale-105 
               shadow-xl hover:shadow-2xl text-center space-x-3" onClick={async () => {
                setError("");
                if (!username || !password) {
                  setError("Please enter both username and password.");
                  return;
                }
                console.log("Attempting sign in with:", { username, password });
                try {
                  const success = await login(username, password);
                  if (success) {
                    navigate("/dashboard");
                  } else {
                    setError("Sign in failed. Please check your credentials and try again.");
                  }
                } catch (err) {
                  console.error("Sign in error:", err);
                  setError("Sign in failed. Please check your credentials and try again.");
                }
              }}>
                Sign in
              </Button>
            </div>
            <BottomWarning label={<span className="text-white">Don't have an account?</span>}
             buttonText={<span className="font-semibold text-white hover:text-gray-200">Sign up</span>} 
             to={"/signup"} />
          </CardContent>
        </Card>
      </div>
    );
}