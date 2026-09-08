"use client";

import React, { useRef, useState, useCallback } from "react";
import { Terminal, Sparkles, Activity } from "lucide-react";

export default function GeometricEmblemCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  // High-performance GPU-accelerated CSS variable updates on mousemove (120 FPS, 0 React re-renders)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1

    el.style.setProperty("--rx", `${-py * 14}deg`);
    el.style.setProperty("--ry", `${px * 14}deg`);
    el.style.setProperty("--bx", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--by", `${(y / rect.height) * 100}%`);
    el.style.setProperty("--glow-op", "0.85");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--bx", "50%");
    el.style.setProperty("--by", "50%");
    el.style.setProperty("--glow-op", "0.35");
  }, []);

  const handleCardClick = () => {
    setPulseCount((c) => c + 1);
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 700);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={
        {
          "--rx": "0deg",
          "--ry": "0deg",
          "--bx": "50%",
          "--by": "50%",
          "--glow-op": "0.35",
          perspective: "1000px",
        } as React.CSSProperties
      }
      className="relative w-full max-w-[280px] sm:max-w-[320px] select-none cursor-pointer group"
    >
      {/* Dynamic Cursor-Following Ambient Backlight (GPU-accelerated) */}
      <div
        className="absolute -inset-1 rounded-3xl blur-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: "var(--glow-op)",
          background: `radial-gradient(circle at var(--bx) var(--by), rgba(45, 212, 191, 0.4), rgba(56, 189, 248, 0.2) 40%, transparent 70%)`,
        }}
      />

      {/* 3D Tilted Card Body with Hardware-Accelerated Transforms */}
      <div
        style={{
          transform: `perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)",
        }}
        className={`relative rounded-3xl p-5 bg-gradient-to-b from-slate-900/95 via-slate-950/90 to-[#030712] backdrop-blur-2xl border transition-all duration-300 flex flex-col items-center overflow-hidden ${
          isPulsing
            ? "border-teal-300 shadow-[0_0_70px_rgba(45,212,191,0.5)]"
            : "border-teal-500/30 shadow-[0_0_40px_rgba(45,212,191,0.15)] group-hover:border-teal-400/80 group-hover:shadow-[0_0_60px_rgba(45,212,191,0.35)]"
        }`}
      >
        {/* Dynamic Holographic Specular Sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--bx) var(--by), rgba(255,255,255,0.09), transparent 60%)`,
          }}
        />

        {/* TOP STATUS BAR: Clean, Clear & Professional */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono z-10">
          <div className="flex items-center gap-1.5 text-teal-300 font-semibold tracking-wider">
            <Terminal size={13} className="text-teal-400" />
            <span>ABHINEET_MENON</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[10px] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
            <span className="font-semibold tracking-widest">
              {isPulsing ? "ACTIVE" : "ONLINE"}
            </span>
          </div>
        </div>

        {/* CENTRAL VIEWPORT: 3D Pop-Out Depth & Gyroscopic Rings */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative w-full aspect-square my-3 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-950/95 via-[#060c18] to-slate-950 border border-white/[0.06] group-hover:border-teal-500/40 transition-colors shadow-inner"
        >
          {/* Cyberpunk Isometric Matrix Grid Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a615_1px,transparent_1px),linear-gradient(to_bottom,#14b8a615_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

          {/* Sweeping Laser Scanline Beam */}
          <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-teal-400/12 to-transparent -translate-y-full animate-[bounce_4s_infinite] pointer-events-none" />

          {/* Precision Corner Reticle Brackets */}
          <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-teal-400/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-teal-400/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-teal-400/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-teal-400/60 pointer-events-none" />

          {/* GYROSCOPIC RING 1: Outer Compass Orbit */}
          <div className="absolute w-52 h-52 rounded-full border border-teal-500/15 border-dashed animate-[spin_24s_linear_infinite] group-hover:border-teal-400/40 pointer-events-none" />

          {/* GYROSCOPIC RING 2: 3D Tilted Elliptical Plane Alpha */}
          <div
            style={{ transform: "rotateX(64deg) rotateZ(30deg)" }}
            className="absolute w-44 h-44 rounded-full border-2 border-teal-400/25 animate-[spin_8s_linear_infinite] pointer-events-none"
          >
            {/* Orbiting Photon Satellite Alpha */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-teal-300 shadow-[0_0_12px_#2dd4bf] animate-ping" />
          </div>

          {/* GYROSCOPIC RING 3: 3D Tilted Elliptical Plane Beta (Counter-Spin) */}
          <div
            style={{ transform: "rotateX(64deg) rotateZ(-40deg)" }}
            className="absolute w-40 h-40 rounded-full border border-cyan-400/30 border-dotted animate-[spin_12s_linear_infinite_reverse] pointer-events-none"
          >
            {/* Orbiting Photon Satellite Beta */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#38bdf8]" />
          </div>

          {/* Ambient Plasma Reactor Core Glow */}
          <div
            className={`absolute w-32 h-32 rounded-full bg-gradient-to-tr from-teal-500/25 via-cyan-400/30 to-emerald-400/20 blur-xl transition-all duration-500 ${
              isPulsing ? "scale-150 opacity-100" : "group-hover:scale-125 opacity-70"
            }`}
          />

          {/* Interactive Shockwave Pulse Ring on Click */}
          {pulseCount > 0 && (
            <div
              key={pulseCount}
              className="absolute w-16 h-16 rounded-full border-2 border-teal-300 animate-ping pointer-events-none"
            />
          )}

          {/* CENTRAL MONOGRAM SHIELD (Enhanced 3D Pop-Out Depth) */}
          <div
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            {/* Holographic Chamfered Badge */}
            <div
              className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#020510] border-2 shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 overflow-hidden ${
                isPulsing
                  ? "border-teal-300 shadow-[0_0_50px_rgba(45,212,191,0.8)] scale-110"
                  : "border-teal-400/80 shadow-[0_0_35px_rgba(45,212,191,0.45)]"
              }`}
            >
              {/* Inner Cyberpunk Grid & Bevel Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-transparent to-cyan-400/20 pointer-events-none" />
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 group-hover:animate-[shimmer_1.2s_infinite] pointer-events-none" />

              {/* Monogram Glyph */}
              <span className="font-mono text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-teal-200 via-white to-cyan-300 drop-shadow-[0_2px_12px_rgba(45,212,191,0.7)]">
                &lt;AM/&gt;
              </span>
            </div>

            {/* Sub-label Badge */}
            <div className="mt-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-teal-500/30 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-teal-200 uppercase font-bold">
                Abhineet Menon
              </span>
            </div>
          </div>
        </div>

        {/* CLEAN, ELEGANT BOTTOM BAR */}
        <div className="w-full mt-1 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            <span className="text-slate-300 font-medium tracking-wide">
              Full-Stack &amp; AI Engineer
            </span>
          </div>
          <span className="text-[10px] text-teal-300 font-semibold bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
            MS CS @ UIC
          </span>
        </div>
      </div>
    </div>
  );
}
