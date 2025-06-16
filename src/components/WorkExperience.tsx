import clsx from "clsx";
import { default as Image } from "next/image";
import { FadeIn, FadeInStagger } from "./FadeIn";
import Border from "./Border";
import Pill from "./Pill";

interface ExperienceDescription {
  text: string | React.ReactNode;
  subText?: string[];
}

interface Experience {
  title: string;
  date: string;
  description: ExperienceDescription[];
  image: { url: string; className: string; height: number; width: number };
  tech?: string[];
}

const experience: Experience[] = [
  {
    title: "Upwork | Remote Developer (Freelancer, Contractual)",
    date: "Dec 2024 - Present",
    description: [
      {
        text: "Working as a freelance developer on various projects, delivering high-quality solutions for clients worldwide.",
      },
      {
        text: "Key Projects:",
        subText: [
          "Developed a website to search and book hostels with AI-based search engine, serving a userbase of 5000+ users.",
          "Created project-based courses using Unsupervised learning and natural language processing techniques.",
          "Built a buy and sell website where people can sell their used products and put requests to buy, scaled it to a vast userbase.",
        ],
      },
    ],
    image: {
      url: "/workExperience/upwork_logo.png",
      height: 96,
      width: 96,
      className: "",
    },
    tech: [
      "React.js",
      "Next.js",
      "Node.js",
      "Python",
      "Machine Learning",
      "NLP",
      "AI",
      "Full Stack Development",
    ],
  },
  {
    title: "UpThrive | SDE Intern",
    date: "Jan 2019 - Present",
    description: [
      {
        text: "Worked as a Software Development Engineer Intern, contributing to healthcare technology solutions and frontend development.",
      },
      {
        text: "Key Achievements:",
        subText: [
          "Developed a scalable pipeline for healthcare facility appointment booking system.",
          "Created frontend using Next.js to enhance user experience and improve overall system usability.",
          "Collaborated with cross-functional teams to deliver robust healthcare solutions.",
          "Implemented responsive design principles and modern web development practices.",
        ],
      },
    ],
    image: {
      url: "/workExperience/upthrive_logo.png",
      height: 96,
      width: 96,
      className: "",
    },
    tech: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Node.js",
      "Healthcare Tech",
      "Frontend Development",
      "API Integration",
    ],
  },
  {
    title: "Developer Student Clubs NSEC | Community Lead",
    date: "April 2025 - Present",
    description: [
      {
        text: "Leading technical community initiatives and conducting training programs for students.",
      },
      {
        text: "Responsibilities:",
        subText: [
          "Conducted online and offline technical & soft-skills training impacting over 3000 students.",
          "Organized workshops on modern web development, AI/ML, and computer vision.",
          "Mentored students in various technical projects and career development.",
          "Built and maintained community engagement through events and technical sessions.",
        ],
      },
    ],
    image: {
      url: "/workExperience/dsc_logo.png",
      height: 96,
      width: 96,
      className: "",
    },
    tech: [
      "Community Leadership",
      "Technical Training",
      "Event Management",
      "Mentoring",
      "Public Speaking",
    ],
  },
];

const WorkExperience = () => {
  return (
    <div className="mt-24 text-gray-500 relative z-10 container">
      <FadeIn
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        viewportProp={{ once: true }}
      >
        <div className="border-l border-gray-500/30 absolute bottom-0 top-0"></div>
      </FadeIn>
      <FadeInStagger>
        {experience.map((item, index) => (
          <WorkRole
            key={index}
            title={item.title}
            date={item.date}
            image={item.image}
          >
            {item.description.map(({ text, subText }, index) => (
              <div key={index} className="py-1">
                <ul className="list-disc pl-4">
                  <li className="text-gray-500 text-md">
                    {typeof text === "string" ? text : text}
                    {subText && subText.length > 0 && (
                      <ul className="list-disc pl-6 mt-1">
                        {subText.map((subTextItem, subIndex) => (
                          <li key={subIndex} className="text-md py-1">
                            {subTextItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            ))}
            <div className="flex flex-row flex-wrap gap-2 mt-2">
              {item.tech?.map((tech, index) => (
                <Pill
                  key={index}
                  text={tech}
                  color="text-work_experience_orange"
                  background="bg-work_experience_brown"
                />
              ))}
            </div>
          </WorkRole>
        ))}
      </FadeInStagger>
    </div>
  );
};

const WorkRole = ({
  children,
  title,
  date,
  image,
}: {
  children: React.ReactNode;
  title: string;
  date?: string;
  image: { url: string; className: string; height: number; width: number };
}) => {
  return (
    <FadeIn className="flex group mt-8 first:mt-0 px-3">
      <Border className="pt-8 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
        <div className="flex mb-4">
          <div
            className={clsx(
              "flex-none rounded-md overflow-hidden self-center ml-2 mr-4",
              image.className,
            )}
          >
            <Image
              src={image.url}
              alt=""
              height={image.height}
              width={image.width}
              style={{
                width: image.width || "auto",
                height: image.height || "auto",
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-work_experience_orange text-lg">
              {title}
            </p>
            <p className="mt-2 text-white text-sm">{date}</p>
          </div>
        </div>
        <ul className="list-disc pl-10">{children}</ul>
      </Border>
    </FadeIn>
  );
};

export default WorkExperience;
