'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Stethoscope,
  CheckCircle,
  ArrowRight,
  Info,
  Brain,
  Shield,
  Award,
  Users,
  Activity
} from 'lucide-react'

export default function Services() {
  const router = useRouter()

  const userTypes = [
    {
      title: "Patients & Individuals",
      subtitle: "Your health, your control, your future",
      description: "Join Kenya's largest HIV prevention network with comprehensive support services",
      icon: <Heart className="h-10 w-10" />,
      features: [
        "2-minute digital registration process",
        "Choose from 50+ certified hospitals nationwide", 
        "Free condoms, lubricants & prevention materials",
        "Advanced PrEP/PEP management suite with AI tracking",
        "Confidential violence support & crisis intervention",
        "Mental wellness programs & peer counseling",
        "24/7 peer mentorship network access",
        "Comprehensive telehealth consultation services"
      ],
      stats: {
        users: "10,000+",
        satisfaction: "98.7%",
        response: "< 5min",
        facilities: "50+"
      },
      action: "Begin Your Protection Journey",
      path: "/patient-register",
      gradient: "from-sky-600 to-blue-600",
      color: "bg-gradient-to-br from-sky-50/95 via-blue-50/60 to-white border-sky-200/70",
      buttonStyle: "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
    },
    {
      title: "Healthcare Professionals",
      subtitle: "Empowering care excellence through innovation",
      description: "Advanced tools for modern healthcare delivery and patient management",
      icon: <Stethoscope className="h-10 w-10" />,
      features: [
        "Unified patient records with AI-powered insights",
        "Cross-facility collaboration & care coordination",
        "Real-time analytics suite & performance dashboard", 
        "Automated clinical workflows & decision support",
        "Ultra-HD consultation studio with recording",
        "Resource optimization & inventory management",
        "Performance insights & continuing education portal",
        "Advanced reporting & compliance monitoring"
      ],
      stats: {
        providers: "500+",
        facilities: "50+",
        efficiency: "+40%",
        uptime: "99.9%"
      },
      action: "Access Professional Portal",
      path: "/auth/login",
      gradient: "from-emerald-600 to-teal-600",
      color: "bg-gradient-to-br from-emerald-50/95 via-teal-50/60 to-white border-emerald-200/70", 
      buttonStyle: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
    }
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <section id="services" className="py-20 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/30"></div>
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-sky-300/6 to-blue-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-300/6 to-teal-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* Professional badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge className="bg-white/95 backdrop-blur-sm text-sky-800 px-6 py-2 border border-sky-200/60 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-xl">
              <Brain className="mr-2 h-4 w-4 text-sky-600" />
              AI-Powered Healthcare Solutions
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-emerald-800 px-6 py-2 border border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-xl">
              <Shield className="mr-2 h-4 w-4 text-emerald-600" />
              99% Prevention Success Rate
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-blue-800 px-6 py-2 border border-blue-200/60 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-xl">
              <Activity className="mr-2 h-4 w-4 text-blue-600" />
              Real-time Access & Support
            </Badge>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Choose Your
            <span className="block mt-2 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Healthcare Journey
            </span>
            <span className="block text-lg md:text-xl mt-4 text-gray-700 font-semibold">
              Two Powerful Platforms
            </span>
          </h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              One unified mission to <span className="font-semibold text-sky-600">transform healthcare</span> and 
              <span className="font-semibold text-emerald-600"> empower wellness</span> across Kenya
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center space-x-2 bg-sky-50 px-4 py-2 rounded-lg border border-sky-200/50">
                <Users className="h-4 w-4 text-sky-600" />
                <span className="text-sky-800 font-medium text-sm">15 Counties</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200/50">
                <Users className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-800 font-medium text-sm">10,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200/50">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800 font-medium text-sm">WHO Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Types Grid */}
        <div className="grid xl:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {userTypes.map((type, index) => (
            <div key={index} className="group relative">
              <Card className={`${type.color} border-2 hover:border-opacity-80 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.gradient}`}></div>
                <CardHeader className="pb-8 pt-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${type.gradient} rounded-2xl shadow-xl text-white transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                      {type.icon}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(type.stats).map(([key, value]) => (
                        <div key={key} className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                          <div className="font-bold text-gray-900 text-sm">{value}</div>
                          <div className="text-gray-600 capitalize font-medium text-xs">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {type.title}
                  </CardTitle>
                  <p className="text-base font-semibold text-gray-700 group-hover:text-gray-800 transition-colors mb-3">{type.subtitle}</p>
                  <CardDescription className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 group/item">
                        <div className={`p-1 bg-gradient-to-r ${type.gradient} rounded-full shadow-sm mt-1 group-hover/item:scale-110 transition-transform`}>
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors font-medium text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${type.buttonStyle} py-4 text-base font-semibold group/btn rounded-xl`}
                    onClick={() => handleNavigation(type.path)}
                  >
                    <span className="relative z-10">{type.action}</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Important Note */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl p-8 border-2 border-amber-200/60 shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="p-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl mr-3">
                <Info className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Important Note for Healthcare Staff</h3>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              Your account is created by system administrators for security and compliance. 
              <span className="font-semibold text-orange-700"> Doctors can register patients directly</span> from their clinical dashboard. 
              Contact your facility administrator for login credentials and system access.
            </p>
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
      `}</style>
    </section>
  )
}