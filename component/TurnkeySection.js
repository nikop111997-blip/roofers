import React from 'react';
import Image from 'next/image';
import { 
  Building, 
  PenTool, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  Info, 
  BriefcaseBusiness
} from 'lucide-react';

export default function TurnkeySection() {
  const features = [
    { icon: <Building className="w-6 h-6 text-gray-600" />, title: 'End-to-End Management' },
    { icon: <PenTool className="w-6 h-6 text-gray-600" />, title: 'Custom Design' },
    { icon: <Hammer className="w-6 h-6 text-gray-600" />, title: 'Expert Construction' },
    { icon: <ShieldCheck className="w-6 h-6 text-gray-600" />, title: 'Quality Assurance' },
    { icon: <Clock className="w-6 h-6 text-gray-600" />, title: 'On-Time Delivery' },
    { icon: <BriefcaseBusiness className="w-6 h-6 text-gray-600" />, title: 'Professional Team' },
  ];

  return (
    <section className=" px-4 py-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Top Features Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center p-6 border-0 sm:border-r-1 border-gray-100 text-center transition-shadow"
          >
            <div className="mb-3 p-3 ">
              {feature.icon}
            </div>
            <span className="text-sm font-medium text-gray-800 leading-tight w-24">
              {feature.title}
            </span>
          </div>
        ))}
      </div>

      {/* Header Section */}
      <div className="mb-12">
   
      </div>

      {/* Bento Grid / Masonry Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        
        {/* Card 1: Tall Dark Card */}
        <div className="bg-white border border-gray-100 shadow text-black rounded-xl p-6 h-[400px] flex flex-col justify-between">
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
            <Image 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" 
              alt="Project Planning" 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Trusted Project Managers</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping clients maximize value with strategic planning and execution.
            </p>
          </div>
        </div>

        {/* Card 2: Short Green Card */}
        <div className="bg-gradient-to-br from-[#6dff9a] to-[#0b6827] text-white rounded-xl p-8 h-[280px] flex flex-col justify-between">
          <div className="text-6xl font-light">150+</div>
          <div>
            <h3 className="text-xl font-medium mb-1">Completed Projects</h3>
            <p className="text-[#e0ffe6] text-sm leading-relaxed">
              Guided by precision, quality, and professional execution.
            </p>
          </div>
        </div>

        {/* Card 3: Tall Dark Card (Testimonial) */}
        <div className="bg-white border border-gray-100 shadow text-black rounded-xl p-6 h-[400px] flex flex-col justify-between">
          <div>
            <p className="text-lg font-medium leading-relaxed mb-6">
              "Seamless process from design to handover. They handled everything with precision and care."
            </p>
            <div className="text-sm text-gray-400">
              <span className="block font-semibold text-white">Sarah Jenkins</span>
              Operations Director
            </div>
          </div>
          <div className="relative w-full h-32 rounded-lg overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" 
              alt="Completed Interior" 
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card 4: Short Green Card */}
        <div className="bg-gradient-to-br from-[#6dff9a] to-[#0b6827] text-white rounded-xl p-8 h-[280px] flex flex-col justify-between">
          <div>
            <p className="text-xl font-medium leading-relaxed">
              Awards for excellence in commercial design and build.
            </p>
          </div>
          <div className="text-6xl font-light">12</div>
        </div>

      </div>
    </section>
  );
}