'use client'

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye,
  Heart,
  MapPin,
  Phone,
  Mail,
  Users,
  TrendingUp,
  Download,
  RefreshCw,
  CheckCircle,
  Star,
  Award,
  MessageSquare,
  BookOpen
} from 'lucide-react';

interface Champion {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  location: string;
  community: string;
  status: 'active' | 'training' | 'inactive';
  level: 'senior' | 'intermediate' | 'beginner';
  joinDate: string;
  clientsReached: number;
  successfulReferrals: number;
  trainingCompleted: string[];
  languages: string[];
  specialization: string;
  rating: number;
  lastActive: string;
  achievements: string[];
}

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

type StatusType = 'active' | 'training' | 'inactive';
type LevelType = 'senior' | 'intermediate' | 'beginner';

export default function PrepChampionsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | StatusType>('all');

  // Mock PrEP Champions data
  const champions: Champion[] = [
    {
      id: 1,
      name: 'Catherine Njoki',
      email: 'catherine.njoki@prepguard.com',
      phone: '+254 712 345 678',
      age: 28,
      gender: 'Female',
      location: 'Nairobi, Kenya',
      community: 'Kibera Community',
      status: 'active',
      level: 'senior',
      joinDate: '2022-06-15',
      clientsReached: 156,
      successfulReferrals: 89,
      trainingCompleted: ['Basic PrEP Education', 'Community Outreach', 'Peer Counseling'],
      languages: ['English', 'Swahili', 'Kikuyu'],
      specialization: 'Youth Outreach',
      rating: 4.9,
      lastActive: '2024-06-28T10:30:00',
      achievements: ['Top Performer Q2 2024', 'Community Hero Award']
    },
    {
      id: 2,
      name: 'David Otieno',
      email: 'david.otieno@prepguard.com',
      phone: '+254 722 987 654',
      age: 35,
      gender: 'Male',
      location: 'Mombasa, Kenya',
      community: 'Mombasa Old Town',
      status: 'active',
      level: 'intermediate',
      joinDate: '2023-01-20',
      clientsReached: 98,
      successfulReferrals: 67,
      trainingCompleted: ['Basic PrEP Education', 'HIV Testing'],
      languages: ['English', 'Swahili', 'Arabic'],
      specialization: 'Adult Education',
      rating: 4.7,
      lastActive: '2024-06-28T08:15:00',
      achievements: ['Community Trust Award']
    },
    {
      id: 3,
      name: 'Grace Achieng',
      email: 'grace.achieng@prepguard.com',
      phone: '+254 733 456 789',
      age: 31,
      gender: 'Female',
      location: 'Kisumu, Kenya',
      community: 'Kondele Market Area',
      status: 'training',
      level: 'beginner',
      joinDate: '2024-03-10',
      clientsReached: 23,
      successfulReferrals: 12,
      trainingCompleted: ['Basic PrEP Education'],
      languages: ['English', 'Swahili', 'Dholuo'],
      specialization: 'Women\'s Health',
      rating: 4.5,
      lastActive: '2024-06-27T16:45:00',
      achievements: ['New Champion Certification']
    },
    {
      id: 4,
      name: 'Samuel Kipketer',
      email: 'samuel.kipketer@prepguard.com',
      phone: '+254 744 123 456',
      age: 42,
      gender: 'Male',
      location: 'Eldoret, Kenya',
      community: 'Langas Settlement',
      status: 'inactive',
      level: 'senior',
      joinDate: '2021-11-08',
      clientsReached: 234,
      successfulReferrals: 178,
      trainingCompleted: ['Basic PrEP Education', 'Community Outreach', 'Peer Counseling', 'Advanced HIV Prevention'],
      languages: ['English', 'Swahili', 'Kalenjin'],
      specialization: 'Community Leadership',
      rating: 4.8,
      lastActive: '2024-06-15T12:20:00',
      achievements: ['Outstanding Service Award', 'Community Leader 2023']
    }
  ];

  // Statistics
  const stats: Stat[] = [
    {
      title: 'Total Champions',
      value: '24',
      change: '+5.7%',
      trend: 'up',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Active Champions',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'In Training',
      value: '6',
      change: '+2',
      trend: 'up',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'People Reached',
      value: '2,456',
      change: '+18.2%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border border-green-200';
      case 'training': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'inactive': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getLevelColor = (level: LevelType): string => {
    switch (level) {
      case 'senior': return 'bg-purple-100 text-purple-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'beginner': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredChampions = useMemo(() => {
    return champions.filter(champion => {
      const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           champion.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           champion.community.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || champion.status === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter, champions]);

  const handleExport = () => {
    console.log('Exporting champions data...');
    // In a real app, this would trigger data export functionality
  };

  const handleSync = () => {
    console.log('Syncing champions data...');
    // In a real app, this would trigger data synchronization
  };

  const handleAddChampion = () => {
    console.log('Opening add champion modal...');
    // In a real app, this would open a modal or navigate to add champion page
  };

  const handleViewChampion = (champion: Champion) => {
    console.log('Viewing champion:', champion.name);
    // In a real app, this would open champion details modal or navigate to champion page
  };

  const handleContactChampion = (champion: Champion) => {
    console.log('Contacting champion:', champion.name);
    // In a real app, this would open contact modal or start communication
  };

  const handleEditChampion = (champion: Champion) => {
    console.log('Editing champion:', champion.name);
    // In a real app, this would open edit modal or navigate to edit page
  };

  const handleMoreActions = (champion: Champion) => {
    console.log('More actions for champion:', champion.name);
    // In a real app, this would show dropdown menu with additional actions
  };

  const handleRecruitFirstChampion = () => {
    console.log('Recruiting first champion...');
    // In a real app, this would open add champion modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PrEP Champions Management</h1>
              <p className="text-gray-600">Manage community health advocates and peer educators</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={handleExport}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center"
                aria-label="Export champions data"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button 
                type="button"
                onClick={handleSync}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center"
                aria-label="Sync champions data"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </button>
              <button 
                type="button"
                onClick={handleAddChampion}
                className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all flex items-center shadow-lg"
                aria-label="Add new champion"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Champion
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl border border-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} aria-hidden="true" />
                    <span className="text-xs font-bold">{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by name, email, or community..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  aria-label="Search champions"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" aria-hidden="true" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as 'all' | StatusType)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  aria-label="Filter champions by status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="training">Training</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <span className="text-sm text-gray-500">
                {filteredChampions.length} of {champions.length} champions
              </span>
            </div>
          </div>
        </div>

        {/* Champions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChampions.map((champion) => (
            <div key={champion.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
              {/* Champion Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {champion.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{champion.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{champion.specialization}</p>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" />
                        <span className="text-sm font-medium text-gray-700">{champion.rating}</span>
                        <span className="text-xs text-gray-500">({champion.clientsReached} clients)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(champion.status)}`}>
                      {champion.status.charAt(0).toUpperCase() + champion.status.slice(1)}
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleMoreActions(champion)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label={`More actions for ${champion.name}`}
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Contact & Location Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                    <span>{champion.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                    <span>{champion.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
                    <span>{champion.community}, {champion.location}</span>
                  </div>
                </div>
              </div>

              {/* Champion Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getLevelColor(champion.level)}`}>
                    {champion.level.charAt(0).toUpperCase() + champion.level.slice(1)} Level
                  </span>
                  <div className="text-xs text-gray-500">
                    {champion.age} years, {champion.gender}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{champion.clientsReached}</p>
                    <p className="text-xs text-gray-500">People Reached</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{champion.successfulReferrals}</p>
                    <p className="text-xs text-gray-500">Referrals</p>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Languages</p>
                  <div className="flex flex-wrap gap-1">
                    {champion.languages.map((language, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Training Progress */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Training Completed</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-rose-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(champion.trainingCompleted.length / 4) * 100}%` }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{champion.trainingCompleted.length}/4 modules completed</p>
                </div>

                {/* Achievements */}
                {champion.achievements.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Recent Achievements</p>
                    <div className="space-y-1">
                      {champion.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <Award className="w-3 h-3 mr-2 text-yellow-500" aria-hidden="true" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Active: {new Date(champion.lastActive).toLocaleDateString()}</span>
                  <span>Joined: {new Date(champion.joinDate).toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button 
                    type="button"
                    onClick={() => handleViewChampion(champion)}
                    className="flex-1 bg-pink-50 text-pink-600 py-2 px-3 rounded-lg font-medium hover:bg-pink-100 transition-colors flex items-center justify-center"
                    aria-label={`View ${champion.name} details`}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleContactChampion(champion)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center"
                    aria-label={`Contact ${champion.name}`}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Contact
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleEditChampion(champion)}
                    className="bg-gray-50 text-gray-600 py-2 px-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    aria-label={`Edit ${champion.name}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChampions.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No champions found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              type="button"
              onClick={handleRecruitFirstChampion}
              className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all"
              aria-label="Recruit your first champion"
            >
              Recruit First Champion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}