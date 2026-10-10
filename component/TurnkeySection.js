import React from 'react';
import Image from 'next/image';
import { 
  Building, 
  PenTool, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  Info, 
  BriefcaseBusiness,
  MonitorCloud,
  ScreenShare,
  Smartphone
} from 'lucide-react';
import ProductCardGrid from './ProductCardGrid';

export default function TurnkeySection() {
  const features = [
    { icon: <Smartphone className="w-6 h-6 text-gray-600" />, title: 'End-to-End Managment Tracking Via App' },
    { icon: <MonitorCloud className="w-6 h-6 text-gray-600" />, title: 'Digital Mentorship of Your Project' },
    { icon: <Hammer className="w-6 h-6 text-gray-600" />, title: 'Expert Construction' },
    { icon: <ShieldCheck className="w-6 h-6 text-gray-600" />, title: 'Quality Assurance' },
    { icon: <Clock className="w-6 h-6 text-gray-600" />, title: 'On-Time Delivery' },
    { icon: <BriefcaseBusiness className="w-6 h-6 text-gray-600" />, title: 'Cost Management' },
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

     {/* <ProductCardGrid /> */}
    </section>
  );
}