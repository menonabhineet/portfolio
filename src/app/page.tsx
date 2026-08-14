"use client";

import { resumeData } from "@/data/resume-data";
import { MatrixBackground } from "@/components/MatrixBackground";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  FolderGit2,
  Send,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Server,
  Terminal,
  GraduationCap,
  Briefcase,
  Layers,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Cpu,
  Keyboard,
  ArrowRight,
  LayoutGrid,
  Rotate3d,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

// --- CONTACT FORM COMPONENT ---
const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const subject = `Portfolio Inquiry from ${formData.get("name")}`;
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get(
      "email"
    )}\n\nMessage:\n${formData.get("message")}`;

    setTimeout(() => {
      window.location.href = `mailto:${
        resumeData.contact.email
      }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-lg mx-auto text-left">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5 ml-1">
            Your Name
          </label>
          <input
            id="contact-name"
            required
            type="text"
            name="name"
            className="block w-full rounded-2xl border border-white/10 bg-slate-900/90 p-3.5 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none transition-all text-sm shadow-inner"
            placeholder="e.g. Alex Morgan"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5 ml-1">
            Your Email
          </label>
          <input
            id="contact-email"
            required
            type="email"
            name="email"
            className="block w-full rounded-2xl border border-white/10 bg-slate-900/90 p-3.5 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none transition-all text-sm shadow-inner"
            placeholder="alex@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1.5 ml-1">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          name="message"
          rows={4}
          className="block w-full rounded-2xl border border-white/10 bg-slate-900/90 p-3.5 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none transition-all text-sm shadow-inner"
          placeholder="Hi Abhineet, let's discuss an engineering role..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-400 text-slate-950 px-6 py-4 text-sm font-semibold hover:bg-teal-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer"
      >
        {status === "submitting" ? (
          "Preparing Email..."
        ) : status === "success" ? (
          "Opening Mail Client..."
        ) : (
          <>
            <span>Send Direct Message</span>
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
};

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectViewMode, setProjectViewMode] = useState<"3d" | "grid">("3d");

  // --- PROJECT CATEGORIES & FILTER STATE ---
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & RAG" },
    { id: "fullstack", label: "Full-Stack & Systems" },
    { id: "ml", label: "Machine Learning" },
    { id: "viz", label: "Data & Viz" },
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const filteredProjects =
    selectedCategory === "all"
      ? resumeData.projects
      : resumeData.projects.filter(
          (p) =>
            Array.isArray((p as any).categories) &&
            (p as any).categories.includes(selectedCategory)
        );

  const nextProject = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    setCurrentProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  const prevProject = useCallback(() => {
    if (filteredProjects.length <= 1) return;
    setCurrentProjectIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  }, [filteredProjects.length]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentProjectIndex(0);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(resumeData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // --- KEYBOARD NAVIGATION FOR CAROUSEL ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (projectViewMode !== "3d") return;
      if (e.key === "ArrowLeft") {
        prevProject();
      } else if (e.key === "ArrowRight") {
        nextProject();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject, projectViewMode]);

  // --- MOUSE TRACKING ---
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- SCROLL HANDLER ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- ACTIVE SECTION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -35% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const navItems = ["About", "Experience", "Projects", "Education", "Skills", "Contact"];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#050814] font-sans selection:bg-teal-400 selection:text-slate-950 text-slate-400 overflow-x-hidden"
      style={{
        ["--mouse-x" as any]: `${mousePosition.x}px`,
        ["--mouse-y" as any]: `${mousePosition.y}px`,
      }}
    >
      {/* SUBTLE STATIC AMBIENT ACCENTS */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="spotlight-bg pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" />
      <MatrixBackground />

      {/* STICKY HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050814]/85 backdrop-blur-2xl shadow-2xl border-b border-white/[0.06] py-3.5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="text-xl font-bold text-slate-100 tracking-tight hover:text-teal-400 transition-colors font-mono flex items-center gap-1 group"
          >
            <span className="text-teal-400 group-hover:-translate-x-0.5 transition-transform">&lt;</span>
            <span className="bg-gradient-to-r from-slate-100 to-teal-200 bg-clip-text text-transparent font-bold">
              {resumeData.initials}
            </span>
            <span className="text-teal-400 group-hover:translate-x-0.5 transition-transform">/&gt;</span>
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`relative transition-all px-4 py-1.5 rounded-full text-xs font-mono tracking-wide cursor-pointer ${
                        isActive
                          ? "text-slate-950 font-bold bg-teal-400 shadow-md"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            className="md:hidden text-slate-200 p-2.5 rounded-2xl bg-slate-900/90 border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#050814]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl">
            <ul className="flex flex-col gap-3 text-center">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`w-full py-3 rounded-xl text-sm font-mono transition-colors ${
                      activeSection === item.toLowerCase()
                        ? "text-slate-950 bg-teal-400 font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 lg:px-0">
        {/* HERO SECTION - FLUID, MODERN, SPACIOUS */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-start pt-28 pb-20">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-mono mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            <span>Open to Relocation • MS in Computer Science @ UIC</span>
          </div>

          <p className="text-teal-400 font-mono text-sm md:text-base mb-3 tracking-wider font-semibold">
            Hi, my name is
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 leading-none">
            <span className="bg-gradient-to-r from-white via-slate-100 to-teal-300 bg-clip-text text-transparent">
              {resumeData.name}
            </span>
          </h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-300 mb-6 tracking-tight leading-tight">
            Data Engineer &amp; Full-Stack AI Developer.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Master&apos;s student in Computer Science at UIC (4.0 GPA) with 2+ years of enterprise data engineering experience at LTIMindtree. I build high-performance data systems, scalable cloud ETL pipelines, and intelligent AI/RAG applications.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-7 py-4 rounded-full bg-teal-400 text-slate-950 font-mono font-bold text-sm hover:bg-teal-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-7 py-4 rounded-full bg-slate-900/90 border border-white/15 text-slate-200 font-mono text-sm hover:border-teal-400 hover:text-teal-300 transition-all duration-300 cursor-pointer shadow-md"
            >
              Get In Touch
            </button>
            <button
              onClick={copyEmailToClipboard}
              className="px-6 py-4 rounded-full bg-slate-900/90 border border-white/15 text-slate-300 font-mono text-sm hover:text-teal-300 hover:border-teal-400 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md"
              title="Copy menonabhineet@gmail.com"
            >
              {copiedEmail ? <Check size={16} className="text-teal-400" /> : <Copy size={16} />}
              <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
            </button>
          </div>

          {/* Core Technical Disciplines Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-white/[0.08] w-full">
            <span className="text-xs font-mono text-slate-500 mr-2">Core Focus:</span>
            {[
              { name: "Snowflake & Cloud ETL", icon: Database },
              { name: "LLM & Multi-Agent RAG", icon: Cpu },
              { name: "Next.js & React 19", icon: Server },
              { name: "Systems & Compiler Design", icon: Code2 },
            ].map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-slate-300 text-xs font-mono hover:border-teal-400/50 hover:text-teal-200 transition-all shadow-sm"
              >
                <item.icon size={13} className="text-teal-400" />
                {item.name}
              </span>
            ))}
          </div>
        </section>

        {/* 01. ABOUT */}
        <section id="about" className="py-20 sm:py-32">
          <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-4">
            About Me
            <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Bio & Metrics */}
            <div className="md:col-span-7 space-y-6 text-slate-300 text-base leading-relaxed">
              <p>{resumeData.about}</p>
              <p className="text-slate-400">
                Core technologies and frameworks I engineer with daily:
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                {[
                  "Python & C++",
                  "LLMs & RAG",
                  "Snowflake & SQL",
                  "Next.js & React 19",
                  "Zustand & TypeScript",
                  "Docker & Azure ADF",
                ].map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900/90 border border-white/[0.08] text-slate-200 shadow-sm"
                  >
                    <span className="text-teal-400 font-bold">▹</span> {skill}
                  </li>
                ))}
              </ul>

              {/* Fast Fact Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="rounded-2xl p-4 bg-slate-900/90 border border-white/[0.08] text-center shadow-lg">
                  <p className="text-teal-400 font-bold text-lg font-mono">4.0 / 4.0</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">MS CS GPA @ UIC</p>
                </div>
                <div className="rounded-2xl p-4 bg-slate-900/90 border border-white/[0.08] text-center shadow-lg">
                  <p className="text-teal-400 font-bold text-lg font-mono">2+ Years</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Industry Exp</p>
                </div>
                <div className="rounded-2xl p-4 bg-slate-900/90 border border-white/[0.08] text-center shadow-lg">
                  <p className="text-teal-400 font-bold text-lg font-mono">12+</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Shipped Projects</p>
                </div>
              </div>
            </div>

            {/* Profile Picture Card - Perfectly Centered Framing */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-[280px]">
                <div className="relative rounded-3xl p-3 bg-slate-900/90 border border-teal-500/30 shadow-[0_0_35px_rgba(45,212,191,0.2)] group-hover:border-teal-400/70 group-hover:shadow-[0_0_45px_rgba(45,212,191,0.35)] transition-all duration-500">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-800">
                    <img
                      src={resumeData.avatarUrl}
                      alt={resumeData.name}
                      className="w-full h-full object-cover object-[67%_18%] scale-105 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity"></div>
                  </div>

                  {/* Floating Location Pill */}
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-mono text-teal-300 font-semibold py-1">
                    <MapPin size={13} className="text-teal-400" />
                    <span>Open to Relocation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02. EXPERIENCE */}
        <section id="experience" className="py-20 sm:py-32 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
            Experience
            <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
          </h2>
          <div className="relative border-l border-white/10 ml-3 space-y-12">
            {resumeData.work.map((job) => (
              <div key={job.company} className="relative pl-8 group">
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-800 ring-4 ring-[#050814] group-hover:bg-teal-400 group-hover:ring-teal-400/20 transition-all" />
                
                <div className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-8 transition-all shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-100">
                      {job.title} <span className="text-teal-400">@</span>{" "}
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline hover:text-teal-300 transition-colors"
                      >
                        {job.company}
                      </a>
                    </h3>
                    <span className="font-mono text-xs text-slate-400 bg-slate-800/90 px-3.5 py-1 rounded-full w-fit mt-1 sm:mt-0 border border-white/10">
                      {job.start} — {job.end}
                    </span>
                  </div>

                  {/* Badges */}
                  {job.badges && job.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.badges.map((badge) => (
                        <span
                          key={badge}
                          className="text-[11px] font-mono text-teal-300 bg-teal-400/10 px-2.5 py-0.5 rounded-md border border-teal-400/20"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="list-none space-y-2.5 text-slate-300 text-sm">
                    {Array.isArray(job.description) ? (
                      job.description.map((point, idx) => (
                        <li key={idx} className="relative pl-5 leading-relaxed">
                          <span className="absolute left-0 text-teal-400 font-bold">▹</span>
                          {point}
                        </li>
                      ))
                    ) : (
                      <li>{job.description}</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03. PROJECTS SECTION */}
        <section id="projects" className="py-20 sm:py-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-4">
              Featured Projects
              <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
            </h2>
            
            {/* View Mode Toggle: 3D vs Grid */}
            <div className="flex items-center gap-2">
              <div className="inline-flex p-1 rounded-full bg-slate-900/90 border border-white/10 shadow-md">
                <button
                  onClick={() => setProjectViewMode("3d")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    projectViewMode === "3d"
                      ? "bg-teal-400 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="3D Carousel View"
                >
                  <Rotate3d size={13} />
                  <span>3D Carousel</span>
                </button>
                <button
                  onClick={() => setProjectViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    projectViewMode === "grid"
                      ? "bg-teal-400 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={13} />
                  <span>Grid View</span>
                </button>
              </div>
            </div>
          </div>

          {/* CATEGORY FILTER TABS (UNIFIED DOCK - NO WEIRD OUTLINES) */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-slate-900/95 border border-white/10 shadow-2xl overflow-x-auto max-w-full">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? resumeData.projects.length
                    : resumeData.projects.filter(
                        (p) =>
                          Array.isArray((p as any).categories) &&
                          (p as any).categories.includes(cat.id)
                      ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-teal-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(45,212,191,0.4)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isSelected
                          ? "bg-slate-950/30 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VIEW MODE 1: 3D PERSPECTIVE CAROUSEL */}
          {projectViewMode === "3d" ? (
            <div className="relative w-full max-w-4xl mx-auto h-[650px] flex items-center justify-center">
              {filteredProjects.length > 1 && (
                <>
                  {/* Left Button */}
                  <button
                    onClick={prevProject}
                    aria-label="Previous project"
                    className="absolute -left-4 md:-left-20 z-40 p-3.5 rounded-full bg-slate-900/90 text-teal-400 hover:bg-teal-400 hover:text-slate-950 hover:scale-110 transition-all border border-white/10 shadow-2xl cursor-pointer"
                  >
                    <ChevronLeft size={28} />
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={nextProject}
                    aria-label="Next project"
                    className="absolute -right-4 md:-right-20 z-40 p-3.5 rounded-full bg-slate-900/90 text-teal-400 hover:bg-teal-400 hover:text-slate-950 hover:scale-110 transition-all border border-white/10 shadow-2xl cursor-pointer"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* CAROUSEL ITEMS */}
              <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                {filteredProjects.map((project, index) => {
                  let position = "hidden";
                  let zIndex = 0;
                  let opacity = 0;
                  let scale = 0.8;
                  let translateX = "0%";
                  let rotateY = "0deg";

                  if (index === currentProjectIndex) {
                    position = "active";
                    zIndex = 30;
                    opacity = 1;
                    scale = 1;
                    translateX = "0%";
                  } else if (
                    filteredProjects.length > 2 &&
                    index ===
                      (currentProjectIndex - 1 + filteredProjects.length) %
                        filteredProjects.length
                  ) {
                    position = "prev";
                    zIndex = 10;
                    opacity = 0.35;
                    scale = 0.85;
                    translateX = "-80%";
                    rotateY = "5deg";
                  } else if (
                    filteredProjects.length >= 2 &&
                    index === (currentProjectIndex + 1) % filteredProjects.length
                  ) {
                    position = "next";
                    zIndex = 10;
                    opacity = 0.35;
                    scale = 0.85;
                    translateX = "80%";
                    rotateY = "-5deg";
                  }

                  if (position === "hidden") return null;

                  return (
                    <div
                      key={project.title}
                      className="absolute top-0 w-[300px] md:w-[390px] h-[590px] transition-all duration-500 ease-in-out"
                      style={{
                        zIndex: zIndex,
                        opacity: opacity,
                        transform: `translateX(${translateX}) scale(${scale}) rotateY(${rotateY})`,
                      }}
                    >
                      <div className="w-full h-full bg-slate-900/95 backdrop-blur-2xl border border-teal-500/25 rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden group hover:border-teal-400/60 transition-all">
                        {/* Top Bar */}
                        <div className="flex justify-between items-center mb-6">
                          <div className="p-3 rounded-2xl bg-teal-400/10 text-teal-400 border border-teal-400/20 shadow-inner">
                            <FolderGit2 size={26} />
                          </div>
                          {project.link.href ? (
                            <a
                              href={project.link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/20 transition-all"
                              aria-label={`Open ${project.title} GitHub repository`}
                            >
                              <ArrowUpRight size={22} />
                            </a>
                          ) : (
                            <span className="text-xs font-mono text-teal-400 bg-teal-400/10 border border-teal-400/30 px-3 py-1 rounded-full">
                              {project.link.label || "Coursework"}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-slate-100 mb-4 leading-tight group-hover:text-teal-300 transition-colors">
                          {project.link.href ? (
                            <a
                              href={project.link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-teal-300 transition-colors"
                            >
                              {project.title}
                            </a>
                          ) : (
                            <span>{project.title}</span>
                          )}
                        </h3>

                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                          <p className="text-slate-300 leading-relaxed text-sm">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="mt-6 pt-6 border-t border-white/[0.08]">
                          <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
                            {project.techStack.map((tech) => (
                              <li
                                key={tech}
                                className="text-teal-300 bg-teal-400/10 border border-teal-400/20 px-2.5 py-1 rounded-lg text-[11px]"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: RESPONSIVE GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.title}
                  className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-8 flex flex-col justify-between shadow-xl group transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-5">
                      <div className="p-3 rounded-2xl bg-teal-400/10 text-teal-400 border border-teal-400/20">
                        <FolderGit2 size={24} />
                      </div>
                      {project.link.href ? (
                        <a
                          href={project.link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-teal-400/10 transition-colors"
                          aria-label={`Open ${project.title}`}
                        >
                          <ArrowUpRight size={20} />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-teal-400 bg-teal-400/10 border border-teal-400/30 px-3 py-1 rounded-full">
                          {project.link.label || "Coursework"}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-teal-300 transition-colors">
                      {project.link.href ? (
                        <a href={project.link.href} target="_blank" rel="noreferrer" className="hover:underline">
                          {project.title}
                        </a>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {project.techStack.map((tech) => (
                        <li
                          key={tech}
                          className="text-teal-300 bg-teal-400/10 border border-teal-400/20 px-2.5 py-0.5 rounded-md text-[11px]"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Dots in 3D Mode */}
          {projectViewMode === "3d" && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="flex gap-2 items-center">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProjectIndex(idx)}
                    aria-label={`Go to project ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentProjectIndex
                        ? "w-8 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.7)]"
                        : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs text-slate-500">
                Project {currentProjectIndex + 1} of {filteredProjects.length}
              </span>
            </div>
          )}
        </section>

        {/* 04. EDUCATION */}
        <section id="education" className="py-20 sm:py-32 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
            Education
            <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
          </h2>
          <div className="space-y-8">
            {resumeData.education.map((edu) => (
              <div
                key={edu.school}
                className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-8 border-l-4 border-l-teal-400 transition-all shadow-xl"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{edu.school}</h3>
                    <p className="text-teal-400 font-mono text-sm mt-1">{edu.degree}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-400 bg-slate-800/90 px-3.5 py-1 rounded-full whitespace-nowrap w-fit border border-white/10">
                    {edu.start} — {edu.end}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 05. SKILLS */}
        <section id="skills" className="py-20 sm:py-32">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
            Skills &amp; Competencies
            <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Languages",
                icon: Code2,
                skills: resumeData.skills.languages,
              },
              {
                title: "Data Engineering & Cloud",
                icon: Database,
                skills: resumeData.skills.dataTools,
              },
              {
                title: "Web Frameworks & Libraries",
                icon: Server,
                skills: resumeData.skills.frameworks,
              },
              {
                title: "Tools, Systems & DevOps",
                icon: Terminal,
                skills: resumeData.skills.devTools,
              },
            ].map((category) => (
              <div
                key={category.title}
                className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-8 transition-all shadow-xl"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-2xl bg-teal-400/10 text-teal-400 border border-teal-400/20 shadow-inner">
                    <category.icon size={22} />
                  </div>
                  <h3 className="text-slate-100 font-bold text-lg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 text-xs font-mono text-teal-300 bg-slate-950/80 rounded-xl border border-white/10 hover:border-teal-400/50 hover:text-teal-200 transition-all duration-200"
                    >
                      <span className="text-teal-400 mr-1.5 font-bold">▹</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. CONTACT - CLEAN, POLISHED PILL BUTTONS */}
        <section
          id="contact"
          className="py-20 sm:py-32 text-center max-w-2xl mx-auto mb-16"
        >
          <div className="bg-slate-900/90 border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl">
            <p className="text-teal-400 font-mono mb-3 text-sm tracking-wide font-semibold">What&apos;s Next?</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get In Touch</h2>
            <p className="text-base text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto">
              Whether you have an opportunity in Data Engineering, AI/LLMs, or Full-Stack Systems, or want to discuss engineering challenges, my inbox is always open.
            </p>

            {/* Direct Contact Options - Clean Solid Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-teal-400 text-xs font-mono text-slate-200 hover:text-teal-300 transition-all shadow-md cursor-pointer"
              >
                {copiedEmail ? <Check size={14} className="text-teal-400" /> : <Copy size={14} className="text-teal-400" />}
                <span>{copiedEmail ? "Email Copied!" : resumeData.contact.email}</span>
              </button>
              <a
                href="https://linkedin.com/in/menonabhineet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-teal-400 text-xs font-mono text-slate-200 hover:text-teal-300 transition-all shadow-md"
              >
                <Linkedin size={14} className="text-teal-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/menonabhineet"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-teal-400 text-xs font-mono text-slate-200 hover:text-teal-300 transition-all shadow-md"
              >
                <Github size={14} className="text-teal-400" />
                <span>GitHub</span>
              </a>
            </div>

            <ContactForm />
          </div>
        </section>

        <footer className="pb-12 text-center text-xs text-slate-500 font-mono hover:text-teal-400 transition-colors">
          <a
            href="https://github.com/menonabhineet/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            <p>Designed &amp; Engineered by {resumeData.name}</p>
          </a>
        </footer>
      </main>
    </div>
  );
}