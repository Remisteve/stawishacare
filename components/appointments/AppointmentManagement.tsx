import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Video,
  Phone,
  MapPin,
  User,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { appointmentUtils, dateUtils, userUtils } from '@/lib/utils';

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  datetime: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'missed' | 'rescheduled' | 'canceled';
  location: string;
  notes?: string;
  isVirtual: boolean;
  patientStatus: 'prep' | 'pep' | 'condom' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

// Mock data - replace with Firebase data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Smith',
    datetime: '2024-03-24T10:00:00',
    duration: 30,
    type: 'PrEP Consultation',
    status: 'confirmed',
    location: 'Room 101',
    notes: 'Initial PrEP consultation',
    isVirtual: false,
    patientStatus: 'prep',
    priority: 'medium',
    createdAt: '2024-03-15T08:00:00',
    updatedAt: '2024-03-15T08:00:00'
  },
  {
    id: '2',
    patientId: 'p2',
    patientName: 'Jane Wilson',
    doctorId: 'd2',
    doctorName: 'Dr. John Johnson',
    datetime: '2024-03-22T14:30:00',
    duration: 45,
    type: 'PEP Follow-up',
    status: 'missed',
    location: 'Video Call',
    notes: 'Missed appointment - needs rescheduling',
    isVirtual: true,
    patientStatus: 'pep',
    priority: 'high',
    createdAt: '2024-03-14T10:00:00',
    updatedAt: '2024-03-22T14:30:00'
  },
  {
    id: '3',
    patientId: 'p3',
    patientName: 'Mike Brown',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Smith',
    datetime: '2024-03-25T11:00:00',
    duration: 30,
    type: 'Routine Check-up',
    status: 'scheduled',
    location: 'Room 102',
    isVirtual: false,
    patientStatus: 'prep',
    priority: 'low',
    createdAt: '2024-03-16T09:00:00',
    updatedAt: '2024-03-16T09:00:00'
  },
  {
    id: '4',
    patientId: 'p4',
    patientName: 'Sarah Lee',
    doctorId: 'd3',
    doctorName: 'Dr. David Wilson',
    datetime: '2024-03-20T09:30:00',
    duration: 60,
    type: 'Condom Counseling',
    status: 'completed',
    location: 'Room 103',
    notes: 'Counseling session completed successfully',
    isVirtual: false,
    patientStatus: 'condom',
    priority: 'medium',
    createdAt: '2024-03-12T11:00:00',
    updatedAt: '2024-03-20T10:30:00'
  },
  {
    id: '5',
    patientId: 'p5',
    patientName: 'Tom Anderson',
    doctorId: 'd2',
    doctorName: 'Dr. John Johnson',
    datetime: '2024-03-18T16:00:00',
    duration: 30,
    type: 'Lab Review',
    status: 'rescheduled',
    location: 'Video Call',
    notes: 'Rescheduled due to doctor availability',
    isVirtual: true,
    patientStatus: 'prep',
    priority: 'medium',
    createdAt: '2024-03-10T14:00:00',
    updatedAt: '2024-03-17T12:00:00'
  },
  {
    id: '6',
    patientId: 'p6',
    patientName: 'Lisa Garcia',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Smith',
    datetime: '2024-03-19T08:00:00',
    duration: 45,
    type: 'Urgent Consultation',
    status: 'canceled',
    location: 'Room 101',
    notes: 'Patient canceled due to personal reasons',
    isVirtual: false,
    patientStatus: 'pep',
    priority: 'urgent',
    createdAt: '2024-03-18T20:00:00',
    updatedAt: '2024-03-19T07:00:00'
  }
];

interface AppointmentManagementProps {
  userRole: string;
  userId?: string;
}

