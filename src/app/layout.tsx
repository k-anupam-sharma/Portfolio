import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Anupam Sharma — Software & AR Developer | Portfolio",
  description:
    "Portfolio of Anupam Sharma — a Software and AR Developer, 2x hackathon winner, specializing in AI-first and augmented reality solutions. CSE-AIML student at AMC Engineering College, Bengaluru.",
  keywords: [
    "Anupam Sharma",
    "Software Developer",
    "AR Developer",
    "AI",
    "Machine Learning",
    "Augmented Reality",
    "Portfolio",
    "Bengaluru",
  ],
  openGraph: {
    title: "Anupam Sharma — Software & AR Developer",
    description:
      "2x hackathon winner building secure, AI-first and AR solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
