// /app/superadmin/module/components/JoinedOnline.tsx

'use client';

import React, { useState } from 'react';
import { Globe, Search, Edit, Trash2, Calendar, Users, Smartphone, Monitor, Activity } from 'lucide-react';

export default function JoinedOnline() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const onlineUsers = [
    {
      id: 1,
      name: 'Mary Wanjiku',
      username: 'mary_w',
      email: 'mary@email.com',
      joinDate: '2024-01-15',
      status: 'Online',
      lastActive: '2 minutes ago',
      device: 'Mobile',
      platform: 'Android',
      location: 'Nairobi',
      sessionsToday: 3,
      totalSessions: 45,
      avgSessionTime: '12 mins'
    },
    {
      id: 2,
      name: 'John Kimani',
      username: 'john_k',
      email: 'john@email.com',
      joinDate: '2024-01-10',
      status: 'Online',
      lastActive: '5 minutes ago',
      device: 'Desktop',
      platform: 'Windows',
      location: 'Mombasa',
      sessionsToday: 1,
      totalSessions: 67,
      avgSessionTime: '18 mins'
    },
    {
      id: 3,
      name: 'Grace Akinyi',
      username: 'grace_a',
      email: 'grace@email.com',
      joinDate: '2024-01-20',
      status: 'Away',
      lastActive: '15 minutes ago',
      device: 'Mobile',
      platform: 'iOS',
      location: 'Kisumu',
      sessionsToday: 2,
      totalSessions: 23,
      avgSessionTime: '8 mins'
    },
    {
      id: 4,
      name: 'David Ochieng',
      username: 'david_o',
      email: 'david@email.com',
      joinDate: '2024-01-08',
      status: 'Online',
      lastActive: '1 minute ago',
      device: 'Tablet',
      platform: 'iPad',
      location: 'Nakuru',
      sessionsToday: 4,
      totalSessions: 89,
      avgSessionTime: '22 mins'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'Away': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="w-4 h-4" />;
      case 'Desktop': return <Monitor className="w-4 h-4" />;
      case 'Tablet': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Online': return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>;
      case 'Away': return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case 'Offline': return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const activityMetrics = [
    { label: 'Peak Hours', value: '2PM - 4PM', icon: Activity },
    { label: 'Avg Session', value: '15 mins', icon: Calendar },
    { label: 'Mobile Users', value: '68%', icon: Smartphone },
    { label: 'Return Rate', value: '84%', icon: Users }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Joined Online</h1>
          <p className="text-gray-600">Monitor online user activity and engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 text-sm font-medium">Live Tracking</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Globe className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Currently Online</p>
              <p className="text-2xl font-bold text-gray-900">342</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Today</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">New Joiners Today</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">5,634</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Activity Metrics */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Insights</h3>
            <div className="space-y-4">
              {activityMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <metric.icon className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                      <p className="text-lg font-bold text-blue-600">{metric.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search online users..."
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
                <option value="all">All Users</option>
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="mobile">Mobile Users</option>
                <option value="desktop">Desktop Users</option>
              </select>
            </div>
          </div>

          {/* Online Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
              <div className="flex items-center text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Real-time Updates
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {onlineUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{user.lastActive}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getDeviceIcon(user.device)}
                          <div className="ml-2">
                            <div className="text-sm text-gray-900">{user.device}</div>
                            <div className="text-xs text-gray-500">{user.platform}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.sessionsToday}/today</div>
                        <div className="text-xs text-gray-500">{user.totalSessions} total</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.avgSessionTime}
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
        </div>
      </div>
    </div>
  );
}