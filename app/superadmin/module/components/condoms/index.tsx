// /app/superadmin/module/components/Condoms.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Heart, Plus, Search, Package, CheckCircle,
  ChevronLeft, ChevronRight, Users, MapPin,
  Shield, User, BarChart3, Download
  // Removed unused imports: Edit, Trash2, TrendingUp, AlertTriangle, UserCheck, Calendar, Activity, PieChart, Filter, RefreshCw
} from 'lucide-react';

interface CondomRecipient {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  location: string;
  condomType: 'Male' | 'Female' | 'Both';
  quantity: number;
  dateReceived: string;
  referredToPrEP: boolean;
  riskCategory: 'High' | 'Medium' | 'Low';
  lastVisit: string;
  isNew?: boolean;
}

// REMOVED: CondomInventory interface (was unused)

export default function Condoms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'male' | 'female'>('all');
  const [ageFilter, setAgeFilter] = useState<'all' | '15-24' | '25-34' | '35-44' | '45+'>('all');
  const [prepFilter, setPrepFilter] = useState<'all' | 'referred' | 'not-referred'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Recipients data
  const allRecipients: CondomRecipient[] = [
    {
      id: 1,
      name: 'John Kamau',
      age: 23,
      gender: 'Male',
      phone: '+254 700 111 222',
      location: 'Nairobi',
      condomType: 'Male',
      quantity: 50,
      dateReceived: '2024-01-25',
      referredToPrEP: true,
      riskCategory: 'High',
      lastVisit: '2024-01-25',
      isNew: true
    },
    {
      id: 2,
      name: 'Mary Wanjiru',
      age: 28,
      gender: 'Female',
      phone: '+254 700 222 333',
      location: 'Mombasa',
      condomType: 'Female',
      quantity: 20,
      dateReceived: '2024-01-24',
      referredToPrEP: true,
      riskCategory: 'High',
      lastVisit: '2024-01-24'
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      age: 31,
      gender: 'Male',
      phone: '+254 700 333 444',
      location: 'Kisumu',
      condomType: 'Both',
      quantity: 100,
      dateReceived: '2024-01-23',
      referredToPrEP: false,
      riskCategory: 'Medium',
      lastVisit: '2024-01-23'
    },
    {
      id: 4,
      name: 'Grace Akinyi',
      age: 19,
      gender: 'Female',
      phone: '+254 700 444 555',
      location: 'Nakuru',
      condomType: 'Female',
      quantity: 30,
      dateReceived: '2024-01-22',
      referredToPrEP: true,
      riskCategory: 'High',
      lastVisit: '2024-01-22'
    },
    {
      id: 5,
      name: 'James Mwangi',
      age: 45,
      gender: 'Male',
      phone: '+254 700 555 666',
      location: 'Eldoret',
      condomType: 'Male',
      quantity: 60,
      dateReceived: '2024-01-21',
      referredToPrEP: false,
      riskCategory: 'Low',
      lastVisit: '2024-01-21'
    },
    {
      id: 6,
      name: 'Sarah Njeri',
      age: 22,
      gender: 'Female',
      phone: '+254 700 666 777',
      location: 'Thika',
      condomType: 'Both',
      quantity: 80,
      dateReceived: '2024-01-20',
      referredToPrEP: true,
      riskCategory: 'High',
      lastVisit: '2024-01-20'
    },
    {
      id: 7,
      name: 'Michael Otieno',
      age: 35,
      gender: 'Male',
      phone: '+254 700 777 888',
      location: 'Nyeri',
      condomType: 'Male',
      quantity: 40,
      dateReceived: '2024-01-19',
      referredToPrEP: false,
      riskCategory: 'Medium',
      lastVisit: '2024-01-19'
    },
    {
      id: 8,
      name: 'Alice Wambui',
      age: 26,
      gender: 'Female',
      phone: '+254 700 888 999',
      location: 'Machakos',
      condomType: 'Female',
      quantity: 25,
      dateReceived: '2024-01-18',
      referredToPrEP: true,
      riskCategory: 'Medium',
      lastVisit: '2024-01-18'
    },
    {
      id: 9,
      name: 'David Kiprop',
      age: 30,
      gender: 'Male',
      phone: '+254 700 999 000',
      location: 'Kericho',
      condomType: 'Male',
      quantity: 70,
      dateReceived: '2024-01-17',
      referredToPrEP: true,
      riskCategory: 'High',
      lastVisit: '2024-01-17'
    },
    {
      id: 10,
      name: 'Ruth Chebet',
      age: 24,
      gender: 'Female',
      phone: '+254 700 123 456',
      location: 'Nanyuki',
      condomType: 'Both',
      quantity: 90,
      dateReceived: '2024-01-16',
      referredToPrEP: false,
      riskCategory: 'Low',
      lastVisit: '2024-01-16'
    },
    {
      id: 11,
      name: 'Joseph Mutua',
      age: 38,
      gender: 'Male',
      phone: '+254 700 234 567',
      location: 'Meru',
      condomType: 'Male',
      quantity: 55,
      dateReceived: '2024-01-15',
      referredToPrEP: true,
      riskCategory: 'High',
      lastVisit: '2024-01-15'
    },
    {
      id: 12,
      name: 'Esther Wanjiku',
      age: 29,
      gender: 'Female',
      phone: '+254 700 345 678',
      location: 'Kiambu',
      condomType: 'Female',
      quantity: 35,
      dateReceived: '2024-01-14',
      referredToPrEP: false,
      riskCategory: 'Medium',
      lastVisit: '2024-01-14'
    }
  ];

  // Removed unused condomInventory variable

  // Filter recipients
  const filteredRecipients = useMemo(() => {
    let filtered = [...allRecipients];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(recipient => 
        recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.phone.includes(searchTerm) ||
        recipient.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter === 'male') {
      filtered = filtered.filter(r => r.condomType === 'Male' || r.condomType === 'Both');
    } else if (typeFilter === 'female') {
      filtered = filtered.filter(r => r.condomType === 'Female' || r.condomType === 'Both');
    }

    // Age filter
    if (ageFilter !== 'all') {
      filtered = filtered.filter(r => {
        if (ageFilter === '15-24') return r.age >= 15 && r.age <= 24;
        if (ageFilter === '25-34') return r.age >= 25 && r.age <= 34;
        if (ageFilter === '35-44') return r.age >= 35 && r.age <= 44;
        if (ageFilter === '45+') return r.age >= 45;
        return true;
      });
    }

    // PrEP filter
    if (prepFilter === 'referred') {
      filtered = filtered.filter(r => r.referredToPrEP);
    } else if (prepFilter === 'not-referred') {
      filtered = filtered.filter(r => !r.referredToPrEP);
    }

    return filtered;
  }, [searchTerm, typeFilter, ageFilter, prepFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRecipients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipients = filteredRecipients.slice(startIndex, endIndex);

  // Stats calculations
  const totalDistributed = allRecipients.reduce((sum, r) => sum + r.quantity, 0);
  const prepReferrals = allRecipients.filter(r => r.referredToPrEP).length;
  const maleCondomUsers = allRecipients.filter(r => r.condomType === 'Male' || r.condomType === 'Both').length;
  const femaleCondomUsers = allRecipients.filter(r => r.condomType === 'Female' || r.condomType === 'Both').length;

  // Age demographics
  const ageGroups = {
    '15-24': allRecipients.filter(r => r.age >= 15 && r.age <= 24).length,
    '25-34': allRecipients.filter(r => r.age >= 25 && r.age <= 34).length,
    '35-44': allRecipients.filter(r => r.age >= 35 && r.age <= 44).length,
    '45+': allRecipients.filter(r => r.age >= 45).length
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-600" />
            Condom Distribution
          </h1>
          <p className="text-gray-600 mt-1 ml-11">Manage condom distribution and track patient referrals</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all flex items-center shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Distribution
          </button>
        </div>
      </div>

      {/* Stats Cards with Gradients */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Distributed - Green Gradient */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Distributed</p>
          <p className="text-2xl font-bold mt-1">{totalDistributed.toLocaleString()}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">This month</span>
            <Package className="w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* PrEP Referrals - Orange Gradient */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">PrEP Referrals</p>
          <p className="text-2xl font-bold mt-1">{prepReferrals}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">{Math.round((prepReferrals/allRecipients.length)*100)}% of recipients</span>
            <Shield className="w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* Male Condoms - Blue Gradient */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Male Condoms</p>
          <p className="text-2xl font-bold mt-1">{maleCondomUsers}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Recipients</span>
            <User className="w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* Female Condoms - Pink Gradient */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Female Condoms</p>
          <p className="text-2xl font-bold mt-1">{femaleCondomUsers}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Recipients</span>
            <Users className="w-5 h-5 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Age Demographics */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              Age Demographics
            </h3>
            <div className="space-y-3">
              {Object.entries(ageGroups).map(([age, count], index) => (
                <div key={age}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{age} years</span>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-green-500' :
                        index === 1 ? 'bg-orange-500' :
                        index === 2 ? 'bg-blue-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${(count / allRecipients.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Distribution by Type</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Male Only</span>
                  <span className="text-sm font-medium">{allRecipients.filter(r => r.condomType === 'Male').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Female Only</span>
                  <span className="text-sm font-medium">{allRecipients.filter(r => r.condomType === 'Female').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Both Types</span>
                  <span className="text-sm font-medium">{allRecipients.filter(r => r.condomType === 'Both').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipients by name, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* Type Filter */}
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
                onClick={() => setTypeFilter('male')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  typeFilter === 'male' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Male Condoms
              </button>
              <button
                onClick={() => setTypeFilter('female')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  typeFilter === 'female' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Female Condoms
              </button>

              <div className="border-l border-gray-300 mx-2"></div>

              {/* Age Filter */}
              <button
                onClick={() => setAgeFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  ageFilter === 'all' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Ages
              </button>
              <button
                onClick={() => setAgeFilter('15-24')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  ageFilter === '15-24' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                15-24
              </button>
              <button
                onClick={() => setAgeFilter('25-34')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  ageFilter === '25-34' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                25-34
              </button>
              <button
                onClick={() => setAgeFilter('35-44')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  ageFilter === '35-44' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                35-44
              </button>
              <button
                onClick={() => setAgeFilter('45+')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  ageFilter === '45+' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                45+
              </button>

              <div className="border-l border-gray-300 mx-2"></div>

              {/* PrEP Filter */}
              <button
                onClick={() => setPrepFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  prepFilter === 'all' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Recipients
              </button>
              <button
                onClick={() => setPrepFilter('referred')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
                  prepFilter === 'referred' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Shield className="w-3 h-3" />
                PrEP Referred
              </button>
              <button
                onClick={() => setPrepFilter('not-referred')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  prepFilter === 'not-referred' 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Not Referred
              </button>
            </div>
          </div>

          {/* Recipients Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Condom Recipients</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age/Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condom Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PrEP Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecipients.map((recipient, index) => (
                    <tr key={recipient.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            recipient.gender === 'Male' 
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                              : 'bg-gradient-to-br from-pink-500 to-pink-600'
                          }`}>
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                              {recipient.isNew && (
                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">NEW</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {recipient.location}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{recipient.age} years</p>
                        <p className="text-xs text-gray-500">{recipient.gender}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          recipient.condomType === 'Male' ? 'bg-blue-100 text-blue-700' :
                          recipient.condomType === 'Female' ? 'bg-pink-100 text-pink-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {recipient.condomType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {recipient.quantity}
                      </td>
                      <td className="px-4 py-3">
                        {recipient.referredToPrEP ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Referred
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            Not Referred
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(recipient.riskCategory)}`}>
                          {recipient.riskCategory} Risk
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {recipient.lastVisit}
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredRecipients.length)} of {filteredRecipients.length} recipients
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
                                ? 'bg-red-600 text-white'
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
      </div>
    </div>
  );
}