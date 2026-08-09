# Kamakhya Anupam Sharma - Professional Portfolio

![Portfolio Overview](https://img.shields.io/badge/Status-Active-brightgreen.svg) ![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-blue?logo=react) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC?logo=tailwind-css)

Hey there! Welcome to the source code for my **Professional Portfolio**. 

I built this project to act as a highly interactive, performance-optimized and aesthetically premium showcase of my projects, academic records, credentials and contact information with theme being the 2000s Japanese anime - Naruto. I wanted my portfolio to feel more like a digital experience than a standard, static resume.

## 🌟 Core Features

- **Dual-Themed Environment (Naruto / Sasuke):** I built a fully dynamic context-based theme system that switches between two distinct UI aesthetics, overriding global colors, gradients and typography dynamically depending on which path you choose.
- **Advanced Glassmorphism UI:** I designed premium HUD-style components using heavily curated `backdrop-filter` utility chains, layered over dynamic particle and starfield canvases.
- **Massive Watermark Typography:** I implemented a symmetrical grid architecture using negative margins and z-indexing to layer glassmorphic components over giant, screen-spanning typography (`text-[11vw]`).
- **Scroll-Linked Animations:** The site leverages `framer-motion` and `requestAnimationFrame` for seamless, native-feeling parallax and scroll-bound state changes as you explore my work.
- **Robust Layout Grid System:** I meticulously enforced a `1200px` max-width architecture to ensure uniform padding, precise alignment and scalable content layout across all devices from mobile up to ultra-wide displays.

## 🛠 Tech Stack I Used

- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS + Custom CSS (`globals.css`)
- **Animation:** Framer Motion
- **Icons:** Phosphor Icons
- **Language:** TypeScript

## 📂 Project Structure

Here is a quick overview of how I structured the application:

```text
site/
├── src/
│   ├── app/
│   │   ├── globals.css      # Core CSS tokens, glassmorphism utilities and animations
│   │   ├── layout.tsx       # Root layout and theme provider wrapper
│   │   └── page.tsx         # Main entry point importing all sections
│   ├── components/
│   │   ├── ui/              # Reusable base components (AnimatedSection, etc.)
│   │   └── sections/        # Main layout modules
│   │       ├── Hero.tsx         # Hero section with animated canvas
│   │       ├── Projects.tsx     # Completed Missions with HUD interface
│   │       ├── MoreProjects.tsx # Additional projects grid
│   │       ├── Education.tsx    # Academic records & certifications
│   │       ├── Contact.tsx      # Let's Connect cards
│   │       └── Footer.tsx       # Symmetrical 3-column footer
│   └── context/
│       └── ThemeContext.tsx # Global state for Naruto/Sasuke theme toggle
```

## 🚀 Getting Started

If you want to run my code locally, just ensure you have Node.js installed, then follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/k-anupam-sharma/Portfolio.git
   cd Portfolio/site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Design Philosophy

When I started building this, my goal was to construct a digital experience rather than a static resume. The architecture I designed relies heavily on:
- **Symmetry & Alignment:** All major sections share a synchronized `max-w-[1200px]` strict alignment box.
- **Z-Index Layering:** Elements are carefully layered with foreground interactive components (cards) overlapping massive, faded background labels.
- **Consistent Rhythm:** Hard-coded spatial dividers ensure exactly `200px` of breathing room between all major logical blocks, preventing layout drift.

## 📝 License

Designed and developed by me, Kamakhya Anupam Sharma. All rights reserved.
