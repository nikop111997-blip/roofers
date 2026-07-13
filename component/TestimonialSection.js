'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    quote: 'Their end-to-end management eliminated all our coordination headaches, delivering the facility ahead of schedule.',
    details: 'Trust their execution. The streamlined single-contractor model completely transformed our infrastructure development process with zero hidden costs.',
    name: 'Michael Sterling',
    role: 'Operations Director, Apex Logistics',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    quote: 'From initial blueprint to final handover, the engineering process was exceptionally seamless and transparent.',
    details: 'Their predefined workflows and rigorous safety compliance ensured our high-rise project was completed without a single regulatory delay.',
    name: 'Elena Rodriguez',
    role: 'VP of Development, UrbanCore Properties',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    quote: 'Unmatched cost predictability. We achieved a 100% successful rollout across three industrial sites.',
    details: 'Having one point of accountability vastly simplified our communication. The quality of the final handover exceeded all our operational standards.',
    name: 'David Chen',
    role: 'CEO, Nexus Manufacturing',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    quote: 'The single-point accountability meant we didn’t have to juggle contractors. A truly flawless execution.',
    details: 'They delivered our state-of-the-art warehouse facility exactly to spec. The level of detail in their feasibility planning is unmatched in the industry.',
    name: 'Sarah Jenkins',
    role: 'Managing Director, Pinnacle Infra',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    quote: 'Uncompromising safety standards and quality control. Our plant was commissioned three weeks early.',
    details: 'The turnkey approach shielded us from market volatility. Their procurement network ensured high-grade materials were always on-site when needed.',
    name: 'Robert Okafor',
    role: 'Head of Operations, Crescent Industries',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&q=80&w=400',
    quote: 'Turnkey execution at its finest. From initial feasibility to the final fit-out, they managed every complexity.',
    details: 'A highly professional team that integrates structural engineering with practical cost-saving measures. We will absolutely partner with them again.',
    name: 'Amanda Lin',
    role: 'Project Lead, Vertex Commercial',
  }
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play loop effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  // Calculate the two visible cards
  const visibleCards = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length]
  ];

  return (
    <section className="w-full py-12 sm:py-24 px-6 sm:px-12 font-sans text-gray-900">
      <div className="">
        
        {/* Header Section */}
        <div className=" mb-16">
          <div className="gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">What Clients Say</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-6 text-[#1a1a1a]">
            Honest Feedback <br /> From Valued Partners
          </h2>
        </div>

        {/* Two-Column Carousel Wrapper */}
        <div className="relative overflow-hidden min-h-[500px] md:min-h-[420px] mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full"
            >
              {visibleCards.map((testimonial, idx) => (
                <div 
                  key={`${testimonial.id}-${idx}`} 
                  className="bg-white rounded-[1rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex flex-col h-full border border-gray-100"
                >
                  {/* Background Quote Watermark */}
                  <div className="absolute top-6 right-8 text-[8rem] leading-none font-serif text-gray-50 opacity-60 select-none pointer-events-none">
                    ”
                  </div>

                  {/* 5 Stars */}
                  <div className="relative z-10 flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#6dff9a]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    <h3 className="text-xl md:text-2xl font-medium text-[#1a1a1a] leading-snug mb-4">
                      {testimonial.quote}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                      {testimonial.details}
                    </p>
                  </div>

                  {/* Author Profile Area */}
                  <div className="relative z-10 flex items-center gap-4 mt-auto border-t border-gray-100 pt-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#6dff9a]"
                    />
                    <div>
                      <h4 className="font-bold text-[#1a1a1a] text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls (Arrows & Dots) */}
        <div className="flex items-center justify-between mt-8 max-w-sm mx-auto md:max-w-none md:justify-center md:gap-12">
          
          {/* Previous Arrow */}
          <button 
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-[#6dff9a] hover:text-[#1a1a1a] hover:border-[#6dff9a] transition-all shadow-sm"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index 
                    ? 'w-8 h-2.5 bg-[#6dff9a]' 
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button 
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-[#6dff9a] hover:text-[#1a1a1a] hover:border-[#6dff9a] transition-all shadow-sm"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
        </div>

      </div>
    </section>
  );
}