"use client";

import React from "react";
import AboutMe from "@/components/AboutMe";
import Border from "@/components/Border";
import ContactMe from "@/components/ContactMe";
import Container from "@/components/Container";
import { Hero } from "@/components/Hero";
import MyWork from "@/components/MyWork";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";

import WorkExperience from "@/components/WorkExperience";
import { Archive, BookOpen, BriefCase, Envelope } from "@/icons";
import { sections } from "@/lib/constants";

interface contentSection {
  id: string;
  sectionHeader: {
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
  };
  mainContent: React.ReactNode;
}

const content: contentSection[] = [
  {
    id: sections[1].id,
    sectionHeader: {
      icon: (
        <>
          <BriefCase height="28" width="28" />
          <span className="bg-work_experience_orange icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: "Work Experience",
      description: (
        <div>
          <span className="text-work_experience_orange">
            Software Developer
          </span>{" "}
          with experience in{" "}
          <span className="text-work_experience_orange">
            Full Stack Development
          </span>{" "}
          and <span className="text-work_experience_orange">AI/ML</span>
        </div>
      ),
    },
    mainContent: <WorkExperience />,
  },
  {
    id: sections[2].id,
    sectionHeader: {
      icon: (
        <>
          <BookOpen height="28" width="28" />
          <span className="bg-skills_purple icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: "Skills",
      description: (
        <div>
          <span className="text-skills_purple">Full Stack</span> developer with
          expertise in{" "}
          <span className="text-skills_purple">Web Development</span>,{" "}
          <span className="text-skills_purple">AI/ML</span>, and{" "}
          <span className="text-skills_purple">Computer Vision</span>
        </div>
      ),
    },
    mainContent: <Skills />,
  },
  {
    id: sections[3].id,
    sectionHeader: {
      icon: (
        <>
          <Archive height="28" width="28" />
          <span className="bg-my_work_yellow icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: "My Work",
      description: (
        <div>
          My <span className="text-my_work_yellow">innovative projects</span> in{" "}
          <span className="text-my_work_yellow">AI</span>,{" "}
          <span className="text-my_work_yellow">Web Development</span>, and{" "}
          <span className="text-my_work_yellow">Computer Vision</span>
        </div>
      ),
    },
    mainContent: <MyWork />,
  },
  {
    id: sections[4].id,
    sectionHeader: {
      icon: (
        <>
          <Envelope height="28" width="28" />
          <span className="bg-blue-400 icon-blur absolute inset-0 -z-10"></span>
        </>
      ),
      title: "Contact Me",
      description: (
        <div>
          Let&apos;s <span className="text-blue-400">connect</span> and{" "}
          <span className="text-blue-400">collaborate</span>
        </div>
      ),
    },
    mainContent: <ContactMe />,
  },
];

export default function Home() {
  const handleResumeClick = () => {
    window.open("/Subhayu%20Das%20Resume.pdf", "_blank");
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden">
      {/* SEO-optimized hidden content for search engines */}
      <div className="sr-only">
        <h1>
          Subhayu Das - Software Engineer | Full Stack Developer | AI/ML Expert
        </h1>
        <p>
          Subhayu Das is an experienced Software Engineer and Full Stack
          Developer specializing in AI/ML, Computer Vision, React, Next.js,
          Python, and TensorFlow. Available for hire for software development,
          web development, and AI projects. Expert in recruitment-ready coding
          solutions and innovative tech projects.
        </p>
        <p>
          Looking to hire a Software Engineer? Subhayu Das offers professional
          software development services including full stack web development,
          AI/ML solutions, computer vision applications, and modern web
          technologies. Perfect candidate for software engineer recruitment and
          tech talent acquisition.
        </p>
        <p>
          Skills: Software Engineering, Full Stack Development, Frontend
          Development, Backend Development, AI/ML Engineering, Machine Learning,
          Computer Vision, React Development, Next.js Development, TypeScript
          Development, Python Development, JavaScript Development, TensorFlow,
          Node.js, Web Development, Mobile App Development, Software Development
          Services, Custom Software Development.
        </p>
      </div>

      <Section id={sections[0].id}>
        <Hero
          title={
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-white">
              Subhayu Das
            </span>
          }
          subtitle="Experienced Software Engineer specializing in Full Stack Development, AI/ML, and Computer Vision. Available for hire for innovative software development projects and recruitment opportunities."
          actions={[
            {
              label: "📄 View My Resume",
              href: "#",
              variant: "resume",
              onClick: handleResumeClick,
            },
            {
              label: "Contact Me",
              href: "#contact",
              variant: "outline",
            },
          ]}
          className="min-h-screen"
        />
        <Container>
          <div className="relative">
            <Socials className="items-center justify-center py-3 sm:py-4 md:py-8" />
          </div>
          <AboutMe />
        </Container>
      </Section>
      <div id="stars-container" className="relative">
        <Container>
          {content.map((section: contentSection) => (
            <Section
              key={section.id}
              id={section.id}
              className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 mt-12 sm:mt-16 md:mt-20 lg:mt-28"
            >
              <Border />
              <SectionHeader {...section.sectionHeader} />
              {section.mainContent}
            </Section>
          ))}
        </Container>
      </div>
    </div>
  );
}
