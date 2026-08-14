"use client";

import { useEffect, useRef } from "react";

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pure binary digits for tech/hacking aesthetic
    const characters = "01";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    // Drops array tracking vertical position
    const drops: number[] = [];
    const speeds: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      speeds[i] = 0.8 + Math.random() * 0.45;
    }

    // Mouse coordinates with smooth lerping
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 195,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let lastDrawTime = 0;
    const frameInterval = 33; // ~30 FPS for matrix timing

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      if (currentTime - lastDrawTime < frameInterval) return;
      lastDrawTime = currentTime;

      // Steady dark fade without flashing
      ctx.fillStyle = "rgba(5, 8, 20, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const baseX = i * fontSize;
        const baseY = drops[i] * fontSize;

        const dx = baseX - mouse.x;
        const dy = baseY - mouse.y;
        const dist = Math.hypot(dx, dy);

        let drawX = baseX;
        let drawY = baseY;
        let isNearMouse = false;

        // Enhanced organic gravitational repulsion lens
        if (dist < mouse.radius && mouse.x > 0) {
          isNearMouse = true;
          const norm = 1 - dist / mouse.radius;
          // Smooth sine curve for natural magnetic field feel
          const force = Math.sin(norm * (Math.PI / 2)) * 34;
          const angle = Math.atan2(dy, dx);

          drawX += Math.cos(angle) * force;
          drawY += Math.sin(angle) * force;
        }

        const text = characters.charAt(Math.floor(Math.random() * characters.length));

        if (isNearMouse) {
          ctx.fillStyle = "#5eead4";
          ctx.shadowBlur = 5;
          ctx.shadowColor = "#14b8a6";
        } else {
          ctx.fillStyle = "#0d9488";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, drawX, drawY);

        if (baseY > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        const step = isNearMouse ? speeds[i] * 1.35 : speeds[i];
        drops[i] += step;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full opacity-48 pointer-events-none"
    />
  );
};