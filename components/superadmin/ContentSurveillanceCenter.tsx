"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Video, Calendar, Eye, Play, Pause, Download, Share, Flag, Shield, AlertTriangle,
  Users, Clock, MapPin, Search, Filter, Monitor, Satellite, Radar, Database,
  FileVideo, FileText, Image, Mic, Heart, Baby, UserCheck, Activity, Brain,
  Crosshair, Target, Zap, Globe, Network, Terminal, Crown, Lock, Unlock,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

// Mock content data
const videoContent = [
  {
    id: 1, title: 'PrEP Education Session', hospital: 'Kenyatta National', doctor: 'Dr. Sarah Johnson',
    patient: 'Anonymous Patient #1234', duration: '15:42', uploadDate: '2025-06-13', status: 'approved',
    views: 234, category: 'education', flagged: false, sensitive: false, size: '145MB'
  },
  {
    id: 2, title: 'Teen Pregnancy Counseling', hospital: 'Coast General', doctor: 'Dr. Maria Santos',
    patient: 'Anonymous Patient #5678', duration: '22:15', uploadDate: '2025-06-12', status: 'review',
    views: 67, category: 'counseling', flagged: true, sensitive: true, size: '234MB'
  },
  {
    id: 3, title: 'Violence Support Session', hospital: 'Holy Family', doctor: 'Dr. John Mwangi',
    patient: 'Anonymous Patient #9012', duration: '18:30', uploadDate: '2025-06-11', status: 'approved',
    views: 12, category: 'therapy', flagged: false, sensitive: true, size: '189MB'
  },
  {
    id: 4, title: 'Discordant Couple Consultation', hospital: 'Aga Khan', doctor: 'Dr. Grace Wanjiku',
    patient: 'Anonymous Couple #3456', duration: '25:18', uploadDate: '2025-06-10', status: 'flagged',
    views: 45, category: 'counseling', flagged: true, sensitive: true, size: '298MB'
  }
];

const appointments = [
  {
    id: 1, patientId: 'P001', doctorId: 'D001', hospital: 'Kenyatta National',
    date: '2025-06-15', time: '09:00', type: 'PrEP Consultation', status: 'scheduled',
    notes: 'First time consultation', priority: 'normal', location: 'Room 205'
  },
  {
    id: 2, patientId: 'P002', doctorId: 'D002', hospital: 'Coast General',
    date: '2025-06-15', time: '10:30', type: 'Violence Counseling', status: 'urgent',
    notes: 'Emergency session required', priority: 'high', location: 'Private Room 1'
  },
  {
    id: 3, patientId: 'P003', doctorId: 'D001', hospital: 'Holy Family',
    date: '2025-06-15', time: '14:00', type: 'Teen Pregnancy Support', status: 'scheduled',
    notes: 'Follow-up session', priority: 'high', location: 'Room 102'
  },
  {
    id: 4, patientId: 'P004', doctorId: 'D003', hospital: 'Aga Khan',
    date: '2025-06-16', time: '11:00', type: 'MCH Services', status: 'confirmed',
    notes: 'Regular check-up', priority: 'normal', location: 'MCH Wing'
  }
];

const contentStats = {
  totalVideos: 1456,
  pendingReview: 23,
  flaggedContent: 67,
  sensitiveContent: 234,
  totalStorage: '2.4TB',
  dailyUploads: 45,
  totalAppointments: 3456,
  todayAppointments: 156,
  urgentAppointments: 12,
  completedToday: 89
};

const condomDistribution = [
  { hospital: 'Kenyatta National', allowed: true, distributed: 5670, requested: 6000, shortage: 330 },
  { hospital: 'Coast General', allowed: true, distributed: 3450, requested: 3500, shortage: 50 },
  { hospital: 'Aga Khan', allowed: true, distributed: 2890, requested: 3000, shortage: 110 },
  { hospital: 'Holy Family', allowed: false, distributed: 0, requested: 0, shortage: 0 },
  { hospital: 'St. Mary\'s', allowed: false, distributed: 0, requested: 0, shortage: 0 }
];

