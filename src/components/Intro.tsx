"use client";

export default function Intro() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-violet-950 via-zinc-950 to-black relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live · No signup needed
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            ScrollArcade
          </span>
        </h1>

        <p className="text-lg text-zinc-300 mb-2">
          TikTok for mini-games
        </p>
        <p className="text-zinc-500 text-sm mb-10 max-w-sm mx-auto">
          Swipe up for the next bite-sized experience. Reaction tests, memory, sequences, vibes & more.
        </p>

        <div className="flex flex-col items-center gap-3 text-zinc-400 text-sm animate-float">
          <svg
            className="w-6 h-6 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span>Swipe or scroll to play</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-zinc-600">
        Scores saved locally · Built for fun
      </div>
    </div>
  );
}
