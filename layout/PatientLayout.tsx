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
  User,
  Calendar,
  Pill,
  Video,
  MessageSquareText,
  Users,
  MessageCircle,
  Bell,
  Menu,
  LogOut,
  UserCircle,
  Building2,
  Moon,
  Sun,
  Clock,
  Upload,
  Heart,
  Shield,
  Phone,
  Settings,
  Activity,
  Gift
} from 'lucide-react';

interface PatientLayoutProps {
  children: React.ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  const { userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3); // Mock notification count

  const navigationItems = [
    {
      href: '/patient',
      icon: <Activity className="h-5 w-5" />,
      label: 'Dashboard',
      description: 'Your health overview'
    },
    {
      href: '/patient/appointments',
      icon: <Calendar className="h-5 w-5" />,
      label: 'Appointments',
      description: 'Schedule & manage visits'
    },
    {
      href: '/patient/medications',
      icon: <Pill className="h-5 w-5" />,
      label: 'Medications',
      description: 'PrEP/PEP tracking'
    },
    {
      href: '/patient/videos',
      icon: <Video className="h-5 w-5" />,
      label: 'Video Uploads',
      description: 'Health check-ins'
    },
    {
      href: '/patient/requests',
      icon: <MessageSquareText className="h-5 w-5" />,
      label: 'My Requests',
      description: 'Services & support'
    },
    {
      href: '/patient/social',
      icon: <Users className="h-5 w-5" />,
      label: 'Community',
      description: 'Connect & support'
    },
    {
      href: '/patient/chat',
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'Messages',
      description: 'Chat with providers'
    },
    {
      href: '/patient/profile',
      icon: <UserCircle className="h-5 w-5" />,
      label: 'My Profile',
      description: 'Personal information'
    }
  ];

  const quickActions = [
    {
      label: 'Next Appointment',
      icon: <Clock className="h-4 w-4" />,
      action: () => navigate('/patient/appointments?view=next'),
      badge: 'Tomorrow',
      description: 'PrEP consultation - 10:00 AM'
    },
    {
      label: 'Upload Video',
      icon: <Upload className="h-4 w-4" />,
      action: () => navigate('/patient/videos?action=upload'),
      badge: 'Due',
      description: '3-month check-in required'
    },
    {
      label: 'Request Condoms',
      icon: <Gift className="h-4 w-4" />,
      action: () => navigate('/patient/requests?type=condom'),
      badge: null,
      description: 'Free protection available'
    }
  ];

  const getPatientStatusColor = (status: string) => {
    switch (status) {
      case 'prep': return 'bg-blue-500';
      case 'pep': return 'bg-green-500';
      case 'condom': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPatientStatusLabel = (status: string) => {
    switch (status) {
      case 'prep': return 'PrEP Patient';
      case 'pep': return 'PEP Patient';
      case 'condom': return 'Condom Services';
      default: return 'General Patient';
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/patient') {
      return location.pathname === '/patient';
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Patient Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{userData?.displayName}</h2>
            <Badge 
              variant="secondary" 
              className={`text-xs text-white ${getPatientStatusColor(userData?.patientStatus || 'general')}`}
            >
              {getPatientStatusLabel(userData?.patientStatus || 'general')}
            </Badge>
          </div>
        </div>
        
        {/* Hospital Info */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {userData?.hospitalName || 'Healthcare Provider'}
            </span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Prevention Care Program
          </p>
        </div>

        {/* Health Status */}
        <div className="mt-3 p-2 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">
              Care Plan Active
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            My Health Journey
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
                      <Badge variant={action.badge === 'Due' ? 'destructive' : 'secondary'} className="ml-2 text-xs">
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

        {/* Health Progress */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            My Progress
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Adherence Rate</span>
              <span className="font-medium text-green-600">96%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Days on PrEP</span>
              <span className="font-medium text-blue-600">127</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Check-ins</span>
              <span className="font-medium text-purple-600">4/4</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Community Rank</span>
              <span className="font-medium text-yellow-600">Top 20%</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {userData?.displayName?.substring(0, 2).toUpperCase() || 'PT'}
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
                My Health Portal
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your PrEP/PEP journey dashboard
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Health Status Indicator */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Adherence: 96%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Next: Tomorrow</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <Button variant="ghost" size="sm" title="Emergency Contact">
              <Phone className="h-4 w-4 text-red-500" />
            </Button>

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
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {userData?.displayName?.substring(0, 2).toUpperCase() || 'PT'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                    <Badge variant="secondary" className="w-fit">
                      {getPatientStatusLabel(userData?.patientStatus || 'general')}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/patient/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/patient/appointments')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Appointments</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/patient/medications')}>
                  <Pill className="mr-2 h-4 w-4" />
                  <span>Medications</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/patient/social')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Community</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/patient/profile?tab=settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
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