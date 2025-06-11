import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  MapPin,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  UserPlus,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "PrEP & PEP Management",
      description: "Comprehensive HIV prevention care with automated tracking and reminders."
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Smart Scheduling",
      description: "Easy appointment booking with automated reminders and follow-ups."
    },
    {
      icon: <Video className="h-8 w-8 text-purple-600" />,
      title: "Video Consultations",
      description: "Secure video calls with healthcare providers from anywhere."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Peer Support",
      description: "Connect with PrEP champions and other patients for community support."
    },
    {
      icon: <Activity className="h-8 w-8 text-red-600" />,
      title: "Health Tracking",
      description: "Monitor your health journey with detailed analytics and insights."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-indigo-600" />,
      title: "Secure Messaging",
      description: "Encrypted communication with your healthcare team."
    }
  ];

  const userTypes = [
    {
      title: "Patients",
      description: "Self-register and access comprehensive HIV prevention care",
      icon: <Heart className="h-6 w-6" />,
      features: ["Book appointments", "Track medications", "Upload videos", "Peer support"],
      action: "Register as Patient",
      path: "/patient-register",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Healthcare Staff",
      description: "Login to manage patients and provide quality care",
      icon: <Stethoscope className="h-6 w-6" />,
      features: ["Manage patients", "View analytics", "Handle requests", "Team collaboration"],
      action: "Staff Login",
      path: "/login",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Administrators",
      description: "Manage hospital operations and staff accounts",
      icon: <Lock className="h-6 w-6" />,
      features: ["User management", "Analytics", "Hospital settings", "System oversight"],
      action: "Admin Login",
      path: "/login",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
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
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/patient-register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🚀 Modern HIV Prevention Care Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Comprehensive
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}PrEP & PEP{" "}
            </span>
            Management
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline HIV prevention care with our integrated platform. Connect patients, 
            healthcare providers, and administrators in one secure, user-friendly system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/patient-register">
                <UserPlus className="mr-2 h-5 w-5" />
                Register as Patient
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/login">
                <Lock className="mr-2 h-5 w-5" />
                Staff Login
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Access Level</h2>
            <p className="text-lg text-gray-600">Different interfaces for different needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card key={index} className={`${type.color} border-2 hover:shadow-lg transition-all duration-300`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    {type.icon}
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" onClick={() => navigate(type.path)}>
                    {type.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need for comprehensive HIV prevention care</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients and healthcare providers already using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link to="/patient-register">
                Start Your Care Journey
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600">
              <Link to="/login">
                Healthcare Provider Login
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">PrEP/PEP Care</span>
              </div>
              <p className="text-gray-400">
                Modern HIV prevention care platform for comprehensive patient management.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Patients</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Self Registration</li>
                <li>Appointment Booking</li>
                <li>Medication Tracking</li>
                <li>Peer Support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">For Providers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Patient Management</li>
                <li>Analytics Dashboard</li>
                <li>Video Consultations</li>
                <li>Team Collaboration</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PrEP/PEP Care Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}