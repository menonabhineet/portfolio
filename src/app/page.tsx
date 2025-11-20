import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail, ArrowUpRight, FileText } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* ------------------- LEFT COLUMN (FIXED HEADER) ------------------- */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">{resumeData.name}</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Senior Data Engineer & CS Master's
              </h2>
              <p className="mt-4 max-w-xs leading-normal">
                I build pixel-perfect, scalable data products and intelligent full-stack applications.
              </p>
              
              {/* NAVIGATION (Desktop Only) */}
              <nav className="nav hidden lg:block mt-16" aria-label="In-page jump links">
                <ul className="w-max">
                  <li>
                    <a className="group flex items-center py-3" href="#about">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 motion-reduce:transition-none">About</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#experience">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 motion-reduce:transition-none">Experience</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-3" href="#projects">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 motion-reduce:transition-none">Projects</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* SOCIAL LINKS */}
            <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
              {resumeData.contact.social.map((social) => (
                <li key={social.name} className="text-xs">
                  <a href={social.url} target="_blank" className="block hover:text-slate-200" aria-label={`${social.name}`}>
                    {social.icon === "Github" ? <Github className="h-6 w-6" /> : <Linkedin className="h-6 w-6" />}
                  </a>
                </li>
              ))}
               {resumeData.contact.email && (
                <li className="text-xs">
                  <a href={`mailto:${resumeData.contact.email}`} className="block hover:text-slate-200">
                    <Mail className="h-6 w-6" />
                  </a>
                </li>
              )}
            </ul>
          </header>

          {/* ------------------- RIGHT COLUMN (SCROLLABLE CONTENT) ------------------- */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            
            {/* ABOUT */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="About me">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">About</h2>
              </div>
              <div className="text-slate-400 space-y-4">
                <p>
                  Back in 2020, I started my journey building PHP admin panels for local businesses. Fast forward to today, and I’ve led data engineering teams at <span className="font-medium text-slate-200">LTIMindtree</span> and am currently tackling my Master's in CS at <span className="font-medium text-slate-200">UIC</span>.
                </p>
                <p>
                  My main focus these days is building accessible, inclusive products and digital experiences at the intersection of <span className="font-medium text-slate-200">Data Engineering</span> and <span className="font-medium text-slate-200">Full Stack Development</span>. I enjoy bridging the gap between complex backend data systems and fluid frontend user interfaces.
                </p>
                <p>
                  When I'm not at the computer, I'm usually hanging out with my friends or exploring the city of Chicago.
                </p>
              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Work experience">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Experience</h2>
              </div>
              <div>
                <ol className="group/list">
                  {resumeData.work.map((job) => (
                    <li key={job.company} className="mb-12">
                      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          {job.start} — {job.end}
                        </header>
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                              <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href={job.link} target="_blank" rel="noreferrer" aria-label={job.title}>
                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                <span>{job.title} · <span className="inline-block">{job.company}<ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"/></span></span>
                              </a>
                            </div>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400">
                            {job.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {job.badges.map((tech) => (
                              <li key={tech} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24" aria-label="Selected projects">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Projects</h2>
              </div>
              <div>
                <ul className="group/list">
                  {resumeData.projects.map((project) => (
                    <li key={project.title} className="mb-12">
                      <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3>
                            <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base" href={project.link.href} target="_blank" rel="noreferrer" aria-label={project.title}>
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>{project.title} <span className="inline-block"><ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" /></span></span>
                            </a>
                          </h3>
                          <p className="mt-2 text-sm leading-normal text-slate-400">
                            {project.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {project.techStack.map((tech) => (
                              <li key={tech} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Image Placeholder (If you want to add images later, put them here) */}
                        <div className="sm:order-1 sm:col-span-2 mt-1">
                           <div className="rounded border-2 border-slate-200/10 bg-slate-800/50 p-1 h-20 w-full flex items-center justify-center">
                              <FileText className="text-slate-600" size={24} />
                           </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
               <p>
                 Built with <a href="https://nextjs.org/" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">Next.js</a> and <a href="https://tailwindcss.com/" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">Tailwind CSS</a>, deployed with <a href="https://pages.github.com/" className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300" target="_blank" rel="noreferrer">GitHub Pages</a>.
               </p>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}