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
  Calendar,
  Pill,
  Video,
  Users,
  MessageSquare,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  TrendingUp,
  Shield,
  Phone,
  Star,
  Award,
  Target,
  MapPin,
  Bell,
  UserPlus,
  Camera,
  FileText,
  Smartphone
} from 'lucide-react';

// Mock data - replace with real Firebase data
const patientStats = {
  adherenceRate: 95,
  nextAppointment: '2024-03-24',
  daysOnTreatment: 127,
  videosUploaded: 3,
  videosRequired: 4,
  friendsCount: 8,
  supportScore: 92,
  healthGoals: 4,
  achievedGoals: 3
};

const upcomingAppointments = [
  { 
    id: 1, 
    date: '2024-03-24', 
    time: '10:00 AM', 
    doctor: 'Dr. Sarah Smith', 
    type: 'PrEP Follow-up',
    location: 'General Hospital',
    status: 'confirmed'
  },
  { 
    id: 2, 
    date: '2024-04-07', 
    time: '2:30 PM', 
    doctor: 'Dr. John Wilson', 
    type: 'Lab Review',
    location: 'General Hospital',
    status: 'scheduled'
  },
  { 
    id: 3, 
    date: '2024-04-21', 
    time: '11:00 AM', 
    doctor: 'Mary Williams (Champion)', 
    type: 'Support Session',
    location: 'Video Call',
    status: 'scheduled'
  }
];

const medications = [
  { 
    id: 1, 
    name: 'Truvada', 
    dosage: '1 tablet daily', 
    nextDose: '8:00 PM today',
    adherence: 98,
    remaining: 25,
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Vitamin D3', 
    dosage: '1000 IU daily', 
    nextDose: '8:00 PM today',
    adherence: 92,
    remaining: 45,
    status: 'active'
  }
];

const videoUploads = [
  { 
    id: 1, 
    month: 'January 2024', 
    status: 'uploaded', 
    uploadDate: '2024-01-15',
    reviewed: true,
    feedback: 'Great progress! Keep up the good work.'
  },
  { 
    id: 2, 
    month: 'February 2024', 
    status: 'uploaded', 
    uploadDate: '2024-02-14',
    reviewed: true,
    feedback: 'Medication adherence is excellent.'
  },
  { 
    id: 3, 
    month: 'March 2024', 
    status: 'pending', 
    uploadDate: null,
    reviewed: false,
    feedback: null
  },
  { 
    id: 4, 
    month: 'April 2024', 
    status: 'upcoming', 
    uploadDate: null,
    reviewed: false,
    feedback: null
  }
];

const healthGoals = [
  { 
    id: 1, 
    title: 'Medication Adherence', 
    target: 95, 
    current: 98, 
    status: 'achieved',
    description: 'Take medication consistently every day'
  },
  { 
    id: 2, 
    title: 'Regular Check-ups', 
    target: 4, 
    current: 3, 
    status: 'on-track',
    description: 'Attend all scheduled appointments'
  },
  { 
    id: 3, 
    title: 'Health Education', 
    target: 8, 
    current: 6, 
    status: 'on-track',
    description: 'Complete educational modules'
  },
  { 
    id: 4, 
    title: 'Peer Support', 
    target: 12, 
    current: 8, 
    status: 'in-progress',
    description: 'Participate in support sessions'
  }
];

const friends = [
  { id: 1, name: 'Alex Johnson', status: 'online', lastActive: 'now', mutualSupport: true },
  { id: 2, name: 'Maria Garcia', status: 'offline', lastActive: '2 hours ago', mutualSupport: true },
  { id: 3, name: 'David Lee', status: 'online', lastActive: 'now', mutualSupport: false },
  { id: 4, name: 'Sarah Wilson', status: 'busy', lastActive: '30 min ago', mutualSupport: true }
];

const recentMessages = [
  { id: 1, from: 'Alex Johnson', message: 'How are you feeling today?', time: '10 minutes ago', unread: true },
  { id: 2, from: 'Dr. Smith', message: 'Lab results look good!', time: '2 hours ago', unread: false },
  { id: 3, from: 'Mary (Champion)', message: 'Great job on your progress!', time: '1 day ago', unread: false }
];

const achievements = [
  { title: '30-Day Streak', description: 'Perfect medication adherence', earned: true, icon: '🏆' },
  { title: 'Health Advocate', description: 'Completed all education modules', earned: true, icon: '📚' },
  { title: 'Support Star', description: 'Active in peer support', earned: true, icon: '⭐' },
  { title: 'Video Champion', description: 'Upload 12 monthly videos', earned: false, icon: '🎥' }
];

