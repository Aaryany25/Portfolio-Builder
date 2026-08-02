"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "./components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, ShieldCheck, ArrowRight, Sparkles, LayoutGrid } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">


        {/* Main Hero Content */}
        <div className="flex flex-col items-center text-center gap-6 py-8 sm:py-14">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Portfolio Builder</span>
          </div> */}

          <h1 className="max-w-4xl text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Choose a Portfolio Template & Deploy in 5 Minutes
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Connect your GitHub, choose a modern portfolio template, customize your content, and publish instantly. Keep everything up to date with one-click GitHub sync.
          </p>
 <Button
                size="lg"
                // onClick={() => signIn("github")}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold shadow-lg transition-all flex items-center justify-center gap-3 text-base"
              >
                {/* <GithubIcon className="w-5 h-5" /> */}
                 <Link href="/Template" className=" transition-colors">
              View Templates
            </Link>
                {/* <span>View Templates</span> */}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
          {!session && (
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={() => signIn("github")}
                className="w-full sm:w-auto h-12 px-8 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold shadow-lg transition-all flex items-center justify-center gap-3 text-base"
              >
                <GithubIcon className="w-5 h-5" />
                <span>Login with GitHub</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
