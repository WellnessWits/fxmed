'use client'

import { useState } from 'react'

export default function VideoSection() {
  return (
    <section id="video-section" className="bg-green-deep py-[90px] px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-block text-gold bg-gold/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-4">
            Watch & Learn
          </div>
          
          {/* Heading */}
          <h2 className="font-dm-sans font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
            Patient education<br/>you can actually use
          </h2>
          
          {/* Description */}
          <p className="font-dm-sans text-cream/80 text-[1.05rem] leading-[1.7] max-w-[600px] mx-auto">
            Real conversations, expert insights, and practical guidance from the FXMed team.
          </p>
          
          {/* Video Placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl bg-black/20 aspect-video">
              <iframe 
                className="w-full h-full rounded-[20px]"
                src="https://www.youtube.com/embed/EciXbeQd9So"
                title="FXMed Featured Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mt-8">
            <a 
              href="https://www.youtube.com/@witsfxmed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-dm-sans bg-gold text-green-deep px-8 py-4 rounded-[50px] font-semibold text-[1rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg inline-block"
            >
              View All Videos on YouTube →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
