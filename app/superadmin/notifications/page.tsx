'use client'

import React, { useState, useMemo } from 'react';
import { 
  Bell,
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Send,
  Users,
  AlertTriangle,
  Clock,
  Mail,
  MessageSquare,
  Calendar,
  Activity,
  FileText,
  TrendingUp,
  Download,
  Settings,
  User,
  Heart,
  Zap
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'system' | 'patient' | 'doctor' | 'appointment' | 'critical' | 'info';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'sent' | 'pending' | 'draft' | 'failed';
  recipients: string;
  recipientCount: number;
  sentDate: string;
  scheduledDate?: string;
  createdBy: string;
  readCount: number;
  clickCount: number;
  channel: 'email' | 'sms' | 'push' | 'all';
  category: string;
}

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

type NotificationType = 'system' | 'patient' | 'doctor' | 'appointment' | 'critical' | 'info';
type StatusType = 'sent' | 'pending' | 'draft' | 'failed';
type PriorityType = 'low' | 'medium' | 'high' | 'urgent';

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | NotificationType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | StatusType>('all');

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance on Sunday, July 7th from 2:00 AM to 4:00 AM EAT. All services will be temporarily unavailable.',
      type: 'system',
      priority: 'high',
      status: 'sent',
      recipients: 'All Users',
      recipientCount: 1247,
      sentDate: '2024-07-02T10:30:00',
      createdBy: 'System Admin',
      readCount: 892,
      clickCount: 45,
      channel: 'all',
      category: 'System Alert'
    },
    {
      id: 2,
      title: 'New Patient Enrollment Alert',
      message: 'High-risk patient enrolled in PrEP program. Immediate attention required for case review.',
      type: 'critical',
      priority: 'urgent',
      status: 'sent',
      recipients: 'HIV Specialists',
      recipientCount: 12,
      sentDate: '2024-07-03T08:15:00',
      createdBy: 'Dr. Sarah Johnson',
      readCount: 12,
      clickCount: 8,
      channel: 'push',
      category: 'Patient Alert'
    },
    {
      id: 3,
      title: 'Appointment Reminders - Tomorrow',
      message: 'Automated reminder for 47 patients with appointments scheduled for July 4th, 2024.',
      type: 'appointment',
      priority: 'medium',
      status: 'pending',
      recipients: 'Scheduled Patients',
      recipientCount: 47,
      sentDate: '2024-07-03T18:00:00',
      scheduledDate: '2024-07-03T18:00:00',
      createdBy: 'Appointment System',
      readCount: 0,
      clickCount: 0,
      channel: 'sms',
      category: 'Reminder'
    },
    {
      id: 4,
      title: 'Monthly Performance Report Ready',
      message: 'June 2024 healthcare performance report has been generated and is ready for review.',
      type: 'info',
      priority: 'low',
      status: 'sent',
      recipients: 'Management Team',
      recipientCount: 8,
      sentDate: '2024-07-01T09:00:00',
      createdBy: 'Reports System',
      readCount: 6,
      clickCount: 6,
      channel: 'email',
      category: 'Report'
    },
    {
      id: 5,
      title: 'Doctor Status Update Required',
      message: 'Dr. Michael Ochieng has been inactive for 48 hours. Please verify status and update availability.',
      type: 'doctor',
      priority: 'high',
      status: 'draft',
      recipients: 'HR Department',
      recipientCount: 3,
      sentDate: '',
      createdBy: 'HR System',
      readCount: 0,
      clickCount: 0,
      channel: 'email',
      category: 'Staff Alert'
    },
    {
      id: 6,
      title: 'PrEP Champion Training Reminder',
      message: 'Reminder: Advanced HIV Prevention training starts tomorrow at 9:00 AM at Nairobi Training Center.',
      type: 'info',
      priority: 'medium',
      status: 'sent',
      recipients: 'PrEP Champions',
      recipientCount: 24,
      sentDate: '2024-07-02T16:30:00',
      createdBy: 'Training Coordinator',
      readCount: 20,
      clickCount: 18,
      channel: 'sms',
      category: 'Training'
    }
  ];

  // Statistics
  const stats: Stat[] = [
    {
      title: 'Total Sent',
      value: '1,347',
      change: '+12.3%',
      trend: 'up',
      icon: Send,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Open Rate',
      value: '78.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Eye,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Critical Alerts',
      value: '8',
      change: '-3',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const getTypeColor = (type: NotificationType): string => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-700 border border-red-200';
      case 'system': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'patient': return 'bg-green-100 text-green-700 border border-green-200';
      case 'doctor': return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'appointment': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'info': return 'bg-gray-100 text-gray-700 border border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: PriorityType): string => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'patient': return <User className="w-4 h-4" />;
      case 'doctor': return <Heart className="w-4 h-4" />;
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'info': return <FileText className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-3 h-3" />;
      case 'sms': return <MessageSquare className="w-3 h-3" />;
      case 'push': return <Zap className="w-3 h-3" />;
      case 'all': return <Activity className="w-3 h-3" />;
      default: return <Bell className="w-3 h-3" />;
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.recipients.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || notification.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter, notifications]);

  const handleCreateNotification = () => {
    console.log('Opening create notification modal...');
    // In a real app, this would open a modal or navigate to create notification page
  };

  const handleExport = () => {
    console.log('Exporting notifications data...');
    // In a real app, this would trigger data export functionality
  };

  const handleViewNotification = (notification: Notification) => {
    console.log('Viewing notification:', notification.title);
    // In a real app, this would open notification details modal
  };

  const handleEditNotification = (notification: Notification) => {
    console.log('Editing notification:', notification.title);
    // In a real app, this would open edit modal
  };

  const handleDeleteNotification = (notification: Notification) => {
    console.log('Deleting notification:', notification.title);
    // In a real app, this would show confirmation dialog and delete
  };

  const handleMoreActions = (notification: Notification) => {
    console.log('More actions for notification:', notification.title);
    // In a real app, this would show dropdown menu
  };

  const handleCreateFirstNotification = () => {
    console.log('Creating first notification...');
    // In a real app, this would open create notification modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-blue-600" />
                Notifications Management
              </h1>
              <p className="text-gray-600">Create, manage and track system notifications and communications</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={handleExport}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center"
                aria-label="Export notifications data"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button 
                type="button"
                onClick={handleCreateNotification}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center shadow-lg"
                aria-label="Create new notification"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Notification
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
                    <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} aria-hidden="true" />
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search notifications by title, message, or recipients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  aria-label="Search notifications"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | NotificationType)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter notifications by type"
                >
                  <option value="all">All Types</option>
                  <option value="critical">Critical</option>
                  <option value="system">System</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="appointment">Appointment</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | StatusType)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Filter notifications by status"
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <span className="text-sm text-gray-500">
                {filteredNotifications.length} of {notifications.length} notifications
              </span>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(notification.type)}`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notification.priority)}`}>
                          {notification.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(notification.status)}`}>
                          {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 leading-relaxed">{notification.message}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2" aria-hidden="true" />
                          <span>{notification.recipients} ({notification.recipientCount})</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {getChannelIcon(notification.channel)}
                          <span className="ml-2 capitalize">{notification.channel}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                          <span>{notification.category}</span>
                        </div>
                      </div>
                      
                      {notification.status === 'sent' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="text-sm">
                            <span className="text-gray-500">Read Rate:</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {Math.round((notification.readCount / notification.recipientCount) * 100)}%
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Clicks:</span>
                            <span className="ml-2 font-semibold text-blue-600">{notification.clickCount}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Sent:</span>
                            <span className="ml-2 font-semibold text-gray-900">
                              {new Date(notification.sentDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {notification.status === 'pending' && notification.scheduledDate && (
                        <div className="text-sm text-orange-600 mb-3">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Scheduled for: {new Date(notification.scheduledDate).toLocaleString()}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        Created by: {notification.createdBy}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      type="button"
                      onClick={() => handleViewNotification(notification)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      aria-label={`View notification: ${notification.title}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleEditNotification(notification)}
                      className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                      aria-label={`Edit notification: ${notification.title}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDeleteNotification(notification)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      aria-label={`Delete notification: ${notification.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleMoreActions(notification)}
                      className="p-2 hover:bg-gray-50 text-gray-600 rounded-lg transition-colors"
                      aria-label={`More actions for notification: ${notification.title}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center mt-8">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              type="button"
              onClick={handleCreateFirstNotification}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
              aria-label="Create your first notification"
            >
              Create First Notification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}