import React, { useState, useEffect } from 'react';
import { Search, Code, Sparkles, ArrowRight, Play, Copy, Star } from 'lucide-react';

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
        <div className='min-h-screen bg-gradient-to-hr from slate-900 via-purple-900 relative overflow-hidden'>
            {/* Animated Background Elements */}      
            <div className='absolute inset-0'>
                <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className='absolute inset-0 bg-grid-white/[0.02] bg-grid-16'></div>

            <div className='relative z-10 container mx-auto px-6 py-20'>
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

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center justify-center gap-3">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="group border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:bg-purple-500/10">
                                <Play className="w-5 h-5" />
                                Watch Demo
                            </button>
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
                            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
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
                                    <div
                                        key={index}
                                        className={`bg-gray-900/50 rounded-lg p-4 border transition-all duration-500 ${
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
                                    </div>
                                ))}
                            </div>

                            {/* AI Suggestions */}
                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span className="text-purple-300 text-sm font-medium">AI Suggestions</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Based on your recent searches, you might need: "React useEffect cleanup", "Python async/await patterns"
                                </p>
                            </div>
                        </div>

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
            </div>
        </div>
    );
};

export default HeroSection