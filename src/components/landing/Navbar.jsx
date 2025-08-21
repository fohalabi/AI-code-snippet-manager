import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navigationItems = [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Blog', href: 'https://medium.com/@fohlabi' },
        { name: 'About', href: '#about' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavClick = (href) => {
        // Close sidebar first
        setIsMobileMenuOpen(false);
        
        // Handle navigation after sidebar closes
        setTimeout(() => {
            if (href.startsWith('#')) {
                // Scroll to section
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (href.startsWith('http')) {
                // Open external link
                window.open(href, '_blank', 'noopener, noreferrer');
            }
        }, 300); // Wait for sidebar animation to complete
    };

    return (
        <>
            <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">C</span>
                            </div>
                            <span className="ml-2 text-lg font-semibold text-gray-900">CodeSnap</span>
                        </div>

                        {/* Desktop Navigation - Centered */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-1">
                                {navigationItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Get Started Button */}
                        <div className="flex items-center space-x-4">
                            <button 
                                className="group hidden md:flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-95 hover:shadow-lg"
                                onClick={() => navigate('/auth')}
                            >
                                <span>Get Started</span>
                                <ArrowRight className='w-4 h-4'/>
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 z-50 relative"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`
                fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden
                transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="ml-2 text-lg font-semibold text-gray-900">CodeSnap</span>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col justify-between" style={{ height: 'calc(100vh - 73px)' }}>
                    {/* Navigation Links */}
                    <div className="flex-1 py-6 px-6">
                        <div className="space-y-2">
                            {navigationItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href)}
                                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors text-gray-700 hover:text-gray-900 hover:bg-gray-100 flex items-center"
                                >
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Get Started Button at Bottom */}
                    <div className="p-6 border-t border-gray-200">
                        <button 
                            className="group flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-95 w-full"
                            onClick={() => {
                                console.log('Sidebar Get Started clicked'); // Debug log
                                setIsMobileMenuOpen(false);
                                navigate('/auth');
                            }}
                        >
                            <span>Get Started</span>
                            <ArrowRight className='w-4 h-4'/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;