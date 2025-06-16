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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2, Plus, MapPin, Phone, Mail, Globe, Shield, Heart, AlertTriangle, CheckCircle,
  Users, Activity, Eye, Edit, Trash2, Search, Filter, Database, Network, Info,
  Clock, Lock, Unlock, Target, Zap, Monitor, Brain, BarChart3, Calendar,
  DollarSign, TrendingUp, Gauge, Stethoscope
} from 'lucide-react';

// Mock hospital data
const existingHospitals = [
  {
    id: 1, name: 'Kenyatta National Hospital', location: 'Nairobi', county: 'Nairobi', 
    type: 'Public', status: 'active', established: '1901', website: 'www.knh.or.ke',
    phone: '+254-20-2726300', email: 'info@knh.or.ke', beds: 1800, doctors: 245, 
    patients: 2340, revenue: 23400, condomsAllowed: true, emergencyServices: true,
    specialties: ['Cardiology', 'Oncology', 'Pediatrics', 'HIV/AIDS'], 
    prepServices: true, pepServices: true, mchServices: true, violenceSupport: true,
    coordinates: { lat: -1.3031, lng: 36.8065 }
  },
  {
    id: 2, name: 'Coast General Hospital', location: 'Mombasa', county: 'Mombasa',
    type: 'Public', status: 'active', established: '1952', website: 'www.coastgeneral.go.ke',
    phone: '+254-41-2312191', email: 'info@coastgeneral.go.ke', beds: 650, doctors: 89,
    patients: 1560, revenue: 15600, condomsAllowed: true, emergencyServices: true,
    specialties: ['Emergency Medicine', 'Surgery', 'Maternity'], 
    prepServices: true, pepServices: true, mchServices: true, violenceSupport: true,
    coordinates: { lat: -4.0435, lng: 39.6682 }
  },
  {
    id: 3, name: 'Holy Family Hospital', location: 'Nairobi', county: 'Nairobi',
    type: 'Christian', status: 'active', established: '1965', website: 'www.holyfamily.or.ke',
    phone: '+254-20-2722218', email: 'info@holyfamily.or.ke', beds: 200, doctors: 45,
    patients: 780, revenue: 9800, condomsAllowed: false, emergencyServices: true,
    specialties: ['General Medicine', 'Surgery', 'Maternity'], 
    prepServices: false, pepServices: true, mchServices: true, violenceSupport: true,
    coordinates: { lat: -1.2921, lng: 36.8219 }
  },
  {
    id: 4, name: 'Aga Khan University Hospital', location: 'Nairobi', county: 'Nairobi',
    type: 'Private', status: 'active', established: '1958', website: 'www.agakhanhosp.org',
    phone: '+254-20-3662000', email: 'info@aku.edu', beds: 254, doctors: 78,
    patients: 1200, revenue: 18900, condomsAllowed: true, emergencyServices: true,
    specialties: ['Cardiology', 'Neurology', 'Transplant Surgery'], 
    prepServices: true, pepServices: true, mchServices: true, violenceSupport: true,
    coordinates: { lat: -1.2674, lng: 36.8065 }
  }
];

const countyOptions = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
  'Garissa', 'Kakamega', 'Nyeri', 'Machakos', 'Meru', 'Kericho', 'Embu'
];

type HospitalTypeOption = {
  value: string;
  label: string;
  description: string;
};

const hospitalTypes: HospitalTypeOption[] = [
  { value: 'public', label: 'Public Hospital', description: 'Government-owned facility' },
  { value: 'private', label: 'Private Hospital', description: 'Privately-owned facility' },
  { value: 'christian', label: 'Christian Hospital', description: 'Faith-based facility' },
  { value: 'islamic', label: 'Islamic Hospital', description: 'Islamic faith-based facility' },
  { value: 'ngo', label: 'NGO Hospital', description: 'Non-governmental organization' }
];

const specialtyOptions = [
  'General Medicine', 'Surgery', 'Pediatrics', 'Obstetrics & Gynecology', 'Cardiology',
  'Neurology', 'Oncology', 'Orthopedics', 'Emergency Medicine', 'Psychiatry',
  'HIV/AIDS', 'Infectious Diseases', 'Family Planning', 'Maternal Health'
];

