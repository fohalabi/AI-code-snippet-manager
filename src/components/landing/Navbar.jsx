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
    <nav className='bg-slate-900/95 backdrop-blur-xl border-b border-gray-800/50 text-black sticky top-0 z-50 w-full p-4'>
        <div className='flex justify-between items-center mx-auto container'>

            {/* Desktop navbar */}
            <div className='hidden md:flex w-full'>
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                            <span className='font-bold'>Code</span>
                            <span>Snap</span>
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
            
            {/* Mobile navbar - expamdable container */}
            <div className='md:hidden w-full'>
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' >
                            <span className='font-bold'>Code</span>
                            <span>Snap</span>
                        </div>
                        <div className='cursor-pointer'>
                            {isMenuOpen ? <RiCloseLargeFill size={20} onClick={toggleMenu} /> : <GiHamburgerMenu size={20} onClick={toggleMenu} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile navbar menu - appear inside the same container */}   
        {isMenuOpen && (
            <div className='mt-6 pt-4 border-t border-white/20'>
                <div className='flex flex-col space-y-4 text-center'>

                    <ul className='flex space-y-4 flex-col'>
                        <li><a href="#features" className="scroll-smooth text-gray-300 hover:bg-white/40 px-6 py-1 rounded-md transition-all duration-300 block">Features</a></li>
                        <li><a href="#pricing" className="scroll-smooth text-gray-300 hover:bg-white/40 px-6 py-1 rounded-md transition-all duration-300 block">Pricing</a></li>
                        <li><a href="#" className="text-gray-300 hover:bg-white/40 px-6 py-1 rounded-md transition-all duration-300 block">Blog</a></li>
                        <li><a href="#" className="text-gray-300 hover:bg-white/40 px-6 py-1 rounded-md transition-all duration-300 block">About</a></li>
                    </ul>
                    <button 
                        className={`${styles.mobileButton}`}
                        onClick={() => navigate('/auth')}
                    >
                        <span>Get Started</span>
                        <ArrowRight className='w-4 h-4'/>
                    </button>
                </div>
            </div>
        )} 
    </nav>
  )
}

export default Navbar