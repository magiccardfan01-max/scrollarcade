"use client";

import { useState, useEffect, useRef } from "react";

export default function ClickerGame() {
  const [score, setScore] = useState(0);
  const [cps, setCps] = useState(0);
  const [best, setBest] = useState(0);
  const clicksRef = useRef<number[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("clicker-best");
    if (saved) setBest(Number(saved));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      clicksRef.current = clicksRef.current.filter((t) => now - t < 1000);
      setCps(clicksRef.current.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    setScore((s) => {
      const next = s + 1;
      if (next > best) {
        setBest(next);
        localStorage.setItem("clicker-best", String(next));
      }
      return next;
    });
    clicksRef.current.push(Date.now());

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = idRef.current++;
    setParticles((p) => [...p, { id, x, y }]);
    setTimeout(() => {
      setParticles((p) => p.filter((pt) => pt.id !== id));
    }, 600);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-violet-950 to-zinc-950 relative overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl pointer-events-none animate-ping"
          style={{ left: p.x, top: p.y, transform: "translate(-50%, -50%)" }}
        >
          ✨
        </span>
      ))}
      <div className="text-center z-10">
        <h2 className="text-2xl font-semibold text-violet-300 mb-2">Click Frenzy</h2>
        <p className="text-7xl font-black text-white tabular-nums">{score}</p>
        <p className="text-cyan-400 mt-2 text-lg">{cps} CPS</p>
        {best > 0 && <p className="text-zinc-500 mt-4 text-sm">Best session: {best}</p>}
        <p className="mt-8 text-zinc-400 text-sm">Tap as fast as you can!</p>
      </div>
    </div>
  );
}
