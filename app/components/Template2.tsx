"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  ExternalLink,
  Globe,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Home,
  Briefcase,
  FolderGit2,
  Edit3,
  User,
  GraduationCap,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

export default function Template2() {
  const searchParams = useSearchParams();
  const { portfolio, loadUserPortfolio } = usePortfolio();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Sync user if username passed in URL
  useEffect(() => {
    const urlUser = searchParams?.get("username") || searchParams?.get("user");
    if (urlUser) {
      loadUserPortfolio(urlUser);
    }
  }, [searchParams, loadUserPortfolio]);

  const name = portfolio.name || "Lokesh";
  const bio = portfolio.bio || "I am a software engineer and I love building things for users. Very active on Twitter.";
  const about = portfolio.about || "I talk a lot about software development on Twitter. I have worked on several side projects and open source software. I love building tools for developer community which help users to scale and train web apps.";
  const avatarUrl = portfolio.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
  const photos = portfolio.photos && portfolio.photos.length > 0 ? portfolio.photos : [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=80"
  ];
  const skills = portfolio.skills && portfolio.skills.length > 0 ? portfolio.skills : [
    "React", "Next.js", "Typescript", "Node.js", "Python", "Go", "Postgres", "Docker", "Kubernetes", "Java", "C++"
  ];
  const experiences = portfolio.experiences && portfolio.experiences.length > 0 ? portfolio.experiences : [
    {
      id: "1",
      company: "Peerlist Technologies",
      role: "SDE-1 Frontend",
      period: "Dec 2022 - Present",
      location: "Remote",
      status: "Working",
      logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"
    }
  ];
  const educationList = portfolio.education && portfolio.education.length > 0 ? portfolio.education : [
    {
      id: "1",
      school: "VTU Board",
      degree: "B.Tech in Computer Science",
      period: "2018 - 2022",
      logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&auto=format&fit=crop&q=80"
    }
  ];
  const testimonials = portfolio.testimonials && portfolio.testimonials.length > 0 ? portfolio.testimonials : [
    {
      id: "1",
      name: "Akash Garg",
      role: "Founder @ Prompts Trend",
      content: "Lokesh is a talented computer engineer and his skills are exceptional. He built our web platform perfectly, capturing our vision. He exceeded our expectations with his speed, attention to detail and dedication to work.",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "2",
      name: "Vaibhav Kumar",
      role: "Co-Founder @ Craftworks",
      content: "As a premier Frontend developer, Lokesh consistently delivered high quality code & clean UI solutions. He is quick to adapt, has great design aesthetics, and brought tremendous value to our product delivery.",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const projects = portfolio.projects && portfolio.projects.length > 0 ? portfolio.projects : [
    {
      id: "1",
      name: "MagicUI Studio",
      description: "50+ open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion.",
      url: "https://github.com/Aaryany25",
      language: "TypeScript",
      stars: 1240,
      forks: 180,
      date: "Jan 2024 - Mar 2024",
      tags: ["React", "Next.js", "Typescript", "TailwindCSS", "Shadcn UI"],
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "2",
      name: "Sticker Fast Generator",
      description: "AI powered generator that creates custom sticker designs and vector illustrations in seconds from simple text prompts.",
      url: "https://github.com/Aaryany25",
      language: "TypeScript",
      stars: 850,
      forks: 92,
      date: "May 2024 - Jun 2024",
      tags: ["Next.js", "Typescript", "TailwindCSS", "Stripe", "Shadcn UI"],
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "3",
      name: "Unfurl",
      description: "With Unfurl, user centric, SEO friendly dynamic link previews help users maximize engagement and click through rates on social platforms.",
      url: "https://github.com/Aaryany25",
      language: "TypeScript",
      stars: 420,
      forks: 35,
      date: "Apr 2024 - May 2024",
      tags: ["Next.js", "Typescript", "TailwindCSS", "Postgres"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "4",
      name: "Modern Portfolio Template",
      description: "A slick and minimal portfolio website template built with Next.js and Tailwind CSS for software developers and creators.",
      url: "https://github.com/Aaryany25/Portfolio-Builder",
      language: "TypeScript",
      stars: 670,
      forks: 75,
      date: "Feb 2024 - Present",
      tags: ["Next.js", "Typescript", "TailwindCSS", "Shadcn UI"],
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80"
    }
  ];

  const currentTestimonial = testimonials[activeTestimonialIndex % testimonials.length];

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-[#faf9f6] text-zinc-900"} font-sans transition-colors duration-200 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900 pb-28`}>
      
      {/* Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12">

        {/* Header / Intro Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                Hi, I&apos;m {name} <span className="animate-bounce inline-block">👋</span>
              </h1>
              <p className="text-base text-zinc-700 dark:text-zinc-300 font-medium max-w-lg leading-snug">
                {bio}
              </p>
            </div>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-md shrink-0 bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* About Subsection */}
          <div className="flex flex-col gap-2 pt-2">
            <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">
              About
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {about}
            </p>
          </div>
        </section>

        {/* Photo Gallery Grid */}
        <section className="grid grid-cols-3 gap-2.5 sm:gap-3 my-1">
          {photos.slice(0, 8).map((photoUrl, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-xs group transition-all duration-300 hover:shadow-md ${
                idx === 2 ? "row-span-2 h-44 sm:h-52" : idx === 5 ? "col-span-2 h-28 sm:h-32" : "h-24 sm:h-28"
              }`}
            >
              <Image
                src={photoUrl}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col items-center gap-4 pt-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            My Projects
          </span>
          <div className="text-center flex flex-col gap-2 max-w-lg">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Check out my latest work
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We&apos;ve worked on a variety of projects, from simple websites to complex web applications and mobile Apps. Here are a few of my favorites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-2">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
              >
                {/* Project Image Banner */}
                {proj.imageUrl && (
                  <div className="relative h-44 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <Image
                      src={proj.imageUrl}
                      alt={proj.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                )}

                <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                        {proj.name}
                      </h3>
                      {proj.date && (
                        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                          {proj.date}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Website</span>
                      </a>
                    )}
                    <a
                      href={proj.url || portfolio.socialLinks?.github || "https://github.com/Aaryany25"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={portfolio.socialLinks?.github || "https://github.com/Aaryany25"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-5 py-2 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            View More &rarr;
          </Link>
        </section>

        {/* Skills Section */}
        <section id="skills" className="flex flex-col items-center gap-4 pt-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            Skills
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xs hover:scale-105 transition-transform"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="flex flex-col items-center gap-4 pt-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            Work Experience
          </span>

          <div className="flex flex-col gap-3 w-full">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    {exp.logoUrl ? (
                      <Image
                        src={exp.logoUrl}
                        alt={exp.company}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <Briefcase className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                        {exp.company}
                      </h3>
                      {exp.status && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {exp.status}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {exp.role}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="flex flex-col items-center gap-4 pt-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            Education
          </span>

          <div className="flex flex-col gap-3 w-full">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    {edu.logoUrl ? (
                      <Image
                        src={edu.logoUrl}
                        alt={edu.school}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {edu.school}
                    </h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {edu.degree}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Words of Appreciation / Testimonials Slider */}
        {testimonials.length > 0 && (
          <section id="testimonials" className="flex flex-col items-center gap-6 pt-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white text-center">
              Words of Appreciation
            </h2>

            <div className="relative w-full max-w-xl">
              <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs flex flex-col gap-4">
                <p className="text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  <div className="flex items-center gap-3">
                    {currentTestimonial.avatarUrl && (
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <Image
                          src={currentTestimonial.avatarUrl}
                          alt={currentTestimonial.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
                        {currentTestimonial.name}
                      </span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {currentTestimonial.role}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevTestimonial}
                      className="p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextTestimonial}
                      className="p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="flex flex-col items-center gap-3 text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
            Contact
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Want to chat? Just shoot me a DM on{" "}
            <a
              href={portfolio.socialLinks?.twitter || "https://x.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Twitter/X
            </a>{" "}
            or send an email anytime.
          </p>
        </section>

      </main>

      {/* Floating Bottom Navigation Dock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full border border-zinc-300/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-xl flex items-center gap-4 text-zinc-600 dark:text-zinc-300">
        <Link href="/" title="Home" className="hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all">
          <Home className="w-4 h-4" />
        </Link>
        <Link href="/dashboard" title="Dashboard" className="hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all">
          <Edit3 className="w-4 h-4" />
        </Link>
        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
        <a
          href={portfolio.socialLinks?.github || "https://github.com/Aaryany25"}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile"
          className="hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
        <a
          href={portfolio.socialLinks?.linkedin || "https://linkedin.com"}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Profile"
          className="hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>
        <a
          href={portfolio.socialLinks?.twitter || "https://x.com"}
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter / X Profile"
          className="hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all"
        >
          <TwitterIcon className="w-4 h-4" />
        </a>
        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle Dark/Light Mode"
          className="hover:text-zinc-900 dark:hover:text-white hover:scale-110 transition-all"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
        </button>
      </div>

    </div>
  );
}
