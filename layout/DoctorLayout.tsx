import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import {
  Stethoscope,
  Users,
  Calendar,
  Video,
  UserCheck,
  FileText,
  Bell,
  Menu,
  LogOut,
  User,
  Building2,
  Moon,
  Sun,
  Clock,
  CheckSquare,
  AlertCircle,
  Activity,
  MessageSquare,
  Pill,
  Upload
} from 'lucide-react';

interface DoctorLayoutProps {
  children: React.ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const { userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(6); // Mock notification count

  const navigationItems = [
    {
      href: '/doctor',
      icon: <Stethoscope className="h-5 w-5" />,
      label: 'Dashboard',
      description: 'Medical overview'
    },
    {
      href: '/doctor/patients',
      icon: <Users className="h-5 w-5" />,
      label: 'My Patients',
      description: 'Patient management'
    },
    {
      href: '/doctor/appointments',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Appointments',
      description: 'Schedule & consultations'
    },
    {
      href: '/doctor/consultations',
      icon: <Video className="h-5 w-5" />,
      label: 'Consultations',
      description: 'Video calls & meetings'
    },
    {
      href: '/doctor/approvals',
      icon: <UserCheck className="h-5 w-5" />,
      label: 'Patient Approvals',
      description: 'New patient requests'
    },
    {
      href: '/doctor/reports',
      icon: <FileText className="h-5 w-5" />,
      label: 'Medical Reports',
      description: 'Patient records & reports'
    }
  ];

  const quickActions = [
    {
      label: 'Next Appointment',
      icon: <Clock className="h-4 w-4" />,
      action: () => navigate('/doctor/appointments?view=next'),
      badge: '2:30 PM',
      description: 'John Doe - PrEP Consultation'
    },
    {
      label: 'Pending Approvals',
      icon: <UserCheck className="h-4 w-4" />,
      action: () => navigate('/doctor/approvals?filter=pending'),
      badge: '3',
      description: 'New patient requests'
    },
    {
      label: 'Video Uploads Review',
      icon: <Upload className="h-4 w-4" />,
      action: () => navigate('/doctor/patients?filter=video-uploads'),
      badge: '7',
      description: 'Patient video submissions'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/doctor') {
      return location.pathname === '/doctor';
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Doctor Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Dr. {userData?.displayName}</h2>
            <Badge variant="secondary" className="text-xs">
              {userData?.specialization || 'General Practice'}
            </Badge>
          </div>
        </div>
        
        {/* Hospital Info */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {userData?.hospitalName || 'Hospital'}
            </span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {userData?.department || 'HIV Prevention Unit'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Medical Practice
          </p>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActiveRoute(item.href)
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`${isActiveRoute(item.href) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-start space-x-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <div className="mt-0.5">{action.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{action.label}</span>
                    {action.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Today's Schedule
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Total Patients</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Appointments</span>
              <span className="font-medium text-blue-600">8/10</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Consultations</span>
              <span className="font-medium text-green-600">3</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Pending Tasks</span>
              <span className="font-medium text-orange-600">2</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              {userData?.displayName?.substring(0, 2).toUpperCase() || 'DR'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">Dr. {userData?.displayName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-80">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Page Title */}
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Medical Practice
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PrEP/PEP Prevention Care Management
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">8 Appointments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Next: 2:30 PM</span>
              </div>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications > 99 ? '99+' : notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/api/placeholder/40/40" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                      {userData?.displayName?.substring(0, 2).toUpperCase() || 'DR'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. {userData?.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                    <Badge variant="secondary" className="w-fit">Doctor</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/doctor/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/doctor/patients')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>My Patients</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/doctor/appointments')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Schedule</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}