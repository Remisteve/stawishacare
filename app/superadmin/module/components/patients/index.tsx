'use client';

import React, { useState, useMemo } from 'react';
import { Users, Plus, Search, Edit, Trash2, Calendar, FileText } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  patientId: string;
  email: string;
  phone: string;
  status: string;
  lastVisit: string;
  nextAppointment: string;
  doctor: string;
}

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const patients: Patient[] = [
    { 
      id: 1, 
      name: 'Mary Njeri', 
      age: 28,
      gender: 'Female',
      patientId: 'PT001234',
      email: 'mary.njeri@email.com',
      phone: '+254 700 111 222',
      status: 'On PrEP', 
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      doctor: 'Dr. Johnson'
    },
    { 
      id: 2, 
      name: 'David Mwangi', 
      age: 35,
      gender: 'Male',
      patientId: 'PT001235',
      email: 'david.mwangi@email.com',
      phone: '+254 700 333 444',
      status: 'HIV+', 
      lastVisit: '2024-01-20',
      nextAppointment: '2024-02-20',
      doctor: 'Dr. Williams'
    },
    { 
      id: 3, 
      name: 'Grace Akinyi', 
      age: 24,
      gender: 'Female',
      patientId: 'PT001236',
      email: 'grace.akinyi@email.com',
      phone: '+254 700 555 666',
      status: 'Testing', 
      lastVisit: '2024-01-22',
      nextAppointment: '2024-01-29',
      doctor: 'Dr. Smith'
    },
    { 
      id: 4, 
      name: 'James Ochieng', 
      age: 42,
      gender: 'Male',
      patientId: 'PT001237',
      email: 'james.ochieng@email.com',
      phone: '+254 700 777 888',
      status: 'On Treatment', 
      lastVisit: '2024-01-18',
      nextAppointment: '2024-02-18',
      doctor: 'Dr. Brown'
    },
  ];

  // Filter patients based on search term and selected status
  const filteredPatients = useMemo(() => {
    let filtered = [...patients];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedFilter !== 'all') {
      const statusMap = {
        'on-prep': 'On PrEP',
        'hiv-positive': 'HIV+',
        'on-treatment': 'On Treatment',
        'testing': 'Testing'
      } as const;
      
      const targetStatus = statusMap[selectedFilter as keyof typeof statusMap];
      if (targetStatus) {
        filtered = filtered.filter(patient => patient.status === targetStatus);
      }
    }

    return filtered;
  }, [searchTerm, selectedFilter, patients]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On PrEP': return 'bg-blue-100 text-blue-800';
      case 'HIV+': return 'bg-red-100 text-red-800';
      case 'On Treatment': return 'bg-green-100 text-green-800';
      case 'Testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddPatient = () => {
    console.log('Adding new patient...');
    // In a real app, this would open a modal or navigate to add patient page
  };

  const handleViewRecord = (patient: Patient) => {
    console.log('Viewing record for:', patient.name);
    // In a real app, this would open patient record modal or navigate to patient detail page
  };

  const handleEditPatient = (patient: Patient) => {
    console.log('Editing patient:', patient.name);
    // In a real app, this would open edit modal or navigate to edit page
  };

  const handleDeletePatient = (patient: Patient) => {
    console.log('Deleting patient:', patient.name);
    // In a real app, this would show confirmation dialog and delete the patient
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and healthcare information</p>
        </div>
        <button 
          type="button"
          onClick={handleAddPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          aria-label="Add new patient"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full" aria-hidden="true"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">On PrEP</p>
              <p className="text-2xl font-bold text-gray-900">487</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">On Treatment</p>
              <p className="text-2xl font-bold text-gray-900">298</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-yellow-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments Today</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search patients"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Filter patients by status"
          >
            <option value="all">All Patients</option>
            <option value="on-prep">On PrEP</option>
            <option value="hiv-positive">HIV+</option>
            <option value="on-treatment">On Treatment</option>
            <option value="testing">Testing</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Appointment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No patients found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{patient.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.patientId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.doctor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.nextAppointment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          type="button"
                          onClick={() => handleViewRecord(patient)}
                          className="text-blue-600 hover:text-blue-900"
                          aria-label={`View record for ${patient.name}`}
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleEditPatient(patient)}
                          className="text-green-600 hover:text-green-900"
                          aria-label={`Edit ${patient.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeletePatient(patient)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${patient.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}