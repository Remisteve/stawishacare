import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Users,
  UserPlus,
  MessageSquare,
  Video,
  Phone,
  Heart,
  Send,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Shield,
  Star,
  Smile,
  Image,
  Paperclip,
  Mic,
  VideoIcon
} from 'lucide-react';
import { userUtils, dateUtils } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  patientStatus: 'prep' | 'pep' | 'condom' | 'general';
  location: string;
  hospitalId: string;
  hospitalName: string;
  joinedDate: string;
  lastActive: string;
  isVerified: boolean;
  mutualFriends: number;
  bio?: string;
  interests?: string[];
  supportScore: number;
  isPrivate: boolean;
}

interface FriendRequest {
  id: string;
  fromUser: User;
  toUserId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'video_call' | 'voice_call';
  timestamp: string;
  read: boolean;
  reactions?: { emoji: string; userId: string; userName: string }[];
}

interface Chat {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  createdAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/avatars/alex.jpg',
    status: 'online',
    patientStatus: 'prep',
    location: 'Nairobi, Kenya',
    hospitalId: 'h1',
    hospitalName: 'General Hospital',
    joinedDate: '2024-01-15',
    lastActive: new Date().toISOString(),
    isVerified: true,
    mutualFriends: 3,
    bio: 'Health advocate, fitness enthusiast. Happy to support others on their health journey!',
    interests: ['fitness', 'nutrition', 'peer support'],
    supportScore: 95,
    isPrivate: false
  },
  {
    id: '2',
    name: 'Maria Garcia',
    avatar: '/avatars/maria.jpg',
    status: 'offline',
    patientStatus: 'pep',
    location: 'Mombasa, Kenya',
    hospitalId: 'h2',
    hospitalName: 'Coast General Hospital',
    joinedDate: '2024-02-20',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isVerified: true,
    mutualFriends: 1,
    bio: 'Supporting others through their health journey. Always here to listen!',
    interests: ['mental health', 'art therapy', 'cooking'],
    supportScore: 88,
    isPrivate: false
  },
  {
    id: '3',
    name: 'David Lee',
    avatar: '/avatars/david.jpg',
    status: 'busy',
    patientStatus: 'prep',
    location: 'Kisumu, Kenya',
    hospitalId: 'h3',
    hospitalName: 'Kisumu Medical Center',
    joinedDate: '2024-03-01',
    lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isVerified: false,
    mutualFriends: 0,
    bio: 'New to the community, looking forward to connecting with others.',
    interests: ['sports', 'music', 'volunteering'],
    supportScore: 0,
    isPrivate: false
  }
];

const mockFriendRequests: FriendRequest[] = [
  {
    id: '1',
    fromUser: mockUsers[2],
    toUserId: 'current-user',
    message: 'Hi! I saw we go to the same hospital. Would love to connect and support each other!',
    status: 'pending',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  }
];

const mockChats: Chat[] = [
  {
    id: '1',
    participants: [mockUsers[0]],
    lastMessage: {
      id: '1',
      senderId: '1',
      senderName: 'Alex Johnson',
      content: 'How are you feeling today? Remember to take your medication!',
      type: 'text',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      read: false
    },
    unreadCount: 2,
    isGroup: false,
    createdAt: '2024-03-10'
  },
  {
    id: '2',
    participants: [mockUsers[1]],
    lastMessage: {
      id: '2',
      senderId: 'current-user',
      senderName: 'You',
      content: 'Thanks for the support yesterday!',
      type: 'text',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true
    },
    unreadCount: 0,
    isGroup: false,
    createdAt: '2024-03-08'
  }
];

interface SocialNetworkingProps {
  userId: string;
  userRole: string;
}

