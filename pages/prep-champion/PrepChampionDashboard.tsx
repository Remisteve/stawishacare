"use client"
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  Users,
  MessageCircle,
  Video,
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  HeartHandshake,
  Target,
  Award,
  Activity,
  BarChart3,
  UserPlus,
  Star,
  MessageSquare,
  Smile
} from 'lucide-react';

// Mock data - replace with real Firebase data
const championStats = {
  supportedPatients: 24,
  completedSessions: 18,
  videoCalls: 12,
  successRate: 95,
  monthlyGoal: 30,
  averageSessionTime: 45,
  patientSatisfaction: 98,
  urgentCases: 2
};

const todaySchedule = [
  { 
    id: 1, 
    time: '09:00', 
    patient: 'Alex Johnson', 
    type: 'Initial Support Session', 
    status: 'completed',
    duration: '45 min',
    notes: 'PrEP education and motivation'
  },
  { 
    id: 2, 
    time: '10:00', 
    patient: 'Maria Garcia', 
    type: 'Follow-up Call', 
    status: 'in-progress',
    duration: '30 min',
    notes: 'Adherence check and support'
  },
  { 
    id: 3, 
    time: '11:30', 
    patient: 'David Lee', 
    type: 'Video Session', 
    status: 'scheduled',
    duration: '60 min',
    notes: 'Peer support group preparation'
  },
  { 
    id: 4, 
    time: '14:00', 
    patient: 'Sarah Wilson', 
    type: 'Crisis Support', 
    status: 'urgent',
    duration: '45 min',
    notes: 'Emotional support needed'
  },
  { 
    id: 5, 
    time: '15:30', 
    patient: 'Group Session A', 
    type: 'Group Support', 
    status: 'scheduled',
    duration: '90 min',
    notes: 'Weekly peer support group'
  }
];

const supportedPatients = [
  { 
    id: 1, 
    name: 'John Smith', 
    status: 'prep', 
    lastContact: '2024-03-14', 
    nextSession: '2024-03-18',
    progress: 85,
    riskLevel: 'low',
    adherence: 92
  },
  { 
    id: 2, 
    name: 'Emma Davis', 
    status: 'pep', 
    lastContact: '2024-03-13', 
    nextSession: '2024-03-16',
    progress: 70,
    riskLevel: 'medium',
    adherence: 88
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    status: 'prep', 
    lastContact: '2024-03-12', 
    nextSession: '2024-03-19',
    progress: 95,
    riskLevel: 'low',
    adherence: 98
  },
  { 
    id: 4, 
    name: 'Lisa Johnson', 
    status: 'general', 
    lastContact: '2024-03-11', 
    nextSession: '2024-03-20',
    progress: 78,
    riskLevel: 'low',
    adherence: 85
  }
];

const urgentCases = [
  { 
    id: 1, 
    patient: 'Sarah Wilson', 
    issue: 'Side effects causing distress', 
    priority: 'high',
    timeLogged: '2 hours ago',
    action: 'Crisis support scheduled'
  },
  { 
    id: 2, 
    patient: 'Robert Kim', 
    issue: 'Missed appointments - risk assessment', 
    priority: 'medium',
    timeLogged: '6 hours ago',
    action: 'Outreach call needed'
  }
];

const achievements = [
  { title: 'Patient Advocate', description: '50+ successful support sessions', earned: true },
  { title: 'Peer Leader', description: '95%+ patient satisfaction', earned: true },
  { title: 'Community Builder', description: 'Led 10+ group sessions', earned: false },
  { title: 'Crisis Responder', description: 'Emergency support certified', earned: true }
];

const recentActivities = [
  { id: 1, type: 'session', message: 'Completed support session with Alex Johnson', time: '1 hour ago' },
  { id: 2, type: 'call', message: 'Emergency call with Sarah Wilson', time: '2 hours ago' },
  { id: 3, type: 'group', message: 'Led weekly peer support group', time: '1 day ago' },
  { id: 4, type: 'training', message: 'Completed HIV prevention training module', time: '2 days ago' }
];

