"use client";

import { useState } from "react";

export default function ContactForm() {
const [form, setForm] = useState({
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
  website: "",
});

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = "Name is required";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      e.email = "Enter a valid email";
    }
 const mobile = form.mobile.replace(/\D/g, "");

  if (!mobile) {
    e.mobile = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(mobile)) {
    e.mobile = "Enter a valid 10-digit mobile number";
  }
    if (!form.subject.trim()) {
      e.subject = "Subject is required";
    }

    if (!form.message.trim()) {
      e.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      e.message = "Minimum 10 characters";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const getTrackingData = () => {
    const params = new URLSearchParams(window.location.search);

    return {
      page: window.location.href,
      pathname: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      cookiesEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      timestamp: new Date().toISOString(),

      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_term: params.get("utm_term"),
      utm_content: params.get("utm_content"),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");

    if (!validate()) return;

    // Honeypot
    if (form.website) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          tracking: getTrackingData(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Something went wrong.");
        return;
      }

      setStatus("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        mobile:"",
        subject: "",
        message: "",
        website: "",
      });

      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        className="hidden"
        autoComplete="off"
        tabIndex="-1"
      />

      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
<div>
  <input
    type="tel"
    name="mobile"
    value={form.mobile}
    onChange={handleChange}
    placeholder="Mobile Number"
    maxLength={10}
    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a]"
  />
  {errors.mobile && (
    <p className="text-red-500 text-sm mt-1">
      {errors.mobile}
    </p>
  )}
</div>
      <div>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#1a1a1a]"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
        )}
      </div>

      <div>
        <textarea
          rows={5}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full bg-transparent border-b border-gray-300 py-3 resize-none outline-none focus:border-[#1a1a1a]"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {status && (
        <div
          className={`text-sm ${
            status.includes("success")
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {status}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-gradient-to-br from-[#6dff9a] to-[#0b6827] text-white py-4 rounded-full font-semibold disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send a Message"}
      </button>
    </form>
  );
}