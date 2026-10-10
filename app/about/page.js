"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Target,
  Eye,
  ShieldCheck,
  Clock,
  Wallet,
  Users,
  Check,
  Compass,
  PenTool,
  ClipboardList,
  Hammer,
  Wrench,
  KeyRound,
} from "lucide-react";
import HeroContactSection from "@/component/ContactSection";

/* -------------------------------------------------------------------------- */
/*  DESIGN TOKENS (taken from your existing components)                        */
/*  Dark base  #0a1410 | Deep green #1a3a2e | Forest #0b6827                   */
/*  Mint #6dff9a / #86e395 | Mid green #34c266 | Overline lime #8DC63F         */
/*  Radius: rounded-[1rem] cards, rounded-full buttons/pills                   */
/*  Spacing: px-6 md:px-12, py-16/24                                           */
/* -------------------------------------------------------------------------- */

const aboutText =
  "We design, build, and deliver — you operate. From greenfield concepts to fully operational facilities, we bridge the gap between ambition and reality. You invest in a vision — we handle everything else: engineering, procurement, and construction execution. Every milestone is managed in-house to guarantee precision, safety, and on-time handover.";

const stats = [
  { value: "150+", label: "Projects delivered", note: "Commercial, industrial, residential and infrastructure" },
  { value: "100%", label: "In-house management", note: "Design to handover under one contract" },
  { value: "0", label: "Hidden costs", note: "Fixed scope, transparent budget" },
  { value: "24/7", label: "Project tracking", note: "Live progress through our app" },
];

const pillars = [
  {
    icon: Target,
    title: "Our mission",
    text: "To give every client one accountable partner for the entire build — so you never have to coordinate designers, vendors and contractors yourself.",
  },
  {
    icon: Eye,
    title: "Our vision",
    text: "To be the most trusted turnkey construction company, known for facilities that open on time, on budget and ready to operate.",
  },
];

const values = [
  { icon: ShieldCheck, title: "Safety and quality first", text: "Every site follows local codes and our own QA checklists. No shortcuts on materials or workmanship." },
  { icon: Clock, title: "On-time delivery", text: "Predefined workflows and rigorous scheduling keep every milestone on track." },
  { icon: Wallet, title: "Cost predictability", text: "Once scope is final, you get a clear budget. What we quote is what you pay." },
  { icon: Users, title: "Single-point accountability", text: "One team, one contract, one person to call from the first sketch to the final key." },
];

const process = [
  { icon: Compass, title: "Concept & feasibility", text: "Site assessment, scope, budget and timeline." },
  { icon: PenTool, title: "Design & engineering", text: "Architecture, structure and MEP plans by our in-house team." },
  { icon: ClipboardList, title: "Procurement & PMC", text: "Vendor negotiation and material sourcing managed for you." },
  { icon: Hammer, title: "Construction", text: "Civil work and installations under strict safety supervision." },
  { icon: Wrench, title: "Testing & commissioning", text: "Every system tested and tuned before handover." },
  { icon: KeyRound, title: "Handover & support", text: "As-built drawings, warranties, manuals and ongoing support." },
];

const differentiators = [
  "Design, PMC and construction under one roof",
  "Track your project live through our mobile app",
  "Fixed-scope budgets with no surprise overruns",
  "Dedicated compliance team on every site",
  "Prefabricated and conventional build options",
  "Post-handover support and warranties",
];

/* ----------------------------- Small helpers ------------------------------ */

function Overline({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-[2px] bg-[#8DC63F]" />
      <span className="text-[#8DC63F] font-bold text-xs tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block mt-2">
      <span className="absolute opacity-20 text-[#1a3a2e]">{children}</span>
      <motion.span style={{ opacity }} className="text-[#1a3a2e]">
        {children}
      </motion.span>
    </span>
  );
}

function ScrollText() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"],
  });
  const words = aboutText.split(" ");
  return (
    <section ref={ref} className="w-full py-20 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="text-[#1a3a2e] text-lg font-medium tracking-tight md:sticky md:top-32">
            Who we are
          </h2>
        </div>
        <div className="md:col-span-9 lg:col-span-10">
          <p className="text-2xl md:text-4xl font-medium leading-[1.1] text-[#1a2b25] flex flex-wrap gap-x-2 md:gap-x-3">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page ----------------------------------- */

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } },
};

