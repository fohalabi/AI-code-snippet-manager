import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 100 code snippets",
        "Basic search & filtering",
        "5 collections",
        "Syntax highlighting",
        "Export to GitHub Gist"
      ],
      cta: "Get Started Free",
      popular: false,
      trustIndicator: "No credit card required"
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "For serious developers",
      features: [
        "Unlimited code snippets",
        "AI-powered smart search",
        "Unlimited collections",
        "Team collaboration",
        "Advanced code analytics",
        "Priority support",
        "Custom tags & labels",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true,
      trustIndicator: "14-day free trial"
    }
  ];

  return (
    <section id='pricing' className="py-20 bg-gradient-to-hr from slate-900 via-purple-900 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 30s linear infinite'
        }}
      ></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Start free and upgrade when you're ready to unlock more powerful features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? 'border-pink-400 shadow-2xl shadow-pink-500/20'
                  : 'border-white/20 hover:border-purple-400/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-300 ml-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-slate-300">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-pink-400' : 'text-purple-400'
                      }`} />
                      <span className="text-slate-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Indicator */}
              <div className="mb-6">
                <p className="text-sm text-slate-300 text-center">
                  ✨ {plan.trustIndicator}
                </p>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border border-slate-500'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Quick Feature Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 text-slate-300 font-medium">Features</th>
                  <th className="text-center py-4 text-slate-300 font-medium">Free</th>
                  <th className="text-center py-4 text-slate-300 font-medium">Pro</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                <tr className="border-b border-white/10">
                  <td className="py-4">Code Snippets</td>
                  <td className="text-center py-4">100</td>
                  <td className="text-center py-4">Unlimited</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4">Collections</td>
                  <td className="text-center py-4">5</td>
                  <td className="text-center py-4">Unlimited</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4">AI Search</td>
                  <td className="text-center py-4">
                    <span className="text-slate-400">✕</span>
                  </td>
                  <td className="text-center py-4">
                    <Check className="w-5 h-5 text-pink-400 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4">Team Collaboration</td>
                  <td className="text-center py-4">
                    <span className="text-slate-400">✕</span>
                  </td>
                  <td className="text-center py-4">
                    <Check className="w-5 h-5 text-pink-400 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Pricing CTA */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
              Need more details?
            </h4>
            <p className="text-slate-300 mb-6">
              Compare all features, see enterprise options, and find the perfect plan for your team
            </p>
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>See Full Pricing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-400">
              <span>✨ Free forever plan</span>
              <span>•</span>
              <span>💳 No credit card required</span>
              <span>•</span>
              <span>🔄 Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;