import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Calendar,
  MessageSquare,
  Pill,
  Video,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  MarkAsUnread,
  Trash2,
  Volume2,
  VolumeX,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { notificationUtils, dateUtils } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'appointment' | 'medication' | 'video_upload' | 'message' | 'request' | 'alert' | 'system' | 'friend_request' | 'achievement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  dismissed: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
  userId: string;
  relatedId?: string; // ID of related appointment, message, etc.
  avatar?: string;
  senderName?: string;
  metadata?: Record<string, any>;
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  push: boolean;
  types: {
    appointment: boolean;
    medication: boolean;
    video_upload: boolean;
    message: boolean;
    request: boolean;
    alert: boolean;
    system: boolean;
    friend_request: boolean;
    achievement: boolean;
  };
}

// Mock notifications - replace with real Firebase data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Sarah Smith in 30 minutes',
    priority: 'high',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    actionUrl: '/patient/appointments',
    actionText: 'View Appointment',
    userId: 'current-user',
    relatedId: 'apt-1',
    senderName: 'System'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Dr. Johnson sent you a message about your lab results',
    priority: 'medium',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    actionUrl: '/patient/chat',
    actionText: 'Read Message',
    userId: 'current-user',
    relatedId: 'msg-1',
    senderName: 'Dr. Johnson',
    avatar: '/avatars/dr-johnson.jpg'
  },
  {
    id: '3',
    type: 'medication',
    title: 'Medication Reminder',
    message: 'Time to take your Truvada - 8:00 PM daily dose',
    priority: 'high',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    actionUrl: '/patient/medications',
    actionText: 'Mark as Taken',
    userId: 'current-user',
    relatedId: 'med-1',
    senderName: 'Medication Alert'
  },
  {
    id: '4',
    type: 'video_upload',
    title: 'Video Upload Due',
    message: 'Your monthly check-in video is due by March 31st',
    priority: 'medium',
    read: true,
    dismissed: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    actionUrl: '/patient/videos',
    actionText: 'Upload Video',
    userId: 'current-user',
    senderName: 'System'
  },
  {
    id: '5',
    type: 'friend_request',
    title: 'New Friend Request',
    message: 'Alex Johnson sent you a friend request',
    priority: 'low',
    read: true,
    dismissed: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    actionUrl: '/patient/social',
    actionText: 'View Request',
    userId: 'current-user',
    relatedId: 'friend-req-1',
    senderName: 'Alex Johnson',
    avatar: '/avatars/alex-johnson.jpg'
  },
  {
    id: '6',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You\'ve maintained 95% medication adherence for 30 days',
    priority: 'low',
    read: true,
    dismissed: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    actionUrl: '/patient/progress',
    actionText: 'View Achievements',
    userId: 'current-user',
    senderName: 'System'
  },
  {
    id: '7',
    type: 'alert',
    title: 'Important Health Alert',
    message: 'Lab results show kidney function requires monitoring',
    priority: 'urgent',
    read: false,
    dismissed: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    actionUrl: '/patient/records',
    actionText: 'View Results',
    userId: 'current-user',
    relatedId: 'lab-1',
    senderName: 'Dr. Smith'
  }
];

interface NotificationSystemProps {
  userId: string;
  userRole: string;
}

