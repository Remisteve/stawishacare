'use client';

import React, { useState } from 'react';
import type { JSX } from 'react';
import { 
  Users, Heart, Shield, Package, Building2, 
  Activity, AlertTriangle, Stethoscope,
  LucideIcon
} from 'lucide-react';

interface MetricType {
  title: string;
  value: string;
  change: string;
  trend: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
}

interface FilterButton {
  id: string;
  label: string;
  icon: LucideIcon;
}

const cardGradients = {
  green: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
  orange: 'bg-gradient-to-br from-amber-500 to-orange-600', 
  blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
  red: 'bg-gradient-to-br from-red-500 to-red-700'
};

const keyMetrics: MetricType[] = [
  {
    title: 'Total Patients',
    value: '1,950',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    gradient: cardGradients.green,
    description: 'Active patients in system'
  },
  {
    title: 'PrEP Users',
    value: '1,300', 
    change: '+8.3%',
    trend: 'up',
    icon: Shield,
    gradient: cardGradients.orange,
    description: 'Currently on PrEP'
  },
  {
    title: 'Healthcare Providers',
    value: '48',
    change: '+4.3%',
    trend: 'up',
    icon: Stethoscope,
    gradient: cardGradients.blue,
    description: 'Active doctors & nurses'
  },
  {
    title: 'Facilities',
    value: '25',
    change: '+8.7%',
    trend: 'up',
    icon: Building2,
    gradient: cardGradients.red,
    description: 'Healthcare facilities'
  }
];

export default function Dashboard(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState<string>('overview');

  const filterButtons: FilterButton[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'prep', label: 'PrEP', icon: Shield },
    { id: 'pep', label: 'PEP', icon: Heart },
    { id: 'condoms', label: 'Condoms', icon: Package },
    { id: 'gbv', label: 'GBV Support', icon: AlertTriangle },
    { id: 'facilities', label: 'Facilities', icon: Building2 }
  ];

  const renderDetailedView = (): JSX.Element => {
    if (selectedFilter === 'overview') {
      return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">System Overview</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Distribution</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Growth</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>
        </div>
      );
    }

    const titles: Record<string, string> = {
      patients: 'Patient Management Analytics',
      prep: 'PrEP Program Analytics',
      pep: 'PEP Treatment Analytics',
      condoms: 'Condom Distribution Analytics',
      gbv: 'GBV Support Services Analytics',
      facilities: 'Healthcare Facilities Analytics'
    };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-1">{titles[selectedFilter] || 'Analytics'}</h2>
          <p className="text-sm text-slate-600">Comprehensive analytics and insights</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Monthly Trends</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Distribution</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Analytics</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Data will be added here
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Trends</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-3">Comparison</h3>
            <div className="h-48 flex items-center justify-center text-slate-400">
              Charts will be added here
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3">
      {/* 4 GRADIENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {keyMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className={`${metric.gradient} p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-white`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-white/20 backdrop-blur">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
              <p className="font-medium text-sm mb-1 opacity-95">{metric.title}</p>
              <p className="text-xs opacity-75">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 justify-center py-3 px-4 bg-white rounded-lg mb-4 border border-slate-200 shadow-sm">
        {filterButtons.map((filter) => {
          const IconComponent = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-200 text-sm border ${
                selectedFilter === filter.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* DETAILED CONTENT */}
      {renderDetailedView()}
    </div>
  );
}