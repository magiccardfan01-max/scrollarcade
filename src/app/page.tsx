"use client";

import Intro from "@/components/Intro";
import ReactionGame from "@/components/games/ReactionGame";
import ClickerGame from "@/components/games/ClickerGame";
import MemoryGame from "@/components/games/MemoryGame";
import SequenceGame from "@/components/games/SequenceGame";
import VibeSelector from "@/components/games/VibeSelector";
import TypingGame from "@/components/games/TypingGame";

const SECTIONS = [
  { id: "intro", component: Intro },
  { id: "reaction", component: ReactionGame },
  { id: "clicker", component: ClickerGame },
  { id: "memory", component: MemoryGame },
  { id: "sequence", component: SequenceGame },
  { id: "vibe", component: VibeSelector },
  { id: "typing", component: TypingGame },
];

export default function Home() {
  return (
    <main className="snap-container">
      {SECTIONS.map(({ id, component: Comp }) => (
        <section key={id} className="snap-section" id={id}>
          <Comp />
        </section>
      ))}

      {/* End / loop hint */}
      <section className="snap-section bg-zinc-950">
        <div className="text-center px-6">
          <h2 className="text-3xl font-bold mb-3 text-violet-300">That&apos;s the loop</h2>
          <p className="text-zinc-400 mb-6 max-w-sm mx-auto">
            Scroll back up and try to beat your scores. Or just keep the dopamine flowing.
          </p>
          <a
            href="#intro"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition"
          >
            Back to top
          </a>
          <p className="mt-10 text-xs text-zinc-600">
            ScrollArcade · Inspired by the idea of TikTok for vibecoded minigames
          </p>
        </div>
      </section>
    </main>
  );
}