export default function HospitalManagementSystem() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCounty, setFilterCounty] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('list');

  const [newHospital, setNewHospital] = useState({
    name: '',
    location: '',
    county: '',
    type: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    established: '',
    beds: '',
    description: '',
    specialties: [] as string[],
    condomsAllowed: true,
    emergencyServices: true,
    prepServices: true,
    pepServices: true,
    mchServices: true,
    violenceSupport: true,
    coordinates: { lat: '', lng: '' },
    licenseNumber: '',
    accreditation: '',
    insuranceAccepted: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewHospital(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setNewHospital(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setNewHospital(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleCreateHospital = async () => {
    setLoading(true);
    // Simulate hospital creation
    setTimeout(() => {
      setLoading(false);
      setShowCreateForm(false);
      setNewHospital({
        name: '', location: '', county: '', type: '', phone: '', email: '', website: '',
        address: '', established: '', beds: '', description: '', specialties: [],
        condomsAllowed: true, emergencyServices: true, prepServices: true, pepServices: true,
        mchServices: true, violenceSupport: true, coordinates: { lat: '', lng: '' },
        licenseNumber: '', accreditation: '', insuranceAccepted: []
      });
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Public': return 'bg-blue-100 text-blue-800';
      case 'Private': return 'bg-green-100 text-green-800';
      case 'Christian': return 'bg-purple-100 text-purple-800';
      case 'Islamic': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHospitals = existingHospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || hospital.type.toLowerCase() === filterType;
    const matchesCounty = filterCounty === 'all' || hospital.county === filterCounty;
    return matchesSearch && matchesType && matchesCounty;
  });

  const hospitalStats = {
    total: existingHospitals.length,
    active: existingHospitals.filter(h => h.status === 'active').length,
    public: existingHospitals.filter(h => h.type === 'Public').length,
    private: existingHospitals.filter(h => h.type === 'Private').length,
    christian: existingHospitals.filter(h => h.type === 'Christian').length,
    totalBeds: existingHospitals.reduce((sum, h) => sum + h.beds, 0),
    totalDoctors: existingHospitals.reduce((sum, h) => sum + h.doctors, 0),
    totalPatients: existingHospitals.reduce((sum, h) => sum + h.patients, 0),
    condomFriendly: existingHospitals.filter(h => h.condomsAllowed).length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Building2 className="mr-3 h-8 w-8 text-blue-600" />
              Hospital Management System
            </h1>
            <p className="text-gray-600 text-base mt-2">
              Comprehensive healthcare facility registration and management platform
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{hospitalStats.total}</div>
              <div className="text-xs font-medium text-gray-600">Total</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{hospitalStats.public}</div>
              <div className="text-xs font-medium text-gray-600">Public</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{hospitalStats.private}</div>
              <div className="text-xs font-medium text-gray-600">Private</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{hospitalStats.christian}</div>
              <div className="text-xs font-medium text-gray-600">Faith-Based</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{hospitalStats.totalBeds.toLocaleString()}</div>
              <div className="text-xs font-medium text-gray-600">Beds</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{hospitalStats.totalDoctors}</div>
              <div className="text-xs font-medium text-gray-600">Doctors</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{hospitalStats.totalPatients.toLocaleString()}</div>
              <div className="text-xs font-medium text-gray-600">Patients</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{hospitalStats.condomFriendly}</div>
              <div className="text-xs font-medium text-gray-600">Family Planning</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <TabsTrigger value="list" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Hospital Directory</TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-md">Network Map</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-md">Analytics</TabsTrigger>
        </TabsList>

        {/* HOSPITAL LIST TAB */}
        <TabsContent value="list" className="space-y-6">
          {/* Control Panel */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                  Hospital Management
                </CardTitle>
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Register Hospital
                </Button>
              </div>
              <CardDescription className="text-gray-600">
                Manage healthcare facilities and their service offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search hospitals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-200"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Filter by Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="christian">Christian</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCounty} onValueChange={setFilterCounty}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Filter by County" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="all">All Counties</SelectItem>
                    {countyOptions.map(county => (
                      <SelectItem key={county} value={county}>{county}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                  <Database className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hospital List */}
          <div className="grid gap-4">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Building2 className="h-8 w-8 text-blue-600" />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                          <Badge className={getTypeColor(hospital.type)}>
                            {hospital.type}
                          </Badge>
                          <Badge className={getStatusColor(hospital.status)}>
                            {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                          </Badge>
                          {!hospital.condomsAllowed && (
                            <Badge className="bg-red-100 text-red-800">
                              No Family Planning
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {hospital.location}, {hospital.county}
                          </span>
                          <span className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {hospital.phone}
                          </span>
                          <span className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            {hospital.email}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <span>Est: {hospital.established}</span>
                          <span>Beds: {hospital.beds}</span>
                          <span>Doctors: {hospital.doctors}</span>
                          <span>Patients: {hospital.patients}</span>
                          <span>Revenue: ${hospital.revenue.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {hospital.prepServices && (
                            <Badge className="bg-green-100 text-green-800 text-xs">PrEP</Badge>
                          )}
                          {hospital.pepServices && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">PEP</Badge>
                          )}
                          {hospital.mchServices && (
                            <Badge className="bg-pink-100 text-pink-800 text-xs">MCH</Badge>
                          )}
                          {hospital.violenceSupport && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs">GBV Support</Badge>
                          )}
                          {hospital.emergencyServices && (
                            <Badge className="bg-red-100 text-red-800 text-xs">Emergency</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-right mr-4">
                        <div className="text-lg font-bold text-gray-900">${hospital.revenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Monthly Revenue</div>
                      </div>
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* NETWORK MAP TAB */}
        <TabsContent value="map" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-12">
              <div className="text-center text-gray-600">
                <Globe className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Hospital Network Map</h3>
                <p className="text-gray-600">Interactive geographic distribution of healthcare facilities</p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Launch Map View
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-12">
              <div className="text-center text-gray-600">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Network Analytics</h3>
                <p className="text-gray-600">Comprehensive hospital performance metrics and insights</p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                  View Analytics Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Hospital Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                Register New Hospital
              </CardTitle>
              <CardDescription className="text-gray-600">
                Add a new healthcare facility to the network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Register a new hospital to expand healthcare access in your region
                </AlertDescription>
              </Alert>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Hospital Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700">Hospital Name *</Label>
                    <Input
                      name="name"
                      value={newHospital.name}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="Central Medical Center"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Hospital Type *</Label>
                    <Select
                      value={newHospital.type}
                      onValueChange={(value: string) =>
                        setNewHospital({ ...newHospital, type: value })
                      }
                    >
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {hospitalTypes.map((type: HospitalTypeOption) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-700">Location/City *</Label>
                    <Input
                      name="location"
                      value={newHospital.location}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="Nairobi"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">County *</Label>
                    <Select value={newHospital.county} onValueChange={(value: string) => setNewHospital({...newHospital, county: value})}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {countyOptions.map(county => (
                          <SelectItem key={county} value={county}>{county}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700">Established Year</Label>
                    <Input
                      name="established"
                      value={newHospital.established}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="2025"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700">Full Address</Label>
                  <Textarea
                    name="address"
                    value={newHospital.address}
                    onChange={handleInputChange}
                    className="bg-white border-gray-200"
                    placeholder="Complete hospital address"
                    rows={2}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-700">Phone Number *</Label>
                    <Input
                      name="phone"
                      value={newHospital.phone}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="+254-20-1234567"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Email Address *</Label>
                    <Input
                      name="email"
                      type="email"
                      value={newHospital.email}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="info@hospital.co.ke"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Website</Label>
                    <Input
                      name="website"
                      value={newHospital.website}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="www.hospital.co.ke"
                    />
                  </div>
                </div>
              </div>

              {/* Capacity & Licensing */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Capacity & Licensing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-700">Number of Beds</Label>
                    <Input
                      name="beds"
                      type="number"
                      value={newHospital.beds}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="200"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">License Number</Label>
                    <Input
                      name="licenseNumber"
                      value={newHospital.licenseNumber}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="HF-12345"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Accreditation</Label>
                    <Input
                      name="accreditation"
                      value={newHospital.accreditation}
                      onChange={handleInputChange}
                      className="bg-white border-gray-200"
                      placeholder="ISO, JCI, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Services Configuration */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Healthcare Services</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {[
                      { key: 'condomsAllowed', label: 'Family Planning Services', description: 'Contraceptive counseling and distribution' },
                      { key: 'prepServices', label: 'PrEP Services', description: 'Pre-exposure prophylaxis' },
                      { key: 'pepServices', label: 'PEP Services', description: 'Post-exposure prophylaxis' }
                    ].map((service) => (
                      <div key={service.key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          type="checkbox"
                          checked={newHospital[service.key as keyof typeof newHospital] as boolean}
                          onChange={(e) => handleCheckboxChange(service.key, e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div>
                          <Label className="text-gray-900 font-medium">{service.label}</Label>
                          <p className="text-xs text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: 'mchServices', label: 'MCH Services', description: 'Maternal & child health' },
                      { key: 'violenceSupport', label: 'GBV Support', description: 'Gender-based violence counseling' },
                      { key: 'emergencyServices', label: 'Emergency Services', description: '24/7 emergency care' }
                    ].map((service) => (
                      <div key={service.key} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          type="checkbox"
                          checked={newHospital[service.key as keyof typeof newHospital] as boolean}
                          onChange={(e) => handleCheckboxChange(service.key, e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div>
                          <Label className="text-gray-900 font-medium">{service.label}</Label>
                          <p className="text-xs text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Medical Specialties</h3>
                <div className="grid grid-cols-3 gap-2">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <input
                        type="checkbox"
                        checked={newHospital.specialties.includes(specialty)}
                        onChange={() => handleSpecialtyToggle(specialty)}
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <Label className="text-gray-900 text-sm">{specialty}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="border-gray-300 text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateHospital}
                  disabled={loading || !newHospital.name || !newHospital.type || !newHospital.location}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Registering Hospital...
                    </>
                  ) : (
                    <>
                      <Building2 className="mr-2 h-4 w-4" />
                      Register Hospital
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