export default function PrepChampionDashboard() {
  const { userData } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'scheduled': return 'text-purple-600 bg-purple-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'prep': return 'text-blue-600 bg-blue-100';
      case 'pep': return 'text-green-600 bg-green-100';
      case 'general': return 'text-gray-600 bg-gray-100';
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'session': return <MessageCircle className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'group': return <Users className="h-4 w-4" />;
      case 'training': return <BookOpen className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userData?.displayName?.split(' ')[0] || 'Champion'}</h1>
          <p className="text-muted-foreground">
            Supporting {championStats.supportedPatients} patients on their health journey
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <MessageCircle className="h-4 w-4 mr-2" />
            New Support Session
          </Button>
          <Button variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Start Group Call
          </Button>
        </div>
      </div>

      {/* Urgent Alerts */}
      {championStats.urgentCases > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {championStats.urgentCases} urgent cases requiring immediate attention.
            <Button variant="link" className="p-0 ml-2 h-auto">
              View Urgent Cases
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supported Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{championStats.supportedPatients}</div>
            <p className="text-xs text-muted-foreground">
              Active support relationships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{championStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              Patient goal achievement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{championStats.completedSessions}</div>
            <p className="text-xs text-muted-foreground">
              of {championStats.monthlyGoal} sessions goal
            </p>
            <Progress value={(championStats.completedSessions / championStats.monthlyGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{championStats.patientSatisfaction}%</div>
            <p className="text-xs text-muted-foreground">
              Patient feedback score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="urgent">Urgent Cases</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Schedule Preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Support Sessions
                </CardTitle>
                <CardDescription>Your scheduled support activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.slice(0, 4).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <p className="font-medium text-sm">{session.time}</p>
                          <p className="text-xs text-muted-foreground">{session.duration}</p>
                        </div>
                        <div>
                          <p className="font-medium">{session.patient}</p>
                          <p className="text-sm text-muted-foreground">{session.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        {session.status === 'scheduled' && (
                          <Button size="sm">
                            {session.type.includes('Video') ? (
                              <Video className="h-4 w-4 mr-1" />
                            ) : (
                              <MessageCircle className="h-4 w-4 mr-1" />
                            )}
                            Start
                          </Button>
                        )}
                        {session.status === 'urgent' && (
                          <Button size="sm" variant="destructive">
                            <Phone className="h-4 w-4 mr-1" />
                            Call Now
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Your recent support work</CardDescription>
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
          </div>

          {/* Achievements and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
                <CardDescription>Your peer support milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {achievement.earned ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                        )}
                        <p className="text-sm font-medium">{achievement.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common support tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start New Support Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Create Group Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Education Materials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Progress Reports
                </Button>
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
                  Today's Full Schedule
                </span>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </CardTitle>
              <CardDescription>All support sessions and activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-medium">{session.time}</p>
                        <p className="text-xs text-muted-foreground">{session.duration}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{session.patient}</p>
                        <p className="text-sm text-muted-foreground">{session.type}</p>
                        <p className="text-xs text-muted-foreground">{session.notes}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                      <div className="flex space-x-1">
                        {session.status === 'scheduled' && (
                          <Button size="sm">
                            {session.type.includes('Video') ? (
                              <>
                                <Video className="h-4 w-4 mr-1" />
                                Join Call
                              </>
                            ) : session.type.includes('Group') ? (
                              <>
                                <Users className="h-4 w-4 mr-1" />
                                Start Group
                              </>
                            ) : (
                              <>
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Start Session
                              </>
                            )}
                          </Button>
                        )}
                        {session.status === 'urgent' && (
                          <Button size="sm" variant="destructive">
                            <Phone className="h-4 w-4 mr-1" />
                            Emergency Call
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                My Supported Patients
              </CardTitle>
              <CardDescription>Patients receiving your peer support</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportedPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <HeartHandshake className="h-6 w-6 text-pink-600" />
                        <Badge className={getStatusColor(patient.status)} size="sm">
                          {patient.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last contact: {patient.lastContact}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Next session: {patient.nextSession}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium">{patient.progress}%</p>
                        <p className="text-xs text-muted-foreground">Progress</p>
                        <Progress value={patient.progress} className="w-16 mt-1" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{patient.adherence}%</p>
                        <p className="text-xs text-muted-foreground">Adherence</p>
                      </div>
                      <Badge className={getStatusColor(patient.riskLevel)}>
                        {patient.riskLevel} risk
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Support</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Urgent Cases
                </span>
                <Badge variant="destructive">{championStats.urgentCases}</Badge>
              </CardTitle>
              <CardDescription>Cases requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentCases.map((case_) => (
                  <div key={case_.id} className="flex items-center justify-between p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium">{case_.patient}</p>
                      <p className="text-sm text-muted-foreground">{case_.issue}</p>
                      <p className="text-xs text-muted-foreground">
                        Logged: {case_.timeLogged}
                      </p>
                      <p className="text-xs text-green-600 font-medium">{case_.action}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(case_.priority)}>
                        {case_.priority} priority
                      </Badge>
                      <Button size="sm" variant="destructive">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Now
                      </Button>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Monthly Progress
                </CardTitle>
                <CardDescription>Your support metrics this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Sessions Completed</span>
                    <span>{championStats.completedSessions}/{championStats.monthlyGoal}</span>
                  </div>
                  <Progress value={(championStats.completedSessions / championStats.monthlyGoal) * 100} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Video Calls</span>
                    <span>{championStats.videoCalls}</span>
                  </div>
                  <Progress value={80} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span>{championStats.successRate}%</span>
                  </div>
                  <Progress value={championStats.successRate} className="mt-1" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Patient Satisfaction</span>
                    <span>{championStats.patientSatisfaction}%</span>
                  </div>
                  <Progress value={championStats.patientSatisfaction} className="mt-1" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Impact Summary
                </CardTitle>
                <CardDescription>Your positive impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">{championStats.supportedPatients}</div>
                  <p className="text-sm text-muted-foreground">Patients Supported</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">156</div>
                  <p className="text-sm text-muted-foreground">Total Sessions This Year</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <p className="text-sm text-muted-foreground">Goal Achievement Rate</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">4.9</div>
                  <p className="text-sm text-muted-foreground">Average Rating (5-star scale)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
