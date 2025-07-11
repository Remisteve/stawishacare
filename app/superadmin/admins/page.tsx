'use client'

import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  UserCheck,
  Building2,
  Key,
  Lock,
  BarChart3,
  Sparkles,
  ChevronRight,
  Settings,
  AlertCircle,
  Zap,
  Activity
} from 'lucide-react';

export default function AdminManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

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
      accessLevel: 'high',
      activityScore: 92,
      recentActions: 24
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
      accessLevel: 'medium',
      activityScore: 78,
      recentActions: 12
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
      accessLevel: 'low',
      activityScore: 45,
      recentActions: 5
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
      accessLevel: 'high',
      activityScore: 15,
      recentActions: 0
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
      bgColor: 'bg-blue-50',
      glowColor: 'shadow-blue-500/50'
    },
    {
      title: 'Active Admins',
      value: '10',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      glowColor: 'shadow-emerald-500/50'
    },
    {
      title: 'Pending Approval',
      value: '2',
      change: '0',
      trend: 'neutral',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      glowColor: 'shadow-amber-500/50'
    },
    {
      title: 'Managed Facilities',
      value: '24',
      change: '+4',
      trend: 'up',
      icon: Building2,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      glowColor: 'shadow-purple-500/50'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30';
      case 'pending': return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30';
      case 'inactive': return 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg';
    }
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-500/10 text-red-600 backdrop-blur-sm border border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 backdrop-blur-sm border border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 backdrop-blur-sm border border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 backdrop-blur-sm border border-gray-500/20';
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mr-4 shadow-lg shadow-indigo-500/50">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">Admin Management</h1>
              </div>
              <p className="text-gray-300 ml-16">Manage system administrators and their access permissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-white/20 transition-all flex items-center group">
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Export
              </button>
              <button 
                onClick={handleRefresh}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-white/20 transition-all flex items-center group"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                Sync
              </button>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/70 transform hover:-translate-y-0.5">
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
                <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`relative group`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity ${stat.glowColor}`}></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`flex items-center px-3 py-1.5 rounded-lg ${
                    stat.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400 backdrop-blur-sm' : 
                    stat.trend === 'down' ? 'bg-red-500/20 text-red-400 backdrop-blur-sm' : 'bg-gray-500/20 text-gray-400 backdrop-blur-sm'
                  }`}>
                    {stat.trend !== 'neutral' && (
                      <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    )}
                    <span className="text-xs font-bold">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-300" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <span className="text-sm text-gray-300">
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
              <div 
                key={admin.id} 
                className="relative group"
                onMouseEnter={() => setHoveredCard(admin.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/20 transition-all hover:-translate-y-1">
                  {/* Admin Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white/20 ${
                            admin.status === 'active' ? 'bg-emerald-500' : 
                            admin.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                          } ${admin.status === 'active' ? 'animate-pulse' : ''}`}></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{admin.name}</h3>
                          <div className="flex items-center mb-2">
                            <RoleIcon className="w-4 h-4 mr-2 text-gray-300" />
                            <span className="text-sm text-gray-300 font-medium">{admin.role}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(admin.status)}`}>
                              <span className="flex items-center">
                                {admin.status === 'active' && <Zap className="w-3 h-3 mr-1" />}
                                {admin.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                {admin.status === 'inactive' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                              </span>
                            </span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getAccessLevelColor(admin.accessLevel)}`}>
                              {admin.accessLevel.charAt(0).toUpperCase() + admin.accessLevel.slice(1)} Access
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors group">
                        <MoreVertical className="w-4 h-4 text-gray-400 group-hover:text-white" />
                      </button>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300 group/item hover:text-white transition-colors">
                        <Mail className="w-4 h-4 mr-2 text-gray-400 group-hover/item:text-white" />
                        <span>{admin.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300 group/item hover:text-white transition-colors">
                        <Phone className="w-4 h-4 mr-2 text-gray-400 group-hover/item:text-white" />
                        <span>{admin.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300 group/item hover:text-white transition-colors">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400 group-hover/item:text-white" />
                        <span>{admin.facility}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-300 group/item hover:text-white transition-colors">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 group-hover/item:text-white" />
                        <span>{admin.region}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Stats & Permissions */}
                  <div className="p-6">
                    {/* Activity Score */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-300 font-medium">Activity Score</span>
                        <span className="text-xs text-white font-bold">{admin.activityScore}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            admin.activityScore > 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                            admin.activityScore > 50 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                            'bg-gradient-to-r from-red-500 to-rose-500'
                          }`}
                          style={{ width: `${hoveredCard === admin.id ? admin.activityScore : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{admin.managedFacilities}</p>
                        <p className="text-xs text-gray-400">Facilities</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">{admin.managedUsers}</p>
                        <p className="text-xs text-gray-400">Users</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white flex items-center justify-center">
                          {admin.recentActions}
                          <Activity className="w-4 h-4 ml-1 text-indigo-400" />
                        </p>
                        <p className="text-xs text-gray-400">Actions</p>
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-white mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-lg font-medium backdrop-blur-sm border border-indigo-500/30 hover:bg-indigo-500/30 hover:text-white transition-all cursor-default">
                            {permission.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>Last login: {new Date(admin.lastLogin).toLocaleDateString()}</span>
                      <span>Joined: {new Date(admin.joinDate).toLocaleDateString()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-indigo-500/20 text-indigo-300 py-2 px-3 rounded-lg font-medium hover:bg-indigo-500/30 hover:text-white transition-all flex items-center justify-center group backdrop-blur-sm border border-indigo-500/30">
                        <Eye className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                        View
                      </button>
                      <button className="flex-1 bg-white/10 text-gray-300 py-2 px-3 rounded-lg font-medium hover:bg-white/20 hover:text-white transition-all flex items-center justify-center group backdrop-blur-sm border border-white/20">
                        <Edit className="w-4 h-4 mr-1 group-hover:rotate-12 transition-transform" />
                        Edit
                      </button>
                      <button className="bg-purple-500/20 text-purple-300 py-2 px-3 rounded-lg font-medium hover:bg-purple-500/30 hover:text-white transition-all backdrop-blur-sm border border-purple-500/30 group">
                        <Lock className="w-4 h-4 group-hover:animate-pulse" />
                      </button>
                      <button className="bg-red-500/20 text-red-300 py-2 px-3 rounded-lg font-medium hover:bg-red-500/30 hover:text-white transition-all backdrop-blur-sm border border-red-500/30 group">
                        <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAdmins.length === 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/50">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No admins found</h3>
            <p className="text-gray-300 mb-6">Try adjusting your search or filter criteria</p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/70 transform hover:-translate-y-0.5">
              Add First Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}