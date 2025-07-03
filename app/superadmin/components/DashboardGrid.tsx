'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Users, 
  UserCheck, 
  Heart, 
  Building2,
  MapPin,
  Volume2,
  Bot,
  Smartphone,
  Ban,
  Download,
  ArrowUp,
  Activity,
  Zap,
  Calendar,
  // Plus, - REMOVED (unused)
  Video,
  UserPlus,
  Globe,
  Sparkles,
  // Target, - REMOVED (unused)
  ArrowRight,
  BarChart3,
  // FileText, - REMOVED (unused)
  X,
  Grid3X3
} from 'lucide-react';

export default function FixedSuperadminDashboard() {
  const [showModuleWheel, setShowModuleWheel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingModule, setLoadingModule] = useState('');
  const router = useRouter();

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

  // Enhanced Dashboard Modules with proper routes
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
      category: 'analytics'
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
    },
    {
      title: 'Reports & Analytics',
      icon: BarChart3,
      count: '156',
      description: 'Comprehensive system reports & insights',
      color: 'from-indigo-600 to-blue-700',
      bgColor: 'bg-gradient-to-br from-indigo-50 via-blue-100/50 to-indigo-50',
      borderColor: 'border-indigo-200/50',
      route: '/superadmin/reports',
      trend: '+22.4%',
      isActive: true,
      category: 'analytics'
    },
    {
      title: 'AI Assistant',
      icon: Bot,
      count: 'AI',
      description: 'Advanced AI-powered system automation',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-green-50 via-emerald-100/50 to-green-50',
      borderColor: 'border-green-200/50',
      route: '/superadmin/ai',
      trend: 'Online',
      isActive: true,
      category: 'ai',
      isAI: true
    }
  ];

  const handleModuleClick = (route: string, moduleName: string) => {
    setIsLoading(true);
    setLoadingModule(moduleName);
    setTimeout(() => {
      setIsLoading(false);
      setLoadingModule('');
      router.push(route);
    }, 1500); // Quick 1.5 second load
  };

  const handleWheelModuleClick = (route: string) => {
    // Removed unused moduleName parameter
    setShowModuleWheel(false);
    router.push(route); // Direct navigation for wheel
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 w-full">
      {/* Fixed jsx to regular style tag */}
      <style>{`
        ${dashboardModules.map((_, index) => `
          @keyframes float-${index} {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-${3 + (index % 3)}px); }
          }
          
          @keyframes breathe-${index} {
            0% { transform: perspective(100px) rotateX(15deg) rotateY(-10deg) scale(1); }
            100% { transform: perspective(100px) rotateX(15deg) rotateY(-10deg) scale(1.05); }
          }
          
          @keyframes icon-glow-${index} {
            0%, 100% { filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)); }
            50% { filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); }
          }
          
          @keyframes orbit-glow-${index} {
            0% { transform: scale(1.5) rotate(0deg); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
          }
        `).join('')}
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 6px 20px rgba(34, 197, 94, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.3); }
        }
        
        @keyframes ai-pulse {
          0% { box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3); }
          100% { box-shadow: 0 8px 20px rgba(168, 85, 247, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.3); }
        }
        
        @keyframes line-pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.6; }
        }
        
        ${Array.from({length: 5}).map((_, i) => `
          @keyframes particle-float-${i} {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-${10 + (i * 2)}px) translateX(${5 + i}px); }
            50% { transform: translateY(-${5 + i}px) translateX(-${3 + i}px); }
            75% { transform: translateY(-${8 + (i * 2)}px) translateX(${3 + i}px); }
          }
        `).join('')}
        
        @keyframes particle-glow {
          0% { background: rgba(96, 165, 250, 0.6); transform: scale(1); }
          100% { background: rgba(147, 197, 253, 0.8); transform: scale(1.2); }
        }
      `}</style>

      {/* Professional Header with Slate Blue Background */}
      <div className="w-full px-6 lg:px-8 pt-6 pb-4">
        <div className="bg-slate-100 rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PrepGuard Command Center</h1>
              <p className="text-sm text-gray-600">Superadmin Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome, Administrator</p>
              <p className="text-xs text-gray-500">System Status: Operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 lg:px-8 py-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-lg ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowUp className="w-3 h-3 mr-1 rotate-180" />
                      )}
                      <span className="text-xs font-bold">{stat.change}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>

                <div className="mt-4 bg-white/50 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 group-hover:w-full`} 
                       style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Modules Grid - Clean & Clear */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {dashboardModules.map((module, index) => (
            <div
              key={index}
              onClick={() => handleModuleClick(module.route, module.title)}
              className={`relative ${module.bgColor} ${module.borderColor} border-2 rounded-2xl p-5 hover:shadow-xl transition-all duration-500 cursor-pointer group hover:-translate-y-1 overflow-hidden`}
            >
              {/* Active Status */}
              {module.isActive && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              )}

              {/* AI Special Indicator */}
              {module.isAI && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  AI
                </div>
              )}

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900 mb-0.5">{module.count}</p>
                    <div className={`flex items-center justify-end ${
                      module.trend.startsWith('+') ? 'text-green-600' : 
                      module.trend.startsWith('-') ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {module.trend.startsWith('+') || module.trend.startsWith('-') ? (
                        <>
                          <ArrowUp className={`w-3 h-3 mr-0.5 ${module.trend.startsWith('-') ? 'rotate-180' : ''}`} />
                          <span className="text-xs font-bold">{module.trend}</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 mr-0.5 animate-pulse" />
                          <span className="text-xs font-bold">{module.trend}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-xs text-gray-600 mb-5 font-medium leading-relaxed">{module.description}</p>
                  
                  {/* Action Button */}
                  <button className={`relative w-full bg-gradient-to-r ${module.color} text-white py-3 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center group/btn overflow-hidden text-sm`}>
                    <span className="relative z-10 flex items-center">
                      {module.isAI ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          <span>Access AI</span>
                        </>
                      ) : (
                        <span>Access Module</span>
                      )}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Blur Background Overlay - Click to Close */}
      {showModuleWheel && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModuleWheel(false);
          }}
        />
      )}

      {/* Professional Smart Spinning Wheel - Centered (NO ROTATION) */}
      {showModuleWheel && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-[9998] pointer-events-none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModuleWheel(false);
          }}
        >
          {/* Main Wheel Container - REMOVED ROTATION */}
          <div 
            className="relative w-[420px] h-[420px] bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/95 backdrop-blur-xl rounded-full shadow-2xl border-2 border-white/50 flex items-center justify-center overflow-hidden animate-in fade-in zoom-in duration-300 pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            
            {/* Static Background Rings - NO ROTATION */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-indigo-400/5 to-purple-400/10"></div>
            <div className="absolute inset-4 rounded-full border-2 border-blue-300/20"></div>
            <div className="absolute inset-8 rounded-full border border-blue-200/30"></div>
            <div className="absolute inset-12 rounded-full border border-indigo-200/20"></div>
            
            {/* Central Command Hub with Pulse */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-full flex items-center justify-center shadow-xl z-20 group hover:scale-110 transition-all duration-300">
              <Shield className="w-10 h-10 text-white group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20 animate-pulse"></div>
            </div>
            
            {/* Smart Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowModuleWheel(false);
              }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 z-30 group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* 3D Module Icons with Live Breathing Effect */}
            {dashboardModules.map((module, index) => {
              const angle = (index * 360) / dashboardModules.length;
              const radius = 160;
              const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
              const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    animationDelay: `${index * 0.1}s`,
                    animation: `float-${index} ${4 + (index % 3)}s ease-in-out infinite`
                  }}
                >
                  <button
                    className="block p-2 rounded-full transition-all duration-300 hover:scale-125 hover:-translate-y-2"
                    title={`${module.title} - ${module.description}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleWheelModuleClick(module.route);
                    }}
                  >
                    {/* 3D Module Icon with Breathing Animation */}
                    <div 
                      className={`relative w-16 h-16 bg-gradient-to-br ${module.color} rounded-full flex items-center justify-center transition-all duration-500 hover:rotate-12 group-hover:shadow-2xl`}
                      style={{
                        boxShadow: `
                          0 8px 25px -5px rgba(0, 0, 0, 0.3),
                          0 4px 15px -2px rgba(0, 0, 0, 0.2),
                          inset 0 2px 4px rgba(255, 255, 255, 0.3),
                          inset 0 -2px 4px rgba(0, 0, 0, 0.1)
                        `,
                        transform: 'perspective(100px) rotateX(15deg) rotateY(-10deg)',
                        animation: `breathe-${index} ${3 + (index % 2)}s ease-in-out infinite alternate`
                      }}
                    >
                      {/* 3D Icon with Enhanced Effects */}
                      <module.icon 
                        className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" 
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                          animation: `icon-glow-${index} ${5 + (index % 3)}s ease-in-out infinite`
                        }}
                      />
                      
                      {/* 3D Status Indicators with Pulse */}
                      {module.isActive && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white shadow-lg animate-pulse"
                             style={{
                               boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                               animation: 'pulse-glow 2s ease-in-out infinite'
                             }}>
                          <div className="absolute inset-1 bg-green-300 rounded-full animate-ping"></div>
                        </div>
                      )}
                      {module.isAI && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full border-2 border-white shadow-lg"
                             style={{
                               boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                               animation: 'ai-pulse 1.5s ease-in-out infinite alternate'
                             }}>
                          <Sparkles className="w-2.5 h-2.5 text-white absolute top-1 left-1 animate-spin" />
                        </div>
                      )}
                      
                      {/* 3D Hover Glow Effect with Animation */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`}
                           style={{
                             transform: 'scale(1.5)',
                             zIndex: -1,
                             animation: `orbit-glow-${index} ${8 + (index % 4)}s linear infinite`
                           }}></div>
                      
                      {/* 3D Reflection Effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60"
                           style={{
                             background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)'
                           }}></div>
                    </div>
                    
                    {/* Connection Line to Center with Pulse */}
                    <div 
                      className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-200/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        height: `${radius - 60}px`,
                        top: '50%',
                        left: '50%',
                        transformOrigin: 'bottom center',
                        transform: `translate(-50%, -100%) rotate(${angle + 90}deg)`,
                        animation: 'line-pulse 3s ease-in-out infinite'
                      }}
                    ></div>
                  </button>
                </div>
              );
            })}

            {/* Enhanced Moving Particle Effects */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              {Array.from({length: 20}).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                  style={{
                    left: `${10 + (i * 4)}%`,
                    top: `${20 + (i * 3)}%`,
                    animation: `particle-float-${i % 5} ${3 + (i % 4)}s ease-in-out infinite, particle-glow ${2 + (i % 3)}s ease-in-out infinite alternate`
                  }}
                ></div>
              ))}
            </div>

            {/* Professional Info Display */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">
                  {dashboardModules.length} Modules Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Loading Screen with Circular Dot Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-[10000] flex items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Circular Dot Spinner */}
            <div className="relative w-20 h-20 mb-8">
              <div className="absolute inset-0 animate-spin">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full font-bold"
                    style={{
                      top: '2px',
                      left: '50%',
                      transform: `translateX(-50%) rotate(${i * 45}deg)`,
                      transformOrigin: '50% 38px',
                      opacity: 1 - (i * 0.12),
                      boxShadow: '0 0 6px rgba(255, 255, 255, 0.3)'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Professional Module Name Display */}
            <div className="text-center">
              <h3 className="text-blue-500 text-xl font-bold mb-2">
                Opening {loadingModule}
              </h3>
              <p className="text-blue-400 text-base font-semibold">
                PrepGuard System
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Module Navigator Button - Always on Top */}
      <div className="fixed bottom-8 right-8 z-[9999]">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowModuleWheel(!showModuleWheel);
          }}
          className={`w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-200/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group ${showModuleWheel ? 'ring-4 ring-blue-300/50 scale-110' : ''}`}
        >
          <Grid3X3 className={`w-6 h-6 transition-transform duration-300 ${showModuleWheel ? 'rotate-45 scale-90' : ''}`} />
        </button>
      </div>
    </div>
  );
}