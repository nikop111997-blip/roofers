import React from 'react';

export default function ContactSection() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12 lg:px-12 font-sans">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">
        
        {/* Left Side: Information */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-[#1a1a1a]">
              We are ready to assist with your infrastructure.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              From initial site feasibility to final project handover, our expert team is here to ensure your turnkey project is delivered seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-lg text-[#1a1a1a]">Call Center</h4>
              <p className="text-gray-500">+91 141 234 5678</p>
              <p className="text-gray-500">+91 987 654 3210</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-lg text-[#1a1a1a]">Our Location</h4>
              <p className="text-gray-500">Jaipur, Rajasthan</p>
              <p className="text-gray-500">Industrial Area, Phase 1</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-lg text-[#1a1a1a]">Email</h4>
              <p className="text-gray-500">projects@roofersinfratech.com</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-lg text-[#1a1a1a]">Social Network</h4>
              <div className="flex gap-4 mt-1">
                {/* Social placeholders - replace with your links */}
                <a href="#" className="text-gray-400 hover:text-[#1a1a1a] transition-colors">FB</a>
                <a href="#" className="text-gray-400 hover:text-[#1a1a1a] transition-colors">X</a>
                <a href="#" className="text-gray-400 hover:text-[#1a1a1a] transition-colors">IN</a>
                <a href="#" className="text-gray-400 hover:text-[#1a1a1a] transition-colors">YT</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-gradient-to-br from-[#6dff9a] to-[#0b6827] p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
         style={{
    background: `
      linear-gradient(to bottom right, #0b6827 0%, #6dff9a 100%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='120%25' filter='url(%23noiseFilter)' opacity='0.45'/%3E%3C/svg%3E")
    `,
    backgroundBlendMode: "soft-light",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
        >
          <h3 className="text-3xl font-bold mb-2 text-white">Get in Touch</h3>
          <p className="text-gray-50 mb-8">Define your project goals and identify areas where we can add value.</p>
          
          <form className="flex flex-col gap-6" >
            <input 
              type="text" 
              placeholder="Full name" 
              className="w-full bg-transparent border-b border-gray-50 py-3 outline-none focus:border-[#1a1a1a] transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full bg-transparent border-b border-gray-50 py-3 outline-none focus:border-[#1a1a1a] transition-colors"
            />
            <input 
              type="text" 
              placeholder="Subject" 
              className="w-full bg-transparent border-b border-gray-50 py-3 outline-none focus:border-[#1a1a1a] transition-colors"
            />
            <textarea 
              placeholder="Message" 
              rows="4"
              className="w-full bg-transparent border-b border-gray-50 py-3 outline-none focus:border-[#1a1a1a] transition-colors resize-none"
            ></textarea>
            
            <button 
              type="submit" 
              className="bg-[#1a1a1a] text-white py-4 px-8 rounded-full font-semibold hover:bg-[#333] transition-all flex items-center justify-center gap-2 w-fit mt-4"
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