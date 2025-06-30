'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Building2, 
  Award, 
  Target,
  CheckCircle,
  MapPin,
  Shield,
  Sparkles
} from 'lucide-react'

export default function Partners() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-indigo-50/30 to-blue-100/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative p-5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200/50 shadow-lg backdrop-blur-sm">
              <Building2 className="h-14 w-14 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-700 bg-clip-text text-transparent mb-6">
            Our Trusted Partner
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-blue-600 max-w-4xl mx-auto leading-relaxed">
            Working together to deliver exceptional HIV prevention services across Kenya
          </p>
        </div>

        {/* Partner Spotlight */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-50/95 via-indigo-50/60 to-blue-100/80 border-2 border-blue-200/80 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"></div>
            <CardHeader className="pb-8">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Logo placeholder */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 border border-blue-100"></div>
                  <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 border border-blue-200/60 group-hover:border-blue-300/80 transition-all duration-300 h-32 w-64 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                    <img 
                      src="https://raw.githubusercontent.com/Remisteve/prep-software/refs/heads/main/public/chap.png" 
                      alt="CHAP Stawisha Logo"
                      className="max-w-full max-h-16 object-contain filter group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
                
                {/* Partner info */}
                <div className="flex-1 text-center md:text-left">
                  <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent mb-3">
                    CHAP Stawisha Project
                  </CardTitle>
                  <p className="text-lg font-semibold text-blue-600 mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full inline-block border border-blue-200">Christian Health Association of Kenya (CHAK)</p>
                  <p className="text-blue-700 text-lg leading-relaxed">
                    A CDC-funded project supporting HIV/TB/OVC services in faith-based and county health facilities across 15 counties in Kenya
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* About CHAK */}
                <div className="bg-gradient-to-br from-blue-50/80 to-white p-6 rounded-2xl border border-blue-200/60 shadow-sm">
                  <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mr-3 shadow-md">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    About CHAK
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Leading National Faith Based Organization (FBO) established in 1946",
                      "Promoting access to quality health care",
                      "Protestant churches' health facilities network",
                      "Nearly 80 years of healthcare excellence"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 group">
                        <div className="p-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-sm mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-blue-700 group-hover:text-blue-800 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Impact */}
                <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/60 p-6 rounded-2xl border border-blue-200/60 shadow-sm">
                  <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <div className="p-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl mr-3 shadow-md">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Project Coverage
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "15 counties across Kenya",
                      "Offices in Meru, Embu, Kitui and Nairobi",
                      "Faith-based health facilities",
                      "County health facilities"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 group">
                        <div className="p-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-sm mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-blue-700 group-hover:text-blue-800 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Innovation Highlight */}
              <div className="bg-gradient-to-r from-blue-100/90 via-indigo-100/70 to-blue-100/90 rounded-2xl p-8 border border-blue-300/60 shadow-lg backdrop-blur-sm">
                <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <div className="p-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-xl mr-3 shadow-md">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  Innovation Spotlight
                </h4>
                <p className="text-blue-700 leading-relaxed text-lg">
                  CHAP Stawisha pioneered the innovative <span className="font-semibold text-blue-800 bg-gradient-to-r from-blue-200 to-indigo-200 px-3 py-1 rounded-full">"Red Carpet Strategy"</span> - a VIP approach to HIV testing and prevention that encourages men to seek health services through differentiated service delivery.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Stats */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl blur-xl opacity-25"></div>
          <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 rounded-3xl p-12 md:p-16 text-white overflow-hidden border border-blue-600/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Partnership Impact
              </h3>
              <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto mb-10 text-blue-100">
                Together with CHAP Stawisha, we're expanding HIV prevention services nationwide
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "15", label: "Counties Covered", icon: <MapPin className="h-8 w-8" /> },
                  { number: "4", label: "Regional Offices", icon: <Building2 className="h-8 w-8" /> },
                  { number: "1946", label: "CHAK Founded", icon: <Award className="h-8 w-8" /> },
                  { number: "CDC", label: "Funded Project", icon: <Shield className="h-8 w-8" /> }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-blue-100/20 via-white/15 to-blue-100/20 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-blue-100/30 group-hover:scale-105 transition-all duration-300 border border-blue-100/20">
                      <div className="flex justify-center mb-4 text-blue-100 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{stat.number}</div>
                      <div className="text-sm md:text-base opacity-90 font-medium text-blue-200">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200/40 to-blue-200/40 rounded-full blur-lg opacity-50"></div>
      </div>
    </section>
  )
}