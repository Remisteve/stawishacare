"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users, UserPlus, UserCheck, UserX, Crown, Shield, Stethoscope, Heart, Baby, AlertTriangle,
  MapPin, Clock, Eye, Search, Filter, Edit, Trash2, Lock, Unlock, Activity, Brain,
  Target, Crosshair, Radar, Skull, Binary, Terminal, Monitor, Database, Network
} from 'lucide-react';

// Mock user data
const users = [
  {
    id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@knh.go.ke', role: 'doctor', hospital: 'Kenyatta National',
    status: 'active', lastLogin: '2 hours ago', patients: 67, location: 'Nairobi', age: 34, married: true,
    specialCases: { violence: 2, pregnancy: 0, discordant: 8, mch: 23 }, joinDate: '2024-03-15'
  },
  {
    id: 2, name: 'Maria Rodriguez', email: 'maria.r@coast.go.ke', role: 'prep_champion', hospital: 'Coast General',
    status: 'active', lastLogin: '1 day ago', patients: 43, location: 'Mombasa', age: 28, married: false,
    specialCases: { violence: 1, pregnancy: 3, discordant: 5, mch: 18 }, joinDate: '2024-02-20'
  },
  {
    id: 3, name: 'John Mwangi', email: 'john.m@patient.com', role: 'patient', hospital: 'Aga Khan',
    status: 'active', lastLogin: '30 min ago', patients: 0, location: 'Nairobi', age: 23, married: false,
    specialCases: { violence: 0, pregnancy: 0, discordant: 1, mch: 0 }, joinDate: '2025-01-10'
  },
  {
    id: 4, name: 'Grace Wanjiku', email: 'grace.w@patient.com', role: 'patient', hospital: 'Kenyatta National',
    status: 'active', lastLogin: '5 hours ago', patients: 0, location: 'Nairobi', age: 17, married: false,
    specialCases: { violence: 1, pregnancy: 1, discordant: 0, mch: 2 }, joinDate: '2025-05-22'
  },
  {
    id: 5, name: 'Admin Michael', email: 'admin@holyfamily.co.ke', role: 'admin', hospital: 'Holy Family',
    status: 'pending', lastLogin: 'Never', patients: 0, location: 'Nairobi', age: 45, married: true,
    specialCases: { violence: 0, pregnancy: 0, discordant: 0, mch: 0 }, joinDate: '2025-06-14'
  }
];

const userStats = {
  totalUsers: 3247,
  activeToday: 1456,
  superAdmins: 2,
  admins: 32,
  doctors: 189,
  prepChampions: 67,
  patients: 2957,
  pendingApproval: 23,
  suspendedAccounts: 8,
  marriedUsers: 1834,
  teenPregnant: 89,
  violenceCases: 156,
  discordantCouples: 234,
  mchPatients: 567,
  locationEnabled: 2340
};

