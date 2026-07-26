"use client";

import { useState, useEffect } from "react";

const VIBES = [
  { id: "chill", emoji: "🌊", label: "Chill", color: "from-cyan-900 to-blue-950", accent: "text-cyan-300" },
  { id: "hype", emoji: "🔥", label: "Hype", color: "from-orange-900 to-red-950", accent: "text-orange-300" },
  { id: "focus", emoji: "🎯", label: "Focus", color: "from-emerald-900 to-teal-950", accent: "text-emerald-300" },
  { id: "creative", emoji: "✨", label: "Creative", color: "from-purple-900 to-fuchsia-950", accent: "text-fuchsia-300" },
  { id: "cozy", emoji: "☕", label: "Cozy", color: "from-amber-900 to-yellow-950", accent: "text-amber-300" },
  { id: "night", emoji: "🌙", label: "Night Owl", color: "from-indigo-950 to-violet-950", accent: "text-indigo-300" },
];

const QUOTES: Record<string, string[]> = {
  chill: [
    "Breathe. The universe isn't in a hurry.",
    "Slow is smooth. Smooth is fast.",
    "Your only job right now is to exist peacefully.",
  ],
  hype: [
    "Go all in. No half measures.",
    "Energy is contagious. Be the source.",
    "Today is the day you outwork yesterday.",
  ],
  focus: [
    "One thing. Do it completely.",
    "Distraction is the enemy of depth.",
    "Protect your attention like it's gold.",
  ],
  creative: [
    "Make something only you could make.",
    "The best ideas arrive when you stop forcing them.",
    "Play first. Polish later.",
  ],
  cozy: [
    "Soft lighting. Soft thoughts. Soft day.",
    "Rest is productive too.",
    "You don't have to earn comfort.",
  ],
  night: [
    "The quiet hours belong to the builders.",
    "Stars only come out when it's dark.",
    "Night is when the real work happens.",
  ],
};

export default function VibeSelector() {
  const [vibe, setVibe] = useState<string | null>(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (vibe) {
      const qs = QUOTES[vibe] || [];
      setQuote(qs[Math.floor(Math.random() * qs.length)]);
    }
  }, [vibe]);

  const current = VIBES.find((v) => v.id === vibe);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-b ${
        current ? current.color : "from-zinc-900 to-zinc-950"
      } p-6 transition-all duration-700`}
    >
      {!vibe ? (
        <>
          <h2 className="text-3xl font-bold mb-2 glow-text">What&apos;s your vibe?</h2>
          <p className="text-zinc-400 mb-8 text-sm">Pick one. Get a little nudge.</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {VIBES.map((v) => (
              <button
                key={v.id}
                onClick={() => setVibe(v.id)}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all active:scale-95"
              >
                <span className="text-4xl">{v.emoji}</span>
                <span className="font-medium text-sm">{v.label}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center max-w-md animate-float">
          <span className="text-6xl mb-4 block">{current?.emoji}</span>
          <h2 className={`text-3xl font-bold mb-4 ${current?.accent}`}>
            {current?.label}
          </h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8 italic">
            &ldquo;{quote}&rdquo;
          </p>
          <button
            onClick={() => setVibe(null)}
            className="px-5 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
          >
            Change vibe
          </button>
        </div>
      )}
    </div>
  );
}
