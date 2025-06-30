'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Stethoscope,
  CheckCircle,
  ArrowRight,
  Info,
  Users,
  Activity,
  Award,
  Star,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'

export default function UserTypes() {
  const router = useRouter()

  const userTypes = [
    {
      title: "Patients & Individuals",
      subtitle: "Your health, your control, your future",
      description: "Join Kenya's largest HIV prevention network with comprehensive support",
      icon: <Heart className="h-12 w-12" />,
      features: [
        "Lightning-fast 2-minute registration process",
        "Access to 50+ certified hospitals nationwide", 
        "Complimentary prevention materials & wellness kits",
        "Advanced PrEP/PEP management with AI tracking",
        "Confidential violence support & crisis intervention",
        "Mental wellness programs & peer counseling",
        "24/7 peer mentorship network access",
        "Comprehensive telehealth consultation services"
      ],
      stats: {
        users: "15,000+",
        satisfaction: "99.2%",
        response: "< 3min"
      },
      action: "Begin Your Wellness Journey",
      path: "/patient-register",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      color: "bg-gradient-to-br from-blue-50/95 via-indigo-50/80 to-purple-50/60 border-blue-300/70",
      buttonStyle: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500",
      accentColor: "text-blue-600"
    },
    {
      title: "Healthcare Professionals",
      subtitle: "Empowering care excellence through innovation",
      description: "Advanced AI-driven tools for modern healthcare delivery and patient management",
      icon: <Stethoscope className="h-12 w-12" />,
      features: [
        "Unified patient records with AI-powered insights",
        "Seamless cross-facility collaboration & coordination",
        "Real-time analytics dashboard with predictive modeling", 
        "Intelligent automated workflows & decision support",
        "Ultra-HD consultation studio with cloud recording",
        "Smart resource optimization & inventory management",
        "Performance insights & gamified education portal",
        "Advanced reporting & automated compliance monitoring"
      ],
      stats: {
        providers: "750+",
        facilities: "55+",
        efficiency: "+45%"
      },
      action: "Access Professional Portal",
      path: "/auth/login",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      color: "bg-gradient-to-br from-emerald-50/95 via-teal-50/80 to-cyan-50/60 border-emerald-300/70", 
      buttonStyle: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500",
      accentColor: "text-emerald-600"
    }
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <section className="py-28 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Enhanced professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/50"></div>
      
      {/* Sophisticated animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-purple-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/6 to-pink-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-8000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-cyan-400/6 to-blue-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-12000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced header section */}
        <div className="text-center mb-24">
          {/* Professional badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Badge className="bg-white/95 backdrop-blur-sm text-blue-800 px-8 py-3 border-2 border-blue-200/70 shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold rounded-2xl hover:scale-105 group">
              <Users className="mr-3 h-5 w-5 text-blue-600 group-hover:animate-pulse" />
              15,000+ Active Users
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-emerald-800 px-8 py-3 border-2 border-emerald-200/70 shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold rounded-2xl hover:scale-105 group">
              <Shield className="mr-3 h-5 w-5 text-emerald-600 group-hover:animate-pulse" />
              WHO Certified Platform
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold rounded-2xl hover:scale-105 group animate-pulse">
              <Sparkles className="mr-3 h-5 w-5 text-white group-hover:rotate-12 transition-transform" />
              AI-Powered Healthcare
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-10 leading-tight">
            Choose Your
            <span className="block mt-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Healthcare Journey
            </span>
            <span className="block text-xl md:text-2xl mt-6 text-gray-700 font-semibold">
              Two Powerful Platforms, One Unified Mission
            </span>
          </h2>
          
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-2 border-gray-200/60 max-w-5xl mx-auto hover:shadow-3xl transition-all duration-500">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Transforming healthcare with <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">cutting-edge technology</span> and 
              <span className="font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full"> empowering wellness</span> across Kenya
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-xl border-2 border-blue-200/60 shadow-lg hover:scale-105 transition-transform">
                <Activity className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-bold text-base">15 Counties</span>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-3 rounded-xl border-2 border-emerald-200/60 shadow-lg hover:scale-105 transition-transform">
                <Users className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-800 font-bold text-base">55+ Facilities</span>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 rounded-xl border-2 border-purple-200/60 shadow-lg hover:scale-105 transition-transform">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-purple-800 font-bold text-base">99.2% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced user types grid */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {userTypes.map((type, index) => (
            <div key={index} className="group relative">
              <Card className={`${type.color} border-3 hover:border-opacity-90 transition-all duration-700 shadow-2xl hover:shadow-3xl transform hover:-translate-y-4 hover:scale-105 overflow-hidden relative`}>
                {/* Glowing top border */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${type.gradient} opacity-90`}></div>
                
                <CardHeader className="pb-10 pt-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`p-5 bg-gradient-to-br ${type.gradient} rounded-3xl shadow-2xl text-white transform group-hover:rotate-12 group-hover:scale-125 transition-all duration-500 relative`}>
                      <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        {type.icon}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      {Object.entries(type.stats).map(([key, value]) => (
                        <div key={key} className="text-center bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-xl border-2 border-gray-200/60 group-hover:bg-white group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 hover:rotate-3">
                          <div className={`font-bold text-gray-900 text-base ${type.accentColor}`}>{value}</div>
                          <div className="text-gray-600 capitalize font-semibold text-xs">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {type.title}
                  </CardTitle>
                  <p className="text-lg font-semibold text-gray-700 group-hover:text-gray-800 transition-colors mb-4">{type.subtitle}</p>
                  <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                    {type.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0 pb-10">
                  <ul className="space-y-4 mb-10">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-4 group/item">
                        <div className={`p-1.5 bg-gradient-to-r ${type.gradient} rounded-full shadow-lg mt-1 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300`}>
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors font-medium text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${type.buttonStyle} py-6 text-lg font-bold group/btn rounded-2xl relative overflow-hidden`}
                    onClick={() => handleNavigation(type.path)}
                  >
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      <Star className="mr-3 h-5 w-5 group-hover/btn:animate-spin" />
                      {type.action}
                      <ArrowRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Enhanced important note */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-red-50/95 backdrop-blur-lg rounded-3xl p-10 border-3 border-amber-300/70 shadow-2xl max-w-5xl mx-auto hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600"></div>
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl mr-4 shadow-xl">
                <Info className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Important Note for Healthcare Staff</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Your account is created by system administrators for <span className="font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">security and compliance</span>. 
              <span className="font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full"> Doctors can register patients directly</span> from their clinical dashboard. 
              Contact your facility administrator for login credentials and system access.
            </p>
            <div className="flex justify-center mt-6">
              <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 text-base font-semibold rounded-xl shadow-lg">
                <Zap className="mr-2 h-4 w-4" />
                Admin-Managed Access
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1) rotate(0deg); 
            opacity: 0.7;
          }
          25% { 
            transform: translate(30px, -30px) scale(1.05) rotate(90deg); 
            opacity: 0.9;
          }
          50% { 
            transform: translate(-20px, 20px) scale(0.95) rotate(180deg); 
            opacity: 0.8;
          }
          75% { 
            transform: translate(25px, 15px) scale(1.02) rotate(270deg); 
            opacity: 0.85;
          }
        }
        
        .animate-float {
          animation: float 30s ease-in-out infinite;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-8000 {
          animation-delay: 8s;
        }
        
        .animation-delay-12000 {
          animation-delay: 12s;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}