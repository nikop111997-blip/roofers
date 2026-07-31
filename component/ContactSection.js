import React from 'react';
import ContactForm from './ContactForm';

export default function HeroContactSection() {
  return (
    <section className="p-4 md:p-8 font-sans">
      {/* 
        Main Container 
        Added items-start so the text aligns to the top instead of stretching/bottom.
      */}
      <div className="relative w-full rounded-[1rem] overflow-hidden min-h-[700px] flex flex-col lg:flex-row p-6 md:p-12 gap-12 justify-between items-start">
        
        {/* Background Image */}
            <div className="absolute inset-0 z-0">
           <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>

        {/* Left Side: Top-aligned Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-start text-black max-w-xl pt-4 md:pt-8">
       
        </div>

        {/* Right Side: Floating Form Card (Using your original form fields) */}
        <div className="relative z-10 w-full max-w-[520px] bg-white rounded-3xl p-8 shadow-2xl shrink-0 mt-4 lg:mt-0">
          <h3 className="text-2xl font-bold mb-2 text-[#1a1a1a]">Get in Touch</h3>
          <p className="text-gray-500 text-sm mb-8">
            Define your project goals and identify areas where we can add value.
          </p>
          
        <ContactForm />
        </div>

      </div>
    </section>
  );
}