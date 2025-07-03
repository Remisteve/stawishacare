// /app/superadmin/module/components/AppUsers.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Smartphone, Search, ChevronLeft, ChevronRight, 
  Wifi, WifiOff, Shield, Apple, Bot, MoreVertical
} from 'lucide-react';

interface AppUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  lastLogin: string;
  deviceType: 'Android' | 'iOS';
  location: string;
  isNew?: boolean;
}

export default function AppUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [deviceFilter, setDeviceFilter] = useState<'all' | 'android' | 'ios'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data with more users
  const allAppUsers: AppUser[] = [
    // New users (appear on top)
    { 
      id: 15, 
      name: 'New User Today', 
      username: 'new_user',
      email: 'newuser@email.com',
      phone: '+254 700 999 888',
      status: 'Active', 
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Just now',
      deviceType: 'iOS',
      location: 'Nairobi',
      isNew: true
    },
    { 
      id: 14, 
      name: 'Janet Achieng', 
      username: 'janet_a',
      email: 'janet@email.com',
      phone: '+254 700 888 777',
      status: 'Active', 
      joinDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      lastLogin: '2 hours ago',
      deviceType: 'Android',
      location: 'Kisumu',
      isNew: true
    },
    { 
      id: 1, 
      name: 'Susan Wanjiku', 
      username: 'susan_w',
      email: 'susan@email.com',
      phone: '+254 700 111 222',
      status: 'Active', 
      joinDate: '2024-01-10',
      lastLogin: '2024-01-25 10:30',
      deviceType: 'Android',
      location: 'Nairobi'
    },
    { 
      id: 2, 
      name: 'Michael Omondi', 
      username: 'mike_o',
      email: 'michael@email.com',
      phone: '+254 700 333 444',
      status: 'Active', 
      joinDate: '2024-01-12',
      lastLogin: '2024-01-25 14:15',
      deviceType: 'iOS',
      location: 'Mombasa'
    },
    { 
      id: 3, 
      name: 'Catherine Nyong', 
      username: 'cathy_n',
      email: 'catherine@email.com',
      phone: '+254 700 555 666',
      status: 'Inactive', 
      joinDate: '2024-01-08',
      lastLogin: '2024-01-20 09:45',
      deviceType: 'Android',
      location: 'Kisumu'
    },
    { 
      id: 4, 
      name: 'Robert Kimani', 
      username: 'rob_k',
      email: 'robert@email.com',
      phone: '+254 700 777 888',
      status: 'Suspended', 
      joinDate: '2024-01-05',
      lastLogin: '2024-01-22 16:20',
      deviceType: 'Android',
      location: 'Nakuru'
    },
    { 
      id: 5, 
      name: 'Grace Muthoni', 
      username: 'grace_m',
      email: 'grace@email.com',
      phone: '+254 700 123 456',
      status: 'Active', 
      joinDate: '2024-01-15',
      lastLogin: '2024-01-25 11:45',
      deviceType: 'iOS',
      location: 'Eldoret'
    },
    { 
      id: 6, 
      name: 'Peter Njoroge', 
      username: 'peter_n',
      email: 'peter@email.com',
      phone: '+254 700 234 567',
      status: 'Active', 
      joinDate: '2024-01-18',
      lastLogin: '2024-01-25 13:20',
      deviceType: 'Android',
      location: 'Thika'
    },
    { 
      id: 7, 
      name: 'Mary Wambui', 
      username: 'mary_w',
      email: 'mary@email.com',
      phone: '+254 700 345 678',
      status: 'Inactive', 
      joinDate: '2024-01-20',
      lastLogin: '2024-01-23 08:30',
      deviceType: 'iOS',
      location: 'Nyeri'
    },
    { 
      id: 8, 
      name: 'John Otieno', 
      username: 'john_o',
      email: 'john@email.com',
      phone: '+254 700 456 789',
      status: 'Active', 
      joinDate: '2024-01-22',
      lastLogin: '2024-01-25 15:00',
      deviceType: 'Android',
      location: 'Machakos'
    },
    { 
      id: 9, 
      name: 'Alice Kamau', 
      username: 'alice_k',
      email: 'alice@email.com',
      phone: '+254 700 567 890',
      status: 'Active', 
      joinDate: '2024-01-23',
      lastLogin: '2024-01-25 16:45',
      deviceType: 'iOS',
      location: 'Kiambu'
    },
    { 
      id: 10, 
      name: 'David Mutua', 
      username: 'david_m',
      email: 'david@email.com',
      phone: '+254 700 678 901',
      status: 'Active', 
      joinDate: '2024-01-24',
      lastLogin: '2024-01-25 09:15',
      deviceType: 'Android',
      location: 'Naivasha'
    },
    { 
      id: 11, 
      name: 'Esther Wanjiru', 
      username: 'esther_w',
      email: 'esther@email.com',
      phone: '+254 700 789 012',
      status: 'Inactive', 
      joinDate: '2024-01-06',
      lastLogin: '2024-01-18 14:30',
      deviceType: 'iOS',
      location: 'Meru'
    },
    { 
      id: 12, 
      name: 'James Kiprop', 
      username: 'james_k',
      email: 'james@email.com',
      phone: '+254 700 890 123',
      status: 'Active', 
      joinDate: '2024-01-25',
      lastLogin: '2024-01-25 17:30',
      deviceType: 'Android',
      location: 'Kericho'
    },
    { 
      id: 13, 
      name: 'Faith Chebet', 
      username: 'faith_c',
      email: 'faith@email.com',
      phone: '+254 700 901 234',
      status: 'Active', 
      joinDate: '2024-01-25',
      lastLogin: '2024-01-25 18:00',
      deviceType: 'iOS',
      location: 'Nanyuki'
    }
  ];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = [...allAppUsers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(user => user.status === 'Active');
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(user => user.status === 'Inactive' || user.status === 'Suspended');
    }

    // Device filter
    if (deviceFilter === 'android') {
      filtered = filtered.filter(user => user.deviceType === 'Android');
    } else if (deviceFilter === 'ios') {
      filtered = filtered.filter(user => user.deviceType === 'iOS');
    }

    return filtered;
  }, [searchTerm, statusFilter, deviceFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Stats calculations
  const totalUsers = allAppUsers.length;
  const activeUsers = allAppUsers.filter(u => u.status === 'Active').length;
  const androidUsers = allAppUsers.filter(u => u.deviceType === 'Android').length;
  const iosUsers = allAppUsers.filter(u => u.deviceType === 'iOS').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-yellow-100 text-yellow-700';
      case 'Suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Wifi className="w-3 h-3" />;
      case 'Inactive': return <WifiOff className="w-3 h-3" />;
      case 'Suspended': return <Shield className="w-3 h-3" />;
      default: return null;
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">App Users</h1>
        <p className="text-gray-600 mt-1">Manage mobile application users</p>
      </div>

      {/* Stats Cards with Gradients */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Users - Green Gradient */}
        <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Users</p>
          <p className="text-2xl font-bold mt-1">{totalUsers}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">All registered users</span>
            <Smartphone className="w-5 h-5 opacity-50" />
          </div>
        </div>
        
        {/* Active Users - Orange Gradient */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-600 rounded-lg p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Active</p>
          <p className="text-2xl font-bold mt-1">{activeUsers}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">{Math.round((activeUsers/totalUsers)*100)}% of total</span>
            <Wifi className="w-5 h-5 opacity-50" />
          </div>
        </div>
        
        {/* Android Users - Blue Gradient */}
        <div className="bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Android</p>
          <p className="text-2xl font-bold mt-1">{androidUsers}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">{Math.round((androidUsers/totalUsers)*100)}% of users</span>
            <Bot className="w-5 h-5 opacity-50" />
          </div>
        </div>
        
        {/* iOS Users - Yellow Gradient */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">iOS</p>
          <p className="text-2xl font-bold mt-1">{iosUsers}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">{Math.round((iosUsers/totalUsers)*100)}% of users</span>
            <Apple className="w-5 h-5 opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Status */}
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'active' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter('inactive')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'inactive' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Inactive
          </button>

          <div className="border-l border-gray-300 mx-2"></div>

          {/* Device */}
          <button
            onClick={() => setDeviceFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              deviceFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Devices
          </button>
          <button
            onClick={() => setDeviceFilter('android')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              deviceFilter === 'android' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            Android
          </button>
          <button
            onClick={() => setDeviceFilter('ios')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              deviceFilter === 'ios' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Apple className="w-4 h-4" />
            iOS
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          {user.isNew && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">NEW</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.deviceType === 'iOS' ? (
                        <Apple className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                      <span className="text-sm text-gray-900">{user.deviceType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-gray-400 hover:text-gray-600">
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
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