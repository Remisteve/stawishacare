// /app/superadmin/module/components/HivTestVideos.tsx

'use client';

import React, { useState } from 'react';
import { Video, Plus, Search, Edit, Trash2, Play, Upload, Eye, Download, Star } from 'lucide-react';

export default function HivTestVideos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'HIV Self-Testing Guide',
      description: 'Step-by-step guide for conducting HIV self-tests at home',
      duration: '8:45',
      fileSize: '42.3 MB',
      format: 'MP4',
      language: 'English',
      category: 'Tutorial',
      uploadDate: '2024-01-20',
      uploadedBy: 'Dr. Johnson',
      status: 'Active',
      views: 1247,
      downloads: 89,
      rating: 4.8,
      thumbnail: '/api/thumbnails/hiv-self-test.jpg'
    },
    {
      id: 2,
      title: 'Understanding HIV Test Results',
      description: 'How to interpret HIV test results and next steps',
      duration: '6:32',
      fileSize: '28.7 MB',
      format: 'MP4',
      language: 'Swahili',
      category: 'Education',
      uploadDate: '2024-01-18',
      uploadedBy: 'Dr. Williams',
      status: 'Active',
      views: 892,
      downloads: 67,
      rating: 4.6,
      thumbnail: '/api/thumbnails/test-results.jpg'
    },
    {
      id: 3,
      title: 'Preparing for HIV Testing',
      description: 'What to expect before, during, and after HIV testing',
      duration: '12:15',
      fileSize: '65.1 MB',
      format: 'MP4',
      language: 'English',
      category: 'Preparation',
      uploadDate: '2024-01-15',
      uploadedBy: 'Nurse Mary',
      status: 'Review',
      views: 534,
      downloads: 23,
      rating: 4.2,
      thumbnail: '/api/thumbnails/prep-testing.jpg'
    },
    {
      id: 4,
      title: 'HIV Testing in Healthcare Settings',
      description: 'Professional guidelines for healthcare providers',
      duration: '15:28',
      fileSize: '78.9 MB',
      format: 'MP4',
      language: 'English',
      category: 'Professional',
      uploadDate: '2024-01-12',
      uploadedBy: 'Dr. Smith',
      status: 'Active',
      views: 345,
      downloads: 156,
      rating: 4.9,
      thumbnail: '/api/thumbnails/healthcare-testing.jpg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tutorial': return 'bg-blue-100 text-blue-800';
      case 'Education': return 'bg-purple-100 text-purple-800';
      case 'Preparation': return 'bg-green-100 text-green-800';
      case 'Professional': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">({rating})</span>
      </div>
    );
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HIV Test Videos</h1>
          <p className="text-gray-600">Manage educational and instructional videos for HIV testing</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Video
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Video className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Videos</p>
              <p className="text-2xl font-bold text-gray-900">78</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Play className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">12.5K</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Download className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">2,156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="tutorial">Tutorial</option>
            <option value="education">Education</option>
            <option value="preparation">Preparation</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Video Thumbnail */}
            <div className="relative h-48 bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(video.status)}`}>
                  {video.status}
                </span>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${getCategoryColor(video.category)}`}>
                  {video.category}
                </span>
                {renderStars(video.rating)}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Language: {video.language}</span>
                  <span>{video.fileSize}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By: {video.uploadedBy}</span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {formatViews(video.views)}
                  </div>
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {video.downloads}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center justify-center">
                  <Play className="w-4 h-4 mr-1" />
                  Play
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}