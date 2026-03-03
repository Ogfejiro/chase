"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
}

export default function HeroGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate nodes
    const NODE_COUNT = 28;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
    }));

    const MAX_DIST = 130;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,255,136,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const radius = n.r + glow * 2;

        // Outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 6);
        grad.addColorStop(0, `rgba(0,255,136,${0.15 * glow})`);
        grad.addColorStop(1, "rgba(0,255,136,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,136,${0.5 + glow * 0.5})`;
        ctx.fill();
      });

      // Draw hexagon overlays at key nodes (every 6th)
      nodes.forEach((n, i) => {
        if (i % 6 !== 0) return;
        const size = 14 + Math.sin(n.pulse) * 3;
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.pulse * 0.3);
        ctx.beginPath();
        for (let s = 0; s < 6; s++) {
          const angle = (Math.PI / 3) * s - Math.PI / 6;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,255,136,${0.15 + Math.sin(n.pulse) * 0.1})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      });

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 hidden lg:block pointer-events-none">
      {/* Fade left edge so it blends into text */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04080f] via-transparent to-transparent z-10" />
      {/* Fade top & bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04080f] via-transparent to-[#04080f] z-10" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />
    </div>
  );
}