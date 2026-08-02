"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePortfolio } from "@/context/PortfolioContext";
import { WorkExperience, Project } from "@/lib/portfolioTypes";
import {
  User,
  Briefcase,
  FolderGit2,
  Code2,
  Share2,
  Save,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { portfolio, updatePortfolio, savePortfolio, saving, resetToDefault, loading } = usePortfolio();

  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "projects" | "skills" | "socials">("profile");
  const [newSkill, setNewSkill] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // New experience form state
  const [newExp, setNewExp] = useState<Partial<WorkExperience>>({
    company: "",
    role: "",
    period: "",
    location: "",
    status: "",
    description: "",
  });

  // New project form state
  const [newProj, setNewProj] = useState<Partial<Project>>({
    name: "",
    description: "",
    url: "",
    language: "TypeScript",
    tags: [],
  });
  const [newProjTag, setNewProjTag] = useState("");

  const handleSave = async () => {
    setSaveSuccess(false);
    setSaveError(null);
    const success = await savePortfolio();
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setSaveError("Failed to save changes. Please try again.");
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (portfolio.skills.includes(newSkill.trim())) return;
    updatePortfolio({
      skills: [...portfolio.skills, newSkill.trim()],
    });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updatePortfolio({
      skills: portfolio.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.company || !newExp.role) return;
    const created: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: newExp.company,
      role: newExp.role,
      period: newExp.period || "2026 - Present",
      location: newExp.location || "Remote",
      status: newExp.status,
      description: newExp.description,
    };
    updatePortfolio({
      experiences: [created, ...portfolio.experiences],
    });
    setNewExp({ company: "", role: "", period: "", location: "", status: "", description: "" });
  };

  const handleRemoveExperience = (id: string) => {
    updatePortfolio({
      experiences: portfolio.experiences.filter((exp) => exp.id !== id),
    });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.name || !newProj.description) return;
    const created: Project = {
      id: `proj-${Date.now()}`,
      name: newProj.name,
      description: newProj.description,
      url: newProj.url || "",
      language: newProj.language || "TypeScript",
      tags: newProj.tags || [],
    };
    updatePortfolio({
      projects: [created, ...portfolio.projects],
    });
    setNewProj({ name: "", description: "", url: "", language: "TypeScript", tags: [] });
  };

  const handleRemoveProject = (id: string) => {
    updatePortfolio({
      projects: portfolio.projects.filter((p) => p.id !== id),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-sm text-zinc-400 font-mono">Loading user dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-600 selection:text-white pb-20">
      {/* Top Banner & Header */}
      <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight">User Dashboard</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Live Portfolio Editor
                </span>
              </div>
              <p className="text-xs text-zinc-400">Manage and persist your portfolio information</p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefault}
              className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset form fields to default template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <Link
              href={`/Template?username=${encodeURIComponent(portfolio.githubUsername || portfolio.name)}`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>View Template</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 mt-8">
        {/* Save Status Banners */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Your portfolio details have been successfully saved and persisted!</span>
            </div>
            <Link
              href={`/Template?username=${encodeURIComponent(portfolio.githubUsername)}`}
              className="underline hover:text-emerald-300 font-semibold ml-2"
            >
              Open Template &rarr;
            </Link>
          </div>
        )}

        {saveError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Auth Status Card */}
        <div className="mb-8 p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={56}
                height={56}
                unoptimized
                className="rounded-2xl ring-2 ring-blue-500/40 object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xl flex items-center justify-center">
                {portfolio.name?.[0] || "U"}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{session?.user?.name || portfolio.name}</h2>
                {session?.user && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    GitHub Session Active
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {session?.user?.email || portfolio.email || "Local user session"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session?.user ? (
              <button
                onClick={() => signOut()}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Connect GitHub Account</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "profile"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Details</span>
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "experience"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work Experience ({portfolio.experiences?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "projects"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Featured Projects ({portfolio.projects?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "skills"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Skills & Tech ({portfolio.skills?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("socials")}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === "socials"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Links</span>
          </button>
        </div>

        {/* Tab 1: Personal Profile */}
        {activeTab === "profile" && (
          <div className="space-y-6 bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Personal Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={portfolio.name || ""}
                  onChange={(e) => updatePortfolio({ name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Aaryan Parmar"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Headline / Tagline</label>
                <input
                  type="text"
                  value={portfolio.tagline || ""}
                  onChange={(e) => updatePortfolio({ tagline: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Full Stack Engineer & Open Source Enthusiast"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">GitHub Username (for Repos & Heatmap)</label>
                <input
                  type="text"
                  value={portfolio.githubUsername || ""}
                  onChange={(e) => updatePortfolio({ githubUsername: e.target.value.trim() })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="e.g. Aaryany25"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={portfolio.email || ""}
                  onChange={(e) => updatePortfolio({ email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. dev@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Location</label>
                <input
                  type="text"
                  value={portfolio.location || ""}
                  onChange={(e) => updatePortfolio({ location: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Hyderabad, India"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Avatar Image URL</label>
                <input
                  type="text"
                  value={portfolio.avatarUrl || ""}
                  onChange={(e) => updatePortfolio({ avatarUrl: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 font-mono"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Short Bio (Hero section)</label>
              <input
                type="text"
                value={portfolio.bio || ""}
                onChange={(e) => updatePortfolio({ bio: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                placeholder="Short bio summary..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">About Me (Detailed description)</label>
              <textarea
                rows={4}
                value={portfolio.about || ""}
                onChange={(e) => updatePortfolio({ about: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 leading-relaxed"
                placeholder="Write a detailed introduction about your background and interests..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Resume / CV Link</label>
              <input
                type="text"
                value={portfolio.resumeUrl || ""}
                onChange={(e) => updatePortfolio({ resumeUrl: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
        )}

        {/* Tab 2: Work Experience */}
        {activeTab === "experience" && (
          <div className="space-y-8">
            {/* Add Experience Form */}
            <form onSubmit={handleAddExperience} className="bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add Work Experience</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name (e.g. Google)"
                  value={newExp.company || ""}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Role / Title (e.g. Senior Frontend Engineer)"
                  value={newExp.role || ""}
                  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Period (e.g. Jan 2025 - Present)"
                  value={newExp.period || ""}
                  onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location (e.g. Remote / On-Site)"
                  value={newExp.location || ""}
                  onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Short description of your responsibilities and achievements..."
                value={newExp.description || ""}
                onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience Entry</span>
              </button>
            </form>

            {/* List Existing Experiences */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Current Work Experiences ({portfolio.experiences?.length || 0})
              </h4>

              {portfolio.experiences?.length === 0 ? (
                <div className="p-8 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800 text-zinc-500 text-xs">
                  No work experiences added yet. Fill out the form above to add your history.
                </div>
              ) : (
                portfolio.experiences?.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{exp.company}</span>
                        {exp.status && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                            {exp.status}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-zinc-300">{exp.role}</p>
                      <p className="text-[11px] text-zinc-500">
                        {exp.period} &bull; {exp.location}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-zinc-400 pt-1 leading-relaxed">{exp.description}</p>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Remove experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Featured Projects */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Add Project Form */}
            <form onSubmit={handleAddProject} className="bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add Featured Project</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProj.name || ""}
                  onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Project / Repository URL"
                  value={newProj.url || ""}
                  onChange={(e) => setNewProj({ ...newProj, url: e.target.value })}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Project description..."
                value={newProj.description || ""}
                onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                required
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project Entry</span>
              </button>
            </form>

            {/* List Existing Projects */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Current Projects ({portfolio.projects?.length || 0})
              </h4>

              {portfolio.projects?.length === 0 ? (
                <div className="p-8 text-center bg-zinc-900/40 rounded-3xl border border-zinc-800 text-zinc-500 text-xs">
                  No custom projects added yet.
                </div>
              ) : (
                portfolio.projects?.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{proj.name}</span>
                        {proj.language && (
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-300 rounded-md">
                            {proj.language}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{proj.description}</p>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-400 hover:underline inline-flex items-center gap-1 pt-1"
                        >
                          <span>{proj.url}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      title="Remove project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Skills & Tech Stack */}
        {activeTab === "skills" && (
          <div className="bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Manage Tech Stack & Skills</span>
            </h3>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Enter skill or framework (e.g. Next.js, Docker, Go)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>

            {/* Render Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {portfolio.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-200 flex items-center gap-2 group hover:border-zinc-700 transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                    title={`Remove ${skill}`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Social Links */}
        {activeTab === "socials" && (
          <div className="bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>Social & External Profiles</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">GitHub Profile URL</label>
                <input
                  type="text"
                  value={portfolio.socialLinks?.github || ""}
                  onChange={(e) =>
                    updatePortfolio({
                      socialLinks: { ...portfolio.socialLinks, github: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={portfolio.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    updatePortfolio({
                      socialLinks: { ...portfolio.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">X / Twitter URL</label>
                <input
                  type="text"
                  value={portfolio.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    updatePortfolio({
                      socialLinks: { ...portfolio.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  placeholder="https://x.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">YouTube Channel URL</label>
                <input
                  type="text"
                  value={portfolio.socialLinks?.youtube || ""}
                  onChange={(e) =>
                    updatePortfolio({
                      socialLinks: { ...portfolio.socialLinks, youtube: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  placeholder="https://youtube.com/@..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Instagram Profile URL</label>
                <input
                  type="text"
                  value={portfolio.socialLinks?.instagram || ""}
                  onChange={(e) =>
                    updatePortfolio({
                      socialLinks: { ...portfolio.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Personal Website URL</label>
                <input
                  type="text"
                  value={portfolio.socialLinks?.website || ""}
                  onChange={(e) =>
                    updatePortfolio({
                      socialLinks: { ...portfolio.socialLinks, website: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500"
                  placeholder="https://yourdomain.com"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
