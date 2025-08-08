import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Section from '../ui/Section';

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
    <Section id='pricing'>
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
          <Card
            key={index}
            variant="pricing"
            popular={plan.popular}
          >
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
            <Button
              variant={plan.popular ? "gradient" : "slate"}
              fullWidth
              size="lg"
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <Card variant="cta" className="mb-12">
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
      </Card>

      {/* Full Pricing CTA */}
      <div className="text-center">
        <Card variant="cta" className="max-w-2xl mx-auto">
          <h4 className="text-2xl font-bold text-white mb-4">
            Need more details?
          </h4>
          <p className="text-slate-300 mb-6">
            Compare all features, see enterprise options, and find the perfect plan for your team
          </p>
          <Button
            variant="gradient"
            icon={<ArrowRight className="w-5 h-5" />}
            className='mx-auto'
          >
            See Full Pricing
          </Button>
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-slate-400">
            <span>✨ Free forever plan</span>
            <span>•</span>
            <span>💳 No credit card required</span>
            <span>•</span>
            <span>🔄 Cancel anytime</span>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default PricingSection;