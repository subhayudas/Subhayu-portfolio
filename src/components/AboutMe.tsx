"use client";

import { Accounts } from "@/icons";
import Image from "next/image";
import { FadeIn } from "./FadeIn";
import Socials from "./Socials";
import SectionHeader from "./SectionHeader";
import { GlowingEffect } from "./ui/glowing-effect";
import { motion } from "framer-motion";

const AboutMe = () => {
  const stats = [
    {
      label: "Years of Experience",
      value: "2+",
      color: "from-blue-400 to-cyan-400",
    },
    {
      label: "Projects Completed",
      value: "15+",
      color: "from-purple-400 to-pink-400",
    },
    {
      label: "Technologies Mastered",
      value: "20+",
      color: "from-green-400 to-emerald-400",
    },
    {
      label: "Students Trained",
      value: "3000+",
      color: "from-orange-400 to-red-400",
    },
  ];

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
        {/* Hero Section with Profile */}
        <motion.div
          className="flex flex-col lg:flex-row gap-12 mt-20 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Info */}
          <div className="max-w-2xl flex-auto space-y-6">
            <div className="space-y-2">
              <motion.h3
                className="text-3xl font-bold bg-gradient-to-r from-white via-about_me_blue to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Subhayu Das
              </motion.h3>
              <motion.p
                className="text-xl text-about_me_blue font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Software Developer & AI/ML Enthusiast
              </motion.p>
            </div>

            <motion.div
              className="space-y-4 text-gray-200 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg text-gray-100">
                Passionate software developer with expertise in full-stack
                development, artificial intelligence, and computer vision.
                Currently pursuing B.Tech in ECE from Birla Institute of
                Technology, Mesra with a strong foundation in algorithms,
                machine learning, and modern web technologies.
              </p>
              <p className="text-lg text-gray-100">
                Experienced in building scalable applications, AI-powered
                solutions, and innovative projects that solve real-world
                problems. Active contributor to open-source projects and
                technical communities with a track record of training over 3000
                students.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="relative group">
                  <div className="relative p-4 rounded-xl bg-gray-800/70 backdrop-blur-sm border border-gray-600/50 hover:border-about_me_blue/70 transition-all duration-300">
                    <GlowingEffect
                      disabled={false}
                      proximity={100}
                      spread={30}
                      blur={2}
                      className="rounded-xl"
                    />
                    <div className="relative z-10">
                      <div
                        className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-200 mt-1 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile Image with Glow Effect */}
          <motion.div
            className="flex-none relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-about_me_blue/30 to-purple-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative p-2 rounded-full bg-gradient-to-r from-about_me_blue/20 to-purple-500/20 backdrop-blur-sm">
                <GlowingEffect
                  disabled={false}
                  proximity={150}
                  spread={40}
                  blur={3}
                  className="rounded-full"
                />
                <Image
                  className="rounded-full object-cover relative z-10 ring-2 ring-about_me_blue/30"
                  src="/subhayu.jpg"
                  alt="Subhayu Das portrait"
                  height={240}
                  width={240}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Education & Contact Info */}
        <div className="mt-20 space-y-12">
          <FadeIn
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/50 hover:border-about_me_blue/70 transition-all duration-300">
                <GlowingEffect
                  disabled={false}
                  proximity={100}
                  spread={25}
                  blur={1}
                  className="rounded-2xl"
                />
                <div className="relative z-10">
                  <h4 className="text-about_me_blue mb-4 font-bold text-2xl flex items-center gap-3">
                    🎓 Education
                  </h4>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                      <div className="text-xl font-bold text-white">
                        Birla Institute of Technology, Mesra
                      </div>
                      <div className="text-lg text-gray-200">
                        Bachelor of Technology - ECE
                      </div>
                      <div className="text-lg text-about_me_blue font-semibold">
                        GPA: 7.27/10 (2024 - 2028)
                      </div>
                    </div>
                    <div className="mt-4 p-4 rounded-lg bg-gray-800/60">
                      <p className="text-gray-100 leading-relaxed">
                        <span className="text-about_me_blue font-semibold">
                          Relevant Coursework:
                        </span>{" "}
                        Operating Systems, Data Structures, Analysis of
                        Algorithms, Artificial Intelligence, Machine Learning,
                        Networking, Databases
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative group">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-600/50 hover:border-about_me_blue/70 transition-all duration-300">
                <GlowingEffect
                  disabled={false}
                  proximity={100}
                  spread={25}
                  blur={1}
                  className="rounded-2xl"
                />
                <div className="relative z-10">
                  <h4 className="text-about_me_blue mb-4 font-bold text-2xl flex items-center gap-3">
                    📍 Location & Contact
                  </h4>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌍</span>
                      <span className="text-xl font-semibold text-white">
                        Jharkhand, India
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <span className="text-lg text-gray-100">
                        +91-9123388359
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Enhanced Socials */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="relative group">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-about_me_blue/20 to-purple-500/20 backdrop-blur-sm border border-gray-600/50 hover:border-about_me_blue/70 transition-all duration-300">
                <GlowingEffect
                  disabled={false}
                  proximity={120}
                  spread={30}
                  blur={2}
                  className="rounded-2xl"
                />
                <div className="relative z-10">
                  <Socials className="justify-center" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