export default function UserManagementMatrix() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterHospital, setFilterHospital] = useState('all');
  const [scanning, setScanning] = useState(false);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin': return <Crown className="h-4 w-4 text-yellow-400" />;
      case 'admin': return <Shield className="h-4 w-4 text-purple-400" />;
      case 'doctor': return <Stethoscope className="h-4 w-4 text-blue-400" />;
      case 'prep_champion': return <Heart className="h-4 w-4 text-pink-400" />;
      case 'patient': return <Users className="h-4 w-4 text-green-400" />;
      default: return <Users className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/50 border-green-600';
      case 'pending': return 'text-yellow-400 bg-yellow-900/50 border-yellow-600';
      case 'suspended': return 'text-red-400 bg-red-900/50 border-red-600';
      case 'offline': return 'text-gray-400 bg-gray-900/50 border-gray-600';
      default: return 'text-gray-400 bg-gray-900/50 border-gray-600';
    }
  };

  const getRiskLevel = (user: any) => {
    let risk = 0;
    if (user.age < 18) risk += 2;
    if (user.specialCases.violence > 0) risk += 3;
    if (user.specialCases.pregnancy > 0 && user.age < 18) risk += 4;
    if (user.specialCases.discordant > 0) risk += 1;
    
    if (risk >= 5) return { level: 'HIGH', color: 'text-red-400 bg-red-900/20' };
    if (risk >= 3) return { level: 'MED', color: 'text-yellow-400 bg-yellow-900/20' };
    return { level: 'LOW', color: 'text-green-400 bg-green-900/20' };
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesHospital = filterHospital === 'all' || user.hospital.includes(filterHospital);
    
    return matchesSearch && matchesRole && matchesStatus && matchesHospital;
  });

  const handleUserScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-gray-900/50 border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600">TOTAL USERS</p>
                <p className="text-xl font-bold text-green-400">{userStats.totalUsers}</p>
              </div>
              <Users className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600">DOCTORS</p>
                <p className="text-xl font-bold text-blue-400">{userStats.doctors}</p>
              </div>
              <Stethoscope className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-pink-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-pink-600">PATIENTS</p>
                <p className="text-xl font-bold text-pink-400">{userStats.patients}</p>
              </div>
              <Heart className="h-6 w-6 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-yellow-600">PENDING</p>
                <p className="text-xl font-bold text-yellow-400">{userStats.pendingApproval}</p>
              </div>
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-600">HIGH RISK</p>
                <p className="text-xl font-bold text-red-400">{userStats.violenceCases}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-cyan-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-cyan-600">GEO-TRACKED</p>
                <p className="text-xl font-bold text-cyan-400">{userStats.locationEnabled}</p>
              </div>
              <MapPin className="h-6 w-6 text-cyan-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="bg-gray-900/50 border-green-800">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Terminal className="mr-2 h-5 w-5" />
            USER CONTROL MATRIX
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
              <Input
                placeholder="SEARCH USERS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-green-600 text-green-400 placeholder:text-green-600"
              />
            </div>
            
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="bg-gray-800 border-green-600 text-green-400">
                <SelectValue placeholder="ROLE FILTER" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-green-600">
                <SelectItem value="all">ALL ROLES</SelectItem>
                <SelectItem value="superadmin">SUPERADMIN</SelectItem>
                <SelectItem value="admin">ADMIN</SelectItem>
                <SelectItem value="doctor">DOCTOR</SelectItem>
                <SelectItem value="prep_champion">PREP CHAMPION</SelectItem>
                <SelectItem value="patient">PATIENT</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-gray-800 border-green-600 text-green-400">
                <SelectValue placeholder="STATUS FILTER" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-green-600">
                <SelectItem value="all">ALL STATUS</SelectItem>
                <SelectItem value="active">ACTIVE</SelectItem>
                <SelectItem value="pending">PENDING</SelectItem>
                <SelectItem value="suspended">SUSPENDED</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleUserScan}
              className={`bg-red-900 hover:bg-red-800 text-red-400 border border-red-600 ${scanning ? 'animate-pulse' : ''}`}
            >
              <Radar className="mr-2 h-4 w-4" />
              {scanning ? 'SCANNING...' : 'DEEP SCAN'}
            </Button>

            <Button className="bg-green-900 hover:bg-green-800 text-green-400 border border-green-600">
              <UserPlus className="mr-2 h-4 w-4" />
              CREATE USER
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const risk = getRiskLevel(user);
          return (
            <Card key={user.id} className="bg-gray-900/50 border-green-800 hover:border-green-600 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-800 rounded border border-gray-600">
                      {getRoleIcon(user.role)}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-green-400">{user.name}</h3>
                        <Badge className={risk.color}>
                          {risk.level}
                        </Badge>
                        {user.age < 18 && (
                          <Badge className="text-purple-400 bg-purple-900/20">
                            MINOR
                          </Badge>
                        )}
                        {user.specialCases.pregnancy > 0 && user.age < 18 && (
                          <Badge className="text-red-400 bg-red-900/20">
                            <Baby className="mr-1 h-3 w-3" />
                            TEEN PREG
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-green-600 text-sm">{user.email}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {user.location}
                        </span>
                        <span>Age: {user.age}</span>
                        <span>Hospital: {user.hospital}</span>
                        <span>Joined: {user.joinDate}</span>
                        {user.married && <span className="text-blue-400">MARRIED</span>}
                      </div>
                      
                      {/* Special Cases Indicators */}
                      <div className="flex items-center space-x-2 mt-2">
                        {user.specialCases.violence > 0 && (
                          <Badge className="text-red-400 bg-red-900/20 text-xs">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            VIOLENCE: {user.specialCases.violence}
                          </Badge>
                        )}
                        {user.specialCases.discordant > 0 && (
                          <Badge className="text-yellow-400 bg-yellow-900/20 text-xs">
                            DISCORDANT: {user.specialCases.discordant}
                          </Badge>
                        )}
                        {user.specialCases.mch > 0 && (
                          <Badge className="text-blue-400 bg-blue-900/20 text-xs">
                            MCH: {user.specialCases.mch}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        Last: {user.lastLogin}
                      </p>
                      {user.role !== 'patient' && (
                        <p className="text-xs text-green-400">
                          Patients: {user.patients}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-900">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-900">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {user.status === 'active' ? (
                        <Button variant="outline" size="sm" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900">
                          <Lock className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-900">
                          <Unlock className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Special Cases Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-red-900/20 border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-400 text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              VIOLENCE CASES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{userStats.violenceCases}</div>
            <p className="text-xs text-red-600">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-900/20 border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 text-lg flex items-center">
              <Baby className="mr-2 h-5 w-5" />
              TEEN PREGNANCIES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{userStats.teenPregnant}</div>
            <p className="text-xs text-purple-600">Under 18 with pregnancies</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-900/20 border-yellow-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-400 text-lg flex items-center">
              <UserCheck className="mr-2 h-5 w-5" />
              DISCORDANT COUPLES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{userStats.discordantCouples}</div>
            <p className="text-xs text-yellow-600">HIV status different</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/20 border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-400 text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              MCH PATIENTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{userStats.mchPatients}</div>
            <p className="text-xs text-blue-600">Maternal & Child Health</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}