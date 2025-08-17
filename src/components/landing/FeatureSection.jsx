import React from 'react';
import { Search, Code2, Languages, Users } from 'lucide-react';
import Card from '../ui/Card';
import Section from '../ui/Section';

const FeatureSection = () => {
    const features = [
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
        <Section id='features' minHeight={true}>
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-black mb-6 tracking-tight">
                    Why Choose CodeSnap AI?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Revolutionize your development workflow with intelligent code management and AI-powered assistance
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={index} variant="feature">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-black rounded-xl 
                              flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 
                              transition-transform duration-300 shadow-lg">
                                <Icon className="w-8 h-8 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-semibold text-black mb-4 group-hover:text-gray-800 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                                {feature.description}
                            </p>
                        </Card>
                    );
                })}
            </div>

            {/* CTA section */}
            <div className="text-center mt-16">
                <div className="inline-flex items-center space-x-2 bg-gray-100 backdrop-blur-lg rounded-full px-6 py-3 border border-gray-300">
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                    <span className="text-gray-700 text-sm font-medium">Trusted by 50,000+ developers worldwide</span>
                </div>
            </div>
        </Section>
    );
}

export default FeatureSection