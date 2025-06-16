"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield, UserPlus, Crown, Building2, Mail, Phone, MapPin, Eye, EyeOff, 
  Activity, Edit, Trash2, Search, Filter, Zap, Target, Star,
  Monitor, Brain, Globe, Code, Users, CheckCircle, AlertTriangle,
  Lock, Unlock, Sparkles, Diamond, Award, Settings
} from 'lucide-react';

// Mock data for existing admins
const existingAdmins = [
  {
    id: 1, name: 'Dr. Michael Ochieng', email: 'michael.o@knh.go.ke', hospital: 'Kenyatta National Hospital',
    status: 'active', created: '2024-03-15', lastLogin: '2 hours ago', permissions: ['user_management', 'reports', 'settings'],
    patientsManaged: 1234, doctorsSupervised: 45, location: 'Nairobi', phone: '+254712345678'
  },
  {
    id: 2, name: 'Grace Wanjiku', email: 'grace.w@coast.go.ke', hospital: 'Coast General Hospital',
    status: 'active', created: '2024-02-20', lastLogin: '1 day ago', permissions: ['user_management', 'reports'],
    patientsManaged: 890, doctorsSupervised: 32, location: 'Mombasa', phone: '+254723456789'
  },
  {
    id: 3, name: 'James Kiprotich', email: 'james.k@pending.com', hospital: 'Regional Medical Center',
    status: 'pending', created: '2025-06-10', lastLogin: 'Never', permissions: ['pending'],
    patientsManaged: 0, doctorsSupervised: 0, location: 'Kisumu', phone: '+254734567890'
  },
  {
    id: 4, name: 'Mary Nyambura', email: 'mary.n@suspended.com', hospital: 'City Hospital',
    status: 'suspended', created: '2024-01-10', lastLogin: '2 weeks ago', permissions: ['suspended'],
    patientsManaged: 567, doctorsSupervised: 23, location: 'Nakuru', phone: '+254745678901'
  }
];

const availableHospitals = [
  { id: 1, name: 'Kenyatta National Hospital', location: 'Nairobi', type: 'Public', hasAdmin: true },
  { id: 2, name: 'Coast General Hospital', location: 'Mombasa', type: 'Public', hasAdmin: true },
  { id: 3, name: 'Aga Khan Hospital', location: 'Nairobi', type: 'Private', hasAdmin: false },
  { id: 4, name: 'Mater Hospital', location: 'Nairobi', type: 'Private', hasAdmin: false },
  { id: 5, name: 'MP Shah Hospital', location: 'Nairobi', type: 'Private', hasAdmin: false },
  { id: 6, name: 'Holy Family Hospital', location: 'Nairobi', type: 'Christian', hasAdmin: false }
];

const permissionLevels = [
  { id: 'user_management', name: 'User Management', description: 'Create and manage doctors, prep champions', icon: <Users className="h-4 w-4" /> },
  { id: 'patient_oversight', name: 'Patient Oversight', description: 'View patient data and reports', icon: <Activity className="h-4 w-4" /> },
  { id: 'reports', name: 'Reports & Analytics', description: 'Generate hospital reports', icon: <Target className="h-4 w-4" /> },
  { id: 'settings', name: 'Hospital Settings', description: 'Configure hospital preferences', icon: <Settings className="h-4 w-4" /> },
  { id: 'financial', name: 'Financial Access', description: 'View revenue and billing data', icon: <Diamond className="h-4 w-4" /> },
  { id: 'emergency', name: 'Emergency Override', description: 'Emergency access to all systems', icon: <Zap className="h-4 w-4" /> }
];

export default function AdminRegistrationCenter() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  const [newAdmin, setNewAdmin] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    hospitalId: string;
    permissions: string[];
    emergencyContact: string;
    notes: string;
    securityLevel: string;
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    hospitalId: '',
    permissions: [],
    emergencyContact: '',
    notes: '',
    securityLevel: 'standard'
  });

  const [recentActivity, setRecentActivity] = useState([
    'Administrative Dashboard Loaded',
    'User Management Module Ready',
    'Hospital Network Connected', 
    'Executive Access Confirmed'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        'New Administrator Application Received',
        'User Profile Review Completed',
        'Hospital Network Status: Connected',
        'Access Permissions Updated',
        'Administrative Report Generated'
      ];
      setRecentActivity(prev => [
        ...prev.slice(-3),
        updates[Math.floor(Math.random() * updates.length)]
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewAdmin(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setNewAdmin(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleCreateAdmin = async () => {
    setLoading(true);
    // Simulate admin creation
    setTimeout(() => {
      setLoading(false);
      setShowCreateForm(false);
      setNewAdmin({
        name: '', email: '', password: '', confirmPassword: '', phone: '',
        hospitalId: '', permissions: [], emergencyContact: '', notes: '', securityLevel: 'standard'
      });
      // Add to recent activity
      setRecentActivity(prev => [...prev, `New Administrator Created: ${newAdmin.name}`]);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0';
      case 'pending': return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0';
      case 'suspended': return 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-600 text-white border-0';
    }
  };

  const filteredAdmins = existingAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || admin.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const availableHospitalsForAdmin = availableHospitals.filter(hospital => !hospital.hasAdmin);

  return (
    <div className="space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen p-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Crown className="h-10 w-10 text-amber-300" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
                  Administrative Center
                </h1>
                <p className="text-blue-200 text-lg font-medium">Executive Management Portal • Administrator Access</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-4 py-2 bg-emerald-600/30 rounded-full border border-emerald-400/50">
                <span className="text-emerald-300 text-sm font-medium">Platform Online</span>
              </div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Recent Activity Feed */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white text-lg">
                <Activity className="mr-2 h-5 w-5 text-blue-300" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-24 overflow-y-auto">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-sm text-blue-200 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                    {activity}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Executive Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Active Admins</p>
                <p className="text-3xl font-bold">{existingAdmins.filter(a => a.status === 'active').length}</p>
                <p className="text-emerald-200 text-xs">+12% this month</p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <Shield className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Pending Reviews</p>
                <p className="text-3xl font-bold">{existingAdmins.filter(a => a.status === 'pending').length}</p>
                <p className="text-amber-200 text-xs">Requires attention</p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Partner Hospitals</p>
                <p className="text-3xl font-bold">{availableHospitals.length}</p>
                <p className="text-blue-200 text-xs">Nationwide network</p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <Building2 className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Available Slots</p>
                <p className="text-3xl font-bold">{availableHospitalsForAdmin.length}</p>
                <p className="text-purple-200 text-xs">Ready for assignment</p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <Star className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-blue-900 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Crown className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Administrative Management Panel</CardTitle>
                <CardDescription className="text-slate-300">Manage hospital administrators across the healthcare network</CardDescription>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => setScanning(!scanning)}
                className={`bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white border-0 shadow-lg ${scanning ? 'animate-pulse' : ''}`}
              >
                <Monitor className="mr-2 h-4 w-4" />
                {scanning ? 'Reviewing Network...' : 'Network Review'}
              </Button>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0 shadow-lg"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create New Administrator
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search administrators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="border-slate-300 focus:border-blue-500">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0">
              <Globe className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admin Directory */}
      <div className="grid gap-6">
        {filteredAdmins.map((admin) => (
          <Card key={admin.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    {admin.status === 'active' && admin.permissions.includes('emergency') && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-800">{admin.name}</h3>
                      <Badge className={getStatusColor(admin.status)}>
                        {admin.status.toUpperCase()}
                      </Badge>
                      {admin.status === 'active' && admin.permissions.includes('emergency') && (
                        <Badge className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0">
                          <Zap className="mr-1 h-3 w-3" />
                          EMERGENCY ACCESS
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 mb-3">
                      <span className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-blue-500" />
                        {admin.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-green-500" />
                        {admin.phone}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-purple-500" />
                        {admin.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-slate-500 mb-3">
                      <span className="font-medium">{admin.hospital}</span>
                      <span>Created: {admin.created}</span>
                      <span>Last Login: {admin.lastLogin}</span>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {admin.patientsManaged} Patients
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {admin.doctorsSupervised} Doctors
                      </div>
                      <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {admin.permissions.length} Permissions
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {admin.status === 'active' ? (
                    <Button variant="outline" size="sm" className="border-amber-300 text-amber-600 hover:bg-amber-50">
                      <Lock className="h-4 w-4" />
                    </Button>
                  ) : admin.status === 'suspended' ? (
                    <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50">
                      <Unlock className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Admin Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
              <CardTitle className="text-2xl font-bold flex items-center">
                <div className="p-2 bg-white/20 rounded-xl mr-3">
                  <Crown className="h-6 w-6 text-amber-300" />
                </div>
                Create New Hospital Administrator
              </CardTitle>
              <CardDescription className="text-blue-200">
                Add a new administrator with comprehensive hospital management access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300">
                <Crown className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <strong>Administrative Action:</strong> You are creating a new hospital administrator with enhanced management privileges.
                </AlertDescription>
              </Alert>

              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Administrator Profile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-700 font-medium">Full Name *</Label>
                    <Input
                      name="name"
                      value={newAdmin.name}
                      onChange={handleInputChange}
                      className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Dr. Administrator Name"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-medium">Email Address *</Label>
                    <Input
                      name="email"
                      type="email"
                      value={newAdmin.email}
                      onChange={handleInputChange}
                      className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="admin@hospital.com"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-medium">Phone Number</Label>
                    <Input
                      name="phone"
                      value={newAdmin.phone}
                      onChange={handleInputChange}
                      className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+254712345678"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-medium">Hospital Assignment *</Label>
                    <Select value={newAdmin.hospitalId} onValueChange={(value: string) => setNewAdmin({...newAdmin, hospitalId: value})}>
                      <SelectTrigger className="mt-2 border-slate-300 focus:border-blue-500">
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableHospitalsForAdmin.map((hospital) => (
                          <SelectItem key={hospital.id} value={hospital.id.toString()}>
                            {hospital.name} - {hospital.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Security Configuration */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Account Security</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-700 font-medium">Temporary Password *</Label>
                    <div className="relative mt-2">
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={newAdmin.password}
                        onChange={handleInputChange}
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Generate secure password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-slate-500 hover:text-slate-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-700 font-medium">Security Clearance</Label>
                    <Select value={newAdmin.securityLevel} onValueChange={(value:string) => setNewAdmin({...newAdmin, securityLevel: value})}>
                      <SelectTrigger className="mt-2 border-slate-300 focus:border-blue-500">
                        <SelectValue placeholder="Select clearance level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Access</SelectItem>
                        <SelectItem value="elevated">Elevated Privileges</SelectItem>
                        <SelectItem value="maximum">Maximum Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Access Permissions */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Access Permissions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {permissionLevels.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={newAdmin.permissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="mt-1 w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {permission.icon}
                          <Label className="text-slate-800 font-semibold">{permission.name}</Label>
                        </div>
                        <p className="text-sm text-slate-600">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-700 font-medium">Emergency Contact</Label>
                    <Input
                      name="emergencyContact"
                      value={newAdmin.emergencyContact}
                      onChange={handleInputChange}
                      className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="+254712345678"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-slate-700 font-medium">Administrative Notes</Label>
                  <Textarea
                    name="notes"
                    value={newAdmin.notes}
                    onChange={handleInputChange}
                    className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Special instructions or notes about this administrator..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateAdmin}
                  disabled={loading || !newAdmin.name || !newAdmin.email || !newAdmin.hospitalId}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                >
                  {loading ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Creating Administrator...
                    </>
                  ) : (
                    <>
                      <Crown className="mr-2 h-4 w-4" />
                      Create Administrator
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}