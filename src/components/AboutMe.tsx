import { Accounts } from "@/icons";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import Socials from "./Socials";
import SectionHeader from "./SectionHeader";

const AboutMe = () => {
  return (
    <div className="relative z-10">
      <SectionHeader
        icon={
          <>
            <Accounts height="28" width="28" />
            <span className="bg-about_me_blue icon-blur absolute inset-0 -z-10"></span>
          </>
        }
        title="About Me"
        description={
          <div>
            A <span className="text-about_me_blue">software developer</span>{" "}
            with expertise in{" "}
            <span className="text-about_me_blue">Full Stack Development</span>,{" "}
            <span className="text-about_me_blue">AI/ML</span>, and{" "}
            <span className="text-about_me_blue">Computer Vision</span>.
          </div>
        }
      />
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 mt-20 justify-between">
          <div className="max-w-xl flex-auto">
            <h3 className="text-lg font-semibold leading-8 tracking-tight text-white">
              Subhayu Das
            </h3>
            <p className="text-base leading-7 text-about_me_blue">
              Software Developer & AI/ML Enthusiast
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Passionate software developer with expertise in full-stack
              development, artificial intelligence, and computer vision.
              Currently pursuing B.Tech in ECE from Birla Institute of
              Technology, Mesra with a strong foundation in algorithms, machine
              learning, and modern web technologies.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Experienced in building scalable applications, AI-powered
              solutions, and innovative projects that solve real-world problems.
              Active contributor to open-source projects and technical
              communities.
            </p>
          </div>
          <div className="flex-none mx-auto">
            <Image
              className="rounded-full object-cover"
              src="/subhayu.jpg"
              alt="Subhayu Das portrait"
              height={208}
              width={200}
            />
          </div>
        </div>
        <div className="container">
          <div className="flex gap-5 mt-16 flex-col @3xl:flex-row justify-between">
            <div>
              <FadeIn
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <h4 className="text-about_me_blue mb-1 font-bold text-xl">
                  Education
                </h4>
                <div className="border-y py-2 border-gray-500/30 mb-6">
                  <div className="flex flex-wrap gap-x-6">
                    <div className="text-lg font-bold leading-9 tracking-tight flex gap-1">
                      <p className="text-white">
                        Birla Institute of Technology, Mesra
                      </p>
                    </div>
                    <div className="text-md leading-9 tracking-tight flex gap-1">
                      <p className="text-gray-500">
                        Bachelor of Technology - ECE
                      </p>
                    </div>
                    <div className="text-md leading-9 tracking-tight flex gap-1">
                      <p className="text-gray-500">GPA: 7.27/10</p>
                      <p className="text-gray-500">(2024 - 2028)</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Relevant Coursework: Operating Systems, Data Structures,
                      Analysis of Algorithms, Artificial Intelligence, Machine
                      Learning, Networking, Databases
                    </p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <h4 className="text-about_me_blue mb-1 font-bold text-xl">
                  Location & Contact
                </h4>
                <div className="border-y py-2 border-gray-500/30 mb-6">
                  <div className="flex flex-wrap gap-x-6">
                    <div className="text-lg font-bold leading-9 tracking-tight flex gap-1">
                      <p className="text-white">Jharkhand, India</p>
                    </div>
                    <div className="text-md leading-9 tracking-tight flex gap-1">
                      <p className="text-gray-500">+91-9123388359</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
