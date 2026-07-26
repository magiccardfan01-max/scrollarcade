"use client";

import { useState, useEffect, useRef } from "react";

const SENTENCES = [
  "the quick brown fox jumps over the lazy dog",
  "code is poetry written in logic and caffeine",
  "build in public ship fast learn faster",
  "scrollarcade is the tiktok of mini games",
  "focus on progress not perfection every day",
  "tiny games big dopamine endless fun vibes",
];

export default function TypingGame() {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [best, setBest] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("typing-best");
    if (saved) setBest(Number(saved));
    reset();
  }, []);

  const reset = () => {
    setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput("");
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setInput(val);

    if (val === sentence) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const words = sentence.split(" ").length;
      const calculated = Math.round(words / elapsed);
      setWpm(calculated);
      setFinished(true);
      if (calculated > best) {
        setBest(calculated);
        localStorage.setItem("typing-best", String(calculated));
      }
    }
  };

  const renderText = () => {
    return sentence.split("").map((char, i) => {
      let className = "text-zinc-500";
      if (i < input.length) {
        className = input[i] === char ? "text-emerald-400" : "text-red-400 bg-red-900/40";
      } else if (i === input.length) {
        className = "text-white border-b-2 border-cyan-400";
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-zinc-950 p-6">
      <h2 className="text-2xl font-bold text-sky-300 mb-1">Speed Type</h2>
      <p className="text-zinc-400 text-sm mb-8">
        {best > 0 ? `Best: ${best} WPM` : "Type the sentence as fast as you can"}
      </p>

      <div className="w-full max-w-md text-center mb-6">
        <p className="text-xl font-mono leading-relaxed tracking-wide">
          {renderText()}
        </p>
      </div>

      {!finished ? (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          className="w-full max-w-md px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-mono focus:outline-none focus:border-sky-500 text-center"
          placeholder="Start typing..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      ) : (
        <div className="text-center">
          <p className="text-5xl font-black text-sky-300">{wpm}</p>
          <p className="text-zinc-400 mt-1">WPM</p>
          <button
            onClick={reset}
            className="mt-6 px-6 py-2 rounded-full bg-sky-600 text-white font-medium hover:bg-sky-500 transition"
          >
            Again
          </button>
        </div>
      )}
    </div>
  );
}
