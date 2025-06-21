"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Crown, Shield, Users, UserCheck, Stethoscope, Heart, Calendar,
  Video, Network, MapPin, Flag, BarChart3, Bot, Settings, LogOut,
  Search, Bell, User, Menu, X, ChevronRight, TrendingUp, TrendingDown,
  Activity, Globe, Zap, Eye, AlertTriangle, CheckCircle, Clock,
  Filter, Download, Upload, Share, Plus, Edit, Trash2, Star,
  MessageSquare, Phone, Mail, Building2, Database, Cpu, Lock,
  FileText, PieChart, LineChart, BarChart, Layers, Target, Award,
  Sparkles, ArrowUp, ArrowDown, MoreVertical, RefreshCw
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Simple Button component if shadcn/ui is not available
type SimpleButtonVariant = "default" | "ghost" | "outline";

type SimpleButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: SimpleButtonVariant;
  disabled?: boolean;
  [key: string]: any;
};

const SimpleButton = ({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}: SimpleButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const variants: Record<SimpleButtonVariant, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple Card component
type SimpleCardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const SimpleCard = ({ children, className = "", onClick }: SimpleCardProps) => (
  <div 
    className={`bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Simple Input component
type SimpleInputProps = {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  [key: string]: any;
};

const SimpleInput = ({ placeholder, value, onChange, className = "", ...props }: SimpleInputProps) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${className}`}
    {...props}
  />
);

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/superadmin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const modules = [
    {
      id: "overview",
      name: "Overview",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "System overview and analytics",
      color: "bg-blue-500",
      stats: { total: "Dashboard", change: "+12%", trend: "up" }
    },
    {
      id: "superadmin",
      name: "SuperAdmin",
      icon: <Crown className="h-5 w-5" />,
      description: "Super administrator management",
      color: "bg-yellow-500",
      stats: { total: "5", change: "+1", trend: "up" }
    },
    {
      id: "admin",
      name: "Admin",
      icon: <Shield className="h-5 w-5" />,
      description: "Administrator accounts",
      color: "bg-purple-500",
      stats: { total: "24", change: "+3", trend: "up" }
    },
    {
      id: "doctors",
      name: "Doctors",
      icon: <Stethoscope className="h-5 w-5" />,
      description: "Medical professionals",
      color: "bg-green-500",
      stats: { total: "156", change: "+8", trend: "up" }
    },
    {
      id: "prep-champions",
      name: "PrEP Champions",
      icon: <Heart className="h-5 w-5" />,
      description: "Community health advocates",
      color: "bg-pink-500",
      stats: { total: "89", change: "+12", trend: "up" }
    },
    {
      id: "patients",
      name: "Patients",
      icon: <Users className="h-5 w-5" />,
      description: "Patient management",
      color: "bg-indigo-500",
      stats: { total: "2,847", change: "+145", trend: "up" }
    },
    {
      id: "appointments",
      name: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      description: "Scheduling and bookings",
      color: "bg-orange-500",
      stats: { total: "1,234", change: "+67", trend: "up" }
    },
    {
      id: "enrollments",
      name: "Enrollments",
      icon: <UserCheck className="h-5 w-5" />,
      description: "Service enrollments (PrEP, PEP, Condoms, GBV)",
      color: "bg-teal-500",
      stats: { total: "892", change: "+23", trend: "up" }
    },
    {
      id: "videos",
      name: "Videos",
      icon: <Video className="h-5 w-5" />,
      description: "Educational content management",
      color: "bg-red-500",
      stats: { total: "347", change: "+12", trend: "up" }
    },
    {
      id: "networking",
      name: "Networking",
      icon: <Network className="h-5 w-5" />,
      description: "Social connections and networking",
      color: "bg-cyan-500",
      stats: { total: "1,567", change: "+89", trend: "up" }
    },
    {
      id: "locations",
      name: "Locations",
      icon: <MapPin className="h-5 w-5" />,
      description: "Facility and location tracking",
      color: "bg-emerald-500",
      stats: { total: "45", change: "+2", trend: "up" }
    },
    {
      id: "flagged",
      name: "Flagged",
      icon: <Flag className="h-5 w-5" />,
      description: "Flagged content and issues",
      color: "bg-amber-500",
      stats: { total: "12", change: "-3", trend: "down" }
    },
    {
      id: "reports",
      name: "Reports",
      icon: <FileText className="h-5 w-5" />,
      description: "Analytics and reporting",
      color: "bg-slate-500",
      stats: { total: "156", change: "+8", trend: "up" }
    },
    {
      id: "remi-ai",
      name: "RemiAI",
      icon: <Bot className="h-5 w-5" />,
      description: "AI assistant and automation",
      color: "bg-violet-500",
      stats: { total: "Active", change: "24/7", trend: "up" }
    }
  ];

  const overviewStats = [
    {
      title: "Total Users",
      value: "3,121",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Active Sessions",
      value: "1,847",
      change: "+8.2%",
      trend: "up",
      icon: <Activity className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      title: "Total Appointments",
      value: "892",
      change: "+23.1%",
      trend: "up",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Enrollments",
      value: "2,156",
      change: "+15.7%",
      trend: "up",
      icon: <UserCheck className="h-6 w-6" />,
      color: "bg-orange-500"
    }
  ];

  const recentActivities = [
    { user: "Dr. Sarah Johnson", action: "Added new patient", time: "2 minutes ago", type: "patient" },
    { user: "Admin Mike Chen", action: "Updated facility info", time: "5 minutes ago", type: "facility" },
    { user: "Champion Lisa Adams", action: "Posted educational video", time: "10 minutes ago", type: "content" },
    { user: "Dr. Robert Kim", action: "Scheduled appointment", time: "15 minutes ago", type: "appointment" },
    { user: "System", action: "RemiAI completed analysis", time: "20 minutes ago", type: "ai" }
  ];

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    if (moduleId !== "overview") {
      router.push(`/superadmin/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl z-40 transition-all duration-300 ${
        isSidebarOpen ? 'w-72' : 'w-16'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {isSidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SuperAdmin</h1>
                  <p className="text-sm text-gray-600">Control Panel</p>
                </div>
              </div>
            )}
            <SimpleButton
              variant="ghost"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SimpleButton>
          </div>

          {/* Search */}
          {isSidebarOpen && (
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <SimpleInput
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {modules.filter(module => 
              module.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  activeModule === module.id 
                    ? `${module.color} text-white shadow-lg` 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex-shrink-0">
                  {module.icon}
                </div>
                {isSidebarOpen && (
                  <>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{module.name}</p>
                      <p className={`text-xs ${activeModule === module.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {module.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Settings and Logout */}
          {isSidebarOpen && (
            <div className="space-y-2 mt-auto">
              <SimpleButton
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push('/superadmin/settings')}
              >
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </SimpleButton>
              <SimpleButton
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </SimpleButton>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-16'}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm px-8 py-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 capitalize">
                {activeModule === "overview" ? "Dashboard Overview" : activeModule.replace("-", " ")}
              </h2>
              <p className="text-gray-600 mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <SimpleButton
                variant="outline"
                className="text-sm"
                onClick={() => { /* TODO: implement export functionality */ }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </SimpleButton>
              <SimpleButton
                variant="outline"
                className="text-sm"
                onClick={() => { /* TODO: implement refresh functionality */ }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </SimpleButton>
              <div className="relative">
                <SimpleButton variant="outline" className="p-2" onClick={() => { /* TODO: handle notifications */ }}>
                  <Bell className="h-4 w-4" />
                </SimpleButton>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">SuperAdmin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {activeModule === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat, index) => (
                  <SimpleCard key={stat.title} className="p-6 hover:shadow-xl transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === "up" ? (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ml-1 ${
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                  </SimpleCard>
                ))}
              </div>

              {/* Modules Grid */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">System Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {modules.slice(1).map((module) => (
                    <SimpleCard 
                      key={module.id}
                      className="p-6 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleModuleClick(module.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl ${module.color} text-white`}>
                          {module.icon}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{module.stats.total}</p>
                          <div className="flex items-center">
                            {module.stats.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ml-1 ${
                              module.stats.trend === "up" ? "text-green-600" : "text-red-600"
                            }`}>
                              {module.stats.change}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{module.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                      <div className="flex items-center text-blue-600">
                        <span className="text-sm font-medium">Manage</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </SimpleCard>
                  ))}
                </div>
              </div>

              {/* Recent Activity & AI Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SimpleCard className="p-6">
                  <div className="flex items-center mb-4">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="text-xl font-bold">Recent Activity</h3>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'patient' ? 'bg-green-500' :
                          activity.type === 'facility' ? 'bg-blue-500' :
                          activity.type === 'content' ? 'bg-purple-500' :
                          activity.type === 'appointment' ? 'bg-orange-500' :
                          'bg-pink-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </SimpleCard>

                <SimpleCard className="p-6">
                  <div className="flex items-center mb-4">
                    <Bot className="h-5 w-5 mr-2 text-purple-600" />
                    <h3 className="text-xl font-bold">RemiAI Insights</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">AI Recommendation</span>
                      </div>
                      <p className="text-sm text-purple-800">
                        Patient enrollment rates have increased by 23% this week. Consider adding more PrEP Champions in high-activity areas.
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Performance Alert</span>
                      </div>
                      <p className="text-sm text-green-800">
                        System performance is optimal. All modules are running efficiently with 99.8% uptime.
                      </p>
                    </div>
                    <SimpleButton className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <Bot className="h-4 w-4 mr-2" />
                      Open RemiAI Console
                    </SimpleButton>
                  </div>
                </SimpleCard>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}