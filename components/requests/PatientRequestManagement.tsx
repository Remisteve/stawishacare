import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ClipboardList,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  MessageSquare,
  Phone,
  Plus,
  Shield,
  Heart,
  Pill,
  Building2,
  User,
  FileText,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { requestUtils, dateUtils, userUtils } from '@/lib/utils';

interface PatientRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  hospitalId: string;
  hospitalName: string;
  requestType: 'prep' | 'pep' | 'condom' | 'hospital_join' | 'transfer' | 'general';
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  reason: string;
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  requestedBy: string; // patient or doctor
  assignedTo?: string; // doctor or admin ID
  assignedToName?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  followUpRequired: boolean;
  urgentReason?: string;
  attachments?: string[];
  estimatedTimeToProcess: number; // in hours
}

// Mock data - replace with Firebase data
const mockRequests: PatientRequest[] = [
  {
    id: '1',
    patientId: 'p1',
    patientName: 'Alice Cooper',
    patientPhone: '+254700123456',
    patientEmail: 'alice@example.com',
    hospitalId: 'h1',
    hospitalName: 'General Hospital',
    requestType: 'prep',
    status: 'pending',
    priority: 'medium',
    title: 'PrEP Start Request',
    description: 'I would like to start PrEP treatment as I am at high risk of HIV exposure.',
    reason: 'High-risk sexual behavior, partner positive',
    medicalHistory: 'No significant medical history',
    currentMedications: 'None',
    allergies: 'None known',
    requestedBy: 'patient',
    submittedAt: '2024-03-14T10:30:00',
    followUpRequired: true,
    estimatedTimeToProcess: 24
  },
  {
    id: '2',
    patientId: 'p2',
    patientName: 'Bob Martinez',
    patientPhone: '+254700123457',
    patientEmail: 'bob@example.com',
    hospitalId: 'h1',
    hospitalName: 'General Hospital',
    requestType: 'pep',
    status: 'urgent',
    priority: 'urgent',
    title: 'Urgent PEP Request',
    description: 'Potential HIV exposure 6 hours ago, need immediate PEP treatment.',
    reason: 'Occupational needle stick injury',
    urgentReason: 'Time-sensitive PEP initiation required within 72 hours',
    requestedBy: 'patient',
    submittedAt: '2024-03-14T16:00:00',
    followUpRequired: true,
    estimatedTimeToProcess: 2
  },
  {
    id: '3',
    patientId: 'p3',
    patientName: 'Carol White',
    patientPhone: '+254700123458',
    patientEmail: 'carol@example.com',
    hospitalId: 'h2',
    hospitalName: 'Community Health Center',
    requestType: 'condom',
    status: 'approved',
    priority: 'low',
    title: 'Condom Services Request',
    description: 'Request for regular condom supply and sexual health counseling.',
    reason: 'Prevention and family planning',
    requestedBy: 'patient',
    assignedTo: 'd1',
    assignedToName: 'Dr. Sarah Smith',
    submittedAt: '2024-03-13T14:20:00',
    reviewedAt: '2024-03-13T15:30:00',
    reviewedBy: 'Dr. Sarah Smith',
    reviewNotes: 'Approved for monthly condom supply and quarterly counseling',
    followUpRequired: false,
    estimatedTimeToProcess: 4
  },
  {
    id: '4',
    patientId: 'p4',
    patientName: 'David Kim',
    patientPhone: '+254700123459',
    patientEmail: 'david@example.com',
    hospitalId: 'h1',
    hospitalName: 'General Hospital',
    requestType: 'hospital_join',
    status: 'under_review',
    priority: 'medium',
    title: 'Hospital Transfer Request',
    description: 'Request to transfer care from Metro Hospital to General Hospital.',
    reason: 'Relocation to new area, closer to General Hospital',
    requestedBy: 'patient',
    assignedTo: 'a1',
    assignedToName: 'Admin Jane Doe',
    submittedAt: '2024-03-12T11:15:00',
    followUpRequired: true,
    estimatedTimeToProcess: 48
  },
  {
    id: '5',
    patientId: 'p5',
    patientName: 'Emma Davis',
    patientPhone: '+254700123460',
    patientEmail: 'emma@example.com',
    hospitalId: 'h1',
    hospitalName: 'General Hospital',
    requestType: 'prep',
    status: 'rejected',
    priority: 'medium',
    title: 'PrEP Continuation Request',
    description: 'Continue PrEP treatment with updated risk assessment.',
    reason: 'Ongoing risk factors',
    requestedBy: 'patient',
    assignedTo: 'd2',
    assignedToName: 'Dr. John Johnson',
    submittedAt: '2024-03-11T09:45:00',
    reviewedAt: '2024-03-12T10:30:00',
    reviewedBy: 'Dr. John Johnson',
    reviewNotes: 'Recent lab results show kidney function concerns. Recommend alternative prevention methods.',
    followUpRequired: true,
    estimatedTimeToProcess: 24
  }
];

