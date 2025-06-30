import React from 'react';
import { Shield, Heart, Building2, ExternalLink, Activity } from 'lucide-react';

export default function SuperadminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-navy-800 mt-8" style={{backgroundColor: '#1e2a4a'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer - Thin */}
        <div className="py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            {/* Left Side - Brand & Rights */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-white">PrepGuard</span>
              </div>
              <span className="text-sm text-gray-300">
                © {currentYear} All rights reserved
              </span>
            </div>

            {/* Center - Powered By & Partnership */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center text-gray-300">
                <span>Powered by</span>
                <a 
                  href="https://alvanialabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center group"
                >
                  Alvania Labs, Inc.
                  <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center text-gray-300">
                <Building2 className="w-4 h-4 text-blue-400 mr-1" />
                <span>Partnered with</span>
                <span className="ml-1 font-semibold text-blue-400">CHAK</span>
              </div>
            </div>

            {/* Right Side - System Status */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Activity className="w-4 h-4 mr-1 text-green-400" />
                <span className="font-semibold">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}