import React, { useState, useEffect } from 'react';
import { Search, Code, Sparkles, ArrowRight, Play, Copy, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Section from '../ui/Section';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSnippet, setActiveSnippet] = useState(0);
    const navigate = useNavigate();

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
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Content */}
                    <div className={`w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <div className="space-y-6">
                            
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium bg-gray-100 border border-gray-300 text-gray-700">
                                <Sparkles className='w-4 h-4' />
                                <span>AI-Powered Code Organization</span>
                            </div>      

                            {/* Main Headline */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                                    Organize Your{' '}
                                    <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                                        Code Snippets
                                    </span>{' '}
                                    with AI Intelligence
                                </h1>

                                {/* Subheadline */}
                                <p className="text-lg md:text-xl leading-relaxed text-gray-600">
                                    Stop wasting time searching through scattered code. Our AI understands your snippets, 
                                    automatically categorizes them, and helps you find exactly what you need in seconds.
                                </p>
                                
                                <p className="text-lg md:text-xl leading-relaxed text-gray-600">
                                    Transform your coding workflow with intelligent organization and instant discovery.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={() => navigate('/auth')}
                                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-95 hover:shadow-lg"
                                >
                                    <span>Get Started Free</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <button className="flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-95 border bg-white hover:bg-gray-50 text-black border-gray-300">
                                    <Play className="w-5 h-5" />
                                    <span>Watch Demo</span>
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-current text-gray-600" />
                                        ))}
                                    </div>
                                    <span className="text-gray-500">4.9/5 from 2,000+ developers</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className={`w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="relative w-full">
                            
                            {/* Main Interface Mockup */}
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-full">
                                
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span className="text-sm text-gray-600">CodeSnippet AI</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Search className="w-4 h-4 text-gray-600" />
                                        <Code className="w-4 h-4 text-gray-700" />
                                    </div>
                                </div>

                                {/* Search Bar */}
                                <div className="relative mb-6">
                                    <input 
                                        type="text" 
                                        placeholder="Search your snippets with AI..." 
                                        className="w-full bg-gray-50 border border-gray-300 text-black rounded-lg px-4 py-3 focus:outline-none focus:border-gray-500 transition-colors"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <Sparkles className="w-5 h-5 text-gray-700" />
                                    </div>
                                </div>

                                {/* Code Snippet Display */}
                                <div className="space-y-4">
                                    {CodeSnippets.map((snippet, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white border rounded-lg p-4 transition-all duration-300 ${
                                                activeSnippet === index 
                                                    ? 'scale-105 shadow-lg border-gray-400' 
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                                                        {snippet.language}
                                                    </span>
                                                    <span className="text-sm text-gray-600">{snippet.title}</span>
                                                </div>
                                                <Copy className="w-4 h-4 cursor-pointer transition-colors text-gray-500 hover:text-black" />
                                            </div>
                                            <pre className="text-sm overflow-x-auto text-black">
                                                <code>{snippet.code}</code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>

                                {/* AI Suggestions */}
                                <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Based on your recent searches, you might need: "React useEffect cleanup", "Python async/await patterns"
                                    </p>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="hidden lg:block absolute -top-4 -right-4 p-3 rounded-xl shadow-lg animate-bounce bg-black">
                                <Code className="w-6 h-6 text-white" />
                            </div>
              
                            <div className="hidden lg:block absolute -bottom-4 -left-4 p-3 rounded-xl shadow-lg animate-pulse bg-gray-600">
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