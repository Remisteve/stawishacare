import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Heart,
  Shield,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  RefreshCw,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { analyticsUtils, dateUtils } from '@/lib/utils';

interface AnalyticsData {
  patients: {
    total: number;
    prep: number;
    pep: number;
    condom: number;
    general: number;
    newThisMonth: number;
    activeThisWeek: number;
    retentionRate: number;
  };
  appointments: {
    total: number;
    completed: number;
    missed: number;
    canceled: number;
    rescheduled: number;
    averageWaitTime: number;
    satisfactionScore: number;
  };
  videoUploads: {
    totalRequired: number;
    uploaded: number;
    pending: number;
    overdue: number;
    complianceRate: number;
  };
  medications: {
    totalPatients: number;
    averageAdherence: number;
    perfectAdherence: number;
    concerningAdherence: number;
  };
  socialMetrics: {
    totalConnections: number;
    activeChats: number;
    supportSessions: number;
    peerSupportScore: number;
  };
}

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
  patients: {
    total: 234,
    prep: 156,
    pep: 23,
    condom: 34,
    general: 21,
    newThisMonth: 18,
    activeThisWeek: 198,
    retentionRate: 94
  },
  appointments: {
    total: 145,
    completed: 123,
    missed: 8,
    canceled: 6,
    rescheduled: 8,
    averageWaitTime: 15,
    satisfactionScore: 96
  },
  videoUploads: {
    totalRequired: 234,
    uploaded: 198,
    pending: 24,
    overdue: 12,
    complianceRate: 85
  },
  medications: {
    totalPatients: 179,
    averageAdherence: 92,
    perfectAdherence: 134,
    concerningAdherence: 12
  },
  socialMetrics: {
    totalConnections: 345,
    activeChats: 89,
    supportSessions: 67,
    peerSupportScore: 88
  }
};

// Chart data
const monthlyPatientData = [
  { month: 'Jan', prep: 120, pep: 18, condom: 28, general: 15 },
  { month: 'Feb', prep: 135, pep: 20, condom: 30, general: 18 },
  { month: 'Mar', prep: 156, pep: 23, condom: 34, general: 21 },
];

const adherenceData = [
  { week: 'Week 1', adherence: 89 },
  { week: 'Week 2', adherence: 92 },
  { week: 'Week 3', adherence: 95 },
  { week: 'Week 4', adherence: 92 },
];

const appointmentTrendsData = [
  { month: 'Jan', completed: 98, missed: 12, canceled: 8 },
  { month: 'Feb', completed: 112, missed: 10, canceled: 5 },
  { month: 'Mar', completed: 123, missed: 8, canceled: 6 },
];

const patientStatusDistribution = [
  { name: 'PrEP', value: 156, color: '#3b82f6' },
  { name: 'PEP', value: 23, color: '#10b981' },
  { name: 'Condom Services', value: 34, color: '#8b5cf6' },
  { name: 'General Care', value: 21, color: '#6b7280' },
];

const videoComplianceData = [
  { month: 'Jan', required: 220, uploaded: 195, compliance: 89 },
  { month: 'Feb', required: 225, uploaded: 201, compliance: 89 },
  { month: 'Mar', required: 234, uploaded: 198, compliance: 85 },
];

interface AnalyticsDashboardProps {
  userRole: string;
  userId?: string;
  hospitalId?: string;
  timeRange?: string;
}

