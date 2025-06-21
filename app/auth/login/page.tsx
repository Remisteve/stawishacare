"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Stethoscope,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Users,
  Activity,
  Heart,
  Building2
} from 'lucide-react';

export default function AuthLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Demo authentication - different credentials for different roles
      setTimeout(() => {
        if (formData.email === 'admin@hospital1.ke' && formData.password === 'admin123') {
          router.push('/admin');
        } else if (formData.email === 'doctor@hospital1.ke' && formData.password === 'doctor123') {
          router.push('/dashboard/doctor');
        } else if (formData.email === 'champion@hospital1.ke' && formData.password === 'champion123') {
          router.push('/dashboard/prep-champion');
        } else {
          setErrors({
            email: '',
            password: 'Invalid credentials. Please try again.'
          });
        }
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setErrors({
        email: '',
        password: 'Authentication failed. Please try again.'
      });
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-24 text-white">
          {/* Brand */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-4 rounded-2xl mr-4">
                <Stethoscope className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Healthcare Portal</h1>
                <p className="text-xl text-white/90">Staff Access Center</p>
              </div>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              Access your professional dashboard to manage patients, appointments, 
              and provide comprehensive HIV prevention care.
            </p>
          </div>

          {/* Platform Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3" />
              Professional Tools
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Users className="h-6 w-6" />, label: "Patient Management", number: "2,500+" },
                { icon: <Heart className="h-6 w-6" />, label: "PrEP Services", number: "1,200+" },
                { icon: <Building2 className="h-6 w-6" />, label: "Partner Facilities", number: "50+" },
                { icon: <Activity className="h-6 w-6" />, label: "Daily Consultations", number: "150+" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex justify-center mb-4 bg-gradient-to-r from-white/20 to-white/10 p-3 rounded-xl w-fit shadow-lg text-white">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Access Info */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Demo Access
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="font-semibold text-white mb-1">Hospital Admin</div>
                <div className="text-white/80">admin@hospital1.ke / admin123</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="font-semibold text-white mb-1">Doctor</div>
                <div className="text-white/80">doctor@hospital1.ke / doctor123</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="font-semibold text-white mb-1">PrEP Champion</div>
                <div className="text-white/80">champion@hospital1.ke / champion123</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Back to Home Button */}
          <Button
            variant="ghost"
            className="mb-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleBackToHome}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
            <CardHeader className="text-center pb-8 pt-10">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-emerald-600 to-blue-600 p-5 rounded-full shadow-2xl">
                    <Lock className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Staff Login
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg mt-3">
                Access your professional dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-8">
              {/* Info Notice */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4 border border-blue-200/50">
                <div className="flex items-center space-x-2 text-blue-700 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold text-sm">Healthcare Professional Access</span>
                </div>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Use your facility-provided credentials to access the platform
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-emerald-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="h-12 px-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                    <KeyRound className="h-4 w-4 mr-2 text-emerald-500" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="h-12 px-4 pr-12 bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-base"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="mr-2 h-5 w-5" />
                      Access Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Mobile Demo Credentials */}
              <div className="lg:hidden mt-6">
                <div className="text-center text-sm text-gray-600 mb-4 font-semibold">Demo Credentials:</div>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">Admin:</div>
                    <div className="text-gray-600">admin@hospital1.ke / admin123</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">Doctor:</div>
                    <div className="text-gray-600">doctor@hospital1.ke / doctor123</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">PrEP Champion:</div>
                    <div className="text-gray-600">champion@hospital1.ke / champion123</div>
                  </div>
                </div>
              </div>

              {/* Security Footer */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
                  <Shield className="h-3 w-3" />
                  <span>Secure healthcare professional access</span>
                  <span>•</span>
                  <span>HIPAA compliant</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}