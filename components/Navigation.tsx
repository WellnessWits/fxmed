'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isBlogPage = pathname?.startsWith('/blog')

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-green-deep/95 backdrop-blur-md border-b border-gold/20' 
        : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-[5%] py-[18px]">
        <a href="#" className="flex items-center no-underline">
          <img 
            src="/logo.png" 
            alt="FXMed" 
            className="h-[120px] w-auto md:h-[120px] h-[80px]"
          />
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8 list-none m-0 font-dm-sans">
          <li><a href="#about" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>About</a></li>
          <li><a href="#programs" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>Programs</a></li>
          <li><a href="#services" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>Services</a></li>
          <li><a href="#pricing" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>Pricing</a></li>
          <li><a href="#gallery" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>Gallery</a></li>
          <li><a href="#contact" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>Contact</a></li>
          <li><a href="/blog" className={`text-[0.9rem] font-medium no-underline transition-colors hover:text-gold ${(isBlogPage && !isScrolled) ? 'text-black' : 'text-cream/85'}`}>Blog</a></li>
        </ul>
        
        {/* Desktop CTA Button */}
        <a 
          href="https://outlook.office.com/book/FXMedAppointment@wellnesswits.com/s/cLNpEWZfGkWVlIC6hJnipA2?ismsaljsauthenabled" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden lg:block font-dm-sans bg-gold text-green-deep px-6 py-[10px] rounded-[30px] font-semibold text-[0.88rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px]"
        >
          Book Appointment
        </a>

        {/* Mobile Hamburger Menu */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''} ${(isBlogPage && !isScrolled) ? 'bg-black' : 'bg-cream'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} ${(isBlogPage && !isScrolled) ? 'bg-black' : 'bg-cream'}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${(isBlogPage && !isScrolled) ? 'bg-black' : 'bg-cream'}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className={`px-[5%] py-6 ${
          isScrolled || isMobileMenuOpen 
            ? 'bg-green-deep/95 backdrop-blur-md' 
            : 'bg-green-deep/95'
        }`}>
          <ul className="flex flex-col gap-4 list-none m-0 font-dm-sans">
            <li><a href="#about" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">About</a></li>
            <li><a href="#programs" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">Programs</a></li>
            <li><a href="#services" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">Services</a></li>
            <li><a href="#pricing" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">Pricing</a></li>
            <li><a href="#gallery" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">Gallery</a></li>
            <li><a href="#contact" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">Contact</a></li>
            <li><a href="/blog" onClick={closeMobileMenu} className="block text-[1rem] font-medium no-underline transition-colors hover:text-gold text-cream/85 py-2">Blog</a></li>
          </ul>
          
          <div className="mt-6 pt-6 border-t border-cream/20">
            <a 
              href="https://outlook.office.com/book/FXMedAppointment@wellnesswits.com/s/cLNpEWZfGkWVlIC6hJnipA2?ismsaljsauthenabled" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="block w-full text-center font-dm-sans bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px]"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
