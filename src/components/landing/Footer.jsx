import React, { useState } from 'react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Send, 
  Code2, 
  BookOpen, 
  Shield, 
  FileText, 
  MessageCircle,
  ExternalLink 
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Add your newsletter signup logic here
      console.log('Newsletter signup:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features', icon: <Code2 className="w-4 h-4" /> },
      { name: 'Documentation', href: '/docs', icon: <BookOpen className="w-4 h-4" /> },
      { name: 'API Reference', href: '/api', icon: <FileText className="w-4 h-4" /> },
      { name: 'Changelog', href: '/changelog', icon: <ExternalLink className="w-4 h-4" /> }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact', icon: <MessageCircle className="w-4 h-4" /> },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', icon: <Shield className="w-4 h-4" /> },
      { name: 'Terms of Service', href: '/terms', icon: <FileText className="w-4 h-4" /> },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
      { name: 'Security', href: '/security' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/fohalabi', icon: <Github className="w-5 h-5" />, color: 'hover:text-gray-300' },
    { name: 'Twitter', href: 'https://x.com/fohlabi', icon: <Twitter className="w-5 h-5" />, color: 'hover:text-blue-400' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/fohalabi', icon: <Linkedin className="w-5 h-5" />, color: 'hover:text-blue-500' },
    { name: 'Email', href: 'ayomideabimbola79@gmail.com', icon: <Mail className="w-5 h-5" />, color: 'hover:text-purple-400' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 border-t border-white/10">
      {/* Background pattern */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">CodeSnap AI</h3>
                <p className="text-sm text-gray-400">Smart code management</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              The most powerful AI-driven code snippet manager for developers. 
              Organize, search, and share your code like never before.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    {link.icon && <span className="group-hover:text-purple-400 transition-colors duration-300">{link.icon}</span>}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    {link.icon && <span className="group-hover:text-purple-400 transition-colors duration-300">{link.icon}</span>}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    {link.icon && <span className="group-hover:text-purple-400 transition-colors duration-300">{link.icon}</span>}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Stay Updated</h4>
            <p className="text-gray-400 text-sm">
              Get the latest updates and tips delivered to your inbox.
            </p>
            
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <button
                type="button"
                onClick={handleNewsletterSubmit}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 group"
              >
                <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            
            {isSubscribed && (
              <p className="text-green-400 text-sm flex items-center space-x-2">
                <span>✓</span>
                <span>Thanks for subscribing!</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CodeSnap AI. All rights reserved.
            </div>

            {/* Additional links */}
            <div className="flex items-center space-x-6">
              <a href="/support" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Support
              </a>
              <a href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Sitemap
              </a>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <span className="text-red-400 animate-pulse">♥</span>
                <span>for developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;