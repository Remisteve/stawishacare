"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Eye, EyeOff, Shield, ArrowLeft, AlertTriangle, Building2, Users, Crown } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: '',
    hospitalId: '',
    specialization: '',
    phone: '',
    department: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

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

    if (!formData.role) {
      setError('Please select a role');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        displayName: formData.displayName,
        role: formData.role,
        hospitalId: formData.hospitalId || undefined,
        specialization: formData.specialization || undefined,
        phone: formData.phone || undefined,
        department: formData.department || undefined,
        isApproved: false, // All staff accounts need approval
        createdAt: new Date().toISOString(),
        needsPasswordChange: true
      };

      await register(formData.email, formData.password, userData);
      router.push('/auth/login');
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
    formData.role;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Information Panel */}
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Building2 className="mr-3 h-6 w-6" />
                Staff Registration
              </CardTitle>
              <CardDescription className="text-blue-100">
                Join our healthcare team and make a difference in HIV prevention care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Crown className="mr-2 h-5 w-5 text-yellow-300" />
                    Account Creation Hierarchy
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold text-yellow-300">SuperAdmin</div>
                      <div className="text-blue-100">• Creates Admin accounts</div>
                      <div className="text-blue-100">• System-wide control</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold text-purple-200">Admin</div>
                      <div className="text-blue-100">• Creates Doctor accounts</div>
                      <div className="text-blue-100">• Creates PrEP Champion accounts</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold text-green-200">Doctors</div>
                      <div className="text-blue-100">• Register patients to their hospital</div>
                      <div className="text-blue-100">• Manage patient care</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold text-pink-200">Patients</div>
                      <div className="text-blue-100">• Self-register and choose hospital</div>
                      <div className="text-blue-100">• Or registered by their doctor</div>
                    </div>
                  </div>
                </div>

                <Alert className="bg-white/20 border-white/30">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-white">
                    <strong>Important:</strong> Your account must be approved by an administrator before you can access the system.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="mr-2 h-6 w-6 text-blue-600" />
                Create Staff Account
              </CardTitle>
              <CardDescription>
                Register for a new healthcare staff account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name *</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      type="text"
                      placeholder="Dr. John Smith"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.smith@hospital.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                {(formData.role === 'doctor' || formData.role === 'prep_champion') && (
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        name="department"
                        type="text"
                        placeholder="e.g., Internal Medicine"
                        value={formData.department}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
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
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
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
                  ) : (
                    'Create Staff Account'
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="text-blue-600 hover:text-blue-500 font-medium p-0 h-auto"
                      onClick={() => router.push('/auth/login')}
                    >
                      Sign in here
                    </Button>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Are you a patient?
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => router.push('/patient-register')}
                  >
                    Patient Registration
                  </Button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push('/')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}