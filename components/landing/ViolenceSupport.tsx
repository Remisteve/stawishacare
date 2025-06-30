'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Users, 
  Shield,
  CheckCircle,
  HeartHandshake,
  ArrowRight,
  Heart,
  Lock,
  Activity,
  Award,
  Globe,
  Clock,
  MapPin
} from 'lucide-react'

// Professional SafetyIcon component
const SafetyIcon = () => (
  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3 3v6c0 3.5-1.5 6.5-3 8-1.5-1.5-3-4.5-3-8V5l3-3z"/>
    <path d="M12 11v4"/>
    <path d="M12 17h.01"/>
  </svg>
)

export default function ViolenceSupport() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const supportServices = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "24/7 Crisis Hotline",
      description: "Immediate support from trauma-informed counselors and crisis intervention specialists",
      features: ["Anonymous & confidential calls", "Multi-language support available", "Text & WhatsApp support", "Emergency dispatch coordination"],
      gradient: "from-rose-600 to-pink-700",
      color: "border-rose-200/60 bg-gradient-to-br from-rose-50/95 via-pink-50/80 to-white"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Support Groups & Community",
      description: "Connect with survivors in safe, moderated spaces with professional facilitation",
      features: ["Weekly group therapy sessions", "Peer mentorship programs", "Online & in-person options", "Family support groups"],
      gradient: "from-pink-600 to-rose-700",
      color: "border-pink-200/60 bg-gradient-to-br from-pink-50/95 via-rose-50/80 to-white"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Comprehensive Care Services",
      description: "Full spectrum of support services with integrated case management and advocacy",
      features: ["Legal assistance & advocacy", "Medical care coordination", "Safe housing placement", "Long-term recovery planning"],
      gradient: "from-red-600 to-pink-700",
      color: "border-red-200/60 bg-gradient-to-br from-red-50/95 via-pink-50/80 to-white"
    }
  ]

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Professional reddish-pinkish background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50/60"></div>
      
      {/* Subtle professional elements with warm tones */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200/15 to-pink-200/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/10 to-rose-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-200/8 to-red-200/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Professional header section */}
        <div className="text-center mb-16">
          {/* Professional badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-white/95 backdrop-blur-sm text-rose-800 px-4 py-2 border border-rose-200/60 shadow-md text-sm font-semibold rounded-lg">
              <Heart className="mr-2 h-4 w-4" />
              Confidential Support
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-pink-800 px-4 py-2 border border-pink-200/60 shadow-md text-sm font-semibold rounded-lg">
              <Clock className="mr-2 h-4 w-4" />
              24/7 Available
            </Badge>
            <Badge className="bg-white/95 backdrop-blur-sm text-red-800 px-4 py-2 border border-red-200/60 shadow-md text-sm font-semibold rounded-lg">
              <Award className="mr-2 h-4 w-4" />
              Professional Care
            </Badge>
          </div>
          
          <div className="relative inline-block mb-8">
            <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full border border-rose-200 shadow-lg">
              <SafetyIcon />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Violence Support Services
            <span className="block mt-2 text-xl md:text-2xl text-gray-600 font-semibold">
              Confidential, Professional, Compassionate Care
            </span>
          </h2>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-rose-200/60 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Professional support services for survivors of all forms of violence. 
              Our trained specialists provide confidential assistance with dignity and respect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-lg border border-rose-200/50">
                <Globe className="h-4 w-4 text-rose-600" />
                <span className="text-rose-800 font-medium text-sm">15 Counties Coverage</span>
              </div>
              <div className="flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-lg border border-pink-200/50">
                <Activity className="h-4 w-4 text-pink-600" />
                <span className="text-pink-800 font-medium text-sm">24/7 Response</span>
              </div>
              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200/50">
                <Lock className="h-4 w-4 text-red-600" />
                <span className="text-red-800 font-medium text-sm">Complete Confidentiality</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional service cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {supportServices.map((service, index) => (
            <Card key={index} className={`${service.color} border-2 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg overflow-hidden`}>
              <CardHeader className="pb-6">
                <div className={`mb-6 text-white p-3 bg-gradient-to-br ${service.gradient} rounded-xl w-fit shadow-md`}>
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold mb-3 text-gray-900 leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-gray-700">
                      <div className={`p-1 bg-gradient-to-r ${service.gradient} rounded-full shadow-sm`}>
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Professional emergency contacts section */}
        <div className="mb-12">
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200 shadow-lg max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-800 mb-2 flex items-center justify-center">
                <Phone className="h-6 w-6 mr-3 text-red-600" />
                Emergency Contacts
              </h3>
              <p className="text-red-700 text-base">For immediate assistance in crisis situations</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Crisis Support", number: "1195", desc: "National emergency crisis intervention" },
                { title: "Medical Emergency", number: "999", desc: "Emergency medical services" },
                { title: "Gender Violence", number: "1195", desc: "Specialized GBV support" }
              ].map((emergency, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center border border-red-200 shadow-sm">
                  <h4 className="text-lg font-bold text-red-800 mb-2">{emergency.title}</h4>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {emergency.number}
                  </div>
                  <p className="text-red-700 text-sm">{emergency.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Professional CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="text-base px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold group rounded-xl" 
            onClick={() => handleNavigation('/contact')}
          >
            <HeartHandshake className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            Access Support Services
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <p className="text-gray-600 mt-4 text-base">
            Your safety and confidentiality are our highest priorities
          </p>
          
          {/* Professional contact information */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>15 Counties</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>24/7 Hotline</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}