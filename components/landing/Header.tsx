'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Shield, LogIn, UserPlus, Phone, Mail } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },

  ]

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const smoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMenuOpen(false)
      }
    }
  }

  return (
    <>
      {/* Professional Emergency Contact Bar */}
      <div className="bg-teal-800 text-white py-3 px-4">

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">Emergency: 1195</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@prepguard.co.ke</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
              24/7 Support Available
            </div>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-blue-50 shadow-lg border-b border-blue-200' 
          : 'bg-blue-100 shadow-md border-b border-blue-300'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Professional Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => smoothScroll('#home')}>
              <div className="relative">
                <div className=" rounded-lg transition-all h-12 w-12">
                  <img src="https://raw.githubusercontent.com/Remisteve/prep-software/main/public/chak.png" alt="Chak" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                  StawishaCare
                </h1>
                <p className="text-xs text-gray-600 font-semibold">HIV Prevention Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => smoothScroll(item.href)}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold text-sm transition-all duration-300 rounded-lg hover:bg-blue-50"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Professional Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => openAuthModal('login')}
                className="font-semibold text-sm px-5 py-2 text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-400 rounded-lg transition-all duration-300"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button
                onClick={() => openAuthModal('register')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden p-2 rounded-lg hover:bg-blue-200 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-blue-200 bg-blue-50 rounded-b-xl shadow-xl">
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => smoothScroll(item.href)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 rounded-lg hover:bg-blue-100 mx-2"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
              <div className="px-4 pb-4 space-y-3 border-t border-blue-200 pt-4">
                <Button
                  variant="outline"
                  className="w-full justify-center font-semibold py-3 text-blue-600 border-blue-300 hover:bg-blue-100 rounded-lg"
                  onClick={() => {
                    openAuthModal('login')
                    setIsMenuOpen(false)
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    openAuthModal('register')
                    setIsMenuOpen(false)
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Get Started Free
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal Placeholder */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-blue-50 rounded-xl p-8 max-w-md w-full shadow-2xl border border-blue-200">
            <div className="text-center">
              <div className="bg-blue-200 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p className="text-gray-600 mb-6">
                {authMode === 'login' 
                  ? 'Sign in to access your account' 
                  : 'Create your account to get started'}
              </p>
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                  onClick={() => setAuthModalOpen(false)}
                >
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-3 rounded-lg font-semibold border-blue-300 hover:bg-blue-100"
                  onClick={() => setAuthModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {authMode === 'login' ? (
                  <>Don't have an account? <button className="text-blue-600 font-semibold" onClick={() => setAuthMode('register')}>Sign up</button></>
                ) : (
                  <>Already have an account? <button className="text-blue-600 font-semibold" onClick={() => setAuthMode('login')}>Sign in</button></>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}