"use client";

import { resumeData } from "@/data/resume-data";
import { MatrixBackground } from "@/components/MatrixBackground"; // Import the background
import { Github, Linkedin, Mail, ArrowUpRight, FileDown, FolderGit2, Send, Terminal, Database, Code2, Server, Menu, X } from "lucide-react";
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
            <input required type="text" name="name" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400" placeholder="Name" />
        </div>
        <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input required type="email" name="email" className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400" placeholder="Email" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea required name="message" rows={4} className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-slate-200 placeholder-slate-500 focus:border-teal-400 focus:ring-1 focus:ring-teal-400" placeholder="Your message..." />
      </div>
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center rounded-lg bg-teal-500/10 px-6 py-3 text-base font-semibold text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 transition-all disabled:opacity-50"
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

  // Handle Scroll for Sticky Header Styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active Section Tracker
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
    <div className="relative min-h-screen bg-slate-900 font-sans selection:bg-teal-300 selection:text-teal-900 text-slate-400">
      
      {/* 1. MATRIX BACKGROUND */}
      <MatrixBackground />

      {/* 2. STICKY HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800" : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
            {/* Logo / Name */}
            <a href="#" onClick={(e) => {e.preventDefault(); scrollToSection('hero');}} className="text-lg font-bold text-slate-100 tracking-tight hover:text-teal-400 transition-colors">
                {resumeData.initials}<span className="text-teal-400">.</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:block">
                <ul className="flex gap-8 text-sm font-medium">
                    {navItems.map((item) => (
                        <li key={item}>
                            <button 
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`transition-colors hover:text-teal-400 ${activeSection === item.toLowerCase() ? "text-teal-400" : "text-slate-400"}`}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-200" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* Mobile Nav Dropdown */}
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

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 md:px-12 lg:px-0">
        
        {/* HERO SECTION (Replaces the sidebar) */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center pt-20">
            <div className="mb-8 relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-30 blur-lg"></div>
                <img 
                  src={resumeData.avatarUrl} 
                  alt={resumeData.name} 
                  className="relative h-40 w-40 rounded-full border-4 border-slate-900 shadow-2xl object-cover"
                />
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight text-slate-100 sm:text-7xl mb-6">
              Hi, I'm <span className="text-teal-400">{resumeData.name}</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-medium text-slate-400 mb-8 max-w-2xl mx-auto">
               Senior Data Engineer & CS Master's Student building scalable data pipelines and intelligent full-stack applications.
            </h2>

            {/* Socials Row */}
            <div className="flex items-center justify-center gap-6 mb-12">
                {resumeData.contact.social.map((social) => (
                    <a key={social.name} href={social.url} target="_blank" className="text-slate-400 hover:text-teal-400 hover:scale-110 transition-all">
                        {social.icon === "Github" ? <Github size={28} /> : <Linkedin size={28} />}
                    </a>
                ))}
                <a href={`mailto:${resumeData.contact.email}`} className="text-slate-400 hover:text-teal-400 hover:scale-110 transition-all">
                    <Mail size={28} />
                </a>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollToSection('projects')} className="px-8 py-3 rounded-full bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-colors">
                    View My Work
                </button>
                <a href="/Abhineet_Menon_Resume_D.pdf" target="_blank" className="px-8 py-3 rounded-full border border-teal-500/30 text-teal-400 font-medium hover:bg-teal-500/10 transition-colors flex items-center gap-2">
                    <FileDown size={18} /> Resume
                </a>
            </div>
        </section>

        {/* 01. ABOUT */}
        <section id="about" className="py-20 sm:py-32">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 flex items-center gap-4">
                <span className="text-teal-400 font-mono text-xl">01.</span> About Me
                <span className="h-px flex-1 bg-slate-800"></span>
            </h2>
            <div className="text-lg leading-relaxed space-y-6">
                <p>
                    Back in 2020, I started my journey building PHP admin panels for local businesses. Fast forward to today, and I’ve led data engineering teams at <span className="text-teal-400">LTIMindtree</span> and am currently tackling my Master's in CS at <span className="text-teal-400">UIC</span>.
                </p>
                <p>
                    I specialize in bridging the gap between <span className="text-slate-200">complex backend data pipelines</span> (Snowflake, Azure) and <span className="text-slate-200">fluid frontend user interfaces</span>. My goal is to build accessible, inclusive products and digital experiences.
                </p>
            </div>
        </section>

        {/* 02. EXPERIENCE */}
        <section id="experience" className="py-20 sm:py-32">
            <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                <span className="text-teal-400 font-mono text-xl">02.</span> Experience
                <span className="h-px flex-1 bg-slate-800"></span>
            </h2>
            
            <div className="relative border-l border-slate-800 ml-3 space-y-16">
                {resumeData.work.map((job) => (
                    <div key={job.company} className="relative pl-8 group">
                        <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-800 ring-4 ring-slate-900 group-hover:bg-teal-400 transition-colors" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <h3 className="text-2xl font-bold text-slate-100">
                                {job.title} <span className="text-teal-400">@</span> <a href={job.link} className="hover:underline">{job.company}</a>
                            </h3>
                            <span className="font-mono text-sm text-teal-400/80 mt-1 sm:mt-0">{job.start} — {job.end}</span>
                        </div>

                        <ul className="list-disc ml-4 space-y-2 text-slate-400 marker:text-teal-400">
                            {Array.isArray(job.description) ? job.description.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            )) : <li>{job.description}</li>}
                        </ul>
                    </div>
                ))}
            </div>
        </section>

        {/* 03. PROJECTS */}
        <section id="projects" className="py-20 sm:py-32">
            <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                <span className="text-teal-400 font-mono text-xl">03.</span> Projects
                <span className="h-px flex-1 bg-slate-800"></span>
            </h2>
            
            <div className="grid grid-cols-1 gap-8">
                {resumeData.projects.map((project) => (
                    <a 
                      key={project.title} 
                      href={project.link.href} 
                      target="_blank"
                      className="group relative flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-800/30 p-8 hover:border-teal-400/30 hover:bg-slate-800/50 hover:-translate-y-1 transition-all"
                    >
                       <div className="flex justify-between items-start">
                          <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                              <FolderGit2 size={24} />
                          </div>
                          <ArrowUpRight className="text-slate-600 group-hover:text-teal-400 transition-colors" size={24} />
                       </div>
                      
                      <h3 className="text-2xl font-bold text-slate-100 group-hover:text-teal-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="leading-relaxed text-slate-400">
                        {project.description}
                      </p>
                      
                      <ul className="flex flex-wrap gap-3 mt-2">
                        {project.techStack.map((tech) => (
                          <li key={tech} className="text-xs font-mono text-teal-400/80 bg-teal-400/5 px-2 py-1 rounded">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </a>
                ))}
            </div>
        </section>

        {/* 04. EDUCATION */}
        <section id="education" className="py-20 sm:py-32">
             <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                <span className="text-teal-400 font-mono text-xl">04.</span> Education
                <span className="h-px flex-1 bg-slate-800"></span>
            </h2>
            <div className="space-y-10">
                 {resumeData.education.map((edu) => (
                    <div key={edu.school} className="flex flex-col md:flex-row justify-between md:items-center border-l-2 border-slate-800 pl-6 hover:border-teal-400 transition-colors">
                       <div>
                          <h3 className="text-xl font-bold text-slate-100">{edu.school}</h3>
                          <p className="text-teal-400">{edu.degree}</p>
                          <p className="text-sm text-slate-500 mt-1">{edu.description}</p>
                       </div>
                       <div className="mt-2 md:mt-0">
                          <span className="font-mono text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">{edu.start} — {edu.end}</span>
                       </div>
                    </div>
                 ))}
            </div>
        </section>

        {/* 05. SKILLS */}
        <section id="skills" className="py-20 sm:py-32">
             <h2 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
                <span className="text-teal-400 font-mono text-xl">05.</span> Skills
                <span className="h-px flex-1 bg-slate-800"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skill Blocks */}
                {[
                    { title: "Languages", icon: Code2, skills: resumeData.skills.languages },
                    { title: "Data Engineering", icon: Database, skills: resumeData.skills.dataTools },
                    { title: "Web Frameworks", icon: Server, skills: resumeData.skills.frameworks },
                    { title: "Tools & DevOps", icon: Terminal, skills: resumeData.skills.devTools },
                ].map((category) => (
                    <div key={category.title} className="rounded-xl border border-slate-800 bg-slate-800/20 p-6 hover:border-teal-400/30 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <category.icon className="text-teal-400" size={20} />
                            <h3 className="text-slate-100 font-bold text-lg">{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 text-xs font-mono rounded bg-slate-800 text-teal-300 border border-slate-700 hover:border-teal-400/50 transition-colors">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 06. CONTACT */}
        <section id="contact" className="py-20 sm:py-32 text-center max-w-2xl mx-auto">
             <p className="text-teal-400 font-mono mb-4">06. What's Next?</p>
             <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
             <p className="text-lg text-slate-400 mb-8">
                Whether you have a question about Data Engineering, want to collaborate on a project, or just want to say hi, my inbox is always open.
             </p>
             <ContactForm />
        </section>

        {/* FOOTER */}
        <footer className="pb-8 text-center text-sm text-slate-600 font-mono">
            <p>Designed & Built by {resumeData.name}</p>
        </footer>

      </main>
    </div>
  );
}