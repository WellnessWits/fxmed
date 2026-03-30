'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            className="h-[120px] w-auto"
          />
        </a>
        
        <ul className="flex gap-8 list-none m-0 font-dm-sans">
          <li><a href="#about" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">About</a></li>
          <li><a href="#programs" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">Programs</a></li>
          <li><a href="#services" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">Services</a></li>
          <li><a href="#pricing" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">Pricing</a></li>
          <li><a href="#gallery" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">Gallery</a></li>
          <li><a href="#contact" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">Contact</a></li>
          <li><a href="/blog" className="text-cream/85 text-[0.9rem] font-medium no-underline transition-colors hover:text-gold">Blog</a></li>
        </ul>
        
        <a 
          href="https://outlook.office.com/book/FXMedAppointment@wellnesswits.com/s/cLNpEWZfGkWVlIC6hJnipA2?ismsaljsauthenabled" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-dm-sans bg-gold text-green-deep px-6 py-[10px] rounded-[30px] font-semibold text-[0.88rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px]"
        >
          Book Appointment
        </a>
      </div>
    </nav>
  )
}
