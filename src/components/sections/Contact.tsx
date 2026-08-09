"use client";

import { useTheme } from "@/context/ThemeContext";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export default function Contact() {
  const { isNaruto } = useTheme();

  return (
    <section
      id="contact"
      className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 flex flex-col items-center w-full"
      style={{ background: "var(--background)" }}
    >
      <div className="pattern-overlay" />
      <div className="mx-auto max-w-[1200px] relative z-10 w-full">
        {/* EXPLICIT 200px SPACER */}
        <div style={{ height: "200px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />

        <AnimatedSection className="text-center flex flex-col items-center w-full -mb-16 md:-mb-20 lg:-mb-28 relative z-0">
          <AnimatedItem>
            <h2
              className="mt-6 text-[11vw] sm:text-[9vw] md:text-8xl lg:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-tighter uppercase mb-0 whitespace-nowrap opacity-50"
              style={{ color: "var(--text-primary)", lineHeight: 0.85 }}
            >
              Let's Connect
            </h2>
          </AnimatedItem>

          <AnimatedItem className="relative z-20 mt-12 mb-8">
            <p
              className="text-lg max-w-[48ch] text-center leading-relaxed drop-shadow-md"
              style={{ color: "var(--text-secondary)" }}
            >
              {isNaruto

              }
            </p>
          </AnimatedItem>
        </AnimatedSection>
        <AnimatedSection className="flex flex-col items-center w-full">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 max-w-[1200px] mx-auto items-stretch justify-items-center w-full relative z-10">
            <AnimatedItem className="w-full h-full flex">
              <motion.a
                href="mailto:kanupsharmaprofessional@gmail.com"
                className="card-surface flex flex-col items-center text-center w-full max-w-[420px] mx-auto h-full gap-6 lg:gap-8"
                style={{ justifyContent: "center", padding: "clamp(1.5rem, 3vw, 3rem)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 lg:mb-6" style={{ color: "var(--accent-primary)" }}>
                  <EnvelopeSimple weight="fill" size={48} className="lg:hidden" />
                  <EnvelopeSimple weight="fill" size={64} className="hidden lg:block" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email
                </h3>
                <p
                  className="mt-4 text-sm break-all font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  kanupsharmaprofessional@gmail.com
                </p>
              </motion.a>
            </AnimatedItem>

            <AnimatedItem className="w-full h-full flex">
              <motion.a
                href="https://github.com/k-anupam-sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface flex flex-col items-center text-center w-full max-w-[420px] mx-auto h-full gap-6 lg:gap-8"
                style={{ justifyContent: "center", padding: "clamp(1.5rem, 3vw, 3rem)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 lg:mb-6" style={{ color: "var(--accent-primary)" }}>
                  <GithubLogo weight="fill" size={48} className="lg:hidden" />
                  <GithubLogo weight="fill" size={64} className="hidden lg:block" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  GitHub
                </h3>
                <p
                  className="mt-4 text-sm font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  k-anupam-sharma
                </p>
              </motion.a>
            </AnimatedItem>

            <AnimatedItem className="w-full h-full flex">
              <motion.a
                href="https://linkedin.com/in/kamakhya-anupam-sharma"
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface flex flex-col items-center text-center w-full max-w-[420px] mx-auto h-full gap-6 lg:gap-8"
                style={{ justifyContent: "center", padding: "clamp(1.5rem, 3vw, 3rem)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 lg:mb-6" style={{ color: "var(--accent-primary)" }}>
                  <LinkedinLogo weight="fill" size={48} className="lg:hidden" />
                  <LinkedinLogo weight="fill" size={64} className="hidden lg:block" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  LinkedIn
                </h3>
                <p
                  className="mt-4 text-sm font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  kamakhya-anupam-sharma
                </p>
              </motion.a>
            </AnimatedItem>
          </div>


          {/* EXPLICIT 100px SPACER BEFORE FOOTER */}
          <div style={{ height: "100px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />
        </AnimatedSection>
      </div>
    </section>
  );
}
