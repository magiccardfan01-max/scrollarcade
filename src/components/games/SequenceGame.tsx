"use client";

import { useState, useEffect, useCallback } from "react";

const COLORS = [
  { id: 0, bg: "bg-red-500", active: "bg-red-300", name: "Red" },
  { id: 1, bg: "bg-blue-500", active: "bg-blue-300", name: "Blue" },
  { id: 2, bg: "bg-green-500", active: "bg-green-300", name: "Green" },
  { id: 3, bg: "bg-yellow-500", active: "bg-yellow-300", name: "Yellow" },
];

export default function SequenceGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [playing, setPlaying] = useState(false);
  const [lit, setLit] = useState<number | null>(null);
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState<"idle" | "watch" | "play" | "fail" | "win">("idle");
  const [best, setBest] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("sequence-best");
    if (saved) setBest(Number(saved));
  }, []);

  const playSequence = useCallback(async (seq: number[]) => {
    setStatus("watch");
    setPlaying(true);
    for (const color of seq) {
      await new Promise((r) => setTimeout(r, 400));
      setLit(color);
      await new Promise((r) => setTimeout(r, 500));
      setLit(null);
    }
    setPlaying(false);
    setStatus("play");
    setPlayerSeq([]);
  }, []);

  const start = () => {
    const first = [Math.floor(Math.random() * 4)];
    setSequence(first);
    setLevel(1);
    setStatus("watch");
    playSequence(first);
  };

  const handleColor = (id: number) => {
    if (status !== "play" || playing) return;
    const next = [...playerSeq, id];
    setPlayerSeq(next);
    setLit(id);
    setTimeout(() => setLit(null), 200);

    if (next[next.length - 1] !== sequence[next.length - 1]) {
      setStatus("fail");
      if (level - 1 > best) {
        setBest(level - 1);
        localStorage.setItem("sequence-best", String(level - 1));
      }
      return;
    }

    if (next.length === sequence.length) {
      // Next level
      const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(nextSeq);
      setLevel((l) => l + 1);
      setTimeout(() => playSequence(nextSeq), 600);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-amber-300 mb-1">Sequence Master</h2>
      <p className="text-zinc-400 text-sm mb-6">
        Level {level} {best > 0 && `· Best ${best}`}
      </p>

      <div className="grid grid-cols-2 gap-4 w-64">
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => handleColor(c.id)}
            disabled={status !== "play"}
            className={`aspect-square rounded-2xl transition-all duration-150 ${
              lit === c.id ? c.active + " scale-95 brightness-150" : c.bg
            } ${status === "play" ? "hover:brightness-110 cursor-pointer" : "cursor-default"}`}
          />
        ))}
      </div>

      <div className="mt-8 text-center h-16">
        {status === "idle" && (
          <button
            onClick={start}
            className="px-6 py-3 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition"
          >
            Start
          </button>
        )}
        {status === "watch" && (
          <p className="text-lg text-amber-200 animate-pulse">Watch carefully...</p>
        )}
        {status === "play" && (
          <p className="text-lg text-emerald-300">Your turn!</p>
        )}
        {status === "fail" && (
          <>
            <p className="text-xl text-red-400 font-bold">Wrong! Level {level - 1}</p>
            <button
              onClick={start}
              className="mt-3 px-5 py-2 rounded-full bg-amber-500 text-black text-sm font-medium"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
