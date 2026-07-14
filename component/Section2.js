import React from 'react';

export default function Section1() {
  return (
    <div className='px-0 sm:px-12'>
    <section className="relative w-full h-screen rounded-2xl overflow-hidden text-white font-sans bg-gray-900 ">
      
      {/* BACKGROUND VIDEO */}
      {/* Autoplay, muted, and loop are required for background videos to play properly on modern browsers */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {/* Recommend replacing this src with a construction, engineering, or project management background video */}
        <source src="https://www.pexels.com/download/video/37837991/ " type="video/mp4" />
      </video>

      {/* OVERLAY - Darkens the video slightly so text is readable */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>

      {/* TOP-LEFT NAVIGATION BAR */}
      {/* Uses rounded-br-[4.5rem] to create the distinct cut-out effect from the image */}
      <div className="absolute top-0 left-0 bg-white text-gray-900 px-8 py-3 rounded-br-[4.5rem] flex items-center gap-10 z-20 shadow-lg">
        {/* Logo Area */}
        <div className="font-bold text-lg flex items-center gap-2 cursor-pointer">
        We Deliver
          
        </div>
      </div>

      {/* MAIN CONTENT OVERLAY */}
      <div className="relative z-10 flex h-full items-center px-8 lg:px-24">
        
        {/* LEFT TEXT BLOCK */}
        <div className="max-w-3xl mt-12">
          {/* Main Headline */}
          <h1 className="text-2xl md:text-5xl font-bold leading-tight mb-8 drop-shadow-md">
            End-to-End<br />Turnkey Solutions.
          </h1>

          {/* Stats Divider Row */}
          <div className="flex gap-10 border-t-2 border-white/30 pt-6 mb-10">
            <div className="max-w-[200px]">
              <h3 className="text-xl sm:text-3xl font-bold mb-2">250+</h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                successful turnkey projects delivered globally across industrial sectors.
              </p>
            </div>
            <div className="max-w-[200px]">
              <h3 className="text-xl sm:text-3xl font-bold mb-2">100%</h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                seamless execution from initial blueprint to final operational handover.
              </p>
            </div>
          </div>

        
        </div>
      </div>

      {/* BOTTOM-RIGHT FLOATING ACTION BUTTON */}
      {/* Uses rounded-tl-[1.5rem] for the reverse cut-out look */}
      <div className="absolute bottom-0 right-0 bg-white text-gray-900 px-6 py-4 rounded-tl-[1.5rem] z-20 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <span className="text-sm font-bold">Contact Us</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      
    </section>
    </div>
  );
}