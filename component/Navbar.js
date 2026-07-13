"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About Us", href: "#" },
  {
    name: "Projects",
    href: "#",
    submenu: [
      { name: "Residential Roofing", href: "#", blurb: "Re-roofs, repairs, inspections" },
      { name: "Commercial Roofing", href: "#", blurb: "Flat, metal & membrane systems" },
      { name: "Storm Restoration", href: "#", blurb: "Insurance-backed emergency work" },
    ],
  },
  { name: "Portfolio", href: "#" },
  { name: "Partners", href: "#" },
  { name: "Questions", href: "#" },
];

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
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ borderRadius: radius }}
    >
      {/* 1. bent backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          borderRadius: radius,
          backdropFilter: `url(#${filterId}) blur(80px) saturate(160%)`,
          WebkitBackdropFilter: "blur(80px) saturate(160%)",
        }}
      />
      {/* 2. glass tint */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.16) 40%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.09) 100%)",
        }}
      />
      {/* 3. rim light */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.85), inset 0 -1px 1px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.14)",
        }}
      />
      {/* 4. chromatic fringe */}
      <div
        className="absolute inset-0 mix-blend-screen opacity-70"
        style={{
          borderRadius: radius,
          boxShadow:
            "inset 1px 0 0.5px rgba(120,200,255,0.35), inset -1px 0 0.5px rgba(255,150,180,0.3)",
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
  const filterId = useId().replace(/[:]/g, "");
  const pillFilterId = `glass-pill-${filterId}`;
  const menuFilterId = `glass-menu-${filterId}`;
  const submenuFilterId = `glass-submenu-${filterId}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 md:py-10 font-sans">
      <GlassFilter id={pillFilterId} />
      <GlassFilter id={menuFilterId} />
      <GlassFilter id={submenuFilterId} />

      <div className=" flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 text-white">
            <span className="text-3xl font-bold tracking-wider drop-shadow-sm">
              RT
            </span>
            <div className="w-[1px] h-8 bg-white/40" />
            <div className="flex flex-col leading-tight text-sm font-semibold text-white/80">
              <span>Roofers</span>
              <span>Infratech</span>
            </div>
          </Link>
        </div>

        {/* Right Section: Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block relative rounded-full px-2 py-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]">
            <GlassSurface filterId={pillFilterId} />
            <div className="relative flex items-center">
              {navLinks.map((link, index) => {
                const hasSubmenu = !!link.submenu;
                const isHovered = hoveredIndex === index;
                const isSubmenuOpen = submenuOpen === index;

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      if (hasSubmenu) setSubmenuOpen(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                      if (hasSubmenu) setSubmenuOpen(null);
                    }}
                  >
                    <Link
                      href={link.href}
                      className="relative flex items-center gap-1 px-5 py-2 text-sm font-medium text-white transition-colors z-10"
                    >
                      {link.name}
                      {hasSubmenu && (
                        <motion.svg
                          viewBox="0 0 12 12"
                          className="w-2.5 h-2.5 opacity-70"
                          fill="none"
                          animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}

                      {/* Moving glass lens */}
                      {isHovered && (
  <motion.div
    layoutId="nav-hover"
    className="absolute inset-0 -z-10 rounded-full overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    }}
    transition={{
      // A softer, more fluid spring makes it glide smoothly like a liquid drop
      layout: { type: "spring", stiffness: 120, damping: 14, mass: 0.8 },
      opacity: { duration: 0.15 },
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 70%)",
        boxShadow:
          "inset 0 1px 0.5px rgba(255,255,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.2)",
      }}
    />
  </motion.div>
)}
                    </Link>

                    {/* Submenu */}
                    {hasSubmenu && (
                      <AnimatePresence>
                        {isSubmenuOpen && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-20"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              className="relative w-64 overflow-hidden shadow-2xl"
                              style={{ transformOrigin: "50% 0%" }}
                              initial={{
                                scaleY: 0.4,
                                scaleX: 0.85,
                                borderRadius: "40% 40% 50% 50% / 60% 60% 40% 40%",
                              }}
                              animate={{
                                scaleY: [0.4, 1.08, 0.98, 1],
                                scaleX: [0.85, 1.03, 0.99, 1],
                                borderRadius: [
                                  "40% 40% 50% 50% / 60% 60% 40% 40%",
                                  "24px 24px 26px 26px / 24px 24px 26px 26px",
                                  "1.25rem",
                                  "1.25rem",
                                ],
                              }}
                              exit={{ scaleY: 0.5, scaleX: 0.9, opacity: 0 }}
                              transition={{
                                duration: 0.5,
                                times: [0, 0.5, 0.8, 1],
                                ease: "easeOut",
                              }}
                            >
                              <GlassSurface filterId={submenuFilterId} radius="1.25rem" />
                              <div className="relative p-2">
                                {link.submenu?.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-2.5 rounded-xl transition-colors hover:bg-white/12"
                                  >
                                    <span className="block text-sm font-medium text-white">
                                      {item.name}
                                    </span>
                                    <span className="block text-xs text-white/60 mt-0.5">
                                      {item.blurb}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <button className="hidden sm:block relative px-6 py-2.5 rounded-full text-[#123018] font-medium overflow-hidden transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #6dff9a 0%, #4fd97a 55%, #34c266 100%)",
              }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "inset 0 1.5px 1px rgba(255,255,255,0.9), inset 0 -6px 10px rgba(0,60,20,0.18)",
              }}
            />
            <span className="relative">Request Terms</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-white p-2 z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <motion.div animate={isOpen ? "open" : "closed"} className="space-y-1.5">
            <motion.span
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }}
              className="block w-6 h-0.5 bg-white transition-transform"
            />
            <motion.span
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              className="block w-6 h-0.5 bg-white transition-opacity"
            />
            <motion.span
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }}
              className="block w-6 h-0.5 bg-white transition-transform"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-4 right-4 mt-2 rounded-3xl overflow-hidden shadow-2xl lg:hidden"
          >
            <GlassSurface filterId={menuFilterId} radius="1.5rem" />
            <div className="relative flex flex-col p-2 text-center">
              {navLinks.map((link, index) => {
                const hasSubmenu = !!link.submenu;
                const isOpenAccordion = mobileSubmenuOpen === index;

                if (!hasSubmenu) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white py-3 rounded-xl hover:bg-white/10 transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setMobileSubmenuOpen(isOpenAccordion ? null : index)
                      }
                      className="w-full flex items-center justify-center gap-1.5 text-white py-3 rounded-xl hover:bg-white/10 transition-colors font-medium"
                    >
                      {link.name}
                      <motion.svg
                        viewBox="0 0 12 12"
                        className="w-2.5 h-2.5 opacity-70"
                        fill="none"
                        animate={{ rotate: isOpenAccordion ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpenAccordion && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-2">
                            {link.submenu?.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <button className="relative mt-3 w-full py-3 rounded-2xl overflow-hidden sm:hidden">
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #86e395 0%, #a0f0a9 100%)",
                  }}
                />
                <span
                  className="absolute inset-0"
                  style={{
                    boxShadow: "inset 0 1.5px 1px rgba(255,255,255,0.9)",
                  }}
                />
                <span className="relative text-[#123018] font-medium">
                  Request Terms
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}