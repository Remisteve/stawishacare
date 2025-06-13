"use client";
//
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
  Heart,
  Users,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Calendar,
  Bell,
  Menu,
  LogOut,
  User,
  Building2,
  Moon,
  Sun,
  UserCheck,
  Clock,
  Target,
  Award,
  Phone,
  Video,
  FileText
} from 'lucide-react';

interface PrepChampionLayoutProps {
  children: React.ReactNode;
}

export default function PrepChampionLayout({ children }: PrepChampionLayoutProps) {
  const { userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(4); // Mock notification count

  const navigationItems = [
    {
      href: '/prep-champion',
      icon: <Heart className="h-5 w-5" />,
      label: 'Dashboard',
      description: 'Support overview'
    },
    {
      href: '/prep-champion/patients',
      icon: <Users className="h-5 w-5" />,
      label: 'My Patients',
      description: 'Supported patients'
    },
    {
      href: '/prep-champion/education',
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Education',
      description: 'Materials & resources'
    },
    {
      href: '/prep-champion/support',
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'Support Sessions',
      description: 'Counseling & guidance'
    },
    {
      href: '/prep-champion/tracking',
      icon: <TrendingUp className="h-5 w-5" />,
      label: 'Progress Tracking',
      description: 'Patient outcomes'
    }
  ];

  const quickActions = [
    {
      label: 'Scheduled Sessions',
      icon: <Calendar className="h-4 w-4" />,
      action: () => navigate('/prep-champion/support?view=scheduled'),
      badge: '3',
      description: 'Today\'s support sessions'
    },
    {
      label: 'Follow-up Calls',
      icon: <Phone className="h-4 w-4" />,
      action: () => navigate('/prep-champion/patients?action=follow-up'),
      badge: '5',
      description: 'Patients needing follow-up'
    },
    {
      label: 'New Resources',
      icon: <BookOpen className="h-4 w-4" />,
      action: () => navigate('/prep-champion/education?filter=new'),
      badge: '2',
      description: 'Latest educational materials'
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
    if (href === '/prep-champion') {
      return location.pathname === '/prep-champion';
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Champion Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{userData?.displayName}</h2>
            <Badge variant="secondary" className="text-xs">PrEP Champion</Badge>
          </div>
        </div>
        
        {/* Hospital Info */}
        <div className="mt-4 p-3 bg-pink-50 dark:bg-pink-950 rounded-lg border border-pink-200 dark:border-pink-800">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
              {userData?.hospitalName || 'Hospital'}
            </span>
          </div>
          <p className="text-xs text-pink-600 dark:text-pink-400 mt-1">
            {userData?.department || 'Community Support Team'}
          </p>
        </div>

        {/* Achievement Badge */}
        <div className="mt-3 p-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
              Top Supporter This Month
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Patient Support
          </p>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActiveRoute(item.href)
                    ? 'bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`${isActiveRoute(item.href) ? 'text-pink-600 dark:text-pink-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
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
            Today's Priorities
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

        {/* Support Stats */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            My Impact
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Active Patients</span>
              <span className="font-medium text-pink-600">18</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sessions This Week</span>
              <span className="font-medium text-purple-600">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
              <span className="font-medium text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Monthly Rank</span>
              <span className="font-medium text-yellow-600">#1</span>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
              {userData?.displayName?.substring(0, 2).toUpperCase() || 'PC'}
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
                Community Support
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Empowering patients on their PrEP/PEP journey
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-400">18 Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">3 Sessions</span>
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
                    <AvatarFallback className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                      {userData?.displayName?.substring(0, 2).toUpperCase() || 'PC'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData?.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                    <Badge variant="secondary" className="w-fit">PrEP Champion</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/prep-champion/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/prep-champion/patients')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>My Patients</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/prep-champion/support')}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Support Sessions</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/prep-champion/tracking')}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Progress Reports</span>
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
