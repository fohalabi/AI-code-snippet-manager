import React from 'react';
import { Star, Users, Code, Zap } from 'lucide-react';

const SocialProofSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "This tool has revolutionized how I organize my code snippets. I can find any piece of code in seconds!",
      author: "Sarah Chen",
      title: "Senior Frontend Developer",
      company: "TechFlow",
      avatar: "https://images.unsplash.com/photo-1553514029-1318c9127859?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5
    },
    {
      id: 2,
      quote: "The intelligent categorization and search features are incredible. It's like having a personal code librarian.",
      author: "Marcus Rodriguez",
      title: "Full Stack Engineer",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 3,
      quote: "Our entire development team switched to this platform. The collaboration features are game-changing.",
      author: "Emily Zhang",
      title: "Lead Developer",
      company: "CodeCraft Studios",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5
    }
  ];

  const stats = [
    {
      number: "15,000+",
      label: "Active Developers",
      icon: Users,
      color: "text-purple-400"
    },
    {
      number: "750,000+",
      label: "Code Snippets Organized",
      icon: Code,
      color: "text-pink-400"
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      icon: Zap,
      color: "text-purple-400"
    }
  ];

  const companies = [
    { name: "TechFlow", logo: "TF" },
    { name: "InnovateLab", logo: "IL" },
    { name: "CodeCraft", logo: "CC" },
    { name: "DevStream", logo: "DS" },
    { name: "ByteForge", logo: "BF" },
    { name: "CloudSync", logo: "CS" }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'text-yellow-400 fill-current'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 min-h-screen bg-gradient-to-hr from slate-900 via-purple-900 relative overflow-hidden">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by developers worldwide
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Join thousands of developers who are already organizing their code more efficiently
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-859 to-slate-900 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-6`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What developers are saying
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-slate-850 to-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group hover:-translate-y-1"
              >
                <div className="mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>
                <blockquote className="text-purple-100 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 ring-2 ring-purple-100"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-100">
                      {testimonial.title}
                    </div>
                    <div className="text-sm text-purple-600">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">
            Trusted by innovative companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-100 to-slate-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-white/50 group hover:bg-white/90"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  {company.logo}
                </div>
                <div className="mt-3 text-sm font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-lg border border-white/50 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
              Ready to join them?
            </h4>
            <p className="text-purple-100 mb-6">
              Start organizing your code snippets like a pro today
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;