"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Shield, 
  Users, 
  Calendar, 
  Activity, 
  MessageSquare,
  Video,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  UserPlus,
  LogIn,
  Crown,
  Sparkles,
  Star,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const [hiddenInput, setHiddenInput] = useState('');
  const [showSuperAdminPortal, setShowSuperAdminPortal] = useState(false);

  // Secret master access detection
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newInput = hiddenInput + e.key.toLowerCase();
      setHiddenInput(newInput);
      
      // Check for master access phrases
      if (newInput.includes('remi') || newInput.includes('masteradmin') || newInput.includes('setup123')) {
        setShowSuperAdminPortal(true);
        setHiddenInput('');
      }
      
      if (newInput.length > 25) {
        setHiddenInput('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hiddenInput]);

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "PrEP & PEP Management",
      description: "Comprehensive HIV prevention care with automated tracking and reminders.",
      color: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/60"
    },
    {
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      title: "Smart Scheduling",
      description: "Easy appointment booking with automated reminders and follow-ups.",
      color: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/60"
    },
    {
      icon: <Video className="h-8 w-8 text-purple-600" />,
      title: "Video Consultations",
      description: "Secure video calls with healthcare providers from anywhere.",
      color: "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/60"
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Peer Support",
      description: "Connect with PrEP champions and other patients for community support.",
      color: "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/60"
    },
    {
      icon: <Activity className="h-8 w-8 text-rose-600" />,
      title: "Health Tracking",
      description: "Monitor your health journey with detailed analytics and insights.",
      color: "border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100/60"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
      title: "Secure Messaging",
      description: "Encrypted communication with your healthcare team.",
      color: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100/60"
    }
  ];

  const userTypes = [
    {
      title: "Patients",
      description: "Self-register and start your HIV prevention care journey",
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      features: ["Free self-registration", "Book appointments instantly", "Track medications", "Upload care videos", "Join peer support", "Secure messaging"],
      action: "Register Now",
      path: "/patient-register",
      color: "border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100/80",
      accent: "text-blue-600",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    {
      title: "Healthcare Staff",
      description: "Doctors, Prep Champions & Administrators - Login to access your dashboard",
      icon: <Stethoscope className="h-8 w-8 text-green-600" />,
      features: ["Patient management", "Analytics dashboard", "Appointment scheduling", "Video consultations", "Team collaboration", "Request handling"],
      action: "Staff Login",
      path: "/login",
      color: "border-green-300 bg-gradient-to-br from-green-50 to-green-100/80",
      accent: "text-green-600",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Master SuperAdmin Portal Modal */}
      {showSuperAdminPortal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-purple-200 bg-white">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full">
                  <Crown className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                <Crown className="mr-2 h-6 w-6 text-purple-600" />
                Master Access Detected
              </CardTitle>
              <CardDescription className="text-gray-600">
                Welcome, Original SuperAdmin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Initialize the master administrator account for the platform
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => alert('Master setup functionality would be available in full application')}
                    className="flex-1 bg-amber-800 hover:bg-amber-900 text-white"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Setup Master Account
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowSuperAdminPortal(false)}
                    className="border-gray-300"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PrEP/PEP Care
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hover:bg-gray-50" onClick={() => alert('Staff login would redirect to login page')}>
                <LogIn className="mr-2 h-4 w-4" />
                Staff Login
              </Button>
              <Button className="bg-amber-800 hover:bg-black text-white" onClick={() => alert('Patient registration would redirect to signup page')}>
                <UserPlus className="mr-2 h-4 w-4" />
                Patient Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gray-100 text-gray-700 px-4 py-2 border-0" variant="secondary">
            <Star className="mr-2 h-4 w-4 text-yellow-500" />
            Modern HIV Prevention Care Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Comprehensive
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}PrEP & PEP{" "}
            </span>
            <br />
            Care Management
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline HIV prevention care with our integrated platform. Connect patients, 
            healthcare providers, and administrators in one secure, user-friendly system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-10 py-6 bg-black hover:bg-amber-900 text-white" onClick={() => alert('Would redirect to patient registration')}>
              <UserPlus className="mr-3 h-5 w-5" />
              Start Your Care Journey
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-gray-300 hover:bg-gray-50" onClick={() => alert('Would redirect to staff login')}>
              <LogIn className="mr-3 h-5 w-5" />
              Healthcare Staff Login
            </Button>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Two Access Portals</h2>
            <p className="text-xl text-gray-600">Choose your portal based on your role</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {userTypes.map((type, index) => (
              <Card key={index} className={`${type.color} border-2 hover:border-opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                      {type.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{type.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-base mt-1">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${type.buttonStyle} py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                    onClick={() => alert(`Would redirect to ${type.path}`)}
                  >
                    {type.action}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
            <p className="text-gray-600 font-medium">
              <strong className="text-gray-800">Healthcare Staff Note:</strong> Your account must be created by an administrator. 
              Contact your system administrator if you need login credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600">Everything you need for comprehensive HIV prevention care</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.color} border-2 hover:border-opacity-60 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105`}>
                <CardHeader>
                  <div className="p-3 bg-white rounded-xl border border-gray-100 w-fit mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-4 bg-white/20 rounded-full w-fit mx-auto mb-8">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Care Journey?</h2>
          <p className="text-xl mb-10 opacity-90 leading-relaxed">
            Join thousands of patients already managing their HIV prevention care with our platform
          </p>
          <Button size="lg" className="text-lg px-12 py-6 bg-white text-black hover:bg-gray-100 cursor-pointer" onClick={() => alert('Would redirect to patient registration')}>
            <UserPlus className="mr-3 h-6 w-6" />
            Register as Patient - It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">PrEP/PEP Care</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Modern HIV prevention care platform for comprehensive patient management.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Globe className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Mail className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-400">For Patients</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <UserPlus className="h-4 w-4" />
                  <span>Free Self Registration</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Appointment Booking</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Activity className="h-4 w-4" />
                  <span>Medication Tracking</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Peer Support Network</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-green-400">For Healthcare Staff</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Stethoscope className="h-4 w-4" />
                  <span>Patient Management</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Activity className="h-4 w-4" />
                  <span>Analytics Dashboard</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Video className="h-4 w-4" />
                  <span>Video Consultations</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Team Collaboration</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-purple-400">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>Help Center</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Contact Support</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Building2 className="h-4 w-4" />
                  <span>Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 PrEP/PEP Care Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Hidden hint for master access */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-400 opacity-30 pointer-events-none">
        Type "remi" for master access
      </div>
    </div>
  );
}