"use client";

import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines";
import TextAnimate from "@/components/ui/text-animate";
import SparklesText from "@/components/ui/sparkles-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Particles from "@/components/ui/particles";
import Meteors from "@/components/ui/meteors";
import { FadeIn } from "./FadeIn";
import Socials from "./Socials";

const EnhancedHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <BackgroundLines className="min-h-screen relative">
        <Particles
          className="absolute inset-0"
          quantity={150}
          ease={80}
          color="#008bc9"
          refresh={false}
        />
        <Meteors number={30} />
        
        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            className="text-center max-w-5xl pt-60 md:pt-[20vh] 2xl:pt-[30vh]"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <AnimatedGradientText className="text-sm font-medium">
                🚀 Welcome to my digital universe
              </AnimatedGradientText>
            </motion.div>

            {/* Main Title with Sparkles */}
            <div className="relative mb-6">
              <SparklesText
                className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-7xl lg:text-7xl py-2 md:py-10 font-bold tracking-tight"
                sparklesCount={15}
                colors={{
                  first: "#008bc9",
                  second: "#939aff",
                }}
              >
                Subhayu Das
              </SparklesText>
            </div>

            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <TextAnimate
                animation="blurInUp"
                by="word"
                duration={0.8}
                delay={0.5}
                staggerChildren={0.1}
                className="text-xl md:text-2xl font-semibold text-about_me_blue mb-4"
              >
                Software Developer & AI/ML Enthusiast
              </TextAnimate>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <TextAnimate
                animation="slideUp"
                by="word"
                duration={0.6}
                delay={0.8}
                staggerChildren={0.05}
                className="max-w-2xl mx-auto text-md md:text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed"
              >
                Crafting innovative solutions through Full Stack Development, AI/ML, and Computer Vision with a passion for pushing technological boundaries.
              </TextAnimate>
            </motion.div>

            {/* Animated CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 139, 201, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-about_me_blue to-skills_purple text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-about_me_blue text-about_me_blue font-semibold rounded-full hover:bg-about_me_blue hover:text-white transition-all duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12"
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "3+", label: "Years Experience" },
                { number: "100%", label: "Dedication" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-about_me_blue">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Mouse Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-about_me_blue rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-about_me_blue rounded-full mt-2"
              />
            </motion.div>
            <p className="text-xs text-gray-400 mt-2 text-center">Scroll to explore</p>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute bottom-8 right-8"
          >
            <Socials className="flex flex-col gap-4" />
          </motion.div>
        </div>
      </BackgroundLines>
    </div>
  );
};

export default EnhancedHero; 