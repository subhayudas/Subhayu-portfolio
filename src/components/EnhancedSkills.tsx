"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MagicCard from "@/components/ui/magic-card";
import TextAnimate from "@/components/ui/text-animate";
import SparklesText from "@/components/ui/sparkles-text";
import BorderBeam from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const skills = [
  {
    name: "Programming Languages",
    color: "#ff6b6b",
    logos: [
      { name: "TypeScript", image: "/logos/ts-logo.png" },
      { name: "Python", image: "/logos/python-logo.png" },
      { name: "JavaScript", image: "/logos/js-logo.png" },
      { name: "C++", image: "/logos/cpp-logo.png" },
      { name: "C", image: "/logos/c-logo.png" },
      { name: "Java", image: "/logos/java-logo.png" },
      { name: "SQL", image: "/logos/sql-logo.png" },
      { name: "PHP", image: "/logos/php-logo.png" },
      { name: "Solidity", image: "/logos/solidity-logo.png" },
    ],
  },
  {
    name: "Frontend Frameworks & Libraries",
    color: "#4ecdc4",
    logos: [
      { name: "React.js", image: "/logos/react-logo.png" },
      { name: "Next.js", image: "/logos/nextjs-logo.png" },
      { name: "Three.js", image: "/logos/threejs-logo.png" },
      { name: "TailwindCSS", image: "/logos/tailwindcss-logo.png" },
      { name: "GSAP", image: "/logos/gsap-logo.png" },
      { name: "HTML5", image: "/logos/html5-logo.png" },
    ],
  },
  {
    name: "Backend & Databases",
    color: "#45b7d1",
    logos: [
      { name: "Node.js", image: "/logos/nodejs-logo.png" },
      { name: "Django", image: "/logos/django-logo.png" },
      { name: "Flask", image: "/logos/flask-logo.png" },
      { name: "FastAPI", image: "/logos/fastapi-logo.png" },
      { name: "PostgreSQL", image: "/logos/postgres-logo.png" },
      { name: "MongoDB", image: "/logos/mongodb-logo.webp" },
      { name: "Mongoose", image: "/logos/mongoose-logo.png" },
    ],
  },
  {
    name: "AI/ML & Data Science",
    color: "#f7b731",
    logos: [
      { name: "TensorFlow", image: "/logos/tensorflow-logo.png" },
      { name: "Keras", image: "/logos/keras-logo.png" },
      { name: "Scikit-learn", image: "/logos/sklearn-logo.png" },
      { name: "NLTK", image: "/logos/nltk-logo.png" },
      { name: "SpaCy", image: "/logos/spacy-logo.png" },
      { name: "OpenCV", image: "/logos/opencv-logo.png" },
    ],
  },
  {
    name: "Tools & Platforms",
    color: "#5f27cd",
    logos: [
      { name: "Docker", image: "/logos/docker-logo.png" },
      { name: "Git", image: "/logos/git-logo.png" },
      { name: "GitHub", image: "/logos/github-logo.webp" },
      { name: "AWS", image: "/logos/aws-logo.png" },
      { name: "Raspberry Pi", image: "/logos/raspberry-pi-logo.png" },
      { name: "Arduino", image: "/logos/arduino-logo.png" },
    ],
  },
  {
    name: "Soft Skills",
    color: "#fd79a8",
    logos: [
      { name: "Leadership", image: "/logos/leadership-logo.png" },
      { name: "Event Management", image: "/logos/event-management-logo.png" },
      { name: "Content Writing", image: "/logos/content-writing-logo.png" },
      { name: "Public Speaking", image: "/logos/public-speaking-logo.png" },
      { name: "Time Management", image: "/logos/time-management-logo.png" },
    ],
  },
];

export default function EnhancedSkills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="container relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <SparklesText
          className="text-3xl md:text-4xl font-bold text-skills_purple mb-4"
          sparklesCount={12}
          colors={{
            first: "#939aff",
            second: "#008bc9",
          }}
        >
          🚀 Technical Arsenal
        </SparklesText>
        <TextAnimate
          animation="slideUp"
          by="word"
          duration={0.6}
          delay={0.3}
          staggerChildren={0.05}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          A comprehensive toolkit spanning full-stack development, AI/ML, and modern technologies
        </TextAnimate>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20"
      >
        {skills.map((category, categoryIndex) => (
          <motion.div key={categoryIndex} variants={itemVariants}>
            <MagicCard
              className="p-8 h-full bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm relative overflow-hidden"
              gradientColor={category.color}
              gradientOpacity={0.15}
            >
              <BorderBeam
                size={250}
                duration={12 + categoryIndex * 2}
                delay={categoryIndex * 2}
                colorFrom={category.color}
                colorTo="#939aff"
              />
              
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <SparklesText
                  className="text-xl font-bold mb-2"
                  sparklesCount={6}
                  colors={{
                    first: category.color,
                    second: "#939aff",
                  }}
                >
                  {category.name}
                </SparklesText>
                <div 
                  className="h-1 w-16 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </motion.div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 gap-4">
                {category.logos.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.4 + skillIndex * 0.1 
                    }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300">
                      {/* Skill Icon */}
                      <div className="relative mb-3">
                        <div 
                          className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                          style={{ backgroundColor: category.color }}
                        />
                        <Image
                          src={skill.image}
                          className="relative object-contain rounded-lg mx-auto transition-transform duration-300 group-hover:scale-110"
                          alt={`${skill.name} logo`}
                          height={48}
                          width={48}
                          style={{
                            width: 48,
                            height: 48,
                          }}
                        />
                      </div>
                      
                      {/* Skill Name */}
                      <TextAnimate
                        animation="fadeIn"
                        by="character"
                        duration={0.3}
                        delay={0.6 + skillIndex * 0.05}
                        staggerChildren={0.02}
                        className="text-xs font-medium text-center text-gray-300 group-hover:text-white transition-colors duration-300"
                      >
                        {skill.name}
                      </TextAnimate>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Category Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {category.logos.length} Technologies
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 1 + i * 0.1 
                          }}
                          viewport={{ once: true }}
                          className="w-2 h-2 rounded-full border border-white/20"
                          style={{ 
                            backgroundColor: i < 4 ? category.color : 'transparent' 
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">Expert</span>
                  </div>
                </div>
              </motion.div>
            </MagicCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <TextAnimate
          animation="slideUp"
          by="word"
          duration={0.6}
          delay={0.2}
          staggerChildren={0.1}
          className="text-lg text-gray-400 mb-8"
        >
          Ready to bring your ideas to life with cutting-edge technology?
        </TextAnimate>
        
        <ShimmerButton
          className="px-8 py-4 text-lg font-semibold"
          background="linear-gradient(135deg, #939aff 0%, #008bc9 100%)"
          shimmerColor="#ffffff"
          shimmerDuration="2s"
        >
          Let's Build Something Amazing
        </ShimmerButton>
      </motion.div>
    </div>
  );
}