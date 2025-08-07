import React from 'react';
import { Search, Code2, Languages, Users } from 'lucide-react';

const FeatureSection = () => {
    const feature = [
        {
            icon: Search,
            title: "AI-Powered Search",
            description: "Find any snippet instantly with intelligent search that understands context and intent. Our AI automatically categorizes and tags your code for effortless organization."
        },
        {
            icon: Code2,
            title: "Smart Code Generation",
            description: "Generate code snippets from natural language descriptions. Transform ideas into working code with AI assistance that learns your coding patterns and preferences."
        },
        {
            icon: Languages,
            title: "Cross-Language Support",
            description: "Work seamlessly across Python, JavaScript, Java, C++, and 50+ programming languages. Unified syntax highlighting and intelligent suggestions for all your projects."
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Share snippets with your team, collaborate on code libraries, and maintain consistent coding standards. Real-time sync keeps everyone on the same page."
        }
    ];

  return (
    <section id='features' className="py-20 px-4 min-h-screen bg-gradient-to-hr from slate-900 via-purple-900 relative overflow-hidden">
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
        <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                    Why Choose CodeSnap AI?
                </h2>
                <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                    Revolutionize your development workflow with intelligent code management and AI-powered assistance
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {feature.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 
                                    shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 
                                    hover:-translate-y-2 hover:bg-white/15 relative overflow-hidden"
                        >
                            {/* Gradient border effect on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
                                style={{ padding: '2px' }}>
                                <div className="w-full h-full bg-slate-900/90 rounded-2xl"></div>
                            </div>

                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 
                                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
                            </div>

                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl 
                              flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 
                              transition-transform duration-300 shadow-lg">
                                <Icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-purple-100 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                                {feature.description}
                            </p>

                            {/* Floating elements for visual interest */}
                            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 
                              rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                              rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA section */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                        <span className="text-slate-200 text-sm font-medium">Trusted by 50,000+ developers worldwide</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeatureSection
