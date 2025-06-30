'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Heart, 
  Users, 
  Building2, 
  Award, 
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Activity,
  Brain,
  Stethoscope
} from 'lucide-react'

export default function About() {


  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "HIV Prevention Excellence",
      description: "Comprehensive PrEP and PEP services with 99% efficacy rate, personalized care plans, and continuous monitoring for optimal protection.",
      color: "text-sky-600",
      bg: "bg-sky-50",
      border: "border-sky-200"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Healthcare",
      description: "Advanced artificial intelligence systems for predictive analytics, personalized treatment recommendations, and real-time health monitoring.",
      color: "text-blue-600",
      bg: "bg-blue-50", 
      border: "border-blue-200"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Holistic Wellness",
      description: "Complete health support including mental wellness programs, nutrition guidance, peer support networks, and family counseling services.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Impact",
      description: "Connecting patients with healthcare heroes through cutting-edge technology, compassionate support, and sustainable health solutions.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200"
    }
  ]

  return (
    <section id="about" className="py-20 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
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
              <Globe className="mr-2 h-4 w-4 text-sky-600" />
              Global Health Initiative
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-emerald-800 px-6 py-2 border border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-xl">
              <Activity className="mr-2 h-4 w-4 text-emerald-600" />
              Proven Impact & Results
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-blue-800 px-6 py-2 border border-blue-200/60 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-xl">
              <Brain className="mr-2 h-4 w-4 text-blue-600" />
              Innovation-Driven Care
            </Badge>
          </div>

          <div className="relative inline-block mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-r from-sky-100/80 to-blue-100/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-xl">
              <Target className="h-14 w-14 text-sky-600" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            <span className="relative inline-block">
              About
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 via-blue-600/20 to-indigo-600/20 blur-xl scale-110 animate-pulse"></div>
            </span>
            <span className="block mt-4 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent relative">
              PrepGuard
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/30 to-blue-400/30 blur-2xl opacity-50 animate-float"></div>
            </span>
          </h2>

          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200/50 max-w-5xl mx-auto overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-white to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600"></div>
            <div className="relative z-10">
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6">
                Working together to deliver exceptional HIV prevention services across Kenya through 
                <span className="font-bold text-sky-600 relative group/highlight">
                  <span className="relative z-10"> innovative technology</span>
                  <span className="absolute inset-0 bg-sky-100 rounded-lg scale-110 opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-300"></span>
                </span>, 
                <span className="font-bold text-emerald-600 relative group/highlight">
                  <span className="relative z-10"> evidence-based medicine</span>
                  <span className="absolute inset-0 bg-emerald-100 rounded-lg scale-110 opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-300"></span>
                </span>, and 
                <span className="font-bold text-blue-600 relative group/highlight">
                  <span className="relative z-10"> compassionate care</span>
                  <span className="absolute inset-0 bg-blue-100 rounded-lg scale-110 opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-300"></span>
                </span>
              </p>
              <div className="flex items-center justify-center space-x-6 opacity-60">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-sky-300"></div>
                <Target className="h-6 w-6 text-sky-600 animate-pulse" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-sky-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Visual Separator */}
        <div className="relative mb-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-8 py-4 rounded-full shadow-xl border border-sky-100/50 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-500"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse animation-delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="grid xl:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <div className="space-y-10 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-600/5 via-blue-600/5 to-indigo-600/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-t-3xl"></div>
              <div className="pt-4">
                <h3 className="text-4xl font-bold text-gray-900 mb-8 leading-tight relative">
                  <span className="bg-gradient-to-r from-gray-900 via-sky-800 to-blue-800 bg-clip-text text-transparent">
                    Revolutionizing Healthcare Delivery
                  </span>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed relative group/text">
                    <span className="relative z-10">
                      Our platform connects healthcare providers, patients, and communities for 
                      comprehensive PrEP care and support. We're building the future of HIV prevention 
                      through innovative technology and compassionate care.
                    </span>
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed relative group/text">
                    <span className="relative z-10">
                      In partnership with CHAP Stawisha and healthcare facilities nationwide, 
                      we provide accessible, high-quality PrEP services to everyone who needs them.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 relative">
              {[
                { text: "AI-powered healthcare delivery systems", icon: <Brain className="h-6 w-6" />, color: "from-purple-600 to-indigo-600" },
                { text: "Comprehensive patient management platform", icon: <Stethoscope className="h-6 w-6" />, color: "from-sky-600 to-blue-600" },
                { text: "Real-time health monitoring & analytics", icon: <Activity className="h-6 w-6" />, color: "from-emerald-600 to-teal-600" },
                { text: "24/7 support and consultation services", icon: <Heart className="h-6 w-6" />, color: "from-rose-600 to-pink-600" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-6 group/item relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-gray-50/50 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 blur-sm scale-105"></div>
                  <div className="relative z-10 flex items-center space-x-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100/50 group-hover/item:shadow-xl group-hover/item:scale-105 transition-all duration-300 w-full">
                    <div className={`p-4 bg-gradient-to-r ${item.color} rounded-xl shadow-lg group-hover/item:shadow-xl group-hover/item:scale-110 transition-all duration-300`}>
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-sky-600 group-hover/item:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <span className="text-gray-700 font-semibold text-lg group-hover/item:text-gray-900 transition-colors">{item.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <Button className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:via-blue-700 hover:to-indigo-700 text-white px-10 py-5 text-lg font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 group/btn relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <span>Learn More About Our Mission</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </div>
              </Button>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/30 via-blue-50/30 to-indigo-50/30 rounded-3xl blur-3xl opacity-50"></div>
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.bg} ${feature.border} border-2 hover:border-opacity-80 hover:shadow-2xl transition-all duration-500 group overflow-hidden transform hover:-translate-y-3 hover:scale-[1.02] relative backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="pb-6 relative z-10">
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 bg-white ${feature.border} border-2 rounded-2xl shadow-xl ${feature.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors leading-tight">
                        <span className="bg-gradient-to-r from-gray-900 via-sky-800 to-blue-800 bg-clip-text text-transparent group-hover:from-sky-700 group-hover:via-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                          {feature.title}
                        </span>
                      </CardTitle>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors text-lg">
                        {feature.description}
                      </p>
                      <div className="flex items-center space-x-3 pt-2">
                        <div className="w-12 h-px bg-gradient-to-r from-sky-300 to-blue-300 group-hover:w-20 transition-all duration-500"></div>
                        <ArrowRight className="h-4 w-4 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 via-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 rounded-3xl p-16 md:p-20 text-white overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-400/10 rounded-full blur-2xl animate-float animation-delay-1000"></div>
            
            <div className="relative z-10 text-center space-y-10">
              <div className="flex items-center justify-center mb-8 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 animate-pulse"></div>
                  <Sparkles className="h-16 w-16 text-white mr-6 animate-pulse relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold relative">
                  <span className="bg-gradient-to-r from-white via-sky-100 to-blue-100 bg-clip-text text-transparent">
                    Our Mission
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-white/60 via-sky-200/60 to-blue-200/60 rounded-full"></div>
                </h3>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <p className="text-2xl md:text-3xl mb-10 opacity-95 max-w-4xl mx-auto leading-relaxed font-bold">
                  <span className="text-white bg-white/10 px-3 py-1 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300">Power</span> 
                  <span className="mx-3 text-white/70">•</span> 
                  <span className="text-white/95 bg-white/10 px-3 py-1 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300"> Protects</span> 
                  <span className="mx-3 text-white/70">•</span> 
                  <span className="text-white/90 bg-white/10 px-3 py-1 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300"> Prepare</span>
                </p>
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent to-white/40"></div>
                  <Heart className="h-8 w-8 text-white/80 animate-pulse" />
                  <div className="w-20 h-px bg-gradient-to-l from-transparent to-white/40"></div>
                </div>
                <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Empowering everyone with knowledge for prevention. Join the movement. 
                  Be part of the generation that ends HIV.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-8 pt-6">
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce animation-delay-500"></div>
                <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce animation-delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(30px, -30px) scale(1.05) rotate(60deg); }
          66% { transform: translate(-20px, 20px) scale(0.95) rotate(120deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-15px); }
          70% { transform: translateY(-7px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        .animate-float {
          animation: float 25s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .group:hover .group-hover\\:shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  )
}