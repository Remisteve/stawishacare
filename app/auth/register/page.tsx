"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Crown, Shield, Mail, Eye, EyeOff, User, Phone, ArrowLeft, ArrowRight,
  AlertTriangle, CheckCircle, Loader2, Lock, Building2, Briefcase,
  Globe, UserPlus, ShieldCheck, Fingerprint, Binary, Terminal,
  Network, Database, Key, Layers, Cpu, ChevronRight, Award,
  FileText, Hash, Code2, Zap, Star, BadgeCheck, Sparkles
} from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SuperAdminRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [animateIn, setAnimateIn] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    department: '',
    employeeId: '',
    password: '',
    confirmPassword: '',
    accessLevel: 'executive'
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    department: '',
    employeeId: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Executive email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid executive email';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.organization) {
      newErrors.organization = 'Organization is required';
      isValid = false;
    }

    if (!formData.title) {
      newErrors.title = 'Job title is required';
      isValid = false;
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
      isValid = false;
    }

    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep3 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 12) {
      newErrors.password = 'Password must be at least 12 characters for executive accounts';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, number, and special character';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // You can add additional user data to Firestore here
      router.push('/superadmin/login?registered=true');
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format";
      }
      
      setErrors({ ...errors, password: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/superadmin/login');
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: <User className="h-5 w-5" /> },
    { number: 2, title: 'Organization', icon: <Building2 className="h-5 w-5" /> },
    { number: 3, title: 'Security', icon: <Lock className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                width: Math.random() * 200 + 100 + 'px',
                height: Math.random() * 200 + 100 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))`,
                borderRadius: i % 2 === 0 ? '50%' : '30%',
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${30 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className={`w-full max-w-2xl relative z-10 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button
          variant="ghost"
          className="mb-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-300 group"
          onClick={handleBackToLogin}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Button>

        <Card className="bg-white/90 backdrop-blur-3xl border border-gray-200/50 shadow-2xl shadow-gray-500/10 overflow-visible relative group hover:shadow-3xl hover:shadow-gray-500/20 transition-all duration-500">
          {/* Animated border glow */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700"></div>
          
          <CardHeader className="text-center pb-8 pt-10 relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 p-7 rounded-3xl shadow-2xl">
                  <UserPlus className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
              EXECUTIVE ACCESS REQUEST
            </CardTitle>
            <CardDescription className="text-gray-600 text-xl font-light">
              Apply for SuperAdmin privileges
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-10 pb-10 relative z-10">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-10">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                      currentStep >= step.number 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30' 
                        : 'bg-gray-200 border border-gray-300'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <span className={`${currentStep >= step.number ? 'text-white' : 'text-gray-500'}`}>
                          {step.icon}
                        </span>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-semibold ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}`}>
                        Step {step.number}
                      </p>
                      <p className={`text-xs ${currentStep >= step.number ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 h-0.5 w-20 transition-all duration-500 ${
                      currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/50">
              <div className="flex items-center space-x-3 text-amber-700 mb-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-bold text-sm uppercase tracking-wide">Verification Required</span>
              </div>
              <p className="text-xs text-amber-600/80 leading-relaxed">
                All executive access requests undergo thorough verification. You will be contacted within 24-48 hours.
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                        First Name
                      </Label>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.firstName && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <span>{errors.firstName}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Last Name
                      </Label>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.lastName && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <span>{errors.lastName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      Executive Email
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@prepcare.ke"
                        className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                      Phone Number
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254 700 000 000"
                        className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.phone && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Organization Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="space-y-3">
                    <Label htmlFor="organization" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                      Organization
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="PrEP Care Kenya"
                        className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.organization && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{errors.organization}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                        Job Title
                      </Label>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Chief Technology Officer"
                          className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.title && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <span>{errors.title}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="department" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                        <Layers className="h-4 w-4 mr-2 text-blue-600" />
                        Department
                      </Label>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                        <Input
                          id="department"
                          name="department"
                          type="text"
                          value={formData.department}
                          onChange={handleInputChange}
                          placeholder="Technology & Innovation"
                          className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.department && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <span>{errors.department}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="employeeId" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-blue-600" />
                      Employee ID
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="employeeId"
                        name="employeeId"
                        type="text"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        placeholder="EMP-00001"
                        className="relative h-14 px-5 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500 font-mono"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.employeeId && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{errors.employeeId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Security Setup */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  {/* Password Requirements */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200/50">
                    <div className="flex items-center space-x-3 text-blue-700 mb-3">
                      <Key className="h-5 w-5" />
                      <span className="font-bold text-sm uppercase tracking-wide">Executive Password Requirements</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs text-blue-600/80">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Minimum 12 characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Uppercase letters (A-Z)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Lowercase letters (a-z)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Numbers (0-9)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>Special characters (@$!%*?&)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>No personal information</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-blue-600" />
                      Create Password
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter secure password"
                        className="relative h-14 px-5 pr-12 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
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

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-blue-600" />
                      Confirm Password
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter password"
                        className="relative h-14 px-5 pr-12 bg-white/80 border-2 border-gray-200/80 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>

                  {/* Access Level Display */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-3 text-purple-700 mb-2">
                          <Crown className="h-5 w-5" />
                          <span className="font-bold text-sm uppercase tracking-wide">Access Level</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">EXECUTIVE</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BadgeCheck className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="h-14 px-8 border-2 border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900 font-semibold transition-all duration-300"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Previous
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNextStep}
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 ml-auto"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="h-14 px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 ml-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-3 h-5 w-5" />
                        Submit Access Request
                        <ChevronRight className="ml-3 h-5 w-5" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Terms Notice */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                By submitting this request, you agree to our{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                  Terms of Service
                </span>
                {', '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                {', and '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                  Executive Code of Conduct
                </span>
              </p>
            </div>

            {/* Security Footer */}
            <div className="text-center pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 font-mono">
                <span className="flex items-center">
                  <Database className="h-3 w-3 mr-2" />
                  DATA ENCRYPTED
                </span>
                <span className="flex items-center">
                  <ShieldCheck className="h-3 w-3 mr-2" />
                  VERIFIED PROCESS
                </span>
                <span className="flex items-center">
                  <Fingerprint className="h-3 w-3 mr-2" />
                  BIOMETRIC READY
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(20px) scale(1.05);
            opacity: 0.1;
          }
        }
        
        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}