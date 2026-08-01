"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import GithubHeatmap from "../components/GithubHeatmap";
import {
  Search,
  Moon,
  Sun,
  ExternalLink,
  Calendar,
  ArrowRight,
  Mail,
  X,
  Star,
  GitFork,
  MapPin,
  Users,
  Code,
  Loader2,
  RefreshCw,
} from "lucide-react";

// Social Icons SVGs for precision styling
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function SubstackIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

interface GithubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

function extractUsername(input: string): string {
  if (!input) return "Aaryany25";
  let cleaned = input.trim();
  if (cleaned.includes("github.com/")) {
    cleaned = cleaned.split("github.com/")[1]?.split("/")[0] || cleaned;
  }
  return cleaned.replace(/^@/, "").trim() || "Aaryany25";
}

export default function TemplatePage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [inputUsername, setInputUsername] = useState("Aaryany25");
  const [currentUsername, setCurrentUsername] = useState("Aaryany25");
  const [githubUser, setGithubUser] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize username from URL param or session
  useEffect(() => {
    const urlUser = searchParams?.get("username") || searchParams?.get("user");
    if (urlUser) {
      const parsed = extractUsername(urlUser);
      setCurrentUsername(parsed);
      setInputUsername(parsed);
    } else if (session?.user?.name) {
      const parsed = extractUsername(session.user.name);
      setCurrentUsername(parsed);
      setInputUsername(parsed);
    }
  }, [searchParams, session]);

  // Fetch GitHub API data
  const fetchGithubData = useCallback(async (user: string) => {
    setLoading(true);
    setError(null);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}`),
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=3`),
      ]);

      if (!userRes.ok) {
        throw new Error(`GitHub user "${user}" not found.`);
      }

      const userData: GithubProfile = await userRes.json();
      setGithubUser(userData);

      if (reposRes.ok) {
        const reposData: GithubRepo[] = await reposRes.json();
        setRepos(reposData);
      } else {
        setRepos([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load GitHub data.");
      setGithubUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGithubData(currentUsername);
  }, [currentUsername, fetchGithubData]);

  // Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUserSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;
    const clean = extractUsername(inputUsername);
    setCurrentUsername(clean);
  };

  const experiences = [
    {
      company: "ASBL",
      status: "Working",
      role: "SDE-L1 (Full Stack)",
      period: "January 2026 - Present",
      location: "Hyderabad, India (On-Site)",
    },
    {
      company: "Promote",
      role: "Founding Frontend Engineer",
      period: "August 2025 - December 2025",
      location: "United States (Remote)",
    },
    {
      company: "Upsurge Labs",
      role: "Backend Developer Intern",
      period: "June 2025 - July 2025",
      location: "Bangalore, India (On-Site)",
    },
    {
      company: "TechNova Corp",
      role: "Software Engineering Fellow",
      period: "January 2025 - May 2025",
      location: "Remote",
    },
  ];

  const visibleExperiences = showAllExperience ? experiences : experiences.slice(0, 3);
  const visibleRepos = showAllRepos ? repos : repos.slice(0, 3);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-[#fcfbf9] text-zinc-900"} font-sans transition-colors duration-200 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900`}>
      {/* Outer Centered Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
        {/* Top Header / Navigation */}
        <header className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <nav className="flex items-center gap-5">
            <Link href="#home" className="hover:text-zinc-900 dark:hover:text-white transition-colors font-medium text-zinc-900 dark:text-white">
              Home
            </Link>
            <Link href="#projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="#contributions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Activity
            </Link>
            <Link href="#work" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Experience
            </Link>
            <Link href="#resume" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Resume
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                Ctrl K
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* GitHub Username Switcher Bar */}
        <form onSubmit={handleUserSearchSubmit} className="flex items-center gap-2 bg-zinc-100/80 dark:bg-zinc-900/80 p-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-400 pl-2 text-xs font-mono">
            <GithubIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            <span>github.com/</span>
          </div>
          <input
            type="text"
            placeholder="enter github username..."
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span>Fetch Data</span>
          </button>
        </form>

        {/* Error Notification Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Profile / Bio Section */}
        <section id="home" className="flex flex-col gap-5 pt-1">
          {loading ? (
            /* Skeleton Shimmer Loading State */
            <div className="space-y-4 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
          ) : (
            <>
              {/* Avatar and Pixel Art Accent */}
              <div className="relative w-fit">
                <div className="absolute -top-6 left-6 text-base animate-bounce">
                  🐱
                </div>

                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={githubUser?.avatar_url || "/pixel_dev_avatar.png"}
                    alt={githubUser?.name || currentUsername}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* User Name & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {githubUser?.name || currentUsername}
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono flex flex-wrap items-center gap-1.5">
                  <span>@{githubUser?.login || currentUsername}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    {githubUser?.location || "Remote Developer"}
                  </span>
                  {githubUser?.blog && (
                    <>
                      <span>·</span>
                      <a
                        href={githubUser.blog.startsWith("http") ? githubUser.blog : `https://${githubUser.blog}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-zinc-700 dark:text-zinc-300 inline-flex items-center gap-0.5"
                      >
                        {githubUser.blog.replace(/^https?:\/\//, "")} <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  )}
                </p>
              </div>

              {/* Bio Line */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {githubUser?.bio || "Passionate software engineer building modern open-source web applications and high-performance tools."}
              </p>

              {/* Live GitHub Stats Pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 px-3.5 py-1.5 rounded-full w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">GitHub API Live —</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {githubUser?.public_repos || 0} Repositories · {githubUser?.followers || 0} Followers
                </span>
              </div>

              {/* Social Icons Strip */}
              <div className="flex items-center gap-3.5 pt-1 text-zinc-500 dark:text-zinc-400">
                {githubUser?.html_url && (
                  <a href={githubUser.html_url} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="GitHub Profile">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="X">
                  <XIcon className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="LinkedIn">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="YouTube">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="https://substack.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="Substack">
                  <SubstackIcon className="w-4 h-4" />
                </a>
                {githubUser?.email && (
                  <a href={`mailto:${githubUser.email}`} className="hover:text-zinc-900 dark:hover:text-white transition-colors" title="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </>
          )}
        </section>

        {/* GitHub Repositories / Projects Section */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span>GitHub Projects & Repositories</span>
              <span className="text-xs font-normal text-zinc-400">({repos.length})</span>
            </h2>
            {githubUser?.html_url && (
              <a
                href={`${githubUser.html_url}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>View all on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : repos.length > 0 ? (
            <div className="space-y-3">
              {visibleRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {repo.name}
                        </h3>
                        {repo.language && (
                          <span className="text-[10px] font-medium bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {repo.description || "No description provided for this repository."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 shrink-0">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-400">
              No public repositories found for this GitHub account.
            </div>
          )}

          {repos.length > 3 && (
            <div className="pt-1 text-center">
              <button
                onClick={() => setShowAllRepos(!showAllRepos)}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-1.5 transition-colors cursor-pointer"
              >
                {showAllRepos ? "Show less" : `Show all repositories (${repos.length})`}
              </button>
            </div>
          )}
        </section>

        {/* GitHub Heatmap Section */}
        <section id="contributions">
          <GithubHeatmap username={currentUsername} isDarkMode={isDarkMode} />
        </section>

        {/* Experience Section */}
        <section id="work" className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Experience
          </h2>

          <div className="space-y-4">
            {visibleExperiences.map((exp, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between text-xs gap-1 sm:gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                    <span>{exp.company}</span>
                    {exp.status && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {exp.status}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400">{exp.role}</p>
                </div>

                <div className="text-right sm:text-right text-zinc-400 dark:text-zinc-500 text-[11px] space-y-0.5">
                  <p className="font-medium text-zinc-500 dark:text-zinc-400">{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 text-center">
            <button
              onClick={() => setShowAllExperience(!showAllExperience)}
              className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-1.5 transition-colors cursor-pointer"
            >
              {showAllExperience ? "Show less" : "Show all work experiences"}
            </button>
          </div>
        </section>

        {/* Development Section */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Development & Gear
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Gears & Tech Stack
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Docker, Git.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                Terminal & Environment
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Zsh, Starship Prompt, VSCode / Cursor with GitHub Copilot & Antigravity.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="p-6 rounded-2xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 text-center space-y-2 relative overflow-hidden">
          <span className="absolute top-2 left-4 text-5xl opacity-10 text-zinc-400 font-serif select-none">
            “
          </span>
          <p className="font-mono italic text-xs text-zinc-700 dark:text-zinc-300 relative z-10">
            &quot;Code is like humor. When you have to explain it, it&apos;s bad.&quot;
          </p>
          <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 relative z-10">
            — Cory House
          </p>
        </section>

        {/* Footer Section */}
        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Navigation Column */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                NAVIGATE
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                <Link href="#home" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
                <Link href="#projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Projects</Link>
                <Link href="#work" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Experience</Link>
                <Link href="#resume" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Resume</Link>
              </div>
            </div>

            {/* Social Grid Column */}
            <div className="space-y-2 sm:text-right">
              <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                CONNECT
              </h4>
              <div className="flex sm:justify-end gap-3 text-zinc-500 dark:text-zinc-400">
                {githubUser?.html_url && (
                  <a href={githubUser.html_url} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white"><XIcon className="w-3.5 h-3.5" /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white"><LinkedinIcon className="w-3.5 h-3.5" /></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white"><YoutubeIcon className="w-3.5 h-3.5" /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white"><InstagramIcon className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center sm:text-left text-[11px] text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {githubUser?.name || currentUsername}. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Interactive Command Palette Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-zinc-400 w-full">
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects or repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 w-full"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-xs max-h-60 overflow-y-auto">
              <p className="text-[10px] font-semibold text-zinc-400 px-2 py-1">REPOSITORIES</p>
              {repos
                .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  >
                    <span>{repo.name}</span>
                    <span className="text-[10px] text-zinc-400">★ {repo.stargazers_count}</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}