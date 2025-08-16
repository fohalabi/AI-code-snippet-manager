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
            <div className='grid lg:grid-cols-2 gap-12 items-center min-h-screen'>
                {/* Left Content */}
                <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-ai-purple/10 border border-ai-purple/20 rounded-full px-4 py-2 text-ai-purple-light text-sm font-medium">
                        <Sparkles className='w-4 h-4' />
                        AI-Powered Code Organization
                    </div>      

                    {/* Main Headline */}
                    <h1 className="text-5xl lg:text-6xl font-bold text-ai-light leading-tight">
                        Organize Your{' '}
                        <span className="bg-gradient-to-r from-ai-purple to-ai-purple-light bg-clip-text text-transparent">
                            Code Snippets
                        </span>{' '}
                        with AI Intelligence
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-ai-light/70 leading-relaxed max-w-lg">
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
                            onClick={() => navigate('/auth')}
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
                                    <Star key={i} className="w-5 h-5 text-ai-purple fill-current" />
                                ))}
                            </div>
                            <span className="text-ai-light/60">4.9/5 from 2,000+ developers</span>
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
                                    <span className="text-ai-light/60 text-sm">CodeSnippet AI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Search className="w-4 h-4 text-ai-light/60" />
                                    <Code className="w-4 h-4 text-ai-purple" />
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-6">
                                <input 
                                    type="text" 
                                    placeholder="Search your snippets with AI..." 
                                    className="w-full bg-ai-dark-lighter/50 border border-ai-purple/30 rounded-lg px-4 py-3 text-ai-light placeholder-ai-light/50 focus:outline-none focus:border-ai-purple transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Sparkles className="w-5 h-5 text-ai-purple" />
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
                                            ? 'border-ai-purple/50 scale-105 shadow-lg shadow-ai-purple/20' 
                                            : 'border-ai-purple/20'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs bg-ai-purple/20 text-ai-purple-light px-2 py-1 rounded">
                                                {snippet.language}
                                            </span>
                                            <span className="text-ai-light/60 text-sm">{snippet.title}</span>
                                        </div>
                                        <Copy className="w-4 h-4 text-ai-light/40 hover:text-ai-light cursor-pointer transition-colors" />
                                    </div>
                                    <pre className="text-ai-light text-sm overflow-hidden">
                                        <code>{snippet.code}</code>
                                    </pre>
                                </Card>
                            ))}
                        </div>

                        {/* AI Suggestions */}
                        <Card variant="suggestion" className="mt-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-ai-purple" />
                                <span className="text-ai-purple-light text-sm font-medium">AI Suggestions</span>
                            </div>
                            <p className="text-ai-light/60 text-sm">
                                Based on your recent searches, you might need: "React useEffect cleanup", "Python async/await patterns"
                            </p>
                        </Card>
                    </Card>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-ai-purple p-3 rounded-xl shadow-lg shadow-ai-purple/30 animate-bounce">
                        <Code className="w-6 h-6 text-ai-light" />
                    </div>
          
                    <div className="absolute -bottom-4 -left-4 bg-ai-purple-light p-3 rounded-xl shadow-lg shadow-ai-purple-light/30 animate-pulse">
                        <Sparkles className="w-6 h-6 text-ai-dark" />
                    </div>
                </div>
            </div>
            </div>
        </Section>
    );
};

export default HeroSection