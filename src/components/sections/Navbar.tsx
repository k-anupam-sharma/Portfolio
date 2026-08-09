"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "HOME", href: "#hero" },
  { label: "PROJECTS", href: "#projects" },
  { label: "EDUCATION", href: "#education" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const { isNaruto } = useTheme();
  const [isPastDarkSection, setIsPastDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero (400vh) + Projects (500vh) = 900vh
      const darkHeight = window.innerHeight * 8.8;
      setIsPastDarkSection(window.scrollY > darkHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-4 pb-12 pointer-events-none"
      >
        <div 
          className="absolute inset-0 -z-10 backdrop-blur-md bg-black/10"
          style={{ WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
        />
        <div className="mx-auto flex items-center justify-between w-full uppercase tracking-[0.15em] lg:tracking-[0.2em] pointer-events-auto mt-2">
          {/* Spacer for Flexbox alignment */}
          <div className="w-8 md:w-16 lg:w-24" />

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-12 transition-colors duration-500">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs lg:text-sm font-bold hover:opacity-100 opacity-80 transition-opacity drop-shadow-md"
                style={{ color: isPastDarkSection ? "var(--text-primary)" : "white" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6 mr-8 mt-4 md:mr-12 md:mt-6">
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>
    </>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[60]"
      style={{
        width: `${progress}%`,
        background: "var(--accent-primary)",
        boxShadow: "0 0 10px var(--accent-primary)"
      }}
    />
  );
}
