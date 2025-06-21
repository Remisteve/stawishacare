// components/LoadingScreen.tsx
import React from 'react'
import { Shield } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-blue-200 rounded-2xl animate-ping mx-auto"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PrEP Guard
          </h2>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-loading-bar"></div>
        </div>
        
        {/* Loading Steps */}
        <div className="text-sm text-gray-500 space-y-1">
          <div className="animate-fade-in">Authenticating user...</div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        @keyframes fade-in {
          0%, 50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
