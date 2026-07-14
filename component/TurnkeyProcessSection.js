import React from 'react';

// Default data structure designed for seamless API integration
const defaultPosts = [
  {
    id: 1,
    category: 'Industry Trends',
    title: 'The Future of Sustainable Infrastructure in 2026',
    excerpt: 'Explore how eco-friendly materials and energy-efficient designs are reshaping the commercial construction landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    link: '#'
  },
  {
    id: 2,
    category: 'Project Highlight',
    title: 'Overcoming Complexities in High-Rise Turnkey Projects',
    excerpt: 'A deep dive into our recent urban development project, highlighting risk mitigation and streamlined single-contractor execution.',
    imageUrl: 'https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg',
    link: '#'
  },
  {
    id: 3,
    category: 'Engineering',
    title: 'Why Pre-Engineered Buildings (PEBs) Are Cost-Effective',
    excerpt: 'Discover the advantages of integrating pre-engineered frameworks to accelerate timelines and guarantee structural integrity.',
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    link: '#'
  },
  {
    id: 4,
    category: 'Safety Standards',
    title: 'Navigating New Regulatory Compliance in Construction',
    excerpt: 'A comprehensive guide to the latest safety codes and how turnkey providers ensure 100% compliance on every job site.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    link: '#'
  }
];

export default function BlogSection({ posts = defaultPosts }) {
  return (
    <section className="w-full py-20 px-8 md:px-12 lg:px-12 font-sans text-gray-900">
      <div className="">
        
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight tracking-tight max-w-sm">
              Latest Insights & Industry News
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-sm leading-relaxed lg:pl-6 lg:border-l-2 lg:border-gray-200">
              Stay updated with the latest trends, project highlights, and expert perspectives in turnkey infrastructure and engineering.
            </p>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="relative w-full h-[480px] rounded-[1rem] overflow-hidden group"
            >
              {/* Background Image */}
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 z-0 pointer-events-none"></div>

              {/* Top Left Badge (Category) */}
              <div className="absolute top-4 left-4 bg-white/15 border border-white/20 backdrop-blur-sm text-gray-50 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full z-10 shadow-sm">
                {post.category}
              </div>

              {/* Bottom Content Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-6 z-10 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0a192f] mb-2 tracking-tight line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                
                {/* Read More Link */}
                <a 
                  href={post.link} 
                  className="inline-flex items-center gap-2 text-[#0a192f] text-sm font-semibold hover:opacity-70 transition-opacity w-fit"
                >
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}