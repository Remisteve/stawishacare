"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  Crown,
  Shield,
  Lock,
  ShieldCheck,
  BadgeCheck,
  Database,
  Cpu,
  Network,
  Sparkles,
  CheckCircle,
  Zap,
  Star
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SuperAdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Executive email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid executive email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Redirect to SuperAdmin Dashboard
      router.push("/superadmin");
    } catch (error: any) {
      let errorMessage = "Login failed. Please verify your credentials.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "Executive account not found";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Invalid password";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later";
      }
      
      setErrors({ email: "", password: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle animated grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              animation: 'grid-float 25s linear infinite'
            }}
          />
        </div>

        {/* Floating golden particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-particles"
              style={{
                width: Math.random() * 6 + 4 + 'px',
                height: Math.random() * 6 + 4 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, #fbbf24, #f59e0b)`,
                borderRadius: '50%',
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${20 + Math.random() * 10}s`,
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
              }}
            />
          ))}
        </div>

        {/* Large decorative shapes */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-200/10 to-yellow-200/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      <div className={`w-full max-w-lg relative z-10 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-8 text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 group border border-gray-200/50 shadow-sm"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>

        {/* Main Login Card */}
        <Card className="bg-white/95 backdrop-blur-3xl border border-gray-200/60 shadow-2xl shadow-gray-900/10 overflow-visible relative group hover:shadow-3xl hover:shadow-gray-900/15 transition-all duration-700">
          {/* Animated border effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
          
          {/* Golden Crown - Floating above card */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
            <div className="relative group/crown">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-3xl blur-2xl opacity-40 animate-pulse group-hover/crown:opacity-60 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-5 rounded-3xl shadow-2xl transform group-hover/crown:scale-110 transition-all duration-500">
                <Crown className="h-10 w-10 text-white drop-shadow-lg" />
                {/* Crown jewels effect */}
                <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-3 right-4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute bottom-4 left-1/2 w-1 h-1 bg-white rounded-full animate-ping animation-delay-2000"></div>
              </div>
            </div>
          </div>

          <CardHeader className="text-center pb-8 pt-20 relative z-10">
            {/* Main Icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-blue-700 to-slate-800 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-700 via-blue-800 to-slate-900 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                  <Shield className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            <CardTitle className="text-4xl font-bold text-gray-900 tracking-tight mb-3 relative">
              <span className="bg-gradient-to-r from-slate-700 via-blue-800 to-slate-900 bg-clip-text text-transparent">
                EXECUTIVE ACCESS
              </span>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </CardTitle>
            <CardDescription className="text-gray-600 text-xl font-light">
              SuperAdmin Control Center
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-10 pb-10 relative z-10">
            {/* Security Banner */}
            <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-300/20 to-yellow-400/20 rounded-full blur-2xl"></div>
              <div className="relative flex items-center space-x-3 text-amber-700 mb-3">
                <div className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl text-white shadow-lg">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide">ULTRA-SECURE ZONE</span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-amber-700/80 leading-relaxed font-medium">
                Multi-layered security protocol active. All access attempts are monitored and logged in real-time.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  Executive Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-sm group-focus-within:blur-md group-focus-within:opacity-100 opacity-0 transition-all duration-300"></div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    placeholder="executive@prepcare.ke"
                    className="relative h-14 px-5 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder:text-gray-500 font-medium shadow-inner"
                    autoFocus
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-top-1 bg-red-50 p-3 rounded-lg border border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-blue-600" />
                  Security Password
                </Label>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-sm group-focus-within:blur-md group-focus-within:opacity-100 opacity-0 transition-all duration-300"></div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    placeholder="••••••••••••••••"
                    className="relative h-14 px-5 pr-14 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder:text-gray-500 font-medium shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-top-1 bg-red-50 p-3 rounded-lg border border-red-200">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                className="w-full h-16 bg-gradient-to-r from-slate-700 via-blue-800 to-slate-900 hover:from-slate-800 hover:via-blue-900 hover:to-slate-950 text-white font-bold text-xl shadow-2xl hover:shadow-blue-900/30 transform hover:-translate-y-0.5 transition-all duration-300 tracking-wide group relative overflow-hidden"
                disabled={isLoading || !formData.email || !formData.password}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <Shield className="mr-3 h-6 w-6" />
                    ACCESS CONTROL PANEL
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>

            {/* Action Links */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => router.push("/superadmin/forgot-password")}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-all duration-300 group bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg"
              >
                <KeyRound className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Reset Password
              </button>
              <button
                onClick={() => router.push("/superadmin/register")}
                className="flex items-center text-amber-600 hover:text-amber-800 font-medium text-sm hover:underline transition-all duration-300 group bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg"
              >
                Request Access
                <Sparkles className="h-4 w-4 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>

            {/* Security Features Grid */}
            <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 rounded-2xl p-6 border border-gray-200/50">
              <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center">
                <BadgeCheck className="h-4 w-4 mr-2 text-blue-600" />
                Enterprise Security Features
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                {[
                  { icon: <Database className="h-3 w-3" />, label: "AES-256 Encryption" },
                  { icon: <Cpu className="h-3 w-3" />, label: "Hardware Security" },
                  { icon: <Network className="h-3 w-3" />, label: "Zero Trust Network" },
                  { icon: <Zap className="h-3 w-3" />, label: "Real-time Monitoring" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 p-2 bg-white/50 rounded-lg">
                    <div className="text-green-600">{feature.icon}</div>
                    <span className="font-medium">{feature.label}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 font-mono mb-3">
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                  SSL SECURED
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <Shield className="h-3 w-3 mr-1 text-blue-500" />
                  ENCRYPTED
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <Crown className="h-3 w-3 mr-1 text-amber-500" />
                  EXECUTIVE
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Protected by enterprise-grade security protocols
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float-particles {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-40px) translateX(30px);
            opacity: 0.8;
          }
        }
        
        @keyframes grid-float {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        .animate-float-particles {
          animation: float-particles ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}