import React from 'react'
import Navbar from './LangingPage/Navbar'
import HeroSection from './LangingPage/HeroSection'
import Statistics from './LangingPage/Statistics'
import FeaturesSection from './LangingPage/FeaturesSection'
import CommunitySection from './LangingPage/CommunitySection'
import InsightsSection from './LangingPage/InsightsSection'
import CTASection from './LangingPage/CTASection'
import Footer from './LangingPage/Footer'

function HomePage() {
  return (
    <div className="min-h-screen">
        <Navbar/>
        <HeroSection />
        <Statistics/>
        <FeaturesSection />
        <CommunitySection />
        <InsightsSection />
        <CTASection/>
        <Footer/>
      
    </div>
  )
}

export default HomePage
