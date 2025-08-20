import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorks from '../components/landing/HowItWorkSection';
import SocialProofSection from '../components/landing/SocialProofSection';
import PricingPreviewSection from '../components/landing/PricingPreviewSection';
import FinalCTASection from '../components/landing/FinalCTASection';
import Footer from '../components/landing/Footer';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { user, loading } = useAuth()
  console.log('LandingPage - user:', user, 'loading:', loading);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <HowItWorks /> 
      <SocialProofSection />
      <PricingPreviewSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}

export default LandingPage
