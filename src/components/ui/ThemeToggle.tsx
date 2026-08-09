"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme, isNaruto } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isNaruto ? "Sasuke" : "Naruto"} theme`}
      title={`Switch to ${isNaruto ? "Sasuke (Dark)" : "Naruto (Light)"} mode`}
    >
      <div className={`theme-toggle-knob ${theme}`}>
        {isNaruto ? "🌀" : "👁️"}
      </div>
      <span
        style={{
          position: "absolute",
          right: isNaruto ? 12 : "auto",
          left: isNaruto ? "auto" : 12,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "14px",
          opacity: 0.6,
        }}
      >
        {isNaruto ? "👁️" : "🌀"}
      </span>
    </motion.button>
  );
}
