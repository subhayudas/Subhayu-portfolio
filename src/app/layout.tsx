import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import ActivityBar from "@/components/ActivityBar";
import TabsContainer from "@/components/TabContainer";
import NavigationChange from "@/components/NavigationChange";
import { sections } from "./page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Subhayu Das - Portfolio",
  description:
    "Software Developer specializing in Full Stack Development, AI/ML, and Computer Vision. Explore my innovative projects and technical expertise.",
  keywords: [
    "Subhayu Das",
    "Software Developer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Computer Vision",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "TensorFlow",
    "Portfolio",
  ],
  authors: [{ name: "Subhayu Das" }],
  creator: "Subhayu Das",
  publisher: "Subhayu Das",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subhayudas.com", // Replace with your actual domain
    title: "Subhayu Das - Software Developer Portfolio",
    description:
      "Software Developer specializing in Full Stack Development, AI/ML, and Computer Vision. Explore my innovative projects and technical expertise.",
    siteName: "Subhayu Das Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhayu Das - Software Developer Portfolio",
    description:
      "Software Developer specializing in Full Stack Development, AI/ML, and Computer Vision.",
    creator: "@your-twitter-handle", // Replace with your Twitter handle
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export interface MyWork {
  title: string;
  description: string;
  url: string;
  pathname: string;
  href: string;
  framework: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainSection = {
    "/": sections,
  };

  const myWork: MyWork[] = [
    {
      title: "Movie-Sentiment-Predictor.tsx",
      description:
        "A scalable movie review sentiment detector built with React.js frontend and Python Flask backend, using TensorFlow, Keras, and LSTM models to rate reviews and predict emotions.",
      url: "#",
      pathname: "/apps/movie-sentiment-predictor",
      href: "/apps/movie-sentiment-predictor",
      framework: "react",
    },
    {
      title: "AI-Border-Surveillance.tsx",
      description:
        "Complete AI-powered border surveillance system using Next.js frontend and Python Flask backend with TensorFlow, Keras, OpenCV (YOLO V8), and SAM for detecting intruders, drones, weapons, and face recognition.",
      url: "#",
      pathname: "/apps/ai-border-surveillance",
      href: "/apps/ai-border-surveillance",
      framework: "react",
    },
    {
      title: "AFK-Detector.tsx",
      description:
        "AI model using Reinforcement Learning and Computer Vision to detect employee activity through camera monitoring, built with React+TypeScript frontend and Python backend with Raspberry Pi and Arduino integration.",
      url: "#",
      pathname: "/apps/afk-detector",
      href: "/apps/afk-detector",
      framework: "react",
    },
    {
      title: "Notibit.tsx",
      description:
        "A collaborative study platform where users can upload and download study notes, built with React + TypeScript, Three.js, Node.js, and Supabase.",
      url: "#",
      pathname: "/apps/notibit",
      href: "/apps/notibit",
      framework: "react",
    },
    {
      title: "IEEE-Website.tsx",
      description:
        "Animated website for coding club with complete backend API handling 1k+ requests per day, built with Next.js + TypeScript, Node.js, PostgreSQL, Prisma, Three.js, and GSAP.",
      url: "#",
      pathname: "/apps/ieee-website",
      href: "/apps/ieee-website",
      framework: "react",
    },
    {
      title: "Apped-me.tsx",
      description:
        "Animated agency website for app launching services on Play Store, built with Next.js, Node.js, and Three.js with modern animations and user experience.",
      url: "#",
      pathname: "/apps/apped-me",
      href: "/apps/apped-me",
      framework: "react",
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark_bg min-h-screen max-h-screen flex flex-col scroll-smooth`}
      >
        <TopBar />
        <main className="flex-1 flex overflow-hidden relative">
          <ActivityBar sections={mainSection} myWork={myWork} />
          <div className="flex w-full flex-col overflow-hidden">
            <TabsContainer />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </main>
        <BottomBar />
        <NavigationChange allPaths={[...myWork]} />
      </body>
    </html>
  );
}
