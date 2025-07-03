// /app/superadmin/module/components/Appointments.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit, Clock, CheckCircle, XCircle,
  ChevronLeft, ChevronRight, CalendarDays, Activity, Eye,
  Phone, MapPin, MoreVertical
  // Removed unused imports: Calendar, Trash2, User, Filter, Mail, AlertCircle
} from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  duration: string;
  room: string;
  isNew?: boolean;
}

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'prep' | 'followup' | 'testing' | 'treatment'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extended appointments data
  const allAppointments: Appointment[] = [
    // Today's new appointments (appear on top)
    { 
      id: 20, 
      patientName: 'New Patient Today',
      patientEmail: 'newpatient@email.com',
      patientPhone: '+254 700 111 111',
      doctorName: 'Dr. Johnson',
      date: new Date().toISOString().split('T')[0],
      time: '08:00 AM',
      type: 'PrEP Consultation',
      status: 'Scheduled',
      duration: '30 mins',
      room: 'Room 101',
      isNew: true
    },
    { 
      id: 1, 
      patientName: 'Mary Njeri',
      patientEmail: 'mary.njeri@email.com',
      patientPhone: '+254 700 222 333',
      doctorName: 'Dr. Johnson',
      date: '2024-01-26',
      time: '09:00 AM',
      type: 'PrEP Consultation',
      status: 'Scheduled',
      duration: '30 mins',
      room: 'Room 101'
    },
    { 
      id: 2, 
      patientName: 'David Mwangi',
      patientEmail: 'david.mwangi@email.com',
      patientPhone: '+254 700 444 555',
      doctorName: 'Dr. Williams',
      date: '2024-01-26',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'In Progress',
      duration: '45 mins',
      room: 'Room 203'
    },
    { 
      id: 3, 
      patientName: 'Grace Akinyi',
      patientEmail: 'grace.akinyi@email.com',
      patientPhone: '+254 700 666 777',
      doctorName: 'Dr. Smith',
      date: '2024-01-26',
      time: '02:00 PM',
      type: 'HIV Testing',
      status: 'Completed',
      duration: '20 mins',
      room: 'Lab A'
    },
    { 
      id: 4, 
      patientName: 'James Ochieng',
      patientEmail: 'james.ochieng@email.com',
      patientPhone: '+254 700 888 999',
      doctorName: 'Dr. Brown',
      date: '2024-01-26',
      time: '03:30 PM',
      type: 'Treatment Review',
      status: 'Cancelled',
      duration: '40 mins',
      room: 'Room 105'
    },
    { 
      id: 5, 
      patientName: 'Sarah Wambui',
      patientEmail: 'sarah.w@email.com',
      patientPhone: '+254 700 123 456',
      doctorName: 'Dr. Johnson',
      date: '2024-01-26',
      time: '04:00 PM',
      type: 'PrEP Consultation',
      status: 'Scheduled',
      duration: '30 mins',
      room: 'Room 102'
    },
    { 
      id: 6, 
      patientName: 'Peter Kamau',
      patientEmail: 'peter.k@email.com',
      patientPhone: '+254 700 234 567',
      doctorName: 'Dr. Williams',
      date: '2024-01-26',
      time: '04:30 PM',
      type: 'Follow-up',
      status: 'Scheduled',
      duration: '30 mins',
      room: 'Room 203'
    },
    { 
      id: 7, 
      patientName: 'Alice Muthoni',
      patientEmail: 'alice.m@email.com',
      patientPhone: '+254 700 345 678',
      doctorName: 'Dr. Smith',
      date: '2024-01-26',
      time: '05:00 PM',
      type: 'HIV Testing',
      status: 'Scheduled',
      duration: '20 mins',
      room: 'Lab B'
    },
    { 
      id: 8, 
      patientName: 'John Otieno',
      patientEmail: 'john.o@email.com',
      patientPhone: '+254 700 456 789',
      doctorName: 'Dr. Brown',
      date: '2024-01-27',
      time: '09:00 AM',
      type: 'Treatment Review',
      status: 'Scheduled',
      duration: '45 mins',
      room: 'Room 106'
    },
    { 
      id: 9, 
      patientName: 'Ruth Chebet',
      patientEmail: 'ruth.c@email.com',
      patientPhone: '+254 700 567 890',
      doctorName: 'Dr. Johnson',
      date: '2024-01-27',
      time: '10:00 AM',
      type: 'PrEP Consultation',
      status: 'Scheduled',
      duration: '30 mins',
      room: 'Room 101'
    },
    { 
      id: 10, 
      patientName: 'Michael Kiprono',
      patientEmail: 'michael.k@email.com',
      patientPhone: '+254 700 678 901',
      doctorName: 'Dr. Williams',
      date: '2024-01-27',
      time: '11:30 AM',
      type: 'Follow-up',
      status: 'Scheduled',
      duration: '30 mins',
      room: 'Room 204'
    },
    { 
      id: 11, 
      patientName: 'Faith Wanjiru',
      patientEmail: 'faith.w@email.com',
      patientPhone: '+254 700 789 012',
      doctorName: 'Dr. Smith',
      date: '2024-01-27',
      time: '02:00 PM',
      type: 'HIV Testing',
      status: 'Scheduled',
      duration: '20 mins',
      room: 'Lab A'
    },
    { 
      id: 12, 
      patientName: 'Daniel Mutua',
      patientEmail: 'daniel.m@email.com',
      patientPhone: '+254 700 890 123',
      doctorName: 'Dr. Brown',
      date: '2024-01-27',
      time: '03:00 PM',
      type: 'Treatment Review',
      status: 'Scheduled',
      duration: '40 mins',
      room: 'Room 107'
    }
  ];

  // Filter logic
  const filteredAppointments = useMemo(() => {
    let filtered = [...allAppointments];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.room.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      const statusMap = {
        'scheduled': 'Scheduled',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
      };
      filtered = filtered.filter(apt => apt.status === statusMap[statusFilter]);
    }

    // Type filter
    if (typeFilter !== 'all') {
      const typeMap = {
        'prep': 'PrEP Consultation',
        'followup': 'Follow-up',
        'testing': 'HIV Testing',
        'treatment': 'Treatment Review'
      };
      filtered = filtered.filter(apt => apt.type === typeMap[typeFilter]);
    }

    return filtered;
  }, [searchTerm, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  // Stats
  const todaysAppointments = allAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length;
  const completedCount = allAppointments.filter(apt => apt.status === 'Completed').length;
  const scheduledCount = allAppointments.filter(apt => apt.status === 'Scheduled').length;
  const cancelledCount = allAppointments.filter(apt => apt.status === 'Cancelled').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Clock className="w-3 h-3" />;
      case 'In Progress': return <Activity className="w-3 h-3" />;
      case 'Completed': return <CheckCircle className="w-3 h-3" />;
      case 'Cancelled': return <XCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PrEP Consultation': return 'text-purple-600 bg-purple-50';
      case 'Follow-up': return 'text-blue-600 bg-blue-50';
      case 'HIV Testing': return 'text-green-600 bg-green-50';
      case 'Treatment Review': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage patient appointments and schedules</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>

      {/* Stats Cards with Gradients */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{todaysAppointments}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{scheduledCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{cancelledCount}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments by patient, doctor, type or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Status Filters */}
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setStatusFilter('scheduled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'scheduled' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3 h-3" />
            Scheduled
          </button>
          <button
            onClick={() => setStatusFilter('in-progress')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'in-progress' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Activity className="w-3 h-3" />
            In Progress
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'completed' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            Completed
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              statusFilter === 'cancelled' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <XCircle className="w-3 h-3" />
            Cancelled
          </button>

          <div className="border-l border-gray-300 mx-2"></div>

          {/* Type Filters */}
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              typeFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setTypeFilter('prep')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              typeFilter === 'prep' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            PrEP
          </button>
          <button
            onClick={() => setTypeFilter('followup')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              typeFilter === 'followup' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Follow-up
          </button>
          <button
            onClick={() => setTypeFilter('testing')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              typeFilter === 'testing' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Testing
          </button>
          <button
            onClick={() => setTypeFilter('treatment')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              typeFilter === 'treatment' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Treatment
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAppointments.map((appointment, index) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{appointment.patientName.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                          {appointment.isNew && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">NEW</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {appointment.patientPhone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {appointment.doctorName}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{appointment.date}</div>
                    <div className="text-xs text-gray-500">{appointment.time} • {appointment.duration}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(appointment.type)}`}>
                      {appointment.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {appointment.room}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:bg-gray-50 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAppointments.length)} of {filteredAppointments.length} appointments
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-1 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
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
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded text-sm font-medium ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm font-medium flex items-center gap-1 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}