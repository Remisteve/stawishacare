"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

// Additional icons for new features
const CondomIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6" />
    <path d="M12 14v8" />
    <path d="M10 22h4" />
  </svg>
);

const SafetyIcon = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3 3v6c0 3.5-1.5 6.5-3 8-1.5-1.5-3-4.5-3-8V5l3-3z" />
    <path d="M12 11v4" />
    <path d="M12 17h.01" />
  </svg>
);

export default function LandingPage() {
  const router = useRouter();
  const [hiddenInput, setHiddenInput] = useState('');
  const [showSuperAdminPortal, setShowSuperAdminPortal] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const [accessMessage, setAccessMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Secret master access detection
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newInput = hiddenInput + e.key.toLowerCase();
      setHiddenInput(newInput);
      
      // Check for master access phrases
      if (newInput.includes('remi')) {
        setShowSuperAdminPortal(true);
        setHiddenInput('');
        setAccessMessage('');
        setMessageType('');
      }
      
      if (newInput.length > 25) {
        setHiddenInput('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hiddenInput]);

  const handleSecretKeySubmit = () => {
    if (secretKey.toLowerCase() === 'remi') {
      setAccessMessage('Access Granted! Redirecting...');
      setMessageType('success');
      setTimeout(() => {
        setShowSuperAdminPortal(false);
        router.push('/auth/superadmin');
      }, 1500);
    } else {
      setAccessMessage('Access Denied - Invalid secret key');
      setMessageType('error');
      setSecretKey('');
      setTimeout(() => {
        setAccessMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (secretKey.trim()) {
        handleSecretKeySubmit();
      }
    }
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "PrEP & PEP Excellence",
      description: "End-to-End HIV Prevention & Wellbeing Solution with pre and post-exposure prophylaxis management, automated tracking, and personalized care plans.",
      details: ["Daily PrEP monitoring", "Emergency PEP access", "Side effect tracking", "Adherence support"],
      color: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50"
    },
    {
      icon: <CondomIcon />,
      title: "Condom Distribution",
      description: "Free condom access points, discreet delivery services, and Integrated sexual health resources.",
      details: ["Free condom pickup", "Home delivery", "Various types & sizes", "Lubricant included"],
      color: "border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100/50"
    },
    {
      icon: <SafetyIcon />,
      title: "Violence Support Services",
      description: "Confidential support for emotional, physical, and sexual violence survivors with trained counselors.",
      details: ["24/7 crisis hotline", "Trauma counseling", "Legal assistance", "Safe house referrals"],
      color: "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50"
    },
    {
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      title: "Smart Scheduling",
      description: "AI-powered appointment booking with automated reminders, rescheduling, and queue management.",
      details: ["Real-time availability", "SMS reminders", "Priority booking", "Multi-clinic access"],
      color: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50"
    },
    {
      icon: <Video className="h-8 w-8 text-indigo-600" />,
      title: "Telehealth Services",
      description: "HD video consultations with healthcare providers, mental health specialists, and peer counselors.",
      details: ["End-to-end encryption", "Screen sharing", "Prescription delivery", "Group sessions"],
      color: "border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100/50"
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Community Support",
      description: "Connect with PrEP champions, support groups, and mentors for your health journey.",
      details: ["Peer mentorship", "Support groups", "Success stories", "Community events"],
      color: "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50"
    },
    {
      icon: <Heart className="h-8 w-8 text-rose-600" />,
      title: "Holistic Health",
      description: "Integrated care including mental health, nutrition counseling, and wellness programs.",
      details: ["Mental health screening", "Nutrition plans", "Exercise programs", "Stress management"],
      color: "border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100/50"
    },
    {
      icon: <Activity className="h-8 w-8 text-teal-600" />,
      title: "Health Analytics",
      description: "Advanced health tracking with AI insights, predictive analytics, and personalized recommendations.",
      details: ["Health dashboard", "Trend analysis", "Risk assessment", "Progress reports"],
      color: "border-teal-200 bg-gradient-to-br from-teal-50 to-teal-100/50"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-cyan-600" />,
      title: "24/7 Support Chat",
      description: "Instant messaging with healthcare providers, AI health assistant, and emergency support.",
      details: ["Instant responses", "Multi-language", "File sharing", "Voice notes"],
      color: "border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100/50"
    }
  ];

  const userTypes = [
    {
      title: "Patients",
      description: "Start your complete HIV prevention and wellness journey today",
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      features: [
        "Free self-registration in 2 minutes",
        "Choose from 50+ partner hospitals",
        "Access to free condoms & lubricants",
        "PrEP/PEP management tools",
        "Violence support services",
        "Mental health resources",
        "Peer support networks",
        "Telehealth consultations"
      ],
      action: "Start Your Journey",
      path: "/patient-register",
      color: "border-blue-200 bg-gradient-to-br from-blue-50 via-blue-100/40 to-white",
      accent: "text-blue-600",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
    },
    {
      title: "Healthcare Heroes",
      description: "Doctors, nurses, counselors, PrEP champions & administrators - Access your powerful dashboard",
      icon: <Stethoscope className="h-8 w-8 text-green-600" />,
      features: [
        "Complete patient management",
        "Multi-hospital registration system",
        "Real-time analytics dashboard",
        "Appointment & queue management",
        "HD video consultation platform",
        "Team collaboration tools",
        "Inventory management",
        "Reporting & insights"
      ],
      action: "Access Dashboard",
      path: "/auth/login",
      color: "border-green-200 bg-gradient-to-br from-green-50 via-green-100/40 to-white",
      accent: "text-green-600",
      buttonStyle: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Patients", icon: <Users className="h-6 w-6" /> },
    { number: "50+", label: "Partner Hospitals", icon: <Building2 className="h-6 w-6" /> },
    { number: "95%", label: "Adherence Rate", icon: <Activity className="h-6 w-6" /> },
    { number: "24/7", label: "Support Available", icon: <MessageSquare className="h-6 w-6" /> }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Clean SuperAdmin Portal Modal */}
      {showSuperAdminPortal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-1">
              <div className="bg-white">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-full shadow-xl">
                        <Crown className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Access
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Enter secret key to continue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-8 pb-8">
                  {/* Success/Error Message */}
                  {accessMessage && (
                    <div className={`p-4 rounded-lg text-center font-medium ${
                      messageType === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {accessMessage}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <Label htmlFor="secretKey" className="text-sm font-medium text-gray-700">
                      Secret Key
                    </Label>
                    <Input
                      id="secretKey"
                      type="password"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      placeholder="Enter secret key"
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-yellow-500"
                      onKeyDown={handleKeyPress}
                      autoFocus
                      disabled={messageType === 'success'}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleSecretKeySubmit}
                      disabled={!secretKey.trim() || messageType === 'success'}
                      className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Crown className="mr-3 h-5 w-5 text-yellow-400" />
                      {messageType === 'success' ? 'Accessing...' : 'Access Admin Panel'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowSuperAdminPortal(false);
                        setAccessMessage('');
                        setMessageType('');
                        setSecretKey('');
                      }}
                      disabled={messageType === 'success'}
                      className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 py-6 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-md">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PrEP/PEP Care
                </span>
                <p className="text-xs text-gray-500">Complete HIV Prevention</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="hover:bg-gray-50 text-gray-700" 
                onClick={() => handleNavigation('/auth/login')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Staff Portal
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md" 
                onClick={() => handleNavigation('/patient-register')}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center space-x-3 mb-8">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-6 py-2 border-0">
              <Sparkles className="mr-2 h-4 w-4 text-purple-600" />
              AI-Powered Healthcare
            </Badge>
            <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800 px-6 py-2 border-0">
              <Star className="mr-2 h-4 w-4 text-emerald-600" />
              Free for Patients
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Revolutionary
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}HIV Prevention{" "}
            </span>
            <br />
            & Wellness Platform
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Complete care ecosystem for PrEP, PEP, condom access, violence support, and holistic health. 
            Connecting patients with healthcare heroes through cutting-edge technology.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                <div className="flex justify-center mb-3 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-12 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transform hover:-translate-y-1 transition-all duration-200" 
              onClick={() => handleNavigation('/patient-register')}
            >
              <UserPlus className="mr-3 h-6 w-6" />
              Register Free - Start Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-12 py-7 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50" 
              onClick={() => handleNavigation('/auth/login')}
            >
              <Stethoscope className="mr-3 h-6 w-6" />
              Healthcare Staff Login
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced User Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/60 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Choose Your Portal</h2>
            <p className="text-2xl text-gray-600">Two powerful platforms, one unified mission</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {userTypes.map((type, index) => (
              <Card key={index} className={`${type.color} border hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1`}>
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                      {type.icon}
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900">{type.title}</CardTitle>
                      <CardDescription className="text-gray-600 text-lg mt-2">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-10">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${type.buttonStyle} py-7 text-lg font-semibold`}
                    onClick={() => handleNavigation(type.path)}
                  >
                    {type.action}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-lg text-gray-700">
              <strong className="text-gray-900 text-xl">Healthcare Staff:</strong> Your account is created by administrators. 
              Doctors can register patients directly. Contact your admin for credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Complete Care Features</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for complete HIV prevention and wellness support in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`${feature.color} border hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 cursor-pointer`}
                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
              >
                <CardHeader>
                  <div className="p-4 bg-white rounded-xl w-fit mb-6 shadow-sm">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base">{feature.description}</CardDescription>
                </CardHeader>
                {activeFeature === index && (
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Violence Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="p-4 bg-white/20 rounded-full w-fit mx-auto mb-8 backdrop-blur-sm">
              <SafetyIcon />
            </div>
            <h2 className="text-5xl font-bold mb-6">Safe Space for Everyone</h2>
            <p className="text-2xl opacity-90 mb-8">
              Confidential support for survivors of emotional, physical, and sexual violence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Phone className="h-12 w-12 mb-4" />
                <CardTitle className="text-xl">24/7 Crisis Hotline</CardTitle>
                <CardDescription className="text-white/80">
                  Immediate support from trained counselors anytime you need
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Users className="h-12 w-12 mb-4" />
                <CardTitle className="text-xl">Support Groups</CardTitle>
                <CardDescription className="text-white/80">
                  Connect with survivors in a safe, moderated environment
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Shield className="h-12 w-12 mb-4" />
                <CardTitle className="text-xl">Legal & Medical Help</CardTitle>
                <CardDescription className="text-white/80">
                  Access to legal aid, medical care, and safe house referrals
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="text-lg px-12 py-7 bg-white text-purple-600 hover:bg-gray-100" 
              onClick={() => handleNavigation('/support')}
            >
              <Heart className="mr-3 h-6 w-6" />
              Access Support Services
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="p-6 bg-white/20 rounded-full w-fit mx-auto mb-10 backdrop-blur-sm">
            <Heart className="h-20 w-20 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8">Your Health Journey Starts Here</h2>
          <p className="text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
            Join thousands taking control of their health with complete HIV prevention, 
            wellness support, and a caring community
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-14 py-8 bg-white text-purple-600 hover:bg-gray-100 shadow-xl transform hover:-translate-y-1 transition-all duration-200" 
              onClick={() => handleNavigation('/patient-register')}
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Start Free Registration
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-14 py-8 border-2 border-white text-black hover:bg-white/10" 
              onClick={() => handleNavigation('/learn-more')}
            >
              Learn More
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">PrEP/PEP Care</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8">
                Complete HIV prevention and wellness platform transforming healthcare delivery across Kenya.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Globe className="h-6 w-6" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 p-2">
                  <Mail className="h-6 w-6" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 p-2">
                  <Phone className="h-6 w-6" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-blue-600 p-2">
                  <MapPin className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Patient Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer" onClick={() => handleNavigation('/patient-register')}>
                  <UserPlus className="h-5 w-5" />
                  <span>Free Registration</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Calendar className="h-5 w-5" />
                  <span>Book Appointments</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Shield className="h-5 w-5" />
                  <span>PrEP/PEP Services</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>Violence Support</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Users className="h-5 w-5" />
                  <span>Peer Networks</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-400">Healthcare Staff</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer" onClick={() => handleNavigation('/auth/login')}>
                  <Stethoscope className="h-5 w-5" />
                  <span>Staff Portal</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Activity className="h-5 w-5" />
                  <span>Analytics Tools</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Video className="h-5 w-5" />
                  <span>Telehealth Platform</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Building2 className="h-5 w-5" />
                  <span>Hospital Network</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Users className="h-5 w-5" />
                  <span>Team Resources</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6 text-purple-400">Support & Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>24/7 Help Center</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="h-5 w-5" />
                  <span>Crisis Hotline</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Shield className="h-5 w-5" />
                  <span>Privacy Policy</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Building2 className="h-5 w-5" />
                  <span>Terms of Service</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>Contact Us</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2025 PrEP/PEP Care Platform. All rights reserved. Made with ❤️ in Kenya
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>ISO 27001 Certified</span>
                <span>•</span>
                <span>HIPAA Compliant</span>
                <span>•</span>
                <span>End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}