import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiCloseLargeFill } from 'react-icons/ri'

const styles = {
    link:"text-indigo-700 font-bold hover:text-white px-6 py-1 rounded-md transition-colors duration-700",
    button: "bg-indigo-700 text-white px-2 py-1 rounded-full hover:bg-indigo-700 hover:shadow-md hover:scale-92 transition-all duration-300 whitespace-nowrap",
    mobileButton: "bg-indigo-600 text-white px-4 py-3 rounded-full hover:bg-indigo-700 hover:scale-92 transtion-all duration-300 w-full whitespace-nowrap"
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <nav className='bg-transparent p-3 text-white relative top-4'>
        <div className='flex justify-between items-center mx-auto container'>

            {/* Desktop navbar */}
            <div className='hidden md:flex absolute left-1/2 transform -translate-x-1/2 mt-2 w-[90%]'>
                <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-8 py-1 shadow-lg w-full'>
                    <div className='flex justify-between item-center'>
                        <div className='w-36 text-3xl text-indigo-700 hover:text-white'>
                            <span className='font-bold mt-2'>code</span>
                            <span>vault</span>
                        </div>
                        <ul className='flex space-x-4 items-center'>
                            <li><a href="#" className={styles.link}>Features</a></li>
                            <li><a href="#" className={styles.link}>Pricing</a></li>
                            <li><a href="#" className={styles.link}>Blog</a></li>
                            <li><a href="#" className={styles.link}>About</a></li>
                            <li><button className={styles.button}>Get Started</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Mobile navbar - expamdable container */}
            <div className='md:hidden absolute left-1/2 transform -translate-x-1/2 mt-2 w-[90%]'>
                <div className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-1 shadow-lg w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='text-2xl text-indigo-700 hover:text-white'>
                            <span className='font-bold'>code</span>
                            <span>vault</span>
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
                        <li><a href="#" className="text-indigo-700 font-bold hover:text-white px-6 py-1 rounded-md transition-all duration-300 block">Features</a></li>
                        <li><a href="#" className="text-indigo-700 font-bold hover:text-white px-6 py-1 rounded-md transition-all duration-300 block">Pricing</a></li>
                        <li><a href="#" className="text-indigo-700 font-bold hover:text-white px-6 py-1 rounded-md transition-all duration-300 block">Blog</a></li>
                        <li><a href="#" className="text-indigo-700 font-bold hover:text-white px-6 py-1 rounded-md transition-all duration-300 block">About</a></li>
                    </ul>
                    <button className={`${styles.mobileButton}`}>Get Started</button>
                </div>
            </div>
        )} 
    </nav>
  )
}

export default Navbar