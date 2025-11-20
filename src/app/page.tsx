"use client";

import { resumeData } from "@/data/resume-data";
import { MatrixBackground } from "@/components/MatrixBackground";
import { Github, Linkedin, Mail, ArrowUpRight, FileDown, FolderGit2, Send, Menu, X, ChevronLeft, ChevronRight, Code2, Database, Server, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

// --- CONTACT FORM COMPONENT ---
const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const subject = `Portfolio Contact from ${formData.get('name')}`;
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMessage:\n${formData.get('message')}`;
    
    setTimeout(() => {
        window.location.href = `mailto:${resumeData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input required type="text" name="name" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" placeholder="Name" />
        </div>
        <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input required type="email" name="email" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" placeholder="Email" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea required name="message" rows={4} className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all" placeholder="Your message..." />
      </div>
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center rounded-lg bg-teal-500/10 px-6 py-3 text-base font-semibold text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all disabled:opacity-50"
      >
        {status === "submitting" ? "Processing..." : (status === "success" ? "Opening Mail Client..." : <span className="flex items-center gap-2">Send Message <Send size={16}/></span>)}
      </button>
    </form>
  );
}

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- CAROUSEL STATE ---
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % resumeData.projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + resumeData.projects.length) % resumeData.projects.length);
  };

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
      setScrolled(window.scrollY > 50);
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
        className="relative min-h-screen bg-slate-900 font-sans selection:bg-teal-300 selection:text-teal-900 text-slate-400 overflow-x-hidden"
        style={{
            ['--mouse-x' as any]: `${mousePosition.x}px`,
            ['--mouse-y' as any]: `${mousePosition.y}px`,
        }}
    >
      <div className="spotlight-bg pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" />
      <MatrixBackground />

      {/* STICKY HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-teal-500/20" : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <a href="#" onClick={(e) => {e.preventDefault(); scrollToSection('hero');}} className="text-xl font-bold text-slate-100 tracking-tight hover:text-teal-400 transition-colors font-mono">
                <span className="text-teal-400">&lt;</span>{resumeData.initials}<span className="text-teal-400">/&gt;</span>
            </a>

            <nav className="hidden md:block">
                <ul className="flex gap-8 text-sm font-medium">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.toLowerCase();
                        return (
                            <li key={item}>
                                <button 
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className={`relative transition-colors px-2 py-1 ${isActive ? "text-teal-400 font-bold shadow-[0_0_10px_rgba(45,212,191,0.5)] rounded-md bg-teal-400/10" : "text-slate-300 hover:text-teal-300"}`}
                                >
                                    {item}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <button className="md:hidden text-slate-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 md:hidden shadow-2xl">
                <ul className="flex flex-col gap-4 text-center">
                    {navItems.map((item) => (
                        <li key={item}>
                            <button 
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`text-lg font-medium ${activeSection === item.toLowerCase() ? "text-teal-400" : "text-slate-400"}`}
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
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-start pt-20">
            <p className="text-teal-400 font-mono mb-5 ml-1">Hi, my name is</p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-100 sm:text-7xl mb-4">
              {resumeData.name}.
            </h1>
            <h2 className="text-4xl sm:text-6xl font-bold text-slate-400 mb-6">
               I build things for the web & data.
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-xl leading-relaxed">
               I'm an ex-Data Engineer & CS Master's Student at UIC. I specialize in bridging the gap between <span className="text-teal-400">complex backend data</span> and <span className="text-teal-400">fluid user experiences</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection('projects')} className="px-8 py-4 rounded border border-teal-400 text-teal-400 font-mono hover:bg-teal-400/10 transition-colors">
                    Check out my work!
                </button>
            </div>
        </section>

        {/* 01. ABOUT */}
        <section id="about" className="py-20 sm:py-32">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 flex items-center gap-4">
                About Me
                <span className="h-px flex-1 bg-slate-800 max-w-xs"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 text-lg leading-relaxed space-y-6">
                    <p>{resumeData.about}</p>
                    <p>Here are a few technologies I’ve been working with recently:</p>
                    <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                        {['Python', 'LLMs', 'Machine Learning', 'RAGs', 'AWS', 'Docker'].map(skill => (
                            <li key={skill} className="flex items-center gap-2">
                                <span className="text-teal-400">▹</span> {skill}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative group">
                    <div className="relative rounded w-full max-w-[300px] mx-auto md:mx-0">
                        <div className="absolute inset-0 border-2 border-teal-400 rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                        <div className="relative rounded overflow-hidden bg-teal-400">
                            <img 
                                src={resumeData.avatarUrl} 
                                alt={resumeData.name} 
                                className="w-full h-full object-cover mix-blend-multiply grayscale hover:mix-blend-normal hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 02. EXPERIENCE */}
        <section id="experience" className="py-20 sm:py-32 max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                Experience
                <span className="h-px flex-1 bg-slate-800 max-w-xs"></span>
            </h2>
            <div className="relative border-l border-slate-800 ml-3 space-y-16">
                {resumeData.work.map((job) => (
                    <div key={job.company} className="relative pl-8 group">
                        <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-800 ring-4 ring-slate-900 group-hover:bg-teal-400 transition-colors" />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-xl font-bold text-slate-100">
                                {job.title} <span className="text-teal-400">@</span> <a href={job.link} className="hover:underline">{job.company}</a>
                            </h3>
                        </div>
                        <p className="font-mono text-sm text-slate-500 mb-4">{job.start} — {job.end}</p>
                        <ul className="list-none space-y-2 text-slate-400">
                            {Array.isArray(job.description) ? job.description.map((point, idx) => (
                                <li key={idx} className="relative pl-6">
                                    <span className="absolute left-0 text-teal-400">▹</span>
                                    {point}
                                </li>
                            )) : <li>{job.description}</li>}
                        </ul>
                    </div>
                ))}
            </div>
        </section>

        {/* 03. PROJECTS (TALL & THIN CAROUSEL - TIGHTER SPACING) */}
        <section id="projects" className="py-20 sm:py-32">
            <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                Projects
                <span className="h-px flex-1 bg-slate-800 max-w-xs"></span>
            </h2>
            
            {/* CAROUSEL CONTAINER */}
            <div className="relative w-full max-w-4xl mx-auto h-[650px] flex items-center justify-center">
                
                {/* Left Button */}
                <button 
                    onClick={prevProject}
                    className="absolute -left-4 md:-left-24 z-40 p-3 rounded-full bg-slate-800 text-teal-400 hover:bg-teal-400/10 hover:scale-110 transition-all border border-slate-700 shadow-xl"
                >
                    <ChevronLeft size={32} />
                </button>

                {/* Right Button */}
                <button 
                    onClick={nextProject}
                    className="absolute -right-4 md:-right-24 z-40 p-3 rounded-full bg-slate-800 text-teal-400 hover:bg-teal-400/10 hover:scale-110 transition-all border border-slate-700 shadow-xl"
                >
                    <ChevronRight size={32} />
                </button>

                {/* CAROUSEL ITEMS */}
                <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                    {resumeData.projects.map((project, index) => {
                        let position = 'hidden';
                        let zIndex = 0;
                        let opacity = 0;
                        let scale = 0.8;
                        let translateX = '0%';
                        let rotateY = '0deg';

                        if (index === currentProjectIndex) {
                            position = 'active';
                            zIndex = 30;
                            opacity = 1;
                            scale = 1;
                            translateX = '0%';
                        } else if (index === (currentProjectIndex - 1 + resumeData.projects.length) % resumeData.projects.length) {
                            position = 'prev';
                            zIndex = 10;
                            opacity = 0.4;
                            scale = 0.85;
                            translateX = '-80%'; // TIGHTER SPACING (Was -110%)
                            rotateY = '5deg';
                        } else if (index === (currentProjectIndex + 1) % resumeData.projects.length) {
                            position = 'next';
                            zIndex = 10;
                            opacity = 0.4;
                            scale = 0.85;
                            translateX = '80%'; // TIGHTER SPACING (Was 110%)
                            rotateY = '-5deg';
                        }

                        if (position === 'hidden') return null;

                        return (
                            <div 
                                key={project.title}
                                className="absolute top-0 w-[300px] md:w-[380px] h-[580px] transition-all duration-500 ease-in-out"
                                style={{
                                    zIndex: zIndex,
                                    opacity: opacity,
                                    transform: `translateX(${translateX}) scale(${scale}) rotateY(${rotateY})`,
                                }}
                            >
                                <div className="w-full h-full bg-slate-900 border border-teal-500/20 rounded-2xl p-8 shadow-2xl flex flex-col relative overflow-hidden group hover:border-teal-500/40 transition-colors">
                                    
                                    {/* Top Bar */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="p-3 rounded-full bg-teal-400/10 text-teal-400">
                                            <FolderGit2 size={28} />
                                        </div>
                                        <a href={project.link.href} target="_blank" className="text-slate-500 hover:text-teal-400 transition-colors">
                                            <ArrowUpRight size={24} />
                                        </a>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-slate-100 mb-4 leading-tight group-hover:text-teal-400 transition-colors">
                                      <a href={project.link.href} target="_blank" className="text-slate-500 hover:text-teal-400 transition-colors">
                                        {project.title}
                                      </a>
                                    </h3>
                                    
                                    <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                                        <p className="text-slate-400 leading-relaxed text-sm">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mt-6 pt-6 border-t border-slate-800">
                                        <ul className="flex flex-wrap gap-2 font-mono text-xs text-slate-500">
                                            {project.techStack.map((tech) => (
                                                <li key={tech} className="text-teal-400/80 bg-teal-400/5 px-2 py-1 rounded">
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
        </section>

        {/* 04. EDUCATION */}
        <section id="education" className="py-20 sm:py-32 max-w-3xl">
             <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                Education
                <span className="h-px flex-1 bg-slate-800 max-w-xs"></span>
            </h2>
            <div className="space-y-10">
                 {resumeData.education.map((edu) => (
                    <div key={edu.school} className="flex flex-col md:flex-row justify-between md:items-start border-l-2 border-slate-800 pl-6 hover:border-teal-400 transition-colors duration-300">
                       <div>
                          <h3 className="text-xl font-bold text-slate-100">{edu.school}</h3>
                          <p className="text-teal-400 font-mono text-sm mt-1">{edu.degree}</p>
                          <p className="text-sm text-slate-400 mt-2 max-w-md">{edu.description}</p>
                       </div>
                       <div className="mt-2 md:mt-0">
                          <span className="font-mono text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full whitespace-nowrap">{edu.start} — {edu.end}</span>
                       </div>
                    </div>
                 ))}
            </div>
        </section>

        {/* 05. SKILLS */}
        <section id="skills" className="py-20 sm:py-32">
             <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                Skills
                <span className="h-px flex-1 bg-slate-800 max-w-xs"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { title: "Languages", icon: Code2, skills: resumeData.skills.languages },
                    { title: "Data Engineering", icon: Database, skills: resumeData.skills.dataTools },
                    { title: "Web Frameworks", icon: Server, skills: resumeData.skills.frameworks },
                    { title: "Tools & DevOps", icon: Terminal, skills: resumeData.skills.devTools },
                ].map((category) => (
                    <div key={category.title} className="rounded border border-slate-800 bg-slate-800/30 p-6 hover:border-teal-400/30 transition-colors hover:-translate-y-1 duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <category.icon className="text-teal-400" size={24} />
                            <h3 className="text-slate-100 font-bold text-lg">{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 text-xs font-mono text-teal-300/90 before:content-['▹'] before:mr-2 before:text-teal-500">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 06. CONTACT */}
        <section id="contact" className="py-20 sm:py-32 text-center max-w-2xl mx-auto mb-24">
             <p className="text-teal-400 font-mono mb-4">What's Next?</p>
             <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
             <p className="text-lg text-slate-400 mb-12">
                Whether you have a question about Data Engineering, want to collaborate on a project, or just want to say hi, my inbox is always open.
             </p>
             <ContactForm />
        </section>

        <footer className="pb-8 text-center text-xs text-slate-500 font-mono hover:text-teal-400 transition-colors">
            <a href="https://github.com/menonabhineet/portfolio" target="_blank" rel="noreferrer">
                <p>Designed & Built by {resumeData.name}</p>
            </a>
        </footer>

      </main>
    </div>
  );
}