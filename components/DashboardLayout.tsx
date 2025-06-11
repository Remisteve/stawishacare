// components/layout/DashboardLayout.tsx
'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/contexts/NotificationContext'
import { useChat } from '@/contexts/ChatContext'
import { useFriends } from '@/contexts/FriendsContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { 
  Menu, 
  Search, 
  Bell, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Home,
  Calendar,
  Video,
  Building2,
  Heart,
  Shield,
  Stethoscope,
  UserCheck,
  BarChart3,
  FileText,
  Phone,
  VideoIcon,
  UserPlus,
  Globe,
  Activity
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: any
  href: string
  roles: string[]
  badge?: number
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userProfile, logout } = useAuth()
  const { notifications, unreadCount } = useNotifications()
  const { chatRooms, activeCall } = useChat()
  const { friendRequests, onlineFriends } = useFriends()
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/dashboard',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion', 'patient']
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: Users,
      href: '/dashboard/patients',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion']
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      href: '/dashboard/appointments',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion', 'patient']
    },
    {
      id: 'chat',
      label: 'Messages',
      icon: MessageSquare,
      href: '/dashboard/chat',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion', 'patient'],
      badge: chatRooms.filter(room => room.lastMessage && !room.lastMessage.senderId).length
    },
    {
      id: 'video-calls',
      label: 'Video Calls',
      icon: VideoIcon,
      href: '/dashboard/video-calls',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion', 'patient']
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: UserPlus,
      href: '/dashboard/friends',
      roles: ['patient', 'prep_champion'],
      badge: friendRequests.length
    },
    {
      id: 'videos',
      label: 'Patient Videos',
      icon: Video,
      href: '/dashboard/videos',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion', 'patient']
    },
    {
      id: 'hospitals',
      label: 'Hospitals',
      icon: Building2,
      href: '/dashboard/hospitals',
      roles: ['superadmin', 'admin']
    },
    {
      id: 'social',
      label: 'Community',
      icon: Globe,
      href: '/dashboard/social',
      roles: ['patient', 'prep_champion', 'doctor']
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: '/dashboard/analytics',
      roles: ['superadmin', 'admin', 'doctor']
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      href: '/dashboard/reports',
      roles: ['superadmin', 'admin', 'doctor']
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      roles: ['superadmin', 'admin', 'doctor', 'prep_champion', 'patient']
    }
  ]

  const getRoleIcon = () => {
    switch (userProfile?.role) {
      case 'superadmin': return Shield
      case 'admin': return UserCheck
      case 'doctor': return Stethoscope
      case 'prep_champion': return Heart
      default: return Users
    }
  }

  const getRoleColor = () => {
    switch (userProfile?.role) {
      case 'superadmin': return 'from-purple-600 to-pink-600'
      case 'admin': return 'from-blue-600 to-indigo-600'
      case 'doctor': return 'from-green-600 to-emerald-600'
      case 'prep_champion': return 'from-orange-600 to-red-600'
      default: return 'from-gray-600 to-slate-600'
    }
  }

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userProfile?.role || '')
  )

  const RoleIcon = getRoleIcon()

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center space-x-3 p-6 border-b">
        <div className={`bg-gradient-to-r ${getRoleColor()} p-2 rounded-xl`}>
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">PrEP Guard</h1>
          <p className="text-xs text-gray-500 capitalize">
            {userProfile?.role?.replace('_', ' ')} Portal
          </p>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={userProfile?.profilePicture} />
            <AvatarFallback className={`bg-gradient-to-r ${getRoleColor()} text-white`}>
              <RoleIcon className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {userProfile?.displayName}
            </p>
            <p className="text-sm text-gray-600 truncate">
              {userProfile?.hospitalName || 'No Hospital'}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600">Online</span>
              {onlineFriends.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {onlineFriends.length} friends online
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredMenuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => mobile && setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge className="ml-auto bg-red-500 text-white">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Active Call Indicator */}
      {activeCall && (
        <div className="p-4 border-t bg-green-50">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                {activeCall.status === 'calling' ? 'Incoming Call' : 'In Call'}
              </p>
              <p className="text-xs text-green-600">
                {activeCall.callerName || activeCall.calleeName}
              </p>
            </div>
            <Button size="sm" variant="outline" className="text-green-700">
              {activeCall.status === 'calling' ? 'Answer' : 'View'}
            </Button>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-sm border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <Sidebar mobile />
                </SheetContent>
              </Sheet>

              {/* Search */}
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search patients, appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Real-time Activity Indicator */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">Live</span>
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start space-y-1 p-3">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-sm">{notification.title}</span>
                        <span className="text-xs text-gray-500">
                          {notification.createdAt?.toDate?.()?.toLocaleTimeString() || 'Just now'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{notification.message}</span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </DropdownMenuItem>
                  ))}
                  {notifications.length === 0 && (
                    <DropdownMenuItem disabled>
                      <span className="text-gray-500">No notifications</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Quick Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <VideoIcon className="h-4 w-4 mr-2" />
                    Start Video Call
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userProfile?.profilePicture} />
                      <AvatarFallback className={`bg-gradient-to-r ${getRoleColor()} text-white`}>
                        <RoleIcon className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userProfile?.displayName}</p>
                      <p className="text-xs text-gray-500">{userProfile?.email}</p>
                      <Badge className={`w-fit text-xs role-${userProfile?.role}`}>
                        {userProfile?.role?.replace('_', ' ')}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <Users className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}