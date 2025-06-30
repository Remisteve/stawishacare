'use client'

import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import PrepEducation from '@/components/landing/PrepEducation'
import Partners from '@/components/landing/Partners'
import Services from '@/components/landing/Services'
import CareSuite from '@/components/landing/CareSuite'
import ViolenceSupport from '@/components/landing/ViolenceSupport'
import EnhancedCTA from '@/components/landing/EnhancedCTA'
import About from '@/components/landing/About'
import Contact from '@/components/landing/Contact'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PrepEducation />
      <Partners />
      <Services />
      <CareSuite />
      <ViolenceSupport />
      <EnhancedCTA />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}