export default function ContentManagementSystem() {
  const [selectedTab, setSelectedTab] = useState('videos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'review': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-300';
      case 'rejected': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education': return <Brain className="h-4 w-4 text-blue-600" />;
      case 'counseling': return <Heart className="h-4 w-4 text-pink-600" />;
      case 'therapy': return <Shield className="h-4 w-4 text-green-600" />;
      case 'consultation': return <Users className="h-4 w-4 text-purple-600" />;
      default: return <Video className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVideos = videoContent.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || video.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || video.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Video className="mr-3 h-8 w-8 text-blue-600" />
              Content Management System
            </h1>
            <p className="text-gray-600 text-base mt-2">
              Healthcare video content, appointments, and resource management
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Videos</p>
                <p className="text-xl font-bold text-gray-900">{contentStats.totalVideos}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Pending Review</p>
                <p className="text-xl font-bold text-gray-900">{contentStats.pendingReview}</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Flagged Content</p>
                <p className="text-xl font-bold text-gray-900">{contentStats.flaggedContent}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <Flag className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Sensitive Content</p>
                <p className="text-xl font-bold text-gray-900">{contentStats.sensitiveContent}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Appointments</p>
                <p className="text-xl font-bold text-gray-900">{contentStats.totalAppointments}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Storage Used</p>
                <p className="text-xl font-bold text-gray-900">{contentStats.totalStorage}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Database className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <TabsTrigger value="videos" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md">Videos</TabsTrigger>
          <TabsTrigger value="appointments" className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-md">Appointments</TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-md">Resources</TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md">Monitoring</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white rounded-md">Analytics</TabsTrigger>
        </TabsList>

        {/* VIDEOS TAB */}
        <TabsContent value="videos" className="space-y-6">
          {/* Search and Filter Panel */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Monitor className="mr-2 h-5 w-5 text-blue-600" />
                Video Content Management
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage and review healthcare education videos and consultation recordings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-200"
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="counseling">Counseling</SelectItem>
                    <SelectItem value="therapy">Therapy</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={() => setAnalyzing(!analyzing)}
                  className={`bg-blue-600 hover:bg-blue-700 text-white ${analyzing ? 'animate-pulse' : ''}`}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {analyzing ? 'Analyzing...' : 'AI Analysis'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Video List */}
          <div className="grid gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 relative">
                        <Video className="h-8 w-8 text-blue-600" />
                        {video.flagged && (
                          <Flag className="absolute -top-1 -right-1 h-4 w-4 text-red-500" />
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{video.title}</h3>
                          {video.sensitive && (
                            <Badge className="bg-red-100 text-red-800">
                              Sensitive
                            </Badge>
                          )}
                          <Badge className={getStatusColor(video.status)}>
                            {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {video.hospital}
                          </span>
                          <span>Dr: {video.doctor}</span>
                          <span>Duration: {video.duration}</span>
                          <span>Size: {video.size}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(video.category)}
                          <span className="text-xs text-gray-500 capitalize">{video.category}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{video.views} views</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{video.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-50">
                        <Eye className="h-3 w-3" />
                      </Button>
                      {video.flagged ? (
                        <Button variant="outline" size="sm" className="border-green-300 text-green-600 hover:bg-green-50">
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                          <Flag className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* APPOINTMENTS TAB */}
        <TabsContent value="appointments" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-green-600" />
                Appointment Management
              </CardTitle>
              <CardDescription className="text-gray-600">
                Monitor and manage healthcare appointments across all facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{appointment.hospital}</span>
                          <span>{appointment.date} at {appointment.time}</span>
                          <span>{appointment.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getPriorityColor(appointment.priority)}>
                        {appointment.priority.charAt(0).toUpperCase() + appointment.priority.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RESOURCES TAB (formerly CONDOMS) */}
        <TabsContent value="resources" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-purple-600" />
                Family Planning Resource Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                Track contraceptive and family planning resource distribution across healthcare facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {condomDistribution.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${hospital.allowed ? 'bg-green-100' : 'bg-red-100'}`}>
                        <Shield className={`h-6 w-6 ${hospital.allowed ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{hospital.hospital}</h3>
                        {hospital.allowed ? (
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Distributed: {hospital.distributed.toLocaleString()}</span>
                            <span>Requested: {hospital.requested.toLocaleString()}</span>
                            {hospital.shortage > 0 && (
                              <span className="text-orange-600">Shortage: {hospital.shortage}</span>
                            )}
                          </div>
                        ) : (
                          <p className="text-red-600 text-sm">Family planning services not provided due to institutional policy</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={hospital.allowed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {hospital.allowed ? 'Active' : 'Opted Out'}
                      </Badge>
                      {hospital.allowed && hospital.shortage > 0 && (
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                          Request Restock
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MONITORING TAB */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-12">
              <div className="text-center text-gray-600">
                <Monitor className="h-16 w-16 mx-auto mb-4 text-orange-500" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Content Monitoring Dashboard</h3>
                <p className="text-gray-600">AI-powered content analysis and compliance monitoring tools</p>
                <Button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white">
                  Launch Monitoring Suite
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-12">
              <div className="text-center text-gray-600">
                <Target className="h-16 w-16 mx-auto mb-4 text-pink-500" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Content Analytics Engine</h3>
                <p className="text-gray-600">Advanced analytics for content engagement, effectiveness, and impact measurement</p>
                <Button className="mt-4 bg-pink-600 hover:bg-pink-700 text-white">
                  View Analytics Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}