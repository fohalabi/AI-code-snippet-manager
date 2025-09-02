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
        <Section minHeight={true} containerSize="default">
            <div className='grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-screen px-4 sm:px-6 lg:px-0'>
                {/* Left Content */}
                <div className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium bg-gray-100 border border-gray-300 text-gray-700">
                        <Sparkles className='w-3 h-3 sm:w-4 sm:h-4' />
                        AI-Powered Code Organization
                    </div>      

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black">
                        Organize Your{' '}
                        <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                            Code Snippets
                        </span>{' '}
                        with AI Intelligence
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-none lg:max-w-lg text-gray-600">
                        Stop wasting time searching through scattered code. Our AI understands your snippets, 
                        automatically categorizes them, and helps you find exactly what you need in seconds.
                        <br className="hidden sm:block" />
                        <br className="hidden sm:block" />
                        Transform your coding workflow with intelligent organization and instant discovery.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button 
                            onClick={() => navigate('/auth')}
                            className="group flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-95 hover:shadow-lg text-sm sm:text-base"
                        >
                            <span>Get Started Free</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        <button 
                            className="font-semibold px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-95 border bg-white hover:bg-gray-50 text-black border-gray-300 text-sm sm:text-base"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Watch Demo</span>
                            </div>
                        </button>
                    </div>

                    {/* Social Proof */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-gray-600" />
                                ))}
                            </div>
                            <span className="text-sm sm:text-base text-gray-500">4.9/5 from 2,000+ developers</span>
                        </div>
                    </div>
                </div>

                {/* Right Visual */}
                <div className={`transition-all duration-1000 delay-300 mt-8 lg:mt-0 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <div className="relative scale-90 sm:scale-95 lg:scale-100">
                        {/* Main Interface Mockup */}
                        <Card variant="interface">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-600">CodeSnippet AI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                                    <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-4 sm:mb-6">
                                <input 
                                    type="text" 
                                    placeholder="Search your snippets with AI..." 
                                    className="w-full bg-gray-50 border border-gray-300 text-black rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:border-gray-500 transition-colors text-sm sm:text-base"
                                />
                                <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
                                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                                </div>
                            </div>

                            {/* Code Snippet Display */}
                            <div className="space-y-3 sm:space-y-4">
                            {CodeSnippets.map((snippet, index) => (
                                <Card
                                    key={index}
                                    variant="code"
                                    className={`${
                                        activeSnippet === index 
                                            ? 'scale-105 shadow-lg border-gray-400' 
                                            : 'border-gray-200'
                                    } bg-white border transition-all duration-300`}
                                >
                                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <span className="text-xs px-2 py-0.5 sm:py-1 rounded bg-gray-200 text-gray-700">
                                                {snippet.language}
                                            </span>
                                            <span className="text-xs sm:text-sm text-gray-600 truncate">{snippet.title}</span>
                                        </div>
                                        <Copy 
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer transition-colors text-gray-500 hover:text-black flex-shrink-0"
                                        />
                                    </div>
                                    <pre className="text-xs sm:text-sm overflow-x-auto text-black">
                                        <code>{snippet.code}</code>
                                    </pre>
                                </Card>
                            ))}
                        </div>

                        {/* AI Suggestions */}
                        <Card variant="suggestion" className="mt-4 sm:mt-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                                <span className="text-xs sm:text-sm font-medium text-gray-700">AI Suggestions</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                                Based on your recent searches, you might need: "React useEffect cleanup", "Python async/await patterns"
                            </p>
                        </Card>
                    </Card>

                    {/* Floating Elements - Hidden on mobile for cleaner look */}
                    <div className="hidden sm:block absolute -top-4 -right-4 p-3 rounded-xl shadow-lg animate-bounce bg-black">
                        <Code className="w-6 h-6 text-white" />
                    </div>
          
                    <div className="hidden sm:block absolute -bottom-4 -left-4 p-3 rounded-xl shadow-lg animate-pulse bg-gray-600">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
            </div>
        </Section>
    );
};

export default HeroSection