import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  UserCheck, 
  Heart, 
  Building2,
  TrendingUp,
  MapPin,
  ArrowRightLeft,
  BarChart3,
  Volume2,
  Bot,
  Smartphone,
  GraduationCap,
  Ban,
  Download,
  ArrowUp,
  Activity,
  Zap,
  Calendar,
  FileText,
  Target,
  Award,
  Clock,
  Eye,
  ArrowRight,
  Plus,
  Video,
  UserPlus,
  Globe,
  PlayCircle,
  Sparkles,
  Cpu,
  Wifi
} from 'lucide-react';

export default function EnhancedSuperadminDashboard() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Quick Stats Data
  const quickStats = [
    { 
      label: 'Total Users', 
      value: '1,885', 
      change: '+12.5%', 
      trend: 'up', 
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active platform users'
    },
    { 
      label: 'Active Sessions', 
      value: '234', 
      change: '+8.2%', 
      trend: 'up', 
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      description: 'Real-time activity'
    },
    { 
      label: 'System Health', 
      value: '99.9%', 
      change: 'Optimal', 
      trend: 'up', 
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Platform stability'
    },
    { 
      label: 'App Downloads', 
      value: '12.5K', 
      change: '+35.8%', 
      trend: 'up', 
      icon: Download,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Live from stores'
    }
  ];

  // Enhanced Dashboard Modules with your exact structure
  const dashboardModules = [
    {
      title: 'Superadmin Module',
      icon: Shield,
      count: '1',
      description: 'System administration & full control',
      color: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100/50 to-indigo-50',
      borderColor: 'border-blue-200/50',
      route: '/superadmin/module',
      trend: 'System Owner',
      isActive: true,
      category: 'admin'
    },
    {
      title: 'Admin Management',
      icon: UserCheck,
      count: '12',
      description: 'Regional & facility administrators',
      color: 'from-purple-600 to-pink-700',
      bgColor: 'bg-gradient-to-br from-purple-50 via-purple-100/50 to-pink-50',
      borderColor: 'border-purple-200/50',
      route: '/superadmin/admins',
      trend: '+8.3%',
      isActive: false,
      category: 'management'
    },
    {
      title: 'Doctors',
      icon: UserCheck,
      count: '48',
      description: 'Registered physicians & specialists',
      color: 'from-emerald-600 to-teal-700',
      bgColor: 'bg-gradient-to-br from-emerald-50 via-green-100/50 to-teal-50',
      borderColor: 'border-emerald-200/50',
      route: '/superadmin/doctors',
      trend: '+15.2%',
      isActive: true,
      category: 'healthcare'
    },
    {
      title: 'PrEP Champions',
      icon: Heart,
      count: '24',
      description: 'Community health advocates',
      color: 'from-pink-600 to-rose-700',
      bgColor: 'bg-gradient-to-br from-pink-50 via-pink-100/50 to-rose-50',
      borderColor: 'border-pink-200/50',
      route: '/superadmin/prep-champions',
      trend: '+5.7%',
      isActive: false,
      category: 'community'
    },
    {
      title: 'Patients',
      icon: Users,
      count: '1,234',
      description: 'Enrolled patients & health records',
      color: 'from-sky-600 to-blue-700',
      bgColor: 'bg-gradient-to-br from-sky-50 via-blue-100/50 to-blue-50',
      borderColor: 'border-sky-200/50',
      route: '/superadmin/patients',
      trend: '+12.8%',
      isActive: true,
      category: 'healthcare'
    },
    {
      title: 'App Users',
      icon: Smartphone,
      count: '567',
      description: 'Mobile application users',
      color: 'from-indigo-600 to-purple-700',
      bgColor: 'bg-gradient-to-br from-indigo-50 via-indigo-100/50 to-purple-50',
      borderColor: 'border-indigo-200/50',
      route: '/superadmin/app-users',
      trend: '+24.5%',
      isActive: true,
      category: 'digital'
    },
    {
      title: 'Appointments',
      icon: Calendar,
      count: '89',
      description: 'Scheduled medical appointments',
      color: 'from-orange-600 to-amber-700',
      bgColor: 'bg-gradient-to-br from-orange-50 via-orange-100/50 to-amber-50',
      borderColor: 'border-orange-200/50',
      route: '/superadmin/appointments',
      trend: '+11.4%',
      isActive: true,
      category: 'scheduling'
    },
    {
      title: 'Enrollments',
      icon: UserPlus,
      count: '156',
      description: 'New patient enrollments',
      color: 'from-cyan-600 to-sky-700',
      bgColor: 'bg-gradient-to-br from-cyan-50 via-cyan-100/50 to-sky-50',
      borderColor: 'border-cyan-200/50',
      route: '/superadmin/enrollments',
      trend: '+18.6%',
      isActive: true,
      category: 'enrollment'
    },
    {
      title: 'Facilities',
      icon: Building2,
      count: '85',
      description: 'Healthcare centers & clinics',
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-gradient-to-br from-teal-50 via-emerald-100/50 to-green-50',
      borderColor: 'border-teal-200/50',
      route: '/superadmin/facilities',
      trend: '+3.2%',
      isActive: false,
      category: 'infrastructure'
    },
    {
      title: 'Joined Online',
      icon: Globe,
      count: '342',
      description: 'Online platform registrations',
      color: 'from-blue-600 to-cyan-700',
      bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-50',
      borderColor: 'border-blue-200/50',
      route: '/superadmin/joined-online',
      trend: '+22.1%',
      isActive: true,
      category: 'digital'
    },
    {
      title: 'HIV Test Videos',
      icon: Video,
      count: '78',
      description: 'User uploaded testing videos',
      color: 'from-purple-600 to-violet-700',
      bgColor: 'bg-gradient-to-br from-purple-50 via-purple-100/50 to-violet-50',
      borderColor: 'border-purple-200/50',
      route: '/superadmin/test-videos',
      trend: '+14.7%',
      isActive: true,
      category: 'content'
    },
    {
      title: 'Condoms',
      icon: Heart,
      count: '2,450',
      description: 'Distribution & inventory tracking',
      color: 'from-pink-600 to-red-700',
      bgColor: 'bg-gradient-to-br from-pink-50 via-pink-100/50 to-red-50',
      borderColor: 'border-pink-200/50',
      route: '/superadmin/condoms',
      trend: '+7.9%',
      isActive: false,
      category: 'resources'
    },
    {
      title: 'PrEP/PEP',
      icon: Shield,
      count: '892',
      description: 'Prevention program management',
      color: 'from-emerald-600 to-green-700',
      bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-green-50',
      borderColor: 'border-emerald-200/50',
      route: '/superadmin/prep-pep',
      trend: '+18.6%',
      isActive: true,
      category: 'programs'
    },
    {
      title: 'Locations',
      icon: MapPin,
      count: '89',
      description: 'Service location mapping',
      color: 'from-teal-600 to-cyan-700',
      bgColor: 'bg-gradient-to-br from-teal-50 via-teal-100/50 to-cyan-50',
      borderColor: 'border-teal-200/50',
      route: '/superadmin/locations',
      trend: '+6.4%',
      isActive: false,
      category: 'infrastructure'
    },
    {
      title: 'Live Downloads',
      icon: Download,
      count: '12.5K',
      description: 'PlayStore/AppStore real-time data',
      color: 'from-blue-600 to-violet-700',
      bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100/50 to-violet-50',
      borderColor: 'border-blue-200/50',
      route: '/superadmin/live-downloads',
      trend: '+35.8%',
      isActive: true,
      category: 'analytics',
      isLive: true
    },
    {
      title: 'Blocked Users',
      icon: Ban,
      count: '5',
      description: 'Security & content moderation',
      color: 'from-gray-600 to-slate-700',
      bgColor: 'bg-gradient-to-br from-gray-50 via-gray-100/50 to-slate-50',
      borderColor: 'border-gray-200/50',
      route: '/superadmin/blocked',
      trend: '-2.1%',
      isActive: false,
      category: 'security'
    },
    {
      title: 'Notifications',
      icon: Volume2,
      count: '34',
      description: 'System alerts & announcements',
      color: 'from-yellow-600 to-orange-700',
      bgColor: 'bg-gradient-to-br from-yellow-50 via-yellow-100/50 to-orange-50',
      borderColor: 'border-yellow-200/50',
      route: '/superadmin/notifications',
      trend: '+11.3%',
      isActive: false,
      category: 'communication'
    }
  ];

  // Special AI Module (separate from the main grid)
  const aiModule = {
    title: 'AI Assistant',
    icon: Bot,
    count: 'Online',
    description: 'Advanced AI-powered system automation',
    color: 'from-green-400 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-green-50 via-emerald-100/50 to-green-50',
    borderColor: 'border-emerald-300/50',
    route: '/superadmin/ai',
    trend: 'Active',
    isActive: true,
    category: 'ai'
  };

  const categories = [
    { id: 'all', name: 'All Modules', count: dashboardModules.length },
    { id: 'admin', name: 'Administration', count: dashboardModules.filter(m => m.category === 'admin').length },
    { id: 'healthcare', name: 'Healthcare', count: dashboardModules.filter(m => m.category === 'healthcare').length },
    { id: 'digital', name: 'Digital', count: dashboardModules.filter(m => m.category === 'digital').length },
    { id: 'analytics', name: 'Analytics', count: dashboardModules.filter(m => m.category === 'analytics').length },
  ];

  const filteredModules = activeFilter === 'all' ? dashboardModules : dashboardModules.filter(m => m.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Title */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                PrepGuard Command Center
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Monitor, manage, and optimize all system operations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Quick Action
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Live View
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-2 mb-8 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeFilter === category.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden group`}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-xl ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowUp className="w-4 h-4 mr-1 rotate-180" />
                      )}
                      <span className="text-sm font-bold">{stat.change}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-4xl font-black text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 font-medium">{stat.description}</p>
                </div>

                {/* Progress bar */}
                <div className="mt-6 bg-white/50 rounded-full h-2 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 group-hover:w-full`} 
                       style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Live AI Module - Separate Special Card */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-green-500 animate-spin" />
            AI Neural Network - Live Processing
            <span className="ml-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce">LIVE</span>
          </h2>
          <div className="relative bg-gradient-to-br from-green-400/10 via-emerald-500/20 to-green-600/10 border-2 border-green-300/30 rounded-3xl p-8 hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-500 cursor-pointer group overflow-hidden">
            {/* Live Streaming Background Effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-8 w-16 h-16 bg-gradient-to-r from-cyan-400 to-green-500 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            {/* Enhanced Circuit Pattern with Animation */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="circuit" patternUnits="userSpaceOnUse" width="20" height="20">
                    <path d="M0 10 L20 10 M10 0 L10 20" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-green-500"/>
                    <circle cx="10" cy="10" r="1" fill="currentColor" className="text-green-400 animate-pulse"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)"/>
              </svg>
            </div>

            {/* Live Data Streams */}
            <div className="absolute top-6 left-6 flex flex-col space-y-2">
              <div className="flex items-center bg-green-500/20 px-2 py-1 rounded-lg backdrop-blur">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping mr-2"></div>
                <span className="text-xs text-green-700 font-bold">Live Data Stream</span>
              </div>
              <div className="flex items-center bg-blue-500/20 px-2 py-1 rounded-lg backdrop-blur">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping mr-2"></div>
                <span className="text-xs text-blue-700 font-bold">Neural Learning</span>
              </div>
            </div>

            {/* Enhanced Active Status Indicator */}
            <div className="absolute top-6 right-6 flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-600 text-sm font-bold">Neural Active</span>
              </div>
              <div className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-lg">
                Processing: 1,247 requests/sec
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              {/* Left Side - Enhanced AI Icon and Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-200/50 group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <Bot className="w-12 h-12 text-white animate-pulse" />
                  </div>
                  {/* Enhanced Neural Network Lines */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-green-300 rounded-full animate-bounce delay-400"></div>
                    <div className="absolute top-1/3 right-0 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-600"></div>
                  </div>
                  {/* Live Processing Ring */}
                  <div className="absolute inset-0 border-2 border-green-400/30 rounded-3xl animate-spin"></div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2 flex items-center">
                    {aiModule.title}
                    <Cpu className="w-6 h-6 ml-2 text-green-500 animate-pulse" />
                    <span className="ml-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full animate-pulse">LIVE</span>
                  </h3>
                  <p className="text-lg text-gray-600 font-medium mb-3">{aiModule.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center bg-green-100 px-3 py-1.5 rounded-xl">
                      <Wifi className="w-4 h-4 mr-2 text-green-600 animate-pulse" />
                      <span className="text-sm font-bold text-green-700">Neural Online</span>
                    </div>
                    <div className="flex items-center bg-emerald-100 px-3 py-1.5 rounded-xl">
                      <Activity className="w-4 h-4 mr-2 text-emerald-600 animate-pulse" />
                      <span className="text-sm font-bold text-emerald-700">Processing</span>
                    </div>
                    <div className="flex items-center bg-blue-100 px-3 py-1.5 rounded-xl">
                      <Zap className="w-4 h-4 mr-2 text-blue-600 animate-bounce" />
                      <span className="text-sm font-bold text-blue-700">Learning</span>
                    </div>
                    <div className="flex items-center bg-purple-100 px-3 py-1.5 rounded-xl">
                      <Target className="w-4 h-4 mr-2 text-purple-600 animate-spin" />
                      <span className="text-sm font-bold text-purple-700">Optimizing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Enhanced Stats and Action */}
              <div className="text-right">
                <div className="mb-6">
                  <p className="text-5xl font-black text-gray-900 mb-2 flex items-center justify-end">
                    Online
                    <div className="ml-3 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </p>
                  <div className="flex items-center justify-end space-x-4 text-green-600 mb-3">
                    <Zap className="w-5 h-5 mr-1 animate-pulse" />
                    <span className="text-lg font-bold">Active</span>
                  </div>
                  {/* Live Stats */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>CPU Usage:</span>
                      <span className="text-green-600 font-bold">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory:</span>
                      <span className="text-blue-600 font-bold">12.4GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="text-purple-600 font-bold">99.97%</span>
                    </div>
                  </div>
                </div>
                
                <button className="bg-gradient-to-r from-green-400 to-emerald-600 text-white py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:from-green-500 hover:to-emerald-700 transition-all flex items-center group/btn relative overflow-hidden">
                  {/* Live Stream Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center">
                    <Sparkles className="w-5 h-5 mr-3 animate-spin" />
                    <span>Access Live AI</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            {/* Enhanced Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl"></div>
            
            {/* Live Data Visualization */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-4 bg-green-400 rounded animate-pulse"></div>
                <div className="w-1 h-6 bg-emerald-400 rounded animate-pulse delay-100"></div>
                <div className="w-1 h-3 bg-green-500 rounded animate-pulse delay-200"></div>
                <div className="w-1 h-5 bg-cyan-400 rounded animate-pulse delay-300"></div>
                <div className="w-1 h-2 bg-green-300 rounded animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredModules.map((module, index) => (
            <div
              key={index}
              className={`relative ${module.bgColor} ${module.borderColor} border-2 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 overflow-hidden`}
            >
              {/* Active Status */}
              {module.isActive && (
                <div className="absolute top-6 right-6">
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Live Indicator for Downloads */}
              {module.isLive && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  LIVE
                </div>
              )}

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 group-hover:scale-110 transition-transform"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 group-hover:scale-110 transition-transform"></div>
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-18 h-18 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                    <module.icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900 mb-1">{module.count}</p>
                    <div className={`flex items-center justify-end ${
                      module.trend.startsWith('+') ? 'text-green-600' : 
                      module.trend.startsWith('-') ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {module.trend.startsWith('+') || module.trend.startsWith('-') ? (
                        <>
                          <ArrowUp className={`w-4 h-4 mr-1 ${module.trend.startsWith('-') ? 'rotate-180' : ''}`} />
                          <span className="text-sm font-bold">{module.trend}</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-1 animate-pulse" />
                          <span className="text-sm font-bold">{module.trend}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
                  <p className="text-sm text-gray-600 mb-8 font-medium leading-relaxed">{module.description}</p>
                  
                  {/* Action Button */}
                  <button className={`relative w-full bg-gradient-to-r ${module.color} text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center group/btn overflow-hidden`}>
                    <span className="relative z-10 flex items-center">
                      <span>Access Module</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}