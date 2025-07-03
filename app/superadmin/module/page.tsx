// /app/superadmin/module/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../components/Sidebar';

// Import all components
import Dashboard from './components/dashboard';
import AdminManagement from './components/admin-management';
import Doctors from './components/doctors';
import PrepChampions from './components/prep-champions';
import Patients from './components/patients';
import AppUsers from './components/app-users';
import Appointments from './components/appointments';
import Enrollments from './components/enrollments';
import Facilities from './components/facilities';
import JoinedOnline from './components/joined-online';
import HivTestVideos from './components/hiv-test-videos';
import Condoms from './components/condoms';
import PrepPep from './components/prep-pep';
import Locations from './components/locations';
import LiveDownloads from './components/live-downloads';
import BlockedUsers from './components/blocked-users';
import Notifications from './components/notifications';
import ReportsAnalytics from './components/reports-analytics';
import AiAssistant from './components/ai-assistant';
import Settings from './components/settings';

export default function SuperadminModulePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const searchParams = useSearchParams();

  // Handle URL parameters for direct component access
  useEffect(() => {
    const component = searchParams.get('component');
    if (component) {
      setActiveComponent(component);
    }
  }, [searchParams]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'admins':
        return <AdminManagement />;
      case 'doctors':
        return <Doctors />;
      case 'prep-champions':
        return <PrepChampions />;
      case 'patients':
        return <Patients />;
      case 'app-users':
        return <AppUsers />;
      case 'appointments':
        return <Appointments />;
      case 'enrollments':
        return <Enrollments />;
      case 'facilities':
        return <Facilities />;
      case 'joined-online':
        return <JoinedOnline />;
      case 'test-videos':
        return <HivTestVideos />;
      case 'condoms':
        return <Condoms />;
      case 'prep-pep':
        return <PrepPep />;
      case 'locations':
        return <Locations />;
      case 'live-downloads':
        return <LiveDownloads />;
      case 'blocked':
        return <BlockedUsers />;
      case 'notifications':
        return <Notifications />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'ai':
        return <AiAssistant />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Handle sidebar navigation
  const handleSidebarNavigation = (componentId: string) => {
    setActiveComponent(componentId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
    
    // Optional: Update URL without page refresh
    const url = new URL(window.location.href);
    url.searchParams.set('component', componentId);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeComponent={activeComponent}
        onComponentChange={handleSidebarNavigation}
      />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content - WITH LEFT MARGIN FOR FIXED SIDEBAR */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Content Area - SCROLLABLE INDEPENDENTLY */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}