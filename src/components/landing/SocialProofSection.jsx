import React from 'react';
import { Star, Users, Code, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Section from '../ui/Section';

const SocialProofSection = () => {
  const navigate = useNavigate();
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
      color: "text-gray-600"
    },
    {
      number: "750,000+",
      label: "Code Snippets Organized",
      icon: Code,
      color: "text-black"
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      icon: Zap,
      color: "text-gray-600"
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
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Section minHeight={true} containerSize="lg">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-black mb-4">
          Trusted by developers worldwide
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join thousands of developers who are already organizing their code more efficiently
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {stats.map((stat, index) => (
          <Card key={index} variant="stats">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className={`text-4xl font-bold text-black mb-2`}>
              {stat.number}
            </div>
            <div className="text-gray-600 font-medium">
              {stat.label}
            </div>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-black text-center mb-12">
          What developers are saying
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} variant="testimonial">
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 ring-2 ring-gray-200"
                />
                <div>
                  <div className="font-semibold text-black">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Logos */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-8">
          Trusted by innovative companies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <Card key={index} variant="company">
              <div className="w-16 h-16 mx-auto bg-gray-200 hover:bg-black rounded-lg flex items-center justify-center text-gray-700 hover:text-white font-bold text-lg transition-all duration-300">
                {company.logo}
              </div>
              <div className="mt-3 text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {company.name}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <Card variant="cta" className="max-w-2xl mx-auto">
          <h4 className="text-2xl font-bold text-black mb-4">
            Ready to join them?
          </h4>
          <p className="text-gray-600 mb-6">
            Start organizing your code snippets like a pro today
          </p>
          <Button 
            variant="primary"
            className='mx-auto'
            onClick={() => navigate('/auth')}
          >
            Get Started Free
          </Button>
        </Card>
      </div>
    </Section>
  );
};

export default SocialProofSection;