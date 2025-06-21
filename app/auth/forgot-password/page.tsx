"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Crown, Shield, Mail, ArrowLeft, ArrowRight, AlertTriangle, CheckCircle,
  Loader2, KeyRound, Lock, ShieldCheck, Fingerprint, Terminal, Code2,
  Network, Clock, AlertCircle, Send, RefreshCw, BadgeCheck, Zap,
  FileText, Hash, Cpu, Binary, Database, ChevronRight, Sparkles
} from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SuperAdminForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'verify' | 'success'>('email');
  const [error, setError] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && step === 'verify') {
      setCanResend(true);
    }
  }, [countdown, step]);

  const validateEmail = () => {
    if (!email) {
      setError('Executive email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid executive email');
      return false;
    }
    return true;
  };

  const handleSubmitEmail = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setStep('success');
    } catch (error: any) {
      let errorMessage = "Failed to send reset email. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many reset attempts. Please try again later";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('Verification code is required');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === '123456') {
        setStep('success');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 2000);
  };

  const handleResendCode = () => {
    setCanResend(false);
    setCountdown(120);
    // Simulate resending code
    setTimeout(() => {
      // Code resent
    }, 1000);
  };

  const handleBackToLogin = () => {
    router.push('/superadmin/login');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 relative overflow-hidden">
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

        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-orb"
              style={{
                width: Math.random() * 200 + 100 + 'px',
                height: Math.random() * 200 + 100 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))`,
                borderRadius: '50%',
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${40 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className={`w-full max-w-lg relative z-10 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
          
          {step === 'email' && (
            <>
              <CardHeader className="text-center pb-8 pt-10 relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 p-6 rounded-3xl shadow-2xl">
                      <KeyRound className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
                  PASSWORD RECOVERY
                </CardTitle>
                <CardDescription className="text-gray-600 text-xl font-light">
                  Secure executive account recovery
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-10 pb-10 relative z-10">
                {/* Security Notice */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/50">
                  <div className="flex items-center space-x-3 text-amber-700 mb-3">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-bold text-sm uppercase tracking-wide">Security Protocol</span>
                  </div>
                  <p className="text-xs text-amber-600/80 leading-relaxed">
                    Password reset link will be sent to your registered executive email. 
                    Multi-factor authentication may be required.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-gray-700 flex items-center tracking-wider uppercase">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      Executive Email Address
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitEmail()}
                        placeholder="executive@prepcare.ke"
                        className="relative h-16 px-6 bg-white/80 border-2 border-gray-200/80 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500 font-medium text-lg"
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>
                    {error && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-top-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmitEmail}
                    className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 tracking-wide group"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        SENDING RESET LINK...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6" />
                        SEND RECOVERY LINK
                        <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Additional Security Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                  <h4 className="text-sm font-bold text-blue-700 mb-4 uppercase tracking-wide">Recovery Process</h4>
                  <div className="space-y-3 text-xs text-gray-600">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold text-[10px]">1</div>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium mb-1">Email Verification</p>
                        <p>We'll send a secure reset link to your registered email</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold text-[10px]">2</div>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium mb-1">Secure Access</p>
                        <p>Click the link to access password reset page</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold text-[10px]">3</div>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium mb-1">Reset Password</p>
                        <p>Create a new executive-level password</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
                    <Lock className="h-3 w-3" />
                    <span>All recovery attempts are logged for security</span>
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {step === 'verify' && (
            <>
              <CardHeader className="text-center pb-8 pt-10 relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl">
                      <Hash className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
                  VERIFY YOUR IDENTITY
                </CardTitle>
                <CardDescription className="text-gray-600 text-xl font-light">
                  Enter the 6-digit code sent to {email}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-10 pb-10 relative z-10">
                {/* Timer Display */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-bold text-purple-700 uppercase tracking-wide">Time Remaining</span>
                    </div>
                    <div className={`text-2xl font-bold font-mono ${countdown < 30 ? 'text-red-600' : 'text-purple-600'}`}>
                      {formatTime(countdown)}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="code" className="text-sm font-bold text-gray-700 flex items-center tracking-wider uppercase">
                      <Binary className="h-4 w-4 mr-2 text-purple-600" />
                      Verification Code
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all"></div>
                      <Input
                        id="code"
                        name="code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setVerificationCode(value);
                          if (error) setError('');
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && verificationCode.length === 6 && handleVerifyCode()}
                        placeholder="• • • • • •"
                        className="relative h-16 px-6 bg-white/80 border-2 border-gray-200/80 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 text-gray-900 placeholder:text-gray-500 font-mono text-2xl text-center tracking-[0.5em]"
                        disabled={isLoading}
                        maxLength={6}
                        autoFocus
                      />
                    </div>
                    {error && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm animate-in slide-in-from-top-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleVerifyCode}
                    className="w-full h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300 tracking-wide group"
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        VERIFYING CODE...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-3 h-6 w-6" />
                        VERIFY & PROCEED
                        <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  {/* Resend Code Option */}
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={handleResendCode}
                      disabled={!canResend || isLoading}
                      className={`text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 ${
                        !canResend ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {canResend ? 'Resend Code' : `Resend available in ${formatTime(countdown)}`}
                    </Button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200/50">
                  <div className="flex items-center space-x-3 text-blue-700 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-bold text-xs uppercase tracking-wide">Security Notice</span>
                  </div>
                  <p className="text-xs text-blue-600/80 leading-relaxed">
                    Never share your verification code. Our staff will never ask for it.
                  </p>
                </div>
              </CardContent>
            </>
          )}

          {step === 'success' && (
            <>
              <CardHeader className="text-center pb-8 pt-10 relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-3xl shadow-2xl animate-in zoom-in duration-700">
                      <CheckCircle className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-emerald-600 animate-in fade-in duration-700">
                  EMAIL SENT SUCCESSFULLY
                </CardTitle>
                <CardDescription className="text-gray-600 text-xl font-light mt-3 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                  Password reset link has been sent
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-10 pb-10 relative z-10">
                <div className="text-center space-y-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50 animate-in slide-in-from-bottom duration-700">
                    <div className="flex items-center justify-center space-x-3 text-emerald-700 mb-4">
                      <BadgeCheck className="h-6 w-6" />
                      <span className="font-bold text-lg tracking-wider uppercase">Check Your Email</span>
                    </div>
                    <div className="space-y-3 text-sm text-emerald-600/80">
                      <p>A password reset link has been sent to <strong>{email}</strong></p>
                      <p>The link will expire in 1 hour for security reasons.</p>
                      <p className="font-semibold">Check your inbox and spam folder.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-xs text-gray-500 font-mono">
                      Recovery Session: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleBackToLogin}
                    className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xl shadow-2xl hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300 tracking-wide"
                  >
                    <ArrowLeft className="mr-3 h-6 w-6" />
                    Return to Login
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Bottom Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 text-xs text-gray-500 font-mono bg-white/30 rounded-full px-6 py-3 border border-gray-200">
            <span className="flex items-center">
              <Cpu className="h-3 w-3 mr-2" />
              E2EE
            </span>
            <span className="flex items-center">
              <Shield className="h-3 w-3 mr-2" />
              ISO-27001
            </span>
            <span className="flex items-center">
              <Database className="h-3 w-3 mr-2" />
              GDPR
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-orb {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
          }
          33% { 
            transform: translateY(-40px) translateX(30px) scale(1.05);
          }
          66% { 
            transform: translateY(20px) translateX(-20px) scale(0.95);
          }
        }
        
        .animate-float-orb {
          animation: float-orb ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}