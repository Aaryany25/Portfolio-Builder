"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { usePortfolio } from "@/context/PortfolioContext";
import GithubHeatmap from "../components/GithubHeatmap";
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
  Loader2,
  RefreshCw,
  Edit3,
  Globe,
  FileText,
  Briefcase,
  FolderGit2,
  Code2,
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

function TemplateContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { portfolio, loadUserPortfolio } = usePortfolio();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [inputUsername, setInputUsername] = useState(portfolio.githubUsername || "Aaryany25");
  const [currentUsername, setCurrentUsername] = useState(portfolio.githubUsername || "Aaryany25");
  const [githubUser, setGithubUser] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    setError(null);
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
    } catch (err: any) {
      setError(err?.message || "Failed to load GitHub API data.");
      setGithubUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
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
  const displayAvatar = portfolio.avatarUrl || githubUser?.avatar_url || "/pixel_dev_avatar.png";
  const displayEmail = portfolio.email || githubUser?.email || "";

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-zinc-950 text-zinc-100" : "bg-[#fcfbf9] text-zinc-900"} font-sans transition-colors duration-200 selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-zinc-900 pb-16`}>
      {/* Outer Centered Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
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
            {/* Dashboard Link Shortcut */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
              title="Edit details in User Dashboard"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-600 dark:text-zinc-300">
                Ctrl K
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
            <div className="space-y-4 animate-pulse">
              <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            </div>
          ) : (
            <>
              {/* Avatar */}
              <div className="relative w-fit">
                <div className="absolute -top-6 left-6 text-base animate-bounce select-none">
                  ⚡
                </div>
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={displayAvatar}
                    alt={displayName}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* User Name & Subtitle */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {displayName}
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono flex flex-wrap items-center gap-1.5">
                  <span>@{githubUser?.login || currentUsername}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    {displayLocation}
                  </span>
                  {portfolio.socialLinks?.website && (
                    <>
                      <span>·</span>
                      <a
                        href={portfolio.socialLinks.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-zinc-700 dark:text-zinc-300 inline-flex items-center gap-0.5"
                      >
                        <Globe className="w-3 h-3" /> Website
                      </a>
                    </>
                  )}
                </p>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 pt-0.5">
                  {displayTagline}
                </p>
              </div>

              {/* Bio Line */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {displayBio}
              </p>

              {/* Live GitHub Stats Pill */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 px-3.5 py-1.5 rounded-full w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">Live Data —</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {githubUser?.public_repos || repos.length} Repositories · {githubUser?.followers || 0} Followers
                </span>
              </div>

              {/* Social Icons Strip */}
              <div className="flex items-center gap-3.5 pt-1 text-zinc-500 dark:text-zinc-400">
                {(portfolio.socialLinks?.github || githubUser?.html_url) && (
                  <a
                    href={portfolio.socialLinks?.github || githubUser?.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {portfolio.socialLinks?.twitter && (
                  <a
                    href={portfolio.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="X / Twitter"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>
                )}
                {portfolio.socialLinks?.linkedin && (
                  <a
                    href={portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {portfolio.socialLinks?.youtube && (
                  <a
                    href={portfolio.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
                {portfolio.socialLinks?.instagram && (
                  <a
                    href={portfolio.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {portfolio.socialLinks?.substack && (
                  <a
                    href={portfolio.socialLinks.substack}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="Substack"
                  >
                    <SubstackIcon className="w-4 h-4" />
                  </a>
                )}
                {displayEmail && (
                  <a
                    href={`mailto:${displayEmail}`}
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {portfolio.resumeUrl && portfolio.resumeUrl !== "#" && (
                  <a
                    href={portfolio.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
                    title="Resume"
                  >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>Resume</span>
                  </a>
                )}
              </div>
            </>
          )}
        </section>

        {/* Custom Featured Projects & Repositories Section */}
        <section id="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-500" />
              <span>Projects & Repositories</span>
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

          {/* Custom Saved Projects from Context */}
          {portfolio.projects?.length > 0 && (
            <div className="space-y-3">
              {portfolio.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                          {proj.name}
                        </h3>
                        {proj.language && (
                          <span className="text-[10px] font-medium bg-blue-500/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            {proj.language}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300">{proj.description}</p>
                    </div>

                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* GitHub API Repositories */}
          {repos.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                GitHub Repositories
              </h3>
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
                        {repo.description || "No description provided."}
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
          )}
        </section>

        {/* GitHub Heatmap Activity */}
        <section id="contributions">
          <GithubHeatmap username={currentUsername} isDarkMode={isDarkMode} />
        </section>

        {/* Experience Section */}
        <section id="work" className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span>Work Experience</span>
          </h2>

          <div className="space-y-4">
            {visibleExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-start justify-between text-xs gap-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                    <span>{exp.company}</span>
                    {exp.status && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {exp.status}
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 font-medium">{exp.role}</p>
                  {exp.description && (
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">{exp.description}</p>
                  )}
                </div>

                <div className="text-left sm:text-right text-zinc-400 dark:text-zinc-500 text-[11px] space-y-0.5 shrink-0">
                  <p className="font-medium text-zinc-600 dark:text-zinc-300">{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
            ))}
          </div>

          {experiences.length > 3 && (
            <div className="pt-1 text-center">
              <button
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-1.5 transition-colors cursor-pointer"
              >
                {showAllExperience ? "Show less" : `Show all work experiences (${experiences.length})`}
              </button>
            </div>
          )}
        </section>

        {/* Skills & Tech Stack Section */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            <span>Skills & Technologies</span>
          </h2>

          <div className="p-5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
            <div className="flex flex-wrap gap-2">
              {portfolio.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* About Summary Section */}
        {displayAbout && (
          <section className="p-6 rounded-2xl bg-zinc-100/60 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">About Me</h3>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {displayAbout}
            </p>
          </section>
        )}

        {/* Footer Section */}
        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Navigation Column */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                NAVIGATE
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
                <Link href="/dashboard" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Dashboard</Link>
                <Link href="#projects" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Projects</Link>
                <Link href="#work" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Experience</Link>
              </div>
            </div>

            {/* Social Grid Column */}
            <div className="space-y-2 sm:text-right">
              <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                CONNECT
              </h4>
              <div className="flex sm:justify-end gap-3 text-zinc-500 dark:text-zinc-400">
                {(portfolio.socialLinks?.github || githubUser?.html_url) && (
                  <a href={portfolio.socialLinks?.github || githubUser?.html_url} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {portfolio.socialLinks?.twitter && (
                  <a href={portfolio.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white">
                    <XIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {portfolio.socialLinks?.linkedin && (
                  <a href={portfolio.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {portfolio.socialLinks?.youtube && (
                  <a href={portfolio.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white">
                    <YoutubeIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {portfolio.socialLinks?.instagram && (
                  <a href={portfolio.socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 text-center sm:text-left text-[11px] text-zinc-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {displayName}. All rights reserved.
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

export default function TemplatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span>Loading template profile...</span>
          </div>
        </div>
      }
    >
      <TemplateContent />
    </Suspense>
  );
}