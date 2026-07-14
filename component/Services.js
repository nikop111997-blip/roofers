"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AArrowDownIcon, SquareArrowOutUpRightIcon } from 'lucide-react'; 
// Note: Adjusted icon import to standard 'lucide-react' based on common setups, change back if using a custom wrapper.

const services = [
  {
    id: '01',
    title: 'Concept & Feasibility Study',
    description: 'We evaluate the site conditions, define the project scope, and conduct rigorous financial feasibility analyses to establish clear budgets and timelines before any physical work begins.',
    link: '/services/concept-feasibility',
  },
  {
    id: '02',
    title: 'Engineering & Architectural Design',
    description: 'Our in-house architects and structural engineers create comprehensive layouts, 3D models, and MEP (Mechanical, Electrical, Plumbing) plans tailored to your specific requirements.',
    link: '/services/architectural-design',
  },
  {
    id: '03',
    title: 'Procurement & Material Sourcing',
    description: 'We manage all vendor relationships, negotiate purchase orders, and secure high-quality construction materials, ensuring everything arrives on-site exactly when needed.',
    link: '/services/procurement',
  },
  {
    id: '04',
    title: 'Construction & Site Execution',
    description: 'From earthworks and civil construction to specialized installations, our project managers oversee all site activities with strict adherence to safety and quality standards.',
    link: '/services/construction-execution',
  },
  {
    id: '05',
    title: 'Testing & Commissioning',
    description: 'Before handover, we rigorously test, calibrate, and fine-tune all integrated mechanical, electrical, and HVAC systems so your facility is fully operational on day one.',
    link: '/services/testing-commissioning',
  },
  {
    id: '06',
    title: 'Final Handover & Support',
    description: 'You receive the keys to a ready-to-use facility, complete with all as-built drawings, equipment warranties, operation manuals, and our dedicated post-execution support.',
    link: '/services/handover-support',
  },
];

export default function TurnkeyServices() {
  // Initialize with the first item open. Set to null if you want them all closed by default.
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    // If clicking the already open item, close it. Otherwise, open the clicked item.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white font-sans py-16 md:py-24">
      <div className=" px-6 md:px-12 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Video (Sticky) */}
          {/* Added 'sticky top-24' so the video stays with you as you scroll down the accordion */}
          <div className="sticky top-24 relative w-full h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-sm">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://assets.mixkit.co/videos/4010/4010-720.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Side: Interactive Services List */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold tracking-wider uppercase text-gray-950 mb-4 lg:mb-8 shrink-0">
              Our services
            </h2>
            
            <div className="flex flex-col w-full border-t border-gray-300">
              {services.map((service, index) => {
                const isExpanded = activeIndex === index;

                return (
                  <div key={service.id} className="border-b border-gray-300">
                    
                    {/* Header (Clickable Area) */}
                    <div 
                      className="w-full group flex items-center justify-between py-4 lg:py-5 transition-colors duration-300 cursor-pointer"
                      onClick={() => handleToggle(index)}
                    >
                      <div className="flex items-center gap-6 lg:gap-12 text-left">
                        <span className="text-sm font-medium text-gray-400 shrink-0">
                          {service.id}
                        </span>
                        <h3 className={`text-base md:text-xl lg:text-xl font-normal transition-colors duration-300 ${isExpanded ? 'text-emerald-900' : 'text-gray-800 group-hover:text-black'}`}>
                          {service.title}
                        </h3>
                      </div>

                      {/* Toggle Button */}
                      <div className={`w-8 h-8 md:w-12 md:h-12 border rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-4 ${
                        isExpanded 
                          ? 'border-emerald-800 bg-emerald-800 text-white' 
                          : 'border-gray-400 bg-transparent text-gray-700 group-hover:border-black group-hover:text-black'
                      }`}>
                        <AArrowDownIcon className={`w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
                      </div>
                    </div>

                    {/* Expandable Content Panel */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-[3.5rem] md:pl-[5.5rem] pr-4">
                            <p className="text-gray-600 mb-5 text-sm lg:text-base leading-relaxed">
                              {service.description}
                            </p>
                            
                            <a 
                              href={service.link}
                              style={{
                                background: "linear-gradient(135deg, #6dff9a 0%, #4fd97a 55%, #34c266 100%)",
                              }}
                              className="inline-flex items-center gap-2 text-black px-5 py-2.5 lg:px-6 lg:py-3 rounded-full text-xs lg:text-sm font-medium hover:opacity-90 transition-opacity duration-300"
                            >
                              Explore this service
                              <SquareArrowOutUpRightIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}