"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target, Zap, AlertTriangle,
  Heart, Baby, Shield, Users, MapPin, Calendar, DollarSign, Eye, Brain, Crosshair,
  Gauge, Radar, Satellite, Globe, Network, Database, Monitor, Terminal, Crown,
  Cpu, MemoryStick, HardDrive, Wifi, Server, Code, Settings, LineChart, Bell,
  Search, Filter, Download, Upload, Play, Pause, RotateCcw, Power, Edit, Trash2,
  Plus, X, ChevronDown, ChevronUp, ExternalLink, Sliders, MoreVertical, Lock,
  Unlock, UserPlus, Mail, Phone, CheckCircle, AlertCircle, Info, Maximize2, Minimize2,
  Building2, Stethoscope, UserCheck, PersonStanding, BrainCircuit, Sparkles,
  UserX, Compass, Navigation, MessageSquare
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, 
  Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart,
  Pie
} from 'recharts';

// Healthcare System Analytics Data
const systemOverview = {
  totalHospitals: 47,
  totalUsers: 128456,
  totalPatients: 89347,
  activePatients: 67890,
  monthlyGrowth: 18.4,
  systemHealth: 'optimal',
  aiRecommendations: 12,
  criticalAlerts: 3
};

const userBreakdown = {
  superadmins: 5,
  admins: 23,
  doctors: 1247,
  prepChampions: 567,
  patients: 89347,
  appUsers: 37311,
  selfRegistered: 52189,
  hospitalRegistered: 37158
};

const demographicsData = {
  male: 45234,
  female: 44113,
  ageGroups: [
    { range: '15-19', count: 12456, percentage: 14 },
    { range: '20-24', count: 18739, percentage: 21 },
    { range: '25-29', count: 16892, percentage: 19 },
    { range: '30-34', count: 14567, percentage: 16 },
    { range: '35-39', count: 12334, percentage: 14 },
    { range: '40+', count: 14359, percentage: 16 }
  ]
};

const healthProgramData = {
  prep: { active: 8947, completed: 3456, pending: 1234, effectiveness: 94.2 },
  pep: { active: 567, completed: 890, emergency: 45, effectiveness: 91.7 },
  condomDistribution: { monthly: 45670, locations: 234, coverage: 78.4 },
  mch: { pregnantWomen: 3456, breastfeeding: 2890, newborns: 1567 },
  violence: {
    sexual: { reported: 234, assisted: 198, pending: 36 },
    physical: { reported: 456, assisted: 387, pending: 69 },
    emotional: { reported: 189, assisted: 156, pending: 33 }
  },
  relationships: {
    married: 34567,
    unmarried: 54780,
    discordantCouples: 2456
  }
};

const geographicData = [
  { county: 'Nairobi', hospitals: 12, patients: 23456, active: 18934, coverage: 89.4 },
  { county: 'Mombasa', hospitals: 8, patients: 15670, active: 12456, coverage: 82.1 },
  { county: 'Kisumu', hospitals: 6, patients: 12340, active: 9876, coverage: 76.8 },
  { county: 'Nakuru', hospitals: 5, patients: 9876, active: 7890, coverage: 74.3 },
  { county: 'Eldoret', hospitals: 4, patients: 7890, active: 6234, coverage: 71.2 },
  { county: 'Machakos', hospitals: 3, patients: 5678, active: 4567, coverage: 68.9 },
  { county: 'Nyeri', hospitals: 3, patients: 4567, active: 3456, coverage: 66.7 },
  { county: 'Kisii', hospitals: 2, patients: 3456, active: 2789, coverage: 64.5 },
  { county: 'Kitale', hospitals: 2, patients: 2789, active: 2234, coverage: 62.1 },
  { county: 'Malindi', hospitals: 2, patients: 2234, active: 1789, coverage: 59.8 }
];

const aiInsights = [
  { 
    type: 'optimization',
    title: 'PrEP Program Expansion',
    description: 'AI suggests expanding PrEP services in Nakuru and Eldoret counties',
    impact: 'high',
    confidence: 94,
    recommendation: 'Increase prep champions by 23% in target areas'
  },
  {
    type: 'alert',
    title: 'Violence Cases Spike',
    description: 'Unusual increase in reported violence cases in coastal region',
    impact: 'critical',
    confidence: 87,
    recommendation: 'Deploy additional counselors and expand support services'
  },
  {
    type: 'efficiency',
    title: 'Resource Optimization',
    description: 'Condom distribution can be optimized to reduce waste by 15%',
    impact: 'medium',
    confidence: 91,
    recommendation: 'Adjust distribution schedules based on usage patterns'
  }
];

