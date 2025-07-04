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

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#16161a] via-[#232946] to-[#7f5af0] dark:from-[#16161a] dark:via-[#232946] dark:to-[#7f5af0] transition-colors duration-700">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md -z-10" />
        <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-white/10 bg-white/10 backdrop-blur-lg rounded-2xl p-0">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold gradient-text">VirtualPay</span>
              </div>
              <Heading label={<span className="gradient-text drop-shadow-lg">Sign in</span>} />
              <SubHeading label={<span className="text-gray-300">Enter your credentials to access your account</span>} />
            </div>
            <div className="space-y-4">
              <InputBox onChange={e => setUsername(e.target.value)} placeholder="zia23hoda@gmail.com" label={"Username"} />
              <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
            </div>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            <div className="pt-6">
              <Button className="w-full rounded-full px-8 py-3 text-lg gradient-bg button-pop shadow-xl" onClick={async () => {
                setError("");
                if (!username || !password) {
                  setError("Please enter both username and password.");
                  return;
                }
                console.log("Attempting sign in with:", { username, password });
                try {
                  const response = await axios.post(
                    `http://localhost:3000/api/v1/user/signin`,
                    { username, password },
                    { headers: { 'Content-Type': 'application/json' } }
                  );
                  console.log("response", response.data);
                  localStorage.setItem("token", response.data.token)
                  navigate("/dashboard")
                } catch (err) {
                  console.error("Sign in error:", err);
                  setError(
                    err?.response?.data?.message ||
                    "Sign in failed. Please check your credentials and try again."
                  );
                }
              }}>
                Sign in
              </Button>
            </div>
            <BottomWarning label={<span className="text-gray-700">Don't have an account?</span>} buttonText={<span className="font-semibold gradient-text">Sign up</span>} to={"/signup"} />
          </CardContent>
        </Card>
      </div>
    );
}