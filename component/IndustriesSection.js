import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function IndustriesSection() {
  // Turnkey Industry Data
  const industries = {
    leftTall: {
      title: 'Manufacturing & Industrial',
      subtitle: 'Factories, Warehouses & Logistics Parks',
      metric: '40+ Projects Delivered',
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    topWide: {
      title: 'Healthcare & Medical',
      subtitle: 'Hospitals, Clinics & Pharma Facilities',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    bottomLeft: {
      title: 'Commercial Space',
      subtitle: 'Corporate Offices',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    bottomRight: {
      title: 'Hospitality',
      subtitle: 'Hotels & Resorts',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    }
  };

  return (
    <section className="py-16 px-4 md:px-12 font-sans text-gray-900 ">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          {/* Overline */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#8DC63F]"></div>
            <span className="text-[#8DC63F] font-bold text-xs tracking-widest uppercase">
              Expertise
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Industries we serve
          </h2>
        </div>
        
        {/* View All Link */}
        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center gap-1 transition-colors">
          View all <ArrowRight size={16} />
        </a>
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-2 h-auto lg:h-[800px]">
        
        {/* LEFT PANEL: Tall Card (Spans 5 columns) */}
        <div className="lg:col-span-5 h-[400px] lg:h-full relative rounded-[1rem] overflow-hidden group cursor-pointer shadow-sm">
          {/* Background Image */}
          <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://www.pexels.com/download/video/17224715/" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          {/* Gradient to darken the bottom slightly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Dark Floating Info Box */}
          <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 rounded-xl bg-[#1A2520]/85 p-5 md:p-6 flex items-end justify-between transition-transform duration-300">
            <div>
              <h3 className="text-white font-medium text-lg md:text-xl mb-1">
                House Turnkey Projets
              </h3>
              <p className="text-gray-300 text-xs md:text-sm mb-3">
                
              </p>
              <p className="text-white font-bold text-lg md:text-sm">
               150+ projects Delivered
              </p>
            </div>
            {/* Action Button */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6dff9a] flex items-center justify-center text-black group-hover:scale-110 transition-transform shrink-0">
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Stacked Cards (Spans 7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4 md:gap-2 h-full">
  
  {/* TOP CARD: Wide Card */}
  <div className="h-[400px] lg:h-1/2 relative rounded-[1rem] overflow-hidden group cursor-pointer bg-white border border-gray-200 shadow-sm">
    
    {/* Background SVG Sketch - Modern Architecture */}
    <div className="absolute inset-0 w-full h-full p-8 transition-transform duration-700 group-hover:scale-105 opacity-60">
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-200">
        <path d="M100 350V150L250 100V350M250 150L400 200V350M400 150L600 50V350M600 200L750 250V350" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M150 170V350M200 155V350M300 180V350M350 195V350M450 125V350M500 100V350M550 75V350M650 215V350M700 235V350" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
        <path d="M0 350H800" stroke="currentColor" strokeWidth="2"/>
        <circle cx="600" cy="50" r="4" fill="#6dff9a"/>
        <circle cx="250" cy="100" r="4" fill="#6dff9a"/>
      </svg>
    </div>
    
    {/* Inner Text Container */}
    <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 rounded-xl bg-white/95 backdrop-blur-sm p-4 md:p-5 flex items-center justify-between border border-gray-100 shadow-sm">
      <div>
        <h3 className="text-gray-900 font-semibold text-lg mb-1">
          {industries.topWide.title}
        </h3>
        <p className="text-gray-500 text-xs md:text-sm font-medium">
          {industries.topWide.subtitle}
        </p>
      </div>
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6dff9a] flex items-center justify-center text-black group-hover:scale-110 transition-transform shrink-0 shadow-sm">
        <ArrowRight size={20} strokeWidth={2.5} />
      </div>
    </div>
  </div>

  {/* BOTTOM CARDS: Two Square Cards & One Large Right Card */}
  <div className="flex flex-col lg:flex-row gap-4 md:gap-2 lg:h-1/2">

    {/* Left Side - Two Stacked Cards */}
    <div className="flex flex-col w-full lg:w-1/2 gap-4 md:gap-2">

      {/* Card 1 */}
      <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer bg-white border border-gray-200 shadow-sm">
        
        {/* SVG Sketch - Blueprint Grid & Nodes */}
        <div className="absolute inset-0 w-full h-full p-4 transition-transform duration-700 group-hover:scale-105 opacity-80">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-200">
            <path d="M0 50H400M0 100H400M0 150H400M100 0V200M200 0V200M300 0V200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
            <path d="M50 150L150 50H250L350 150" stroke="#6dff9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="150" cy="50" r="4" fill="#6dff9a"/>
            <circle cx="250" cy="50" r="4" fill="#6dff9a"/>
          </svg>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
          <div>
            <h3 className="text-gray-900 text-lg font-bold">
              {industries.bottomLeft.title}
            </h3>
            <p className="text-gray-500 text-sm font-medium">
              {industries.bottomLeft.subtitle}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#6dff9a] flex items-center justify-center text-black shadow-sm">
            <ArrowRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer bg-white border border-gray-200 shadow-sm">
        
        {/* SVG Sketch - Tech / Infrastructure Outline */}
        <div className="absolute inset-0 w-full h-full p-4 transition-transform duration-700 group-hover:scale-105 opacity-80">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-200">
            <rect x="50" y="50" width="300" height="100" rx="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M100 50V150M300 50V150" stroke="currentColor" strokeWidth="2"/>
            <path d="M150 100L200 70L250 100L200 130L150 100Z" stroke="#6dff9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="200" cy="100" r="5" fill="#6dff9a"/>
          </svg>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
          <div>
            <h3 className="text-gray-900 text-lg font-bold">
              {industries.bottomRight.title}
            </h3>
            <p className="text-gray-500 text-sm font-medium">
              {industries.bottomRight.subtitle}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#6dff9a] flex items-center justify-center text-black shadow-sm">
            <ArrowRight size={18} strokeWidth={2.5} />
          </div>
        </div>
      </div>

    </div>

    {/* Right Side - One Large Card */}
    <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden group cursor-pointer bg-white border border-gray-200 shadow-sm">

      {/* SVG Sketch - Industrial / Factory Isometric Outline */}
      <div className="absolute inset-0 w-full h-full p-8 transition-transform duration-700 group-hover:scale-105 opacity-80">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-200">
          <path d="M50 250L200 150L350 250V350H50V250Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M50 250L200 320L350 250" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M200 150V320" stroke="currentColor" strokeWidth="2"/>
          <path d="M125 200V285M275 200V285" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
          {/* Factory smoke stacks */}
          <path d="M100 215V100M140 190V70" stroke="#6dff9a" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="100" cy="80" r="10" stroke="#6dff9a" strokeWidth="1.5" strokeDasharray="2 2"/>
          <circle cx="140" cy="50" r="15" stroke="#6dff9a" strokeWidth="1.5" strokeDasharray="2 2"/>
          {/* Gear / Industrial accent */}
          <path d="M280 180A20 20 0 1 1 240 180A20 20 0 0 1 280 180Z" stroke="#6dff9a" strokeWidth="2"/>
          <circle cx="260" cy="180" r="6" fill="#6dff9a"/>
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div>
          <h3 className="text-gray-900 text-xl font-bold">
            Manufacturing & Industrial
          </h3>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Factories, Warehouses & Logistics Parks
          </p>
        </div>

        <div className="w-12 h-12 rounded-full bg-[#6dff9a] flex items-center justify-center text-black transition-transform group-hover:scale-110 shadow-sm">
          <ArrowRight size={20} strokeWidth={2.5} />
        </div>
      </div>

    </div>

  </div>
</div>
        
      </div>
    </section>
  );
}