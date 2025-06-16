import AboutMe from "@/components/AboutMe";
import Border from "@/components/Border";
import ContactMe from "@/components/ContactMe";
import Container from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import MyWork from "@/components/MyWork";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";
import { BackgroundLines } from "@/components/ui/background-lines";
import WorkExperience from "@/components/WorkExperience";
import { Archive, BookOpen, BriefCase, Envelope } from "@/icons";

export const sections = [
  { index: 0, title: "About Me", id: "about-me" },
  { index: 1, title: "Work Experience", id: "work-experience" },
  { index: 2, title: "Skills", id: "skills" },
  { index: 3, title: "My Work", id: "my-work" },
  { index: 4, title: "Contact Me", id: "contact" },
];

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
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden">
      <Section id={sections[0].id}>
        <Container>
          <BackgroundLines className="min-h-screen relative">
            <FadeIn className="max-w-5xl pt-60 md:pt-[20vh] 2xl:pt-[30vh]">
              <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-7xl lg:text-7xl py-2 md:py-10 relative z-20 font-bold tracking-tight">
                Subhayu Das
              </h2>
              <p className="max-w-xl mx-auto text-md md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                Software Developer specializing in Full Stack Development,
                AI/ML, and Computer Vision with a passion for innovative
                solutions.
              </p>
            </FadeIn>
            <div className="mouse"></div>
            <Socials className="items-center justify-center" />
          </BackgroundLines>
          <AboutMe />
        </Container>
      </Section>
      <div id="stars-container" className="relative">
        <Container>
          {content.map((section: contentSection) => (
            <Section key={section.id} id={section.id} className="pt-24 mt-28">
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
