"use client";
//
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Shield,
  Home,
  Building2,
  Users,
  BarChart3,
  Settings,
  Bell,
  Menu,
  LogOut,
  Moon,
  Sun,
  UserPlus,
  Activity,
  Database,
  Globe,
  Zap
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/superadmin',
    icon: <Home className="h-4 w-4" />,
    description: 'System overview and key metrics'
  },
  {
    title: 'Hospitals',
    href: '/superadmin/hospitals',
    icon: <Building2 className="h-4 w-4" />,
    description: 'Manage registered hospitals'
  },
  {
    title: 'Users',
    href: '/superadmin/users',
    icon: <Users className="h-4 w-4" />,
    description: 'All system users and roles'
  },
  {
    title: 'Analytics',
    href: '/superadmin/analytics',
    icon: <BarChart3 className="h-4 w-4" />,
    description: 'System-wide analytics and reports'
  },
  {
    title: 'Database',
    href: '/superadmin/database',
    icon: <Database className="h-4 w-4" />,
    description: 'Database management and backups'
  },
  {
    title: 'System Health',
    href: '/superadmin/system',
    icon: <Activity className="h-4 w-4" />,
    description: 'Monitor system performance'
  },
  {
    title: 'Global Settings',
    href: '/superadmin/settings',
    icon: <Settings className="h-4 w-4" />,
    description: 'Platform-wide configurations'
  }
];

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { userData, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/superadmin') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center space-x-3 p-6 border-b">
        <div className="bg-gradient-to-r from-red-600 to-purple-600 p-2 rounded-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold">SuperAdmin</h1>
          <p className="text-xs text-muted-foreground">System Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActiveRoute(item.href)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            {item.icon}
            <div className="flex-1 min-w-0">
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-muted-foreground hidden lg:block">
                {item.description}
              </div>
            </div>
          </Link>
        ))}
      </nav>

      {/* System Status */}
      <Card className="m-4 p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">System Status</span>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Uptime</span>
            <span className="text-green-600">99.9%</span>
          </div>
          <div className="flex justify-between">
            <span>Active Users</span>
            <span>1,247</span>
          </div>
          <div className="flex justify-between">
            <span>Hospitals</span>
            <span>23</span>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:border-r lg:bg-card">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b px-4 lg:px-6 h-16 flex items-center justify-between">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Page title */}
          <div className="flex-1 lg:flex-none">
            <h1 className="text-xl font-semibold">
              {navigationItems.find(item => isActiveRoute(item.href))?.title || 'Dashboard'}
            </h1>
          </div>

          {/* Header actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <Button size="sm" variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Hospital
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.png" />
                    <AvatarFallback className="bg-gradient-to-r from-red-600 to-purple-600 text-white">
                      {userData?.displayName?.charAt(0)?.toUpperCase() || 'SA'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userData?.displayName || 'SuperAdmin'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData?.email}
                    </p>
                    <Badge variant="secondary" className="w-fit">
                      SuperAdmin
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Globe className="mr-2 h-4 w-4" />
                  System Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
