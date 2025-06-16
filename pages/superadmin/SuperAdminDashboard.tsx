"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2, Users, Activity, TrendingUp, Shield, Database, Globe, Zap, UserPlus, BarChart3,
  AlertTriangle, CheckCircle, Clock, MapPin, Stethoscope, Heart, Video, Calendar, DollarSign,
  Target, Wifi, Eye, Brain, Baby, UserCheck, Crown, Lock, Settings, Package, MessageSquare,
  FileText, Syringe, ShieldAlert, FileBarChart, Handshake, UserCog, Terminal
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data
const systemStats = {
  totalHospitals: 47,
  totalUsers: 3247,
  activePatients: 2892,
  systemUptime: 99.97,
  dailyActiveUsers: 1456,
  weeklyGrowth: 23.8,
  monthlyRevenue: 125600,
  criticalAlerts: 3,
  discordantCouples: 156,
  teenPregnancies: 89,
  violenceCases: 23,
  mchPatients: 445,
  condomDistribution: 15670,
  adRevenue: 8950,
  locationEnabled: 2340,
  pendingRequests: 67,
  prepUsers: 1234,
  pepUsers: 89,
  chatMessages: 15670,
  videoUploads: 234,
  aiPredictions: 1567,
  implementingPartners: 12
};

const dashboardModules = [
  {
    id: 'superadmin',
    title: 'SuperAdmin',
    description: 'Master Control',
    icon: Crown,
    count: 1,
    status: 'active',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/10'
  },
  {
    id: 'admin',
    title: 'Administrators',
    description: 'System Admins',
    icon: UserCog,
    count: 12,
    status: 'active',
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'doctors',
    title: 'Doctors',
    description: 'Medical Staff',
    icon: Stethoscope,
    count: 89,
    status: 'active',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-500/20',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'prep-champions',
    title: 'PrEP Champions',
    description: 'Health Workers',
    icon: Shield,
    count: 56,
    status: 'active',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-500/20',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 'patients',
    title: 'Patients',
    description: 'Active Users',
    icon: Heart,
    count: systemStats.activePatients,
    status: 'active',
    color: 'from-red-500 to-red-600',
    borderColor: 'border-red-500/20',
    bgColor: 'bg-red-500/10'
  },
  {
    id: 'appointments',
    title: 'Appointments',
    description: 'Scheduling',
    icon: Calendar,
    count: 456,
    status: 'active',
    color: 'from-indigo-500 to-indigo-600',
    borderColor: 'border-indigo-500/20',
    bgColor: 'bg-indigo-500/10'
  },
  {
    id: 'app-users',
    title: 'App Users',
    description: 'Mobile Analytics',
    icon: Users,
    count: systemStats.totalUsers,
    status: 'active',
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/10'
  },
  {
    id: 'videos',
    title: 'Videos',
    description: 'Content Library',
    icon: Video,
    count: systemStats.videoUploads,
    status: 'active',
    color: 'from-pink-500 to-pink-600',
    borderColor: 'border-pink-500/20',
    bgColor: 'bg-pink-500/10'
  },
  {
    id: 'locations',
    title: 'Locations',
    description: 'Geo Tracking',
    icon: MapPin,
    count: systemStats.locationEnabled,
    status: 'active',
    color: 'from-orange-500 to-orange-600',
    borderColor: 'border-orange-500/20',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'mch',
    title: 'MCH',
    description: 'Maternal Health',
    icon: Baby,
    count: systemStats.mchPatients,
    status: 'active',
    color: 'from-violet-500 to-violet-600',
    borderColor: 'border-violet-500/20',
    bgColor: 'bg-violet-500/10'
  },
  {
    id: 'social-chats',
    title: 'Social Chats',
    description: 'Messaging',
    icon: MessageSquare,
    count: systemStats.chatMessages,
    status: 'active',
    color: 'from-teal-500 to-teal-600',
    borderColor: 'border-teal-500/20',
    bgColor: 'bg-teal-500/10'
  },
  {
    id: 'pending-requests',
    title: 'Pending',
    description: 'Requests Queue',
    icon: Clock,
    count: systemStats.pendingRequests,
    status: 'warning',
    color: 'from-yellow-500 to-yellow-600',
    borderColor: 'border-yellow-500/20',
    bgColor: 'bg-yellow-500/10'
  }
];

