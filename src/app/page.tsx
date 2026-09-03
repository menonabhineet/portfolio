"use client";

import { resumeData } from "@/data/resume-data";
import { MatrixBackground } from "@/components/MatrixBackground";
import { ResumeModal } from "@/components/ResumeModal";
import { CommandPalette } from "@/components/CommandPalette";
import { ViewCounter } from "@/components/ViewCounter";
import { fuzzyMatchItem } from "@/lib/fuzzy";
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
  FileText,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectViewMode, setProjectViewMode] = useState<"3d" | "grid">("3d");

  // Modals state
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);

  // --- PROJECT CATEGORIES ---
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & RAG" },
    { id: "fullstack", label: "Full-Stack & Systems" },
    { id: "ml", label: "Machine Learning" },
    { id: "viz", label: "Data & Viz" },
  ] as const;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Filtered Projects based on Category, Fuzzy Search Query, and Active Skill Filter
  const filteredProjects = useMemo(() => {
    // 1. Initial filter by category & active skill
    const categoryAndSkillFiltered = resumeData.projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (Array.isArray((p as any).categories) &&
          (p as any).categories.includes(selectedCategory));

      const matchesSkill =
        !selectedSkillFilter ||
        p.techStack.some(
          (t) => t.toLowerCase() === selectedSkillFilter.toLowerCase()
        ) ||
        p.description.toLowerCase().includes(selectedSkillFilter.toLowerCase());

      return matchesCategory && matchesSkill;
    });

    if (!searchQuery.trim()) {
      return categoryAndSkillFiltered;
    }

    // 2. Multi-field fuzzy matching with weighted scoring
    const scored = categoryAndSkillFiltered
      .map((p) => {
        const { isMatch, score } = fuzzyMatchItem(searchQuery, [
          { text: p.title, weight: 3.5 },
          { text: p.techStack, weight: 2.5 },
          { text: (p as any).impactBadges || [], weight: 2.0 },
          { text: (p as any).categories || [], weight: 1.5 },
          { text: p.description, weight: 1.0 },
        ]);
        return { project: p, isMatch, score };
      })
      .filter((item) => item.isMatch)
      .sort((a, b) => b.score - a.score);

    return scored.map((item) => item.project);
  }, [selectedCategory, searchQuery, selectedSkillFilter]);

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

  const handleSkillClick = (skillName: string) => {
    if (selectedSkillFilter === skillName) {
      setSelectedSkillFilter(null);
    } else {
      setSelectedSkillFilter(skillName);
      setSelectedCategory("all");
      setCurrentProjectIndex(0);
      scrollToSection("projects");
    }
  };

  const handleSelectProjectFromPalette = (projectTitle: string) => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedSkillFilter(null);
    const index = resumeData.projects.findIndex((p) => p.title === projectTitle);
    if (index !== -1) {
      setCurrentProjectIndex(index);
    }
    scrollToSection("projects");
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(resumeData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // --- KEYBOARD SHORTCUTS (Ctrl+K, 3D Navigation) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K for Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 3D Carousel arrow navigation
      if (projectViewMode === "3d" && !isCommandPaletteOpen && !isResumeModalOpen) {
        if (e.key === "ArrowLeft") {
          prevProject();
        } else if (e.key === "ArrowRight") {
          nextProject();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject, projectViewMode, isCommandPaletteOpen, isResumeModalOpen]);

  const spotlightRef = useRef<HTMLDivElement>(null);

  // --- MOUSE SPOTLIGHT (Direct Targeted CSS Update - 0 Document Invalidation) ---
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty("--mouse-x", `${event.clientX}px`);
          spotlightRef.current.style.setProperty("--mouse-y", `${event.clientY}px`);
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // --- SCROLL HANDLER (Passive + RAF Throttled) ---
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <div className="relative min-h-screen bg-[#050814] font-sans selection:bg-teal-400 selection:text-slate-950 text-slate-400 overflow-x-hidden">
      {/* AMBIENT ACCENTS */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10 transform-gpu" style={{ transform: "translateZ(0)" }} />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-indigo-500/[0.02] rounded-full blur-[140px] pointer-events-none -z-10 transform-gpu" style={{ transform: "translateZ(0)" }} />

      <div ref={spotlightRef} className="spotlight-bg pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 lg:absolute" />
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

          {/* Nav Items */}
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

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2.5">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 hover:border-teal-400/40 text-xs font-mono text-slate-300 hover:text-teal-300 transition-all cursor-pointer shadow-sm"
              title="Open Command Palette (Ctrl+K or Cmd+K)"
            >
              <Search size={13} className="text-teal-400" />
              <span className="text-slate-400">Search</span>
              <kbd className="px-1.5 py-0.2 rounded bg-slate-800 border border-white/10 text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Official Resume Button */}
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 hover:border-teal-400 hover:bg-teal-400 hover:text-slate-950 text-teal-300 text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-sm"
              title="Preview & Download Official Resume PDF"
            >
              <FileText size={13} />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-slate-200 p-2.5 rounded-2xl bg-slate-900/90 border border-white/10 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#050814]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden shadow-2xl">
            <ul className="flex flex-col gap-3 text-center mb-4">
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

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsResumeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-400 text-slate-950 font-mono font-bold text-sm"
              >
                <FileText size={16} />
                <span>View Resume PDF</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCommandPaletteOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-white/10 text-slate-300 font-mono text-sm"
              >
                <Search size={16} className="text-teal-400" />
                <span>Search &amp; Commands</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 md:px-12 lg:px-0">
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-start pt-28 pb-20 relative">
          {/* Ambient Contrast Shield - Ensures text is 100% visible and crisp against matrix background */}
          <div className="absolute -left-12 sm:-left-24 top-1/4 bottom-1/4 w-full max-w-3xl -z-10 bg-[#050814]/85 blur-[120px] rounded-full pointer-events-none" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-mono mb-8 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            <span>Open to Relocation • MS in Computer Science @ UIC</span>
          </div>

          <p className="text-teal-400 font-mono text-sm md:text-base mb-3 tracking-wider font-semibold drop-shadow-[0_2px_8px_rgba(5,8,20,0.9)]">
            Hi, my name is
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 leading-none drop-shadow-[0_4px_24px_rgba(5,8,20,0.95)]">
            <span className="bg-gradient-to-r from-white via-slate-100 to-teal-300 bg-clip-text text-transparent">
              {resumeData.name}
            </span>
          </h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-100 mb-6 tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">
            Data Engineer &amp; Full-Stack AI Developer.
          </h2>
          <p className="text-base sm:text-lg text-slate-200 mb-10 max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(5,8,20,0.95)] font-normal">
            Master&apos;s student in Computer Science at UIC (4.0 GPA) with 2+ years of enterprise data engineering experience at LTIMindtree. I build high-performance data systems, scalable cloud ETL pipelines, and intelligent AI/RAG applications.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3.5 mb-14">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-7 py-4 rounded-full bg-teal-400 text-slate-950 font-mono font-bold text-sm hover:bg-teal-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-6 py-4 rounded-full bg-teal-400/10 border border-teal-400/40 text-teal-300 font-mono font-semibold text-sm hover:bg-teal-400 hover:text-slate-950 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md"
            >
              <FileText size={16} />
              <span>View Resume</span>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-4 rounded-full bg-slate-900/90 border border-white/15 text-slate-200 font-mono text-sm hover:border-teal-400 hover:text-teal-300 transition-all duration-300 cursor-pointer shadow-md"
            >
              Get In Touch
            </button>
            <button
              onClick={copyEmailToClipboard}
              className="px-5 py-4 rounded-full bg-slate-900/90 border border-white/15 text-slate-300 font-mono text-sm hover:text-teal-300 hover:border-teal-400 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md"
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
          <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-4 drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">
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

            {/* Profile Picture Card */}
            <div className="hidden md:flex md:col-span-5 justify-center">
              <div className="relative group w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px]">
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
        <section id="experience" className="py-20 sm:py-32 max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4 drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">
            Experience
            <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
          </h2>
          <div className="relative">
            {resumeData.work.map((job) => {
              const isPresent = job.end.toLowerCase() === "present";
              return (
                <div
                  key={job.company}
                  className="relative md:grid md:grid-cols-[145px_1fr] md:gap-8 group"
                >
                  {/* Desktop Left Date Column */}
                  <div className="hidden md:flex flex-col items-end text-right pt-6 pr-2 font-mono select-none">
                    <span className="text-xs font-semibold text-slate-200 tracking-wider">
                      {job.start}
                    </span>
                    <span className="text-[10px] text-slate-500 my-0.5">to</span>
                    <span
                      className={`text-xs font-bold inline-flex items-center gap-1.5 ${
                        isPresent ? "text-emerald-400" : "text-slate-400"
                      }`}
                    >
                      {isPresent && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                      {job.end}
                    </span>
                  </div>

                  {/* Right Column: Timeline Spine & Card */}
                  <div className="relative pl-6 sm:pl-8 border-l border-white/10 ml-3 md:ml-0 pb-10 md:pb-14 last:pb-2">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full ring-4 ring-[#0b1120] transition-all duration-300 ${
                        isPresent
                          ? "bg-emerald-400 ring-emerald-500/20 group-hover:bg-teal-300 group-hover:scale-125 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                          : "bg-slate-700 ring-[#0b1120] group-hover:bg-teal-400 group-hover:ring-teal-400/20 group-hover:scale-125"
                      }`}
                    />

                    {/* Content Card */}
                    <div className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-4 sm:p-6 md:p-8 transition-all shadow-xl hover:-translate-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-base md:text-lg font-bold text-slate-100">
                          {job.title} <span className="text-teal-400">@</span>{" "}
                          {job.link ? (
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline hover:text-teal-300 transition-colors"
                            >
                              {job.company}
                            </a>
                          ) : (
                            <span>{job.company}</span>
                          )}
                        </h3>

                        {/* Mobile Only Date Badge */}
                        <span className="md:hidden font-mono text-[10px] sm:text-xs text-slate-400 bg-slate-800/90 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full w-fit mt-1 sm:mt-0 border border-white/10">
                          {job.start} — {job.end}
                        </span>
                      </div>

                      {/* Impact Highlights Badges (Quantified Engineering Metrics) */}
                      {(job as any).impactBadges && (job as any).impactBadges.length > 0 && (
                        <div className="flex flex-wrap gap-2 my-3.5">
                          {(job as any).impactBadges.map((badge: string) => (
                            <span
                              key={badge}
                              className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-teal-300 bg-teal-950/40 border border-teal-500/25 px-2.5 py-1 rounded-lg"
                            >
                              <Zap size={11} className="text-teal-400 flex-shrink-0" />
                              <span>{badge}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Standard Tech Badges */}
                      {job.badges && job.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {job.badges.map((badge) => (
                            <span
                              key={badge}
                              className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-white/10"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Full Descriptions Preserved */}
                      <ul className="list-none space-y-2 sm:space-y-2.5 text-slate-300 text-xs sm:text-sm">
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
                </div>
              );
            })}
          </div>
        </section>

        {/* 03. PROJECTS SECTION */}
        <section id="projects" className="py-20 sm:py-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-4 drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">
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

          {/* SEARCH & FILTER CONTROLS BAR */}
          <div className="space-y-4 mb-10">
            {/* Keyword Search Input */}
            <div className="max-w-md mx-auto relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentProjectIndex(0);
                }}
                placeholder="Search projects by tech, keyword, or metric (e.g. 'RAG', 'Snowflake', 'Accuracy')..."
                className="w-full pl-10 pr-10 py-3 rounded-full bg-slate-900/90 border border-white/10 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Active Skill Filter Pill (if activated) */}
            {selectedSkillFilter && (
              <div className="flex justify-center items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Filtering by skill:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400 text-slate-950 font-mono text-xs font-bold shadow-md">
                  <span>{selectedSkillFilter}</span>
                  <button
                    onClick={() => setSelectedSkillFilter(null)}
                    className="hover:bg-slate-950/20 rounded-full p-0.5 cursor-pointer"
                    title="Remove skill filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              </div>
            )}

            {/* Category Filter Tabs */}
            <div className="flex justify-center">
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

            {/* Result Counter */}
            <div className="text-center">
              <span className="text-[11px] font-mono text-slate-500">
                Showing {filteredProjects.length} of {resumeData.projects.length} projects
              </span>
            </div>
          </div>

          {/* EMPTY STATE */}
          {filteredProjects.length === 0 ? (
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-12 text-center max-w-lg mx-auto">
              <FolderGit2 size={36} className="mx-auto text-slate-500 mb-3" />
              <h3 className="text-base font-bold text-slate-200 font-mono">No matching projects found</h3>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Try searching for a different keyword or clearing active filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSkillFilter(null);
                }}
                className="px-4 py-2 rounded-full bg-teal-400 text-slate-950 text-xs font-mono font-bold hover:bg-teal-300 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : projectViewMode === "3d" ? (
            /* VIEW MODE 1: 3D PERSPECTIVE CAROUSEL */
            <div className="relative w-full max-w-4xl mx-auto h-[560px] md:h-[670px] flex items-center justify-center">
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
                      className="absolute top-0 w-[300px] sm:w-[340px] md:w-[410px] h-[520px] md:h-[630px] transition-all duration-500 ease-in-out"
                      style={{
                        zIndex: zIndex,
                        opacity: opacity,
                        transform: `translateX(${translateX}) scale(${scale}) rotateY(${rotateY})`,
                      }}
                    >
                      <div className="w-full h-full bg-slate-900/95 backdrop-blur-2xl border border-teal-500/25 rounded-3xl p-5 md:p-7 shadow-2xl flex flex-col relative overflow-hidden group hover:border-teal-400/60 transition-all">
                        {/* Top Bar */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="p-3 rounded-2xl bg-teal-400/10 text-teal-400 border border-teal-400/20 shadow-inner">
                            <FolderGit2 size={24} />
                          </div>
                          <div className="flex items-center gap-2">
                            {(project as any).liveUrl && (
                              <a
                                href={(project as any).liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 text-xs font-mono font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                                aria-label={`Launch live web application for ${project.title}`}
                              >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span>Live App</span>
                                <ArrowUpRight size={14} />
                              </a>
                            )}
                            {project.link.href ? (
                              <a
                                href={project.link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/20 transition-all cursor-pointer"
                                aria-label={`Open ${project.title} GitHub repository`}
                                title="View Source on GitHub"
                              >
                                <Github size={22} />
                              </a>
                            ) : (
                              <span className="text-xs font-mono text-teal-400 bg-teal-400/10 border border-teal-400/30 px-3 py-1 rounded-full">
                                {project.link.label || "Coursework"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 leading-tight group-hover:text-teal-300 transition-colors">
                          {(project as any).liveUrl ? (
                            <a
                              href={(project as any).liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-teal-300 transition-colors"
                              aria-label={`Open ${(project as any).title} live web application`}
                            >
                              {project.title}
                            </a>
                          ) : project.link.href ? (
                            <a
                              href={project.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-teal-300 transition-colors"
                              aria-label={`Open ${project.title} GitHub repository`}
                            >
                              {project.title}
                            </a>
                          ) : (
                            <span>{project.title}</span>
                          )}
                        </h3>

                        {/* Quantified Impact Highlights Badges */}
                        {(project as any).impactBadges && (project as any).impactBadges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {(project as any).impactBadges.map((badge: string) => (
                              <span
                                key={badge}
                                className="inline-flex items-center gap-1 text-[10px] font-mono text-teal-300 bg-teal-950/50 border border-teal-500/30 px-2 py-0.5 rounded-md"
                              >
                                <Zap size={10} className="text-teal-400 flex-shrink-0" />
                                <span>{badge}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Description */}
                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                          <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack Badges */}
                        <div className="mt-4 pt-4 border-t border-white/[0.08]">
                          <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
                            {project.techStack.map((tech) => (
                              <li key={tech}>
                                <button
                                  onClick={() => handleSkillClick(tech)}
                                  className="text-teal-300 bg-teal-400/10 border border-teal-400/20 hover:border-teal-400 hover:bg-teal-400/20 px-2 py-0.5 rounded-lg text-[10px] transition-colors cursor-pointer"
                                  title={`Filter projects by ${tech}`}
                                >
                                  {tech}
                                </button>
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
                  className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl group transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="p-3 rounded-2xl bg-teal-400/10 text-teal-400 border border-teal-400/20">
                        <FolderGit2 size={22} />
                      </div>
                      <div className="flex items-center gap-2">
                        {(project as any).liveUrl && (
                          <a
                            href={(project as any).liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 text-xs font-mono font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                            aria-label={`Launch live web application for ${project.title}`}
                          >
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Live App</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                        {project.link.href ? (
                          <a
                            href={project.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-slate-400 hover:text-teal-300 hover:bg-teal-400/10 border border-transparent hover:border-teal-400/20 transition-colors cursor-pointer"
                            aria-label={`Open ${project.title} GitHub repository`}
                            title="View Source on GitHub"
                          >
                            <Github size={20} />
                          </a>
                        ) : (
                          <span className="text-xs font-mono text-teal-400 bg-teal-400/10 border border-teal-400/30 px-3 py-1 rounded-full">
                            {project.link.label || "Coursework"}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 group-hover:text-teal-300 transition-colors">
                      {(project as any).liveUrl ? (
                        <a
                          href={(project as any).liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          aria-label={`Open ${project.title} live web application`}
                        >
                          {project.title}
                        </a>
                      ) : project.link.href ? (
                        <a
                          href={project.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          aria-label={`Open ${project.title} GitHub repository`}
                        >
                          {project.title}
                        </a>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </h3>

                    {/* Quantified Impact Highlights Badges */}
                    {(project as any).impactBadges && (project as any).impactBadges.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {(project as any).impactBadges.map((badge: string) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-300 bg-teal-950/40 border border-teal-500/25 px-2.5 py-0.5 rounded-md"
                          >
                            <Zap size={10} className="text-teal-400 flex-shrink-0" />
                            <span>{badge}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <ul className="flex flex-wrap gap-1.5 font-mono text-xs">
                      {project.techStack.map((tech) => (
                        <li key={tech}>
                          <button
                            onClick={() => handleSkillClick(tech)}
                            className="text-teal-300 bg-teal-400/10 border border-teal-400/20 hover:border-teal-400 hover:bg-teal-400/20 px-2 py-0.5 rounded-md text-[11px] transition-colors cursor-pointer"
                            title={`Filter projects by ${tech}`}
                          >
                            {tech}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Dots in 3D Mode */}
          {projectViewMode === "3d" && filteredProjects.length > 0 && (
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
          <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4 drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">
            Education
            <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
          </h2>
          <div className="space-y-8">
            {resumeData.education.map((edu) => (
              <div
                key={edu.school}
                className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-6 md:p-8 border-l-4 border-l-teal-400 transition-all shadow-xl"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-100">{edu.school}</h3>
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

        {/* 05. SKILLS & EVIDENCE CROSS-LINKING */}
        <section id="skills" className="py-20 sm:py-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-12">
            <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-4 drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">
              Skills &amp; Competencies
              <span className="h-px flex-1 bg-white/10 max-w-xs"></span>
            </h2>
            <span className="text-xs font-mono text-teal-400/80">
              Tip: Click any skill to inspect matching projects
            </span>
          </div>

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
                className="bg-slate-900/90 border border-white/[0.08] hover:border-teal-400/40 rounded-3xl p-6 md:p-8 transition-all shadow-xl"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-2xl bg-teal-400/10 text-teal-400 border border-teal-400/20 shadow-inner">
                    <category.icon size={22} />
                  </div>
                  <h3 className="text-slate-100 font-bold text-lg">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isFilterActive = selectedSkillFilter === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => handleSkillClick(skill)}
                        className={`px-3.5 py-1.5 text-xs font-mono rounded-xl border transition-all duration-200 cursor-pointer ${
                          isFilterActive
                            ? "bg-teal-400 text-slate-950 font-bold border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                            : "text-teal-300 bg-slate-950/80 border-white/10 hover:border-teal-400/50 hover:text-teal-200"
                        }`}
                        title={`Click to view projects using ${skill}`}
                      >
                        <span className="text-teal-400 mr-1.5 font-bold">▹</span>
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. CONTACT */}
        <section
          id="contact"
          className="py-20 sm:py-32 text-center max-w-2xl mx-auto mb-16"
        >
          <div className="bg-slate-900/90 border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl">
            <p className="text-teal-400 font-mono mb-3 text-sm tracking-wide font-semibold">What&apos;s Next?</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-[0_2px_12px_rgba(5,8,20,0.95)]">Get In Touch</h2>
            <p className="text-base text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto">
              Whether you have an opportunity in Data Engineering, AI/LLMs, or Full-Stack Systems, or want to discuss engineering challenges, my inbox is always open.
            </p>

            {/* Direct Contact Options */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-teal-400 text-xs font-mono text-slate-200 hover:text-teal-300 transition-all shadow-md cursor-pointer"
              >
                {copiedEmail ? <Check size={14} className="text-teal-400" /> : <Copy size={14} className="text-teal-400" />}
                <span>{copiedEmail ? "Email Copied!" : resumeData.contact.email}</span>
              </button>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950 hover:bg-slate-800 border border-white/10 hover:border-teal-400 text-xs font-mono text-slate-200 hover:text-teal-300 transition-all shadow-md cursor-pointer"
              >
                <FileText size={14} className="text-teal-400" />
                <span>Resume PDF</span>
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

        {/* FOOTER */}
        <footer className="pb-16 flex flex-col items-center justify-center gap-4 text-center text-xs text-slate-500 font-mono">
          <a
            href="https://github.com/menonabhineet/portfolio"
            target="_blank"
            rel="noreferrer"
            className="hover:text-teal-400 transition-colors"
          >
            <p>Designed &amp; Engineered by {resumeData.name}</p>
          </a>
          
          {/* Native View Counter Component */}
          <div className="opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center">
            <ViewCounter />
          </div>
        </footer>
      </main>

      {/* FLOATING COMMAND PALETTE LAUNCHER FOR DESKTOP */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-teal-500/30 hover:border-teal-400 text-slate-300 hover:text-teal-300 shadow-[0_0_25px_rgba(45,212,191,0.15)] hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] backdrop-blur-xl transition-all cursor-pointer"
          title="Open Command Palette"
        >
          <Search size={14} className="text-teal-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-mono font-medium">Commands</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-[10px] font-mono text-teal-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* IN-APP RESUME PDF MODAL */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resumeUrl="./Abhineet_Menon_Resume.pdf"
      />

      {/* COMMAND PALETTE MODAL */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onSelectProject={handleSelectProjectFromPalette}
      />
    </div>
  );
}