'use client';

import React, { useState } from 'react';
import { TrendingUp, Download, Users, Heart, Activity, FileText } from 'lucide-react';

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ElementType;
  color: string;
}

interface MonthlyData {
  month: string;
  patients: number;
  tests: number;
  enrollments: number;
}

interface ReportType {
  id: string;
  name: string;
  description: string;
  lastGenerated: string;
  format: string;
}

interface KeyMetric {
  label: string;
  value: string;
  trend: string;
}

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const analyticsData: AnalyticsMetric[] = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'PrEP Enrollments',
      value: '487',
      change: '+8%',
      changeType: 'increase',
      icon: Heart,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Tests',
      value: '2,156',
      change: '+15%',
      changeType: 'increase',
      icon: Activity,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Treatments',
      value: '298',
      change: '-3%',
      changeType: 'decrease',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  const monthlyData: MonthlyData[] = [
    { month: 'Jan', patients: 120, tests: 180, enrollments: 45 },
    { month: 'Feb', patients: 150, tests: 220, enrollments: 52 },
    { month: 'Mar', patients: 180, tests: 280, enrollments: 67 },
    { month: 'Apr', patients: 210, tests: 320, enrollments: 78 },
    { month: 'May', patients: 190, tests: 290, enrollments: 71 },
    { month: 'Jun', patients: 220, tests: 350, enrollments: 82 },
  ];

  const reportTypes: ReportType[] = [
    {
      id: 'patient-summary',
      name: 'Patient Summary Report',
      description: 'Comprehensive overview of all patients',
      lastGenerated: '2024-01-25',
      format: 'PDF, Excel'
    },
    {
      id: 'prep-analytics',
      name: 'PrEP Analytics Report',
      description: 'PrEP enrollment and adherence statistics',
      lastGenerated: '2024-01-24',
      format: 'PDF, Excel'
    },
    {
      id: 'facility-performance',
      name: 'Facility Performance Report',
      description: 'Performance metrics across all facilities',
      lastGenerated: '2024-01-23',
      format: 'PDF, Excel'
    },
    {
      id: 'monthly-statistics',
      name: 'Monthly Statistics Report',
      description: 'Monthly healthcare service statistics',
      lastGenerated: '2024-01-22',
      format: 'PDF, Excel'
    }
  ];

  const keyMetrics: KeyMetric[] = [
    { label: 'Total Appointments', value: '3,456', trend: '+12%' },
    { label: 'Successful Treatments', value: '2,890', trend: '+8%' },
    { label: 'Prevention Programs', value: '156', trend: '+25%' },
    { label: 'Community Outreach', value: '89', trend: '+18%' },
  ];

  const handleExportData = () => {
    console.log('Exporting data for period:', selectedPeriod);
    // In a real app, this would trigger data export functionality
  };

  const handleGenerateReport = (report: ReportType) => {
    console.log('Generating report:', report.name);
    // In a real app, this would trigger report generation
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive healthcare data insights and reporting</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select time period for reports"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button 
            type="button"
            onClick={handleExportData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            aria-label="Export analytics data"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((metric) => (
          <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`} aria-hidden="true" />
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="h-64 flex items-end justify-between space-x-2" role="img" aria-label="Monthly trends chart showing patients and enrollments">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '180px' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t" 
                    style={{ height: `${(data.patients / 250) * 100}%` }}
                    aria-label={`${data.month}: ${data.patients} patients`}
                  ></div>
                  <div 
                    className="absolute bottom-0 w-full bg-green-500 rounded-t opacity-70" 
                    style={{ height: `${(data.enrollments / 250) * 100}%` }}
                    aria-label={`${data.month}: ${data.enrollments} enrollments`}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2" aria-hidden="true"></div>
              <span className="text-sm text-gray-600">Patients</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2" aria-hidden="true"></div>
              <span className="text-sm text-gray-600">Enrollments</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Metrics</h3>
          <div className="space-y-4">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-green-600">{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-blue-500 mr-3" aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{report.name}</h4>
                    <p className="text-xs text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Last: {report.lastGenerated}</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => handleGenerateReport(report)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                  aria-label={`Generate ${report.name}`}
                >
                  Generate
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Available formats: {report.format}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}