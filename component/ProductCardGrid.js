"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Hammer, Map, Ruler, Shield, Maximize, ArrowRight } from "lucide-react";

// Categories from Image 3
const categories = [
  "All",
  "Office Container",
  "Security Cabins",
  "Prefabricated House",
  "Prefabricated Office",
  "Portable Cabin",
];

// Content from Image 1 mapped to Image 3 categories
const products = [
  {
    id: 1,
    title: "Site Office Container",
    price: "₹ 850",
    unit: "/sq ft",
    category: "Office Container",
    features: [
      { icon: <Box size={16} />, text: "Steel" },
      { icon: <Hammer size={16} />, text: "Modular" },
      { icon: <Map size={16} />, text: "Office" },
    ],
    image: "https://images.pexels.com/photos/31895332/pexels-photo-31895332.jpeg",
  },
  {
    id: 2,
    title: "White Prefabricated Office",
    price: "₹ 1,200",
    unit: "/sq ft",
    category: "Prefabricated Office",
    features: [
      { icon: <Maximize size={16} />, text: "12ft x 9ft" },
      { icon: <Box size={16} />, text: "Steel" },
      { icon: <Shield size={16} />, text: "White" },
    ],
    image: "https://images.pexels.com/photos/12444968/pexels-photo-12444968.jpeg",
  },
  {
    id: 3,
    title: "Prefabricated Site Offices",
    price: "₹ 700",
    unit: "/sq ft",
    category: "Prefabricated Office",
    features: [
      { icon: <Box size={16} />, text: "Steel" },
      { icon: <Hammer size={16} />, text: "Panel Build" },
      { icon: <Map size={16} />, text: "Office" },
    ],
    image: "https://images.pexels.com/photos/7534221/pexels-photo-7534221.jpeg",
  },
  {
    id: 4,
    title: "Aerocon Wall Panel",
    price: "₹ 55",
    unit: "/sq ft",
    category: "Prefabricated Structure",
    features: [
      { icon: <Box size={16} />, text: "Concrete" },
      { icon: <Ruler size={16} />, text: "0.56 mm" },
      { icon: <Shield size={16} />, text: "Birla" },
    ],
    image: "https://images.pexels.com/photos/12662120/pexels-photo-12662120.jpeg",
  },
  {
    id: 5,
    title: "Prefabricated Double Story",
    price: "₹ 1,100",
    unit: "/sq ft",
    category: "Prefabricated Building",
    features: [
      { icon: <Box size={16} />, text: "Galvanized" },
      { icon: <Hammer size={16} />, text: "Prefab" },
      { icon: <Shield size={16} />, text: "Hot Rolled" },
    ],
    image: "https://images.pexels.com/photos/29415315/pexels-photo-29415315.jpeg",
  },
  {
    id: 6,
    title: "Galvanized Prefab House",
    price: "₹ 950",
    unit: "/sq ft",
    category: "Prefabricated House",
    features: [
      { icon: <Box size={16} />, text: "Galvanized" },
      { icon: <Hammer size={16} />, text: "Prefab" },
      { icon: <Shield size={16} />, text: "Weather Proof" },
    ],
    image: "https://images.pexels.com/photos/17438928/pexels-photo-17438928.jpeg",
  },
  {
    id: 7,
    title: "Prefabricated Control Room",
    price: "₹ 1,000",
    unit: "/sq ft",
    category: "Portable Cabin",
    features: [
      { icon: <Map size={16} />, text: "House" },
      { icon: <Hammer size={16} />, text: "Prefab" },
      { icon: <Maximize size={16} />, text: "Rectangular" },
    ],
    image: "https://images.pexels.com/photos/28546155/pexels-photo-28546155.jpeg",
  },
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          {/* Overline */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#8DC63F]"></div>
            <span className="text-[#8DC63F] font-bold text-xs tracking-widest uppercase">
              What We Offer
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Our Product Range
          </h2>
        </div>
        
        {/* View All Link */}
        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm font-medium flex items-center gap-1 transition-colors">
          View all <ArrowRight size={16} />
        </a>
      </div>
        {/* Tabs - Styled to match the dark aesthetic of the cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === category
                  ? "bg-[#3A4B40] text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[380px] rounded-[1rem] overflow-hidden group shadow-xl"
              >
                {/* Background Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Glassmorphism Overlay mapping to Image 2 design */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B31]/95 via-[#2C3B31]/60 to-transparent" />

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-3">
                  <h3 className="text-white text-xl font-semibold leading-tight">
                    {product.title}
                  </h3>

                  {/* Features Row - Mapped to the Bed/Baths/Sqft layout */}
                  <div className="flex items-center gap-6 text-gray-300 text-sm border-b border-white/20 pb-5">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="opacity-70">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Row */}
                  <div className="flex justify-between items-center pt-2">
                    {/* Price Pill */}
                    <div className="bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-white font-medium flex items-baseline gap-1">
                      <span className="text-sm">{product.price}</span>
                      <span className="text-xs opacity-75">{product.unit}</span>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-white text-black px-6 py-3 text-sm rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}