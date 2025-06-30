'use client'

import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Heart, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Users,
  Stethoscope,
  Award,
  Lock,
  Info,
  FileText,
  Globe,
  Activity,
  ArrowRight
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Patient Services",
      color: "text-blue-300",
      links: [
        { icon: Users, label: "Register as Patient", href: "#" },
        { icon: Calendar, label: "Book Appointment", href: "#" },
        { icon: Shield, label: "PrEP Services", href: "#" },
        { icon: Heart, label: "Wellness Support", href: "#" },
        { icon: Phone, label: "24/7 Hotline", href: "#" }
      ]
    },
    {
      title: "Healthcare Providers",
      color: "text-emerald-300",
      links: [
        { icon: Stethoscope, label: "Provider Portal", href: "#" },
        { icon: Users, label: "Patient Management", href: "#" },
        { icon: Calendar, label: "Schedule Management", href: "#" },
        { icon: Award, label: "Training Resources", href: "#" },
        { icon: Shield, label: "Clinical Guidelines", href: "#" }
      ]
    },
    {
      title: "Resources & Education",
      color: "text-purple-300",
      links: [
        { icon: Info, label: "About PrEP", href: "#" },
        { icon: Heart, label: "Support Groups", href: "#" },
        { icon: Phone, label: "Crisis Support", href: "#" },
        { icon: MapPin, label: "Find Facilities", href: "#" },
        { icon: FileText, label: "Educational Materials", href: "#" }
      ]
    },
    {
      title: "Legal & Compliance",
      color: "text-orange-300",
      links: [
        { icon: Lock, label: "Privacy Policy", href: "#" },
        { icon: FileText, label: "Terms of Service", href: "#" },
        { icon: Shield, label: "Security Standards", href: "#" },
        { icon: Info, label: "Compliance Reports", href: "#" },
        { icon: Mail, label: "Legal Inquiries", href: "#" }
      ]
    }
  ]

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "24/7 Emergency Support",
      value: "+254 700 000 000",
      description: "Crisis intervention & immediate assistance",
      bg: "bg-blue-500"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "General Support",
      value: "support@prepguard.co.ke",
      description: "Technical support & general inquiries",
      bg: "bg-emerald-500"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Headquarters",
      value: "Nairobi, Kenya",
      description: "Serving 15 counties nationwide",
      bg: "bg-purple-500"
    }
  ]

  const impactStats = [
    { label: "Patients Served", value: "10,000+", icon: <Users className="h-5 w-5" />, bg: "bg-blue-500" },
    { label: "Partner Facilities", value: "50+", icon: <Stethoscope className="h-5 w-5" />, bg: "bg-emerald-500" },
    { label: "Counties Covered", value: "15", icon: <Globe className="h-5 w-5" />, bg: "bg-purple-500" },
    { label: "Years of Excellence", value: "5+", icon: <Award className="h-5 w-5" />, bg: "bg-orange-500" }
  ]

  const partnerships = [
    { name: "CHAP Stawisha", role: "Primary Implementation Partner", bg: "bg-blue-500" },
    { name: "CHAK", role: "Faith-Based Network Coordinator", bg: "bg-emerald-500" },
    { name: "CDC Kenya", role: "Technical & Financial Support", bg: "bg-purple-500" },
    { name: "Ministry of Health", role: "Policy & Regulatory Framework", bg: "bg-orange-500" }
  ]

  return (
    <footer className="relative overflow-hidden bg-navy-900" style={{ backgroundColor: '#1e293b' }}>
      {/* Navy Blue Background with subtle elements */}
      <div className="absolute inset-0 bg-navy-900" style={{ backgroundColor: '#1e293b' }}></div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8 group">
                <div className="relative">
                  <div className="p-3 bg-blue-600 rounded-xl shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-300">PrepGuard</h3>
                  <p className="text-sm text-gray-400 font-semibold">HIV Prevention Platform</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-base">
                Transforming HIV prevention and wellness across Kenya with innovative 
                technology and compassionate care. Empowering everyone with knowledge for prevention.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className={`p-3 ${contact.bg} rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <div className="text-white">
                        {contact.icon}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm font-semibold">{contact.label}</span>
                      <div className="text-white font-bold text-base">{contact.value}</div>
                      <p className="text-gray-400 text-sm">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                {impactStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                    <div className={`inline-flex p-2 ${stat.bg} rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-300 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h4 className={`text-lg font-bold mb-6 ${section.color}`}>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group py-2"
                      >
                        <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                          <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-sm font-semibold">{link.label}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Section */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-center">
                <Globe className="h-6 w-6 mr-3 text-blue-400" />
                Strategic Partnerships
              </h4>
              <p className="text-gray-300 text-base font-semibold">Collaborating with leading organizations to transform healthcare delivery</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerships.map((partner, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className={`inline-flex p-2 ${partner.bg} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h5 className="text-white font-bold text-base mb-2">{partner.name}</h5>
                  <p className="text-gray-300 text-sm font-semibold">{partner.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="border-t border-white/20 bg-blue-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-white mb-6">
                <span className="text-blue-400">Power</span>
                <span className="text-white mx-3">•</span>
                <span className="text-emerald-400">Protects</span>
                <span className="text-white mx-3">•</span>
                <span className="text-purple-400">Prepare</span>
              </h4>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-semibold">
                Empowering everyone with knowledge for prevention. Join the movement. 
                Be part of the generation that ends HIV.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300 text-center md:text-left text-sm font-semibold">
                © {currentYear} PrepGuard. All rights reserved. 
                <span className="inline-flex items-center ml-2">
                  Made with <Heart className="h-4 w-4 text-red-400 mx-1" /> in Kenya
                </span>
              </p>
              
              <div className="flex items-center gap-6">
                {[
                  { icon: Award, label: "ISO 27001 Certified", color: "text-yellow-400", bg: "bg-yellow-500" },
                  { icon: Shield, label: "HIPAA Compliant", color: "text-green-400", bg: "bg-green-500" },
                  { icon: Lock, label: "256-bit Encrypted", color: "text-blue-400", bg: "bg-blue-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group">
                    <div className={`p-1 ${item.bg} rounded-md group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center space-x-4 text-white">
              <Phone className="h-5 w-5 text-red-200" />
              <span className="text-base font-bold">
                Emergency Support: Call <strong>1195</strong> for immediate assistance
              </span>
              <Activity className="h-5 w-5 text-red-200" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}