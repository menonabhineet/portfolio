"use client";

import { useEffect, useRef } from "react";

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    // Binary characters - added some special chars for extra "hacker" feel
    const characters = "01";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Lower opacity fade for longer "trails"
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)"; 
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0d9488"; // Tealer/Greener text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Randomly brighten some characters
        if (Math.random() > 0.98) {
            ctx.fillStyle = "#5eead4"; // Bright teal highlight
        } else {
            ctx.fillStyle = "#0f766e"; // Standard dark teal
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Faster speed (35ms instead of 50ms)
    const interval = setInterval(draw, 35);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full opacity-30 pointer-events-none"
    />
  );
};