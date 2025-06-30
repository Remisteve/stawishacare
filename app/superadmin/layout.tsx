'use client'

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Bell, 
  ChevronDown,
  MessageSquare,
  Play,
  Edit3,
  CircleDot,
  Settings,
  LogOut,
  User,
  HelpCircle,
  Activity,
  Users,
  BarChart3,
  Menu,
  X,
  Home,
  Building2,
  Heart,
  UserCheck,
  Smartphone,
  GraduationCap,
  Ban,
  MapPin,
  Bot,
  Download,
  Calendar,
  UserPlus,
  Globe,
  Video,
  Volume2,
  ExternalLink
} from 'lucide-react';

// Enhanced Header Component
function SuperadminHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: "New patient registered", message: "John Doe completed registration", time: "2 min ago", type: "user", unread: true },
    { id: 2, title: "System backup completed", message: "Daily backup finished successfully", time: "1 hour ago", type: "system", unread: true },
    { id: 3, title: "Doctor verification pending", message: "Dr. Sarah needs profile verification", time: "3 hours ago", type: "verification", unread: false },
    { id: 4, title: "AI alert triggered", message: "Unusual pattern detected in user data", time: "5 hours ago", type: "ai", unread: false },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-18 px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/50 rotate-3 hover:rotate-0 transition-transform duration-300">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">PrepGuard</span>
              <div className="text-xs text-gray-500 font-medium">Super Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search patients, doctors, facilities..."
              className="w-full pl-12 pr-6 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-300 hover:bg-gray-100/50 placeholder-gray-400"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-md font-medium">⌘K</span>
            </div>
          </div>
        </div>

        {/* Right Side - Social Features */}
        <div className="flex items-center space-x-2">
          {/* Create Post */}
          <button className="flex items-center px-4 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group">
            <Edit3 className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium hidden xl:inline">Post</span>
          </button>

          {/* TikTok Style Videos */}
          <button className="flex items-center px-4 py-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group relative">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Play className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="ml-2 text-sm font-medium hidden xl:inline">Videos</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">5</span>
            </div>
          </button>

          {/* Messages */}
          <button className="flex items-center px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 relative">
            <MessageSquare className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium hidden xl:inline">Messages</span>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">4</span>
              </div>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">Notifications</h3>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-xs font-semibold">4 New</span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 hover:bg-gray-50 border-b border-gray-50 cursor-pointer transition-colors ${notification.unread ? 'bg-blue-50/50' : ''}`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          notification.type === 'user' ? 'bg-green-100' :
                          notification.type === 'system' ? 'bg-blue-100' :
                          notification.type === 'verification' ? 'bg-orange-100' : 'bg-purple-100'
                        }`}>
                          {notification.type === 'user' ? <Users className="w-5 h-5 text-green-600" /> :
                           notification.type === 'system' ? <Activity className="w-5 h-5 text-blue-600" /> :
                           notification.type === 'verification' ? <Shield className="w-5 h-5 text-orange-600" /> :
                           <Bot className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-900 font-semibold">{notification.title}</p>
                            {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gray-50">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200 mx-2"></div>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-xl px-3 py-2.5 transition-all duration-200"
            >
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">SA</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-bold text-gray-900">Super Admin</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <CircleDot className="w-3 h-3 mr-1 text-green-500" />
                  Online
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold">SA</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Super Administrator</p>
                      <p className="text-xs text-gray-500">superadmin@prepguard.com</p>
                      <p className="text-xs text-green-600 font-medium mt-1">System Owner</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-6 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center transition-colors">
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    Profile Settings
                  </button>
                  <button className="w-full px-6 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center transition-colors">
                    <Settings className="w-4 h-4 mr-3 text-gray-500" />
                    System Settings
                  </button>
                  <button className="w-full px-6 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center transition-colors">
                    <Shield className="w-4 h-4 mr-3 text-gray-500" />
                    Security Center
                  </button>
                  <button className="w-full px-6 py-3 text-left hover:bg-gray-50 text-sm text-gray-700 flex items-center transition-colors">
                    <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                    Help & Support
                  </button>
                </div>
                
                <div className="border-t border-gray-100 pt-2">
                  <button className="w-full px-6 py-3 text-left hover:bg-red-50 text-sm text-red-600 flex items-center transition-colors">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Enhanced Sidebar Component
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeItem, setActiveItem] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, href: '/superadmin', badge: null },
    { id: 'admins', name: 'Admins', icon: UserCheck, href: '/superadmin/admins', badge: '12' },
    { id: 'doctors', name: 'Doctors', icon: UserCheck, href: '/superadmin/doctors', badge: '48' },
    { id: 'prep-champions', name: 'PrEP Champions', icon: Heart, href: '/superadmin/prep-champions', badge: '24' },
    { id: 'patients', name: 'Patients', icon: Users, href: '/superadmin/patients', badge: '1.2K' },
    { id: 'app-users', name: 'App Users', icon: Smartphone, href: '/superadmin/app-users', badge: '567' },
    { id: 'appointments', name: 'Appointments', icon: Calendar, href: '/superadmin/appointments', badge: '89' },
    { id: 'enrollments', name: 'Enrollments', icon: UserPlus, href: '/superadmin/enrollments', badge: '156' },
    { id: 'facilities', name: 'Facilities', icon: Building2, href: '/superadmin/facilities', badge: '85' },
    { id: 'joined-online', name: 'Joined Online', icon: Globe, href: '/superadmin/joined-online', badge: '342' },
    { id: 'test-videos', name: 'HIV Test Videos', icon: Video, href: '/superadmin/test-videos', badge: '78' },
    { id: 'notifications', name: 'Notifications', icon: Volume2, href: '/superadmin/notifications', badge: '34' },
    { id: 'locations', name: 'Locations', icon: MapPin, href: '/superadmin/locations', badge: '89' },
    { id: 'live-downloads', name: 'Live Downloads', icon: Download, href: '/superadmin/live-downloads', badge: 'LIVE' },
    { id: 'blocked', name: 'Blocked Users', icon: Ban, href: '/superadmin/blocked', badge: '5' },
    { id: 'reports', name: 'Reports', icon: BarChart3, href: '/superadmin/reports', badge: '45' },
    { id: 'ai', name: 'AI Assistant', icon: Bot, href: '/superadmin/ai', badge: 'AI' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:z-auto`}>
        {/* Mobile Header */}
        <div className="p-6 border-b border-gray-100 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">Navigation</span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Sidebar Content */}
        <div className="h-full overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`group flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeItem === item.id 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={`w-5 h-5 mr-3 ${
                    activeItem === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                  }`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                    item.badge === 'LIVE' ? 'bg-red-100 text-red-600 animate-pulse' :
                    item.badge === 'AI' ? 'bg-green-100 text-green-600' :
                    activeItem === item.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">System Status</p>
                  <p className="text-xs text-gray-600">All systems operational</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Online
                </span>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Enhanced Footer Component
function SuperadminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 mt-8" style={{backgroundColor: '#1e2a4a'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            {/* Left Side */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-white">PrepGuard</span>
              </div>
              <span className="text-sm text-gray-300">
                © {currentYear} All rights reserved
              </span>
            </div>

            {/* Center */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center text-gray-300">
                <span>Powered by</span>
                <a 
                  href="https://alvanialabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center group"
                >
                  Alvania Labs, Inc.
                  <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center text-gray-300">
                <Building2 className="w-4 h-4 text-blue-400 mr-1" />
                <span>Partnered with</span>
                <span className="ml-1 font-semibold text-blue-400">CHAK</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Activity className="w-4 h-4 mr-1 text-green-400" />
                <span className="font-semibold">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Layout Component
interface SuperadminLayoutProps {
  children: React.ReactNode;
}

export default function SuperadminLayout({ children }: SuperadminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication check
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading PrepGuard</h2>
          <p className="text-gray-600">Initializing superadmin portal...</p>
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
      {/* Header */}
      <SuperadminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <main className="flex-1 min-h-0">
          <div className="h-full overflow-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <SuperadminFooter />
    </div>
  );
}