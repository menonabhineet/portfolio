"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Search,
  FileText,
  Copy,
  Check,
  ExternalLink,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Sparkles,
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  X,
  CornerDownLeft,
} from "lucide-react";
import { resumeData } from "@/data/resume-data";
import { fuzzyMatchItem } from "@/lib/fuzzy";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject?: (projectTitle: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Actions" | "Navigation" | "Projects" | "Social";
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(resumeData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      // Quick Actions
      {
        id: "view-resume",
        title: "View Official Resume (PDF)",
        subtitle: "In-app preview with download option",
        category: "Actions",
        icon: FileText,
        keywords: ["resume", "cv", "pdf", "experience", "education"],
        action: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: "copy-email",
        title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email Address",
        subtitle: resumeData.contact.email,
        category: "Actions",
        icon: copiedEmail ? Check : Copy,
        keywords: ["email", "contact", "message", "hire"],
        action: copyEmail,
      },

      // Navigation
      {
        id: "nav-projects",
        title: "Jump to Featured Projects",
        subtitle: "Explore 12+ RAG, Systems & Data Engineering projects",
        category: "Navigation",
        icon: FolderGit2,
        keywords: ["projects", "code", "work", "apps"],
        action: () => scrollTo("projects"),
      },
      {
        id: "nav-experience",
        title: "Jump to Work Experience",
        subtitle: "LTIMindtree (Senior Data Engineer) & Internships",
        category: "Navigation",
        icon: Briefcase,
        keywords: ["experience", "jobs", "history", "ltimindtree"],
        action: () => scrollTo("experience"),
      },
      {
        id: "nav-skills",
        title: "Jump to Skills & Competencies",
        subtitle: "Languages, Cloud Data Tools, AI/RAG & Frameworks",
        category: "Navigation",
        icon: Sparkles,
        keywords: ["skills", "languages", "python", "snowflake", "sql", "react", "nextjs"],
        action: () => scrollTo("skills"),
      },
      {
        id: "nav-education",
        title: "Jump to Education",
        subtitle: "MS CS @ UIC (4.0 GPA) & BE @ Mumbai University",
        category: "Navigation",
        icon: GraduationCap,
        keywords: ["education", "degree", "uic", "gpa", "university"],
        action: () => scrollTo("education"),
      },
      {
        id: "nav-contact",
        title: "Jump to Contact & Message Form",
        subtitle: "Send a direct inquiry or note",
        category: "Navigation",
        icon: Mail,
        keywords: ["contact", "message", "email", "form", "reach out"],
        action: () => scrollTo("contact"),
      },

      // Social Links
      {
        id: "social-linkedin",
        title: "Open LinkedIn Profile",
        subtitle: "linkedin.com/in/menonabhineet",
        category: "Social",
        icon: Linkedin,
        keywords: ["linkedin", "social", "profile"],
        action: () => {
          onClose();
          window.open("https://linkedin.com/in/menonabhineet", "_blank");
        },
      },
      {
        id: "social-github",
        title: "Open GitHub Profile",
        subtitle: "github.com/menonabhineet",
        category: "Social",
        icon: Github,
        keywords: ["github", "code", "repos", "repositories"],
        action: () => {
          onClose();
          window.open("https://github.com/menonabhineet", "_blank");
        },
      },
    ];

    // Add Projects to Search
    resumeData.projects.forEach((proj) => {
      list.push({
        id: `proj-${proj.title}`,
        title: proj.title,
        subtitle: proj.techStack.slice(0, 4).join(" • "),
        category: "Projects",
        icon: FolderGit2,
        keywords: [
          proj.title.toLowerCase(),
          ...proj.techStack.map((t) => t.toLowerCase()),
          ...((proj as any).categories || []),
        ],
        action: () => {
          onClose();
          if (onSelectProject) {
            onSelectProject(proj.title);
          } else {
            scrollTo("projects");
          }
        },
      });

      // Quick launch action for projects with hosted liveUrl
      if ((proj as any).liveUrl) {
        list.push({
          id: `launch-${proj.title}`,
          title: `Launch ${proj.title} (Live App)`,
          subtitle: (proj as any).liveUrl,
          category: "Actions",
          icon: ExternalLink,
          keywords: [
            "launch",
            "open",
            "live",
            "demo",
            "app",
            "frontend",
            proj.title.toLowerCase(),
            ...proj.techStack.map((t) => t.toLowerCase()),
          ],
          action: () => {
            onClose();
            window.open((proj as any).liveUrl, "_blank", "noopener,noreferrer");
          },
        });
      }
    });

    return list;
  }, [copiedEmail, onClose, onOpenResume, onSelectProject]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const scored = commands
      .map((cmd) => {
        const { isMatch, score } = fuzzyMatchItem(query, [
          { text: cmd.title, weight: 3.0 },
          { text: cmd.keywords || [], weight: 2.5 },
          { text: cmd.subtitle || "", weight: 1.5 },
          { text: cmd.category, weight: 1.0 },
        ]);
        return { cmd, isMatch, score };
      })
      .filter((item) => item.isMatch)
      .sort((a, b) => b.score - a.score);

    return scored.map((item) => item.cmd);
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === "Enter" && filteredCommands.length > 0) {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#02040a]/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Card */}
      <div className="relative w-full max-w-xl bg-slate-900/95 border border-teal-500/30 rounded-3xl shadow-[0_0_50px_rgba(45,212,191,0.2)] overflow-hidden z-10 backdrop-blur-2xl flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-950/70">
          <Search size={18} className="text-teal-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, skill (e.g. 'resume', 'RAG', 'Snowflake')..."
            className="w-full bg-transparent text-slate-100 text-sm placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-slate-400 border border-white/10">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm font-mono">
              <p>No matching commands or projects found.</p>
              <p className="text-xs text-slate-600 mt-1">Try searching &apos;resume&apos;, &apos;rag&apos;, or &apos;snowflake&apos;</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = cmd.icon;

              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-teal-400/15 border border-teal-400/30 text-white shadow-sm"
                      : "text-slate-300 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`p-2 rounded-xl border flex-shrink-0 ${
                        isSelected
                          ? "bg-teal-400 text-slate-950 border-teal-400"
                          : "bg-slate-800/80 text-teal-400 border-white/10"
                      }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate">
                          {cmd.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-400 border border-white/5">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center text-slate-500 flex-shrink-0">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-300">
                        <span>Select</span>
                        <CornerDownLeft size={12} />
                      </span>
                    ) : (
                      <ArrowRight size={14} className="opacity-40" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px]">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px]">↵</kbd> choose
            </span>
          </div>
          <span className="text-teal-400 font-semibold">{filteredCommands.length} results</span>
        </div>
      </div>
    </div>
  );
};
