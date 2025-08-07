import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeatureSection from '../components/landing/FeatureSection';
import HowItWorks from '../components/landing/HowItWorkSection';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      < HeroSection/>
      <FeatureSection />
      <HowItWorks />
    </>
  )
}

export default LandingPage
