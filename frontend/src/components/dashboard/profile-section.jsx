import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 
"../Card"


import { User, Mail, Phone, MapPin, Calendar, Shield, CreditCard, Bell } from "lucide-react"
import { useState,useEffect } from "react"


export function ProfileSection({ user }) {
  /*
  now fetch the  data from the api and get  the results and store it,

  
  */


  return (
    
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h1>
        <p className="text-slate-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-white border-slate-200 shadow-sm lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
            </div>
            <CardTitle className="text-slate-900">{user?.name || "John Doe"}</CardTitle>
            <CardDescription className="text-slate-600">Premium Account</CardDescription>
            <div className="bg-teal-50 text-teal-700 border-teal-200 w-fit mx-auto">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user?.email || "john@example.com"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Joined {user?.joinDate || "March 2024"}</span>
            </div>
          </CardContent>
        </Card>
        </div>
        </div>
  )
}