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
  metadataBase: new URL("https://subhayudas.com"),
  title: {
    default:
      "Subhayu Das - Software Engineer | Full Stack Developer | AI/ML Expert",
    template: "%s | Subhayu Das - Software Engineer",
  },
  description:
    "Subhayu Das - Experienced Software Engineer and Full Stack Developer specializing in AI/ML, Computer Vision, React, Next.js, Python, and TensorFlow. Available for hire for software development, web development, and AI projects. Expert in recruitment-ready coding solutions and innovative tech projects.",
  keywords: [
    // Primary keywords
    "Subhayu Das",
    "Subhayu Das Software Engineer",
    "Subhayu Das Developer",
    "Subhayu Das Portfolio",

    // Job/Recruitment related keywords
    "Software Engineer for hire",
    "Full Stack Developer available",
    "Hire Software Developer",
    "Software Engineer job candidate",
    "Experienced Software Developer",
    "Software Engineer recruitment",
    "Tech talent recruitment",
    "Software Developer hiring",
    "Coding expert for hire",
    "Programming specialist",

    // Technical skills
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI/ML Engineer",
    "Machine Learning Engineer",
    "Computer Vision Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Python Developer",
    "JavaScript Developer",
    "TensorFlow Expert",
    "Node.js Developer",

    // Project types
    "Web Development",
    "Mobile App Development",
    "AI Development",
    "Machine Learning Projects",
    "Computer Vision Projects",
    "Full Stack Applications",
    "React Applications",
    "Next.js Projects",

    // Industry terms
    "Software Development",
    "Web Development Services",
    "AI/ML Solutions",
    "Custom Software Development",
    "Enterprise Software Solutions",
    "Scalable Web Applications",
    "Modern Web Development",
    "Innovative Tech Solutions",

    // Location-based (add your location)
    "Software Engineer India",
    "Full Stack Developer India",

    // Portfolio specific
    "Portfolio",
    "Tech Portfolio",
    "Developer Portfolio",
    "Software Engineer Portfolio",
    "Coding Portfolio",
  ],
  authors: [{ name: "Subhayu Das", url: "https://subhayudas.com" }],
  creator: "Subhayu Das",
  publisher: "Subhayu Das",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://subhayudas.com",
    title:
      "Subhayu Das - Software Engineer | Full Stack Developer | AI/ML Expert",
    description:
      "Experienced Software Engineer specializing in Full Stack Development, AI/ML, and Computer Vision. Available for hire for innovative software development projects. Expert in React, Next.js, Python, TensorFlow, and modern web technologies.",
    siteName: "Subhayu Das - Software Engineer Portfolio",
    images: [
      {
        url: "https://subhayudas.com/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Subhayu Das - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Subhayu Das - Software Engineer | Full Stack Developer | AI/ML Expert",
    description:
      "Experienced Software Engineer specializing in Full Stack Development, AI/ML, and Computer Vision. Available for hire for innovative projects.",
    creator: "@subhayudas", // Replace with your actual Twitter handle
    images: ["https://subhayudas.com/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://subhayudas.com",
  },
  category: "Technology",
  classification: "Software Development Portfolio",
  other: {
    "application-name": "Subhayu Das Portfolio",
    "apple-mobile-web-app-title": "Subhayu Das",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
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

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://subhayudas.com/#person",
        name: "Subhayu Das",
        url: "https://subhayudas.com",
        image: {
          "@type": "ImageObject",
          url: "https://subhayudas.com/opengraph-image.jpg",
          width: 1200,
          height: 630,
        },
        description:
          "Experienced Software Engineer and Full Stack Developer specializing in AI/ML, Computer Vision, React, Next.js, Python, and TensorFlow. Available for hire for software development projects.",
        jobTitle: [
          "Software Engineer",
          "Full Stack Developer",
          "AI/ML Engineer",
          "Computer Vision Engineer",
        ],
        knowsAbout: [
          "Software Engineering",
          "Full Stack Development",
          "Artificial Intelligence",
          "Machine Learning",
          "Computer Vision",
          "React",
          "Next.js",
          "TypeScript",
          "Python",
          "TensorFlow",
          "Node.js",
          "Web Development",
          "Mobile App Development",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Engineer",
          occupationLocation: {
            "@type": "Country",
            name: "India",
          },
          skills: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Python",
            "TensorFlow",
            "Machine Learning",
            "Computer Vision",
            "Full Stack Development",
            "AI Development",
          ],
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Your University Name", // Replace with actual university
        },
        sameAs: [
          "https://linkedin.com/in/subhayudas", // Replace with actual LinkedIn
          "https://github.com/subhayudas", // Replace with actual GitHub
          "https://twitter.com/subhayudas", // Replace with actual Twitter
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://subhayudas.com/#website",
        url: "https://subhayudas.com",
        name: "Subhayu Das - Software Engineer Portfolio",
        description:
          "Professional portfolio of Subhayu Das, an experienced Software Engineer specializing in Full Stack Development, AI/ML, and Computer Vision.",
        publisher: {
          "@id": "https://subhayudas.com/#person",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://subhayudas.com/?s={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://subhayudas.com/#webpage",
        url: "https://subhayudas.com",
        name: "Subhayu Das - Software Engineer | Full Stack Developer | AI/ML Expert",
        isPartOf: {
          "@id": "https://subhayudas.com/#website",
        },
        about: {
          "@id": "https://subhayudas.com/#person",
        },
        description:
          "Professional portfolio showcasing software engineering expertise, full stack development projects, AI/ML solutions, and computer vision applications.",
        breadcrumb: {
          "@id": "https://subhayudas.com/#breadcrumb",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://subhayudas.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://subhayudas.com",
          },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://subhayudas.com/#service",
        name: "Software Development Services",
        provider: {
          "@id": "https://subhayudas.com/#person",
        },
        serviceType: [
          "Software Development",
          "Full Stack Development",
          "AI/ML Development",
          "Computer Vision Solutions",
          "Web Application Development",
          "Mobile App Development",
        ],
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full Stack Web Development",
                description:
                  "Complete web application development using modern technologies like React, Next.js, Node.js, and databases.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI/ML Solutions",
                description:
                  "Custom artificial intelligence and machine learning solutions using TensorFlow, Python, and advanced algorithms.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Computer Vision Applications",
                description:
                  "Advanced computer vision solutions for object detection, image recognition, and video analysis.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Subhayu Das" />
        <meta name="copyright" content="Subhayu Das" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        {/* Job/Recruitment specific meta tags */}
        <meta name="job-title" content="Software Engineer" />
        <meta
          name="skills"
          content="JavaScript, TypeScript, React, Next.js, Python, TensorFlow, AI/ML, Computer Vision, Full Stack Development"
        />
        <meta name="availability" content="Available for hire" />
        <meta name="experience-level" content="Experienced" />
        <meta name="work-type" content="Full-time, Contract, Freelance" />

        {/* Geographic targeting */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />

        {/* Social Media Meta Tags */}
        <meta property="profile:first_name" content="Subhayu" />
        <meta property="profile:last_name" content="Das" />
        <meta property="profile:username" content="subhayudas" />

        {/* Additional Open Graph tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Twitter Card additional tags */}
        <meta
          name="twitter:image:alt"
          content="Subhayu Das - Software Engineer Portfolio"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Additional Structured Data for Job Posting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Subhayu Das",
              jobTitle: "Software Engineer",
              description:
                "Experienced Software Engineer available for hire. Specializing in Full Stack Development, AI/ML, and Computer Vision.",
              url: "https://subhayudas.com",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "Software Engineering",
                "Full Stack Development",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Python",
                "TensorFlow",
                "AI/ML",
                "Computer Vision",
                "Web Development",
                "Mobile Development",
              ],
              seeks: {
                "@type": "Demand",
                name: "Software Engineering Opportunities",
              },
            }),
          }}
        />
      </head>
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
