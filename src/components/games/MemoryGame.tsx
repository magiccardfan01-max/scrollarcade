"use client";

import { useState, useEffect, useCallback } from "react";

const EMOJIS = ["🎮", "🚀", "⚡", "🔥", "💎", "🌟", "🎯", "👾"];

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [best, setBest] = useState<number | null>(null);

  const init = useCallback(() => {
    const pairs = EMOJIS.slice(0, 6);
    const deck = [...pairs, ...pairs]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setWon(false);
  }, []);

  useEffect(() => {
    init();
    const saved = localStorage.getItem("memory-best");
    if (saved) setBest(Number(saved));
  }, [init]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      setMoves((m) => m + 1);
      if (cards[a].emoji === cards[b].emoji) {
        setCards((prev) =>
          prev.map((c, i) =>
            i === a || i === b ? { ...c, matched: true } : c
          )
        );
        setFlipped([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, flipped: false } : c
            )
          );
          setFlipped([]);
        }, 700);
      }
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setWon(true);
      if (best === null || moves < best) {
        setBest(moves);
        localStorage.setItem("memory-best", String(moves));
      }
    }
  }, [cards, moves, best]);

  const flip = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched)
      return;
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
    setFlipped((f) => [...f, index]);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-zinc-950 to-purple-950 p-4">
      <h2 className="text-2xl font-bold text-indigo-300 mb-1">Memory Match</h2>
      <p className="text-zinc-400 text-sm mb-4">
        Moves: {moves} {best !== null && `· Best: ${best}`}
      </p>
      <div className="grid grid-cols-3 gap-3 max-w-xs w-full">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => flip(i)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${
              card.flipped || card.matched
                ? "bg-indigo-600/40 border border-indigo-400/50 scale-105"
                : "bg-zinc-800 border border-zinc-700 hover:border-indigo-500/50"
            }`}
          >
            {(card.flipped || card.matched) && card.emoji}
          </button>
        ))}
      </div>
      {won && (
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold text-emerald-400">You won! 🎉</p>
          <button
            onClick={init}
            className="mt-3 px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
          >
            Play again
          </button>
        </div>
      )}
      {!won && (
        <button
          onClick={init}
          className="mt-6 text-sm text-zinc-500 hover:text-zinc-300"
        >
          Restart
        </button>
      )}
    </div>
  );
}
