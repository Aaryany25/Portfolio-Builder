export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  status?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  language?: string;
  stars?: number;
  forks?: number;
  tags?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
  substack?: string;
  website?: string;
}

export interface UserProfileData {
  userId: string; // email or GitHub login or default
  name: string;
  tagline: string;
  bio: string;
  about: string;
  location: string;
  email: string;
  avatarUrl: string;
  githubUsername: string;
  resumeUrl: string;
  skills: string[];
  experiences: WorkExperience[];
  projects: Project[];
  socialLinks: SocialLinks;
  updatedAt: string;
}

export const DEFAULT_PORTFOLIO: UserProfileData = {
  userId: "default",
  name: "Aaryan Parmar",
  tagline: "Full Stack Software Engineer & Builder",
  bio: "Building thoughtful web applications, open source tools, and digital experiences.",
  about: "I am a passionate Full Stack Engineer experienced with modern web frameworks, React, Next.js, Node.js, and TypeScript. I love crafting clean user interfaces, robust backend APIs, and scaling applications.",
  location: "Hyderabad, India",
  email: "aaryan@example.com",
  avatarUrl: "https://github.com/Aaryany25.png",
  githubUsername: "Aaryany25",
  resumeUrl: "#",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Docker",
    "Git",
    "GraphQL",
    "REST APIs"
  ],
  experiences: [
    {
      id: "exp-1",
      company: "ASBL",
      status: "Working",
      role: "SDE-L1 (Full Stack)",
      period: "January 2026 - Present",
      location: "Hyderabad, India (On-Site)",
      description: "Developing scalable internal services and customer-facing interfaces using Next.js and TypeScript."
    },
    {
      id: "exp-2",
      company: "Promote",
      role: "Founding Frontend Engineer",
      period: "August 2025 - December 2025",
      location: "United States (Remote)",
      description: "Built the core web client from scratch, optimizing rendering performance and design system integration."
    },
    {
      id: "exp-3",
      company: "Upsurge Labs",
      role: "Backend Developer Intern",
      period: "June 2025 - July 2025",
      location: "Bangalore, India (On-Site)",
      description: "Designed high-throughput API endpoints and managed relational database schemas."
    },
    {
      id: "exp-4",
      company: "TechNova Corp",
      role: "Software Engineering Fellow",
      period: "January 2025 - May 2025",
      location: "Remote",
      description: "Collaborated in an agile environment delivering full stack web features and open source tools."
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "Portfolio-Builder",
      description: "Automated, customizable developer portfolio generator with live GitHub sync.",
      url: "https://github.com/Aaryany25/Portfolio-Builder",
      language: "TypeScript",
      stars: 12,
      forks: 4,
      tags: ["Next.js", "Tailwind", "NextAuth"]
    },
    {
      id: "proj-2",
      name: "AI Code Synthesizer",
      description: "An intelligent dev assistant for rapid boilerplate creation and refactoring.",
      url: "https://github.com/Aaryany25",
      language: "Python",
      stars: 45,
      forks: 8,
      tags: ["Python", "FastAPI", "AI"]
    }
  ],
  socialLinks: {
    github: "https://github.com/Aaryany25",
    linkedin: "https://linkedin.com/in/aaryan",
    twitter: "https://x.com/aaryan",
    youtube: "",
    instagram: "",
    substack: "",
    website: ""
  },
  updatedAt: new Date().toISOString()
};
