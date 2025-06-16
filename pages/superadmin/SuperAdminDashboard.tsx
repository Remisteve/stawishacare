"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  Users,
  Activity,
  TrendingUp,
  Shield,
  Database,
  Globe,
  Zap,
  UserPlus,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Stethoscope,
  Heart
} from 'lucide-react';

// Mock data - replace with real Firebase data
const systemStats = {
  totalHospitals: 23,
  totalUsers: 1247,
  activePatients: 892,
  systemUptime: 99.9,
  dailyActiveUsers: 456,
  weeklyGrowth: 12.5,
  monthlyRevenue: 45600,
  criticalAlerts: 2
};

const recentHospitals = [
  { id: 1, name: 'General Hospital', location: 'Nairobi', status: 'active', users: 45, patients: 234 },
  { id: 2, name: 'Community Health Center', location: 'Mombasa', status: 'pending', users: 12, patients: 89 },
  { id: 3, name: 'Regional Medical Center', location: 'Kisumu', status: 'active', users: 28, patients: 156 },
  { id: 4, name: 'City Clinic', location: 'Eldoret', status: 'active', users: 15, patients: 78 }
];

const systemHealth = [
  { component: 'Authentication', status: 'healthy', uptime: 99.8 },
  { component: 'Database', status: 'healthy', uptime: 99.9 },
  { component: 'Storage', status: 'warning', uptime: 98.5 },
  { component: 'Notifications', status: 'healthy', uptime: 99.7 },
  { component: 'Video Calls', status: 'healthy', uptime: 97.2 }
];

const recentActivities = [
  { id: 1, type: 'hospital_added', message: 'New hospital "Metro Health" registered', time: '2 hours ago' },
  { id: 2, type: 'user_approved', message: 'Dr. Sarah Johnson approved for General Hospital', time: '4 hours ago' },
  { id: 3, type: 'system_alert', message: 'Storage capacity warning triggered', time: '6 hours ago' },
  { id: 4, type: 'milestone', message: '1000+ active patients milestone reached', time: '1 day ago' }
];

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hospital_added': return <Building2 className="h-4 w-4" />;
      case 'user_approved': return <UserPlus className="h-4 w-4" />;
      case 'system_alert': return <AlertTriangle className="h-4 w-4" />;
      case 'milestone': return <TrendingUp className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SuperAdmin Dashboard</h1>
          <p className="text-muted-foreground">
            System-wide overview and management console
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <Building2 className="h-4 w-4 mr-2" />
            Add Hospital
          </Button>
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Create Admin
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      {systemStats.criticalAlerts > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {systemStats.criticalAlerts} critical system alert(s) that require attention.
            <Button variant="link" className="p-0 ml-2 h-auto">
              View Details
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalHospitals}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +{systemStats.weeklyGrowth}% this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activePatients}</div>
            <p className="text-xs text-muted-foreground">
              {systemStats.dailyActiveUsers} active today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 inline mr-1" />
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest system events and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-2 bg-muted rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>System performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Database Usage</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>API Calls Today</span>
                    <span>12.4K</span>
                  </div>
                  <Progress value={83} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Active Sessions</span>
                    <span>234</span>
                  </div>
                  <Progress value={34} className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Registered Hospitals
                </span>
                <Button>
                  <Building2 className="h-4 w-4 mr-2" />
                  Add Hospital
                </Button>
              </CardTitle>
              <CardDescription>Manage all hospitals in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHospitals.map((hospital) => (
                  <div key={hospital.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{hospital.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {hospital.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{hospital.users}</p>
                        <p className="text-xs text-muted-foreground">Staff</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{hospital.patients}</p>
                        <p className="text-xs text-muted-foreground">Patients</p>
                      </div>
                      <Badge className={getStatusColor(hospital.status)}>
                        {hospital.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Super Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">System administrators</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Hospital Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Hospital administrators</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Medical professionals</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">PrEP Champions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Peer support specialists</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>User management features will be available here</p>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  System Health
                </CardTitle>
                <CardDescription>Monitor system components status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{component.component}</p>
                        <p className="text-xs text-muted-foreground">{component.uptime}% uptime</p>
                      </div>
                      <Badge className={getStatusColor(component.status)}>
                        {component.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Global Settings
                </CardTitle>
                <CardDescription>Platform-wide configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Database Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
