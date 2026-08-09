"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";

const TOTAL_FRAMES = 152;

const projects = [
  {
    title: "aidAR",
    subtitle: "AR + AI Medical System",
    description: "Next-gen medical education platform with AR modules, conversational AI diagnostic engine, and interactive 3D anatomical models for life-saving procedure training.",
    tags: ["AR", "AI", "Unity", "Medical"],
    show: 0.04,
    hide: 0.18,
  },
  {
    title: "plattAR",
    subtitle: "3D Smart AR Menu",
    description: "Scalable AR restaurant menu with Node.js/Express backend, React Native dashboard, and WebXR integration for photorealistic food models anchored on tables.",
    tags: ["WebXR", "Node.js", "React Native", "Blender"],
    show: 0.20,
    hide: 0.34,
  },
  {
    title: "Codinger",
    subtitle: "AI-Powered Coding Mentor",
    description: "Browser-based coding platform with AI mentor (Hindsight) supporting 10 languages, live complexity analysis, collaborative mode, and progress dashboard.",
    tags: ["AI", "JavaScript", "Full-Stack"],
    show: 0.36,
    hide: 0.50,
  },
  {
    title: "Smart BlindStick",
    subtitle: "IoT Assistive Technology",
    description: "Raspberry Pi 4-powered smart stick with IMU tilt detection, GPS tracking, voice guidance, and automated Telegram emergency alerts with live location.",
    tags: ["IoT", "Raspberry Pi", "Python", "GPS"],
    show: 0.52,
    hide: 0.66,
  },
  {
    title: "VidhiAI",
    subtitle: "AI Legal Assistant",
    description: "RAG-based legal chatbot using LangChain + ChromaDB with locally-deployed Llama 3, providing citation-backed Indian constitutional law explanations.",
    tags: ["RAG", "LangChain", "Llama 3", "Flask"],
    show: 0.68,
    hide: 0.82,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);
  
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [ctaVisible, setCtaVisible] = useState(false);
  const { isNaruto } = useTheme();

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const targetFrameRef = useRef(1);

  const imagesRef = useRef<{ [key: string]: HTMLImageElement[] }>({
    naruto: [],
    sasuke: []
  });

  useEffect(() => {
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES * 2;
    
    const loadTheme = (theme: "naruto" | "sasuke") => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(4, "0");
        img.src = `/${theme}_frames/frame_${paddedIndex}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalToLoad) setImagesLoaded(true);
        };
        imagesRef.current[theme][i - 1] = img;
      }
    };

    loadTheme("naruto");
    loadTheme("sasuke");
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const theme = isNaruto ? "naruto" : "sasuke";
    const images = imagesRef.current[theme];
    let animationFrameId: number;
    let currentLerpedFrame = currentFrame;

    const render = () => {
      currentLerpedFrame += (targetFrameRef.current - currentLerpedFrame) * 0.1;
      let frameIndex = Math.round(currentLerpedFrame) - 1;
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= TOTAL_FRAMES) frameIndex = TOTAL_FRAMES - 1;

      setCurrentFrame(frameIndex + 1);

      const img = images[frameIndex];
      if (img && img.complete) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, isNaruto]);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) {
        tickingRef.current = false;
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const scrollY = -rect.top;
      let progress = scrollY / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));

      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);

      if (introRef.current) {
        introRef.current.style.opacity = progress < 0.03 ? "1" : "0";
        introRef.current.style.pointerEvents = progress < 0.03 ? "auto" : "none";
      }

      const newVisible = new Set<number>();
      projects.forEach((proj, idx) => {
        if (progress >= proj.show && progress <= proj.hide) {
          newVisible.add(idx);
        }
      });
      setVisibleCards((prev) => {
        if (prev.size !== newVisible.size) return newVisible;
        const prevArray = Array.from(prev);
        const newArray = Array.from(newVisible);
        for (let i = 0; i < prevArray.length; i++) {
          if (prevArray[i] !== newArray[i]) return newVisible;
        }
        return prev;
      });

      setCtaVisible(progress > 0.85);
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-1000"
          style={{ 
            filter: "contrast(1.1) saturate(1.2)",
            background: "#000"
          }}
        />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50 text-white font-mono tracking-widest text-sm">
            LOADING ASSETS...
          </div>
        )}

        {/* Global Dark Gradient */}
        {!isNaruto ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
          </>
        )}



        {/* Intro Text */}
        <div
          ref={introRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center transition-opacity duration-700 font-mono [text-shadow:0_4px_16px_rgba(0,0,0,1),_0_1px_4px_rgba(0,0,0,0.9)]"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white uppercase drop-shadow-md font-sans">
            Completed <span style={{ color: "var(--accent-primary)" }}>Missions</span>
          </h2>
        </div>

        {/* Project Cards (HUD Style) */}
        {projects.map((project, i) => (
          <div
            key={i}
            className={`absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-500 w-[90%] sm:w-[85%] md:w-[60%] lg:w-[50%] xl:w-[45%] max-w-[500px] ${
              i % 2 === 0
                ? "left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20"
                : "right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20"
            } ${
              visibleCards.has(i)
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div 
              className="card-surface font-mono relative overflow-hidden break-words [text-shadow:0_4px_16px_rgba(0,0,0,1),_0_1px_4px_rgba(0,0,0,0.9)] transition-all duration-700"
              style={{ 
                padding: "clamp(24px, 3vw, 40px)", 
                backdropFilter: visibleCards.has(i) ? "blur(24px) saturate(200%)" : "blur(0px) saturate(100%)",
                WebkitBackdropFilter: visibleCards.has(i) ? "blur(24px) saturate(200%)" : "blur(0px) saturate(100%)" 
              }}
            >
              {/* HUD scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] animate-scan pointer-events-none opacity-30" />
              
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <span className="text-[10px] lg:text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Mission <span style={{ color: "var(--accent-primary)" }}>#{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "white", boxShadow: "0 0 8px white" }} />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold tracking-tighter mb-3 lg:mb-4 font-sans drop-shadow-md" style={{ color: "white" }}>
                {project.title}
              </h3>
              <p className="text-xs lg:text-sm tracking-widest mb-4 lg:mb-6 font-semibold uppercase" style={{ color: "var(--accent-primary)" }}>
                {project.subtitle}
              </p>
              <p className="text-xs lg:text-sm leading-loose mb-6 lg:mb-8 font-sans" style={{ color: "rgba(255,255,255,0.8)" }}>
                "{project.description}"
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md"
                    style={{ border: "1px solid var(--badge-border)", background: "var(--badge-bg)", color: "var(--badge-text)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* CTA at the end */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-700 ${
            ctaVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          } bg-black/60 backdrop-blur-sm`}
        >
          <div className="text-center px-6 font-mono text-white flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-sans drop-shadow-md text-center">
              {isNaruto
                ? "Ready for the next mission?"
                : "Shall we begin?"}
            </h3>
            <p className="mt-6 lg:mt-8 text-[10px] lg:text-xs tracking-[0.2em] text-center uppercase max-w-[36ch] lg:max-w-[40ch] mx-auto leading-loose text-white/70">
              These are just some highlights. Scroll further to explore the archives.
            </p>
            <a 
              href="#more-projects" 
              className="mt-8 lg:mt-12 inline-flex items-center justify-center gap-3 accent-btn uppercase tracking-widest text-xs lg:text-sm"
            >
              CONTINUE <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
