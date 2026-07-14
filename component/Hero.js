"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// --- Liquid Glass Components ---
function GlassFilter({ id }) {
  return (
    <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
      <filter
        id={id}
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.012"
          numOctaves={2}
          seed={7}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation={2.5} result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale={34}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

function GlassSurface({
  filterId,
  className = "",
  radius = "9999px",
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-colors duration-300 ${className}`}
      style={{ borderRadius: radius }}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          backdropFilter: `url(#${filterId}) blur(14px) saturate(160%)`,
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.07) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-screen opacity-70"
        style={{
          borderRadius: radius,
          boxShadow:
            "inset 1px 0 0.5px rgba(134,227,149,0.25), inset -1px 0 0.5px rgba(255,150,180,0.15)",
        }}
      />
    </div>
  );
}
// -------------------------------

// Data tailored for all-encompassing Turnkey Projects
const statsData = [
  {
    id: 1,
    title: "100+ Projects",
    description: "Successfully delivered across commercial, industrial, and infrastructure sectors",
    icon: (
      <svg className="w-10 h-10 text-[#86e395]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" className="opacity-20" fill="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v10l7.5 4" className="text-[#86e395]" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "End-to-End",
    description: "100% in-house management from initial design to final operational handover",
    icon: (
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
          <motion.path
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: "100, 100" }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
            className="text-[#86e395]"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span className="absolute text-[9px] font-bold text-white">100%</span>
      </div>
    ),
  },
  {
    id: 3,
    title: "On-Time Delivery",
    description: "Strict adherence to timelines with uncompromised quality standards",
    icon: (
      <svg className="w-10 h-10 text-[#86e395]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17l6-6 4 4 8-10"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 5h4v4" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 15 },
  },
};

export default function HeroSection() {
  const filterId = useId().replace(/[:]/g, "");
  const cardFilterId = `glass-card-${filterId}`;

  return (
    <section className="relative h-[80vh] sm:min-h-screen w-full rounded-none sm:rounded-4xl flex items-center font-sans justify-center pt-24 pb-2 overflow-hidden bg-[#0a1410]">
      <GlassFilter id={cardFilterId} />

      {/* Background Image & Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1706808849827-7366c098b317" // Make sure this path exists
          alt="Large scale turnkey project development"
          fill
          className="object-cover object-center opacity-60 rotate-y-180 "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/10 to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1410] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10  px-8 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div className="absolute bottom-30 left-4 sm:left-10 w-full h-1/2 bg-gradient-to-t from-[#0a1410] to-transparent z-0">
        <motion.div
          className="lg:col-span-7 flex flex-col items-start space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-5xl font-semibold text-white leading-[1.1] tracking-tight drop-shadow-lg pr-4"
          >
            Concept to reality. <br className="hidden sm:block" />
            Complete turnkey solutions <br className="" />
            <span className="text-[#86e395]">built for your success.</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="flex items-center space-x-3 text-white/80">
           
            <span className="text-sm md:text-base font-medium tracking-wide drop-shadow-md pr-4 max-w-sm">
              Engineering, procurement, and construction under one roof
            </span>
          </motion.div>

          {/* Liquid Glass CTA Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-2 rounded-full text-[#123018] text-lg overflow-hidden group shadow-[0_8px_32px_rgba(134,227,149,0.2)]"
          >
            <span
              className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #86e395 0%, #5fd372 55%, #3ebd52 100%)",
              }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -8px 12px rgba(0,60,20,0.2)",
              }}
            />
            <span className="relative text-md text-gray-900">Discuss Your Project</span>
          </motion.button>
          <div className="hidden md:block">
          <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ x: -8 }}
              className="group relative flex items-center border-r border-slate-800 font-sans justify-between p-6  transition-transform duration-300"
            >
              {/* The Glass Material */}
            
              
              <div className="relative z-10 flex flex-col space-y-2 pr-4">
                <h3 className="text-xl sm:text-xl font-semibold text-white tracking-tight drop-shadow-sm">
                  {stat.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">
                  {stat.description}
                </p>
              </div>
              
              <div className="relative z-10 flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-black/20 border border-white/10 group-hover:border-[#86e395]/40 group-hover:bg-black/30 transition-colors duration-300 shadow-inner">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>
        </motion.div>
</div>
        {/* Right Content: Liquid Glass Stats Cards */}
     
      </div>
    </section>
  );
}