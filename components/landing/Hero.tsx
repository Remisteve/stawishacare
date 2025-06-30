'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Heart, 
  Users, 
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle,
  Calendar,
  Syringe,
  Award,
  Globe,
} from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [secretSequence, setSecretSequence] = useState('')
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [])

  // Secret key sequence detection for superadmin access - DIRECT REDIRECT
  useEffect(() => {
    const secretKeys = ['remi', 'chak', 'jb', 'robert', 'superadmin']
    
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = secretSequence + event.key.toLowerCase()
      
      console.log('🔑 Typed:', event.key, 'Sequence:', newSequence) // Debug
      
      // Check if any secret key matches
      const matchingKey = secretKeys.find(key => key.startsWith(newSequence))
      
      if (matchingKey) {
        setSecretSequence(newSequence)
        
        // If we have a complete match, redirect directly to superadmin login
        if (secretKeys.includes(newSequence)) {
          console.log('🎯 Secret key matched! Redirecting to superadmin login...')
          setSecretSequence('')
          window.location.href = '/auth/superadmin/login'
          return
        }
      } else {
        setSecretSequence('')
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [secretSequence, router])

  const heroSlides = [
    {
      title: "Revolutionary HIV Prevention",
      subtitle: "Advanced PrEP & Injectable Solutions",
      description: "Leading Kenya's transformation in HIV prevention through innovative oral PrEP and breakthrough long-acting injectable technology",
      highlight: "99% Effective Protection"
    },
    {
      title: "Comprehensive Care Network",
      subtitle: "50+ Partner Facilities Nationwide", 
      description: "Connecting communities with quality healthcare through our extensive network of trusted medical partners across 15 counties",
      highlight: "15 Counties Covered"
    },
    {
      title: "Empowering Communities",
      subtitle: "10,000+ Lives Protected",
      description: "Building healthier futures through education, prevention, and comprehensive support services for all Kenyans",
      highlight: "24/7 Support Available"
    }
  ]

  const stats = [
    { number: "99%", label: "Prevention Rate", icon: <Shield className="h-5 w-5" />, color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-300" },
    { number: "10K+", label: "Lives Protected", icon: <Heart className="h-5 w-5" />, color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-300" },
    { number: "50+", label: "Partner Facilities", icon: <Users className="h-5 w-5" />, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-300" },
    { number: "24/7", label: "Support Access", icon: <Calendar className="h-5 w-5" />, color: "text-orange-600", bg: "bg-orange-100", border: "border-orange-300" }
  ]

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-100">
      {/* Light blue slate background with subtle patterns */}
      <div className="absolute inset-0 bg-slate-100"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-50 to-slate-100"></div>
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-300/40 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-float animation-delay-4000"></div>
      </div>

      {/* Secret Access Hint */}
      <div className="fixed bottom-4 right-4 bg-amber-500/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-amber-300 z-10">
        <p className="text-xs text-amber-700 font-medium">
          🔑 Type secret key for superadmin access
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Professional badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-blue-500 text-white px-6 py-2 border border-blue-400 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold">
              <Globe className="mr-2 h-4 w-4" />
              UN Partnership Initiative
            </Badge>
            <Badge className="bg-emerald-500 text-white px-6 py-2 border border-emerald-400 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold">
              <Award className="mr-2 h-4 w-4" />
              WHO Approved Methods
            </Badge>
            <Badge className="bg-purple-500 text-white px-6 py-2 border border-purple-400 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold">
              <Syringe className="mr-2 h-4 w-4" />
              Injectable PrEP Available
            </Badge>
          </div>

          {/* Main heading */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
              <span className="block">{currentSlideData.title.split(' ')[0]}</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
                {currentSlideData.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 max-w-4xl mx-auto">
                {currentSlideData.subtitle}
              </h2>
              
              <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                {currentSlideData.description}
              </p>
              
              {/* Highlight badge */}
              <div className="inline-flex items-center px-6 py-3 bg-blue-100 backdrop-blur-sm rounded-full border border-blue-300 shadow-lg">
                <Sparkles className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-base font-bold text-blue-800">{currentSlideData.highlight}</span>
              </div>
            </div>
          </div>

          {/* Mission statement */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-300 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-blue-600">Power</span>
              <span className="text-slate-600 mx-2">•</span>
              <span className="text-emerald-600">Protects</span>
              <span className="text-slate-600 mx-2">•</span>
              <span className="text-purple-600">Prepare</span>
            </h3>
            <p className="text-base text-slate-700 leading-relaxed">
              Empowering communities with cutting-edge HIV prevention technology. 
              <span className="font-semibold text-emerald-700"> Protecting lives through evidence-based medicine.</span>
              <span className="font-semibold text-blue-700"> Preparing for a future without HIV.</span>
            </p>
          </div>

          {/* CTA buttons - FIXED */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button 
              onClick={() => {
                // Show coming soon message instead of broken redirect
                alert('Patient portal coming soon! Type "remi" for admin access.')
              }}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Begin Your Protection Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                alert('Impact story video coming soon!')
              }}
              className="group px-8 py-4 text-base font-semibold rounded-xl border-2 border-slate-400 bg-white/90 backdrop-blur-sm hover:bg-slate-100 text-slate-700 hover:text-slate-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Our Impact Story
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-center space-x-3 text-slate-600">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-base font-medium">Trusted by healthcare providers across 15 counties in Kenya</span>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`group ${stat.bg} ${stat.border} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
                >
                  <div className={`flex justify-center mb-3 ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner section */}
          <div className="mt-16 pt-16 border-t border-slate-300">
            <p className="text-slate-500 mb-8 text-base font-medium">In Partnership With Leading Health Organizations</p>
            <div className="flex items-center justify-center space-x-8 opacity-80">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">CHAP</span>
                </div>
                <div className="text-lg font-bold text-slate-600">CHAP STAWISHA</div>
              </div>
              <div className="w-px h-8 bg-slate-400"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">MOH</span>
                </div>
                <div className="text-lg font-bold text-slate-600">MINISTRY OF HEALTH</div>
              </div>
              <div className="w-px h-8 bg-slate-400"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">CDC</span>
                </div>
                <div className="text-lg font-bold text-slate-600">CDC KENYA</div>
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center space-x-2 mt-12">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-slate-400 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(20px, -20px) scale(1.02) rotate(60deg); }
          66% { transform: translate(-15px, 15px) scale(0.98) rotate(120deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}