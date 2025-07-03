// /app/superadmin/module/components/BlockedUsers.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Ban, Search, Edit, RefreshCw, AlertTriangle, Shield,
  ChevronLeft, ChevronRight, Eye, Download, UserX,
  Globe, Smartphone, Lock, AlertCircle, Activity,
  MapPin, MoreVertical, XCircle, CheckCircle
  // Removed unused imports: Trash2, Clock, Filter, Wifi, Calendar
} from 'lucide-react';

interface BlockedUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  ipAddress: string;
  device: string;
  location: string;
  reason: string;
  category: 'Security Threat' | 'Policy Violation' | 'Fraud Attempt' | 'Spam/Abuse' | 'Multiple Violations';
  blockedDate: string;
  blockedTime: string;
  blockedBy: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  attempts: number;
  lastAttempt: string;
  blockDuration: string;
  status: 'Permanent' | 'Temporary' | 'Under Review';
  notes?: string;
}

export default function BlockedUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'security' | 'policy' | 'fraud' | 'spam'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'permanent' | 'temporary' | 'review'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Extended blocked users data
  const allBlockedUsers: BlockedUser[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+254 700 111 222',
      ipAddress: '192.168.1.45',
      device: 'Windows PC',
      location: 'Nairobi, Kenya',
      reason: 'Multiple brute force login attempts detected',
      category: 'Security Threat',
      blockedDate: '2024-01-25',
      blockedTime: '14:30:22',
      blockedBy: 'Security System',
      severity: 'Critical',
      attempts: 157,
      lastAttempt: '2024-01-25 14:30',
      blockDuration: 'Permanent',
      status: 'Permanent',
      notes: 'Automated security system detected suspicious activity pattern'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+254 700 333 444',
      ipAddress: '10.0.0.123',
      device: 'iPhone 14',
      location: 'Mombasa, Kenya',
      reason: 'Account sharing violation - multiple concurrent logins',
      category: 'Policy Violation',
      blockedDate: '2024-01-24',
      blockedTime: '16:45:10',
      blockedBy: 'Admin Sarah',
      severity: 'Medium',
      attempts: 8,
      lastAttempt: '2024-01-24 16:45',
      blockDuration: '30 days',
      status: 'Temporary',
      notes: 'User warned previously about account sharing'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob.wilson@email.com',
      phone: '+254 700 555 666',
      ipAddress: '41.89.64.78',
      device: 'Android Phone',
      location: 'Kisumu, Kenya',
      reason: 'Attempted unauthorized access to patient records',
      category: 'Security Threat',
      blockedDate: '2024-01-23',
      blockedTime: '09:15:33',
      blockedBy: 'Dr. Johnson',
      severity: 'Critical',
      attempts: 23,
      lastAttempt: '2024-01-25 11:20',
      blockDuration: 'Under Review',
      status: 'Under Review',
      notes: 'Escalated to security team for investigation'
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice.brown@email.com',
      phone: '+254 700 777 888',
      ipAddress: '197.232.61.91',
      device: 'MacBook Pro',
      location: 'Nakuru, Kenya',
      reason: 'Sending bulk spam messages to patients',
      category: 'Spam/Abuse',
      blockedDate: '2024-01-22',
      blockedTime: '11:20:15',
      blockedBy: 'System Auto',
      severity: 'High',
      attempts: 45,
      lastAttempt: '2024-01-22 11:20',
      blockDuration: '90 days',
      status: 'Temporary'
    },
    {
      id: 5,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+254 700 888 999',
      ipAddress: '102.217.145.32',
      device: 'Windows Laptop',
      location: 'Eldoret, Kenya',
      reason: 'Fraudulent prescription requests',
      category: 'Fraud Attempt',
      blockedDate: '2024-01-21',
      blockedTime: '15:50:42',
      blockedBy: 'Dr. Williams',
      severity: 'Critical',
      attempts: 12,
      lastAttempt: '2024-01-21 15:50',
      blockDuration: 'Permanent',
      status: 'Permanent',
      notes: 'Reported to authorities'
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+254 700 123 456',
      ipAddress: '154.78.23.156',
      device: 'iPad',
      location: 'Thika, Kenya',
      reason: 'Violating HIPAA compliance - screenshot attempts',
      category: 'Policy Violation',
      blockedDate: '2024-01-20',
      blockedTime: '10:30:55',
      blockedBy: 'Compliance Team',
      severity: 'High',
      attempts: 5,
      lastAttempt: '2024-01-20 10:30',
      blockDuration: '60 days',
      status: 'Temporary'
    },
    {
      id: 7,
      name: 'Peter Omondi',
      email: 'peter.o@email.com',
      phone: '+254 700 234 567',
      ipAddress: '41.90.176.234',
      device: 'Android Tablet',
      location: 'Nyeri, Kenya',
      reason: 'Multiple terms of service violations',
      category: 'Multiple Violations',
      blockedDate: '2024-01-19',
      blockedTime: '08:45:18',
      blockedBy: 'Admin Team',
      severity: 'High',
      attempts: 34,
      lastAttempt: '2024-01-24 14:20',
      blockDuration: 'Permanent',
      status: 'Permanent'
    },
    {
      id: 8,
      name: 'Grace Mutua',
      email: 'grace.m@email.com',
      phone: '+254 700 345 678',
      ipAddress: '196.201.214.67',
      device: 'Windows Desktop',
      location: 'Machakos, Kenya',
      reason: 'Abusive behavior towards staff',
      category: 'Policy Violation',
      blockedDate: '2024-01-18',
      blockedTime: '13:25:30',
      blockedBy: 'HR Department',
      severity: 'Medium',
      attempts: 2,
      lastAttempt: '2024-01-18 13:25',
      blockDuration: '14 days',
      status: 'Temporary'
    },
    {
      id: 9,
      name: 'David Kimani',
      email: 'david.k@email.com',
      phone: '+254 700 456 789',
      ipAddress: '41.89.192.45',
      device: 'Linux PC',
      location: 'Kiambu, Kenya',
      reason: 'SQL injection attempts detected',
      category: 'Security Threat',
      blockedDate: '2024-01-17',
      blockedTime: '22:10:45',
      blockedBy: 'Security System',
      severity: 'Critical',
      attempts: 89,
      lastAttempt: '2024-01-17 22:10',
      blockDuration: 'Permanent',
      status: 'Permanent',
      notes: 'IP address blacklisted'
    },
    {
      id: 10,
      name: 'Ruth Wanjiru',
      email: 'ruth.w@email.com',
      phone: '+254 700 567 890',
      ipAddress: '102.134.89.123',
      device: 'iPhone 13',
      location: 'Naivasha, Kenya',
      reason: 'Creating fake patient accounts',
      category: 'Fraud Attempt',
      blockedDate: '2024-01-16',
      blockedTime: '17:40:22',
      blockedBy: 'Admin Michael',
      severity: 'High',
      attempts: 18,
      lastAttempt: '2024-01-16 17:40',
      blockDuration: '180 days',
      status: 'Temporary'
    },
    {
      id: 11,
      name: 'James Odhiambo',
      email: 'james.o@email.com',
      phone: '+254 700 678 901',
      ipAddress: '197.248.4.178',
      device: 'Android Phone',
      location: 'Kakamega, Kenya',
      reason: 'Automated bot activity detected',
      category: 'Spam/Abuse',
      blockedDate: '2024-01-15',
      blockedTime: '04:15:55',
      blockedBy: 'Bot Detection System',
      severity: 'Medium',
      attempts: 234,
      lastAttempt: '2024-01-15 04:15',
      blockDuration: '30 days',
      status: 'Temporary'
    }
  ];

  // Filter logic
  const filteredUsers = useMemo(() => {
    let filtered = [...allBlockedUsers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.ipAddress.includes(searchTerm)
      );
    }

    // Severity filter
    if (severityFilter !== 'all') {
      const severityMap = {
        'critical': 'Critical',
        'high': 'High',
        'medium': 'Medium',
        'low': 'Low'
      };
      filtered = filtered.filter(user => user.severity === severityMap[severityFilter]);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      const categoryMap = {
        'security': 'Security Threat',
        'policy': 'Policy Violation',
        'fraud': 'Fraud Attempt',
        'spam': 'Spam/Abuse'
      };
      filtered = filtered.filter(user => user.category === categoryMap[categoryFilter]);
    }

    // Status filter
    if (statusFilter !== 'all') {
      const statusMap = {
        'permanent': 'Permanent',
        'temporary': 'Temporary',
        'review': 'Under Review'
      };
      filtered = filtered.filter(user => user.status === statusMap[statusFilter]);
    }

    return filtered;
  }, [searchTerm, severityFilter, categoryFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Stats
  const totalBlocked = allBlockedUsers.length;
  const criticalCount = allBlockedUsers.filter(u => u.severity === 'Critical').length;
  const permanentCount = allBlockedUsers.filter(u => u.status === 'Permanent').length;
  const recentAttempts = allBlockedUsers.reduce((sum, user) => sum + user.attempts, 0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <XCircle className="w-3 h-3" />;
      case 'High': return <AlertTriangle className="w-3 h-3" />;
      case 'Medium': return <AlertCircle className="w-3 h-3" />;
      case 'Low': return <Shield className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security Threat': return <Lock className="w-3 h-3" />;
      case 'Policy Violation': return <AlertCircle className="w-3 h-3" />;
      case 'Fraud Attempt': return <Ban className="w-3 h-3" />;
      case 'Spam/Abuse': return <UserX className="w-3 h-3" />;
      case 'Multiple Violations': return <AlertTriangle className="w-3 h-3" />;
      default: return <Shield className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Permanent': return 'text-red-600 bg-red-50';
      case 'Temporary': return 'text-orange-600 bg-orange-50';
      case 'Under Review': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
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
            <Ban className="w-8 h-8 text-red-600" />
            Blocked Users Management
          </h1>
          <p className="text-gray-600 mt-1 ml-11">Monitor and manage blocked user accounts and security threats</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center shadow-lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards with Gradients */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Blocked - Red Gradient */}
        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Blocked</p>
          <p className="text-2xl font-bold mt-1">{totalBlocked}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">All blocked users</span>
            <Ban className="w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* Critical Threats - Orange Gradient */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Critical Threats</p>
          <p className="text-2xl font-bold mt-1">{criticalCount}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">High risk users</span>
            <AlertTriangle className="w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* Permanent Blocks - Purple Gradient */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Permanent</p>
          <p className="text-2xl font-bold mt-1">{permanentCount}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Forever blocked</span>
            <Lock className="w-5 h-5 opacity-50" />
          </div>
        </div>

        {/* Recent Attempts - Blue Gradient */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 shadow-lg text-white">
          <p className="text-sm font-medium opacity-90">Total Attempts</p>
          <p className="text-2xl font-bold mt-1">{recentAttempts.toLocaleString()}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs opacity-75">Login attempts</span>
            <Activity className="w-5 h-5 opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, reason, or IP address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {/* Severity Filters */}
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              severityFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Severities
          </button>
          <button
            onClick={() => setSeverityFilter('critical')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              severityFilter === 'critical' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <XCircle className="w-3 h-3" />
            Critical
          </button>
          <button
            onClick={() => setSeverityFilter('high')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              severityFilter === 'high' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            High
          </button>
          <button
            onClick={() => setSeverityFilter('medium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 ${
              severityFilter === 'medium' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            Medium
          </button>

          <div className="border-l border-gray-300 mx-2"></div>

          {/* Category Filters */}
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              categoryFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setCategoryFilter('security')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              categoryFilter === 'security' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setCategoryFilter('policy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              categoryFilter === 'policy' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Policy
          </button>
          <button
            onClick={() => setCategoryFilter('fraud')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              categoryFilter === 'fraud' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Fraud
          </button>
          <button
            onClick={() => setCategoryFilter('spam')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              categoryFilter === 'spam' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Spam
          </button>

          <div className="border-l border-gray-300 mx-2"></div>

          {/* Status Filters */}
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'all' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Status
          </button>
          <button
            onClick={() => setStatusFilter('permanent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'permanent' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Permanent
          </button>
          <button
            onClick={() => setStatusFilter('temporary')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'temporary' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Temporary
          </button>
          <button
            onClick={() => setStatusFilter('review')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              statusFilter === 'review' 
                ? 'bg-slate-800 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Under Review
          </button>
        </div>
      </div>

      {/* Blocked Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Block Reason</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP & Device</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Block Info</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                      <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <Ban className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                        user.category === 'Security Threat' ? 'bg-red-100 text-red-700' :
                        user.category === 'Policy Violation' ? 'bg-yellow-100 text-yellow-700' :
                        user.category === 'Fraud Attempt' ? 'bg-purple-100 text-purple-700' :
                        user.category === 'Spam/Abuse' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getCategoryIcon(user.category)}
                        {user.category}
                      </span>
                      <p className="text-sm text-gray-900 mt-1">{user.reason}</p>
                      {user.notes && (
                        <p className="text-xs text-gray-500 mt-0.5 italic">{user.notes}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${getSeverityColor(user.severity)}`}>
                      {getSeverityIcon(user.severity)}
                      {user.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <div className="flex items-center gap-1 text-gray-900">
                        <Globe className="w-3 h-3" />
                        {user.ipAddress}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Smartphone className="w-3 h-3" />
                        {user.device}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p className="text-gray-900">{user.blockedDate}</p>
                      <p className="text-xs text-gray-500">{user.blockedTime}</p>
                      <p className="text-xs text-gray-500">By: {user.blockedBy}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{user.attempts}</p>
                      <p className="text-xs text-gray-500">attempts</p>
                      <p className="text-xs text-gray-400">Last: {user.lastAttempt}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      {user.status !== 'Permanent' && (
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Unblock">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 text-gray-600 hover:bg-gray-50 rounded" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:bg-gray-50 rounded" title="More">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} blocked users
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
  );
}