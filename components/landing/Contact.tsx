'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Heart,
  Shield,
  Users,
  Send,
  ArrowRight,
  Globe,
  Activity,
  Award,
  HeartHandshake
} from 'lucide-react'

export default function Contact() {
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Emergency Support Hotline",
      description: "Immediate assistance for health concerns, emergencies, and crisis intervention",
      contact: "+254 700 000 000",
      action: "Call Now",
      iconBg: "bg-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-300",
      hover: "hover:shadow-xl hover:scale-105",
      accent: "text-blue-800"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Professional Email Support",
      description: "Get detailed responses to your health and service questions from our expert team",
      contact: "support@prepguard.co.ke",
      action: "Send Email",
      iconBg: "bg-emerald-600",
      bg: "bg-emerald-100",
      border: "border-emerald-300",
      hover: "hover:shadow-xl hover:scale-105",
      accent: "text-emerald-800"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat Support",
      description: "Real-time assistance from our healthcare support team and specialists",
      contact: "Available 24/7",
      action: "Start Chat",
      iconBg: "bg-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-300",
      hover: "hover:shadow-xl hover:scale-105",
      accent: "text-purple-800"
    }
  ]

  const emergencyContacts = [
    {
      title: "Crisis Support & Intervention",
      number: "1195",
      description: "National emergency line for immediate crisis intervention and mental health support"
    },
    {
      title: "Medical Emergency Services",
      number: "999",
      description: "Emergency medical services, ambulance dispatch, and hospital coordination"
    },
    {
      title: "Gender-Based Violence",
      number: "1195",
      description: "Specialized support for gender-based violence survivors with trained counselors"
    }
  ]

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
      {/* Professional background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Professional badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-blue-500 text-white px-6 py-2 border border-blue-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold">
              <Globe className="mr-2 h-4 w-4 text-white" />
              15 Counties Nationwide
            </Badge>
            <Badge className="bg-green-500 text-white px-6 py-2 border border-green-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold">
              <Activity className="mr-2 h-4 w-4 text-white" />
              24/7 Support Available
            </Badge>
            <Badge className="bg-orange-500 text-white px-6 py-2 border border-orange-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm font-bold">
              <Award className="mr-2 h-4 w-4 text-white" />
              Professional Care Team
            </Badge>
          </div>

          <div className="relative inline-block mb-12">
            <div className="p-6 bg-blue-500 rounded-full border border-blue-400 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-blue-600">Get In</span>
            <span className="block mt-2 text-blue-700">
              Touch
            </span>
          </h2>

          <div className="bg-blue-100 rounded-xl p-8 shadow-xl border border-blue-300 max-w-4xl mx-auto clip-corner hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <p className="text-lg text-blue-800 leading-relaxed font-semibold">
              Join thousands taking control of their health with comprehensive HIV prevention, 
              wellness support, and a <span className="font-bold text-blue-900">caring community</span>
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className={`${method.bg} ${method.border} ${method.hover} border-2 transition-all duration-300 shadow-md cursor-pointer overflow-hidden relative clip-corner`}>
              <div className={`absolute top-0 left-0 w-full h-1 ${method.iconBg}`}></div>
              <CardHeader className="pb-4 pt-6">
                <div className={`p-3 ${method.iconBg} rounded-lg w-fit mb-4 shadow-md text-white hover:scale-105 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <CardTitle className={`text-lg font-bold mb-2 ${method.accent} transition-colors`}>
                  {method.title}
                </CardTitle>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 font-semibold">
                  {method.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-base font-bold text-gray-900 mb-4">
                  {method.contact}
                </div>
                <Button className={`w-full ${method.iconBg} hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group`}>
                  <span>{method.action}</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
              
              {/* Decorative element */}
              <div className="absolute bottom-4 right-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className={`w-6 h-6 rounded-md ${method.iconBg} flex items-center justify-center shadow-md`}>
                  <HeartHandshake className="h-3 w-3 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="mb-16">
          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-8 shadow-xl max-w-5xl mx-auto clip-corner hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-red-600 rounded-lg mr-3 hover:scale-105 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-red-900">Emergency Contacts</h3>
              </div>
              <p className="text-red-800 font-bold">For immediate assistance in crisis situations</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {emergencyContacts.map((emergency, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-red-200 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 clip-corner">
                  <h4 className="text-base font-bold text-gray-900 mb-3">{emergency.title}</h4>
                  <div className="text-3xl font-bold text-red-600 mb-3 hover:scale-105 transition-transform duration-300">
                    {emergency.number}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{emergency.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form & Info */}
        <div className="grid xl:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <Card className="border-2 border-gray-300 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 shadow-lg clip-corner">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <CardHeader className="pt-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </CardTitle>
              <p className="text-gray-600 font-semibold">
                We'll get back to you within 24 hours with a comprehensive response
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    First Name
                  </label>
                  <Input placeholder="Enter your first name" className="py-3" />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Last Name
                  </label>
                  <Input placeholder="Enter your last name" className="py-3" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  Email Address
                </label>
                <Input type="email" placeholder="Enter your email" className="py-3" />
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  Phone Number
                </label>
                <Input type="tel" placeholder="Enter your phone number" className="py-3" />
              </div>
              
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you today?"
                />
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group border-0">
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send Message</span>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                We're Here to Help
              </h3>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Our dedicated support team is available 24/7 to assist you with any questions 
                about HIV prevention, PrEP services, or using our platform.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Fast Response Time",
                  description: "We respond to all inquiries within 24 hours during business days",
                  color: "bg-green-500"
                },
                {
                  icon: <Heart className="h-6 w-6" />,
                  title: "Confidential Support",
                  description: "All communications are private, secure, and handled with care",
                  color: "bg-pink-500"
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Expert Care Team",
                  description: "Healthcare professionals and certified support specialists",
                  color: "bg-indigo-500"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className={`p-3 ${item.color} rounded-lg text-white shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Locations */}
            <div className="bg-blue-500 rounded-xl p-6 border border-blue-600 shadow-xl clip-corner hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-700"></div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-700 rounded-lg mr-3 hover:scale-105 transition-transform duration-300">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">Our Regional Offices</h4>
              </div>
              <p className="text-white/90 leading-relaxed mb-4 font-semibold">
                We serve 15 counties across Kenya through our network of 50+ partner facilities. 
                Find the nearest healthcare provider through our facility locator.
              </p>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20">
                Find Nearest Facility
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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