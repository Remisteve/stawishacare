'use client';

import React, { useState, useMemo } from 'react';
import { Heart, Plus, Search, Edit, Phone, Mail, Users, Award } from 'lucide-react';

interface Champion {
  id: number;
  name: string;
  area: string;
  email: string;
  phone: string;
  status: string;
  clientsHelped: number;
  joinDate: string;
  performance: string;
  events: number;
}

export default function PrepChampions() {
  const [searchTerm, setSearchTerm] = useState('');

  const champions: Champion[] = [
    { 
      id: 1, 
      name: 'Alice Wanjiku', 
      area: 'Nairobi Central', 
      email: 'alice@prepchamp.com',
      phone: '+254 700 111 222',
      status: 'Active', 
      clientsHelped: 89,
      joinDate: 'Jan 2024',
      performance: 'Excellent',
      events: 12
    },
    { 
      id: 2, 
      name: 'John Kimani', 
      area: 'Westlands', 
      email: 'john@prepchamp.com',
      phone: '+254 700 333 444',
      status: 'Active', 
      clientsHelped: 67,
      joinDate: 'Mar 2024',
      performance: 'Good',
      events: 8
    },
    { 
      id: 3, 
      name: 'Grace Muthoni', 
      area: 'Eastlands', 
      email: 'grace@prepchamp.com',
      phone: '+254 700 555 666',
      status: 'Training', 
      clientsHelped: 23,
      joinDate: 'May 2024',
      performance: 'Average',
      events: 3
    },
    { 
      id: 4, 
      name: 'Peter Ochieng', 
      area: 'South C', 
      email: 'peter@prepchamp.com',
      phone: '+254 700 777 888',
      status: 'Active', 
      clientsHelped: 134,
      joinDate: 'Oct 2023',
      performance: 'Outstanding',
      events: 25
    },
  ];

  // Filter champions based on search term
  const filteredChampions = useMemo(() => {
    if (!searchTerm) {
      return champions;
    }

    return champions.filter(champion =>
      champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      champion.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      champion.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      champion.performance.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, champions]);

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Outstanding': return 'bg-purple-100 text-purple-800';
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Average': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddChampion = () => {
    console.log('Adding new champion...');
    // In a real app, this would open a modal or navigate to add champion page
  };

  const handleViewDetails = (champion: Champion) => {
    console.log('Viewing details for:', champion.name);
    // In a real app, this would open champion details modal or navigate to detail page
  };

  const handleEditChampion = (champion: Champion) => {
    console.log('Editing champion:', champion.name);
    // In a real app, this would open edit modal or navigate to edit page
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PrEP Champions</h1>
          <p className="text-gray-600">Manage community health advocates and peer educators</p>
        </div>
        <button 
          type="button"
          onClick={handleAddChampion}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          aria-label="Add new PrEP champion"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Champion
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-3" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Champions</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-green-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Clients Helped</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Award className="w-5 h-5 text-purple-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Events This Month</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full" aria-hidden="true"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">21</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search champions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search PrEP champions"
          />
        </div>
      </div>

      {/* Champions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChampions.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No champions found matching your search criteria.</p>
          </div>
        ) : (
          filteredChampions.map((champion) => (
            <div key={champion.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">{champion.name.charAt(0)}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(champion.performance)}`}>
                  {champion.performance}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{champion.name}</h3>
                  <p className="text-sm text-red-600">{champion.area}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    {champion.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    {champion.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                    {champion.clientsHelped} clients helped
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-semibold text-gray-900">{champion.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Events</p>
                    <p className="font-semibold text-gray-900">{champion.events}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-3">
                  <button 
                    type="button"
                    onClick={() => handleViewDetails(champion)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    aria-label={`View details for ${champion.name}`}
                  >
                    View Details
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleEditChampion(champion)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label={`Edit ${champion.name}`}
                  >
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}