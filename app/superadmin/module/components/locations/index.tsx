'use client';

import React, { useState, useMemo } from 'react';
import { MapPin, Plus, Search, Edit, Trash2, Navigation, Building2, Users } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  type: string;
  address: string;
  coordinates: string;
  region: string;
  county: string;
  status: string;
  facilities: number;
  staff: number;
  patients: number;
  services: string[];
  manager: string;
  phone: string;
}

interface RegionStat {
  name: string;
  locations: number;
  patients: number;
}

export default function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const locations: Location[] = [
    {
      id: 1,
      name: 'Nairobi Central Branch',
      type: 'Main Facility',
      address: '123 Uhuru Highway, Nairobi',
      coordinates: '-1.2921, 36.8219',
      region: 'Nairobi',
      county: 'Nairobi',
      status: 'Active',
      facilities: 3,
      staff: 245,
      patients: 1250,
      services: ['HIV Testing', 'PrEP', 'Treatment', 'Counseling'],
      manager: 'Dr. Johnson',
      phone: '+254 20 123 4567'
    },
    {
      id: 2,
      name: 'Mombasa Coast Office',
      type: 'Branch Office',
      address: '456 Moi Avenue, Mombasa',
      coordinates: '-4.0435, 39.6682',
      region: 'Coast',
      county: 'Mombasa',
      status: 'Active',
      facilities: 2,
      staff: 156,
      patients: 890,
      services: ['HIV Testing', 'PrEP', 'Counseling'],
      manager: 'Dr. Williams',
      phone: '+254 41 234 5678'
    },
    {
      id: 3,
      name: 'Kisumu Western Hub',
      type: 'Regional Hub',
      address: '789 Oginga Odinga Street, Kisumu',
      coordinates: '-0.0917, 34.7680',
      region: 'Western',
      county: 'Kisumu',
      status: 'Active',
      facilities: 4,
      staff: 189,
      patients: 1100,
      services: ['HIV Testing', 'PrEP', 'Treatment', 'Counseling', 'Outreach'],
      manager: 'Dr. Smith',
      phone: '+254 57 345 6789'
    },
    {
      id: 4,
      name: 'Nakuru Rift Valley Center',
      type: 'Satellite Office',
      address: '321 Kenyatta Avenue, Nakuru',
      coordinates: '-0.3031, 36.0800',
      region: 'Rift Valley',
      county: 'Nakuru',
      status: 'Under Construction',
      facilities: 1,
      staff: 0,
      patients: 0,
      services: [],
      manager: 'TBA',
      phone: 'TBA'
    }
  ];

  // Filter locations based on search term and selected region
  const filteredLocations = useMemo(() => {
    let filtered = [...locations];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.county.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Region filter
    if (selectedFilter !== 'all') {
      const regionMap = {
        'nairobi': 'Nairobi',
        'coast': 'Coast',
        'western': 'Western',
        'central': 'Central',
        'rift-valley': 'Rift Valley'
      } as const;
      
      const targetRegion = regionMap[selectedFilter as keyof typeof regionMap];
      if (targetRegion) {
        filtered = filtered.filter(location => location.region === targetRegion);
      }
    }

    return filtered;
  }, [searchTerm, selectedFilter, locations]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Construction': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Main Facility': return 'bg-blue-100 text-blue-800';
      case 'Regional Hub': return 'bg-purple-100 text-purple-800';
      case 'Branch Office': return 'bg-green-100 text-green-800';
      case 'Satellite Office': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const regionStats: RegionStat[] = [
    { name: 'Nairobi', locations: 12, patients: 3456 },
    { name: 'Coast', locations: 8, patients: 2234 },
    { name: 'Western', locations: 15, patients: 4567 },
    { name: 'Central', locations: 10, patients: 2890 },
    { name: 'Rift Valley', locations: 18, patients: 5123 },
    { name: 'Eastern', locations: 13, patients: 3678 },
    { name: 'North Eastern', locations: 6, patients: 1234 },
    { name: 'Nyanza', locations: 11, patients: 3345 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
          <p className="text-gray-600">Manage healthcare service locations and coverage areas</p>
        </div>
        <button 
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          aria-label="Add new location"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-blue-500 mr-3" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Locations</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">82</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Building2 className="w-5 h-5 text-purple-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Regions Covered</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-yellow-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Coverage</p>
              <p className="text-2xl font-bold text-gray-900">26,527</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Coverage</h3>
            <div className="space-y-3">
              {regionStats.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{region.name}</p>
                    <p className="text-xs text-gray-500">{region.patients.toLocaleString()} patients</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">{region.locations}</p>
                    <p className="text-xs text-gray-500">locations</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search locations"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter by region"
              >
                <option value="all">All Regions</option>
                <option value="nairobi">Nairobi</option>
                <option value="coast">Coast</option>
                <option value="western">Western</option>
                <option value="central">Central</option>
                <option value="rift-valley">Rift Valley</option>
              </select>
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-4">
            {filteredLocations.length === 0 ? (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500">No locations found matching your criteria.</p>
              </div>
            ) : (
              filteredLocations.map((location) => (
                <div key={location.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(location.type)}`}>
                            {location.type}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(location.status)}`}>
                            {location.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        type="button"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label={`Navigate to ${location.name}`}
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        className="text-green-600 hover:text-green-800 transition-colors"
                        aria-label={`Edit ${location.name}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label={`Delete ${location.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                        {location.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Navigation className="w-4 h-4 mr-2" aria-hidden="true" />
                        {location.coordinates}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Manager:</span> {location.manager}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{location.facilities}</p>
                        <p className="text-xs text-gray-500">Facilities</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{location.staff}</p>
                        <p className="text-xs text-gray-500">Staff</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{location.patients.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Patients</p>
                      </div>
                    </div>
                  </div>
                  
                  {location.services.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {location.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}