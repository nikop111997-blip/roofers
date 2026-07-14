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
          <div className="h-[400px] lg:h-1/2 relative rounded-[1rem] overflow-hidden group cursor-pointer shadow-sm">
            <img 
              src={industries.topWide.image} 
              alt={industries.topWide.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 rounded-xl bg-[#1A2520]/85 p-4 md:p-5 flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium text-lg mb-1">
                  {industries.topWide.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  {industries.topWide.subtitle}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6dff9a] flex items-center justify-center text-black group-hover:scale-110 transition-transform shrink-0">
                <ArrowRight size={20} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* BOTTOM CARDS: Two Square Cards */}
         <div className="flex flex-col lg:flex-row gap-4 md:gap-2 h-[180px] lg:h-1/2">

  {/* Left Side - Two Stacked Cards */}
  <div className="flex flex-col w-full lg:w-1/2 gap-4 md:gap-2">

    {/* Card 1 */}
    <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer">
      <img
        src={industries.bottomLeft.image}
        alt={industries.bottomLeft.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
        <div>
          <h3 className="text-white text-lg font-semibold">
            {industries.bottomLeft.title}
          </h3>
          <p className="text-gray-300 text-sm">
            {industries.bottomLeft.subtitle}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#6dff9a] flex items-center justify-center">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer">
      <img
        src={industries.bottomRight.image}
        alt={industries.bottomRight.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
        <div>
          <h3 className="text-white text-lg font-semibold">
            {industries.bottomRight.title}
          </h3>
          <p className="text-gray-300 text-sm">
            {industries.bottomRight.subtitle}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#6dff9a] flex items-center justify-center">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>

  </div>

  {/* Right Side - One Large Card */}
  <div className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden group cursor-pointer">

   <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://assets.mixkit.co/videos/25050/25050-720.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
      <div>
        <h3 className="text-white text-xl font-semibold">
          Manufacturing & Industrial
        </h3>

        <p className="text-gray-300 text-sm">
          Factories, Warehouses & Logistics Parks
        </p>
      </div>

      <div className="w-12 h-12 rounded-full bg-[#6dff9a] flex items-center justify-center">
        <ArrowRight size={20} />
      </div>
    </div>

  </div>

</div>
         
        </div>
        
      </div>
    </section>
  );
}