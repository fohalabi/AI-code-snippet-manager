import React, { useState, useEffect } from 'react';
import { Search, Code, Sparkles, ArrowRight, Play, Copy, Star } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Section from '../ui/Section';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSnippet, setActiveSnippet] = useState(0);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const CodeSnippets = [
        {
            language: 'JavaScript',
            title: 'Array Filter & Map',
            code: `const  users = data.filter(user => user.active)
        .map(user => ({...user, role: 'member' }));`
        },
        {
            language: 'Python',
            title: 'API Request Handler',
            code: `async def fetch_data(url):
        response = await client.get(url)
        return response.json()`
        },
        {
            language: 'React',
            title: 'Custom Hook',
            code: `const useLocalStorage = (key, initial) => {
        const [value, setValue] = useState(initial);
        //Hook logic here...
    }`
        },
    ];

    useEffect(() => {
        const interval = setInterval(() =>{
            setActiveSnippet((prev) => (prev + 1) % CodeSnippets.length);
        }, 3000);
        return () => clearInterval(interval); 
    }, []);

    return(
        <Section minHeight={true} containerSize="default">
            <div className='grid lg:grid-cols-2 gap-12 items-center min-h-screen'>
                {/* Left Content */}
                <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-purple-300 text-sm font-medium">
                        <Sparkles className='w-4 h-4' />
                        AI-Powered Code Organization
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Organize Your{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Code Snippets
                        </span>{' '}
                        with AI Intelligence
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                        Stop wasting time searching through scattered code. Our AI understands your snippets, 
                        automatically categorizes them, and helps you find exactly what you need in seconds.
                        <br />
                        <br />
                        Transform your coding workflow with intelligent organization and instant discovery.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                            variant="primary" 
                            size="lg"
                            icon={<ArrowRight className="w-5 h-5" />}
                        >
                            Get Started Free
                        </Button>

                        <Button 
                            variant="secondary" 
                            size="lg"
                            icon={<Play className="w-5 h-5" />}
                            iconPosition="left"
                        >
                            Watch Demo
                        </Button>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-6 pt-4">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="text-gray-400">4.9/5 from 2,000+ developers</span>
                        </div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <div className="relative">
                        {/* Main Interface Mockup */}
                        <Card variant="interface">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-gray-400 text-sm">CodeSnippet AI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4 text-gray-400" />
                                    <Code className="w-4 h-4 text-purple-400" />
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <input 
                                    type="text" 
                                    placeholder="Search your snippets with AI..." 
                                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                </div>
                            </div>

                            {/* Code Snippet Display */}
                            <div className="space-y-4">
                            {CodeSnippets.map((snippet, index) => (
                                <Card
                                    key={index}
                                    variant="code"
                                    className={`${
                                        activeSnippet === index 
                                            ? 'border-purple-500/50 scale-105 shadow-lg shadow-purple-500/10' 
                                            : 'border-gray-700/50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                                                {snippet.language}
                                            </span>
                                            <span className="text-gray-400 text-sm">{snippet.title}</span>
                                        </div>
                                        <Copy className="w-4 h-4 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
                                    </div>
                                    <pre className="text-gray-300 text-sm overflow-hidden">
                                        <code>{snippet.code}</code>
                                    </pre>
                                </Card>
                            ))}
                        </div>

                        {/* AI Suggestions */}
                        <Card variant="suggestion" className="mt-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-300 text-sm font-medium">AI Suggestions</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Based on your recent searches, you might need: "React useEffect cleanup", "Python async/await patterns"
                            </p>
                        </Card>
                    </Card>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-purple-500 p-3 rounded-xl shadow-lg animate-bounce">
                        <Code className="w-6 h-6 text-white" />
                    </div>
          
                    <div className="absolute -bottom-4 -left-4 bg-pink-500 p-3 rounded-xl shadow-lg animate-pulse">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            </div>
        </Section>
    );
};

export default HeroSection