interface PatientRequestManagementProps {
  userRole: string;
  userId?: string;
  hospitalId?: string;
}

export default function PatientRequestManagement({ userRole, userId, hospitalId }: PatientRequestManagementProps) {
  const [requests, setRequests] = useState<PatientRequest[]>(mockRequests);
  const [filteredRequests, setFilteredRequests] = useState<PatientRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<PatientRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | ''>('');

  // Filter requests based on all criteria
  useEffect(() => {
    let filtered = requests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(req => req.requestType === typeFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(req => req.priority === priorityFilter);
    }

    // Apply tab filter
    if (selectedTab !== 'all') {
      filtered = filtered.filter(req => {
        switch (selectedTab) {
          case 'pending':
            return req.status === 'pending';
          case 'urgent':
            return req.status === 'urgent' || req.priority === 'urgent';
          case 'under_review':
            return req.status === 'under_review';
          case 'approved':
            return req.status === 'approved';
          case 'rejected':
            return req.status === 'rejected';
          case 'prep':
            return req.requestType === 'prep';
          case 'pep':
            return req.requestType === 'pep';
          case 'condom':
            return req.requestType === 'condom';
          default:
            return true;
        }
      });
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, typeFilter, statusFilter, priorityFilter, selectedTab]);

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'prep': return <Shield className="h-4 w-4" />;
      case 'pep': return <Shield className="h-4 w-4" />;
      case 'condom': return <Heart className="h-4 w-4" />;
      case 'hospital_join': return <Building2 className="h-4 w-4" />;
      case 'transfer': return <Building2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      case 'under_review': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getRequestCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      urgent: requests.filter(r => r.status === 'urgent' || r.priority === 'urgent').length,
      under_review: requests.filter(r => r.status === 'under_review').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      prep: requests.filter(r => r.requestType === 'prep').length,
      pep: requests.filter(r => r.requestType === 'pep').length,
      condom: requests.filter(r => r.requestType === 'condom').length,
    };
  };

  const handleReviewRequest = (request: PatientRequest) => {
    setSelectedRequest(request);
    setReviewNotes(request.reviewNotes || '');
    setReviewDialogOpen(true);
  };

  const submitReview = () => {
    if (!selectedRequest || !reviewAction) return;

    const updatedRequest = {
      ...selectedRequest,
      status: reviewAction === 'approve' ? 'approved' as const : 'rejected' as const,
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'Current User', // Replace with actual user
      reviewNotes: reviewNotes
    };

    setRequests(prev => prev.map(req => 
      req.id === selectedRequest.id ? updatedRequest : req
    ));

    setReviewDialogOpen(false);
    setSelectedRequest(null);
    setReviewNotes('');
    setReviewAction('');
  };

  const counts = getRequestCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Patient Request Management</h2>
          <p className="text-muted-foreground">
            Manage patient requests for PrEP, PEP, condom services, and more
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{counts.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{counts.urgent}</div>
            <p className="text-sm text-muted-foreground">Urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{counts.prep}</div>
            <p className="text-sm text-muted-foreground">PrEP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{counts.pep}</div>
            <p className="text-sm text-muted-foreground">PEP</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{counts.condom}</div>
            <p className="text-sm text-muted-foreground">Condom</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{counts.approved}</div>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Request Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="prep">PrEP Requests</SelectItem>
                  <SelectItem value="pep">PEP Requests</SelectItem>
                  <SelectItem value="condom">Condom Services</SelectItem>
                  <SelectItem value="hospital_join">Hospital Join</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {/* Request Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" className="flex items-center gap-1">
            All <Badge variant="secondary">{counts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-1">
            Pending <Badge variant="secondary">{counts.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="urgent" className="flex items-center gap-1">
            Urgent <Badge variant="destructive">{counts.urgent}</Badge>
          </TabsTrigger>
          <TabsTrigger value="prep" className="flex items-center gap-1">
            PrEP <Badge variant="secondary">{counts.prep}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pep" className="flex items-center gap-1">
            PEP <Badge variant="secondary">{counts.pep}</Badge>
          </TabsTrigger>
          <TabsTrigger value="condom" className="flex items-center gap-1">
            Condom <Badge variant="secondary">{counts.condom}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No requests found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or check back later for new requests.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card 
                  key={request.id} 
                  className={`hover:shadow-md transition-shadow ${
                    request.status === 'urgent' ? 'border-red-200 bg-red-50' : ''
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Request Type Icon */}
                        <div className={`p-2 rounded-lg ${requestUtils.getRequestTypeColor(request.requestType)}`}>
                          {getRequestIcon(request.requestType)}
                        </div>

                        {/* Request Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{request.title}</h3>
                            <Badge className={requestUtils.getRequestTypeColor(request.requestType)}>
                              {request.requestType.toUpperCase()}
                            </Badge>
                            <Badge className={requestUtils.getPriorityColor(request.priority)}>
                              {request.priority.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm font-medium">Patient</p>
                              <p className="text-sm text-muted-foreground">{request.patientName}</p>
                              <p className="text-xs text-muted-foreground">{request.patientEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Hospital</p>
                              <p className="text-sm text-muted-foreground">{request.hospitalName}</p>
                              <p className="text-xs text-muted-foreground">
                                Submitted {dateUtils.getRelativeTime(request.submittedAt)}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                          
                          {request.urgentReason && (
                            <Alert className="mb-2">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>
                                <strong>Urgent:</strong> {request.urgentReason}
                              </AlertDescription>
                            </Alert>
                          )}

                          {request.reviewNotes && (
                            <div className="mt-2 p-3 bg-muted rounded-lg">
                              <p className="text-sm font-medium">Review Notes:</p>
                              <p className="text-sm text-muted-foreground">{request.reviewNotes}</p>
                              {request.reviewedBy && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Reviewed by {request.reviewedBy} on {dateUtils.formatDateTime(request.reviewedAt!)}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex flex-col items-end space-y-3">
                        <Badge className={requestUtils.getRequestStatus(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status.replace('_', ' ')}</span>
                        </Badge>

                        <div className="text-right text-xs text-muted-foreground">
                          <p>Est. {request.estimatedTimeToProcess}h to process</p>
                          {request.assignedToName && (
                            <p>Assigned to {request.assignedToName}</p>
                          )}
                        </div>

                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          
                          {request.patientPhone && (
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {(request.status === 'pending' || request.status === 'under_review') && (
                            <Button 
                              size="sm" 
                              onClick={() => handleReviewRequest(request)}
                            >
                              Review
                            </Button>
                          )}
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

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Request</DialogTitle>
            <DialogDescription>
              Review and provide decision for {selectedRequest?.title}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Patient</p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Request Type</p>
                  <Badge className={requestUtils.getRequestTypeColor(selectedRequest.requestType)}>
                    {selectedRequest.requestType.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Medical Information</p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  {selectedRequest.medicalHistory && (
                    <p><strong>History:</strong> {selectedRequest.medicalHistory}</p>
                  )}
                  {selectedRequest.currentMedications && (
                    <p><strong>Medications:</strong> {selectedRequest.currentMedications}</p>
                  )}
                  {selectedRequest.allergies && (
                    <p><strong>Allergies:</strong> {selectedRequest.allergies}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Review Notes</label>
                <Textarea
                  placeholder="Enter your review notes..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button
                    variant={reviewAction === 'approve' ? 'default' : 'outline'}
                    onClick={() => setReviewAction('approve')}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    variant={reviewAction === 'reject' ? 'destructive' : 'outline'}
                    onClick={() => setReviewAction('reject')}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
                
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={submitReview}
                    disabled={!reviewAction || !reviewNotes}
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}