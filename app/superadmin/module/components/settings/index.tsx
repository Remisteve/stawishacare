'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Database, Save } from 'lucide-react';

interface GeneralSettings {
  siteName: string;
  siteUrl: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  appointmentReminders: boolean;
  systemAlerts: boolean;
  reportGeneration: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: boolean;
}

interface DatabaseSettings {
  autoBackup: boolean;
  backupFrequency: string;
  retentionPeriod: number;
  compressionEnabled: boolean;
}

interface AllSettings {
  general: GeneralSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  database: DatabaseSettings;
}

interface Tab {
  id: string;
  name: string;
  icon: React.ElementType;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<AllSettings>({
    general: {
      siteName: 'Healthcare Management System',
      siteUrl: 'https://healthcare.example.com',
      timezone: 'Africa/Nairobi',
      language: 'English',
      maintenanceMode: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      appointmentReminders: true,
      systemAlerts: true,
      reportGeneration: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      ipWhitelist: false
    },
    database: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 90,
      compressionEnabled: true
    }
  });

  const tabs: Tab[] = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'database', name: 'Database', icon: Database },
  ];

  const handleSettingChange = (category: keyof AllSettings, setting: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const getNotificationDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      emailNotifications: 'Send email notifications for important events',
      smsNotifications: 'Send SMS alerts for critical updates',
      pushNotifications: 'Browser push notifications',
      appointmentReminders: 'Automated appointment reminders',
      systemAlerts: 'System maintenance and error alerts',
      reportGeneration: 'Notifications when reports are ready'
    };
    return descriptions[key] || '';
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          id="siteName"
          type="text"
          value={settings.general.siteName}
          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="siteName-help"
        />
        <p id="siteName-help" className="text-xs text-gray-500 mt-1">
          The name displayed throughout the application
        </p>
      </div>
      
      <div>
        <label htmlFor="siteUrl" className="block text-sm font-medium text-gray-700 mb-2">
          Site URL
        </label>
        <input
          id="siteUrl"
          type="url"
          value={settings.general.siteUrl}
          onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="siteUrl-help"
        />
        <p id="siteUrl-help" className="text-xs text-gray-500 mt-1">
          The primary URL for your healthcare system
        </p>
      </div>
      
      <div>
        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
          Timezone
        </label>
        <select
          id="timezone"
          value={settings.general.timezone}
          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="timezone-help"
        >
          <option value="Africa/Nairobi">Africa/Nairobi</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
        </select>
        <p id="timezone-help" className="text-xs text-gray-500 mt-1">
          Default timezone for appointments and reports
        </p>
      </div>
      
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
          Language
        </label>
        <select
          id="language"
          value={settings.general.language}
          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="language-help"
        >
          <option value="English">English</option>
          <option value="Swahili">Swahili</option>
          <option value="French">French</option>
        </select>
        <p id="language-help" className="text-xs text-gray-500 mt-1">
          Default interface language
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
          <p className="text-sm text-gray-500">Enable to temporarily disable site access</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.general.maintenanceMode}
            onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
            className="sr-only peer"
            aria-describedby="maintenance-help"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="sr-only">Toggle maintenance mode</span>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
          <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
            className="sr-only peer"
            aria-label="Toggle two-factor authentication"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div>
        <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          id="sessionTimeout"
          type="number"
          min="5"
          max="480"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value) || 30)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="sessionTimeout-help"
        />
        <p id="sessionTimeout-help" className="text-xs text-gray-500 mt-1">
          How long users stay logged in without activity (5-480 minutes)
        </p>
      </div>
      
      <div>
        <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700 mb-2">
          Password Expiry (days)
        </label>
        <input
          id="passwordExpiry"
          type="number"
          min="30"
          max="365"
          value={settings.security.passwordExpiry}
          onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value) || 90)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="passwordExpiry-help"
        />
        <p id="passwordExpiry-help" className="text-xs text-gray-500 mt-1">
          Force password changes after this many days (30-365 days)
        </p>
      </div>
      
      <div>
        <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700 mb-2">
          Max Login Attempts
        </label>
        <input
          id="loginAttempts"
          type="number"
          min="3"
          max="10"
          value={settings.security.loginAttempts}
          onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value) || 5)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="loginAttempts-help"
        />
        <p id="loginAttempts-help" className="text-xs text-gray-500 mt-1">
          Lock account after this many failed attempts (3-10 attempts)
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">IP Whitelist</p>
          <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.ipWhitelist}
            onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.checked)}
            className="sr-only peer"
            aria-label="Toggle IP whitelist restriction"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-sm text-gray-500">
              {getNotificationDescription(key)}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
              className="sr-only peer"
              aria-label={`Toggle ${key.replace(/([A-Z])/g, ' $1').trim()}`}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Auto Backup</p>
          <p className="text-sm text-gray-500">Automatically backup database</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.database.autoBackup}
            onChange={(e) => handleSettingChange('database', 'autoBackup', e.target.checked)}
            className="sr-only peer"
            aria-label="Toggle automatic database backup"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      
      <div>
        <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-2">
          Backup Frequency
        </label>
        <select
          id="backupFrequency"
          value={settings.database.backupFrequency}
          onChange={(e) => handleSettingChange('database', 'backupFrequency', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="backupFrequency-help"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <p id="backupFrequency-help" className="text-xs text-gray-500 mt-1">
          How often automated backups should run
        </p>
      </div>
      
      <div>
        <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700 mb-2">
          Retention Period (days)
        </label>
        <input
          id="retentionPeriod"
          type="number"
          min="7"
          max="3650"
          value={settings.database.retentionPeriod}
          onChange={(e) => handleSettingChange('database', 'retentionPeriod', parseInt(e.target.value) || 90)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-describedby="retentionPeriod-help"
        />
        <p id="retentionPeriod-help" className="text-xs text-gray-500 mt-1">
          How long to keep backup files (7-3650 days)
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Compression</p>
          <p className="text-sm text-gray-500">Compress backup files to save space</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.database.compressionEnabled}
            onChange={(e) => handleSettingChange('database', 'compressionEnabled', e.target.checked)}
            className="sr-only peer"
            aria-label="Toggle backup compression"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'notifications': return renderNotificationSettings();
      case 'database': return renderDatabaseSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system preferences and options</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          aria-label="Save all settings changes"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1" role="tablist" aria-label="Settings categories">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
              >
                <tab.icon className="w-5 h-5 mr-3" aria-hidden="true" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div 
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={`${activeTab}-tab`}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 capitalize">
              {activeTab} Settings
            </h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}