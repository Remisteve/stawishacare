"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Crown,
  Users, 
  UserPlus,
  Stethoscope,
  Star,
  Activity,
  Settings,
  LogOut,
  Shield,
  Building2
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500 font-medium">Hospital Administration Portal</p>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-4 rounded-2xl mr-6">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Welcome, Administrator
                  </h2>
                  <p className="text-xl text-white/90">
                    Manage your facility's healthcare team and services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-blue-100 hover:border-blue-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg text-white group-hover:scale-110 transition-transform">
                  <Stethoscope className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Create Doctor</CardTitle>
                  <CardDescription className="text-gray-600">Add new doctor to your facility</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-emerald-100 hover:border-emerald-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl shadow-lg text-white group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Create PrEP Champion</CardTitle>
                  <CardDescription className="text-gray-600">Add new PrEP champion</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-purple-100 hover:border-purple-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg text-white group-hover:scale-110 transition-transform">
                  <UserPlus className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Register Patient</CardTitle>
                  <CardDescription className="text-gray-600">Add new patient to system</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Total Staff", value: "24", icon: <Users className="h-6 w-6" />, color: "from-blue-500 to-indigo-600" },
            { title: "Active Patients", value: "342", icon: <Activity className="h-6 w-6" />, color: "from-emerald-500 to-teal-600" },
            { title: "Doctors", value: "8", icon: <Stethoscope className="h-6 w-6" />, color: "from-purple-500 to-pink-600" },
            { title: "PrEP Champions", value: "6", icon: <Star className="h-6 w-6" />, color: "from-orange-500 to-red-600" }
          ].map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-amber-800 flex items-center">
              <Building2 className="h-6 w-6 mr-3" />
              Admin Features Coming Soon
            </CardTitle>
            <CardDescription className="text-amber-700 text-lg">
              Full admin functionality including user management, analytics, and system configuration will be available in the next update.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">User Management</h4>
                <ul className="space-y-2 text-amber-700">
                  <li>• Create and manage doctor accounts</li>
                  <li>• Assign PrEP champions</li>
                  <li>• Patient registration and management</li>
                  <li>• Staff permissions and roles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">Analytics & Reports</h4>
                <ul className="space-y-2 text-amber-700">
                  <li>• Facility performance metrics</li>
                  <li>• Patient care statistics</li>
                  <li>• PrEP/PEP service reports</li>
                  <li>• Staff productivity insights</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}