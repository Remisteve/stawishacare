// /app/superadmin/module/components/PrepPep.tsx

'use client';

import React, { useState } from 'react';
import { Shield, Plus, Search, Edit, Trash2, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export default function PrepPep() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('prep');

  const prepPatients = [
    {
      id: 1,
      patientName: 'Alice Wanjiku',
      patientId: 'PP001234',
      startDate: '2024-01-15',
      nextAppointment: '2024-02-15',
      adherenceRate: 95,
      riskLevel: 'Low',
      status: 'Active',
      doctor: 'Dr. Johnson',
      medication: 'Truvada',
      daysSupply: 30,
      lastPickup: '2024-01-25'
    },
    {
      id: 2,
      patientName: 'John Kimani',
      patientId: 'PP001235',
      startDate: '2024-01-10',
      nextAppointment: '2024-02-10',
      adherenceRate: 88,
      riskLevel: 'Medium',
      status: 'Active',
      doctor: 'Dr. Williams',
      medication: 'Descovy',
      daysSupply: 30,
      lastPickup: '2024-01-23'
    },
    {
      id: 3,
      patientName: 'Grace Muthoni',
      patientId: 'PP001236',
      startDate: '2024-01-20',
      nextAppointment: '2024-01-30',
      adherenceRate: 72,
      riskLevel: 'High',
      status: 'Monitoring',
      doctor: 'Dr. Smith',
      medication: 'Truvada',
      daysSupply: 15,
      lastPickup: '2024-01-20'
    }
  ];

  const pepPatients = [
    {
      id: 1,
      patientName: 'Peter Ochieng',
      patientId: 'EP001001',
      exposureDate: '2024-01-24',
      startDate: '2024-01-24',
      completionDate: '2024-02-22',
      daysRemaining: 22,
      adherenceRate: 100,
      status: 'Active',
      doctor: 'Dr. Brown',
      medication: 'Truvada + Raltegravir',
      exposureType: 'Occupational',
      riskLevel: 'High'
    },
    {
      id: 2,
      patientName: 'Sarah Njeri',
      patientId: 'EP001002',
      exposureDate: '2024-01-22',
      startDate: '2024-01-22',
      completionDate: '2024-02-20',
      daysRemaining: 20,
      adherenceRate: 93,
      status: 'Active',
      doctor: 'Dr. Wilson',
      medication: 'Truvada + Dolutegravir',
      exposureType: 'Sexual',
      riskLevel: 'Medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAdherenceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const tabs = [
    { id: 'prep', name: 'PrEP Patients', count: 487 },
    { id: 'pep', name: 'PEP Patients', count: 23 },
    { id: 'analytics', name: 'Analytics', count: null }
  ];

  const analyticsData = [
    { label: 'Total PrEP Patients', value: '487', change: '+12%', color: 'text-blue-600' },
    { label: 'Active PEP Cases', value: '23', change: '+3', color: 'text-green-600' },
    { label: 'Avg Adherence Rate', value: '88%', change: '+2%', color: 'text-purple-600' },
    { label: 'Completion Rate', value: '92%', change: '+5%', color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PrEP/PEP Management</h1>
         </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Enrollment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-gray-900">510</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Due for Follow-up</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Low Adherence</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count && (
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'analytics' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${metric.color}`} />
                    <span className={`text-sm font-medium ${metric.color}`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab.toUpperCase()} patients...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="monitoring">Monitoring</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Patient Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeTab === 'prep' ? 'Start Date' : 'Exposure Date'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adherence</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(activeTab === 'prep' ? prepPatients : pepPatients).map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.patientName}</div>
                            <div className="text-sm text-gray-500">{patient.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {activeTab === 'prep' ? patient.startDate : (patient as any).exposureDate}
                        </div>
                        {activeTab === 'pep' && (
                          <div className="text-xs text-gray-500">
                            {(patient as any).daysRemaining} days remaining
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                patient.adherenceRate >= 95 ? 'bg-green-600' :
                                patient.adherenceRate >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${patient.adherenceRate}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getAdherenceColor(patient.adherenceRate)}`}>
                            {patient.adherenceRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskColor(patient.riskLevel)}`}>
                          {patient.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.medication}</div>
                        {activeTab === 'prep' && (
                          <div className="text-xs text-gray-500">{(patient as any).daysSupply} days supply</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
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
        </>
      )}
    </div>
  );
}