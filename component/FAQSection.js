'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Turnkey Service Provider FAQ Data
const faqs = [
  {
    id: 1,
    question: 'What exactly does your turnkey service include?',
    answer: 'Our turnkey solutions cover the entire project lifecycle. This includes initial site assessment, architectural design, engineering, procurement of materials, full construction, and the final operational handover.',
  },
  {
    id: 2,
    question: 'How do you ensure projects are completed on time?',
    answer: 'We utilize a streamlined single-contractor model with predefined workflows, rigorous scheduling, and unified project management to minimize delays and guarantee on-time delivery.',
  },
  {
    id: 3,
    question: 'Are there any hidden costs in your turnkey contracts?',
    answer: 'No. We pride ourselves on unmatched cost predictability. Once the project scope is finalized, we provide a comprehensive, transparent budget with zero hidden fees or unexpected overruns.',
  },
  {
    id: 4,
    question: 'Do you handle all regulatory compliance and safety standards?',
    answer: 'Absolutely. Our dedicated compliance team strictly adheres to all local building codes, environmental regulations, and safety standards to ensure 100% compliance on every job site.',
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1); // Default first item open

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-12 sm:py-24 px-6 md:px-12 lg:px-12 font-sans text-gray-900">
      <div className=" flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Heading & CTA Card */}
        <div className="w-full lg:w-5/12 flex flex-col">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6dff9a]/20 border border-[#6dff9a]/40 w-fit mb-8">
            <svg className="w-4 h-4 text-[#0b6827]" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-[#0b6827]">Turnkey Infrastructure Solutions</span>
          </div>

          <h2 className="text-3xl lg:text-6xl font-medium tracking-tight leading-tight mb-12 text-[#1a1a1a]">
            Frequently asked <br /> questions
          </h2>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-[#6dff9a] to-[#0b6827] rounded-[1rem] p-8 md:p-10 shadow-sm border border-indigo-50 mt-auto">
            <h3 className="text-3xl font-medium text-[#1a1a1a] mb-4">
              Still have a questions?
            </h3>
            <p className="text-gray-900 text-sm md:text-base leading-relaxed mb-8">
              Can't find the answer to your question regarding our infrastructure projects? Send us an email and we'll get back to you as soon as possible!
            </p>
            <button className="bg-[#ffffff] hover:bg-[#efefef] text-black px-8 py-3.5 rounded-lg font-medium transition-colors  w-fit">
              Send email
            </button>
          </div>

        </div>

        {/* Right Column: Accordion List */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4 mt-8 lg:mt-0">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div 
                key={faq.id} 
                className="bg-[#f8f9fa] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className="text-lg md:text-xl font-medium text-[#1a1a1a] pr-8">
                    {faq.question}
                  </span>
                  
                  {/* Toggle Icon */}
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-xl shadow-sm text-[#6dff9a] transition-transform duration-300">
                    <motion.svg 
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </button>

                {/* Animated Answer Section */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-gray-500 leading-relaxed text-sm md:text-base pr-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}