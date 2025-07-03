'use client';

import React, { useState, useMemo } from 'react';
import { 
  UserPlus, Plus, Search, CheckCircle, Clock, XCircle,
  ChevronLeft, ChevronRight, Users, Activity, Award,
  MapPin, AlertCircle, Shield, Pill, CalendarDays, MoreVertical, Heart
} from 'lucide-react';

interface Enrollment {
  id: number;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female';
  patientPhone: string;
  patientEmail: string;
  patientLocation: string;
  program: 'PrEP Program' | 'HIV Treatment' | 'Prevention Program' | 'PEP Program';
  enrollmentDate: string;
  enrollmentTime: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Suspended' | 'Dropped Out';
  doctor: string;
  facility: string;
  nextAppointment: string | null;
  adherenceRate: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  viralLoad?: string;
  cd4Count?: number;
  lastVisit: string;
  missedAppointments: number;
  isNew?: boolean;
}

export default function Enrollments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState<'all' | 'prep' | 'treatment' | 'prevention' | 'pep'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'completed' | 'suspended'>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extended enrollments data
  const allEnrollments: Enrollment[] = [
    {
      id: 1,
      patientName: 'Alice Wanjiku',
      patientAge: 24,
      patientGender: 'Female',
      patientPhone: '+254 700 111 222',
      patientEmail: 'alice.w@email.com',
      patientLocation: 'Nairobi',
      program: 'PrEP Program',
      enrollmentDate: '2024-01-25',
      enrollmentTime: '09:30 AM',
      status: 'Active',
      doctor: 'Dr. Johnson',
      facility: 'Kenyatta National Hospital',
      nextAppointment: '2024-02-25',
      adherenceRate: 95,
      riskLevel: 'Low',
      lastVisit: '2024-01-25',
      missedAppointments: 0,
      isNew: true
    },
    {
      id: 2,
      patientName: 'John Kimani',
      patientAge: 31,
      patientGender: 'Male',
      patientPhone: '+254 700 222 333',
      patientEmail: 'john.k@email.com',
      patientLocation: 'Mombasa',
      program: 'HIV Treatment',
      enrollmentDate: '2024-01-10',
      enrollmentTime: '11:00 AM',
      status: 'Active',
      doctor: 'Dr. Williams',
      facility: 'Aga Khan Hospital',
      nextAppointment: '2024-02-10',
      adherenceRate: 88,
      riskLevel: 'Medium',
      viralLoad: '<50 copies/ml',
      cd4Count: 450,
      lastVisit: '2024-01-20',
      missedAppointments: 1
    },
    {
      id: 3,
      patientName: 'Grace Muthoni',
      patientAge: 28,
      patientGender: 'Female',
      patientPhone: '+254 700 333 444',
      patientEmail: 'grace.m@email.com',
      patientLocation: 'Kisumu',
      program: 'PrEP Program',
      enrollmentDate: '2024-01-20',
      enrollmentTime: '02:15 PM',
      status: 'Pending',
      doctor: 'Dr. Smith',
      facility: 'Nairobi Hospital',
      nextAppointment: '2024-01-30',
      adherenceRate: 0,
      riskLevel: 'High',
      lastVisit: '2024-01-20',
      missedAppointments: 0
    },
    {
      id: 4,
      patientName: 'Peter Ochieng',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+254 700 444 555',
      patientEmail: 'peter.o@email.com',
      patientLocation: 'Nakuru',
      program: 'Prevention Program',
      enrollmentDate: '2024-01-05',
      enrollmentTime: '10:45 AM',
      status: 'Completed',
      doctor: 'Dr. Brown',
      facility: 'Mater Hospital',
      nextAppointment: null,
      adherenceRate: 92,
      riskLevel: 'Low',
      lastVisit: '2024-01-25',
      missedAppointments: 0
    },
    {
      id: 5,
      patientName: 'Sarah Njeri',
      patientAge: 22,
      patientGender: 'Female',
      patientPhone: '+254 700 555 666',
      patientEmail: 'sarah.n@email.com',
      patientLocation: 'Eldoret',
      program: 'PEP Program',
      enrollmentDate: '2024-01-24',
      enrollmentTime: '03:30 PM',
      status: 'Active',
      doctor: 'Dr. Johnson',
      facility: 'MP Shah Hospital',
      nextAppointment: '2024-01-31',
      adherenceRate: 100,
      riskLevel: 'Critical',
      lastVisit: '2024-01-24',
      missedAppointments: 0,
      isNew: true
    },
    {
      id: 6,
      patientName: 'Michael Omondi',
      patientAge: 35,
      patientGender: 'Male',
      patientPhone: '+254 700 666 777',
      patientEmail: 'michael.o@email.com',
      patientLocation: 'Thika',
      program: 'HIV Treatment',
      enrollmentDate: '2023-12-15',
      enrollmentTime: '09:00 AM',
      status: 'Active',
      doctor: 'Dr. Williams',
      facility: 'Karen Hospital',
      nextAppointment: '2024-02-05',
      adherenceRate: 78,
      riskLevel: 'High',
      viralLoad: '1,250 copies/ml',
      cd4Count: 320,
      lastVisit: '2024-01-15',
      missedAppointments: 3
    },
    {
      id: 7,
      patientName: 'Mary Akinyi',
      patientAge: 27,
      patientGender: 'Female',
      patientPhone: '+254 700 777 888',
      patientEmail: 'mary.a@email.com',
      patientLocation: 'Nyeri',
      program: 'PrEP Program',
      enrollmentDate: '2024-01-18',
      enrollmentTime: '12:00 PM',
      status: 'Suspended',
      doctor: 'Dr. Smith',
      facility: 'Gertrude\'s Hospital',
      nextAppointment: null,
      adherenceRate: 45,
      riskLevel: 'High',
      lastVisit: '2024-01-18',
      missedAppointments: 2
    },
    {
      id: 8,
      patientName: 'David Mutua',
      patientAge: 40,
      patientGender: 'Male',
      patientPhone: '+254 700 888 999',
      patientEmail: 'david.m@email.com',
      patientLocation: 'Machakos',
      program: 'Prevention Program',
      enrollmentDate: '2024-01-12',
      enrollmentTime: '04:00 PM',
      status: 'Active',
      doctor: 'Dr. Brown',
      facility: 'Coptic Hospital',
      nextAppointment: '2024-02-12',
      adherenceRate: 85,
      riskLevel: 'Medium',
      lastVisit: '2024-01-22',
      missedAppointments: 1
    },
    {
      id: 9,
      patientName: 'Ruth Wambui',
      patientAge: 26,
      patientGender: 'Female',
      patientPhone: '+254 700 999 000',
      patientEmail: 'ruth.w@email.com',
      patientLocation: 'Kiambu',
      program: 'HIV Treatment',
      enrollmentDate: '2023-11-20',
      enrollmentTime: '11:30 AM',
      status: 'Dropped Out',
      doctor: 'Dr. Williams',
      facility: 'Nairobi West Hospital',
      nextAppointment: null,
      adherenceRate: 23,
      riskLevel: 'Critical',
      viralLoad: 'Unknown',
      cd4Count: 0,
      lastVisit: '2023-12-20',
      missedAppointments: 5
    },
    {
      id: 10,
      patientName: 'James Kiprop',
      patientAge: 33,
      patientGender: 'Male',
      patientPhone: '+254 700 101 202',
      patientEmail: 'james.k@email.com',
      patientLocation: 'Kericho',
      program: 'PrEP Program',
      enrollmentDate: '2024-01-22',
      enrollmentTime: '08:45 AM',
      status: 'Active',
      doctor: 'Dr. Johnson',
      facility: 'Avenue Hospital',
      nextAppointment: '2024-02-22',
      adherenceRate: 90,
      riskLevel: 'Low',
      lastVisit: '2024-01-22',
      missedAppointments: 0
    },
    {
      id: 11,
      patientName: 'Faith Chebet',
      patientAge: 29,
      patientGender: 'Female',
      patientPhone: '+254 700 202 303',
      patientEmail: 'faith.c@email.com',
      patientLocation: 'Nanyuki',
      program: 'PEP Program',
      enrollmentDate: '2024-01-23',
      enrollmentTime: '01:00 PM',
      status: 'Active',
      doctor: 'Dr. Smith',
      facility: 'Mediheal Hospital',
      nextAppointment: '2024-01-30',
      adherenceRate: 100,
      riskLevel: 'High',
      lastVisit: '2024-01-23',
      missedAppointments: 0
    },
    {
      id: 12,
      patientName: 'Joseph Odhiambo',
      patientAge: 37,
      patientGender: 'Male',
      patientPhone: '+254 700 303 404',
      patientEmail: 'joseph.o@email.com',
      patientLocation: 'Kakamega',
      program: 'HIV Treatment',
      enrollmentDate: '2023-10-15',
      enrollmentTime: '10:00 AM',
      status: 'Completed',
      doctor: 'Dr. Brown',
      facility: 'South B Hospital',
      nextAppointment: null,
      adherenceRate: 96,
      riskLevel: 'Low',
      viralLoad: 'Undetectable',
      cd4Count: 750,
      lastVisit: '2024-01-15',
      missedAppointments: 0
    }
  ];

  // Filter logic with proper dependencies
  const filteredEnrollments = useMemo(() => {
    let filtered = [...allEnrollments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(enrollment => 
        enrollment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.patientLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Program filter
    if (programFilter !== 'all') {
      const programMap = {
        'prep': 'PrEP Program',
        'treatment': 'HIV Treatment',
        'prevention': 'Prevention Program',
        'pep': 'PEP Program'
      } as const;
      filtered = filtered.filter(enrollment => enrollment.program === programMap[programFilter]);
    }

    // Status filter
    if (statusFilter !== 'all') {
      const statusMap = {
        'active': 'Active',
        'pending': 'Pending',
        'completed': 'Completed',
        'suspended': 'Suspended'
      } as const;
      filtered = filtered.filter(enrollment => enrollment.status === statusMap[statusFilter]);
    }

    // Risk filter
    if (riskFilter !== 'all') {
      const riskMap = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'critical': 'Critical'
      } as const;
      filtered = filtered.filter(enrollment => enrollment.riskLevel === riskMap[riskFilter]);
    }

    return filtered;
  }, [searchTerm, programFilter, statusFilter, riskFilter, allEnrollments]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEnrollments = filteredEnrollments.slice(startIndex, endIndex);

  // Stats calculations
  const totalEnrollments = allEnrollments.length;
  const activeEnrollments = allEnrollments.filter(e => e.status === 'Active').length;
  const pendingEnrollments = allEnrollments.filter(e => e.status === 'Pending').length;
  const thisMonthEnrollments = allEnrollments.filter(e => {
    const enrollmentDate = new Date(e.enrollmentDate);
    const currentMonth = new Date();
    return enrollmentDate.getMonth() === currentMonth.getMonth() && 
           enrollmentDate.getFullYear() === currentMonth.getFullYear();
  }).length;
  const highRiskPatients = allEnrollments.filter(e => e.riskLevel === 'High' || e.riskLevel === 'Critical').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Suspended': return 'bg-orange-100 text-orange-700';
      case 'Dropped Out': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-3 h-3" />;
      case 'Pending': return <Clock className="w-3 h-3" />;
      case 'Completed': return <Award className="w-3 h-3" />;
      case 'Suspended': return <AlertCircle className="w-3 h-3" />;
      case 'Dropped Out': return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getProgramColor = (program: string) => {
    switch (program) {
      case 'PrEP Program': return 'text-purple-600 bg-purple-50';
      case 'HIV Treatment': return 'text-red-600 bg-red-50';
      case 'Prevention Program': return 'text-blue-600 bg-blue-50';
      case 'PEP Program': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
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
  }, [searchTerm, programFilter, statusFilter, riskFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-blue-600" />
            Program Enrollments
          </h1>
          <p className="text-gray-600 mt-1 ml-11">Manage patient enrollments across all healthcare programs</p>
        </div>
        <button 
          type="button"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center shadow-lg"
          aria-label="Create new enrollment"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Enrollment
        </button>
      </div>

      {/* Stats Cards with Unique Gradient Colors */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Enrollments - Teal to Cyan */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Enrollments</p>
          <p className="text-2xl font-bold mt-1">{totalEnrollments}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">All programs</span>
            <Users className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* Active - Indigo to Purple */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Active</p>
          <p className="text-2xl font-bold mt-1">{activeEnrollments}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Currently enrolled</span>
            <Activity className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* Pending - Amber to Red */}
        <div className="bg-gradient-to-br from-amber-500 to-red-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Pending</p>
          <p className="text-2xl font-bold mt-1">{pendingEnrollments}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Awaiting approval</span>
            <Clock className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* This Month - Lime to Green */}
        <div className="bg-gradient-to-br from-lime-500 to-green-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">This Month</p>
          <p className="text-2xl font-bold mt-1">{thisMonthEnrollments}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">New enrollments</span>
            <CalendarDays className="w-5 h-5 opacity-50" aria-hidden="true" />
          </div>
        </div>

        {/* High Risk - Rose to Pink */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">High Risk</p>
          <p className="text-2xl font-bold mt-1">{highRiskPatients}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Need attention</span>
            <AlertCircle className="w-5 h-5 opacity-50" aria-hidden="true" />
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
            placeholder="Search by patient name, doctor, facility, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search enrollments"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Program Filters */}
          <button
            type="button"
            onClick={() => setProgramFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              programFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={programFilter === 'all'}
          >
            All Programs
          </button>
          <button
            type="button"
            onClick={() => setProgramFilter('prep')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              programFilter === 'prep' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={programFilter === 'prep'}
          >
            <Shield className="w-3 h-3" aria-hidden="true" />
            PrEP
          </button>
          <button
            type="button"
            onClick={() => setProgramFilter('treatment')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              programFilter === 'treatment' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={programFilter === 'treatment'}
          >
            <Pill className="w-3 h-3" aria-hidden="true" />
            HIV Treatment
          </button>
          <button
            type="button"
            onClick={() => setProgramFilter('prevention')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              programFilter === 'prevention' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={programFilter === 'prevention'}
          >
            <Heart className="w-3 h-3" aria-hidden="true" />
            Prevention
          </button>
          <button
            type="button"
            onClick={() => setProgramFilter('pep')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              programFilter === 'pep' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={programFilter === 'pep'}
          >
            PEP
          </button>

          <div className="border-l border-gray-300 mx-2" aria-hidden="true"></div>

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
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'active' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'active'}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'pending' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'pending'}
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'completed' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={statusFilter === 'completed'}
          >
            Completed
          </button>

          <div className="border-l border-gray-300 mx-2" aria-hidden="true"></div>

          {/* Risk Filters */}
          <button
            type="button"
            onClick={() => setRiskFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              riskFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={riskFilter === 'all'}
          >
            All Risk Levels
          </button>
          <button
            type="button"
            onClick={() => setRiskFilter('low')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              riskFilter === 'low' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={riskFilter === 'low'}
          >
            Low
          </button>
          <button
            type="button"
            onClick={() => setRiskFilter('medium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              riskFilter === 'medium' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={riskFilter === 'medium'}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={() => setRiskFilter('high')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              riskFilter === 'high' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            aria-pressed={riskFilter === 'high'}
          >
            High
          </button>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age/Gender</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor/Facility</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adherence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next Visit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEnrollments.map((enrollment, index) => (
                <tr key={enrollment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        enrollment.patientGender === 'Male' 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-br from-pink-500 to-pink-600'
                      }`}>
                        <span className="text-white font-medium text-sm">{enrollment.patientName.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{enrollment.patientName}</p>
                          {enrollment.isNew && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">NEW</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" aria-hidden="true" />
                          {enrollment.patientLocation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{enrollment.patientAge} yrs</p>
                    <p className="text-xs text-gray-500">{enrollment.patientGender}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getProgramColor(enrollment.program)}`}>
                      {enrollment.program}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${getStatusColor(enrollment.status)}`}>
                      {getStatusIcon(enrollment.status)}
                      {enrollment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">{enrollment.doctor}</p>
                    <p className="text-xs text-gray-500">{enrollment.facility}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            enrollment.adherenceRate >= 90 ? 'bg-green-500' :
                            enrollment.adherenceRate >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${enrollment.adherenceRate}%` }}
                          aria-hidden="true"
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{enrollment.adherenceRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(enrollment.riskLevel)}`}>
                      {enrollment.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {enrollment.nextAppointment || 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      aria-label={`More actions for ${enrollment.patientName}`}
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredEnrollments.length)} of {filteredEnrollments.length} enrollments
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