const programTrends = [
  { month: 'Jan', prep: 7450, pep: 423, condoms: 38450, mch: 2890, violence: 67 },
  { month: 'Feb', prep: 7890, pep: 456, condoms: 41230, mch: 3120, violence: 78 },
  { month: 'Mar', prep: 8234, pep: 498, condoms: 43560, mch: 3345, violence: 89 },
  { month: 'Apr', prep: 8567, pep: 534, condoms: 44890, mch: 3456, violence: 94 },
  { month: 'May', prep: 8789, pep: 556, condoms: 45230, mch: 3567, violence: 87 },
  { month: 'Jun', prep: 8947, pep: 567, condoms: 45670, mch: 3456, violence: 82 }
];

const hospitalPerformance = [
  { name: 'Kenyatta National Hospital', patients: 5678, programs: 8, rating: 4.8, efficiency: 94 },
  { name: 'Coast General Hospital', patients: 4567, programs: 7, rating: 4.6, efficiency: 91 },
  { name: 'Aga Khan Hospital', patients: 3456, programs: 6, rating: 4.9, efficiency: 96 },
  { name: 'Mater Hospital', patients: 3234, programs: 6, rating: 4.7, efficiency: 93 },
  { name: 'MP Shah Hospital', patients: 2890, programs: 5, rating: 4.5, efficiency: 89 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];

export default function HealthcareAnalyticsDashboard() {
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showHospitalDetails, setShowHospitalDetails] = useState(false);
  const [showProgramDetails, setShowProgramDetails] = useState(false);
  const [ageFilter, setAgeFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const formatNumber = (value: number) => {
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'excellent': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      case 'critical': return 'text-red-700 bg-red-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Enhanced Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="mr-3 h-7 w-7 text-blue-600" />
              Healthcare Analytics Hub
            </h1>
            <p className="text-gray-600 text-base mt-2 flex items-center">
              <BrainCircuit className="mr-2 h-4 w-4 text-blue-500" />
              AI-Powered Health Program Management & Patient Care Analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowAIInsights(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Insights ({aiInsights.length})
            </Button>
            <Button variant="outline" onClick={() => setShowUserManagement(true)}>
              <Users className="h-4 w-4 mr-2" />
              Users ({formatNumber(systemOverview.totalUsers)})
            </Button>
            <Button variant="outline" onClick={() => setShowHospitalDetails(true)}>
              <Building2 className="h-4 w-4 mr-2" />
              Hospitals ({systemOverview.totalHospitals})
            </Button>
          </div>
        </div>
      </div>

      {/* Smart Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients, programs, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <Select value={selectedCounty} onValueChange={setSelectedCounty}>
              <SelectTrigger className="w-48 bg-white">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="All Counties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                {geographicData.map(county => (
                  <SelectItem key={county.county} value={county.county}>{county.county}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-40 bg-white">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="All Ages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                {demographicsData.ageGroups.map(group => (
                  <SelectItem key={group.range} value={group.range}>{group.range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-40 bg-white">
                <PersonStanding className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => toggleCardExpansion('patients')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Patients</p>
                <p className="text-2xl font-bold">{formatNumber(systemOverview.totalPatients)}</p>
                <p className="text-blue-200 text-xs flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{systemOverview.monthlyGrowth}% this month
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  {expandedCards.patients ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {expandedCards.patients && (
              <div className="mt-4 pt-4 border-t border-blue-400 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active:</span>
                  <span className="font-medium">{formatNumber(systemOverview.activePatients)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Self-Registered:</span>
                  <span className="font-medium">{formatNumber(userBreakdown.selfRegistered)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Hospital-Registered:</span>
                  <span className="font-medium">{formatNumber(userBreakdown.hospitalRegistered)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Health Programs */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setShowProgramDetails(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Programs</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-green-200 text-xs">PrEP • PEP • MCH • Violence Support</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Users */}
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setShowUserManagement(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">System Users</p>
                <p className="text-2xl font-bold">{formatNumber(systemOverview.totalUsers)}</p>
                <p className="text-purple-200 text-xs">Doctors • Champions • Admins</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospitals */}
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setShowHospitalDetails(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Healthcare Facilities</p>
                <p className="text-2xl font-bold">{systemOverview.totalHospitals}</p>
                <p className="text-orange-200 text-xs">Across 10 counties</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Type Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Object.entries(userBreakdown).map(([type, count], index) => (
          <Card key={type} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="p-2 bg-gray-50 rounded-lg mb-3 mx-auto w-fit">
                  {type === 'superadmins' && <Crown className="h-4 w-4 text-yellow-600" />}
                  {type === 'admins' && <Shield className="h-4 w-4 text-blue-600" />}
                  {type === 'doctors' && <Stethoscope className="h-4 w-4 text-green-600" />}
                  {type === 'prepChampions' && <Target className="h-4 w-4 text-purple-600" />}
                  {type === 'patients' && <Heart className="h-4 w-4 text-pink-600" />}
                  {type === 'appUsers' && <Phone className="h-4 w-4 text-indigo-600" />}
                  {type === 'selfRegistered' && <UserPlus className="h-4 w-4 text-cyan-600" />}
                  {type === 'hospitalRegistered' && <Building2 className="h-4 w-4 text-orange-600" />}
                </div>
                <div className="text-lg font-bold text-gray-900">{formatNumber(count)}</div>
                <div className="text-xs text-gray-600 capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
          <TabsTrigger value="programs" className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-md">Programs</TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-md">Demographics</TabsTrigger>
          <TabsTrigger value="geographic" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md">Geographic</TabsTrigger>
          <TabsTrigger value="ai-insights" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-md">AI Insights</TabsTrigger>
          <TabsTrigger value="hospitals" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-md">Hospitals</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program Trends */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-blue-600" />
                  Health Program Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsLineChart data={programTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="prep" stroke="#3b82f6" strokeWidth={3} name="PrEP Participants" />
                    <Line type="monotone" dataKey="pep" stroke="#10b981" strokeWidth={3} name="PEP Cases" />
                    <Line type="monotone" dataKey="mch" stroke="#f59e0b" strokeWidth={3} name="MCH Patients" />
                    <Line type="monotone" dataKey="violence" stroke="#ef4444" strokeWidth={3} name="Violence Cases" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Demographics Overview */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-600" />
                  Patient Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Gender Breakdown */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">Gender Distribution</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(demographicsData.male)}</div>
                        <div className="text-sm text-gray-600">Male</div>
                        <div className="text-xs text-blue-500">{((demographicsData.male / (demographicsData.male + demographicsData.female)) * 100).toFixed(1)}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">{formatNumber(demographicsData.female)}</div>
                        <div className="text-sm text-gray-600">Female</div>
                        <div className="text-xs text-pink-500">{((demographicsData.female / (demographicsData.male + demographicsData.female)) * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Age Groups</h4>
                    {demographicsData.ageGroups.slice(0, 4).map((group, index) => (
                      <div key={group.range} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">{group.range}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-900">{formatNumber(group.count)}</span>
                          <span className="text-xs text-gray-500">({group.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PROGRAMS TAB */}
        <TabsContent value="programs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PrEP Program */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  PrEP Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <div className="text-xl font-bold text-blue-700">{formatNumber(healthProgramData.prep.active)}</div>
                    <div className="text-xs text-blue-600">Active</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <div className="text-xl font-bold text-green-700">{formatNumber(healthProgramData.prep.completed)}</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                </div>
                <div className="p-3 bg-white/80 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Effectiveness</span>
                    <span className="text-lg font-bold text-green-600">{healthProgramData.prep.effectiveness}%</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Violence Support */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Violence Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                    <span className="text-sm">Sexual Violence</span>
                    <span className="font-bold text-red-700">{healthProgramData.violence.sexual.reported}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                    <span className="text-sm">Physical Violence</span>
                    <span className="font-bold text-orange-700">{healthProgramData.violence.physical.reported}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded">
                    <span className="text-sm">Emotional Violence</span>
                    <span className="font-bold text-yellow-700">{healthProgramData.violence.emotional.reported}</span>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Support Services
                </Button>
              </CardContent>
            </Card>

            {/* MCH Program */}
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-pink-900 flex items-center">
                  <Baby className="mr-2 h-5 w-5" />
                  Maternal & Child Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <div className="text-xl font-bold text-pink-700">{formatNumber(healthProgramData.mch.pregnantWomen)}</div>
                    <div className="text-xs text-pink-600">Pregnant</div>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded-lg">
                    <div className="text-xl font-bold text-purple-700">{formatNumber(healthProgramData.mch.breastfeeding)}</div>
                    <div className="text-xs text-purple-600">Breastfeeding</div>
                  </div>
                </div>
                <div className="p-3 bg-white/80 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-700">{formatNumber(healthProgramData.mch.newborns)}</div>
                  <div className="text-xs text-green-600">Newborns This Month</div>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  <Heart className="h-4 w-4 mr-2" />
                  MCH Services
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Relationship Status */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Heart className="mr-2 h-5 w-5 text-pink-600" />
                Relationship & Couple Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-700">{formatNumber(healthProgramData.relationships.married)}</div>
                  <div className="text-sm text-green-600 mt-1">Married Patients</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl font-bold text-blue-700">{formatNumber(healthProgramData.relationships.unmarried)}</div>
                  <div className="text-sm text-blue-600 mt-1">Unmarried Patients</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-3xl font-bold text-purple-700">{formatNumber(healthProgramData.relationships.discordantCouples)}</div>
                  <div className="text-sm text-purple-600 mt-1">Discordant Couples</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DEMOGRAPHICS TAB */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={demographicsData.ageGroups}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="range" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Registration Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Self-Registered', value: userBreakdown.selfRegistered, fill: '#3b82f6' },
                        { name: 'Hospital-Registered', value: userBreakdown.hospitalRegistered, fill: '#10b981' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* GEOGRAPHIC TAB */}
        <TabsContent value="geographic" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {geographicData.map((county, index) => (
                  <div key={county.county} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{county.county}</h3>
                      <Badge className={getStatusColor(county.coverage > 80 ? 'optimal' : county.coverage > 60 ? 'warning' : 'critical')}>
                        {county.coverage}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hospitals:</span>
                        <span className="font-medium">{county.hospitals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Patients:</span>
                        <span className="font-medium">{formatNumber(county.patients)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active:</span>
                        <span className="font-medium text-green-600">{formatNumber(county.active)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI INSIGHTS TAB */}
        <TabsContent value="ai-insights" className="space-y-6">
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <BrainCircuit className="h-5 w-5 text-purple-600" />
                        <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{insight.description}</p>
                      <div className="bg-white/70 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">AI Recommendation:</p>
                        <p className="text-sm text-gray-700">{insight.recommendation}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-purple-600">{insight.confidence}%</div>
                      <div className="text-xs text-purple-500">Confidence</div>
                      <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
                        <Target className="h-3 w-3 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* HOSPITALS TAB */}
        <TabsContent value="hospitals" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-orange-600" />
                Hospital Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hospitalPerformance.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Building2 className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        <p className="text-sm text-gray-600">{formatNumber(hospital.patients)} patients • {hospital.programs} programs</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-600">★ {hospital.rating}</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{hospital.efficiency}%</div>
                        <div className="text-xs text-gray-500">Efficiency</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Insights Modal */}
      {showAIInsights && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Sparkles className="mr-2 h-6 w-6 text-purple-600" />
                  AI-Powered Healthcare Insights
                </CardTitle>
                <CardDescription>Advanced analytics and recommendations for health program optimization</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => setShowAIInsights(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getImpactColor(insight.impact)}>{insight.impact}</Badge>
                      <span className="text-sm font-medium text-purple-600">{insight.confidence}% confident</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{insight.description}</p>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Recommended Action:</h4>
                    <p className="text-gray-700">{insight.recommendation}</p>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Implement
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Analyze Further
                    </Button>
                    <Button variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Program Details Modal */}
      {showProgramDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-gray-900">Comprehensive Program Analytics</CardTitle>
              <Button variant="ghost" onClick={() => setShowProgramDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full text-center text-gray-500 py-8">
                  <Target className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Program Analytics</h3>
                  <p>Detailed program analytics and management interface...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* User Management Modal */}
      {showUserManagement && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-gray-900">User Management Dashboard</CardTitle>
              <Button variant="ghost" onClick={() => setShowUserManagement(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-full text-center text-gray-500 py-8">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">User Management</h3>
                  <p>Advanced user management and role-based access control interface...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hospital Details Modal */}
      {showHospitalDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-gray-900">Hospital Network Management</CardTitle>
              <Button variant="ghost" onClick={() => setShowHospitalDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {hospitalPerformance.map((hospital, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{hospital.name}</h3>
                      <Badge className={getStatusColor('optimal')}>Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white/70 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{formatNumber(hospital.patients)}</div>
                        <div className="text-xs text-gray-600">Patients</div>
                      </div>
                      <div className="text-center p-3 bg-white/70 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{hospital.programs}</div>
                        <div className="text-xs text-gray-600">Programs</div>
                      </div>
                      <div className="text-center p-3 bg-white/70 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">{hospital.rating}</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                      <div className="text-center p-3 bg-white/70 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{hospital.efficiency}%</div>
                        <div className="text-xs text-gray-600">Efficiency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}