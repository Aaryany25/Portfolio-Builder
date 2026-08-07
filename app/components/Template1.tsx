"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePortfolio } from "@/context/PortfolioContext";
import GithubHeatmap from "./GithubHeatmap";
import {
  Search,
  Moon,
  Sun,
  ExternalLink,
  Mail,
  X,
  Star,
  GitFork,
  MapPin,
  Edit3,
  FolderGit2,
} from "lucide-react";

// Social Icons SVGs
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

export default function Template1() {
  const searchParams = useSearchParams();
  const { portfolio, loadUserPortfolio } = usePortfolio();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [inputUsername, setInputUsername] = useState(portfolio.githubUsername || "Aaryany25");
  const [currentUsername, setCurrentUsername] = useState(portfolio.githubUsername || "Aaryany25");
  const [githubUser, setGithubUser] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  // Sync username from URL query param or context portfolio
  useEffect(() => {
    const urlUser = searchParams?.get("username") || searchParams?.get("user");
    if (urlUser) {
      const parsed = extractUsername(urlUser);
      setCurrentUsername(parsed);
      setInputUsername(parsed);
      loadUserPortfolio(parsed);
    } else if (portfolio.githubUsername) {
      setCurrentUsername(portfolio.githubUsername);
      setInputUsername(portfolio.githubUsername);
    }
  }, [searchParams, portfolio.githubUsername, loadUserPortfolio]);

  // Fetch GitHub API data for repos and activity
  const fetchGithubData = useCallback(async (user: string) => {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}`),
        fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=6`),
      ]);

      if (userRes.ok) {
        const userData: GithubProfile = await userRes.json();
        setGithubUser(userData);
      } else {
        setGithubUser(null);
      }

      if (reposRes.ok) {
        const reposData: GithubRepo[] = await reposRes.json();
        setRepos(reposData);
      } else {
        setRepos([]);
      }
    } catch {
      setGithubUser(null);
      setRepos([]);
    }
  }, []);

  useEffect(() => {
    fetchGithubData(currentUsername);
  }, [currentUsername, fetchGithubData]);

  // Keyboard shortcut Ctrl+K
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

  const experiences = portfolio.experiences?.length > 0 ? portfolio.experiences : [];
  const visibleExperiences = showAllExperience ? experiences : experiences.slice(0, 3);
  const visibleRepos = showAllRepos ? repos : repos.slice(0, 3);

  // Derive display values from Context Portfolio with fallbacks
  const displayName = portfolio.name || githubUser?.name || currentUsername;
  const displayTagline = portfolio.tagline || githubUser?.bio || "Full Stack Software Engineer";
  const displayBio = portfolio.bio || githubUser?.bio || "Building modern web applications and open source tools.";
  const displayAbout = portfolio.about || displayBio;
  const displayLocation = portfolio.location || githubUser?.location || "Remote Developer";
  const displayAvatar = portfolio.avatarUrl || githubUser?.avatar_url || "https://github.com/Aaryany25.png";
  const displayEmail = portfolio.email || githubUser?.email || "";

  return (
    <div className={`min-h-screen relative ${isDarkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-[#fcfbf9] text-zinc-900"} font-sans transition-colors duration-200 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900 pb-16`}>
      {/* Outer Centered Container */}
      {/* <div className="w-30 min-h-screen bg-red-500 "></div */}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
       {/* <div className='absolute inset-y-0 left-50 h-full w-20  bg-gradient-to-b from-neutral-300/50 via-neutral-200 to-transparent '></div> */}
        
        {/* Top Header / Navigation */}
        <header className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <nav className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
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
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
              title="Edit details in User Dashboard"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-xs px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400 font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
            </button>
          </div>
        </header>

        {/* Profile / Intro Section */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-2">
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {displayName}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              {displayTagline}
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {displayLocation}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for work
              </span>
            </div>
          </div>

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0 bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={displayAvatar}
              alt={displayName}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>

        {/* About Section */}
        <section className="flex flex-col gap-2">
          <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
            About
          </h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {displayAbout}
          </p>
        </section>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience Section */}
        {experiences.length > 0 && (
          <section id="work" className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
                Work Experience
              </h2>
              {experiences.length > 3 && (
                <button
                  onClick={() => setShowAllExperience(!showAllExperience)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {showAllExperience ? "Show less" : `View all (${experiences.length})`}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {visibleExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors gap-2"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                        {exp.company}
                      </span>
                      {exp.status && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {exp.status}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {exp.role} {exp.location ? `• ${exp.location}` : ""}
                    </span>
                    {exp.description && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap self-start sm:self-center">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GitHub Live Heatmap Section */}
        <section id="contributions" className="flex flex-col gap-3">
          <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
            GitHub Contributions ({currentUsername})
          </h2>
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden shadow-xs">
            <GithubHeatmap username={currentUsername} isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
              Projects
            </h2>
            {repos.length > 3 && (
              <button
                onClick={() => setShowAllRepos(!showAllRepos)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {showAllRepos ? "Show less" : `View all repos (${repos.length})`}
              </button>
            )}
          </div>

          {/* Custom Projects from Context or Repos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex flex-col justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all gap-3"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                        <FolderGit2 className="w-4 h-4 text-blue-500" />
                        {proj.name}
                      </span>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                      {proj.tags.map((t, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              visibleRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex flex-col justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all gap-3"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {repo.name}
                      </span>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-zinc-400" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Social Links & Contact */}
        <section className="flex flex-col gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
            Connect
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {portfolio.socialLinks?.github && (
              <a
                href={portfolio.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {portfolio.socialLinks?.twitter && (
              <a
                href={portfolio.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                <span>Twitter / X</span>
              </a>
            )}
            {portfolio.socialLinks?.linkedin && (
              <a
                href={portfolio.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
              </a>
            )}
            {displayEmail && (
              <a
                href={`mailto:${displayEmail}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-blue-600 dark:text-blue-400 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me</span>
              </a>
            )}
          </div>
        </section>

      </div>

      {/* Ctrl+K Search Dialog Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
            <form onSubmit={handleUserSearchSubmit} className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800">
              <Search className="w-4 h-4 text-zinc-400 mr-2" />
              <input
                type="text"
                placeholder="Enter GitHub username (e.g. torvalds)..."
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="w-full py-3.5 text-sm bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-between text-xs text-zinc-400">
              <span>Press enter to load profile</span>
              <kbd className="font-mono bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px]">
                ESC to close
              </kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
