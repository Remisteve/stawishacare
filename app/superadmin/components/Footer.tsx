import React from 'react';
import { Shield } from 'lucide-react';

export default function SuperadminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">StawishaCare</span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {currentYear} StawishaCare. All rights reserved.
          </div>

          {/* Powered by */}
          <div className="text-sm text-gray-400">
            Powered by{' '}
            <a 
              href="https://alvanialabs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Alvania Labs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}