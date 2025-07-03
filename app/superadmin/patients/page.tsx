'use client'

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Phone,
  Mail,
  Calendar,
  Users,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  User,
  Heart,
  Pill
} from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  location: string;
  status: 'active' | 'pending' | 'inactive';
  riskLevel: 'low' | 'medium' | 'high';
  lastVisit: string;
  nextAppointment: string | null;
  enrollmentDate: string;
  program: string;
  adherence: number;
  testResults: string;
  doctorAssigned: string;
  facility: string;
}

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

type StatusType = 'active' | 'pending' | 'inactive';
type RiskType = 'low' | 'medium' | 'high';

export default function PatientsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | StatusType>('all');

  // Mock patients data
  const patients: Patient[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+254 712 345 678',
      age: 28,
      gender: 'Male',
      location: 'Nairobi, Kenya',
      status: 'active',
      riskLevel: 'low',
      lastVisit: '2024-06-20',
      nextAppointment: '2024-07-15',
      enrollmentDate: '2023-03-15',
      program: 'PrEP',
      adherence: 94,
      testResults: 'Negative',
      doctorAssigned: 'Dr. Sarah Johnson',
      facility: 'Nairobi Central Hospital'
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      email: 'mary.wanjiku@email.com',
      phone: '+254 722 987 654',
      age: 34,
      gender: 'Female',
      location: 'Mombasa, Kenya',
      status: 'active',
      riskLevel: 'medium',
      lastVisit: '2024-06-18',
      nextAppointment: '2024-07-10',
      enrollmentDate: '2022-11-08',
      program: 'PEP',
      adherence: 87,
      testResults: 'Negative',
      doctorAssigned: 'Dr. Michael Ochieng',
      facility: 'Mombasa Health Center'
    },
    {
      id: 3,
      name: 'David Kimani',
      email: 'david.kimani@email.com',
      phone: '+254 733 456 789',
      age: 25,
      gender: 'Male',
      location: 'Kisumu, Kenya',
      status: 'pending',
      riskLevel: 'high',
      lastVisit: '2024-06-25',
      nextAppointment: '2024-07-05',
      enrollmentDate: '2024-05-20',
      program: 'PrEP',
      adherence: 76,
      testResults: 'Pending',
      doctorAssigned: 'Dr. Grace Wanjiku',
      facility: 'Kisumu Medical Center'
    },
    {
      id: 4,
      name: 'Sarah Muthoni',
      email: 'sarah.muthoni@email.com',
      phone: '+254 744 123 456',
      age: 31,
      gender: 'Female',
      location: 'Eldoret, Kenya',
      status: 'inactive',
      riskLevel: 'low',
      lastVisit: '2024-05-15',
      nextAppointment: null,
      enrollmentDate: '2021-09-12',
      program: 'PrEP',
      adherence: 45,
      testResults: 'Negative',
      doctorAssigned: 'Dr. James Kamau',
      facility: 'Eldoret Regional Hospital'
    }
  ];

  // Statistics
  const stats: Stat[] = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12.8%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Patients',
      value: '1,089',
      change: '+8.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'High Risk',
      value: '156',
      change: '-5.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Avg Adherence',
      value: '87.5%',
      change: '+3.1%',
      trend: 'up',
      icon: Heart,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'inactive': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getRiskColor = (risk: RiskType): string => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getAdherenceColor = (adherence: number): string => {
    if (adherence >= 90) return 'text-green-600';
    if (adherence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           patient.phone.includes(searchTerm);
      const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter, patients]);

  const handleExport = () => {
    console.log('Exporting patient data...');
    // In a real app, this would trigger data export functionality
  };

  const handleSync = () => {
    console.log('Syncing patient data...');
    // In a real app, this would trigger data synchronization
  };

  const handleAddPatient = () => {
    console.log('Opening add patient modal...');
    // In a real app, this would open a modal or navigate to add patient page
  };

  const handleViewPatient = (patient: Patient) => {
    console.log('Viewing patient:', patient.name);
    // In a real app, this would open patient details modal or navigate to patient page
  };

  const handleEditPatient = (patient: Patient) => {
    console.log('Editing patient:', patient.name);
    // In a real app, this would open edit modal or navigate to edit page
  };

  const handleDeletePatient = (patient: Patient) => {
    console.log('Deleting patient:', patient.name);
    // In a real app, this would show confirmation dialog and delete the patient
  };

  const handleAddFirstPatient = () => {
    console.log('Adding first patient...');
    // In a real app, this would open add patient modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h1>
              <p className="text-gray-600">Monitor patient health records and treatment progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={handleExport}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center"
                aria-label="Export patient data"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button 
                type="button"
                onClick={handleSync}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center"
                aria-label="Sync patient data"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </button>
              <button 
                type="button"
                onClick={handleAddPatient}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center shadow-lg"
                aria-label="Add new patient"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
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
                    <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} aria-hidden="true" />
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search patients by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  aria-label="Search patients"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as 'all' | StatusType)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter patients by status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <span className="text-sm text-gray-500">
                {filteredPatients.length} of {patients.length} patients
              </span>
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Patient</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Program</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Risk Level</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Adherence</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Next Appointment</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.age} years, {patient.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-2 text-gray-400" aria-hidden="true" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" aria-hidden="true" />
                          <span>{patient.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Pill className="w-4 h-4 text-blue-500" aria-hidden="true" />
                        <span className="font-medium text-gray-900">{patient.program}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{patient.doctorAssigned}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getRiskColor(patient.riskLevel)}`}>
                        {patient.riskLevel.charAt(0).toUpperCase() + patient.riskLevel.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              patient.adherence >= 90 ? 'bg-green-500' :
                              patient.adherence >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${patient.adherence}%` }}
                            aria-hidden="true"
                          ></div>
                        </div>
                        <span className={`text-sm font-semibold ${getAdherenceColor(patient.adherence)}`}>
                          {patient.adherence}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {patient.nextAppointment ? (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                          <span>{new Date(patient.nextAppointment).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not scheduled</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          type="button"
                          onClick={() => handleViewPatient(patient)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          aria-label={`View ${patient.name} details`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleEditPatient(patient)}
                          className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                          aria-label={`Edit ${patient.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeletePatient(patient)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          aria-label={`Delete ${patient.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center mt-8">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              type="button"
              onClick={handleAddFirstPatient}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
              aria-label="Add your first patient"
            >
              Add First Patient
            </button>
          </div>
        )}
      </div>
    </div>
  );
}