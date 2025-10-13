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
    <div>
        <Navbar/>
        <HeroSection />
        <Statistics/>
        <FeaturesSection id="features"/>
        <CommunitySection id="community"/>
        <InsightsSection id="insights"/>
        <CTASection/>
        <Footer/>
      
    </div>
  )
}

export default HomePage
