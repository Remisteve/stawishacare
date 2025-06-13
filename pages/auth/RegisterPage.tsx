"use client"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye, EyeOff, Shield, ArrowLeft, Crown, AlertTriangle } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: '',
    hospitalId: '',
    specialization: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFirstUser, setIsFirstUser] = useState(false);
  const [checkingFirstUser, setCheckingFirstUser] = useState(true);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Check if this is the first user (SuperAdmin)
  useEffect(() => {
    const checkFirstUser = async () => {
      try {
        const usersQuery = query(collection(db, 'users'), where('role', '==', 'superadmin'));
        const existingSuperAdmins = await getDocs(usersQuery);
        setIsFirstUser(existingSuperAdmins.empty);
      } catch (error) {
        console.error('Error checking for existing users:', error);
        setIsFirstUser(false);
      } finally {
        setCheckingFirstUser(false);
      }
    };

    checkFirstUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!isFirstUser && !formData.role) {
      setError('Please select a role');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        displayName: formData.displayName,
        role: isFirstUser ? 'superadmin' : formData.role,
        hospitalId: formData.hospitalId || undefined,
        specialization: formData.specialization || undefined,
        phone: formData.phone || undefined,
      };

      await register(formData.email, formData.password, userData);
      
      if (isFirstUser) {
        navigate('/superadmin');
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formData.email && 
    formData.password && 
    formData.confirmPassword && 
    formData.displayName &&
    (isFirstUser || formData.role);

  if (checkingFirstUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className={`${isFirstUser ? 'bg-gradient-to-r from-red-600 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'} p-3 rounded-full`}>
              {isFirstUser ? <Crown className="h-6 w-6 text-white" /> : <Shield className="h-6 w-6 text-white" />}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isFirstUser ? 'Create SuperAdmin Account' : 'Staff Registration'}
          </CardTitle>
          <CardDescription className="text-center">
            {isFirstUser 
              ? 'Set up the first administrator account for the platform'
              : 'Register a new staff member account'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isFirstUser && (
            <Alert className="mb-4">
              <Crown className="h-4 w-4" />
              <AlertDescription>
                You're creating the first SuperAdmin account with full system access.
              </AlertDescription>
            </Alert>
          )}

          {!isFirstUser && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Staff accounts require approval before access is granted.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Full Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            {!isFirstUser && (
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={handleRoleChange} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Hospital Administrator</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="prep_champion">PrEP Champion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.role === 'doctor' && (
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="e.g., Internal Medicine, HIV Specialist"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : isFirstUser ? (
                'Create SuperAdmin Account'
              ) : (
                'Register Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {!isFirstUser && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                Are you a patient?
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/patient-register">
                  Patient Registration
                </Link>
              </Button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              asChild
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
