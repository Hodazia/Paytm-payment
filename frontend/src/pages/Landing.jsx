import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/Card';
import { Wallet, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button'
import Navbar from '../components/Navbar';
import './Landing.css';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16161a] via-[#232946] to-[#7f5af0] dark:from-[#16161a] dark:via-[#232946] dark:to-[#7f5af0] transition-colors duration-700">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              <span className="gradient-text">Virtual Money</span>
              <br />
              <span className="text-white">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Send, receive, and manage virtual currency with ease. 
              Experience seamless digital transactions in a secure environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="rounded-full px-8 py-3 text-lg gradient-bg hover:opacity-90 transition-all duration-200 button-pop flex items-center justify-center gap-2 shadow-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button className="rounded-full px-8 py-3 text-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200 button-pop flex items-center justify-center gap-2 shadow-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 float-animate">
          <div className="w-20 h-20 bg-purple-500/30 rounded-full blur-2xl opacity-70"></div>
        </div>
        <div className="absolute top-40 right-20 float-animate" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-blue-500/30 rounded-full blur-2xl opacity-70"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 float-animate" style={{ animationDelay: '4s' }}>
          <div className="w-16 h-16 bg-pink-500/30 rounded-full blur-2xl opacity-70"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
              Everything you need for virtual transactions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with security, simplicity, and speed in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center card-hover-effect transition-transform duration-300 bg-white/10 backdrop-blur border-2 border-blue-400/30 hover:border-blue-400/70 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur shadow-md">
                  <Wallet className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Virtual Wallet</h3>
                <p className="text-gray-300">Manage your virtual money balance with an intuitive interface</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover-effect transition-transform duration-300 bg-white/10 backdrop-blur border-2 border-green-400/30 hover:border-green-400/70 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur shadow-md">
                  <Users className="h-8 w-8 text-green-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">User Search</h3>
                <p className="text-gray-300">Find and connect with other users easily through our search feature</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover-effect transition-transform duration-300 bg-white/10 backdrop-blur border-2 border-purple-400/30 hover:border-purple-400/70 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur shadow-md">
                  <Zap className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Instant Transfers</h3>
                <p className="text-gray-300">Send money instantly to any user with real-time balance updates</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover-effect transition-transform duration-300 bg-white/10 backdrop-blur border-2 border-red-400/30 hover:border-red-400/70 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur shadow-md">
                  <Shield className="h-8 w-8 text-red-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Secure</h3>
                <p className="text-gray-300">Protected with JWT authentication and secure transaction processing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-section">
              <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-md">
                Why choose VirtualPay?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-white">Easy to Use</h3>
                    <p className="text-gray-300">Simple and intuitive interface designed for everyone</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-white">Instant Setup</h3>
                    <p className="text-gray-300">Get started with virtual money immediately upon signup</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-white">Real-time Updates</h3>
                    <p className="text-gray-300">See your balance update instantly after each transaction</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg text-white">Secure Transactions</h3>
                    <p className="text-gray-300">All transfers are processed securely with proper validation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative fade-in-section">
              <div className="bg-gradient-to-br from-purple-600/80 to-blue-600/80 rounded-2xl p-8 text-white backdrop-blur shadow-2xl">
                <div className="bg-white/20 backdrop-blur rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm opacity-80">Virtual Balance</span>
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div className="text-3xl font-bold">$1,000.00</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm">
                    <div className="flex justify-between">
                      <span>Transfer to @john_doe</span>
                      <span>-$50.00</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-sm">
                    <div className="flex justify-between">
                      <span>Received from @alice</span>
                      <span className="text-green-300">+$25.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 animated-gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to start your virtual money journey?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of users already managing their virtual finances with VirtualPay
          </p>
          <Link to="/signup">
            <Button className="rounded-full px-8 py-3 text-lg flex items-center justify-center gap-2 gradient-bg button-pop shadow-xl">
              Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Wallet className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">VirtualPay</span>
            </div>
            <div className="text-gray-400">
              © 2025 VirtualPay. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


