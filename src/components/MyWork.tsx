"use client";

import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import GlowCard from "./GlowCard";
import movieSentimentPredictor from "../../public/projects/movie-sentiment-predictor.png";
import aiBorderSurveillance from "../../public/projects/ai-border-surveillance.png";
import afkDetector from "../../public/projects/afk-detector.png";
import notibit from "../../public/projects/notibit.png";
import ieeeWebsite from "../../public/projects/ieee-website.png";
import youtubeVideoSummarizer from "../../public/projects/youtube-video-summarizer.png";
import Button from "./Button";

interface Project {
  href?: string;
  name: string;
  description: string;
  full: boolean;
  image: {
    src: StaticImageData;
  };
  tech: string[];
}

const projects: Project[] = [
  {
    href: "/apps/movie-sentiment-predictor",
    name: "Movie Sentiment Predictor",
    full: true,
    description:
      "A scalable movie review sentiment detector that rates reviews and predicts emotions using advanced machine learning. Built with React.js frontend and Python Flask backend, utilizing TensorFlow, Keras, and LSTM models for accurate sentiment analysis.",
    image: { src: movieSentimentPredictor },
    tech: ["React.js", "Python", "Flask", "TensorFlow", "Keras", "LSTM"],
  },
  {
    href: "/apps/ai-border-surveillance",
    name: "AI Border Surveillance System",
    full: true,
    description:
      "Complete AI-powered border surveillance software to detect anomalies including intruders, drones, weapons, and vehicles. Features face recognition for soldier identification using Next.js frontend and Python backend with advanced computer vision.",
    image: { src: aiBorderSurveillance },
    tech: [
      "Next.js",
      "Python",
      "Flask",
      "TensorFlow",
      "OpenCV",
      "YOLO V8",
      "SAM",
    ],
  },
  {
    href: "/apps/youtube-video-summarizer",
    name: "Youtube Video Summarizer",
    full: true,
    description:
      "A scalable Youtube video summarizer that summarizes videos using advanced machine learning. Built with Next.js frontend , it using transriber to transcribe a yt video and then goes through the transcript and summarizes it using a LLM.",
    image: { src: youtubeVideoSummarizer },
    tech: ["Next.js", "Node.js", "transriber", "LLM"],
  },
  {
    href: "/apps/afk-detector",
    name: "AFK Detector",
    full: true,
    description:
      "AI model using Reinforcement Learning and Computer Vision to solve low-effort employee problems by detecting movements through camera, logging activities, and monitoring eye and body movements with hardware integration.",
    image: { src: afkDetector },
    tech: [
      "React",
      "TypeScript",
      "Python",
      "Raspberry Pi",
      "Arduino",
      "OpenCV",
    ],
  },
  {
    href: "/apps/notibit",
    name: "Notibit",
    full: true,
    description:
      "A collaborative study platform where users can upload and download study notes online. Built with modern web technologies including Three.js for interactive 3D elements and Supabase for backend services.",
    image: { src: notibit },
    tech: ["React", "TypeScript", "Three.js", "Node.js", "Supabase"],
  },
  {
    href: "/apps/ieee-website",
    name: "IEEE Website",
    full: true,
    description:
      "Animated website for coding club with complete backend API that handles 1000+ requests per day without breakdown. Features modern animations and robust architecture built with cutting-edge technologies.",
    image: { src: ieeeWebsite },
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Three.js",
      "GSAP",
    ],
  },
];

export default function MyWork() {
  return (
    <div className="relative z-10 mt-20 @container">
      <div className="grid grid-cols-1 gap-8 pt-10 3xl:grid-cols-2">
        {projects.map((project, index) => (
          <GlowCard
            key={project.name + index}
            className={clsx("hover:shadow-my_work_yellow/90")}
            glowClassName="from-[#ffdc8b] to-[#ffdc8b]"
          >
            <div className="flex flex-col p-4">
              <div className="text-2xl text-my_work_yellow mb-4">
                {project.name}
              </div>
              <div className="flex xl:flex-row gap-4 flex-col">
                <div className="flex flex-col justify-between w-full">
                  <div className="text-white w-full mb-4">
                    {project.description}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-my_work_yellow/20 text-my_work_yellow rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.href && (
                    <Button
                      className="flex items-center gap-x-2 px-4 py-2 w-fit"
                      variant="secondary"
                      arrow="right"
                      href={project.href}
                    >
                      Learn more
                    </Button>
                  )}
                </div>
                <Image
                  placeholder="blur"
                  className={clsx("z-10 my-work-img-shadow xl:w-[50%] w-full")}
                  src={project.image.src}
                  alt={project.name}
                />
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
