import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  UserPlus,
  Stethoscope,
  Heart,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
  BarChart3,
  UserCheck,
  ClipboardList,
  Pill,
  Video
} from 'lucide-react';

// Mock data - replace with real Firebase data
const hospitalStats = {
  totalStaff: 42,
  totalPatients: 234,
  todayAppointments: 18,
  pendingRequests: 7,
  weeklyGrowth: 8.3,
  patientSatisfaction: 94,
  averageWaitTime: 15
};

const todaySchedule = [
  { id: 1, time: '09:00', patient: 'John Doe', doctor: 'Dr. Smith', type: 'PrEP Consultation', status: 'confirmed' },
  { id: 2, time: '10:30', patient: 'Jane Wilson', doctor: 'Dr. Johnson', type: 'Follow-up', status: 'in-progress' },
  { id: 3, time: '11:00', patient: 'Mike Brown', doctor: 'Dr. Davis', type: 'PEP Evaluation', status: 'waiting' },
  { id: 4, time: '14:00', patient: 'Sarah Lee', doctor: 'Dr. Wilson', type: 'Routine Check', status: 'confirmed' },
  { id: 5, time: '15:30', patient: 'Tom Anderson', doctor: 'Dr. Smith', type: 'PrEP Start', status: 'confirmed' }
];

const recentRequests = [
  { id: 1, patient: 'Alice Cooper', type: 'PrEP Request', hospital: 'Self-registered', time: '2 hours ago', status: 'pending' },
  { id: 2, patient: 'Bob Martinez', type: 'Join Hospital', hospital: 'Transfer from Metro', time: '4 hours ago', status: 'pending' },
  { id: 3, patient: 'Carol White', type: 'Condom Services', hospital: 'Self-registered', time: '6 hours ago', status: 'approved' },
  { id: 4, patient: 'David Kim', type: 'PEP Urgent', hospital: 'Emergency', time: '8 hours ago', status: 'urgent' }
];

const staffList = [
  { id: 1, name: 'Dr. Sarah Smith', role: 'doctor', department: 'HIV Prevention', patients: 45, status: 'online' },
  { id: 2, name: 'Dr. John Johnson', role: 'doctor', department: 'Internal Medicine', patients: 38, status: 'busy' },
  { id: 3, name: 'Mary Williams', role: 'prep_champion', department: 'Peer Support', patients: 28, status: 'online' },
  { id: 4, name: 'David Brown', role: 'prep_champion', department: 'Education', patients: 22, status: 'offline' }
];

const patientCategories = [
  { category: 'PrEP Patients', count: 156, percentage: 67, color: 'bg-blue-500' },
  { category: 'PEP Patients', count: 23, percentage: 10, color: 'bg-green-500' },
  { category: 'Condom Services', count: 34, percentage: 15, color: 'bg-purple-500' },
  { category: 'General Care', count: 21, percentage: 8, color: 'bg-orange-500' }
];

export default function AdminDashboard() {
  const { userData } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'waiting': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'online': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'doctor': return <Stethoscope className="h-4 w-4" />;
      case 'prep_champion': return <Heart className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to {userData?.hospitalName || 'Your Hospital'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Urgent Alerts */}
      {hospitalStats.pendingRequests > 5 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {hospitalStats.pendingRequests} pending patient requests that need attention.
            <Button variant="link" className="p-0 ml-2 h-auto">
              Review Requests
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitalStats.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              12 doctors, 8 champions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitalStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +{hospitalStats.weeklyGrowth}% this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitalStats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">
              5 completed, 8 remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hospitalStats.patientSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              Based on recent feedback
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending Requests */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <ClipboardList className="h-5 w-5 mr-2" />
                    Pending Requests
                  </span>
                  <Badge variant="outline">{hospitalStats.pendingRequests}</Badge>
                </CardTitle>
                <CardDescription>Patient requests requiring approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.slice(0, 4).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{request.patient}</p>
                        <p className="text-sm text-muted-foreground">{request.type}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {request.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        {request.status === 'pending' && (
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">Approve</Button>
                            <Button size="sm" variant="outline">Review</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Categories</CardTitle>
                <CardDescription>Distribution by service type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category.category}</span>
                      <span>{category.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Hospital Performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Patient Satisfaction</span>
                    <span>{hospitalStats.patientSatisfaction}%</span>
                  </div>
                  <Progress value={hospitalStats.patientSatisfaction} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Staff Utilization</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Appointment Efficiency</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Review Approvals
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">EMR System</span>
                  <Badge className="text-green-600 bg-green-100">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Video Calls</span>
                  <Badge className="text-green-600 bg-green-100">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Lab Integration</span>
                  <Badge className="text-yellow-600 bg-yellow-100">Limited</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pharmacy</span>
                  <Badge className="text-green-600 bg-green-100">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Schedule
                </span>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Add Appointment
                </Button>
              </CardTitle>
              <CardDescription>Appointments scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-medium">{appointment.time}</p>
                        <p className="text-xs text-muted-foreground">Today</p>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {patientCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{category.count}</div>
                  <p className="text-xs text-muted-foreground">{category.percentage}% of total</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>Overview of patient care metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">67</div>
                  <p className="text-sm text-muted-foreground">Video Uploads This Month</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">Missed Uploads</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-sm text-muted-foreground">Medication Adherence</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Staff Overview
                </span>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Staff Member
                </Button>
              </CardTitle>
              <CardDescription>Manage your hospital staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffList.map((staff) => (
                  <div key={staff.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getRoleIcon(staff.role)}
                      </div>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-muted-foreground">{staff.department}</p>
                        <p className="text-xs text-muted-foreground">{staff.patients} patients</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
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
      </Tabs>
    </div>
  );
}