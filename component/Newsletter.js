'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // API Integration
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      {/* Main Card Container with Custom Gradient */}
      <div 
        className="w-full  rounded-[1rem] p-10 md:p-16 shadow-sm"
       style={{
  background: "linear-gradient(135deg, #e8fff1 0%, #d4f8e3 50%, #b9f6ca 100%)",
}}
      >
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-5xl font-semibold text-[#1a1a1a] mb-2 tracking-tight">
            Subscribe to — Our Newsletter
          </h2>
        </div>

        {/* Bottom Section: Text & Form */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Subtext */}
          <p className="text-gray-600 text-sm md:text-base max-w-[280px] leading-relaxed">
            Get weekly update about our product on your email, no spam guaranteed we promise 🤞
          </p>

          {/* Form Area */}
          <form 
            onSubmit={handleSubscribe} 
            className="flex w-full max-w-[500px]"
          >
            {/* Input Container */}
            <div className="flex-1 flex bg-white items-center p-1.5 shadow-sm">
              {/* Icon Box */}
              <div className="bg-gray-100 p-3 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </div>
              
              {/* Email Input */}
              <input
                type="email"
                required
                placeholder="youremail123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full px-4 py-2 bg-transparent text-gray-800 outline-none placeholder:text-gray-400 text-sm md:text-base disabled:opacity-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#111111] text-white px-6 md:px-10 py-4 text-xs font-bold tracking-[0.15em] uppercase hover:bg-black transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === 'loading' ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="text-green-700 mt-4 text-right text-sm font-medium">
            Thanks for subscribing! Check your inbox.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-4 text-right text-sm font-medium">
            Oops! Something went wrong. Please try again.
          </p>
        )}

      </div>
    </div>
  );
}