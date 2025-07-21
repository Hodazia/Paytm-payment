import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/Card';
import { Wallet, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button'
import Navbar from '../components/Navbar';
import './Landing.css';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br
     from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold 
            mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 via-teal-400 to-green-400 bg-clip-text text-transparent animate-pulse">
                Virtual Money
              </span>
              <br />
              <span className="text-white drop-shadow-lg">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Send, receive, and manage virtual currency with ease. Experience 
              seamless digital transactions in a secure environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 
                shadow-xl hover:shadow-2xl flex items-center space-x-3">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button className="border-2 border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10 backdrop-blur text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Everything you need for virtual transactions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with security, simplicity, and speed in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Virtual Wallet */}
            <Card className="group bg-gradient-to-br
     from-gray-900 via-blue-900 to-purple-900 backdrop-blur border border-blue-500/30 hover:border-blue-500/60 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Virtual Wallet</h3>
                <p className="text-gray-300 leading-relaxed">
                  Manage your virtual money balance with an intuitive interface
                </p>
              </CardContent>
            </Card>
            
            {/* User Search */}
            <Card className="group bg-gradient-to-br
     from-gray-900 via-blue-900 to-purple-900  backdrop-blur border border-green-500/30 hover:border-green-500/60 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">User Search</h3>
                <p className="text-gray-300 leading-relaxed">
                  Find and connect with other users easily through our search feature
                </p>
              </CardContent>
            </Card>
            
            {/* Instant Transfers */}
            <Card className="group bg-gradient-to-br
     from-gray-900 via-blue-900 to-purple-900  backdrop-blur border border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Instant Transfers</h3>
                <p className="text-gray-300 leading-relaxed">
                  Send money instantly to any user with real-time balance updates
                </p>
              </CardContent>
            </Card>
            
            {/* Secure */}
            <Card className="group bg-gradient-to-br
     from-gray-900 via-blue-900 to-purple-900 backdrop-blur border border-red-500/30 hover:border-red-500/60 rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Secure</h3>
                <p className="text-gray-300 leading-relaxed">
                  Protected with JWT authentication and secure transaction processing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
                Why choose VirtualPay?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-200 group-hover:scale-110">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Simple and intuitive interface designed for everyone
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-200 group-hover:scale-110">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Instant Setup</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Get started with virtual money immediately upon signup
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-200 group-hover:scale-110">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
                    <p className="text-gray-300 leading-relaxed">
                      See your balance update instantly after each transaction
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-transform duration-200 group-hover:scale-110">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Secure Transactions</h3>
                    <p className="text-gray-300 leading-relaxed">
                      All transfers are processed securely with proper validation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Virtual Balance Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm transform transition-transform duration-500 hover:scale-105">
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-2xl p-8 shadow-2xl backdrop-blur border border-white/10">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-purple-100 text-sm font-medium">Virtual Balance</span>
                      <Wallet className="w-6 h-6 text-purple-100" />
                    </div>
                    <div className="text-4xl font-bold text-white">$1,000.00</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-sm border border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-100">Transfer to @john_doe</span>
                        <span className="text-red-300 font-semibold">-$50.00</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-sm border border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-100">Received from @alice</span>
                        <span className="text-green-300 font-semibold">+$25.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-red-500 via-pink-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to start your virtual money journey?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of users already managing their virtual finances with VirtualPay
          </p>
          <Link to="/signup">
            <Button className="group bg-gray-900/80 hover:bg-gray-900 backdrop-blur text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 mx-auto">
              <span>Create Your Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur border-t border-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">VirtualPay</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              © 2025 VirtualPay. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};