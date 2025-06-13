import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Upload,
  Video,
  Camera,
  Play,
  Pause,
  Square,
  RotateCcw,
  Download,
  Eye,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileVideo,
  Trash2,
  Settings,
  Mic,
  MicOff
} from 'lucide-react';
import { fileUtils, dateUtils } from '@/lib/utils';

interface VideoUpload {
  id: string;
  patientId: string;
  patientName: string;
  month: string;
  year: number;
  filename: string;
  fileSize: number;
  duration: number;
  uploadDate: string;
  status: 'pending' | 'uploaded' | 'reviewed' | 'approved' | 'rejected' | 'overdue';
  reviewDate?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  isRequired: boolean;
  dueDate: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  metadata?: {
    quality: string;
    codec: string;
    bitrate: number;
  };
}

interface VideoRecorderProps {
  onVideoRecorded: (blob: Blob) => void;
  onClose: () => void;
}

function VideoRecorder({ onVideoRecorded, onClose }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasAudio, setHasAudio] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: hasAudio
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, [hasAudio]);

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      onVideoRecorded(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsPaused(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startCamera]);

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-64 object-cover"
        />
        
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-mono">{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHasAudio(!hasAudio)}
            disabled={isRecording}
          >
            {hasAudio ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          <span className="text-sm text-muted-foreground">
            {hasAudio ? 'Audio On' : 'Audio Off'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          {!isRecording ? (
            <Button onClick={startRecording}>
              <Camera className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <div className="flex space-x-2">
              {!isPaused ? (
                <Button variant="outline" onClick={pauseRecording}>
                  <Pause className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" onClick={resumeRecording}>
                  <Play className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={stopRecording} variant="destructive">
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockVideoUploads: VideoUpload[] = [
  {
    id: '1',
    patientId: 'p1',
    patientName: 'John Doe',
    month: 'March',
    year: 2024,
    filename: 'john_doe_march_2024.webm',
    fileSize: 15728640, // 15MB
    duration: 180, // 3 minutes
    uploadDate: '2024-03-15T10:30:00',
    status: 'reviewed',
    reviewDate: '2024-03-16T14:20:00',
    reviewedBy: 'Dr. Sarah Smith',
    reviewNotes: 'Patient appears healthy, good medication adherence reported.',
    isRequired: true,
    dueDate: '2024-03-31T23:59:59',
    videoUrl: '/videos/john_doe_march_2024.webm',
    thumbnailUrl: '/thumbnails/john_doe_march_2024.jpg'
  },
  {
    id: '2',
    patientId: 'p2',
    patientName: 'Jane Wilson',
    month: 'March',
    year: 2024,
    filename: 'jane_wilson_march_2024.webm',
    fileSize: 22428640, // 22MB
    duration: 240, // 4 minutes
    uploadDate: '2024-03-10T16:45:00',
    status: 'approved',
    reviewDate: '2024-03-11T09:15:00',
    reviewedBy: 'Dr. John Johnson',
    reviewNotes: 'Excellent progress, continue current treatment plan.',
    isRequired: true,
    dueDate: '2024-03-31T23:59:59',
    videoUrl: '/videos/jane_wilson_march_2024.webm',
    thumbnailUrl: '/thumbnails/jane_wilson_march_2024.jpg'
  },
  {
    id: '3',
    patientId: 'p3',
    patientName: 'Mike Brown',
    month: 'March',
    year: 2024,
    filename: '',
    fileSize: 0,
    duration: 0,
    uploadDate: '',
    status: 'overdue',
    isRequired: true,
    dueDate: '2024-03-20T23:59:59',
  },
  {
    id: '4',
    patientId: 'p4',
    patientName: 'Sarah Lee',
    month: 'April',
    year: 2024,
    filename: '',
    fileSize: 0,
    duration: 0,
    uploadDate: '',
    status: 'pending',
    isRequired: true,
    dueDate: '2024-04-30T23:59:59',
  }
];

interface VideoUploadManagementProps {
  userRole: string;
  userId?: string;
}

export default function VideoUploadManagement({ userRole, userId }: VideoUploadManagementProps) {
  const [uploads, setUploads] = useState<VideoUpload[]>(mockVideoUploads);
  const [selectedTab, setSelectedTab] = useState('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [recordDialogOpen, setRecordDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState<VideoUpload | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploaded': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'reviewed': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'approved': return 'text-green-600 bg-green-100 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-100 border-red-200';
      case 'overdue': return 'text-red-600 bg-red-100 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded': return <Upload className="h-4 w-4" />;
      case 'reviewed': return <Eye className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Video className="h-4 w-4" />;
    }
  };

  const getFilteredUploads = () => {
    switch (selectedTab) {
      case 'pending':
        return uploads.filter(u => u.status === 'pending');
      case 'uploaded':
        return uploads.filter(u => u.status === 'uploaded');
      case 'reviewed':
        return uploads.filter(u => ['reviewed', 'approved', 'rejected'].includes(u.status));
      case 'overdue':
        return uploads.filter(u => u.status === 'overdue');
      default:
        return uploads;
    }
  };

  const getCounts = () => {
    return {
      all: uploads.length,
      pending: uploads.filter(u => u.status === 'pending').length,
      uploaded: uploads.filter(u => u.status === 'uploaded').length,
      reviewed: uploads.filter(u => ['reviewed', 'approved', 'rejected'].includes(u.status)).length,
      overdue: uploads.filter(u => u.status === 'overdue').length,
    };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!fileUtils.isValidVideoType(file.type)) {
      alert('Please select a valid video file (MP4, WebM, OGG, AVI)');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      alert('File size must be less than 100MB');
      return;
    }

    simulateUpload(file);
  };

  const handleVideoRecorded = (blob: Blob) => {
    setRecordDialogOpen(false);
    simulateUpload(new File([blob], 'recorded_video.webm', { type: 'video/webm' }));
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadDialogOpen(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new upload to the list
          const newUpload: VideoUpload = {
            id: Date.now().toString(),
            patientId: userId || 'current-user',
            patientName: 'Current User',
            month: new Date().toLocaleString('default', { month: 'long' }),
            year: new Date().getFullYear(),
            filename: file.name,
            fileSize: file.size,
            duration: 0, // Would be calculated from video metadata
            uploadDate: new Date().toISOString(),
            status: 'uploaded',
            isRequired: true,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          };

          setUploads(prev => [newUpload, ...prev]);
          
          setTimeout(() => {
            setUploadDialogOpen(false);
            setUploadProgress(0);
          }, 2000);
          
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const handleReviewVideo = (upload: VideoUpload) => {
    setSelectedUpload(upload);
    setReviewNotes(upload.reviewNotes || '');
    setReviewDialogOpen(true);
  };

  const submitReview = (action: 'approve' | 'reject') => {
    if (!selectedUpload) return;

    const updatedUpload = {
      ...selectedUpload,
      status: action === 'approve' ? 'approved' as const : 'rejected' as const,
      reviewDate: new Date().toISOString(),
      reviewedBy: 'Current User',
      reviewNotes
    };

    setUploads(prev => prev.map(u => 
      u.id === selectedUpload.id ? updatedUpload : u
    ));

    setReviewDialogOpen(false);
    setSelectedUpload(null);
    setReviewNotes('');
  };

  const counts = getCounts();
  const filteredUploads = getFilteredUploads();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Video Upload Management</h2>
          <p className="text-muted-foreground">
            Manage monthly health check-in videos and reviews
          </p>
        </div>
        {userRole === 'patient' && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setRecordDialogOpen(true)}>
              <Camera className="h-4 w-4 mr-2" />
              Record Video
            </Button>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{counts.pending}</div>
            <p className="text-sm text-muted-foreground">Pending Upload</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{counts.uploaded}</div>
            <p className="text-sm text-muted-foreground">Uploaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{counts.reviewed}</div>
            <p className="text-sm text-muted-foreground">Reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{counts.overdue}</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {counts.overdue > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {counts.overdue} overdue video upload(s). Please upload them as soon as possible.
          </AlertDescription>
        </Alert>
      )}

      {/* Video Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center gap-1">
            All <Badge variant="secondary">{counts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-1">
            Pending <Badge variant="secondary">{counts.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="uploaded" className="flex items-center gap-1">
            Uploaded <Badge variant="secondary">{counts.uploaded}</Badge>
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="flex items-center gap-1">
            Reviewed <Badge variant="secondary">{counts.reviewed}</Badge>
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-1">
            Overdue <Badge variant="destructive">{counts.overdue}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredUploads.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  {selectedTab === 'pending' 
                    ? 'No pending video uploads at this time.' 
                    : 'No videos match the current filter.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUploads.map((upload) => (
                <Card key={upload.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{upload.month} {upload.year}</CardTitle>
                      <Badge className={getStatusColor(upload.status)}>
                        {getStatusIcon(upload.status)}
                        <span className="ml-1">{upload.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>{upload.patientName}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {upload.thumbnailUrl ? (
                      <div className="relative">
                        <img 
                          src={upload.thumbnailUrl} 
                          alt="Video thumbnail"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="sm" variant="secondary" className="bg-black/50 hover:bg-black/70">
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                        {upload.status === 'pending' ? (
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Upload Required</p>
                          </div>
                        ) : upload.status === 'overdue' ? (
                          <div className="text-center">
                            <AlertTriangle className="h-8 w-8 mx-auto text-red-500 mb-2" />
                            <p className="text-sm text-red-600">Overdue</p>
                          </div>
                        ) : (
                          <FileVideo className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                    )}

                    {upload.filename && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>File Size:</span>
                          <span>{fileUtils.formatFileSize(upload.fileSize)}</span>
                        </div>
                        {upload.duration > 0 && (
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{Math.floor(upload.duration / 60)}:{(upload.duration % 60).toString().padStart(2, '0')}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Uploaded:</span>
                          <span>{dateUtils.formatDate(upload.uploadDate)}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span className={dateUtils.isPast(upload.dueDate) ? 'text-red-600' : ''}>
                          {dateUtils.formatDate(upload.dueDate)}
                        </span>
                      </div>
                      {upload.isRequired && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>

                    {upload.reviewNotes && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Review Notes:</p>
                        <p className="text-sm text-muted-foreground">{upload.reviewNotes}</p>
                        {upload.reviewedBy && (
                          <p className="text-xs text-muted-foreground mt-2">
                            - {upload.reviewedBy}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {upload.videoUrl && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Play className="h-4 w-4 mr-1" />
                          Watch
                        </Button>
                      )}
                      
                      {userRole !== 'patient' && upload.status === 'uploaded' && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleReviewVideo(upload)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      )}
                      
                      {upload.status === 'pending' && userRole === 'patient' && (
                        <Button size="sm" className="flex-1">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                      )}

                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Upload Progress Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uploading Video</DialogTitle>
            <DialogDescription>
              Please wait while your video is being uploaded...
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Progress value={uploadProgress} className="h-2" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isUploading ? `${Math.round(uploadProgress)}% complete` : 'Upload completed!'}
              </p>
            </div>
            
            {!isUploading && (
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Video uploaded successfully!
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Recorder Dialog */}
      <Dialog open={recordDialogOpen} onOpenChange={setRecordDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record Health Check-in Video</DialogTitle>
            <DialogDescription>
              Record your monthly health check-in video. Speak clearly about your health status, medication adherence, and any concerns.
            </DialogDescription>
          </DialogHeader>
          
          <VideoRecorder 
            onVideoRecorded={handleVideoRecorded}
            onClose={() => setRecordDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Video Upload</DialogTitle>
            <DialogDescription>
              Review the patient's video and provide feedback
            </DialogDescription>
          </DialogHeader>
          
          {selectedUpload && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <p className="font-medium">{selectedUpload.patientName}</p>
                </div>
                <div>
                  <Label>Upload Date</Label>
                  <p>{dateUtils.formatDateTime(selectedUpload.uploadDate)}</p>
                </div>
              </div>
              
              {selectedUpload.videoUrl && (
                <div>
                  <Label>Video</Label>
                  <div className="mt-2 bg-black rounded-lg p-4">
                    <p className="text-white text-center">Video Player Placeholder</p>
                    <p className="text-white/70 text-center text-sm mt-2">
                      {selectedUpload.filename}
                    </p>
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="reviewNotes">Review Notes</Label>
                <Textarea
                  id="reviewNotes"
                  placeholder="Enter your review notes and feedback..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                  Cancel
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="destructive"
                    onClick={() => submitReview('reject')}
                    disabled={!reviewNotes}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    onClick={() => submitReview('approve')}
                    disabled={!reviewNotes}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
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