export default function AboutPage() {
  return (
    <main className="font-sans text-gray-900 bg-white">
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="relative h-[70vh] sm:min-h-[96vh] w-full sm:rounded-4xl flex items-end overflow-hidden bg-[#0a1410]">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1800"
          alt="Construction site at dusk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#0a1410]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1410] via-transparent to-transparent" />

        <motion.div
          className="relative z-10 px-6 sm:px-10 pb-12 sm:pb-20 flex flex-col items-start space-y-6 max-w-3xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6dff9a]/20 border border-[#6dff9a]/40 w-fit">
            <span className="text-sm font-semibold text-[#86e395]">About us</span>
          </motion.div>

          <motion.h1 variants={item} className="text-3xl sm:text-5xl font-semibold text-white leading-[1.1] tracking-tight drop-shadow-lg">
            We build the foundation. <br className="hidden sm:block" />
            <span className="text-[#86e395]">You scale the future.</span>
          </motion.h1>

          <motion.p variants={item} className="text-sm md:text-base text-white/80 max-w-md leading-relaxed">
            One team for design engineering, PMC and construction — from the first sketch to the final handover.
          </motion.p>

          <motion.a
            variants={item}
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-2 rounded-full overflow-hidden group shadow-[0_8px_32px_rgba(134,227,149,0.2)]"
          >
            <span
              className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #86e395 0%, #5fd372 55%, #3ebd52 100%)" }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -8px 12px rgba(0,60,20,0.2)" }}
            />
            <span className="relative text-lg text-gray-900">Discuss your project</span>
          </motion.a>
        </motion.div>
      </section>

      {/* --------------------------- SCROLL INTRO ------------------------- */}
      <ScrollText />

      {/* ------------------------------ STATS ----------------------------- */}
      <section className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#f8f9fa] rounded-[1rem] p-6 md:p-8">
              <div className="text-4xl md:text-5xl font-semibold text-[#1a3a2e] tracking-tight">{s.value}</div>
              <div className="mt-3 text-base font-medium text-[#1a1a1a]">{s.label}</div>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ MISSION / VISION ------------------------ */}
      <section className="px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-2">
          <div className="relative rounded-[1rem] overflow-hidden min-h-[420px] group">
            <img
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
              alt="Steel structure under construction"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B31]/95 via-[#2C3B31]/40 to-transparent" />
            <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 rounded-xl bg-[#1A2520]/85 p-5 md:p-6">
              <h3 className="text-white font-medium text-lg md:text-xl mb-1">Built in-house, start to finish</h3>
              <p className="text-gray-300 text-sm">Engineers, architects and site managers on one payroll, answering to one project lead.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-2">
            {pillars.map((p) => (
              <div key={p.title} className="flex-1 bg-white border border-gray-200 rounded-[1rem] p-6 md:p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#6dff9a] flex items-center justify-center text-black mb-5">
                  <p.icon size={22} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-medium text-[#1a1a1a] mb-2">{p.title}</h3>
                <p className="text-gray-500 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ VALUES ---------------------------- */}
      <section className="px-6 md:px-12 py-16">
        <div className="mb-8">
          <Overline>What we stand for</Overline>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Our values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-[#f8f9fa] rounded-2xl p-6 md:p-8 flex flex-col gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-[#0b6827]">
                <v.icon size={20} />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-[#1a1a1a]">{v.title}</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- PROCESS ---------------------------- */}
      <section className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Overline>How we work</Overline>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Six steps from idea to operation
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-sm">
                The same proven sequence on every project, so you always know what is done, what is next and who is responsible.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8 border-t border-gray-300">
            {process.map((step, i) => (
              <li key={step.title} className="flex items-center gap-6 lg:gap-12 py-5 border-b border-gray-300">
                <span className="text-sm font-medium text-gray-400 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h3 className="text-base md:text-xl text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{step.text}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 border border-gray-400 rounded-full flex items-center justify-center text-gray-700 shrink-0">
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------- WHY CHOOSE US ------------------------ */}
      <section className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-2 items-stretch">
          <div className="bg-gradient-to-br from-[#6dff9a] to-[#0b6827] rounded-[1rem] p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-medium text-[#1a1a1a] tracking-tight mb-4">
              Why clients choose us
            </h2>
            <p className="text-gray-900 leading-relaxed max-w-md">
              You should not have to manage contractors to get a building. We take the whole job and report back, so you can focus on running your business.
            </p>
          </div>

          <ul className="bg-[#f8f9fa] rounded-[1rem] p-8 md:p-10 flex flex-col gap-4">
            {differentiators.map((d) => (
              <li key={d} className="flex items-start gap-4">
                <span className="mt-0.5 w-7 h-7 rounded-full bg-[#6dff9a] flex items-center justify-center text-black shrink-0">
                  <Check size={16} strokeWidth={3} />
                </span>
                <span className="text-base md:text-lg text-[#1a1a1a]">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------- CTA ----------------------------- */}
      <section id="contact" className="px-6 md:px-12 pt-8 pb-20">
        <div className="relative rounded-[1rem] overflow-hidden bg-[#0a1410] px-8 py-14 md:px-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b6827]/40 via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-4">
                Have a project in mind?
              </h2>
              <p className="text-white/70 leading-relaxed">
                Tell us about your site and timeline. We will come back with a scope, budget and schedule.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 self-start md:self-auto px-8 py-3.5 rounded-full text-gray-900 font-medium hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #6dff9a 0%, #4fd97a 55%, #34c266 100%)" }}
            >
              Get a free quote
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>
      <HeroContactSection/>
    </main>
  );
}