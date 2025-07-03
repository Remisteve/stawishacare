'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Mail, 
  Shield,
  CheckCircle,
  HeartHandshake,
  ArrowRight,
  Heart,
  Lock,
  Clock,
  MapPin,
  MessageSquare,
  Send
} from 'lucide-react'

const SafetyIcon = () => (
  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3 3v6c0 3.5-1.5 6.5-3 8-1.5-1.5-3-4.5-3-8V5l3-3z"/>
    <path d="M12 11v4"/>
    <path d="M12 17h.01"/>
  </svg>
)

export default function ViolenceSupport() {
  const router = useRouter()

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Support Hotline",
      contact: "+254 700 000 000",
      bg: "bg-rose-100",
      iconBg: "bg-rose-600"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      contact: "support@prepguard.co.ke",
      bg: "bg-pink-100",
      iconBg: "bg-pink-600"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      contact: "Available 24/7",
      bg: "bg-red-100",
      iconBg: "bg-red-600"
    }
  ]

  const emergencyContacts = [
    { title: "Crisis Support", number: "1195", desc: "National emergency crisis intervention" },
    { title: "Medical Emergency", number: "999", desc: "Emergency medical services" },
    { title: "Gender Violence", number: "1195", desc: "Specialized GBV support" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-200/15 to-rose-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-3 mb-8">
            <Badge className="bg-white/95 text-rose-800 px-4 py-2 border border-rose-200">
              <Heart className="mr-2 h-4 w-4" />
              Confidential Support
            </Badge>
            <Badge className="bg-white/95 text-pink-800 px-4 py-2 border border-pink-200">
              <Clock className="mr-2 h-4 w-4" />
              24/7 Available
            </Badge>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full border border-rose-200 shadow-lg w-fit mx-auto mb-8">
            <SafetyIcon />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Violence Support Services
          </h1>
          
          <div className="bg-white/95 rounded-2xl p-8 shadow-xl border border-rose-200/60 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Professional support services for any form of abuse after HIV Self Test use or during PrEP use. Our trained specialists provide confidential assistance with dignity and respect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-lg">
                <MapPin className="h-4 w-4 text-rose-600" />
                <span className="text-rose-800 font-medium">15 Counties Coverage</span>
              </div>
              <div className="flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-lg">
                <Lock className="h-4 w-4 text-pink-600" />
                <span className="text-pink-800 font-medium">Complete Confidentiality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Service Card */}
          <Card className="bg-gradient-to-br from-red-50/95 via-pink-50/80 to-white border-2 border-red-200/60 shadow-lg">
            <CardHeader>
              <div className="p-3 bg-gradient-to-br from-red-600 to-pink-700 rounded-xl w-fit mb-4 text-white">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Comprehensive Care Services</CardTitle>
              <p className="text-gray-600">Full spectrum of support services with integrated case management and advocacy</p>
              <ul className="space-y-2 mt-4">
                {["Legal assistance & advocacy", "Medical care coordination", "Social support service", "Long-term recovery planning"].map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardHeader>
          </Card>

          {/* Contact Form */}
          <Card className="bg-white/95 border-2 border-pink-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Get Support</CardTitle>
              <p className="text-gray-600">Reach out for confidential assistance</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input type="email" placeholder="Email Address" />
              <Input type="tel" placeholder="Phone Number" />
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                placeholder="How can we help you?"
              />
              <Button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className={`${method.bg} border-2 border-gray-200 shadow-md hover:shadow-lg transition-all`}>
              <CardHeader className="text-center">
                <div className={`p-3 ${method.iconBg} rounded-lg w-fit mx-auto mb-4 text-white`}>
                  {method.icon}
                </div>
                <CardTitle className="text-lg font-bold">{method.title}</CardTitle>
                <p className="font-semibold text-gray-700">{method.contact}</p>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-2 flex items-center justify-center">
              <Phone className="h-6 w-6 mr-3" />
              Emergency Contacts
            </h3>
            <p className="text-red-700">For immediate assistance in crisis situations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {emergencyContacts.map((emergency, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center border border-red-200">
                <h4 className="text-lg font-bold text-red-800 mb-2">{emergency.title}</h4>
                <div className="text-3xl font-bold text-red-600 mb-2">{emergency.number}</div>
                <p className="text-red-700 text-sm">{emergency.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="text-base px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg font-semibold group rounded-xl" 
            onClick={() => router.push('/contact')}
          >
            <HeartHandshake className="mr-3 h-5 w-5" />
            Access Support Services
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          
          <p className="text-gray-600 mt-4">
            Your safety and confidentiality are our highest priorities
          </p>
        </div>
      </div>
    </div>
  )
}