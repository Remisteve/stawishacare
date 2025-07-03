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
  Star,
  MapPin,
  Phone,
  Mail,
  // Removed unused imports: Calendar, Award, Users, XCircle, GraduationCap
  Activity,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  Stethoscope,
  Building2
} from 'lucide-react';

export default function DoctorsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  // Removed unused state variables: selectedDoctor, setSelectedDoctor, showAddModal
  const [, setShowAddModal] = useState(false); // Keep setter for button functionality

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@prepguard.com',
      phone: '+254 712 345 678',
      specialization: 'HIV/AIDS Specialist',
      facility: 'Nairobi Central Hospital',
      location: 'Nairobi, Kenya',
      status: 'active',
      rating: 4.9,
      patients: 234,
      experience: '8 years',
      avatar: null,
      lastActive: '2 hours ago',
      joinDate: '2022-01-15',
      consultations: 1456,
      successRate: 96.5
    },
    {
      id: 2,
      name: 'Dr. Michael Ochieng',
      email: 'michael.ochieng@prepguard.com',
      phone: '+254 722 987 654',
      specialization: 'General Practitioner',
      facility: 'Mombasa Health Center',
      location: 'Mombasa, Kenya',
      status: 'active',
      rating: 4.7,
      patients: 189,
      experience: '12 years',
      avatar: null,
      lastActive: '1 hour ago',
      joinDate: '2021-08-22',
      consultations: 2103,
      successRate: 94.2
    },
    {
      id: 3,
      name: 'Dr. Grace Wanjiku',
      email: 'grace.wanjiku@prepguard.com',
      phone: '+254 733 456 789',
      specialization: 'Infectious Disease',
      facility: 'Kisumu Medical Center',
      location: 'Kisumu, Kenya',
      status: 'pending',
      rating: 4.8,
      patients: 156,
      experience: '6 years',
      avatar: null,
      lastActive: '30 min ago',
      joinDate: '2023-03-10',
      consultations: 892,
      successRate: 97.1
    },
    {
      id: 4,
      name: 'Dr. James Kamau',
      email: 'james.kamau@prepguard.com',
      phone: '+254 744 123 456',
      specialization: 'PrEP Specialist',
      facility: 'Eldoret Regional Hospital',
      location: 'Eldoret, Kenya',
      status: 'inactive',
      rating: 4.6,
      patients: 98,
      experience: '10 years',
      avatar: null,
      lastActive: '2 days ago',
      joinDate: '2020-11-05',
      consultations: 1789,
      successRate: 93.8
    }
  ];

  // Statistics
  const stats = [
    {
      title: 'Total Doctors',
      value: '48',
      change: '+12%',
      trend: 'up',
      icon: Stethoscope,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Doctors',
      value: '42',
      change: '+8.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Verification',
      value: '6',
      change: '-2',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Total Consultations',
      value: '12,450',
      change: '+24.3%',
      trend: 'up',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'inactive': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || doctor.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Management</h1>
              <p className="text-gray-600">Manage healthcare providers and their credentials</p>
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
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Doctor
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
                  placeholder="Search doctors by name, email, or specialization..."
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
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <span className="text-sm text-gray-500">
                {filteredDoctors.length} of {doctors.length} doctors
              </span>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
              {/* Doctor Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{doctor.specialization}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">({doctor.consultations} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(doctor.status)}`}>
                      {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.facility}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Stats */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{doctor.patients}</p>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{doctor.experience}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{doctor.successRate}%</p>
                    <p className="text-xs text-gray-500">Success Rate</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Last active: {doctor.lastActive}</span>
                  <span>Joined: {new Date(doctor.joinDate).toLocaleDateString()}</span>
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
        {filteredDoctors.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
              Add First Doctor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}