"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Turnkey-focused content
const text = "We design, build, and deliver — you operate. From greenfield concepts to fully operational facilities, we bridge the gap between ambition and reality. You invest in a vision — we handle absolutely everything else: complex engineering, strategic procurement, and seamless construction execution. Every milestone is managed in-house to guarantee precision, safety, and on-time handover. Complete infrastructure. Zero hidden friction. Maximum operational efficiency. We build the foundation — you scale the future.";
export default function AboutSection() {
  const containerRef = useRef(null);
  
  // Track the scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Animation starts when the top of the container hits 80% of the viewport height
    // Animation ends when the bottom of the container hits 50% of the viewport height
    offset: ["start 80%", "end 50%"],
  });

  // Split the text into an array of words
  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="w-full  py-20 px-6 md:px-12 flex justify-center"
    >
      <div className=" grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
        
        {/* Left Column: Label */}
        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="text-[#1a3a2e] text-lg font-medium tracking-tight md:sticky md:top-32">
            About Us
          </h2>
        </div>

        {/* Right Column: Animated Text */}
        <div className="md:col-span-9 lg:col-span-10">
          <p className="text-xl md:text-5xl lg:text-3xl font-medium leading-[1.0] text-[#1a2b25] flex flex-wrap gap-x-2 md:gap-x-3 lg:gap-x-4">
            {words.map((word, i) => {
              // Calculate the animation range for this specific word
              const start = i / words.length;
              const end = start + 1 / words.length;
              
              // Highlight specific words (e.g., "you succeed.")
              const isHighlight = word.includes("succeed");

              return (
                <Word 
                  key={i} 
                  progress={scrollYProgress} 
                  range={[start, end]}
                  isHighlight={isHighlight}
                >
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual animated words
const Word = ({ children, progress, range, isHighlight }) => {
  // Map the scroll progress to opacity (from 20% to 100%)
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block mt-2">
      {/* 1. Base faded text (always visible in background) */}
      <span className="absolute opacity-20 text-[#1a3a2e]">
        {children}
      </span>
      
      {/* 2. Filling text (opacity increases on scroll) */}
      <motion.span 
        style={{ opacity }} 
        className={isHighlight ? "text-[#34c266]" : "text-[#1a3a2e]"}
      >
        {children}
      </motion.span>
    </span>
  );
};