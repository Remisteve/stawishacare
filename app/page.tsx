'use client'

import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import PrepEducation from '@/components/landing/PrepEducation'
import Partners from '@/components/landing/Partners'
import Services from '@/components/landing/Services'
import ViolenceSupport from '@/components/landing/ViolenceSupport'
import EnhancedCTA from '@/components/landing/EnhancedCTA'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PrepEducation />
      <Partners />
      <Services />
      <ViolenceSupport />
      <EnhancedCTA />
      <Footer />
    </div>
  )
}