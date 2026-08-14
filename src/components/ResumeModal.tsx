"use client";

import React, { useEffect, useState } from "react";
import { X, Download, ExternalLink, FileText, Loader2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl = "./Abhineet_Menon_Resume.pdf",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#02040a]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[950px] bg-slate-900/95 border border-teal-500/30 rounded-3xl shadow-[0_0_50px_rgba(45,212,191,0.15)] flex flex-col overflow-hidden z-10 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-tight flex items-center gap-2">
                <span>Abhineet_Menon_Resume.pdf</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-teal-400/10 text-teal-300 border border-teal-400/30">
                  Official
                </span>
              </h2>
              <p className="text-xs text-slate-400">Master of Science in Computer Science • UIC (4.0 GPA)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              download="Abhineet_Menon_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-400 text-slate-950 text-xs font-mono font-bold hover:bg-teal-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all cursor-pointer"
              title="Download PDF to your computer"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 text-slate-200 border border-white/10 text-xs font-mono hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
              title="Open in new tab"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Frame Viewer */}
        <div className="relative flex-1 w-full bg-slate-950/80 overflow-hidden flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400 z-10 bg-slate-950/70">
              <Loader2 className="animate-spin text-teal-400" size={32} />
              <p className="text-xs font-mono">Loading Document...</p>
            </div>
          )}

          <iframe
            src={`${resumeUrl}#view=FitH&toolbar=1`}
            title="Abhineet Menon Resume"
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Footer Quick Info Bar */}
        <div className="px-6 py-2.5 bg-slate-950/90 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-[11px]">Tip: Press &apos;ESC&apos; to exit viewer anytime</span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-teal-400">Data Engineering • AI / RAG • Systems</span>
            <a
              href="mailto:menonabhineet@gmail.com"
              className="text-slate-300 hover:text-teal-300 transition-colors underline decoration-teal-400/40"
            >
              menonabhineet@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
