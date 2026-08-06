export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  status?: string;
  description?: string;
  logoUrl?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  location?: string;
  logoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl?: string;
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
  imageUrl?: string;
  date?: string;
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
  templateId?: "template-1" | "template-2";
  photos?: string[];
  skills: string[];
  experiences: WorkExperience[];
  education?: Education[];
  testimonials?: Testimonial[];
  projects: Project[];
  socialLinks: SocialLinks;
  updatedAt: string;
}

export const DEFAULT_PORTFOLIO: UserProfileData = {
  userId: "default",
  name: "Lokesh",
  tagline: "Software Engineer & Builder",
  bio: "I am a software engineer and I love building things for users. Very active on Twitter.",
  about: "I talk a lot about software development on Twitter. I have worked on several side projects and open source software. I love building tools for developer community which help users to scale and train web apps.",
  location: "India",
  email: "lokesh@example.com",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  githubUsername: "Aaryany25",
  resumeUrl: "#",
  templateId: "template-1",
  photos: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=80"
  ],
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++"
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Peerlist Technologies",
      role: "SDE-1 Frontend",
      period: "Dec 2022 - Present",
      location: "Remote",
      status: "Working",
      description: "Building community platforms and high performance web applications.",
      logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"
    },
    {
      id: "exp-2",
      company: "ASBL",
      role: "Full Stack Engineer",
      period: "Jan 2022 - Nov 2022",
      location: "Hyderabad, India",
      description: "Developed internal microservices and responsive dashboards.",
      logoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80"
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "VTU University",
      degree: "B.Tech in Computer Science",
      period: "2018 - 2022",
      location: "India",
      logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&auto=format&fit=crop&q=80"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Akash Garg",
      role: "Founder @ Prompts Trend",
      content: "Lokesh is a talented computer engineer and his skills are exceptional. He built our web platform perfectly, capturing our vision. He exceeded our expectations with his speed, attention to detail and dedication.",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "test-2",
      name: "Vaibhav Kumar",
      role: "Co-Founder @ Craftworks",
      content: "As a premier Frontend developer, Lokesh consistently delivered high quality code & clean UI solutions. He is quick to adapt, has great design aesthetics, and brought tremendous value to our product delivery.",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
    }
  ],
  projects: [
    {
      id: "proj-1",
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
      id: "proj-2",
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
      id: "proj-3",
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
      id: "proj-4",
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
  ],
  socialLinks: {
    github: "https://github.com/Aaryany25",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    youtube: "",
    instagram: "",
    substack: "",
    website: ""
  },
  updatedAt: new Date().toISOString()
};

