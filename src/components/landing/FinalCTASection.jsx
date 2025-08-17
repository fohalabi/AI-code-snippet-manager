import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Lightbulb, Lock, Star, CheckCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const FinalCTASection = () => {
  const navigate = useNavigate ();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    // Add your navigation logic here
    navigate('/auth');
  };

  return (
    <section className="min-h-screen flex items-center justify-center">

      {/* Enhanced floating particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-60"
          style={{
            background: 'linear-gradient(45deg, rgb(75, 85, 99), rgb(107, 114, 128))',
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
            animation: `particleFloat 15s infinite ease-in-out ${i * 3}s`
          }}
        ></div>
      ))}
      
      {/* Additional glow effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className={`text-center max-w-4xl px-8 py-16 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Main headline with glow effect */}
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight"
          style={{
            textShadow: '0 0 20px rgba(75, 85, 99, 0.3)',
            animation: 'titleGlow 3s ease-in-out infinite alternate'
          }}
        >
          Ready to Supercharge Your Coding Workflow?
        </h2>
        
        {/* Enhanced CTA Button with shimmer effect */}
        <button
          onClick={handleGetStarted}
          className="group relative inline-flex items-center gap-3 px-12 py-5 text-xl font-semibold text-white bg-gradient-to-r from-black via-gray-800 to-gray-900 rounded-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden my-8"
          style={{
            boxShadow: '0 10px 25px rgba(75, 85, 99, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          <span className="relative z-10">Get Started</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
        </button>

        {/* Benefits recap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          {[
            {
              icon: <Zap className="w-6 h-6 text-gray-700" />,
              title: "Lightning Fast",
              description: "Find any snippet instantly"
            },
            {
              icon: <Lightbulb className="w-6 h-6 text-gray-700" />,
              title: "AI-Powered",
              description: "Smart suggestions & automation"
            },
            {
              icon: <Lock className="w-6 h-6 text-gray-700" />,
              title: "Secure & Private",
              description: "Your code stays protected"
            }
          ].map((benefit, index) => (
            <div
              key={index}
              className="group p-6 bg-black/5 border border-black/10 rounded-2xl backdrop-blur-sm hover:bg-black/10 hover:border-gray-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-black mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-600">
          {[
            { icon: <Star className="w-6 h-6 text-gray-700 fill-current" />, text: "Free 14-day trial" },
            { icon: <CheckCircle className="w-6 h-6 text-gray-700" />, text: "No credit card required" },
            { icon: <MessageCircle className="w-6 h-6 text-gray-700" />, text: "24/7 support" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 hover:text-black transition-colors duration-300">
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;