const revenueData = [
  { month: 'Jan', subscriptions: 8500, ads: 2300, donations: 12000 },
  { month: 'Feb', subscriptions: 9200, ads: 2800, donations: 15600 },
  { month: 'Mar', subscriptions: 10100, ads: 3200, donations: 18900 },
  { month: 'Apr', subscriptions: 11500, ads: 3800, donations: 21200 },
  { month: 'May', subscriptions: 12800, ads: 4500, donations: 24700 },
  { month: 'Jun', subscriptions: 14200, ads: 5200, donations: 28300 }
];

const criticalMetrics = [
  { label: 'Violence Cases', value: 23, trend: '+5%', color: 'text-red-500' },
  { label: 'Teen Pregnancies', value: 89, trend: '+12%', color: 'text-orange-500' },
  { label: 'Pending Requests', value: 67, trend: '+8%', color: 'text-yellow-500' },
  { label: 'System Health', value: '99.97%', trend: 'Stable', color: 'text-green-500' }
];

export default function SuperAdminDashboard() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${color} p-6`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-8 w-8 text-white/80" />
          {trend && (
            <span className="text-xs text-white/80 font-medium">{trend}</span>
          )}
        </div>
        <h3 className="text-white/80 text-sm font-medium">{label}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10">
        <Icon className="h-24 w-24 text-white" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Master Control Center</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">SuperAdmin Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentTime.toLocaleString()}
              </div>
              <Badge variant="outline" className="border-green-500 text-green-600">
                <span className="mr-1 h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                System Online
              </Badge>
              <Badge variant="outline" className="border-red-500 text-red-600">
                {systemStats.criticalAlerts} Alerts
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            label="Total Users" 
            value={systemStats.totalUsers.toLocaleString()} 
            color="from-blue-500 to-blue-600"
            trend="+23.8%"
          />
          <StatCard 
            icon={DollarSign} 
            label="Monthly Revenue" 
            value={`$${(systemStats.monthlyRevenue / 1000).toFixed(0)}K`} 
            color="from-green-500 to-green-600"
            trend="+15.3%"
          />
          <StatCard 
            icon={Building2} 
            label="Hospitals" 
            value={systemStats.totalHospitals} 
            color="from-purple-500 to-purple-600"
            trend="+2"
          />
          <StatCard 
            icon={Brain} 
            label="AI Predictions" 
            value={systemStats.aiPredictions.toLocaleString()} 
            color="from-indigo-500 to-indigo-600"
            trend="+45%"
          />
        </div>

        {/* Critical Metrics Alert */}
        <Card className="mb-8 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Critical Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {criticalMetrics.map((metric, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
                    <span className={`text-xs font-medium ${metric.color}`}>{metric.trend}</span>
                  </div>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Modules Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">System Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dashboardModules.map((module) => (
              <Card 
                key={module.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 border ${module.borderColor} ${module.bgColor}`}
                onClick={() => setSelectedModule(module.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${module.color}`}>
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant={module.status === 'warning' ? 'outline' : 'default'}
                      className={module.status === 'warning' ? 'border-yellow-500 text-yellow-600' : 'bg-green-500'}
                    >
                      {module.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {typeof module.count === 'number' ? module.count.toLocaleString() : module.count}
                    </span>
                    <Button size="sm" variant="ghost" className="text-gray-600 dark:text-gray-400">
                      View →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Revenue Analytics</CardTitle>
            <CardDescription>Monthly revenue breakdown across all streams</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="subscriptions" fill="#3b82f6" name="Subscriptions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ads" fill="#10b981" name="Ad Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="donations" fill="#8b5cf6" name="Donations" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto flex-col p-4 bg-red-500 hover:bg-red-600">
                <Lock className="mb-2 h-5 w-5" />
                <span className="text-sm font-medium">Emergency Lock</span>
              </Button>
              <Button className="h-auto flex-col p-4 bg-green-500 hover:bg-green-600">
                <Database className="mb-2 h-5 w-5" />
                <span className="text-sm font-medium">Backup System</span>
              </Button>
              <Button className="h-auto flex-col p-4 bg-blue-500 hover:bg-blue-600">
                <Terminal className="mb-2 h-5 w-5" />
                <span className="text-sm font-medium">System Logs</span>
              </Button>
              <Button className="h-auto flex-col p-4 bg-purple-500 hover:bg-purple-600">
                <Settings className="mb-2 h-5 w-5" />
                <span className="text-sm font-medium">Configuration</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}