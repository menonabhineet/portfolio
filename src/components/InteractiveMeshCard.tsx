"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, Sparkles } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function InteractiveMeshCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState<"orbit" | "poly">("poly");

  // Mouse interaction state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, lastX: 0, lastY: 0 });
  const rotationRef = useRef({ x: 0.3, y: 0.5, z: 0.1 });
  const speedRef = useRef({ x: 0.005, y: 0.008 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Golden ratio for icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize to unit sphere
    const icosahedronVertices = rawVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    });

    // Edges (distance between connected vertices in regular icosahedron)
    const edges: [number, number][] = [];
    for (let i = 0; i < icosahedronVertices.length; i++) {
      for (let j = i + 1; j < icosahedronVertices.length; j++) {
        const dx = icosahedronVertices[i].x - icosahedronVertices[j].x;
        const dy = icosahedronVertices[i].y - icosahedronVertices[j].y;
        const dz = icosahedronVertices[i].z - icosahedronVertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // Normalized edge length is ~1.05146
        if (dist > 0.95 && dist < 1.15) {
          edges.push([i, j]);
        }
      }
    }

    // Outer floating particle field
    const particleCount = 28;
    const particles: Point3D[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const r = 1.35 + Math.random() * 0.45;
      const x = r * Math.sqrt(1 - u * u) * Math.cos(theta);
      const y = r * Math.sqrt(1 - u * u) * Math.sin(theta);
      const z = r * u;
      particles.push({ x, y, z });
    }

    // 3D rotation matrix helper
    const rotatePoint = (p: Point3D, rx: number, ry: number, rz: number): Point3D => {
      // Rotate around X
      let y1 = p.y * Math.cos(rx) - p.z * Math.sin(rx);
      let z1 = p.y * Math.sin(rx) + p.z * Math.cos(rx);
      let x1 = p.x;

      // Rotate around Y
      let x2 = x1 * Math.cos(ry) + z1 * Math.sin(ry);
      let z2 = -x1 * Math.sin(ry) + z1 * Math.cos(ry);
      let y2 = y1;

      // Rotate around Z
      let x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
      let y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
      let z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    // Resize handler for Retina displays
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    handleResize();

    // IntersectionObserver to pause when not visible (saves CPU / Battery)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Main animation loop
    let pulseAngle = 0;
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Mouse inertia / smooth damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Update rotation
      rotationRef.current.x += speedRef.current.x + mouseRef.current.y * 0.02;
      rotationRef.current.y += speedRef.current.y + mouseRef.current.x * 0.02;
      rotationRef.current.z += 0.002;
      pulseAngle += 0.03;

      const { x: rx, y: ry, z: rz } = rotationRef.current;

      // Deep radial glow backdrop
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.5
      );
      radialGlow.addColorStop(0, "rgba(45, 212, 191, 0.16)");
      radialGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.06)");
      radialGlow.addColorStop(1, "rgba(15, 23, 42, 0)");
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Project vertices to 2D
      const fov = 3.5;
      const projected = icosahedronVertices.map((v) => {
        const p = rotatePoint(v, rx, ry, rz);
        const perspective = fov / (fov + p.z);
        return {
          x: centerX + p.x * radius * perspective,
          y: centerY + p.y * radius * perspective,
          z: p.z,
          perspective,
        };
      });

      // Draw outer ambient particles
      particles.forEach((p, idx) => {
        const rot = rotatePoint(p, rx * 0.7 + idx * 0.05, ry * 0.7, rz * 0.5);
        const perspective = fov / (fov + rot.z);
        const px = centerX + rot.x * radius * perspective;
        const py = centerY + rot.y * radius * perspective;
        const alpha = Math.max(0.1, (rot.z + 1.8) / 3.6) * 0.6;

        ctx.fillStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2 * perspective, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw edges with depth-based luminescence
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2; // range roughly -1 to 1

        // Depth cueing: front edges are bright teal, back edges are faint slate
        const depthNorm = (avgZ + 1.2) / 2.4; // 0 to 1
        const alpha = Math.max(0.08, Math.min(0.85, depthNorm * 0.85));
        const lineWidth = Math.max(0.7, depthNorm * 1.8);

        ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw secondary inner core connections (pulsing geometric nucleus)
      const coreScale = 0.42 + Math.sin(pulseAngle) * 0.04;
      const coreProjected = icosahedronVertices.map((v) => {
        const p = rotatePoint({ x: v.x * coreScale, y: v.y * coreScale, z: v.z * coreScale }, -rx, -ry, rz * 2);
        const perspective = fov / (fov + p.z);
        return {
          x: centerX + p.x * radius * perspective,
          y: centerY + p.y * radius * perspective,
          z: p.z,
          perspective,
        };
      });

      // Draw core nodes & subtle spokes
      coreProjected.forEach((cp, idx) => {
        const alpha = Math.max(0.2, (cp.z + 1) / 2) * 0.8;
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 1.8 * cp.perspective, 0, Math.PI * 2);
        ctx.fill();

        // Connect a few spokes to outer shell
        if (idx % 2 === 0) {
          const outer = projected[idx];
          ctx.strokeStyle = `rgba(56, 189, 248, 0.15)`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(cp.x, cp.y);
          ctx.lineTo(outer.x, outer.y);
          ctx.stroke();
        }
      });

      // Draw outer nodes (vertices)
      projected.forEach((p) => {
        const depthNorm = (p.z + 1.2) / 2.4;
        const alpha = Math.max(0.2, Math.min(1, depthNorm * 1.2));
        const nodeSize = Math.max(1.8, depthNorm * 3.8);

        // Vertex glow halo
        ctx.fillStyle = `rgba(45, 212, 191, ${alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Vertex core
        ctx.fillStyle = `rgba(240, 253, 250, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse interaction handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseRef.current.targetX = x * 0.04;
    mouseRef.current.targetY = -y * 0.04;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group w-full max-w-[280px] sm:max-w-[320px] select-none"
    >
      {/* Outer ambient neon glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/20 via-cyan-500/30 to-teal-400/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-700"></div>

      {/* Main Glassmorphic Card */}
      <div className="relative rounded-3xl p-4 bg-slate-950/80 backdrop-blur-xl border border-teal-500/30 shadow-[0_0_40px_rgba(45,212,191,0.15)] group-hover:border-teal-400/70 group-hover:shadow-[0_0_50px_rgba(45,212,191,0.3)] transition-all duration-500 flex flex-col items-center">
        
        {/* Top HUD Telemetry Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.08] text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-teal-400">
            <Sparkles size={12} className="animate-pulse" />
            <span className="font-semibold tracking-wider">3D_DATA_NODE</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
            <span>INTERACTIVE</span>
          </div>
        </div>

        {/* 3D Canvas Viewport */}
        <div className="relative w-full aspect-square my-2 rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-white/[0.04]">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Subtle Grid Corner Accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-teal-500/40 pointer-events-none"></div>
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-teal-500/40 pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-teal-500/40 pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-teal-500/40 pointer-events-none"></div>

          {/* Hover Hint Overlay */}
          <div
            className={`absolute bottom-2 inset-x-0 text-center pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300/80 bg-slate-950/80 px-2.5 py-1 rounded-full border border-teal-400/30">
              Move cursor to rotate
            </span>
          </div>
        </div>

        {/* Bottom Location & Status Pill */}
        <div className="w-full mt-2 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin size={13} className="text-teal-400" />
            <span className="text-[11px] text-slate-300">Chicago, IL</span>
          </div>
          <span className="text-[11px] font-semibold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
            Open to Relocation
          </span>
        </div>
      </div>
    </div>
  );
}
