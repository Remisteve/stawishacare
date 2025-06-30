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
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Activity,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Building2,
  Key,
  Lock
} from 'lucide-react';

export default function AdminManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock admin data
  const admins = [
    {
      id: 1,
      name: 'Alice Wanjiru',
      email: 'alice.wanjiru@prepguard.com',
      phone: '+254 712 345 678',
      role: 'Regional Admin',
      region: 'Nairobi Region',
      facility: 'Nairobi Central Hospital',
      location: 'Nairobi, Kenya',
      status: 'active',
      permissions: ['user_management', 'facility_management', 'reports'],
      lastLogin: '2024-06-28T08:30:00',
      joinDate: '2022-03-15',
      managedFacilities: 8,
      managedUsers: 145,
      accessLevel: 'high'
    },
    {
      id: 2,
      name: 'Peter Kamau',
      email: 'peter.kamau@prepguard.com',
      phone: '+254 722 987 654',
      role: 'Facility Admin',
      region: 'Coast Region',
      facility: 'Mombasa Health Center',
      location: 'Mombasa, Kenya',
      status: 'active',
      permissions: ['facility_management', 'reports'],
      lastLogin: '2024-06-28T06:15:00',
      joinDate: '2021-11-22',
      managedFacilities: 3,
      managedUsers: 78,
      accessLevel: 'medium'
    },
    {
      id: 3,
      name: 'Grace Ochieng',
      email: 'grace.ochieng@prepguard.com',
      phone: '+254 733 456 789',
      role: 'Data Admin',
      region: 'Nyanza Region',
      facility: 'Kisumu Medical Center',
      location: 'Kisumu, Kenya',
      status: 'pending',
      permissions: ['reports', 'data_export'],
      lastLogin: '2024-06-27T14:45:00',
      joinDate: '2024-01-10',
      managedFacilities: 1,
      managedUsers: 23,
      accessLevel: 'low'
    },
    {
      id: 4,
      name: 'Samuel Kiprop',
      email: 'samuel.kiprop@prepguard.com',
      phone: '+254 744 123 456',
      role: 'System Admin',
      region: 'Rift Valley Region',
      facility: 'Eldoret Regional Hospital',
      location: 'Eldoret, Kenya',
      status: 'inactive',
      permissions: ['system_config', 'user_management', 'facility_management', 'reports'],
      lastLogin: '2024-06-20T10:20:00',
      joinDate: '2020-08-05',
      managedFacilities: 12,
      managedUsers: 203,
      accessLevel: 'high'
    }
  ];

  // Statistics
  const stats = [
    {
      title: 'Total Admins',
      value: '12',
      change: '+8.3%',
      trend: 'up',
      icon: UserCheck,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Admins',
      value: '10',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Approval',
      value: '2',
      change: '0',
      trend: 'neutral',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Managed Facilities',
      value: '24',
      change: '+4',
      trend: 'up',
      icon: Building2,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'inactive': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Regional Admin': return Shield;
      case 'Facility Admin': return Building2;
      case 'Data Admin': return BarChart3;
      case 'System Admin': return Key;
      default: return UserCheck;
    }
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || admin.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Management</h1>
              <p className="text-gray-600">Manage system administrators and their access permissions</p>
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
                Add Admin
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
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 
                    stat.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {stat.trend !== 'neutral' && (
                      <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    )}
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
                  placeholder="Search by name, email, or role..."
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
                {filteredAdmins.length} of {admins.length} admins
              </span>
            </div>
          </div>
        </div>

        {/* Admins Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAdmins.map((admin) => {
            const RoleIcon = getRoleIcon(admin.role);
            
            return (
              <div key={admin.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
                {/* Admin Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {admin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{admin.name}</h3>
                        <div className="flex items-center mb-2">
                          <RoleIcon className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600 font-medium">{admin.role}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(admin.status)}`}>
                            {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                          </span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getAccessLevelColor(admin.accessLevel)}`}>
                            {admin.accessLevel.charAt(0).toUpperCase() + admin.accessLevel.slice(1)} Access
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{admin.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{admin.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{admin.facility}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{admin.region}</span>
                    </div>
                  </div>
                </div>

                {/* Admin Stats & Permissions */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{admin.managedFacilities}</p>
                      <p className="text-xs text-gray-500">Facilities</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{admin.managedUsers}</p>
                      <p className="text-xs text-gray-500">Users</p>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>Last login: {new Date(admin.lastLogin).toLocaleDateString()}</span>
                    <span>Joined: {new Date(admin.joinDate).toLocaleDateString()}</span>
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
                    <button className="bg-purple-50 text-purple-600 py-2 px-3 rounded-lg font-medium hover:bg-purple-100 transition-colors">
                      <Lock className="w-4 h-4" />
                    </button>
                    <button className="bg-red-50 text-red-600 py-2 px-3 rounded-lg font-medium hover:bg-red-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAdmins.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No admins found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
              Add First Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}