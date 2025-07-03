'use client';

import React, { useState, useMemo } from 'react';
import { 
  UserCheck, Plus, Search, Calendar,
  ChevronLeft, ChevronRight, Stethoscope,
  Clock, Star, Activity, Users, MoreVertical,
  Download
} from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  specialty: string;
  hospital: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Busy' | 'Off Duty' | 'On Leave';
  patients: number;
  experience: number;
  education: string;
  rating: number;
  nextAvailable: string;
  consultationFee: number;
  languagesSpoken: string[];
  joinedDate: string;
  isNew?: boolean;
}

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'busy' | 'off-duty' | 'on-leave'>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<'all' | 'hiv' | 'prep' | 'infectious' | 'internal'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extended doctors data
  const allDoctors: Doctor[] = [
    { 
      id: 1, 
      name: 'Dr. Michael Johnson',
      age: 45,
      gender: 'Male',
      specialty: 'HIV Specialist', 
      hospital: 'Kenyatta National Hospital',
      department: 'Infectious Disease Unit',
      email: 'mjohnson@knh.com',
      phone: '+254 700 123 456',
      status: 'Active', 
      patients: 156,
      experience: 12,
      education: 'MD, PhD - University of Nairobi',
      rating: 4.9,
      nextAvailable: 'Today 2:00 PM',
      consultationFee: 3000,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2012-03-15',
      isNew: true
    },
    { 
      id: 2, 
      name: 'Dr. Sarah Williams',
      age: 38,
      gender: 'Female',
      specialty: 'Infectious Disease',
      hospital: 'Aga Khan University Hospital',
      department: 'Internal Medicine',
      email: 'swilliams@akuh.com',
      phone: '+254 700 234 567',
      status: 'Active', 
      patients: 132,
      experience: 8,
      education: 'MBBS, Masters in Infectious Disease',
      rating: 4.8,
      nextAvailable: 'Tomorrow 9:00 AM',
      consultationFee: 2500,
      languagesSpoken: ['English', 'Kiswahili', 'French'],
      joinedDate: '2016-06-20'
    },
    { 
      id: 3, 
      name: 'Dr. James Smith',
      age: 52,
      gender: 'Male',
      specialty: 'Internal Medicine',
      hospital: 'Nairobi Hospital',
      department: 'General Medicine',
      email: 'jsmith@nairobihospital.com',
      phone: '+254 700 345 678',
      status: 'Busy', 
      patients: 189,
      experience: 15,
      education: 'MD, Fellowship in Internal Medicine',
      rating: 4.7,
      nextAvailable: 'Thursday 10:00 AM',
      consultationFee: 3500,
      languagesSpoken: ['English'],
      joinedDate: '2009-01-10'
    },
    { 
      id: 4, 
      name: 'Dr. Emily Brown',
      age: 34,
      gender: 'Female',
      specialty: 'PrEP Specialist',
      hospital: 'Mater Hospital',
      department: 'HIV Prevention Clinic',
      email: 'ebrown@materhospital.com',
      phone: '+254 700 456 789',
      status: 'Active', 
      patients: 98,
      experience: 6,
      education: 'MBBS, Diploma in HIV Medicine',
      rating: 4.9,
      nextAvailable: 'Today 4:30 PM',
      consultationFee: 2000,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2018-09-05'
    },
    { 
      id: 5, 
      name: 'Dr. Peter Omondi',
      age: 41,
      gender: 'Male',
      specialty: 'HIV Specialist',
      hospital: 'MP Shah Hospital',
      department: 'Infectious Disease',
      email: 'pomondi@mpshah.com',
      phone: '+254 700 567 890',
      status: 'Off Duty', 
      patients: 145,
      experience: 10,
      education: 'MD, MSc Tropical Medicine',
      rating: 4.6,
      nextAvailable: 'Monday 8:00 AM',
      consultationFee: 2800,
      languagesSpoken: ['English', 'Kiswahili', 'Luo'],
      joinedDate: '2014-04-12'
    },
    { 
      id: 6, 
      name: 'Dr. Grace Muthoni',
      age: 36,
      gender: 'Female',
      specialty: 'Infectious Disease',
      hospital: 'Karen Hospital',
      department: 'Internal Medicine',
      email: 'gmuthoni@karenhospital.com',
      phone: '+254 700 678 901',
      status: 'Active', 
      patients: 112,
      experience: 7,
      education: 'MBBS, PGD in Infectious Disease',
      rating: 4.8,
      nextAvailable: 'Today 5:00 PM',
      consultationFee: 2700,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2017-02-28'
    },
    { 
      id: 7, 
      name: 'Dr. Robert Kimani',
      age: 48,
      gender: 'Male',
      specialty: 'Internal Medicine',
      hospital: 'Gertrude\'s Children Hospital',
      department: 'General Medicine',
      email: 'rkimani@gertrudes.com',
      phone: '+254 700 789 012',
      status: 'Busy', 
      patients: 167,
      experience: 14,
      education: 'MD, Fellowship in Medicine',
      rating: 4.5,
      nextAvailable: 'Wednesday 11:00 AM',
      consultationFee: 3200,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2010-07-15'
    },
    { 
      id: 8, 
      name: 'Dr. Alice Wanjiru',
      age: 29,
      gender: 'Female',
      specialty: 'PrEP Specialist',
      hospital: 'Coptic Hospital',
      department: 'HIV Prevention',
      email: 'awanjiru@coptic.com',
      phone: '+254 700 890 123',
      status: 'On Leave', 
      patients: 76,
      experience: 4,
      education: 'MBBS, Certificate in HIV Care',
      rating: 4.7,
      nextAvailable: 'Next Week',
      consultationFee: 1800,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2020-11-20'
    },
    { 
      id: 9, 
      name: 'Dr. John Mutua',
      age: 55,
      gender: 'Male',
      specialty: 'HIV Specialist',
      hospital: 'Nairobi West Hospital',
      department: 'HIV Care Center',
      email: 'jmutua@nairobiwest.com',
      phone: '+254 700 901 234',
      status: 'Active', 
      patients: 203,
      experience: 20,
      education: 'MD, PhD in Virology',
      rating: 4.9,
      nextAvailable: 'Tomorrow 2:00 PM',
      consultationFee: 4000,
      languagesSpoken: ['English', 'Kiswahili', 'German'],
      joinedDate: '2004-05-10'
    },
    { 
      id: 10, 
      name: 'Dr. Mary Achieng',
      age: 42,
      gender: 'Female',
      specialty: 'Infectious Disease',
      hospital: 'Avenue Hospital',
      department: 'Internal Medicine',
      email: 'machieng@avenue.com',
      phone: '+254 700 012 345',
      status: 'Active', 
      patients: 154,
      experience: 11,
      education: 'MBBS, Masters in Public Health',
      rating: 4.8,
      nextAvailable: 'Today 3:00 PM',
      consultationFee: 2900,
      languagesSpoken: ['English', 'Kiswahili', 'Luo'],
      joinedDate: '2013-08-25'
    },
    { 
      id: 11, 
      name: 'Dr. Daniel Odhiambo',
      age: 37,
      gender: 'Male',
      specialty: 'Internal Medicine',
      hospital: 'Mediheal Hospital',
      department: 'General Medicine',
      email: 'dodhiambo@mediheal.com',
      phone: '+254 700 111 222',
      status: 'Busy', 
      patients: 128,
      experience: 9,
      education: 'MD, Residency in Internal Medicine',
      rating: 4.6,
      nextAvailable: 'Friday 9:00 AM',
      consultationFee: 2600,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2015-03-18'
    },
    { 
      id: 12, 
      name: 'Dr. Ruth Wambui',
      age: 33,
      gender: 'Female',
      specialty: 'PrEP Specialist',
      hospital: 'South B Hospital',
      department: 'HIV Prevention',
      email: 'rwambui@southb.com',
      phone: '+254 700 222 333',
      status: 'Active', 
      patients: 92,
      experience: 5,
      education: 'MBBS, Diploma in STI Management',
      rating: 4.7,
      nextAvailable: 'Today 6:00 PM',
      consultationFee: 2200,
      languagesSpoken: ['English', 'Kiswahili'],
      joinedDate: '2019-06-30'
    }
  ];

  // Filter logic with proper dependencies
  const filteredDoctors = useMemo(() => {
    let filtered = [...allDoctors];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      const statusMap = {
        'active': 'Active',
        'busy': 'Busy',
        'off-duty': 'Off Duty',
        'on-leave': 'On Leave'
      } as const;
      filtered = filtered.filter(doctor => doctor.status === statusMap[statusFilter]);
    }

    // Specialty filter
    if (specialtyFilter !== 'all') {
      const specialtyMap = {
        'hiv': 'HIV Specialist',
        'prep': 'PrEP Specialist',
        'infectious': 'Infectious Disease',
        'internal': 'Internal Medicine'
      } as const;
      filtered = filtered.filter(doctor => doctor.specialty === specialtyMap[specialtyFilter]);
    }

    return filtered;
  }, [searchTerm, statusFilter, specialtyFilter, allDoctors]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Stats calculations
  const totalDoctors = allDoctors.length;
  const activeDoctors = allDoctors.filter(d => d.status === 'Active').length;
  const busyDoctors = allDoctors.filter(d => d.status === 'Busy').length;
  const offDutyDoctors = allDoctors.filter(d => d.status === 'Off Duty' || d.status === 'On Leave').length;
  const totalPatients = allDoctors.reduce((sum, d) => sum + d.patients, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Busy': return 'bg-yellow-100 text-yellow-700';
      case 'Off Duty': return 'bg-red-100 text-red-700';
      case 'On Leave': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Activity className="w-3 h-3" />;
      case 'Busy': return <Clock className="w-3 h-3" />;
      case 'Off Duty': return <UserCheck className="w-3 h-3" />;
      case 'On Leave': return <Calendar className="w-3 h-3" />;
      default: return null;
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, specialtyFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            Healthcare Providers
          </h1>
          <p className="text-gray-600 mt-1 ml-11">Manage doctors and medical staff across all facilities</p>
        </div>
        <div className="flex space-x-3">
          <button 
            type="button"
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            aria-label="Export doctors data"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            type="button"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center shadow-lg"
            aria-label="Add new doctor"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Stats Cards with Gradients */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Doctors - Green Gradient */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Doctors</p>
          <p className="text-2xl font-bold mt-1">{totalDoctors}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">All providers</span>
            <UserCheck className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* Active - Blue Gradient */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Active Now</p>
          <p className="text-2xl font-bold mt-1">{activeDoctors}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Available</span>
            <Activity className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* Busy - Pink Gradient */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Busy</p>
          <p className="text-2xl font-bold mt-1">{busyDoctors}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">In consultation</span>
            <Clock className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* Off Duty - Yellow Gradient */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Off Duty</p>
          <p className="text-2xl font-bold mt-1">{offDutyDoctors}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Unavailable</span>
            <Calendar className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* Total Patients - Purple Gradient */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Patients</p>
          <p className="text-2xl font-bold mt-1">{totalPatients.toLocaleString()}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Under care</span>
            <Users className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search doctors by name, hospital, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search doctors"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Status Filters */}
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'all'}
          >
            All Status
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'active' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'active'}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></div>
            Active
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('busy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'busy' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'busy'}
          >
            <div className="w-2 h-2 bg-yellow-500 rounded-full" aria-hidden="true"></div>
            Busy
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('off-duty')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'off-duty' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'off-duty'}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></div>
            Off Duty
          </button>

          <div className="border-l border-gray-300 mx-2" aria-hidden="true"></div>

          {/* Specialty Filters */}
          <button
            type="button"
            onClick={() => setSpecialtyFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              specialtyFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={specialtyFilter === 'all'}
          >
            All Specialties
          </button>
          <button
            type="button"
            onClick={() => setSpecialtyFilter('hiv')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              specialtyFilter === 'hiv' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={specialtyFilter === 'hiv'}
          >
            HIV Specialist
          </button>
          <button
            type="button"
            onClick={() => setSpecialtyFilter('prep')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              specialtyFilter === 'prep' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={specialtyFilter === 'prep'}
          >
            PrEP Specialist
          </button>
          <button
            type="button"
            onClick={() => setSpecialtyFilter('infectious')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              specialtyFilter === 'infectious' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={specialtyFilter === 'infectious'}
          >
            Infectious Disease
          </button>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospital</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patients</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Available</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDoctors.map((doctor, index) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        doctor.gender === 'Male' 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-br from-pink-500 to-pink-600'
                      }`}>
                        <span className="text-white font-medium text-sm">
                          {doctor.name.split(' ')[1]?.charAt(0) || doctor.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                          {doctor.isNew && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">NEW</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{doctor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {doctor.age} yrs
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{doctor.hospital}</p>
                    <p className="text-xs text-gray-500">{doctor.department}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      doctor.specialty === 'HIV Specialist' ? 'bg-purple-100 text-purple-700' :
                      doctor.specialty === 'PrEP Specialist' ? 'bg-blue-100 text-blue-700' :
                      doctor.specialty === 'Infectious Disease' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {doctor.specialty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${getStatusColor(doctor.status)}`}>
                      {getStatusIcon(doctor.status)}
                      {doctor.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">
                    {doctor.patients}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(doctor.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{doctor.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {doctor.nextAvailable}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`More actions for ${doctor.name}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredDoctors.length)} of {filteredDoctors.length} doctors
            </p>
            
            <nav className="flex items-center gap-2" aria-label="Pagination">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-1 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Go to previous page"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded text-sm font-medium ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-gray-400" aria-hidden="true">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-1 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                aria-label="Go to next page"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}