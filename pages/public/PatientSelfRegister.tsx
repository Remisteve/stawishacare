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
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, EyeOff, Heart, ArrowLeft, MapPin, Building2, CheckCircle, Shield } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Hospital {
  id: string;
  name: string;
  location: string;
  features: {
    hasCondomServices: boolean;
    isPrepProvider: boolean;
    isPepProvider: boolean;
  };
  distance?: number;
}

export default function PatientSelfRegister() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    phone: '',
    location: '',
    hospitalId: '',
    patientStatus: '',
    age: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hospitalsLoading, setHospitalsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Fetch available hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalsQuery = query(collection(db, 'hospitals'));
        const snapshot = await getDocs(hospitalsQuery);
        const hospitalData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Hospital[];
        setHospitals(hospitalData);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setError('Failed to load hospitals. Please try again.');
      } finally {
        setHospitalsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'hospitalId') {
      const hospital = hospitals.find(h => h.id === value);
      setSelectedHospital(hospital || null);
    }
    
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

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    if (!formData.hospitalId) {
      setError('Please select a hospital');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        displayName: formData.displayName,
        role: 'patient' as const,
        hospitalId: formData.hospitalId,
        hospitalName: selectedHospital?.name,
        phone: formData.phone,
        location: formData.location,
        patientStatus: formData.patientStatus as 'prep' | 'pep' | 'condom' | 'general',
        videoUploadStatus: 'pending' as const
      };

      await register(formData.email, formData.password, userData);
      navigate('/patient');
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
    formData.phone &&
    formData.location &&
    formData.hospitalId &&
    formData.patientStatus &&
    agreedToTerms;

  const getServiceBadges = (hospital: Hospital) => {
    const badges = [];
    if (hospital.features.isPrepProvider) badges.push('PrEP');
    if (hospital.features.isPepProvider) badges.push('PEP');
    if (hospital.features.hasCondomServices) badges.push('Condom Services');
    return badges;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Patient Registration
            </CardTitle>
            <CardDescription className="text-center">
              Join our PrEP/PEP care community and take control of your health
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Full Name *</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="120"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location/Address *</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="City, State/Region"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Emergency Contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      type="text"
                      placeholder="Emergency contact name"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      type="tel"
                      placeholder="Emergency contact phone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Service Requested *</h3>
                <Select 
                  value={formData.patientStatus} 
                  onValueChange={(value) => handleSelectChange('patientStatus', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the service you need" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prep">PrEP (Pre-Exposure Prophylaxis)</SelectItem>
                    <SelectItem value="pep">PEP (Post-Exposure Prophylaxis)</SelectItem>
                    <SelectItem value="condom">Condom Services</SelectItem>
                    <SelectItem value="general">General HIV Prevention Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hospital Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Choose Hospital *
                </h3>
                
                {hospitalsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading hospitals...
                  </div>
                ) : (
                  <Select 
                    value={formData.hospitalId} 
                    onValueChange={(value) => handleSelectChange('hospitalId', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hospital near you" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map((hospital) => (
                        <SelectItem key={hospital.id} value={hospital.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{hospital.name}</span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {hospital.location}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {selectedHospital && (
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{selectedHospital.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedHospital.location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Available Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {getServiceBadges(selectedHospital).map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Security</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
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
                        placeholder="Confirm your password"
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
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={setAgreedToTerms}
                    disabled={loading}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>.
                    I understand that my information will be shared with my selected hospital for care coordination.
                  </Label>
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
                  'Create Patient Account'
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

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 mb-2">
                Are you a healthcare provider?
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/register">
                  Staff Registration
                </Link>
              </Button>
            </div>

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
    </div>
  );
}
