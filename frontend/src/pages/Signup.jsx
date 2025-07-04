import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../assets/backurl"
import { Card, CardContent } from '../components/Card';
import { Wallet } from 'lucide-react';
import './Landing.css';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
              <Heading label={<span className="gradient-text drop-shadow-lg">Sign up</span>} />
              <SubHeading label={<span className="text-gray-300">Enter your information to create an account</span>} />
            </div>
            <div className="space-y-4">
              <InputBox onChange={e => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
              <InputBox onChange={e => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
              <InputBox onChange={e => setUsername(e.target.value)} placeholder="harkirat@gmail.com" label={"Username"} />
              <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
            </div>
            <div className="pt-6">
              <Button className="w-full rounded-full px-8 py-3 text-lg gradient-bg button-pop shadow-xl" onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/user/signup`, {
                  username,
                  firstName,
                  lastName,
                  password
                });

                console.log("response", response.data);
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard")
              }}>
                Sign up
              </Button>
            </div>
            <BottomWarning label={<span className="text-gray-700">Already have an account?</span>} buttonText={<span className="font-semibold gradient-text">Sign in</span>} to={"/signin"} />
          </CardContent>
        </Card>
      </div>
    );
}