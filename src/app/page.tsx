"use client";

import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail, ArrowUpRight, FileDown, FolderGit2, Send, Terminal, Database, Code2, Server } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Helper for the contact form
const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    const subject = `Portfolio Contact from ${formData.get('name')}`;
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMessage:\n${formData.get('message')}`;
    
    // Simulate network delay for "Intelligent" feel
    setTimeout(() => {
        window.location.href = `mailto:${resumeData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-400">Name</label>
        <input required type="text" name="name" className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-800/50 p-2.5 text-slate-200 focus:border-teal-400 focus:ring-teal-400 sm:text-sm" placeholder="John Doe" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-400">Email</label>
        <input required type="email" name="email" className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-800/50 p-2.5 text-slate-200 focus:border-teal-400 focus:ring-teal-400 sm:text-sm" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-400">Message</label>
        <textarea required name="message" rows={4} className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-800/50 p-2.5 text-slate-200 focus:border-teal-400 focus:ring-teal-400 sm:text-sm" placeholder="Hi Abhineet, I'd like to discuss..." />
      </div>
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-300 border border-teal-400/20 hover:bg-teal-400/20 transition-all disabled:opacity-50 w-full sm:w-auto"
      >
        {status === "submitting" ? "Formatting..." : (status === "success" ? "Opening Mail Client..." : <span className="flex items-center gap-2">Send Message <Send size={14}/></span>)}
      </button>
    </form>
  );
}

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");

  // MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ACTIVE SECTION TRACKING (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = ["About", "Experience", "Projects", "Education", "Skills", "Contact"];

  return (
    <div 
      className="relative min-h-screen bg-slate-900 selection:bg-teal-300 selection:text-teal-900 font-sans"
      style={{
        ['--mouse-x' as any]: `${mousePosition.x}px`,
        ['--mouse-y' as any]: `${mousePosition.y}px`,
      }}
    >
      {/* SPOTLIGHT GLOW */}
      <div className="spotlight-bg pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute" />

      <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* ------------------- FIXED SIDEBAR ------------------- */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24 py-12">
            <div>
              {/* AVATAR */}
              <div className="mb-8 block shrink-0">
                <img 
                  src={resumeData.avatarUrl} 
                  alt={resumeData.name} 
                  className="h-28 w-28 rounded-2xl border-2 border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                <a href="/">{resumeData.name}</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-teal-300 sm:text-xl font-mono">
                Senior Data Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                Bridging the gap between scalable data pipelines and intelligent full-stack applications.
              </p>
              
              {/* ACTIVE NAVIGATION */}
              <nav className="nav hidden lg:block mt-16">
                <ul className="w-max">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.toLowerCase();
                    return (
                      <li key={item}>
                        <a 
                          className={`group flex items-center py-3 cursor-pointer transition-all ${isActive ? 'text-teal-300' : 'text-slate-500'}`} 
                          href={`#${item.toLowerCase()}`}
                        >
                          <span className={`mr-4 text-xs font-bold uppercase tracking-widest font-mono ${isActive ? 'text-teal-300' : 'text-slate-500 group-hover:text-slate-200'}`}>
                            0{index + 1}
                          </span>
                          <span className={`nav-indicator mr-4 h-px transition-all motion-reduce:transition-none ${isActive ? 'w-16 bg-teal-300' : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'}`}></span>
                          <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-teal-300' : 'text-slate-500 group-hover:text-slate-200'}`}>
                            {item}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* SOCIALS */}
            <div className="mt-8 flex flex-col gap-6">
               <ul className="flex items-center gap-5">
                {resumeData.contact.social.map((social) => (
                  <li key={social.name}>
                    <a href={social.url} target="_blank" className="text-slate-400 hover:text-teal-300 transition-colors">
                      {social.icon === "Github" ? <Github size={22} /> : <Linkedin size={22} />}
                    </a>
                  </li>
                ))}
                 {resumeData.contact.email && (
                  <li>
                    <a href={`mailto:${resumeData.contact.email}`} className="text-slate-400 hover:text-teal-300 transition-colors">
                      <Mail size={22} />
                    </a>
                  </li>
                )}
              </ul>
               <a 
                href="/Abhineet_Menon_Resume_D.pdf" 
                target="_blank"
                className="group flex items-center gap-2 text-slate-400 hover:text-teal-300 transition-colors w-fit"
              >
                <FileDown size={18} />
                <span className="font-mono text-sm border-b border-transparent group-hover:border-teal-300">
                  Download_Resume.pdf
                </span>
              </a>
            </div>
          </header>

          {/* ------------------- RIGHT CONTENT AREA ------------------- */}
          <main className="pt-12 lg:w-[55%] lg:py-24">
            
            {/* 01. ABOUT */}
            <section id="about" className="min-h-[50vh] mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 flex flex-col justify-center">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">About</h2>
              </div>
              <div className="text-slate-400 space-y-4 text-lg leading-relaxed">
                <p>
                  Back in 2020, I started my journey building PHP admin panels for local businesses. Fast forward to today, and I’ve led data engineering teams at <span className="font-medium text-slate-200">LTIMindtree</span> and am currently tackling my Master's in CS at <span className="font-medium text-slate-200">UIC</span>.
                </p>
                <p>
                   I specialize in bridging the gap between <span className="font-medium text-teal-300">complex backend data pipelines</span> (Snowflake, Azure) and <span className="font-medium text-teal-300">fluid frontend user interfaces</span>.
                </p>
              </div>
            </section>

            {/* 02. EXPERIENCE (Timeline) */}
            <section id="experience" className="min-h-screen mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Experience</h2>
              </div>
              
              <div className="border-l border-slate-800 ml-2 space-y-12">
                {resumeData.work.map((job) => (
                  <div key={job.company} className="relative pl-8 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-800 ring-4 ring-slate-900 transition-colors group-hover:bg-teal-300" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <h3 className="font-medium text-slate-200 text-xl">
                        {job.title} <span className="text-teal-300">@</span> <a href={job.link} className="hover:text-teal-300">{job.company}</a>
                      </h3>
                      <span className="font-mono text-xs text-slate-500 mt-1 sm:mt-0 uppercase tracking-wide">{job.start} — {job.end}</span>
                    </div>

                    <ul className="list-disc ml-4 space-y-2 text-slate-400 marker:text-teal-400/50 leading-relaxed">
                      {Array.isArray(job.description) ? job.description.map((point, idx) => (
                         <li key={idx}>{point}</li>
                      )) : <li>{job.description}</li>}
                    </ul>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {job.badges.map((tech) => (
                        <li key={tech} className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 font-mono">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 03. PROJECTS (Grid) */}
            <section id="projects" className="min-h-screen mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Projects</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {resumeData.projects.map((project) => (
                  <a 
                    key={project.title} 
                    href={project.link.href} 
                    target="_blank"
                    className="group relative flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-6 hover:border-teal-400/30 hover:bg-slate-800/50 transition-all"
                  >
                     <div className="flex justify-between items-start mb-2">
                        <div className="p-2 rounded-lg bg-teal-900/20 text-teal-300">
                            <FolderGit2 size={20} />
                        </div>
                        <ArrowUpRight className="text-slate-600 group-hover:text-teal-300 transition-colors" size={20} />
                     </div>
                    
                    <h3 className="font-bold text-slate-200 text-lg group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>
                    
                    <ul className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
                      {project.techStack.map((tech) => (
                        <li key={tech} className="text-xs font-mono text-teal-300/80">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </a>
                ))}
              </div>
            </section>

            {/* 04. EDUCATION */}
            <section id="education" className="min-h-[50vh] mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
               <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Education</h2>
              </div>
              <div className="space-y-8">
                 {resumeData.education.map((edu) => (
                    <div key={edu.school} className="flex group justify-between border-b border-slate-800 pb-8 last:border-0">
                       <div className="flex flex-col">
                          <h3 className="text-lg font-bold text-slate-200 group-hover:text-teal-300 transition-colors">{edu.school}</h3>
                          <p className="text-slate-400">{edu.degree}</p>
                          <p className="text-sm text-slate-500 mt-2">{edu.description}</p>
                       </div>
                       <div className="text-right">
                          <span className="font-mono text-sm text-teal-300/80">{edu.start} — {edu.end}</span>
                       </div>
                    </div>
                 ))}
              </div>
            </section>

             {/* 05. SKILLS (Categorized) */}
            <section id="skills" className="min-h-[60vh] mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
               <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Languages */}
                 <div className="rounded-xl border border-slate-800 bg-slate-800/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Code2 className="text-teal-300" size={20} />
                        <h3 className="text-slate-200 font-semibold">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.languages.map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-teal-400/10 text-teal-300">{skill}</span>
                        ))}
                    </div>
                 </div>

                 {/* Data */}
                  <div className="rounded-xl border border-slate-800 bg-slate-800/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Database className="text-teal-300" size={20} />
                        <h3 className="text-slate-200 font-semibold">Data Engineering</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.dataTools.map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-teal-400/10 text-teal-300">{skill}</span>
                        ))}
                    </div>
                 </div>

                 {/* Frameworks */}
                  <div className="rounded-xl border border-slate-800 bg-slate-800/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Server className="text-teal-300" size={20} />
                        <h3 className="text-slate-200 font-semibold">Web & Frameworks</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.frameworks.map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-teal-400/10 text-teal-300">{skill}</span>
                        ))}
                    </div>
                 </div>

                 {/* Tools */}
                  <div className="rounded-xl border border-slate-800 bg-slate-800/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="text-teal-300" size={20} />
                        <h3 className="text-slate-200 font-semibold">DevOps & Tools</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.devTools.map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs font-mono rounded bg-teal-400/10 text-teal-300">{skill}</span>
                        ))}
                    </div>
                 </div>

              </div>
            </section>

            {/* 06. CONTACT FORM */}
            <section id="contact" className="min-h-[50vh] mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
               <div className="sticky top-0 z-20 -mx-6 mb-8 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Contact</h2>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-800/30 p-8">
                 <h3 className="text-xl font-bold text-slate-100">Get in Touch</h3>
                 <p className="text-slate-400 mt-2">
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                 </p>
                 <ContactForm />
              </div>
            </section>
            
            <footer className="pb-16 text-sm text-slate-500">
               <p>
                 Built with <span className="text-slate-400">Next.js</span> & <span className="text-slate-400">Tailwind CSS</span>.
               </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}