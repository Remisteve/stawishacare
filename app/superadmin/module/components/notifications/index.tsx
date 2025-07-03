'use client';

import React, { useState, useMemo } from 'react';
import { Volume2, Plus, Search, Edit, Trash2, Send, Bell, Mail, MessageSquare, AlertCircle } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  status: string;
  recipients: string;
  sentDate: string | null;
  priority: string;
  channel: string;
}

interface Template {
  id: number;
  name: string;
  type: string;
}

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showComposeModal, setShowComposeModal] = useState(false);

  const notifications: Notification[] = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      message: 'System maintenance will occur on Sunday, Feb 4th from 2:00 AM to 4:00 AM',
      type: 'System Alert',
      status: 'Sent',
      recipients: 'All Users',
      sentDate: '2024-01-25 10:30',
      priority: 'High',
      channel: 'Email + SMS'
    },
    {
      id: 2,
      title: 'PrEP Appointment Reminder',
      message: 'Reminder: You have a PrEP consultation appointment tomorrow at 2:00 PM',
      type: 'Appointment',
      status: 'Scheduled',
      recipients: '23 Patients',
      sentDate: '2024-01-25 14:00',
      priority: 'Medium',
      channel: 'SMS'
    },
    {
      id: 3,
      title: 'Monthly Health Report Available',
      message: 'Your monthly health report is now available for download',
      type: 'Report',
      status: 'Sent',
      recipients: 'Doctors',
      sentDate: '2024-01-24 09:00',
      priority: 'Low',
      channel: 'Email'
    },
    {
      id: 4,
      title: 'New HIV Prevention Guidelines',
      message: 'Updated HIV prevention guidelines have been published. Please review.',
      type: 'Update',
      status: 'Draft',
      recipients: 'All Staff',
      sentDate: null,
      priority: 'High',
      channel: 'Push + Email'
    }
  ];

  // Filter notifications based on search term and selected filter
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.recipients.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedFilter !== 'all') {
      const typeMap = {
        'system': 'System Alert',
        'appointment': 'Appointment',
        'report': 'Report',
        'update': 'Update'
      } as const;
      
      const targetType = typeMap[selectedFilter as keyof typeof typeMap];
      if (targetType) {
        filtered = filtered.filter(notification => notification.type === targetType);
      }
    }

    return filtered;
  }, [searchTerm, selectedFilter, notifications]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'System Alert': return <AlertCircle className="w-4 h-4" />;
      case 'Appointment': return <Bell className="w-4 h-4" />;
      case 'Report': return <Mail className="w-4 h-4" />;
      case 'Update': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const handleComposeModal = () => {
    setShowComposeModal(true);
    // In a real app, this would open a modal or navigate to compose page
    console.log('Opening compose modal...');
  };

  const handleTemplateClick = (template: Template) => {
    console.log('Selected template:', template.name);
    // In a real app, this would populate a form or open a compose modal with the template
  };

  const handleEditNotification = (notification: Notification) => {
    console.log('Editing notification:', notification.title);
    // In a real app, this would open an edit modal or navigate to edit page
  };

  const handleDeleteNotification = (notification: Notification) => {
    console.log('Deleting notification:', notification.title);
    // In a real app, this would show a confirmation dialog and delete the notification
  };

  const templates: Template[] = [
    { id: 1, name: 'Appointment Reminder', type: 'Appointment' },
    { id: 2, name: 'System Maintenance', type: 'System Alert' },
    { id: 3, name: 'Report Available', type: 'Report' },
    { id: 4, name: 'General Announcement', type: 'Update' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Manage system notifications and communications</p>
        </div>
        <div className="flex space-x-3">
          <button 
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            aria-label="Send bulk notifications"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Bulk
          </button>
          <button 
            type="button"
            onClick={handleComposeModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            aria-label="Create new notification"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Notification
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Volume2 className="w-8 h-8 text-blue-500 mr-3" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Bell className="w-5 h-5 text-blue-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">34</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <MessageSquare className="w-5 h-5 text-yellow-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Send className="w-5 h-5 text-green-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Today&apos;s Sent</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Templates Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateClick(template)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label={`Use ${template.name} template`}
                >
                  <p className="text-sm font-medium text-gray-900">{template.name}</p>
                  <p className="text-xs text-gray-500">{template.type}</p>
                </button>
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
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search notifications"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter notifications by type"
              >
                <option value="all">All Types</option>
                <option value="system">System Alert</option>
                <option value="appointment">Appointment</option>
                <option value="report">Report</option>
                <option value="update">Update</option>
              </select>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No notifications found matching your criteria.</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div key={notification.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(notification.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Recipients: {notification.recipients}</span>
                            <span>Channel: {notification.channel}</span>
                            {notification.sentDate && <span>Sent: {notification.sentDate}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                          {notification.status}
                        </span>
                        <div className="flex space-x-1">
                          <button 
                            type="button"
                            onClick={() => handleEditNotification(notification)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            aria-label={`Edit notification: ${notification.title}`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteNotification(notification)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            aria-label={`Delete notification: ${notification.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal state tracking for future implementation */}
      {showComposeModal && (
        <div className="hidden">
          {/* This would be replaced with an actual modal component */}
          <p>Compose modal would be rendered here</p>
        </div>
      )}
    </div>
  );
}