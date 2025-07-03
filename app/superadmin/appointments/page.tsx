'use client'

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Clock,
  MapPin,
  // Removed unused imports: Users, Activity, User, Building2, FileText
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Stethoscope,
  Phone,
  Video
} from 'lucide-react';

export default function AppointmentsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  // Removed unused state variables: selectedView, setSelectedView
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'PT001',
      doctorName: 'Dr. Sarah Johnson',
      doctorId: 'DR001',
      date: '2024-07-15',
      time: '09:00',
      duration: 30,
      type: 'consultation',
      status: 'scheduled',
      facility: 'Nairobi Central Hospital',
      location: 'Room 301',
      reason: 'PrEP Follow-up',
      notes: 'Regular quarterly check-up for PrEP adherence',
      priority: 'medium',
      isVirtual: false,
      patientPhone: '+254 712 345 678',
      reminderSent: true
    },
    {
      id: 2,
      patientName: 'Mary Wanjiku',
      patientId: 'PT002',
      doctorName: 'Dr. Michael Ochieng',
      doctorId: 'DR002',
      date: '2024-07-15',
      time: '10:30',
      duration: 45,
      type: 'screening',
      status: 'confirmed',
      facility: 'Mombasa Health Center',
      location: 'Lab A',
      reason: 'HIV Screening',
      notes: 'Initial screening and counseling session',
      priority: 'high',
      isVirtual: false,
      patientPhone: '+254 722 987 654',
      reminderSent: true
    },
    {
      id: 3,
      patientName: 'David Kimani',
      patientId: 'PT003',
      doctorName: 'Dr. Grace Wanjiku',
      doctorId: 'DR003',
      date: '2024-07-16',
      time: '14:00',
      duration: 30,
      type: 'consultation',
      status: 'pending',
      facility: 'Kisumu Medical Center',
      location: 'Virtual',
      reason: 'PEP Consultation',
      notes: 'Post-exposure prophylaxis consultation',
      priority: 'high',
      isVirtual: true,
      patientPhone: '+254 733 456 789',
      reminderSent: false
    },
    {
      id: 4,
      patientName: 'Sarah Muthoni',
      patientId: 'PT004',
      doctorName: 'Dr. James Kamau',
      doctorId: 'DR004',
      date: '2024-07-17',
      time: '11:15',
      duration: 60,
      type: 'therapy',
      status: 'cancelled',
      facility: 'Eldoret Regional Hospital',
      location: 'Counseling Room 2',
      reason: 'Adherence Counseling',
      notes: 'Patient requested rescheduling',
      priority: 'low',
      isVirtual: false,
      patientPhone: '+254 744 123 456',
      reminderSent: false
    }
  ];

  // Statistics
  const stats = [
    {
      title: 'Total Appointments',
      value: '89',
      change: '+11.4%',
      trend: 'up',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Today\'s Schedule',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Confirmation',
      value: '8',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Virtual Appointments',
      value: '24',
      change: '+18.2%',
      trend: 'up',
      icon: Video,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'confirmed': return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border border-red-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-700';
      case 'screening': return 'bg-purple-100 text-purple-700';
      case 'therapy': return 'bg-green-100 text-green-700';
      case 'follow-up': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || appointment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments Management</h1>
              <p className="text-gray-600">Schedule and manage patient appointments across all facilities</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span className="text-xs font-bold">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient, doctor, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              <span className="text-sm text-gray-500">
                {filteredAppointments.length} of {appointments.length} appointments
              </span>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
              {/* Appointment Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{appointment.time} ({appointment.duration}min)</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Stethoscope className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{appointment.doctorName}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    {appointment.isVirtual ? (
                      <>
                        <Video className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="text-purple-600 font-medium">Virtual Appointment</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{appointment.facility} - {appointment.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Appointment Body */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getTypeColor(appointment.type)}`}>
                      {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority.charAt(0).toUpperCase() + appointment.priority.slice(1)} Priority
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">{appointment.reason}</h4>
                  <p className="text-sm text-gray-600">{appointment.notes}</p>
                </div>

                {/* Appointment Status */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    <span>{appointment.patientPhone}</span>
                  </div>
                  <div className={`flex items-center ${appointment.reminderSent ? 'text-green-600' : 'text-orange-600'}`}>
                    {appointment.reminderSent ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        <span>Reminder sent</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        <span>No reminder</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button className="bg-red-50 text-red-600 py-2 px-3 rounded-lg font-medium hover:bg-red-100 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
              Schedule First Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}