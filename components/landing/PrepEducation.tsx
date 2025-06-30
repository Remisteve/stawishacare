'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Info, 
  Users, 
  Clock, 
  MapPin, 
  Target,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Pill,
  ArrowRight,
  Syringe,
  Award,
  Heart,
  Activity,
  Brain,
  Calendar,
  Shield,
  Star,
  Zap,
  Sparkles,
  Clock3,
  TrendingUp,
  Globe
} from 'lucide-react'

export default function PrepEducation() {
  const [activePrEPSection, setActivePrEPSection] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'oral' | 'injectable' | 'breakthrough'>('breakthrough')

  const prepOptions = {
    oral: {
      title: "Daily Oral PrEP",
      subtitle: "Truvada® & Descovy®",
      description: "Proven daily medication for continuous HIV protection",
      effectiveness: "Up to 99% effective when taken daily",
      icon: <Pill className="h-8 w-8" />,
      features: [
        "One tablet daily, with or without food",
        "Requires 7 days for maximum protection",
        "Monthly clinic visits for monitoring",
        "Easy to start and discontinue",
        "Well-established safety profile since 2012",
        "Covered by NHIF and donor programs",
        "Available at all 50+ partner facilities",
        "Generic options available for affordability"
      ],
      color: "border-blue-300/60 bg-gradient-to-br from-blue-50/95 via-indigo-50/60 to-white",
      gradient: "from-blue-600 to-indigo-700",
      stats: { users: "2.5M+", countries: "100+", years: "12+" }
    },
    injectable: {
      title: "Long-Acting Injectable PrEP",
      subtitle: "Cabotegravir (CAB-LA)",
      description: "Bi-monthly injection for superior protection",
      effectiveness: "69% better efficacy than oral PrEP",
      icon: <Syringe className="h-8 w-8" />,
      features: [
        "Injection every 8 weeks (2 months)",
        "No daily pills to remember",
        "Administered by trained healthcare provider",
        "Excellent for busy lifestyles and travel",
        "Maintains steady protective drug levels",
        "Private and discreet option",
        "WHO approved since 2022",
        "Available at select PrepGuard facilities"
      ],
      color: "border-emerald-300/60 bg-gradient-to-br from-emerald-50/95 via-teal-50/60 to-white",
      gradient: "from-emerald-600 to-teal-700",
      stats: { efficacy: "69%", duration: "8 weeks", trials: "4,500+" }
    },
    breakthrough: {
      title: "Revolutionary Twice-Yearly PrEP",
      subtitle: "Lenacapavir (Yeztugo®) - FDA Approved 2025",
      description: "Science Breakthrough of the Year - Ultimate HIV prevention",
      effectiveness: "99.9% effective with just 2 shots per year",
      icon: <Sparkles className="h-8 w-8" />,
      features: [
        "Only 2 injections per year (every 6 months)",
        "Nearly 100% protection (99.9% efficacy)",
        "Zero daily adherence requirements",
        "Revolutionary capsid inhibitor technology",
        "Superior to all existing PrEP options",
        "FDA approved June 2025 - Now Available!",
        "Coming soon to PrepGuard network",
        "89% more effective than daily Truvada"
      ],
      color: "border-purple-300/60 bg-gradient-to-br from-purple-50/95 via-pink-50/60 to-white",
      gradient: "from-purple-600 to-pink-600",
      stats: { efficacy: "99.9%", frequency: "2x/year", breakthrough: "2024" }
    }
  }

  const prepEducationalContent = [
    {
      title: "What is PrEP?",
      icon: <Shield className="h-8 w-8" />,
      description: "Pre-Exposure Prophylaxis - Your shield against HIV",
      details: [
        "PrEP stands for Pre-Exposure Prophylaxis - medicine taken to prevent HIV infection",
        "It's a daily pill or injection that keeps HIV from establishing infection in your body",
        "When taken consistently, PrEP is highly effective at preventing HIV from sex or injection drug use",
        "PrEP does NOT protect against other sexually transmitted infections (STIs) like gonorrhea or syphilis",
        "You must be HIV-negative to start PrEP - regular testing ensures it remains safe and effective",
        "PrEP is not the same as PEP (Post-Exposure Prophylaxis) which is taken after potential exposure",
        "It works by blocking HIV from making copies of itself in your body",
        "PrEP is recommended by WHO, CDC, and Kenya Ministry of Health as a key HIV prevention tool"
      ],
      gradient: "from-blue-600 to-cyan-600",
      color: "border-blue-200/60 bg-gradient-to-br from-blue-50/95 via-cyan-50/70 to-white hover:border-blue-300/80"
    },
    {
      title: "Who Should Consider PrEP?",
      icon: <Users className="h-8 w-8" />,
      description: "PrEP is recommended for individuals at higher risk",
      details: [
        "Anyone whose partner is HIV-positive (serodiscordant couples) - even with undetectable viral load",
        "People with multiple sexual partners or whose partners have multiple partners",
        "Anyone who has had a sexually transmitted infection (STI) in the past 6 months",
        "People who don't always use condoms with partners of unknown HIV status",
        "Anyone who injects drugs and shares needles, syringes, or other drug equipment",
        "People engaging in commercial sex work or transactional sex",
        "Men who have sex with men (MSM) and are sexually active",
        "Healthcare workers with potential occupational exposure to HIV",
        "Anyone who wants extra protection beyond condoms",
        "People in high HIV prevalence areas seeking additional prevention"
      ],
      gradient: "from-emerald-600 to-teal-600",
      color: "border-emerald-200/60 bg-gradient-to-br from-emerald-50/95 via-teal-50/70 to-white hover:border-emerald-300/80"
    },
    {
      title: "Revolutionary Breakthrough: Lenacapavir",
      icon: <Sparkles className="h-8 w-8" />,
      description: "Science 2024 Breakthrough of the Year - Game-changing HIV prevention",
      details: [
        "FDA approved June 2025 - most effective PrEP ever developed",
        "99.9% efficacy in PURPOSE trials (virtually 100% protection)",
        "Only 2 injections per year - ultimate convenience and privacy",
        "Targets HIV capsid protein - completely new mechanism of action",
        "Zero infections in 5,000+ women trial participants (PURPOSE 1)",
        "89% more effective than daily Truvada in head-to-head trials",
        "Coming soon to PrepGuard facilities nationwide",
        "Revolutionary 6-month protection from single injection",
        "No daily pills to remember - perfect for busy lifestyles",
        "Eliminates adherence challenges that reduce oral PrEP effectiveness"
      ],
      gradient: "from-purple-600 to-pink-600",
      color: "border-purple-200/60 bg-gradient-to-br from-purple-50/95 via-pink-50/70 to-white hover:border-purple-300/80"
    },
    {
      title: "Starting Your PrEP Journey",
      icon: <ArrowRight className="h-8 w-8" />,
      description: "Simple steps to begin protection",
      details: [
        "Step 1: Visit a healthcare provider for comprehensive HIV testing (must be negative)",
        "Step 2: Complete medical screening including kidney and liver function tests",
        "Step 3: Get tested for sexually transmitted infections (STIs) and hepatitis B",
        "Step 4: Discuss your sexual and drug use history honestly with your provider",
        "Step 5: Receive counseling about PrEP options, effectiveness, and side effects",
        "Step 6: Choose between daily oral, bi-monthly injectable, or twice-yearly PrEP",
        "Step 7: Start your chosen PrEP regimen as prescribed by your doctor",
        "Step 8: Schedule regular follow-up appointments every 3 months",
        "Step 9: Get ongoing HIV testing, STI screening, and kidney function monitoring",
        "Step 10: Continue safer sex practices and maintain open communication with your provider"
      ],
      gradient: "from-indigo-600 to-blue-600",
      color: "border-indigo-200/60 bg-gradient-to-br from-indigo-50/95 via-blue-50/70 to-white hover:border-indigo-300/80"
    },
    {
      title: "Where to Access PrEP",
      icon: <MapPin className="h-8 w-8" />,
      description: "Multiple locations for free PrEP services",
      details: [
        "Government health facilities - County hospitals and health centers with PEPFAR support",
        "PrepGuard network of 50+ certified facilities across Kenya",
        "Private healthcare providers and specialized HIV prevention clinics",
        "Faith-based health organizations through CHAP Stawisha partnership",
        "Mission hospitals and Christian Health Association facilities",
        "Mobile clinics serving remote and hard-to-reach rural communities",
        "Community health centers and NGO-supported clinics",
        "University health centers for students and young adults",
        "Telemedicine consultations for initial counseling and follow-up",
        "Workplace health programs and employee wellness centers",
        "Youth-friendly health services with specialized counselors"
      ],
      gradient: "from-amber-600 to-orange-600",
      color: "border-amber-200/60 bg-gradient-to-br from-amber-50/95 via-orange-50/70 to-white hover:border-amber-300/80"
    },
    {
      title: "PrEP Success Tips",
      icon: <Award className="h-8 w-8" />,
      description: "Maximize your protection with these guidelines",
      details: [
        "Take oral PrEP at the same time every day - set phone reminders or alarms",
        "Don't skip doses - consistency is key to maintaining protective drug levels",
        "Keep extra pills with you when traveling or staying away from home",
        "Attend all scheduled medical appointments for monitoring and refills",
        "Be honest with your healthcare provider about missed doses or side effects",
        "Continue using condoms for additional STI protection beyond HIV",
        "Get regular STI testing every 3-6 months as recommended",
        "Know that it takes 7 days for daily oral PrEP to reach maximum protection",
        "Don't stop PrEP without consulting your healthcare provider first",
        "Stay informed about new PrEP options like injectable formulations",
        "Join support groups or counseling programs if available in your area",
        "Communicate openly with sexual partners about your PrEP use and HIV prevention"
      ],
      gradient: "from-rose-600 to-red-600",
      color: "border-rose-200/60 bg-gradient-to-br from-rose-50/95 via-red-50/70 to-white hover:border-rose-300/80"
    }
  ]

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Enhanced professional background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
      
      {/* Sophisticated animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-cyan-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-3000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/6 to-pink-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-6000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-br from-amber-400/6 to-orange-400/6 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-9000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced header section */}
        <div className="text-center mb-24">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Badge className="bg-white/95 backdrop-blur-sm text-blue-800 px-8 py-3 border border-blue-200/70 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-2xl hover:scale-105">
              <BookOpen className="mr-3 h-5 w-5 text-blue-600" />
              Evidence-Based Education
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-emerald-800 px-8 py-3 border border-emerald-200/70 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-2xl hover:scale-105">
              <Award className="mr-3 h-5 w-5 text-emerald-600" />
              WHO Guidelines 2025
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-semibold rounded-2xl animate-pulse hover:scale-105">
              <Star className="mr-3 h-5 w-5 text-white" />
              FDA Approved 2025 - NEW!
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-10 leading-tight">
            Revolutionary
            <span className="block mt-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              PrEP Breakthrough
            </span>
            <span className="block text-lg md:text-xl mt-6 text-gray-700 font-semibold">
              PrEP Education Center
            </span>
            <span className="block text-base mt-2 text-gray-600">
              Empowering everyone with knowledge for prevention
            </span>
          </h2>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200/60 max-w-5xl mx-auto mb-10">
            <p className="text-2xl font-bold mb-6">
              <span className="text-blue-600">Power</span> • 
              <span className="text-emerald-600"> Protection</span> • 
              <span className="text-purple-600"> Revolution</span>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Learn everything about PrEP (Pre-Exposure Prophylaxis) - proven medicine that prevents HIV infection. 
              From basic understanding to breakthrough innovations, we provide comprehensive education for informed decisions.
            </p>
            <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 border border-blue-200/80">
              <p className="text-base font-semibold text-blue-800 flex items-center justify-center">
                <Shield className="mr-3 h-5 w-5" />
                Comprehensive PrEP Education for Everyone - No Prior Knowledge Required
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced PrEP Options Comparison */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Choose Your PrEP Option</h3>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Three proven methods to protect yourself from HIV - including the revolutionary breakthrough option
            </p>
          </div>

          {/* Enhanced tab buttons */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-gray-200/50">
              <button
                onClick={() => setActiveTab('breakthrough')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'breakthrough'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Star className="mr-2 h-4 w-4 inline" />
                Breakthrough PrEP (NEW!)
              </button>
              <button
                onClick={() => setActiveTab('oral')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'oral'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Pill className="mr-2 h-4 w-4 inline" />
                Daily Oral PrEP
              </button>
              <button
                onClick={() => setActiveTab('injectable')}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'injectable'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Syringe className="mr-2 h-4 w-4 inline" />
                Injectable PrEP
              </button>
            </div>
          </div>

          {/* Enhanced PrEP option details */}
          <Card className={`${prepOptions[activeTab].color} border-2 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-5xl mx-auto overflow-hidden ${activeTab === 'breakthrough' ? 'ring-2 ring-purple-300/50' : ''}`}>
            {activeTab === 'breakthrough' && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-xs font-bold rounded-full animate-pulse">
                  FDA APPROVED 2025
                </Badge>
              </div>
            )}
            <CardHeader className="pb-6">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-6">
                  <div className={`p-3 bg-gradient-to-br ${prepOptions[activeTab].gradient} rounded-2xl shadow-lg text-white ${activeTab === 'breakthrough' ? 'animate-pulse' : ''}`}>
                    {prepOptions[activeTab].icon}
                  </div>
                  <div className="text-center lg:text-left">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      {prepOptions[activeTab].title}
                      {activeTab === 'breakthrough' && <Star className="h-5 w-5 text-purple-600" />}
                    </CardTitle>
                    <p className="text-base font-semibold text-gray-600 mb-2">{prepOptions[activeTab].subtitle}</p>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {prepOptions[activeTab].description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Badge className={`px-6 py-3 text-sm font-bold bg-gradient-to-r ${prepOptions[activeTab].gradient} text-white border-0 rounded-xl ${activeTab === 'breakthrough' ? 'animate-pulse' : ''}`}>
                    {prepOptions[activeTab].effectiveness}
                  </Badge>
                  
                  {/* Enhanced stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(prepOptions[activeTab].stats).map(([key, value]) => (
                      <div key={key} className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50 hover:scale-105 transition-transform">
                        <div className="text-sm font-bold text-gray-900">{value}</div>
                        <div className="text-xs font-medium text-gray-600 uppercase">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-4">
                {prepOptions[activeTab].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 group">
                    <div className={`p-1 bg-gradient-to-r ${prepOptions[activeTab].gradient} rounded-full shadow-sm group-hover:scale-110 transition-transform`}>
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              
              {activeTab === 'breakthrough' && (
                <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Clinical Trial Results
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-purple-700 mb-1">PURPOSE 1 Trial (Women):</p>
                      <p className="text-purple-600">5,000+ participants • 100% protection • Zero infections</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-700 mb-1">PURPOSE 2 Trial (Men/Gender-diverse):</p>
                      <p className="text-purple-600">3,200+ participants • 99.9% protection • 89% better than Truvada</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced educational content grid */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">PrEP Education Center</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive guides designed for everyone - from those hearing about PrEP for the first time 
              to those ready to explore the latest breakthrough options. Click any card to expand and learn more.
            </p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-24">
          {prepEducationalContent.map((section, index) => (
            <Card 
              key={index} 
              className={`group ${section.color} border-2 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 hover:scale-102 cursor-pointer overflow-hidden`}
              onClick={() => setActivePrEPSection(activePrEPSection === index ? null : index)}
            >
              <CardHeader className="pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 bg-gradient-to-br ${section.gradient} rounded-2xl shadow-lg text-white transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors flex items-center gap-3">
                        {section.title}
                        {index === 2 && <Badge className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-bold animate-pulse">NEW!</Badge>}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-base font-medium group-hover:text-gray-700 transition-colors leading-relaxed">{section.description}</CardDescription>
                    </div>
                  </div>
                  <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform duration-300 group-hover:text-gray-600 ${activePrEPSection === index ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
              {activePrEPSection === index && (
                <CardContent className="pt-0">
                  <div className="border-t border-gray-200/70 pt-6">
                    <ul className="space-y-4">
                      {section.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-4 group/item">
                          <div className={`p-1.5 bg-gradient-to-r ${section.gradient} rounded-full shadow-sm group-hover/item:scale-110 transition-transform mt-0.5`}>
                            <CheckCircle className="h-3.5 w-3.5 text-white" />
                          </div>
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors text-sm leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 rounded-3xl p-16 md:p-20 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300/20 rounded-full blur-2xl animate-float animation-delay-3000"></div>
            <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-300/15 rounded-full blur-xl animate-float animation-delay-6000"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Start Your PrEP Journey?
              </h3>
              <p className="text-xl md:text-2xl mb-6 opacity-95 max-w-4xl mx-auto leading-relaxed">
                Join the movement. Be part of the generation that ends HIV.
              </p>
              <p className="text-lg mb-12 opacity-90 max-w-3xl mx-auto">
                Experience the breakthrough protection of Lenacapavir - only 2 shots per year for 99.9% protection!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-5 bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold group rounded-2xl" 
                >
                  <Star className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Try Breakthrough PrEP
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-10 py-5 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold group rounded-2xl" 
                >
                  <BookOpen className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Learn More
                </Button>
              </div>
              
              {/* Enhanced info badges */}
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 border border-white/30 rounded-2xl text-base font-semibold hover:scale-105 transition-transform">
                  <Zap className="mr-3 h-5 w-5" />
                  99.9% Effective
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 border border-white/30 rounded-2xl text-base font-semibold hover:scale-105 transition-transform">
                  <Calendar className="mr-3 h-5 w-5" />
                  Only 2x per Year
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 border border-white/30 rounded-2xl text-base font-semibold hover:scale-105 transition-transform">
                  <Award className="mr-3 h-5 w-5" />
                  FDA Approved 2025
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0px, 0px) scale(1) rotate(0deg); 
            opacity: 0.6;
          }
          33% { 
            transform: translate(35px, -35px) scale(1.05) rotate(120deg); 
            opacity: 0.8;
          }
          66% { 
            transform: translate(-25px, 25px) scale(0.95) rotate(240deg); 
            opacity: 0.7;
          }
        }
        
        .animate-float {
          animation: float 28s ease-in-out infinite;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        
        .animation-delay-9000 {
          animation-delay: 9s;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  )
}