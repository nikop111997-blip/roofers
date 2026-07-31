'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Mail, Calendar, TrendingUp, CheckCircle2, User, Phone, AtSign 
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center text-emerald-600 font-semibold">Loading Dashboard...</div>;
  }

  if (!data) return null;

  // Transform chart data for Recharts
  const formatChartData = (apiData) => {
    return apiData?.map(item => ({ name: item._id?.month, total: item.total })) || [];
  };

  const contactChartData = formatChartData(data.charts.monthlyContacts);
  const newsletterChartData = formatChartData(data.charts.monthlyNewsletter);

  // Fallback to empty array if no contacts exist
  const recentContacts = data.recent.contacts || [];

  return (
    <div className="min-h-screen p-6 font-sans text-gray-800">
      
      {/* --- TOP ROW: LEAD METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Total Contacts */}
        <div className="bg-white rounded-[0.5rem] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-gray-900">Total Contacts</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {data.stats.totalContacts}
            </h2>
            <p className="text-sm font-medium text-emerald-500 flex items-center mb-4">
              All time leads
            </p>
            {/* Bar Chart */}
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contactChartData}>
                  <Bar dataKey="total" fill="#10b981" radius={[4, 4, 4, 4]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 2: Newsletter Subs */}
        <div className="bg-white rounded-[0.5rem] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-gray-900">Newsletter Subs</span>
            <div className="p-1.5 bg-sky-50 rounded-lg">
              <Mail className="w-4 h-4 text-sky-500" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1 mb-2">
              <h2 className="text-4xl font-bold text-gray-900">{data.stats.totalNewsletter}</h2>
              <span className="text-gray-500 font-medium">subs</span>
            </div>
            <p className="text-sm font-medium text-sky-500 flex items-center mb-4">
              Active mailing list
            </p>
            {/* Line Chart */}
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newsletterChartData}>
                  <Line type="monotone" dataKey="total" stroke="#0ea5e9" strokeWidth={3} dot={{r: 3, fill: '#0ea5e9'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 3: Today's Leads */}
        <div className="bg-white rounded-[0.5rem] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start mb-2 relative z-10">
            <span className="font-semibold text-gray-900">New Leads Today</span>
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {data.today.contacts + data.today.newsletter}
            </h2>
            <p className="text-sm font-medium text-emerald-500 flex items-center">
              Combined contacts & subs
            </p>
          </div>
          {/* Decorative Background */}
          <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full opacity-50 z-0"></div>
          <div className="absolute bottom-4 right-4 z-10 opacity-20">
             <TrendingUp className="w-20 h-20 text-emerald-900" />
          </div>
        </div>

        {/* Card 4: Action / Overview */}
        <div className="bg-emerald-600 rounded-[0.5rem] p-6 shadow-sm flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <h3 className="text-xl font-bold mb-2 z-10">Ready to follow up?</h3>
          <p className="text-emerald-100 text-sm mb-4 z-10">
            You have {data.today.contacts} new direct inquiries today waiting for a response.
          </p>
        </div>
      </div>

      {/* --- BOTTOM SECTION: LEAD LIST & DETAILS --- */}
      <div className="bg-[#1a1c23] rounded-[0.5rem] p-4 flex flex-col md:flex-row gap-4 h-[500px]">
        
        {/* Left Side: Recent Leads List */}
        <div className="w-full md:w-[380px] flex flex-col">
          <div className="flex items-center justify-between text-white mb-6 px-4 pt-2">
            <h3 className="font-semibold text-lg">Recent Contacts</h3>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
              {recentContacts.length} Latest
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {recentContacts.length === 0 ? (
              <p className="text-gray-400 text-sm px-4">No recent contacts found.</p>
            ) : (
              recentContacts.map((contact, idx) => {
                const isActive = selectedContact === idx;
                // Safely grab a name or email for display
                const displayName = contact.name || contact.email || 'Unknown Lead';
                
                return (
                  <div 
                    key={contact._id || idx}
                    onClick={() => setSelectedContact(idx)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-emerald-600' : 'bg-[#21232b] hover:bg-[#2a2d36]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shrink-0 text-gray-700">
                         <User className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className={`font-semibold text-sm truncate w-32 ${isActive ? 'text-white' : 'text-gray-200'}`}>
                          {displayName}
                        </p>
                        <p className={`text-xs mt-0.5 ${isActive ? 'text-emerald-100' : 'text-gray-500'}`}>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-3 py-1 rounded-md font-medium ${isActive ? 'bg-white text-emerald-600' : 'bg-[#2a2d36] text-gray-400'}`}>
                        Lead
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Side: Lead Details Panel */}
        {recentContacts[selectedContact] && (
          <div className="flex-1 bg-emerald-600 rounded-[0.5rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
             {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Lead Details</p>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold tracking-wide">
                      {recentContacts[selectedContact].name || 'Web Inquiry'}
                    </h2>
                  </div>
                </div>
                
                <div className="flex text-right z-10">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium mb-1 text-left">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">New</span>
                      <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Boxes (Email, Phone, Message) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                
                {/* Email Box */}
                <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2 text-emerald-200">
                    <AtSign className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Email Address</span>
                  </div>
                  <h4 className="text-lg font-bold truncate">
                    {recentContacts[selectedContact].email || 'No email provided'}
                  </h4>
                </div>
                
                {/* Phone Box */}
                <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2 text-emerald-200">
                    <Phone className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Phone Number</span>
                  </div>
                  <h4 className="text-lg font-bold">
                    {recentContacts[selectedContact].phone || 'No phone provided'}
                  </h4>
                </div>

                {/* Message Box (Spans full width) */}
                <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/10 md:col-span-2">
                  <span className="text-sm font-semibold uppercase tracking-wider text-emerald-200 block mb-2">Message Context</span>
                  <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                    {recentContacts[selectedContact].message || 'No additional message was provided by this lead.'}
                  </p>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between border-t border-white/20 pt-6">
              <div className="flex gap-12">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">Date Submitted</p>
                  <p className="text-xl font-bold">{new Date(recentContacts[selectedContact].createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1c23;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2a2d36;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}