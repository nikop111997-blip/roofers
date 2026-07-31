'use client'
import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Filter, Plus, Upload, X, MessageSquare, 
  Calendar, Mail, CheckCircle, XCircle, Clock, 
  AlertCircle, ArrowDownToLine, Target, Award,
  TargetIcon, Activity, Globe, MapPin, Monitor, Link2, Hash
} from "lucide-react";

// --- CUSTOM HOOKS ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- MOCK API REQUESTER ---
const apiRequest = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });
    if (res.status === 401 || res.status === 403) return { unauthorized: true };
    const data = await res.json();
    return { data, error: !res.ok };
  } catch (err) {
    console.error("API Error:", err);
    return { error: true, message: err.message };
  }
};

// --- CONSTANTS ---
const STATUSES = [
  "New", 
  "Interested", 
  "Not Interested", 
  "Invalid", 
  "Converted", 
  "Call Back"
];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  
  // Modals
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  
  // Filters & Pagination
  const [sort, setSort] = useState("newest"); // newest | oldest | name
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All"); // All, Today, Last3, Last7, Last30
  const limit = 10;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter, dateFilter, sort, fromDate, toDate]);

  // --- API INTEGRATIONS ---

  // 1. Fetch Leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search: debouncedSearch,
        sort,
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
        ...(statusFilter !== "All" && { status: statusFilter }),
        ...(dateFilter !== "All" && { dateFilter })
      });

      const res = await apiRequest(`/api/contact?${params.toString()}`);

      if (res.unauthorized) {
        setUnauthorized(true);
        return;
      }

      if (!res.error && res.data) {
        const payload = res.data;
        setLeads(payload.data || payload || []);
        setPages(payload.pages || 0);
      }
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, statusFilter, dateFilter, sort, fromDate, toDate]);

  // 2. Update Lead Status
  const updateLeadStatus = async (id, newStatus) => {
    setLeads(leads.map(l => getLeadId(l) === id ? { ...l, status: newStatus } : l));
    
    const res = await apiRequest(`/api/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: newStatus })
    });

    if (res.error) {
      alert("Failed to update status. Please try again.");
      fetchLeads(); 
    }
  };

  // 3. Add Comment
  const addComment = async (id, text) => {
    if (!text.trim()) return;
    
    const newComment = { id: Date.now(), text, date: new Date().toISOString() };
    
    setLeads(leads.map(l => {
      if (getLeadId(l) === id) {
        return { ...l, comments: [...(l.comments || []), newComment] };
      }
      return l;
    }));

    const res = await apiRequest(`/api/contact/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ text })
    });

    if (res.error) {
      alert("Failed to add comment.");
      fetchLeads();
    }
  };

  // 4. Add New Lead
  const handleAddLead = async (newLeadData) => {
    setLoading(true);
    const res = await apiRequest(`/api/contact/admin`, {
      method: 'POST',
      body: JSON.stringify(newLeadData)
    });

    if (!res.error) {
      setIsAddLeadOpen(false);
      fetchLeads(); 
    } else {
      alert("Failed to create lead.");
      setLoading(false);
    }
  };

  // 5. Import CSV


  // --- HELPERS ---
  
  const getLeadId = (lead) => typeof lead._id === 'object' && lead._id !== null ? lead._id.$oid : lead._id;

  const getStatusColor = (status) => {
    switch(status) {
      case "New": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Replied": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      case "Spam": return "bg-red-100 text-red-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const selectedLead = leads.find(l => getLeadId(l) === selectedLeadId);

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-500 mt-2">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inquiries & Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Manage contact form submissions and tracking data.</p>
        </div>
        <div className="flex items-center gap-3">
        
          <button 
            onClick={() => setIsAddLeadOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm"
          >
            <Plus size={18} />
            Add Entry
          </button>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-white px-8 py-4 border-b border-gray-200 flex flex-wrap justify-between gap-4 items-center shadow-sm z-10">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="Last3">Last 3 Days</option>
            <option value="Last7">Last 7 Days</option>
            <option value="Last30">Last 30 Days</option>
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <span className="text-gray-400 text-sm">to</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>

          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8 relative">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Sender Details</th>
                  <th className="px-6 py-4">Subject & Message</th>
                  <th className="px-6 py-4">Location / IP</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      </td>
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Filter className="h-10 w-10 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-900">No leads found</p>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const leadId = getLeadId(lead);
                    
                    // Handle dates from MongoDB format
                    let parsedDate = null;
                    if (lead.createdAt) {
                      parsedDate = typeof lead.createdAt === 'object' && lead.createdAt.$date
                        ? new Date(lead.createdAt.$date)
                        : new Date(lead.createdAt);
                    }

                    const locationDisplay = [lead.serverTracking?.city, lead.serverTracking?.country]
                      .filter(Boolean).join(", ") || lead.serverTracking?.ip || "Unknown";

                    return (
                      <tr 
                        key={leadId} 
                        onClick={() => setSelectedLeadId(leadId)}
                        className="hover:bg-green-50 cursor-pointer transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 group-hover:text-green-700">{lead.name}</div>
                          <div className="text-gray-500 text-xs mt-1">{lead.email}</div>
                           <div className="text-gray-500 text-xs mt-1">{lead.mobile}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 truncate max-w-[250px]" title={lead.subject}>
                            {lead.subject || "No Subject"}
                          </div>
                          <div className="text-gray-500 text-xs mt-1 truncate max-w-[250px]" title={lead.message}>
                            {lead.message || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 truncate max-w-[150px]">{locationDisplay}</div>
                          <div className="text-gray-500 text-xs mt-1">{lead.tracking?.timezone || "-"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{parsedDate ? parsedDate.toLocaleDateString() : "-"}</div>
                          <div className="text-gray-500 text-xs mt-1">{parsedDate ? parsedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "-"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status || "New")}`}>
                            {lead.status || "New"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination Controls */}
        {!loading && pages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">
              Page {page} of {pages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 bg-white text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page === pages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 bg-white text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>

      {/* --- SIDEBAR (Lead Details) --- */}
      {selectedLead && (
        <>
          <div 
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedLeadId(null)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform flex flex-col border-l border-gray-200">
            
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-semibold text-gray-900">Inquiry Details</h2>
              <button 
                onClick={() => setSelectedLeadId(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Profile Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedLead.name}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    <a href={`mailto:${selectedLead.email}`} className="hover:text-green-600">{selectedLead.email}</a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-3 text-gray-400" />
                    <span>Submitted: <span className="font-medium text-gray-700">
                      {selectedLead.createdAt && new Date(selectedLead.createdAt.$date || selectedLead.createdAt).toLocaleString()}
                    </span></span>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Status Update */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <select 
                  value={selectedLead.status || "New"}
                  onChange={(e) => updateLeadStatus(getLeadId(selectedLead), e.target.value)}
                  className={`w-full p-3 rounded-lg border-2 appearance-none outline-none font-medium text-sm focus:border-green-500 transition-colors cursor-pointer ${
                    selectedLead.status === "Closed" ? "border-gray-200 bg-gray-50 text-gray-800" :
                    selectedLead.status === "Spam" ? "border-red-200 bg-red-50 text-red-800" :
                    "border-gray-200 bg-white text-gray-800"
                  }`}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Message Block */}
              <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Subject</div>
                  <div className="text-sm font-medium text-gray-900">{selectedLead.subject || "No Subject provided"}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Message</div>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">{selectedLead.message || "No message provided."}</div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Tracking & Analytics Section */}
              {selectedLead.tracking && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity size={16} /> Session & Tracking
                  </h4>
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start text-sm text-gray-600">
                      <Link2 size={16} className="mr-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-xs text-gray-500 mb-0.5">Submission Page</span>
                        <a href={selectedLead.tracking.page} target="_blank" rel="noreferrer" className="font-medium text-green-600 hover:underline break-all">
                          {selectedLead.tracking.pathname || selectedLead.tracking.page}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Globe size={16} className="mr-3 text-gray-400" />
                      <span>Referrer: <span className="font-medium text-gray-900">{selectedLead.tracking.referrer || "Direct / None"}</span></span>
                    </div>

                    {selectedLead.tracking.utm_source && (
                      <div className="flex items-center text-sm text-gray-600">
                        <TargetIcon size={16} className="mr-3 text-gray-400" />
                        <span>UTM Source: <span className="font-medium text-gray-900">{selectedLead.tracking.utm_source}</span></span>
                      </div>
                    )}
                    
                    {selectedLead.tracking.utm_medium && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Hash size={16} className="mr-3 text-gray-400" />
                        <span>UTM Medium: <span className="font-medium text-gray-900">{selectedLead.tracking.utm_medium}</span></span>
                      </div>
                    )}

                    <div className="flex items-start text-sm text-gray-600">
                      <Monitor size={16} className="mr-3 text-gray-400 mt-0.5" />
                      <div className="text-xs text-gray-500 break-words">
                        <span className="block font-medium text-gray-900 text-sm mb-1">Environment</span>
                        {selectedLead.tracking.platform} • {selectedLead.tracking.screen} • {selectedLead.tracking.language}<br/>
                        <span className="text-gray-400">{selectedLead.tracking.userAgent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Server Tracking Section */}
              {selectedLead.serverTracking && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin size={16} /> Network Location
                  </h4>
                  <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">IP Address:</span>
                      <span className="font-medium text-gray-900">{selectedLead.serverTracking.ip}</span>
                    </div>
                    {(selectedLead.serverTracking.city || selectedLead.serverTracking.country) && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium text-gray-900">
                          {[selectedLead.serverTracking.city, selectedLead.serverTracking.region, selectedLead.serverTracking.country].filter(Boolean).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <hr className="border-gray-100" />

              {/* Comments Section */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare size={16} /> Internal Notes
                </h4>
                
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                  {(!selectedLead.comments || selectedLead.comments.length === 0) ? (
                    <p className="text-sm text-gray-500 italic">No internal notes yet.</p>
                  ) : (
                    selectedLead.comments.map((c, i) => (
                      <div key={c.id || i} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                        <p className="text-gray-800 mb-1">{c.text}</p>
                        <p className="text-xs text-gray-400 font-medium">
                          {new Date(c.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.target.elements.comment;
                    addComment(getLeadId(selectedLead), input.value);
                    input.value = "";
                  }}
                  className="flex gap-2"
                >
                  <input 
                    name="comment"
                    type="text" 
                    placeholder="Add a private note..." 
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    autoComplete="off"
                  />
                  <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    Add
                  </button>
                </form>
              </div>

            </div>
          </div>
        </>
      )}

      {/* --- ADD LEAD MODAL --- */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Manual Entry</h2>
              <button onClick={() => setIsAddLeadOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form 
                id="addLeadForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = Object.fromEntries(formData.entries());
                  handleAddLead(data);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input required name="name" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <input required name="email" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                 <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Mobile</label>
                  <input name="mobile" type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <input name="subject" type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none resize-none"></textarea>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddLeadOpen(false)} className="px-5 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors">
                Cancel
              </button>
              <button form="addLeadForm" type="submit" className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}

   

    </div>
  );
}