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
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  BarChart3,
  MessageSquareText,
  Settings,
  Bell,
  Menu,
  LogOut,
  User,
  Building2,
  Moon,
  Sun,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(8); // Mock notification count

  const navigationItems = [
    {
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: 'Dashboard',
      description: 'Hospital overview'
    },
    {
      href: '/admin/staff',
      icon: <Users className="h-5 w-5" />,
      label: 'Staff Management',
      description: 'Doctors & PrEP champions'
    },
    {
      href: '/admin/patients',
      icon: <UserCheck className="h-5 w-5" />,
      label: 'Patients',
      description: 'Patient management'
    },
    {
      href: '/admin/appointments',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Appointments',
      description: 'Schedule management'
    },
    {
      href: '/admin/requests',
      icon: <MessageSquareText className="h-5 w-5" />,
      label: 'Requests',
      description: 'Patient requests & approvals'
    },
    {
      href: '/admin/analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      label: 'Analytics',
      description: 'Hospital insights'
    },
    {
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
      label: 'Settings',
      description: 'Hospital configuration'
    }
  ];

  const quickActions = [
    {
      label: 'Add Doctor',
      icon: <UserPlus className="h-4 w-4" />,
      action: () => navigate('/admin/staff?action=add-doctor'),
      badge: null
    },
    {
      label: 'Pending Approvals',
      icon: <Clock className="h-4 w-4" />,
      action: () => navigate('/admin/requests?filter=pending'),
      badge: '5'
    },
    {
      label: 'Today\'s Appointments',
      icon: <Calendar className="h-4 w-4" />,
      action: () => navigate('/admin/appointments?date=today'),
      badge: '12'
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
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo and Hospital Info */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{userData?.hospitalName || 'Hospital'}</h2>
            <Badge variant="secondary" className="text-xs">Administrator</Badge>
          </div>
        </div>
        
        {/* Hospital Status */}
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-700 dark:text-green-300">Hospital Active</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            All systems operational
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Hospital Management
          </p>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActiveRoute(item.href)
                    ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`${isActiveRoute(item.href) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
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
          <div className="space-y-1">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {action.icon}
                  <span>{action.label}</span>
                </div>
                {action.badge && (
                  <Badge variant="secondary" className="ml-auto">
                    {action.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Stats */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Today's Overview
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Active Patients</span>
              <span className="font-medium">147</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Staff Online</span>
              <span className="font-medium text-green-600">8/12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Pending Tasks</span>
              <span className="font-medium text-orange-600">5</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              {userData?.displayName?.substring(0, 2).toUpperCase() || 'AD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{userData?.displayName}</p>
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
                Hospital Administration
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userData?.hospitalName || 'Manage your hospital operations'}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">12 Appointments</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-gray-600 dark:text-gray-400">5 Pending</span>
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
                    <AvatarFallback className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                      {userData?.displayName?.substring(0, 2).toUpperCase() || 'AD'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                    <Badge variant="secondary" className="w-fit">Administrator</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Hospital Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/analytics')}>
                  <Activity className="mr-2 h-4 w-4" />
                  <span>View Analytics</span>
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