export default function AnalyticsDashboard({ userRole, userId, hospitalId, timeRange = '30d' }: AnalyticsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [data] = useState<AnalyticsData>(mockAnalyticsData);

  const getTrendIcon = (current: number, previous: number) => {
    const growth = analyticsUtils.calculateGrowth(current, previous);
    return growth > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : growth < 0 ? (
      <TrendingDown className="h-4 w-4 text-red-600" />
    ) : (
      <div className="h-4 w-4" />
    );
  };

  const getGrowthColor = (current: number, previous: number) => {
    const growth = analyticsUtils.calculateGrowth(current, previous);
    return growth > 0 ? 'text-green-600' : growth < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const exportData = () => {
    // In real app, generate and download report
    console.log('Exporting analytics data...');
  };

  const refreshData = () => {
    // In real app, refresh from Firebase
    console.log('Refreshing analytics data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            {userRole === 'superadmin' 
              ? 'System-wide analytics and insights'
              : userRole === 'admin'
              ? 'Hospital performance metrics'
              : 'Personal health analytics'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.patients.total}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {getTrendIcon(data.patients.total, data.patients.total - data.patients.newThisMonth)}
              <span className={getGrowthColor(data.patients.total, data.patients.total - data.patients.newThisMonth)}>
                +{data.patients.newThisMonth} this month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointment Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsUtils.calculatePercentage(data.appointments.completed, data.appointments.total)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {data.appointments.completed} completed of {data.appointments.total}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Compliance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.videoUploads.complianceRate}%</div>
            <p className="text-xs text-muted-foreground">
              {data.videoUploads.uploaded} uploaded, {data.videoUploads.overdue} overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Adherence</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.medications.averageAdherence}%</div>
            <p className="text-xs text-muted-foreground">
              {data.medications.perfectAdherence} patients with perfect adherence
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Patient Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Distribution by Service Type</CardTitle>
                <CardDescription>Breakdown of patients by care category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={patientStatusDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {patientStatusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Patient Growth</CardTitle>
                <CardDescription>Patient acquisition trends by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyPatientData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="prep" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                      <Area type="monotone" dataKey="pep" stackId="1" stroke="#10b981" fill="#10b981" />
                      <Area type="monotone" dataKey="condom" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                      <Area type="monotone" dataKey="general" stackId="1" stroke="#6b7280" fill="#6b7280" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Performance Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Patient Retention</span>
                    <span>{data.patients.retentionRate}%</span>
                  </div>
                  <Progress value={data.patients.retentionRate} className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Appointment Success</span>
                    <span>{analyticsUtils.calculatePercentage(data.appointments.completed, data.appointments.total)}%</span>
                  </div>
                  <Progress value={analyticsUtils.calculatePercentage(data.appointments.completed, data.appointments.total)} className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Video Compliance</span>
                    <span>{data.videoUploads.complianceRate}%</span>
                  </div>
                  <Progress value={data.videoUploads.complianceRate} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Patient Satisfaction</span>
                  <span className="font-medium">{data.appointments.satisfactionScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg. Wait Time</span>
                  <span className="font-medium">{data.appointments.averageWaitTime}min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Peer Support Score</span>
                  <span className="font-medium">{data.socialMetrics.peerSupportScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Engagement</span>
                  <span className="font-medium">{analyticsUtils.calculatePercentage(data.patients.activeThisWeek, data.patients.total)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Uptime</span>
                  <Badge className="text-green-600 bg-green-100">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="font-medium">{data.patients.activeThisWeek}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <Badge className="text-blue-600 bg-blue-100">0.8s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Rate</span>
                  <Badge className="text-green-600 bg-green-100">0.02%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Registration Trends</CardTitle>
                <CardDescription>New patient registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyPatientData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="prep" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="pep" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="condom" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Status Overview</CardTitle>
                <CardDescription>Current patient distribution and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{data.patients.prep}</div>
                    <p className="text-sm text-muted-foreground">PrEP Patients</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{data.patients.pep}</div>
                    <p className="text-sm text-muted-foreground">PEP Patients</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{data.patients.condom}</div>
                    <p className="text-sm text-muted-foreground">Condom Services</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{data.patients.general}</div>
                    <p className="text-sm text-muted-foreground">General Care</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Active This Week</span>
                    <span className="font-medium">{data.patients.activeThisWeek}/{data.patients.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Retention Rate</span>
                    <span className="font-medium">{data.patients.retentionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New This Month</span>
                    <span className="font-medium">{data.patients.newThisMonth}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Analytics</CardTitle>
              <CardDescription>Appointment completion and trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#10b981" />
                    <Bar dataKey="missed" fill="#ef4444" />
                    <Bar dataKey="canceled" fill="#6b7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold">{data.appointments.completed}</div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                  <div className="text-2xl font-bold">{data.appointments.missed}</div>
                  <p className="text-sm text-muted-foreground">Missed</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold">{data.appointments.averageWaitTime}min</div>
                  <p className="text-sm text-muted-foreground">Avg. Wait Time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Medication Adherence Trends</CardTitle>
                <CardDescription>Weekly adherence rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={adherenceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="adherence" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adherence Distribution</CardTitle>
                <CardDescription>Patient medication adherence levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Perfect Adherence (95-100%)</span>
                    <span>{data.medications.perfectAdherence} patients</span>
                  </div>
                  <Progress value={analyticsUtils.calculatePercentage(data.medications.perfectAdherence, data.medications.totalPatients)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Good Adherence (80-94%)</span>
                    <span>{data.medications.totalPatients - data.medications.perfectAdherence - data.medications.concerningAdherence} patients</span>
                  </div>
                  <Progress value={analyticsUtils.calculatePercentage(data.medications.totalPatients - data.medications.perfectAdherence - data.medications.concerningAdherence, data.medications.totalPatients)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Concerning Adherence (&lt;80%)</span>
                    <span>{data.medications.concerningAdherence} patients</span>
                  </div>
                  <Progress value={analyticsUtils.calculatePercentage(data.medications.concerningAdherence, data.medications.totalPatients)} className="h-2" />
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{data.medications.averageAdherence}%</div>
                    <p className="text-sm text-muted-foreground">Average Adherence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Video Upload Compliance</CardTitle>
                <CardDescription>Monthly video upload tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={videoComplianceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="uploaded" fill="#3b82f6" />
                      <Bar dataKey="required" fill="#e5e7eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Engagement</CardTitle>
                <CardDescription>Peer support and community metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{data.socialMetrics.totalConnections}</div>
                    <p className="text-sm text-muted-foreground">Total Connections</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{data.socialMetrics.activeChats}</div>
                    <p className="text-sm text-muted-foreground">Active Chats</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Support Sessions</span>
                    <span className="font-medium">{data.socialMetrics.supportSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Peer Support Score</span>
                    <span className="font-medium">{data.socialMetrics.peerSupportScore}/100</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Community Engagement</span>
                    <span>{data.socialMetrics.peerSupportScore}%</span>
                  </div>
                  <Progress value={data.socialMetrics.peerSupportScore} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}