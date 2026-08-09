"use client";

import { useTheme } from "@/context/ThemeContext";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Trophy, Medal, MapPin, Detective, Drop, MagnifyingGlass, ChartLineUp, Lightbulb, Target, RocketLaunch, GraduationCap, Certificate } from "@phosphor-icons/react";

const moreProjects = [
  {
    title: "VibeFinder",
    subtitle: "Discover places that match your vibe",
    description:
      "Map-driven place discovery web app for Bangalore with category filters, budget controls, and live turn-by-turn directions powered by open-source geospatial APIs.",
    tags: ["OpenStreetMap", "OSRM", "Geospatial", "Web"],
    icon: MapPin,
  },
  {
    title: "Imposter",
    subtitle: "Cross-Platform Social Deduction Game",
    description:
      "Free-to-use alternative to 'Imposter: Who is the Spy' with all core features unlocked, built with Expo Go for seamless cross-platform multiplayer.",
    tags: ["Expo Go", "React Native", "Game Dev"],
    icon: Detective,
  },
  {
    title: "BloodBuddy",
    subtitle: "Smart Blood Donation Management",
    description:
      "Healthcare platform bridging blood donors and recipients with real-time availability tracking, emergency alerts, and secure authentication.",
    tags: ["Healthcare", "Real-time", "Full-Stack"],
    icon: Drop,
  },
  {
    title: "AnomalAI",
    subtitle: "AI Anomaly Detection in Server Logs",
    description:
      "AI-driven anomaly detection using Isolation Forest to detect brute-force attempts and abnormal access patterns with locally deployed Llama 3.",
    tags: ["ML", "Security", "Llama 3", "Ollama"],
    icon: MagnifyingGlass,
  },
  {
    title: "SME Growth Advisor",
    subtitle: "AI-powered Financial Growth Advisor",
    description:
      "AI Growth Advisor web application using Gemma to generate data-driven growth recommendations for small and medium enterprises.",
    tags: ["Gemma", "AI", "Full-Stack", "Finance"],
    icon: ChartLineUp,
  },
  {
    title: "Smart Home Dimmer",
    subtitle: "IoT Lighting Control",
    description:
      "IoT-based lighting control system using Arduino Uno with remote operation through mobile app, controlling LED brightness wirelessly.",
    tags: ["IoT", "Arduino", "Mobile App"],
    icon: Lightbulb,
  },
];

export default function MoreProjects() {
  const { isNaruto } = useTheme();

  return (
    <section
      id="experience"
      className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 flex flex-col items-center w-full"
      style={{ background: "var(--section-bg)" }}
    >
      <div className="pattern-overlay" />
      <div className="mx-auto max-w-[1200px] relative z-10 w-full">
        {/* EXPLICIT SPACERS (136px top + 64px bottom = 200px gap) */}
        <div style={{ height: "136px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />
        
        <AnimatedSection className="text-center flex flex-col items-center w-full -mb-16 md:-mb-20 lg:-mb-28 relative z-0">
          <AnimatedItem>
            <h2
              className="mt-6 text-[11vw] sm:text-[9vw] md:text-8xl lg:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-tighter uppercase mb-0 whitespace-nowrap opacity-50"
              style={{ color: "var(--text-primary)", lineHeight: 0.85 }}
            >
              More Projects
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 items-stretch justify-items-center w-full relative z-10">
          {moreProjects.map((project, i) => (
            <AnimatedItem key={i} className="w-full h-full flex">
              <div 
                className="card-surface flex flex-col items-center text-center gap-6 lg:gap-8 w-full max-w-[450px] mx-auto h-full"
                style={{ justifyContent: "center", padding: "clamp(1.5rem, 3vw, 3rem)" }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-4xl lg:text-5xl" style={{ color: "var(--accent-primary)" }}>
                    {project.icon && <project.icon weight="fill" />}
                  </div>
                  <span
                    className="text-base font-bold tracking-wider mt-4"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    #{String(i + 6).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="text-xl lg:text-2xl font-black tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm font-semibold mt-3"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {project.subtitle}
                </p>
                <p
                  className="mt-4 lg:mt-6 text-sm lg:text-base leading-relaxed max-w-[32ch]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>
                <div className="mt-6 lg:mt-8 flex flex-wrap justify-center gap-2 lg:gap-3">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="skill-tag text-xs font-bold px-4 py-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
        <div style={{ height: "64px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />
      </div>
    </section>
  );
}
