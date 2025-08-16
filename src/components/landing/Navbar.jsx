import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCloseLargeFill } from 'react-icons/ri'
import { ArrowRight } from 'lucide-react';

const styles = {
    link:" scroll-smooth text-gray-300 hover:bg-white/40 hover:shadow-md px-6 py-1 rounded-md transition-colors duration-700",
    button: "group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-90 hover:shadow-2xl hover:shadow-purple-500/25",
    mobileButton: "group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-90 hover:shadow-2xl hover:shadow-purple-500/25"
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
        <nav className='bg-slate-900/95 backdrop-blur-xl border-b border-gray-800/50 text-black sticky top-0 z-50 w-full p-4'>
            <div className='flex justify-between items-center mx-auto container'>

                {/* Desktop navbar */}
                <div className='hidden md:flex w-full'>
                    <div className='w-full'>
                        <div className='flex justify-between items-center'>
                            <div className="flex-shrink-0 flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">C</span>
                                </div>
                                <span className="ml-2 text-lg font-semibold text-white">CodeSnap</span>
                            </div>
                            <ul className='flex space-x-4 items-center'>
                                <li><a href="#features" className={styles.link}>Features</a></li>
                                <li><a href="#" className={styles.link}>Pricing</a></li>
                                <li><a href="#" className={styles.link}>Blog</a></li>
                                <li><a href="#" className={styles.link}>About</a></li>
                                <li><button 
                                        className={styles.button}
                                        onClick={() => navigate('/auth')}
                                    >
                                        <span>Get Started</span>
                                        <ArrowRight className='w-4 h-4'/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Mobile navbar header */}
                <div className='md:hidden w-full'>
                    <div className='w-full'>
                        <div className='flex justify-between items-center'>
                            <div className="flex-shrink-0 flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">C</span>
                                </div>
                                <span className="ml-2 text-lg font-semibold text-white">CodeSnap</span>
                            </div>
                            <div className='cursor-pointer bg-slate-700/50 p-2 rounded-md hover:bg-slate-700/70 transition-colors'>
                                <GiHamburgerMenu size={20} onClick={toggleMenu} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* Mobile sidebar overlay */}
        {isMenuOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={toggleMenu}
            />
        )}

        {/* Mobile sidebar */}
        <div className={`
            fixed top-0 right-0 h-full w-1/2 bg-slate-900/95 backdrop-blur-xl z-50 
            transform transition-transform duration-300 ease-in-out md:hidden border-l border-gray-800/50
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
            {/* Sidebar Header */}
            <div className='flex justify-between items-center p-4 border-b border-gray-800/50'>
                <div className='cursor-pointer bg-slate-700/50 p-2 rounded-md hover:bg-slate-700/70 transition-colors'>
                    <RiCloseLargeFill size={18} onClick={toggleMenu} className="text-white" />
                </div>
            </div>

            {/* Sidebar Content */}
            <div className='p-6 space-y-6'>
                <ul className='flex space-y-4 flex-col'>
                    <li>
                        <a href="#features" 
                           className="scroll-smooth text-gray-300 hover:bg-white/40 hover:text-white px-4 py-3 rounded-md transition-all duration-300 block hover:shadow-md"
                           onClick={toggleMenu}>
                            Features
                        </a>
                    </li>
                    <li>
                        <a href="#pricing" 
                           className="scroll-smooth text-gray-300 hover:bg-white/40 hover:text-white px-4 py-3 rounded-md transition-all duration-300 block hover:shadow-md"
                           onClick={toggleMenu}>
                            Pricing
                        </a>
                    </li>
                    <li>
                        <a href="#" 
                           className="text-gray-300 hover:bg-white/40 hover:text-white px-4 py-3 rounded-md transition-all duration-300 block hover:shadow-md"
                           onClick={toggleMenu}>
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="#" 
                           className="text-gray-300 hover:bg-white/40 hover:text-white px-4 py-3 rounded-md transition-all duration-300 block hover:shadow-md"
                           onClick={toggleMenu}>
                            About
                        </a>
                    </li>
                </ul>
                
                <div className="pt-4">
                    <button 
                        className={`${styles.mobileButton} w-full justify-center`}
                        onClick={() => {
                            navigate('/auth');
                            toggleMenu();
                        }}
                    >
                        <span>Get Started</span>
                        <ArrowRight className='w-4 h-4'/>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar