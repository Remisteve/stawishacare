'use client';

import React, { useState, useEffect } from 'react';
// Removed unused usePathname import
import Link from 'next/link';
import { 
  Shield, 
  Users, 
  UserCheck, 
  Heart, 
  Building2,
  BarChart3,
  Bot,
  Smartphone,
  Ban,
  MapPin,
  Download,
  Calendar,
  UserPlus,
  Globe,
  Video,
  Volume2,
  Home,
  ChevronRight,
  Settings,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  // Removed unused isOpen prop
  onClose?: () => void;
  activeComponent?: string;
  onComponentChange?: (componentId: string) => void;
}

export default function Sidebar({ onClose, activeComponent, onComponentChange }: SidebarProps) {
  // Removed unused pathname variable
  const [activeItem, setActiveItem] = useState(activeComponent || 'dashboard');

  // Enhanced sidebar items - FIXED TO CONNECT TO MODULE SYSTEM
  const sidebarItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: Home, 
      href: '/superadmin/module?component=dashboard'
    },
    { 
      id: 'admin-management', 
      name: 'Admin Management', 
      icon: UserCheck, 
      href: '/superadmin/module?component=admins'
    },
    { 
      id: 'doctors', 
      name: 'Doctors', 
      icon: UserCheck, 
      href: '/superadmin/module?component=doctors'
    },
    { 
      id: 'prep-champions', 
      name: 'PrEP Champions', 
      icon: Heart, 
      href: '/superadmin/module?component=prep-champions'
    },
    { 
      id: 'patients', 
      name: 'Patients', 
      icon: Users, 
      href: '/superadmin/module?component=patients'
    },
    { 
      id: 'app-users', 
      name: 'App Users', 
      icon: Smartphone, 
      href: '/superadmin/module?component=app-users'
    },
    { 
      id: 'appointments', 
      name: 'Appointments', 
      icon: Calendar, 
      href: '/superadmin/module?component=appointments'
    },
    { 
      id: 'enrollments', 
      name: 'Enrollments', 
      icon: UserPlus, 
      href: '/superadmin/module?component=enrollments'
    },
    { 
      id: 'facilities', 
      name: 'Facilities', 
      icon: Building2, 
      href: '/superadmin/module?component=facilities'
    },
    { 
      id: 'joined-online', 
      name: 'Joined Online', 
      icon: Globe, 
      href: '/superadmin/module?component=joined-online'
    },
    { 
      id: 'hiv-test-videos', 
      name: 'HIV Test Videos', 
      icon: Video, 
      href: '/superadmin/module?component=test-videos'
    },
    { 
      id: 'condoms', 
      name: 'Condoms', 
      icon: Heart, 
      href: '/superadmin/module?component=condoms'
    },
    { 
      id: 'prep-pep', 
      name: 'PrEP/PEP', 
      icon: Shield, 
      href: '/superadmin/module?component=prep-pep'
    },
    { 
      id: 'locations', 
      name: 'Locations', 
      icon: MapPin, 
      href: '/superadmin/module?component=locations'
    },
    { 
      id: 'live-downloads', 
      name: 'Live Downloads', 
      icon: Download, 
      href: '/superadmin/module?component=live-downloads'
    },
    { 
      id: 'blocked-users', 
      name: 'Blocked Users', 
      icon: Ban, 
      href: '/superadmin/module?component=blocked'
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      icon: Volume2, 
      href: '/superadmin/module?component=notifications'
    },
    { 
      id: 'reports-analytics', 
      name: 'Reports & Analytics', 
      icon: BarChart3, 
      href: '/superadmin/module?component=reports'
    },
    { 
      id: 'ai-assistant', 
      name: 'AI Assistant', 
      icon: Bot, 
      href: '/superadmin/module?component=ai',
      isAI: true
    },
  ];

  // Group items for better organization
  const groupedItems = [
    {
      title: 'Core Management',
      items: sidebarItems.slice(0, 5)
    },
    {
      title: 'Operations',
      items: sidebarItems.slice(5, 11)
    },
    {
      title: 'Services & Resources',
      items: sidebarItems.slice(11, 17)
    },
    {
      title: 'System & Analytics',
      items: sidebarItems.slice(17)
    }
  ];

  // Update active item when activeComponent prop changes
  useEffect(() => {
    if (activeComponent) {
      setActiveItem(activeComponent);
    }
  }, [activeComponent]);

  const handleItemClick = (item: any) => {
    setActiveItem(item.id);
    if (onComponentChange) {
      onComponentChange(item.id);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* FIXED SIDEBAR - NO SCROLLING WITH CONTENT */}
      <aside className="w-64 h-screen bg-slate-900 border-r border-slate-700 flex flex-col shadow-xl fixed left-0 top-0 z-30">
        
        {/* LOGO SECTION */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">StawishaCare</h2>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          
          {/* Navigation Groups */}
          <nav className="p-4">
            {groupedItems.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-6">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isCurrentActive = activeItem === item.id;
                    
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => handleItemClick(item)}
                        className={`group flex items-center justify-between px-3 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
                          isCurrentActive 
                            ? 'text-white bg-blue-600 shadow-lg' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className={`w-5 h-5 mr-3 ${
                            isCurrentActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`} />
                          
                          <span className="font-medium">{item.name}</span>
                        </div>
                        
                        {/* AI Indicator */}
                        {item.isAI && (
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                        
                        {/* Active indicator */}
                        {isCurrentActive && (
                          <ChevronRight className="w-4 h-4 text-white" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Settings Section */}
          <div className="p-4 border-t border-slate-700 mt-auto">
            <div className="space-y-1">
              <button className="w-full flex items-center px-3 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 text-sm font-medium group">
                <Settings className="w-5 h-5 mr-3 text-slate-400 group-hover:text-slate-200" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center px-3 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 text-sm font-medium group">
                <HelpCircle className="w-5 h-5 mr-3 text-slate-400 group-hover:text-slate-200" />
                <span>Help & Support</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}