export default function AppointmentManagement({ userRole, userId }: AppointmentManagementProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [patientStatusFilter, setPatientStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');

  // Filter appointments based on all criteria
  useEffect(() => {
    let filtered = appointments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    // Filter by appointment type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(apt => apt.type.toLowerCase().includes(typeFilter.toLowerCase()));
    }

    // Filter by patient status
    if (patientStatusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.patientStatus === patientStatusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(apt => apt.priority === priorityFilter);
    }

    // Apply tab filter
    filtered = appointmentUtils.filterAppointments(filtered, selectedTab);

    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, statusFilter, typeFilter, patientStatusFilter, priorityFilter, selectedTab]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'missed': return <XCircle className="h-4 w-4" />;
      case 'rescheduled': return <RotateCcw className="h-4 w-4" />;
      case 'canceled': return <XCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return null;
    }
  };

  const getAppointmentCounts = () => {
    return {
      all: appointments.length,
      upcoming: appointmentUtils.filterAppointments(appointments, 'upcoming').length,
      today: appointmentUtils.filterAppointments(appointments, 'today').length,
      completed: appointmentUtils.filterAppointments(appointments, 'completed').length,
      missed: appointmentUtils.filterAppointments(appointments, 'missed').length,
      rescheduled: appointmentUtils.filterAppointments(appointments, 'rescheduled').length,
      canceled: appointmentUtils.filterAppointments(appointments, 'canceled').length,
    };
  };

  const counts = getAppointmentCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Appointment Management</h2>
          <p className="text-muted-foreground">
            Manage and track all appointments with advanced filtering
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Status</label>
              <Select value={patientStatusFilter} onValueChange={setPatientStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="prep">PrEP Patients</SelectItem>
                  <SelectItem value="pep">PEP Patients</SelectItem>
                  <SelectItem value="condom">Condom Services</SelectItem>
                  <SelectItem value="general">General Care</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="prep">PrEP Related</SelectItem>
                  <SelectItem value="pep">PEP Related</SelectItem>
                  <SelectItem value="condom">Condom Counseling</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="lab">Lab Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all" className="flex items-center gap-1">
            All <Badge variant="secondary">{counts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-1">
            Upcoming <Badge variant="secondary">{counts.upcoming}</Badge>
          </TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-1">
            Today <Badge variant="secondary">{counts.today}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            Completed <Badge variant="secondary">{counts.completed}</Badge>
          </TabsTrigger>
          <TabsTrigger value="missed" className="flex items-center gap-1">
            Missed <Badge variant="secondary">{counts.missed}</Badge>
          </TabsTrigger>
          <TabsTrigger value="rescheduled" className="flex items-center gap-1">
            Rescheduled <Badge variant="secondary">{counts.rescheduled}</Badge>
          </TabsTrigger>
          <TabsTrigger value="canceled" className="flex items-center gap-1">
            Canceled <Badge variant="secondary">{counts.canceled}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No appointments found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or create a new appointment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Priority Indicator */}
                        {getPriorityIcon(appointment.priority)}
                        
                        {/* Date & Time */}
                        <div className="text-center min-w-[100px]">
                          <p className="font-medium">{dateUtils.formatTime(appointment.datetime)}</p>
                          <p className="text-sm text-muted-foreground">
                            {dateUtils.formatDate(appointment.datetime)}
                          </p>
                          <p className="text-xs text-muted-foreground">{appointment.duration} min</p>
                        </div>

                        {/* Patient Info */}
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                            {userUtils.getInitials(appointment.patientName)}
                          </div>
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Stethoscope className="h-3 w-3 mr-1" />
                              {appointment.doctorName}
                            </p>
                          </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="flex-1">
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            {appointment.isVirtual ? (
                              <Video className="h-3 w-3 mr-1" />
                            ) : (
                              <MapPin className="h-3 w-3 mr-1" />
                            )}
                            {appointment.location}
                          </p>
                          {appointment.notes && (
                            <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                          )}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center space-x-3">
                        <Badge className={userUtils.getPatientStatusColor(appointment.patientStatus)}>
                          {appointment.patientStatus.toUpperCase()}
                        </Badge>
                        
                        <Badge className={appointmentUtils.getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1">{appointment.status}</span>
                        </Badge>

                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {appointment.status === 'scheduled' && (
                            <Button size="sm">
                              {appointment.isVirtual ? (
                                <>
                                  <Video className="h-4 w-4 mr-1" />
                                  Join
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Start
                                </>
                              )}
                            </Button>
                          )}
                          
                          {appointment.status === 'missed' && (
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Reschedule
                            </Button>
                          )}
                          
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}