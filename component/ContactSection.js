import React from 'react';

export default function HeroContactSection() {
  return (
    <section className="p-4 md:p-8 font-sans">
      {/* 
        Main Container 
        Added items-start so the text aligns to the top instead of stretching/bottom.
      */}
      <div className="relative w-full rounded-[1rem] overflow-hidden min-h-[700px] flex flex-col lg:flex-row p-6 md:p-12 gap-12 justify-between items-start">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')` 
          }}
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Left Side: Top-aligned Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-start text-white max-w-xl pt-4 md:pt-8">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight mb-6">
            We are ready to assist with your infrastructure.
          </h1>
          <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-md">
            From initial site feasibility to final project handover, our expert team is here to ensure your turnkey project is delivered seamlessly.
          </p>
        </div>

        {/* Right Side: Floating Form Card (Using your original form fields) */}
        <div className="relative z-10 w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-2xl shrink-0 mt-4 lg:mt-0">
          <h3 className="text-2xl font-bold mb-2 text-[#1a1a1a]">Get in Touch</h3>
          <p className="text-gray-500 text-sm mb-8">
            Define your project goals and identify areas where we can add value.
          </p>
          
          <form className="flex flex-col gap-6">
            <input 
              type="text" 
              placeholder="Full name" 
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a] transition-colors text-gray-800 placeholder-gray-400"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a] transition-colors text-gray-800 placeholder-gray-400"
            />
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a] transition-colors text-gray-800 placeholder-gray-400"
            />
            <textarea 
              placeholder="Message" 
              rows="4"
              className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a] transition-colors resize-none text-gray-800 placeholder-gray-400"
            ></textarea>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-br from-[#6dff9a] to-[#0b6827] cursor-pointer text-white py-4 px-8 rounded-full font-semibold hover:bg-black transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>Send a message</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}