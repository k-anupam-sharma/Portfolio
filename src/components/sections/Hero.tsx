"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Trophy, Medal } from "@phosphor-icons/react";

const TOTAL_FRAMES = 152;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isNaruto } = useTheme();
  const [activeSection, setActiveSection] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload frames
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

  // Canvas drawing & scrolling
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const theme = isNaruto ? "naruto" : "sasuke";
    const images = imagesRef.current[theme];

    let animationFrameId: number;
    let targetFrame = currentFrame;
    let currentLerpedFrame = currentFrame;

    const render = () => {
      // Lerp frame
      currentLerpedFrame += (targetFrame - currentLerpedFrame) * 0.1;
      
      let frameIndex = Math.round(currentLerpedFrame) - 1;
      if (frameIndex < 0) frameIndex = 0;
      if (frameIndex >= TOTAL_FRAMES) frameIndex = TOTAL_FRAMES - 1;

      setCurrentFrame(frameIndex + 1);

      const img = images[frameIndex];
      if (img && img.complete) {
        // Draw image covering the canvas (object-fit: cover equivalent)
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

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const scrollY = -rect.top;
      
      let progress = scrollY / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));

      // Calculate target frame (1 to TOTAL_FRAMES)
      targetFrame = 1 + progress * (TOTAL_FRAMES - 1);

      // Section calculation
      if (progress < 0.3) setActiveSection(0);
      else if (progress < 0.6) setActiveSection(1);
      else setActiveSection(2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Resize canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded, isNaruto]);

  return (
    <section ref={containerRef} id="hero" className="relative h-[400vh] bg-black">
      {/* Sticky Container for Video & Content */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Canvas Sequence */}
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
            INITIALIZING SEQUENCES...
          </div>
        )}

        {/* Global Tech Gradient Overlay to darken edges */}
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



        {/* CONTENT SECTIONS */}
        <div className="absolute inset-0 z-20 max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 xl:px-10 [text-shadow:0_4px_16px_rgba(0,0,0,1),_0_1px_4px_rgba(0,0,0,0.9)]">
          
          {/* SECTION 1: ABOUT */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${activeSection === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            
            {/* Left Box */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20 w-[85%] sm:w-[80%] md:w-[55%] lg:w-[45%] xl:w-[38%] max-w-[420px] card-surface font-mono overflow-hidden"
              style={{ padding: "clamp(24px, 3vw, 40px)" }}
            >
              <div className="text-[10px] tracking-widest mb-4 lg:mb-6" style={{ color: "var(--accent-primary)" }}>
                01 - INTRODUCTION
              </div>
              <p className="text-lg md:text-xl lg:text-xl xl:text-2xl font-medium mb-6 lg:mb-8 font-sans leading-snug break-words" style={{ color: "white" }}>
                &quot;I am a Software and AR Developer... building the future with AI.&quot;
              </p>
              <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span>Anupam Sharma</span>
                <span>SOFTWARE DEV</span>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-18 flex flex-col items-center">
              <div className="relative group cursor-pointer">
                {/* Electricity effects */}
                <div className="absolute inset-[-6px] rounded-2xl chidori-glow z-0"></div>
                <div className="absolute inset-[-2px] rounded-2xl chidori-lightning z-0"></div>
                
                <img 
                  src="/profile.jpg" 
                  alt="Anupam" 
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-52 xl:h-52 2xl:w-56 2xl:h-56 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10 border-2 border-black/50"
                />
              </div>
              <h2 className="mt-6 lg:mt-8 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-widest uppercase drop-shadow-lg" style={{ color: "var(--accent-primary)" }}>
                Anupam
              </h2>
              <p className="text-xs lg:text-sm text-white/60 max-w-[32ch] lg:max-w-[36ch] xl:max-w-[40ch] text-center font-medium leading-relaxed font-sans mt-3 lg:mt-4">
                {isNaruto 
                  ? "A developer with a ninja way — building AI-first solutions and Augmented Reality experiences that rewrite the rules."
                  : "Shadows and code — engineering precision in the darkness. Specializing in AI-driven architecture and AR."}
              </p>
            </div>

          </div>

          {/* SECTION 2: SKILLS */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${activeSection === 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            
            {/* Left Box */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20 w-[85%] sm:w-[80%] md:w-[55%] lg:w-[45%] xl:w-[38%] max-w-[420px] card-surface font-mono overflow-hidden"
              style={{ padding: "clamp(24px, 3vw, 40px)" }}
            >
              <div className="text-[10px] tracking-widest mb-4 lg:mb-6" style={{ color: "var(--accent-primary)" }}>
                02 - SKILLS
              </div>
              <p className="text-lg md:text-xl lg:text-xl xl:text-2xl font-medium mb-6 lg:mb-8 font-sans leading-snug break-words" style={{ color: "white" }}>
                &quot;Proficient in AI, WebXR, and robust backend architectures.&quot;
              </p>
              <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span>Tech Stack</span>
                <span>SYSTEM ONLINE</span>
              </div>
            </div>

            {/* Right Skills Typography */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-18 text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-6 lg:mb-8">
                <span className="text-white block drop-shadow-lg">Techniques</span>
                <span className="drop-shadow-lg" style={{ color: "var(--accent-primary)" }}>Mastered</span>
              </h1>
              
              <div className="flex flex-col gap-3 lg:gap-4 text-right items-end">
                <div className="flex justify-end gap-2 lg:gap-3 flex-wrap max-w-xs lg:max-w-sm xl:max-w-lg">
                  {["React", "Next.js", "TypeScript", "Node.js", "Python"].map(s => (
                    <span key={s} className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold font-mono tracking-wider uppercase backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_var(--accent-glow)]" style={{ background: "var(--badge-bg)", color: "var(--badge-text)", border: "1px solid var(--badge-border)" }}>{s}</span>
                  ))}
                </div>
                <div className="flex justify-end gap-2 lg:gap-3 flex-wrap max-w-xs lg:max-w-sm xl:max-w-lg">
                  {["TensorFlow", "OpenCV", "AR.js", "Three.js", "Docker"].map(s => (
                    <span key={s} className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold font-mono tracking-wider uppercase backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_var(--accent-glow)]" style={{ background: "var(--badge-bg)", color: "var(--badge-text)", border: "1px solid var(--badge-border)" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 3: VICTORIES */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${activeSection === 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            
            {/* Left Box */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20 w-[85%] sm:w-[80%] md:w-[55%] lg:w-[45%] xl:w-[38%] max-w-[420px] card-surface font-mono overflow-hidden"
              style={{ padding: "clamp(24px, 3vw, 40px)" }}
            >
              <div className="text-[10px] tracking-widest mb-4 lg:mb-6" style={{ color: "var(--accent-primary)" }}>
                03 - ACHIEVEMENTS
              </div>
              <p className="text-lg md:text-xl lg:text-xl xl:text-2xl font-medium mb-6 lg:mb-8 font-sans leading-snug break-words" style={{ color: "white" }}>
                &quot;Conquering challenges and dominating hackathons across the nation.&quot;
              </p>
              <div className="flex justify-between text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span>Honor Roll</span>
                <span>VERIFIED</span>
              </div>
            </div>

            {/* Right Victories */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-18 text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-6 lg:mb-8 xl:mb-10">
                <span className="text-white block drop-shadow-lg">Battle</span>
                <span className="drop-shadow-lg" style={{ color: "var(--accent-primary)" }}>Victories</span>
              </h1>
              
              <div className="flex flex-col gap-4 lg:gap-5 xl:gap-6 items-end text-right">
                <div className="flex flex-col items-end border-r-2 pr-4 lg:pr-6 py-1" style={{ borderColor: "var(--accent-primary)" }}>
                  <div className="flex items-center gap-2">
                    <Trophy weight="fill" className="text-yellow-400 drop-shadow-md shrink-0" size={20} />
                    <span className="text-white font-bold text-base lg:text-lg xl:text-xl drop-shadow-md">1st Place — Virtuovation AR Hackathon</span>
                  </div>
                  <span className="text-white/70 text-[10px] lg:text-xs tracking-widest font-mono mt-1.5 lg:mt-2">BNM INSTITUTE OF TECHNOLOGY</span>
                </div>
                <div className="flex flex-col items-end border-r-2 pr-4 lg:pr-6 py-1 border-white/20">
                  <div className="flex items-center gap-2">
                    <Trophy weight="fill" className="text-yellow-400 drop-shadow-md shrink-0" size={18} />
                    <span className="text-white font-bold text-sm lg:text-base xl:text-lg drop-shadow-md">1st Place — GenBLAZE Hackathon</span>
                  </div>
                  <span className="text-white/70 text-[10px] lg:text-xs tracking-widest font-mono mt-1.5 lg:mt-2">AMC ENGINEERING COLLEGE</span>
                </div>
                <div className="flex flex-col items-end border-r-2 pr-4 lg:pr-6 py-1 border-white/20">
                  <div className="flex items-center gap-2">
                    <Medal weight="fill" className="text-gray-300 drop-shadow-md shrink-0" size={18} />
                    <span className="text-white font-bold text-sm lg:text-base xl:text-lg drop-shadow-md">4th Place — National Innovation Project</span>
                  </div>
                  <span className="text-white/70 text-[10px] lg:text-xs tracking-widest font-mono mt-1.5 lg:mt-2">DAYANANDA SAGAR PU COLLEGE</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
