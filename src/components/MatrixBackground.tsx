"use client";

import { useEffect, useRef, useState } from "react";

interface MatrixColumn {
  head: number;
  length: number;
  speed: number;
  lastStepTime: number;
  chars: string[];
  depth: number; // 0: foreground crisp, 1: midground, 2: ambient deep
  active: boolean;
  waitTimer: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [telemetry, setTelemetry] = useState({
    x: 0,
    y: 0,
    hexAddr: "0x7FFE4A018B20",
    latency: "0.4ms",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pure Binary Digits (0 and 1 only)
    const fontSize = 14;
    const colWidth = 19;
    const rowHeight = 19;

    let totalCols = Math.floor(width / colWidth);
    let totalRows = Math.ceil(height / rowHeight) + 1;

    let columns: MatrixColumn[] = [];
    const ripples: Ripple[] = [];

    // Horizontal cyber laser scanline position
    let laserY = -100;
    let laserSpeed = 120; // px/sec

    const createColumn = (isInitial = false): MatrixColumn => {
      const length = Math.floor(10 + Math.random() * 18);

      const depthRand = Math.random();
      const depth = depthRand > 0.7 ? 0 : depthRand > 0.3 ? 1 : 2;
      const baseSpeed = depth === 0 ? 80 : depth === 1 ? 110 : 155;
      const speed = baseSpeed + Math.random() * 45;

      const chars: string[] = [];
      for (let r = 0; r < totalRows + 40; r++) {
        chars.push(Math.random() > 0.5 ? "1" : "0");
      }

      const shouldStartActive = isInitial ? Math.random() > 0.22 : true;
      const initialHead = isInitial
        ? Math.floor(Math.random() * (totalRows + 15)) - 10
        : -Math.floor(Math.random() * 20) - 2;

      return {
        head: initialHead,
        length,
        speed,
        lastStepTime: performance.now() - Math.random() * speed,
        chars,
        depth,
        active: shouldStartActive,
        waitTimer: isInitial && !shouldStartActive ? Math.random() * 3500 : 0,
      };
    };

    const initColumns = () => {
      columns = [];
      for (let c = 0; c < totalCols; c++) {
        columns.push(createColumn(true));
      }
    };
    initColumns();

    // Mouse coordinates with smooth lerping
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 195,
      radiusSq: 195 * 195,
    };

    let lastTelemetryUpdate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Throttle telemetry update to ~150ms
      const now = performance.now();
      if (now - lastTelemetryUpdate > 150) {
        lastTelemetryUpdate = now;
        const hex = (0x7ffe00000000 + (e.clientX * 65536 + e.clientY))
          .toString(16)
          .toUpperCase();
        setTelemetry({
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
          hexAddr: `0x${hex.slice(0, 4)}_${hex.slice(4, 8)}_${hex.slice(8, 12)}`,
          latency: `${(0.2 + Math.random() * 0.4).toFixed(1)}ms`,
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // Interactive Shockwave on click
    const handleClick = (e: MouseEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 280,
        alpha: 1.0,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth mouse lerp
      const mouseLerpFactor = 1 - Math.exp(-14 * elapsed);
      mouse.x += (mouse.targetX - mouse.x) * mouseLerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * mouseLerpFactor;

      // Update cyber laser scanline
      laserY += laserSpeed * elapsed;
      if (laserY > height + 200) {
        laserY = -150;
      }

      // Update interactive shockwave ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 360 * elapsed;
        r.alpha = Math.max(0, 1 - r.radius / r.maxRadius);
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Render matrix columns
      for (let c = 0; c < columns.length; c++) {
        const col = columns[c];

        if (!col.active) {
          col.waitTimer -= elapsed * 1000;
          if (col.waitTimer <= 0) {
            columns[c] = createColumn(false);
          }
          continue;
        }

        // Discrete step timer
        if (currentTime - col.lastStepTime >= col.speed) {
          col.head += 1;
          col.lastStepTime = currentTime;

          // Occasional live binary mutation
          if (Math.random() > 0.45) {
            const mutRow = Math.max(
              0,
              col.head - Math.floor(Math.random() * col.length)
            );
            if (mutRow < col.chars.length) {
              col.chars[mutRow] = Math.random() > 0.5 ? "1" : "0";
            }
          }

          if (col.head - col.length > totalRows) {
            col.active = false;
            col.waitTimer = 700 + Math.random() * 2800;
            continue;
          }
        }

        const startRow = Math.max(0, col.head - col.length);
        const endRow = Math.min(totalRows - 1, col.head);

        const baseX = c * colWidth + colWidth / 2;

        const depthFontSize =
          col.depth === 0 ? fontSize : col.depth === 1 ? fontSize - 1 : fontSize - 2;
        ctx.font = `600 ${depthFontSize}px ui-monospace, "Cascadia Code", "Fira Code", SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

        for (let r = startRow; r <= endRow; r++) {
          const baseY = r * rowHeight + rowHeight / 2;

          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const distSq = dx * dx + dy * dy;

          let drawX = baseX;
          let drawY = baseY;
          let isNearMouse = false;

          // Organic magnetic repulsion lens around cursor
          if (mouse.x > 0 && distSq < mouse.radiusSq) {
            isNearMouse = true;
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / mouse.radius;
            const force = Math.sin(norm * (Math.PI / 2)) * 32;
            const angle = Math.atan2(dy, dx);

            drawX += Math.cos(angle) * force;
            drawY += Math.sin(angle) * force;
          }

          // Check if affected by click ripples
          let rippleBoost = 0;
          for (let rip of ripples) {
            const rDx = baseX - rip.x;
            const rDy = baseY - rip.y;
            const rDist = Math.hypot(rDx, rDy);
            if (Math.abs(rDist - rip.radius) < 30) {
              rippleBoost = Math.max(rippleBoost, rip.alpha);
            }
          }

          // Laser scanline illumination
          const isNearLaser = Math.abs(baseY - laserY) < 35;

          const distFromHead = col.head - r;
          const char = col.chars[r % col.chars.length];

          // Reading corridor contrast attenuation (dims background glyphs behind primary text column)
          const inReadingZone = baseX > width * 0.08 && baseX < width * 0.72;
          const zoneDim = inReadingZone ? 0.55 : 1.0;

          // Hacker / Terminal Color Palette:
          if (isNearMouse || rippleBoost > 0.4) {
            ctx.fillStyle = "#5eead4"; // Neon cyan
          } else if (isNearLaser) {
            ctx.fillStyle = "#a5f3fc"; // Laser sweep highlight
          } else if (distFromHead === 0) {
            // Luminous cyan cursor (distinct from white text to preserve readability)
            ctx.fillStyle = inReadingZone ? "#5eead4" : "#e0f2fe";
          } else if (distFromHead === 1) {
            ctx.fillStyle = inReadingZone ? "#2dd4bf" : "#7dd3fc";
          } else if (distFromHead < 4) {
            ctx.fillStyle = col.depth === 0 ? "#14b8a6" : "#0d9488";
          } else {
            const fade = 1 - distFromHead / col.length;
            const depthFactor = col.depth === 0 ? 0.85 : col.depth === 1 ? 0.65 : 0.42;
            const alpha = Math.max(0.04, fade * depthFactor * zoneDim);
            ctx.fillStyle = `rgba(13, 148, 136, ${alpha})`;
          }

          ctx.fillText(char, drawX, drawY);
        }
      }

      // Draw subtle laser scanline
      if (laserY >= 0 && laserY <= height) {
        const gradient = ctx.createLinearGradient(0, laserY - 15, 0, laserY + 15);
        gradient.addColorStop(0, "rgba(45, 212, 191, 0)");
        gradient.addColorStop(0.5, "rgba(45, 212, 191, 0.08)");
        gradient.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, laserY - 15, width, 30);
      }

      // Draw shockwave ripples
      for (const rip of ripples) {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(94, 234, 212, ${rip.alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        totalCols = Math.floor(width / colWidth);
        totalRows = Math.ceil(height / rowHeight) + 1;
        initColumns();
      }, 120);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-full w-full opacity-30 pointer-events-none transform-gpu"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      />

      {/* Cyberpunk CRT Scanline Overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.5) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Ambient Hacker Telemetry HUD Overlay (Top & Bottom Edges) */}
      <div className="fixed top-20 right-6 z-0 pointer-events-none hidden lg:flex flex-col items-end text-[10px] font-mono text-teal-400/40 select-none tracking-widest space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 animate-pulse" />
          <span>SYS.TELEMETRY // LIVE</span>
        </div>
        <div>MEM: {telemetry.hexAddr}</div>
        <div>LOC: [{telemetry.x}, {telemetry.y}] // LAT: {telemetry.latency}</div>
      </div>

      <div className="fixed bottom-6 left-6 z-0 pointer-events-none hidden lg:flex items-center gap-3 text-[10px] font-mono text-teal-400/30 select-none tracking-widest">
        <span>[ ARCH: x86_64 // ENCRYPT: AES-256 ]</span>
        <span className="text-teal-400/20">|</span>
        <span>PORT: 3000 // STATUS: 200_OK</span>
      </div>
    </>
  );
};