export default function PatientDashboard() {
  const { userData } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'uploaded': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'upcoming': return 'text-gray-600 bg-gray-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPatientStatusInfo = () => {
    const status = userData?.patientStatus;
    switch (status) {
      case 'prep':
        return { label: 'PrEP Patient', color: 'bg-blue-100 text-blue-800', icon: <Shield className="h-4 w-4" /> };
      case 'pep':
        return { label: 'PEP Patient', color: 'bg-green-100 text-green-800', icon: <Shield className="h-4 w-4" /> };
      case 'condom':
        return { label: 'Condom Services', color: 'bg-purple-100 text-purple-800', icon: <Heart className="h-4 w-4" /> };
      default:
        return { label: 'General Care', color: 'bg-gray-100 text-gray-800', icon: <Heart className="h-4 w-4" /> };
    }
  };

  const statusInfo = getPatientStatusInfo();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData?.displayName?.split(' ')[0] || 'Patient'}</h1>
          <p className="text-muted-foreground flex items-center">
            <Badge className={statusInfo.color}>
              {statusInfo.icon}
              <span className="ml-1">{statusInfo.label}</span>
            </Badge>
            <span className="ml-2">•</span>
            <span className="ml-2">{userData?.hospitalName || 'Your Hospital'}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </Button>
        </div>
      </div>

      {/* Important Alerts */}
      {videoUploads.some(v => v.status === 'pending') && (
        <Alert>
          <Camera className="h-4 w-4" />
          <AlertDescription>
            Your monthly video upload is due. Please upload your check-in video for this month.
            <Button variant="link" className="p-0 ml-2 h-auto">
              Upload Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medication Adherence</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientStats.adherenceRate}%</div>
            <Progress value={patientStats.adherenceRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Excellent adherence rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days on Treatment</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientStats.daysOnTreatment}</div>
            <p className="text-xs text-muted-foreground">
              Consistent care journey
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Check-ins</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientStats.videosUploaded}/{patientStats.videosRequired}</div>
            <Progress value={(patientStats.videosUploaded / patientStats.videosRequired) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              This quarter's uploads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Network</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientStats.friendsCount}</div>
            <p className="text-xs text-muted-foreground">
              Connected peers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Health Summary */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Health Summary
                </CardTitle>
                <CardDescription>Your current health status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Appointment</span>
                      <Badge className="text-blue-600 bg-blue-100">
                        {patientStats.nextAppointment}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medication Status</span>
                      <Badge className="text-green-600 bg-green-100">
                        On Track
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Video Upload</span>
                      <Badge className="text-yellow-600 bg-yellow-100">
                        Due Soon
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Support Score</span>
                      <span className="font-medium">{patientStats.supportScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Health Goals</span>
                      <span className="font-medium">{patientStats.achievedGoals}/{patientStats.healthGoals}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Care Team</span>
                      <span className="font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Messages
                </CardTitle>
                <CardDescription>Latest communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map((message) => (
                    <div key={message.id} className={`p-3 rounded-lg border ${message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{message.from}</span>
                        {message.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All Messages
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Book Appointment</p>
                <Button variant="outline" size="sm" className="mt-2">Schedule</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Upload Video</p>
                <Button variant="outline" size="sm" className="mt-2">Upload</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Find Friends</p>
                <Button variant="outline" size="sm" className="mt-2">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium">Call Support</p>
                <Button variant="outline" size="sm" className="mt-2">Call</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="h-5 w-5 mr-2" />
                  My Medications
                </CardTitle>
                <CardDescription>Current medication schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground">{med.dosage}</p>
                        <p className="text-xs text-muted-foreground">Next: {med.nextDose}</p>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={getStatusColor(med.status)}>
                          {med.adherence}% adherence
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {med.remaining} pills left
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminders
                </Button>
              </CardContent>
            </Card>

            {/* Video Uploads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Video Check-ins
                </CardTitle>
                <CardDescription>Monthly health video uploads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {videoUploads.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{video.month}</p>
                        {video.uploadDate && (
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {video.uploadDate}
                          </p>
                        )}
                        {video.feedback && (
                          <p className="text-xs text-green-600 mt-1">{video.feedback}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(video.status)}>
                          {video.status}
                        </Badge>
                        {video.status === 'pending' && (
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-1" />
                            Upload
                          </Button>
                        )}
                        {video.status === 'uploaded' && video.reviewed && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Appointments
                </span>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New
                </Button>
              </CardTitle>
              <CardDescription>Your scheduled appointments and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-medium">{appointment.time}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          {appointment.location.includes('Video') ? (
                            <Video className="h-3 w-3 mr-1" />
                          ) : (
                            <MapPin className="h-3 w-3 mr-1" />
                          )}
                          {appointment.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <div className="flex space-x-1">
                        {appointment.location.includes('Video') && (
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Friends/Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    My Connections
                  </span>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Find Friends
                  </Button>
                </CardTitle>
                <CardDescription>Your peer support network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {friend.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Last active: {friend.lastActive}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(friend.status)}>
                          {friend.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
                <CardDescription>Your health journey milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Health Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Health Goals
                </CardTitle>
                <CardDescription>Your progress towards health objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{goal.title}</span>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>{goal.description}</span>
                        <span>{goal.current}/{goal.target}</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Overall Progress
                </CardTitle>
                <CardDescription>Your health journey statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{patientStats.daysOnTreatment}</div>
                  <p className="text-sm text-muted-foreground">Days on Treatment</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{patientStats.adherenceRate}%</div>
                  <p className="text-sm text-muted-foreground">Medication Adherence</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{patientStats.supportScore}</div>
                  <p className="text-sm text-muted-foreground">Support Network Score</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{patientStats.achievedGoals}/{patientStats.healthGoals}</div>
                  <p className="text-sm text-muted-foreground">Goals Achieved</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}