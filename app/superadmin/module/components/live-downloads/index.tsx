// /app/superadmin/module/components/LiveDownloads.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Download, Activity, FileText, Image, Video, Music, Archive, RefreshCw } from 'lucide-react';

export default function LiveDownloads() {
  const [isLive, setIsLive] = useState(true);
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      fileName: 'Patient_Report_Jan2024.pdf',
      fileType: 'PDF',
      size: '2.4 MB',
      user: 'Dr. Johnson',
      progress: 100,
      status: 'Completed',
      timestamp: new Date(Date.now() - 5000),
      downloadUrl: '/api/reports/patient-jan2024.pdf'
    },
    {
      id: 2,
      fileName: 'HIV_Prevention_Video.mp4',
      fileType: 'Video',
      size: '45.2 MB',
      user: 'Admin User',
      progress: 78,
      status: 'Downloading',
      timestamp: new Date(Date.now() - 30000),
      downloadUrl: '/api/media/hiv-prevention.mp4'
    },
    {
      id: 3,
      fileName: 'prep_guidelines_2024.zip',
      fileType: 'Archive',
      size: '8.7 MB',
      user: 'Nurse Mary',
      progress: 100,
      status: 'Completed',
      timestamp: new Date(Date.now() - 120000),
      downloadUrl: '/api/files/prep-guidelines.zip'
    },
    {
      id: 4,
      fileName: 'facility_data_export.xlsx',
      fileType: 'Excel',
      size: '1.8 MB',
      user: 'Manager Smith',
      progress: 45,
      status: 'Downloading',
      timestamp: new Date(Date.now() - 180000),
      downloadUrl: '/api/exports/facility-data.xlsx'
    }
  ]);

  const [stats, setStats] = useState({
    totalDownloads: 1247,
    activeDownloads: 2,
    completedToday: 156,
    totalBandwidth: '2.4 GB'
  });

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setDownloads(prev => prev.map(download => {
        if (download.status === 'Downloading' && download.progress < 100) {
          const newProgress = Math.min(download.progress + Math.random() * 10, 100);
          return {
            ...download,
            progress: newProgress,
            status: newProgress >= 100 ? 'Completed' : 'Downloading'
          };
        }
        return download;
      }));

      // Occasionally add new downloads
      if (Math.random() < 0.3) {
        const newDownload = {
          id: Date.now(),
          fileName: `report_${Date.now()}.pdf`,
          fileType: 'PDF',
          size: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
          user: ['Dr. Johnson', 'Admin User', 'Nurse Mary'][Math.floor(Math.random() * 3)],
          progress: Math.random() * 30,
          status: 'Downloading',
          timestamp: new Date(),
          downloadUrl: '#'
        };
        
        setDownloads(prev => [newDownload, ...prev.slice(0, 9)]);
        setStats(prev => ({
          ...prev,
          activeDownloads: prev.activeDownloads + 1
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'video':
      case 'mp4': return <Video className="w-5 h-5 text-purple-500" />;
      case 'audio':
      case 'mp3': return <Music className="w-5 h-5 text-green-500" />;
      case 'archive':
      case 'zip': return <Archive className="w-5 h-5 text-yellow-500" />;
      case 'image':
      case 'jpg':
      case 'png': return <Image className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Downloading': return 'text-blue-600 bg-blue-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      case 'Paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Download className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Downloads</h1>
              <p className="text-gray-600">Real-time download monitoring and management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isLive 
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Activity className="w-4 h-4 mr-2" />
            {isLive ? 'LIVE' : 'Paused'}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Download className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDownloads}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Archive className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bandwidth</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBandwidth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Downloads</h3>
          {isLive && (
            <div className="flex items-center text-sm text-orange-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2"></div>
              Live Updates Active
            </div>
          )}
        </div>
        
        <div className="divide-y divide-gray-200">
          {downloads.map((download) => (
            <div key={download.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(download.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {download.fileName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {download.size} • {download.user} • {formatTimeAgo(download.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(download.status)}`}>
                      {download.status}
                    </span>
                    {download.status === 'Downloading' && (
                      <p className="text-xs text-gray-500 mt-1">{download.progress.toFixed(0)}%</p>
                    )}
                  </div>
                  
                  {download.status === 'Completed' && (
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {download.status === 'Downloading' && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${download.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}