export default function SocialNetworking({ userId, userRole }: SocialNetworkingProps) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(mockFriendRequests);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('discover');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendFriendRequest = (user: User) => {
    const newRequest: FriendRequest = {
      id: Date.now().toString(),
      fromUser: {
        id: userId,
        name: 'Current User',
        status: 'online',
        patientStatus: 'prep',
        location: 'Nairobi, Kenya',
        hospitalId: 'h1',
        hospitalName: 'General Hospital',
        joinedDate: '2024-01-01',
        lastActive: new Date().toISOString(),
        isVerified: true,
        mutualFriends: 0,
        supportScore: 85,
        isPrivate: false
      },
      toUserId: user.id,
      message: requestMessage,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // In real app, this would be sent to the other user
    console.log('Friend request sent:', newRequest);
    setRequestDialogOpen(false);
    setRequestMessage('');
    setSelectedUser(null);
  };

  const respondToFriendRequest = (requestId: string, action: 'accept' | 'reject') => {
    setFriendRequests(prev => prev.map(req =>
      req.id === requestId ? { ...req, status: action === 'accept' ? 'accepted' : 'rejected' } : req
    ));

    if (action === 'accept') {
      // Add to friends list and create chat
      const request = friendRequests.find(req => req.id === requestId);
      if (request) {
        const newChat: Chat = {
          id: Date.now().toString(),
          participants: [request.fromUser],
          unreadCount: 0,
          isGroup: false,
          createdAt: new Date().toISOString()
        };
        setChats(prev => [newChat, ...prev]);
      }
    }
  };

  const startChat = (user: User) => {
    const existingChat = chats.find(chat => 
      !chat.isGroup && chat.participants.some(p => p.id === user.id)
    );

    if (existingChat) {
      setSelectedChat(existingChat);
      loadChatMessages(existingChat.id);
    } else {
      const newChat: Chat = {
        id: Date.now().toString(),
        participants: [user],
        unreadCount: 0,
        isGroup: false,
        createdAt: new Date().toISOString()
      };
      setChats(prev => [newChat, ...prev]);
      setSelectedChat(newChat);
      setChatMessages([]);
    }
  };

  const loadChatMessages = (chatId: string) => {
    // Mock messages - in real app, load from Firebase
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        senderId: selectedChat?.participants[0]?.id || '1',
        senderName: selectedChat?.participants[0]?.name || 'Friend',
        content: 'Hi! How are you doing today?',
        type: 'text',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: '2',
        senderId: userId,
        senderName: 'You',
        content: 'I\'m doing well, thanks! Just took my medication.',
        type: 'text',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: '3',
        senderId: selectedChat?.participants[0]?.id || '1',
        senderName: selectedChat?.participants[0]?.name || 'Friend',
        content: 'That\'s great! Keep up the good work. Remember, you\'re not alone in this journey.',
        type: 'text',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        read: false
      }
    ];
    setChatMessages(mockMessages);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: 'You',
      content: newMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      read: false
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update last message in chat
    setChats(prev => prev.map(chat =>
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: message }
        : chat
    ));
  };

  const startVideoCall = () => {
    if (!selectedChat) return;
    
    const callMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: 'You',
      content: 'Started a video call',
      type: 'video_call',
      timestamp: new Date().toISOString(),
      read: false
    };

    setChatMessages(prev => [...prev, callMessage]);
    // In real app, initiate video call
    console.log('Starting video call with:', selectedChat.participants[0].name);
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-80 border-r bg-card">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="h-full flex flex-col">
          <div className="p-4 border-b">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="requests">
                Requests
                {friendRequests.filter(r => r.status === 'pending').length > 0 && (
                  <Badge className="ml-1 h-5 w-5 flex items-center justify-center text-xs">
                    {friendRequests.filter(r => r.status === 'pending').length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="discover" className="flex-1 p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search people..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{userUtils.getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1">
                          <p className="font-medium truncate">{user.name}</p>
                          {user.isVerified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.location}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Badge className={userUtils.getPatientStatusColor(user.patientStatus)} size="sm">
                            {user.patientStatus.toUpperCase()}
                          </Badge>
                          {user.mutualFriends > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {user.mutualFriends} mutual
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(user);
                            setProfileDialogOpen(true);
                          }}
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setRequestDialogOpen(true);
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="friends" className="flex-1 p-0">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {chats.map((chat) => (
                  <Card 
                    key={chat.id} 
                    className={`p-3 cursor-pointer hover:shadow-md transition-shadow ${
                      selectedChat?.id === chat.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => {
                      setSelectedChat(chat);
                      loadChatMessages(chat.id);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.participants[0]?.avatar} />
                          <AvatarFallback>
                            {userUtils.getInitials(chat.participants[0]?.name || '')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chat.participants[0]?.status || 'offline')}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">
                            {chat.isGroup ? chat.groupName : chat.participants[0]?.name}
                          </p>
                          {chat.unreadCount > 0 && (
                            <Badge className="h-5 w-5 flex items-center justify-center text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                        {chat.lastMessage && (
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage.senderName}: {chat.lastMessage.content}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {chat.lastMessage ? dateUtils.getRelativeTime(chat.lastMessage.timestamp) : ''}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="requests" className="flex-1 p-0">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {friendRequests.filter(req => req.status === 'pending').map((request) => (
                  <Card key={request.id} className="p-3">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={request.fromUser.avatar} />
                        <AvatarFallback>{userUtils.getInitials(request.fromUser.name)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{request.fromUser.name}</p>
                        <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {dateUtils.getRelativeTime(request.createdAt)}
                        </p>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            onClick={() => respondToFriendRequest(request.id, 'accept')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => respondToFriendRequest(request.id, 'reject')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {friendRequests.filter(req => req.status === 'pending').length === 0 && (
                  <div className="text-center py-8">
                    <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No pending friend requests</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.participants[0]?.avatar} />
                    <AvatarFallback>
                      {userUtils.getInitials(selectedChat.participants[0]?.name || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {selectedChat.isGroup ? selectedChat.groupName : selectedChat.participants[0]?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedChat.participants[0]?.status === 'online' ? 'Online' : 
                       `Last seen ${dateUtils.getRelativeTime(selectedChat.participants[0]?.lastActive || '')}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={startVideoCall}>
                    <VideoIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderId === userId 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    } rounded-lg p-3`}>
                      {message.type === 'video_call' ? (
                        <div className="flex items-center space-x-2">
                          <VideoIcon className="h-4 w-4" />
                          <span className="text-sm">{message.content}</span>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      <p className={`text-xs mt-1 ${
                        message.senderId === userId 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {dateUtils.formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Image className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button size="sm" variant="ghost">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a friend to start chatting or discover new people to connect with.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="text-lg">
                    {userUtils.getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center space-x-1">
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  {selectedUser.isVerified && <CheckCircle className="h-5 w-5 text-blue-500" />}
                </div>
                <p className="text-muted-foreground">{selectedUser.location}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge className={userUtils.getPatientStatusColor(selectedUser.patientStatus)}>
                    {selectedUser.patientStatus.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Hospital:</span>
                  <span className="text-sm">{selectedUser.hospitalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Joined:</span>
                  <span className="text-sm">{dateUtils.formatDate(selectedUser.joinedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Support Score:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{selectedUser.supportScore}/100</span>
                  </div>
                </div>
              </div>

              {selectedUser.bio && (
                <div>
                  <p className="text-sm font-medium mb-1">About</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.bio}</p>
                </div>
              )}

              {selectedUser.interests && selectedUser.interests.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedUser.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" size="sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setProfileDialogOpen(false);
                    startChat(selectedUser);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setProfileDialogOpen(false);
                    setRequestDialogOpen(true);
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Friend Request Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Friend Request</DialogTitle>
            <DialogDescription>
              Send a friend request to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Message (optional)</label>
              <Textarea
                placeholder="Hi! I'd love to connect and support each other on our health journey..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => selectedUser && sendFriendRequest(selectedUser)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}