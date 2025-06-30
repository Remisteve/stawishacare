'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Heart, 
  Calendar, 
  Video, 
  Activity, 
  CheckCircle,
  Stethoscope,
  Sparkles,
  TrendingUp,
  Zap,
  Brain,
  Users,
  Globe,
  Award
} from 'lucide-react'

// Enhanced SafetyIcon component
const SafetyIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3 3v6c0 3.5-1.5 6.5-3 8-1.5-1.5-3-4.5-3-8V5l3-3z"/>
    <path d="M12 11v4"/>
    <path d="M12 17h.01"/>
  </svg>
)

export default function CareSuite() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "PrEP & PEP Excellence",
      description: "Comprehensive HIV prevention with advanced tracking, personalized care plans, and 24/7 monitoring support",
      details: [
        "AI-powered adherence monitoring system", 
        "Emergency PEP within 72 hours guaranteed", 
        "Proactive side effect management", 
        "24/7 specialized support chat",
        "Personalized dosing recommendations",
        "Integration with wearable health devices"
      ],
      iconBg: "bg-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      hover: "hover:border-blue-400 hover:bg-blue-100 hover:shadow-lg",
      accent: "text-blue-700"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Comprehensive Wellness Network",
      description: "Holistic health ecosystem with discreet distribution and complete protection services",
      details: [
        "Smart vending machine network locations", 
        "Discreet home delivery service", 
        "Premium variety packs available", 
        "Educational materials and resources",
        "Nutritional guidance and meal planning",
        "Mental health counseling services"
      ],
      iconBg: "bg-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      hover: "hover:border-emerald-400 hover:bg-emerald-100 hover:shadow-lg",
      accent: "text-emerald-700"
    },
    {
      icon: <SafetyIcon />,
      title: "Violence Response Unit", 
      description: "Immediate comprehensive support for survivors with complete confidentiality and trauma-informed care",
      details: [
        "24/7 crisis intervention team", 
        "Legal aid network and advocacy", 
        "Safe accommodation coordination", 
        "Trauma-informed counseling services",
        "Family support and mediation",
        "Long-term recovery planning"
      ],
      iconBg: "bg-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      hover: "hover:border-purple-400 hover:bg-purple-100 hover:shadow-lg",
      accent: "text-purple-700"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "AI-Powered Appointment System",
      description: "Revolutionary scheduling with predictive analytics and zero waiting time guarantee",
      details: [
        "Predictive queue management algorithm", 
        "Multi-language reminder system", 
        "Transportation assistance coordination", 
        "Virtual check-in with biometrics",
        "Smart resource allocation",
        "Real-time facility capacity monitoring"
      ],
      iconBg: "bg-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      hover: "hover:border-orange-400 hover:bg-orange-100 hover:shadow-lg",
      accent: "text-orange-700"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Advanced Telehealth Platform",
      description: "Ultra-HD consultations with AI-assisted diagnostics across all medical departments",
      details: [
        "AI-powered electronic prescriptions", 
        "Secure lab result sharing system", 
        "Group therapy and support sessions", 
        "Consultation recording options",
        "Real-time vital signs monitoring",
        "Multilingual translation services"
      ],
      iconBg: "bg-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      hover: "hover:border-indigo-400 hover:bg-indigo-100 hover:shadow-lg",
      accent: "text-indigo-700"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Health Intelligence Analytics",
      description: "Advanced predictive analytics and machine learning for proactive health management",
      details: [
        "Advanced risk scoring algorithms", 
        "Personalized health insights dashboard", 
        "Predictive trend forecasting", 
        "Evidence-based wellness recommendations",
        "Population health analytics",
        "Genomic data integration capabilities"
      ],
      iconBg: "bg-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200",
      hover: "hover:border-teal-400 hover:bg-teal-100 hover:shadow-lg",
      accent: "text-teal-700"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
      {/* Professional background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Professional header section */}
        <div className="text-center mb-16">
          {/* Professional badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-white text-gray-700 px-6 py-2 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold">
              <Sparkles className="mr-2 h-4 w-4 text-blue-600" />
              Complete Care Platform
            </Badge>
            <Badge className="bg-white text-gray-700 px-6 py-2 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold">
              <TrendingUp className="mr-2 h-4 w-4 text-blue-600" />
              Integrated Solutions
            </Badge>
            <Badge className="bg-white text-gray-700 px-6 py-2 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold">
              <Brain className="mr-2 h-4 w-4 text-blue-600" />
              AI-Powered Technology
            </Badge>
          </div>
          
          {/* Main title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Comprehensive
            <span className="block text-blue-600">
              Care Suite
            </span>
            <span className="block text-xl md:text-2xl lg:text-3xl mt-4 text-gray-600 font-semibold">
              Complete Wellness Ecosystem
            </span>
          </h2>
          
          {/* Description card */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Everything you need for <span className="font-bold text-blue-700">complete HIV prevention</span> and 
                <span className="font-bold text-blue-700"> holistic wellness</span> in one integrated platform
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-800 font-semibold text-sm">Global Standards</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-green-800 font-semibold text-sm">WHO Certified</span>
                </div>
                <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
                  <Zap className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-800 font-semibold text-sm">Real-time Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group ${feature.bg} ${feature.border} ${feature.hover} border-2 transition-all duration-300 shadow-md cursor-pointer overflow-hidden relative clip-corner`}
              onClick={() => setActiveFeature(activeFeature === index ? null : index)}
            >
              {/* Professional border */}
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.iconBg}`}></div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${feature.iconBg} rounded-lg shadow-md text-white group-hover:scale-105 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardTitle className={`text-lg md:text-xl font-bold mb-3 group-hover:${feature.accent} transition-colors leading-tight`}>
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              
              {activeFeature === index && (
                <CardContent className="pt-0 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <ul className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-3 group/item">
                          <div className={`p-1.5 ${feature.iconBg} rounded-md shadow-sm`}>
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
              
              {/* Click indicator */}
              <div className="absolute bottom-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-6 h-6 rounded-md ${feature.iconBg} flex items-center justify-center shadow-md`}>
                  <span className="text-white text-xs font-bold">+</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Professional showcase section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Statistics showcase */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 clip-corner">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-8">Platform Impact</h3>
              <div className="space-y-6">
                {[
                  { number: "99.9%", label: "System Uptime", icon: <Activity className="h-5 w-5" />, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
                  { number: "50ms", label: "Response Time", icon: <Zap className="h-5 w-5" />, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
                  { number: "150+", label: "AI Models", icon: <Brain className="h-5 w-5" />, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
                  { number: "24/7", label: "Monitoring", icon: <Shield className="h-5 w-5" />, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
                ].map((stat, idx) => (
                  <div key={idx} className={`flex items-center justify-between ${stat.bg} rounded-lg p-4 border ${stat.border} hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-center space-x-3">
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                      <span className="text-gray-700 font-semibold text-sm">{stat.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology showcase */}
          <div className="lg:col-span-2">
            <div className="bg-blue-600 rounded-xl p-8 text-white shadow-lg overflow-hidden relative clip-corner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Sparkles className="h-8 w-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold">
                    Cutting-Edge Technology
                  </h3>
                </div>
                <p className="text-lg mb-8 opacity-90 leading-relaxed">
                  Powered by advanced artificial intelligence, machine learning, and real-time analytics 
                  to deliver personalized healthcare experiences.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "AI Diagnostics", desc: "99.7% accuracy", icon: <Brain className="h-6 w-6" /> },
                    { title: "Predictive Analytics", desc: "Early intervention", icon: <TrendingUp className="h-6 w-6" /> },
                    { title: "Real-time Monitoring", desc: "24/7 surveillance", icon: <Activity className="h-6 w-6" /> }
                  ].map((tech, idx) => (
                    <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="text-white">
                          {tech.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-2">{tech.title}</h4>
                      <p className="text-white/90 text-sm">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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