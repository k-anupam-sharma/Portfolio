"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { isNaruto } = useTheme();

  return (
    <footer
      className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 lg:py-12 w-full flex flex-col items-center"
      style={{
        background: isNaruto ? "#1a0a00" : "#050510",
        borderTop: `1px solid ${
          isNaruto ? "rgba(255,107,0,0.15)" : "rgba(124,58,237,0.15)"
        }`,
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Exact same grid structure as Contact.tsx to match alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center w-full">
          {/* Logo - Centered under Card 1 */}
          <div className="flex items-center gap-2 justify-center w-full">
            <span className="text-2xl flex items-center leading-none">{isNaruto ? "🍥" : "⚡"}</span>
            <span className="text-xl font-bold tracking-tight text-white flex items-center leading-none mt-1">
              Anupam
              <span
                style={{
                  background: "var(--accent-gradient-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                .dev
              </span>
            </span>
          </div>

          {/* Quote - Centered under Card 2 */}
          <div className="flex items-center justify-center w-full">
            <p
              className="text-sm italic text-center max-w-[40ch] m-0 leading-relaxed"
              style={{
                color: isNaruto
                  ? "rgba(255,179,71,0.6)"
                  : "rgba(167,139,250,0.6)",
              }}
            >
              {isNaruto
                ? '"I\'m not gonna run away, I never go back on my word! That\'s my nindo: my ninja way!" — Naruto Uzumaki'
                : '"I have long since closed my eyes... My only goal is in the darkness." — Sasuke Uchiha'}
            </p>
          </div>

          {/* Location - Centered under Card 3 */}
          <div className="flex items-center gap-2 justify-center w-full text-sm font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
             <span className="text-xl flex items-center leading-none">📍</span>
             <span className="flex items-center leading-none mt-1">Bengaluru, India</span>
          </div>
        </div>

        <div className="kunai-divider mt-12 mb-6" />

        <p className="text-center text-xs text-white/30">
          © {new Date().getFullYear()} Anupam Sharma. All rights reserved.{" "}
          {isNaruto ? "Dattebayo! 🍥" : "⚡"}
        </p>
      </div>
    </footer>
  );
}