export default function NotificationSystem({ userId, userRole }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    desktop: true,
    email: true,
    push: true,
    types: {
      appointment: true,
      medication: true,
      video_upload: true,
      message: true,
      request: true,
      alert: true,
      system: true,
      friend_request: true,
      achievement: true,
    }
  });
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Real-time notification simulation
  useEffect(() => {
    if (!settings.enabled) return;

    const interval = setInterval(() => {
      // Simulate new notifications
      const shouldAddNotification = Math.random() < 0.1; // 10% chance every 5 seconds
      
      if (shouldAddNotification) {
        const types = Object.keys(settings.types).filter(type => 
          settings.types[type as keyof typeof settings.types]
        );
        const randomType = types[Math.floor(Math.random() * types.length)] as Notification['type'];
        
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: randomType,
          title: getRandomTitle(randomType),
          message: getRandomMessage(randomType),
          priority: getRandomPriority(),
          read: false,
          dismissed: false,
          createdAt: new Date().toISOString(),
          userId,
          senderName: 'System'
        };

        setNotifications(prev => [newNotification, ...prev]);
        
        // Play notification sound
        if (settings.sound) {
          playNotificationSound();
        }
        
        // Show desktop notification
        if (settings.desktop && 'Notification' in window) {
          showDesktopNotification(newNotification);
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [settings, userId]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const getRandomTitle = (type: string) => {
    const titles = {
      appointment: ['Appointment Reminder', 'Upcoming Appointment', 'Schedule Update'],
      medication: ['Medication Reminder', 'Pill Time', 'Medication Alert'],
      message: ['New Message', 'Doctor Message', 'Chat Update'],
      video_upload: ['Video Upload Reminder', 'Monthly Check-in Due'],
      alert: ['Health Alert', 'Important Notice', 'Lab Results'],
      system: ['System Update', 'Platform Notice'],
      friend_request: ['Friend Request', 'New Connection'],
      achievement: ['Achievement Unlocked', 'Milestone Reached']
    };
    const typeOptions = titles[type as keyof typeof titles] || ['Notification'];
    return typeOptions[Math.floor(Math.random() * typeOptions.length)];
  };

  const getRandomMessage = (type: string) => {
    const messages = {
      appointment: ['Your appointment is coming up soon', 'Reminder: Check-in with your doctor'],
      medication: ['Time for your daily medication', 'Don\'t forget your pills'],
      message: ['You have a new message from your care team', 'Your doctor sent an update'],
      video_upload: ['Your monthly video upload is due', 'Please record your check-in video'],
      alert: ['Please review your latest results', 'Important health information available'],
      system: ['Platform maintenance completed', 'New features available'],
      friend_request: ['Someone wants to connect with you', 'New peer support connection'],
      achievement: ['Great job on your health journey!', 'You\'ve reached a new milestone']
    };
    const typeOptions = messages[type as keyof typeof messages] || ['You have a new notification'];
    return typeOptions[Math.floor(Math.random() * typeOptions.length)];
  };

  const getRandomPriority = (): Notification['priority'] => {
    const priorities: Notification['priority'][] = ['low', 'medium', 'high'];
    return priorities[Math.floor(Math.random() * priorities.length)];
  };

  const playNotificationSound = () => {
    try {
      const audio = new Audio('/notification-sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(console.error);
    } catch (error) {
      console.error('Could not play notification sound:', error);
    }
  };

  const showDesktopNotification = (notification: Notification) => {
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id
      });
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, dismissed: true } : n
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getFilteredNotifications = () => {
    let filtered = notifications.filter(n => !n.dismissed);
    
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (filter === 'read') {
      filtered = filtered.filter(n => n.read);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === typeFilter);
    }
    
    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const unreadCount = notifications.filter(n => !n.read && !n.dismissed).length;
  const filteredNotifications = getFilteredNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'medication': return <Pill className="h-4 w-4" />;
      case 'video_upload': return <Video className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'friend_request': return <UserPlus className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      case 'achievement': return <CheckCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-96 p-0">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <MarkAsUnread className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Notification Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setSettings(prev => ({ ...prev, sound: !prev.sound }))}
                    >
                      {settings.sound ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                      Sound {settings.sound ? 'On' : 'Off'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setSettings(prev => ({ ...prev, desktop: !prev.desktop }))}
                    >
                      {settings.desktop ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                      Desktop {settings.desktop ? 'On' : 'Off'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex items-center space-x-2 mt-3">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('read')}
              >
                Read
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <ScrollArea className="h-96">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="p-2">
                {filteredNotifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        !notification.read 
                          ? 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${notificationUtils.getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <div className="flex items-center space-x-1">
                              {notification.priority === 'urgent' && (
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {dateUtils.getRelativeTime(notification.createdAt)}
                            </p>
                            
                            {notification.actionText && (
                              <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle action click
                                  console.log('Action clicked:', notification.actionUrl);
                                }}
                              >
                                {notification.actionText}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < filteredNotifications.length - 1 && <Separator className="my-1" />}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="p-3 border-t text-center">
            <Button variant="ghost" size="sm" className="w-full">
              View All Notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Real-time indicator */}
      {settings.enabled && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}

// Notification Settings Component
export function NotificationSettings({ settings, onSettingsChange }: {
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Global Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Delivery Methods</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">Enable Notifications</label>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(enabled) => 
                  onSettingsChange({ ...settings, enabled })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Sound Alerts</label>
              <Switch
                checked={settings.sound}
                onCheckedChange={(sound) => 
                  onSettingsChange({ ...settings, sound })
                }
                disabled={!settings.enabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Desktop Notifications</label>
              <Switch
                checked={settings.desktop}
                onCheckedChange={(desktop) => 
                  onSettingsChange({ ...settings, desktop })
                }
                disabled={!settings.enabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Email Notifications</label>
              <Switch
                checked={settings.email}
                onCheckedChange={(email) => 
                  onSettingsChange({ ...settings, email })
                }
                disabled={!settings.enabled}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Types */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notification Types</h4>
          <div className="space-y-3">
            {Object.entries(settings.types).map(([type, enabled]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getNotificationIcon(type)}
                  <label className="text-sm capitalize">
                    {type.replace('_', ' ')}
                  </label>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => 
                    onSettingsChange({
                      ...settings,
                      types: { ...settings.types, [type]: checked }
                    })
                  }
                  disabled={!settings.enabled}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  function getNotificationIcon(type: string) {
    switch (type) {
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'medication': return <Pill className="h-4 w-4" />;
      case 'video_upload': return <Video className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'friend_request': return <UserPlus className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      case 'achievement': return <CheckCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  }
}
