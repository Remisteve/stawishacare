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

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
      setCountdown(120); // 2 minute countdown
      setCanResend(false);
    }, 2000);
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
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 opacity-50"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'grid 30s linear infinite'
            }}
          ></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-xl animate-float-orb"
              style={{
                width: Math.random() * 400 + 200 + 'px',
                height: Math.random() * 400 + 200 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${Math.random() > 0.5 ? '99, 102, 241' : '168, 85, 247'}, 0.15), transparent)`,
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
          className="mb-8 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
          onClick={handleBackToLogin}
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Button>

        <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-visible">
          {/* Animated border glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-all duration-500"></div>
          
          {step === 'email' && (
            <>
              <CardHeader className="text-center pb-8 pt-10 relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl">
                      <KeyRound className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-white tracking-tight mb-3">
                  PASSWORD RECOVERY
                </CardTitle>
                <CardDescription className="text-gray-400 text-xl font-light">
                  Secure executive account recovery
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-10 pb-10 relative z-10">
                {/* Security Notice */}
                <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-2xl p-5 border border-amber-500/20">
                  <div className="flex items-center space-x-3 text-amber-400 mb-3">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-bold text-sm uppercase tracking-wide">Security Protocol</span>
                  </div>
                  <p className="text-xs text-amber-300/80 leading-relaxed">
                    Recovery link will be sent to your registered executive email. 
                    Multi-factor authentication will be required.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-bold text-gray-300 flex items-center tracking-wider uppercase">
                      <Mail className="h-4 w-4 mr-2 text-indigo-400" />
                      Executive Email Address
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl blur-md group-focus-within:blur-lg transition-all"></div>
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
                        className="relative h-16 px-6 bg-black/50 border-2 border-indigo-500/30 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 text-white placeholder:text-gray-600 font-medium text-lg"
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>
                    {error && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm animate-in slide-in-from-top-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmitEmail}
                    className="w-full h-16 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xl shadow-2xl hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-300 tracking-wide group"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        VERIFYING EMAIL...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6" />
                        SEND RECOVERY CODE
                        <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Additional Security Info */}
                <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl p-6 border border-indigo-500/20">
                  <h4 className="text-sm font-bold text-indigo-400 mb-4 uppercase tracking-wide">Recovery Process</h4>
                  <div className="space-y-3 text-xs text-gray-400">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-[10px]">1</div>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-1">Email Verification</p>
                        <p>We'll send a 6-digit code to your registered email</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-[10px]">2</div>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-1">Code Verification</p>
                        <p>Enter the code within 2 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <div className="w-6 h-6 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-[10px]">3</div>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium mb-1">Reset Password</p>
                        <p>Create a new executive-level password</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-800">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-3xl shadow-2xl">
                      <Hash className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-white tracking-tight mb-3">
                  VERIFY YOUR IDENTITY
                </CardTitle>
                <CardDescription className="text-gray-400 text-xl font-light">
                  Enter the 6-digit code sent to {email}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-10 pb-10 relative z-10">
                {/* Timer Display */}
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-400" />
                      <span className="text-sm font-bold text-purple-400 uppercase tracking-wide">Time Remaining</span>
                    </div>
                    <div className={`text-2xl font-bold font-mono ${countdown < 30 ? 'text-red-400' : 'text-purple-400'}`}>
                      {formatTime(countdown)}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="code" className="text-sm font-bold text-gray-300 flex items-center tracking-wider uppercase">
                      <Binary className="h-4 w-4 mr-2 text-purple-400" />
                      Verification Code
                    </Label>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-md group-focus-within:blur-lg transition-all"></div>
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
                        className="relative h-16 px-6 bg-black/50 border-2 border-purple-500/30 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all duration-300 text-white placeholder:text-gray-600 font-mono text-2xl text-center tracking-[0.5em]"
                        disabled={isLoading}
                        maxLength={6}
                        autoFocus
                      />
                    </div>
                    {error && (
                      <div className="flex items-center space-x-2 text-red-400 text-sm animate-in slide-in-from-top-1">
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
                      className={`text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 ${
                        !canResend ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {canResend ? 'Resend Code' : `Resend available in ${formatTime(countdown)}`}
                    </Button>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl p-5 border border-indigo-500/20">
                  <div className="flex items-center space-x-3 text-indigo-400 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-bold text-xs uppercase tracking-wide">Security Notice</span>
                  </div>
                  <p className="text-xs text-indigo-300/80 leading-relaxed">
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
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-3xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-3xl shadow-2xl animate-in zoom-in duration-700">
                      <CheckCircle className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-4xl font-bold text-emerald-400 animate-in fade-in duration-700">
                  VERIFICATION SUCCESSFUL
                </CardTitle>
                <CardDescription className="text-gray-400 text-xl font-light mt-3 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                  Your identity has been verified
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-10 pb-10 relative z-10">
                <div className="text-center space-y-8">
                  <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-2xl p-6 border border-emerald-500/30 animate-in slide-in-from-bottom duration-700">
                    <div className="flex items-center justify-center space-x-3 text-emerald-400 mb-4">
                      <BadgeCheck className="h-6 w-6" />
                      <span className="font-bold text-lg tracking-wider uppercase">Next Steps</span>
                    </div>
                    <div className="space-y-3 text-sm text-emerald-300/80">
                      <p>A password reset link has been sent to your email.</p>
                      <p>The link will expire in 1 hour for security reasons.</p>
                      <p className="font-semibold">Check your inbox to continue.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-xl p-4 border border-gray-800">
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
          <div className="inline-flex items-center space-x-6 text-xs text-gray-600 font-mono bg-black/30 rounded-full px-6 py-3 border border-gray-800">
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
            transform: translateY(-60px) translateX(40px) scale(1.05);
          }
          66% { 
            transform: translateY(30px) translateX(-30px) scale(0.95);
          }
        }
        
        @keyframes grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .animate-float-orb {
          animation: float-orb ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}