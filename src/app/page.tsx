import { resumeData } from "@/data/resume-data";
import { Github, Linkedin, Mail, Phone, Globe } from "lucide-react";

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white p-8 md:p-12 shadow-sm rounded-xl print:space-y-6">
        
        {/* ------------------- HERO SECTION ------------------- */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold text-gray-900 md:text-4xl">
              {resumeData.name}
            </h1>
            <p className="max-w-md text-pretty font-mono text-sm text-gray-500">
              {resumeData.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-gray-500">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={resumeData.locationLink}
                target="_blank"
              >
                <Globe className="size-3" />
                {resumeData.location}
              </a>
            </p>
            
            {/* SOCIAL LINKS */}
            <div className="flex gap-x-2 pt-1 font-mono text-sm text-gray-500 print:hidden">
              {resumeData.contact.email ? (
                <a
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  href={`mailto:${resumeData.contact.email}`}
                >
                  <Mail className="size-4" />
                </a>
              ) : null}
              {resumeData.contact.tel ? (
                <a
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  href={`tel:${resumeData.contact.tel}`}
                >
                  <Phone className="size-4" />
                </a>
              ) : null}
              {resumeData.contact.social.map((social) => (
                <a
                  key={social.name}
                  className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  href={social.url}
                  target="_blank"
                >
                  {social.icon === "Github" ? (
                    <Github className="size-4" />
                  ) : social.icon === "Linkedin" ? (
                    <Linkedin className="size-4" />
                  ) : null}
                </a>
              ))}
            </div>
          </div>

          {/* AVATAR */}
          <span className="relative flex shrink-0 overflow-hidden rounded-xl size-28 md:size-36 border border-gray-200 bg-gray-100">
            <img
              className="aspect-square h-full w-full object-cover"
              src={resumeData.avatarUrl}
              alt={resumeData.name}
            />
          </span>
        </div>

        {/* ------------------- ABOUT SECTION ------------------- */}
        <div className="flex min-h-[60px] flex-col gap-y-3">
          <h2 className="text-xl font-semibold text-gray-900">About</h2>
          <p className="text-pretty font-mono text-sm text-gray-500">
            {resumeData.summary}
          </p>
        </div>

        {/* ------------------- WORK EXPERIENCE ------------------- */}
        <div className="flex min-h-[60px] flex-col gap-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
          {resumeData.work.map((work) => (
            <div key={work.company} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between gap-x-2 text-base">
                  <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                    <a className="hover:underline" href={work.link}>
                      {work.company}
                    </a>
                    <span className="inline-flex gap-1">
                      {work.badges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs font-semibold text-gray-900"
                        >
                          {badge}
                        </span>
                      ))}
                    </span>
                  </h3>
                  <div className="text-sm tabular-nums text-gray-500">
                    {work.start} - {work.end}
                  </div>
                </div>
                <h4 className="font-mono text-sm leading-none text-gray-900">
                  {work.title}
                </h4>
              </div>
              <div className="mt-2 text-xs text-gray-500 font-mono text-pretty">
                {work.description}
              </div>
            </div>
          ))}
        </div>

        {/* ------------------- EDUCATION ------------------- */}
        <div className="flex min-h-[60px] flex-col gap-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          {resumeData.education.map((edu) => (
            <div key={edu.school} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between gap-x-2 text-base">
                  <h3 className="font-semibold leading-none">{edu.school}</h3>
                  <div className="text-sm tabular-nums text-gray-500">
                    {edu.start} - {edu.end}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 font-mono text-pretty">
                {edu.degree}
              </div>
               <div className="mt-1 text-xs text-gray-400 font-mono text-pretty">
                {edu.description}
              </div>
            </div>
          ))}
        </div>

        {/* ------------------- SKILLS ------------------- */}
        <div className="flex min-h-[60px] flex-col gap-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {resumeData.skills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-900 font-mono"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------- PROJECTS ------------------- */}
        <div className="flex min-h-[60px] flex-col gap-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {resumeData.projects.map((project) => (
              <div
                key={project.title}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex flex-col space-y-3"
              >
                <div className="flex flex-col space-y-1">
                  <h3 className="font-semibold text-base tracking-tight">
                     <a href={project.link.href} target="_blank" className="hover:underline">
                      {project.title}
                     </a>
                  </h3>
                  <p className="text-xs text-gray-500 font-mono text-pretty">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-white border border-gray-200 px-1 py-0.5 text-[10px] font-semibold text-gray-900 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </section>
    </main>
  );
}