'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart,
  Sparkles,
  ArrowRight,
  Info,
  Lock,
  Shield,
  Award,
  TrendingUp,
  Zap,
  Globe,
  Users,
  Activity
} from 'lucide-react'

export default function EnhancedCTA() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const impactStats = [
    { icon: <Shield className="h-6 w-6" />, number: "10,000+", label: "Lives Protected", bg: "bg-emerald-100", border: "border-emerald-300", color: "text-emerald-700", iconBg: "bg-emerald-600" },
    { icon: <Users className="h-6 w-6" />, number: "50+", label: "Partner Facilities", bg: "bg-blue-100", border: "border-blue-300", color: "text-blue-700", iconBg: "bg-blue-600" },
    { icon: <Globe className="h-6 w-6" />, number: "15", label: "Counties Served", bg: "bg-purple-100", border: "border-purple-300", color: "text-purple-700", iconBg: "bg-purple-600" },
    { icon: <Activity className="h-6 w-6" />, number: "99%", label: "Success Rate", bg: "bg-pink-100", border: "border-pink-300", color: "text-pink-700", iconBg: "bg-pink-600" }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600">
      {/* Simple background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/8 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Professional badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge className="bg-white/30 backdrop-blur-sm text-white px-6 py-2 border border-white/50 shadow-lg text-sm font-semibold hover:bg-white/40 hover:scale-105 transition-all duration-300">
            <Sparkles className="mr-2 h-4 w-4" />
            Revolutionary Healthcare Platform
          </Badge>
          <Badge className="bg-white/30 backdrop-blur-sm text-white px-6 py-2 border border-white/50 shadow-lg text-sm font-semibold hover:bg-white/40 hover:scale-105 transition-all duration-300">
            <TrendingUp className="mr-2 h-4 w-4" />
            99% Prevention Success Rate
          </Badge>
          <Badge className="bg-white/30 backdrop-blur-sm text-white px-6 py-2 border border-white/50 shadow-lg text-sm font-semibold hover:bg-white/40 hover:scale-105 transition-all duration-300">
            <Zap className="mr-2 h-4 w-4" />
            Instant Results & Support
          </Badge>
        </div>
        
        {/* Hero icon */}
        <div className="relative inline-block mb-12">
          <div className="p-6 bg-white/30 backdrop-blur-sm rounded-full border border-white/50 shadow-xl hover:bg-white/40 hover:scale-105 transition-all duration-300">
            <Heart className="h-16 w-16 text-white" />
          </div>
        </div>
        
        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
          Your Health Journey
          <span className="block text-xl md:text-2xl lg:text-3xl mt-4 text-white/90 font-semibold">
            Starts With One Decision
          </span>
        </h2>
        
        {/* Mission statement */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-8 border border-white/50 shadow-xl clip-corner hover:bg-white/35 hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/70"></div>
            <p className="text-2xl md:text-3xl mb-6 text-white leading-relaxed max-w-4xl mx-auto font-bold">
              <span className="text-white">Power</span> • 
              <span className="text-white/90"> Protects</span> • 
              <span className="text-white/80"> Prepare</span>
            </p>
            <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
              Join <span className="font-bold text-white">thousands taking control</span> of their health with comprehensive HIV prevention, 
              innovative care solutions, and a <span className="font-bold text-white">supportive community</span>
            </p>
          </div>
        </div>
        
        {/* Impact statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {impactStats.map((stat, index) => (
            <div key={index} className="group">
              <div className={`${stat.bg} ${stat.border} border-2 rounded-lg p-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 clip-corner`}>
                <div className={`p-2 ${stat.iconBg} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center w-fit mx-auto`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className={`text-xs font-semibold ${stat.color} uppercase tracking-wide`}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 font-bold group rounded-lg min-w-[280px] clip-corner" 
            onClick={() => handleNavigation('/patient-register')}
          >
            <Sparkles className="mr-3 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Start Free Registration</span>
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold group rounded-lg min-w-[280px] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 clip-corner" 
            onClick={() => handleNavigation('/about')}
          >
            <Info className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            <span>Learn About Our Impact</span>
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/95">
          <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/40 shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-semibold">256-bit Encrypted</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/40 shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-semibold">HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/25 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/40 shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300">
            <Award className="h-5 w-5" />
            <span className="text-sm font-semibold">ISO Certified</span>
          </div>
        </div>
      </div>

      <style>{`
        .clip-corner {
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        
        @media (max-width: 768px) {
          .clip-corner {
            clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
          }
        }
      `}</style>
    </section>
  )
}