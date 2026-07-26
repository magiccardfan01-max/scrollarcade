"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function ReactionGame() {
  const [state, setState] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("reaction-best");
    if (saved) setBest(Number(saved));
  }, []);

  const start = useCallback(() => {
    setState("waiting");
    setReactionTime(null);
    const delay = 1500 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setState("ready");
      setStartTime(performance.now());
    }, delay);
  }, []);

  const handleClick = () => {
    if (state === "idle" || state === "result") {
      start();
      return;
    }
    if (state === "waiting") {
      // Too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("idle");
      setReactionTime(-1);
      return;
    }
    if (state === "ready") {
      const rt = Math.round(performance.now() - startTime);
      setReactionTime(rt);
      setState("result");
      if (best === null || rt < best) {
        setBest(rt);
        localStorage.setItem("reaction-best", String(rt));
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const bg =
    state === "ready"
      ? "bg-emerald-500"
      : state === "waiting"
      ? "bg-red-500/80"
      : "bg-zinc-900";

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-200 ${bg}`}
      onClick={handleClick}
    >
      <div className="text-center px-6">
        {state === "idle" && (
          <>
            <h2 className="text-3xl font-bold mb-2 glow-text">Reaction Test</h2>
            <p className="text-zinc-400 mb-6">Tap when the screen turns green</p>
            <p className="text-sm text-zinc-500">Tap anywhere to start</p>
            {best !== null && (
              <p className="mt-4 text-cyan-400">Best: {best}ms</p>
            )}
          </>
        )}
        {state === "waiting" && (
          <>
            <h2 className="text-4xl font-bold text-white">Wait for green...</h2>
            <p className="text-white/70 mt-2">Don&apos;t tap yet!</p>
          </>
        )}
        {state === "ready" && (
          <h2 className="text-5xl font-black text-white animate-pulse">TAP!</h2>
        )}
        {state === "result" && reactionTime !== null && (
          <>
            {reactionTime < 0 ? (
              <h2 className="text-3xl font-bold text-red-300">Too early!</h2>
            ) : (
              <>
                <h2 className="text-5xl font-black text-white">{reactionTime}ms</h2>
                <p className="text-zinc-300 mt-2">
                  {reactionTime < 200
                    ? "Insane! 🔥"
                    : reactionTime < 300
                    ? "Great!"
                    : reactionTime < 400
                    ? "Good"
                    : "Keep practicing"}
                </p>
              </>
            )}
            {best !== null && reactionTime > 0 && (
              <p className="mt-3 text-cyan-400">Best: {best}ms</p>
            )}
            <p className="mt-6 text-sm text-zinc-400">Tap to try again</p>
          </>
        )}
      </div>
    </div>
  );
}
