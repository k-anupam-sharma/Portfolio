"use client";

import { useTheme } from "@/context/ThemeContext";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { GraduationCap, Certificate, Books, ShieldCheck, Code, Globe, Medal, Desktop } from "@phosphor-icons/react";

const education = [
  {
    title: "B.E. in Computer Science (AIML)",
    org: "AMC Engineering College",
    date: "2024 - 2028 (Ongoing)",
    desc: "Specialization in Artificial Intelligence and Machine Learning, CGPA: 7.69",
    icon: GraduationCap,
  },
  {
    title: "12th Grade (PCMC)",
    org: "Dayananda Sagar PU College",
    date: "2020 - 2022",
    desc: "Percentage: 80%",
    icon: Books,
  },
  {
    title: "10th Grade (ICSE)",
    org: "Baldwin Boys' High School",
    date: "2008 - 2020",
    desc: "Percentage: 91%",
    icon: Books,
  }
];

const certifications = [
  { title: "Oracle CI 2025 AI Foundations", org: "Oracle Learning", date: "Oct 2025", icon: Certificate },
  { title: "Elite Ethical Hacking", org: "NPTEL (IIT Kharagpur)", date: "Oct 2025", icon: ShieldCheck },
  { title: "Full Stack Web Development", org: "NoviTech R&D", date: "Sep 2025", icon: Code },
  { title: "Digital Marketing Fundamentals", org: "IIDE", date: "Aug 2025", icon: Globe },
  { title: "Autonomous Systems", org: "RoboLearnIndia", date: "Jul 2025", icon: Medal },
  { title: "Future Forward: AI for Innovation", org: "IBM SkillsBuild", date: "Jul 2026", icon: Certificate },
  { title: "Cybersecurity Certification", org: "Great Learning", date: "Oct 2024", icon: ShieldCheck },
  { title: "Cisco OS Support", org: "Cisco Networking", date: "Dec 2025", icon: Desktop },
];

export default function Education() {
  const { isNaruto } = useTheme();

  return (
    <>
      <section 
        id="education" 
        className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden flex flex-col items-center w-full"
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
              Education
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        {/* Education Grid */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 items-stretch justify-items-center w-full relative z-10">
          {education.map((edu, i) => (
            <AnimatedItem key={i} delay={i * 0.1} className="w-full h-full flex">
              <div 
                className="card-surface flex flex-col items-center text-center gap-6 lg:gap-8 w-full max-w-[420px] mx-auto h-full"
                style={{ justifyContent: "center", padding: "clamp(1.5rem, 3vw, 3rem)" }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border" style={{ borderColor: "var(--accent-primary)", background: "var(--badge-bg)", color: "var(--accent-primary)" }}>
                  <edu.icon size={32} weight="fill" />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2 drop-shadow-md" style={{ color: "var(--text-primary)" }}>{edu.title}</h3>
                  <p className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: "var(--text-secondary)" }}>{edu.org}</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--accent-primary)" }}>{edu.date}</p>
                </div>
                <p className="leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>{edu.desc}</p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
        <div style={{ height: "64px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />
      </div>
      </section>
    

      {/* Certifications Section */}
      <section 
        id="certifications" 
        className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden flex flex-col items-center w-full"
        style={{ background: "var(--section-bg)" }}
      >
        <div className="pattern-overlay" />
        <div className="mx-auto max-w-[1200px] relative z-10 w-full">
          {/* EXPLICIT SPACERS (136px top + 64px bottom = 200px gap) */}
          <div style={{ height: "136px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />
          
          <AnimatedSection className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full -mb-16 md:-mb-20 lg:-mb-28 relative z-0 text-center">
            <AnimatedItem>
              <h2 
                className="mt-6 text-[11vw] sm:text-[9vw] md:text-8xl lg:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-tighter uppercase mb-0 whitespace-nowrap opacity-50" 
                style={{ color: "var(--text-primary)", lineHeight: 0.85 }}
              >
                Certifications
              </h2>
            </AnimatedItem>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-6 items-stretch justify-items-center w-full relative z-10">
            {certifications.map((cert, i) => (
              <AnimatedItem key={i} delay={i * 0.05} className="w-full h-full flex">
                <div 
                  className="card-surface flex flex-col items-center text-center gap-4 lg:gap-6 w-full max-w-[360px] mx-auto h-full"
                  style={{ justifyContent: "center", padding: "clamp(1.5rem, 2.5vw, 3rem)" }}
                >
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <cert.icon size={28} weight="fill" style={{ color: "var(--accent-primary)" }} />
                    <span className="text-xs font-mono tracking-widest" style={{ color: "var(--accent-primary)" }}>{cert.date}</span>
                  </div>
                  <h4 className="text-base lg:text-lg font-bold leading-tight drop-shadow-md" style={{ color: "var(--text-primary)" }}>{cert.title}</h4>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>{cert.org}</p>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
        <div style={{ height: "64px" }} className="w-full flex-shrink-0 block" aria-hidden="true" />
      </div>
    </section>
    </>
  );
}
