"use client";

import { useAnimationControls } from "framer-motion";
import Image from "next/image";
import { FadeIn, FadeInStagger } from "./FadeIn";

const skills = [
  {
    name: "Programming Languages",
    logos: [
      {
        name: "TypeScript",
        image: "/logos/ts-logo.png",
      },
      {
        name: "Python",
        image: "/logos/python-logo.png",
      },
      {
        name: "JavaScript",
        image: "/logos/js-logo.png",
      },
      {
        name: "C++",
        image: "/logos/cpp-logo.png",
      },
      {
        name: "C",
        image: "/logos/c-logo.png",
      },
      {
        name: "Java",
        image: "/logos/java-logo.png",
      },
      {
        name: "SQL",
        image: "/logos/sql-logo.png",
      },
      {
        name: "PHP",
        image: "/logos/php-logo.png",
      },
      {
        name: "Solidity",
        image: "/logos/solidity-logo.png",
      },
    ],
  },
  {
    name: "Frontend Frameworks & Libraries",
    logos: [
      {
        name: "React.js",
        image: "/logos/react-logo.png",
      },
      {
        name: "Next.js",
        image: "/logos/nextjs-logo.png",
      },
      {
        name: "Three.js",
        image: "/logos/threejs-logo.png",
      },
      {
        name: "TailwindCSS",
        image: "/logos/tailwindcss-logo.png",
      },
      {
        name: "GSAP",
        image: "/logos/gsap-logo.png",
      },
      {
        name: "HTML5",
        image: "/logos/html5-logo.png",
      },
    ],
  },
  {
    name: "Backend & Databases",
    logos: [
      {
        name: "Node.js",
        image: "/logos/nodejs-logo.png",
      },
      {
        name: "Django",
        image: "/logos/django-logo.png",
      },
      {
        name: "Flask",
        image: "/logos/flask-logo.png",
      },
      {
        name: "FastAPI",
        image: "/logos/fastapi-logo.png",
      },
      {
        name: "PostgreSQL",
        image: "/logos/postgres-logo.png",
      },
      {
        name: "MongoDB",
        image: "/logos/mongodb-logo.webp",
      },
      {
        name: "Mongoose",
        image: "/logos/mongoose-logo.png",
      },
    ],
  },
  {
    name: "AI/ML & Data Science",
    logos: [
      {
        name: "TensorFlow",
        image: "/logos/tensorflow-logo.png",
      },
      {
        name: "Keras",
        image: "/logos/keras-logo.png",
      },
      {
        name: "Scikit-learn",
        image: "/logos/sklearn-logo.png",
      },
      {
        name: "NLTK",
        image: "/logos/nltk-logo.png",
      },
      {
        name: "SpaCy",
        image: "/logos/spacy-logo.png",
      },
      {
        name: "OpenCV",
        image: "/logos/opencv-logo.png",
      },
    ],
  },
  {
    name: "Tools & Platforms",
    logos: [
      {
        name: "Docker",
        image: "/logos/docker-logo.png",
      },
      {
        name: "Git",
        image: "/logos/git-logo.png",
      },
      {
        name: "GitHub",
        image: "/logos/github-logo.webp",
      },
      {
        name: "AWS",
        image: "/logos/aws-logo.png",
      },
      {
        name: "Raspberry Pi",
        image: "/logos/raspberry-pi-logo.png",
      },
      {
        name: "Arduino",
        image: "/logos/arduino-logo.png",
      },
    ],
  },
  {
    name: "Soft Skills",
    logos: [
      {
        name: "Leadership",
        image: "/logos/leadership-logo.png",
      },
      {
        name: "Event Management",
        image: "/logos/event-management-logo.png",
      },
      {
        name: "Content Writing",
        image: "/logos/content-writing-logo.png",
      },
      {
        name: "Public Speaking",
        image: "/logos/public-speaking-logo.png",
      },
      {
        name: "Time Management",
        image: "/logos/time-management-logo.png",
      },
    ],
  },
];

export default function Skills() {
  const controls = useAnimationControls();

  return (
    <div className="container">
      <FadeInStagger
        faster
        animate={controls}
        className="relative z-10 flex flex-col gap-4 mt-20"
      >
        {skills.map(({ name, logos: skills }, index) => (
          <div key={index}>
            <div className="flex items-center mb-6">
              <h3 className="text-center text-2xl font-semibold">{name}</h3>
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {skills.map((skill, index) => {
                return (
                  <FadeIn key={index} className="w-24 flex flex-col">
                    <div>
                      <Image
                        src={skill.image}
                        className="object-contain rounded-md m-auto"
                        alt={`${skill.name} logo`}
                        height={64}
                        width={64}
                        style={{
                          width: 64,
                          height: 64,
                        }}
                      />
                      <h3 className="text-sm font-semibold tracking-tight text-gray-500 text-center w-min px-2 m-2 mx-auto">
                        {skill.name}
                      </h3>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        ))}
      </FadeInStagger>
    </div>
  );
}
