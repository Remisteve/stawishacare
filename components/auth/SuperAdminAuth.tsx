"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Crown, Shield, Eye, EyeOff, Lock, Sparkles, AlertTriangle, ArrowLeft, UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner';

export default function SuperAdminAuth() {
  const router = useRouter();
  const [mode, setMode] = useState<'secret' | 'login' | 'register'>('secret');
  const [formData, setFormData] = useState({
    secretWord: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusText, setStatusText] = useState('');

  const { login, register, currentUser, userData } = useAuth();

  // Check if user is already authenticated and is superadmin
  useEffect(() => {
    if (currentUser && userData?.role === 'superadmin') {
      router.push('/superadmin/SuperAdminDashboard');
    }
  }, [currentUser, userData, router]);

  // Animated typing effect for status text
  useEffect(() => {
    if (mode === 'secret') {
      const text = 'Please provide your authorization key to access the master control panel.\nAll access attempts are logged for security purposes.';
      let i = 0;
      setStatusText('');
      const timer = setInterval(() => {
        setStatusText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }
  }, [mode]);

  const handleSecretSubmit = () => {
    const validSecrets = ['remi', 'masteradmin', 'setup123'];
    if (validSecrets.includes(formData.secretWord.toLowerCase())) {
      setMode('login');
      setError('');
      toast.success("Access Granted - Please proceed with master authentication.");
    } else {
      setError('Invalid authorization key. Please try again.');
      toast.error("Access Denied - The authorization key you entered is not valid.");
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome - Successfully logged into the master control panel.");
      router.push('/superadmin/SuperAdminDashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle specific error cases for first-time setup
      if (error.message.includes('User data not found') || 
          error.message.includes('user not found') || 
          error.message.includes('no superadmin')) {
        setMode('register');
        setError('No master administrator account found. Please create the first master administrator account below.');
        toast.warning("Setup Required - Please create the first master administrator account.");
      } else if (error.message.includes('wrong-password') || 
                 error.message.includes('invalid-credential') ||
                 error.message.includes('invalid-login-credentials')) {
        setError('Invalid email or password. Please check your credentials.');
        toast.error("Login Failed - Please verify your email and password.");
      } else if (error.message.includes('user-not-found')) {
        setError('No account found with this email. Please create an account first.');
        toast.error("Account Not Found - Please create an account first.");
      } else if (error.message.includes('pending approval')) {
        setError('Your account is pending approval. Please contact your system administrator.');
        toast.error("Approval Required - Contact your administrator.");
      } else if (error.message.includes('too-many-requests')) {
        setError('Too many failed attempts. Please try again later.');
        toast.error("Rate Limited - Please wait before trying again.");
      } else {
        setError(error.message || 'Login failed. Please check your credentials.');
        toast.error("Login Failed - Please verify your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');

    // Validation
    if (!formData.displayName.trim()) {
      setError('Please enter your full name.');
      toast.error("Name Required - Please enter your full name.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error("Password Too Short - Must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      toast.error("Password Error - Please make sure both passwords are identical.");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        displayName: formData.displayName.trim(),
        role: "superadmin" as const,
        isApproved: true,
        createdAt: new Date()
      };

      await register(formData.email, formData.password, userData);
      toast.success("Account Created - Master administrator account has been created successfully!");
      
      // Auto-redirect after successful registration
      setTimeout(() => {
        router.push('/superadmin/SuperAdminDashboard');
      }, 1500);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.message.includes('email-already-in-use')) {
        setError('An account with this email already exists. Try logging in instead.');
        toast.error("Email In Use - Try logging in instead.");
      } else if (error.message.includes('SuperAdmin already exists')) {
        setError('A Master Administrator account already exists. Please contact your administrator.');
        toast.error("Master Admin Exists - Contact your administrator.");
      } else if (error.message.includes('weak-password')) {
        setError('Password is too weak. Please choose a stronger password.');
        toast.error("Weak Password - Please choose a stronger password.");
      } else if (error.message.includes('invalid-email')) {
        setError('Please enter a valid email address.');
        toast.error("Invalid Email - Please enter a valid email address.");
      } else {
        setError(error.message || 'Failed to create account. Please try again.');
        toast.error("Setup Failed - Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear error when user starts typing
  const handleInputChange = (field: string, value: string) => {
    setFormData({...formData, [field]: value});
    if (error) setError('');
  };

  // Enhanced Enter key handling functions
  const handleSecretKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formData.secretWord.trim()) {
        handleSecretSubmit();
      }
    }
  };

  const handleLoginKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formData.email && formData.password && !loading) {
        handleLogin();
      }
    }
  };

  const handleRegisterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formData.email && formData.password && 
          formData.displayName && formData.confirmPassword && 
          formData.password === formData.confirmPassword && !loading) {
        handleRegister();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center p-4 py-6">
      {/* Beautiful background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-tr from-purple-100 to-pink-200 rounded-full opacity-60 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      {/* Main Card */}
      <Card className="w-full max-w-lg bg-white/95 backdrop-blur-sm shadow-2xl border-0 relative z-10 overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
        
        <CardHeader className="text-center pb-4 pt-6">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl shadow-lg border border-amber-200">
              <Crown className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
            {mode === 'secret' && 'Master Access Portal'}
            {mode === 'login' && 'Master Login'}
            {mode === 'register' && 'Setup Master Administrator'}
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            {mode === 'secret' && 'Secure master access portal'}
            {mode === 'login' && 'Welcome back, Master'}
            {mode === 'register' && 'Create master account'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-6">
          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {mode === 'secret' && (
            <div className="space-y-3">
              <div className="p-3 bg-gradient-to-r from-blue-50 via-emerald-50 to-teal-50 rounded-lg border border-blue-100 shadow-inner">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
                  <span className="text-emerald-700 font-semibold text-sm animate-pulse">Master System Ready</span>
                  <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-gray-700 text-xs text-center leading-relaxed min-h-[2.5rem] font-mono">
                  {statusText}
                  <span className="animate-pulse text-emerald-600">|</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Master Authorization Key</Label>
                <Input
                  type="password"
                  value={formData.secretWord}
                  onChange={(e) => handleInputChange('secretWord', e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your master access key"
                  autoFocus
                  onKeyDown={handleSecretKeyDown}
                />
              </div>

              <Button
                onClick={handleSecretSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                disabled={!formData.secretWord}
              >
                <Lock className="mr-2 h-4 w-4" />
                Continue to Master Portal
              </Button>
            </div>
          )}

          {mode === 'login' && (
            <div className="space-y-3">
              <div className="text-center mb-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm border border-emerald-200 shadow-sm">
                  <Shield className="h-3 w-3" />
                  <span>Master Access Authorized</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Master Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-200"
                  placeholder="master@company.com"
                  onKeyDown={handleLoginKeyDown}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Master Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 pr-10 transition-colors duration-200"
                    placeholder="Enter your master password"
                    onKeyDown={handleLoginKeyDown}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={loading || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Accessing Master Control...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Enter Master Control
                  </>
                )}
              </Button>

              {/* Manual switch to register mode */}
              <Button
                variant="outline"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className="w-full border-dashed border-gray-300 text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors duration-200"
                disabled={loading}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create First Master Account
              </Button>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-3">
              <Alert className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 py-2">
                <Crown className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700 font-medium text-sm">
                  Setting up the first master administrator account
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Master Name</Label>
                <Input
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                  placeholder="Master Administrator Name"
                  onKeyDown={handleRegisterKeyDown}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Master Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                  placeholder="master@company.com"
                  onKeyDown={handleRegisterKeyDown}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Master Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 pr-10 transition-colors duration-200"
                    placeholder="Create a secure master password (min 6 chars)"
                    onKeyDown={handleRegisterKeyDown}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Confirm Master Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 pr-10 transition-colors duration-200"
                    placeholder="Confirm your master password"
                    onKeyDown={handleRegisterKeyDown}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleRegister}
                disabled={loading || !formData.email || !formData.password || !formData.displayName || formData.password !== formData.confirmPassword}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Creating Master Account...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Create Master Account
                  </>
                )}
              </Button>

              {/* Back to login option */}
              <Button
                variant="outline"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className="w-full border-dashed border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors duration-200"
                disabled={loading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Back to Master Login
              </Button>
            </div>
          )}

          <div className="text-center pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-xs"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Beautiful status indicator */}
      <div className="fixed bottom-6 right-6 flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">Master Portal</span>
        </div>
      </div>
    </div>
  );
}