"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            PortfolioBuilder
          </span>
        </Link>

        {/* User Info / Sign In */}
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
          ) : session?.user ? (
            <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/80 p-1.5 pl-3 rounded-full border border-zinc-200/80 dark:border-zinc-700/60 shadow-sm">
              <div className="flex items-center gap-2.5">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-blue-500/30 object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium text-sm">
                    {session.user.name?.[0] || <User className="w-4 h-4" />}
                  </div>
                )}
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {session.user.name}
                  </span>
                  {session.user.email && (
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight truncate max-w-[120px]">
                      {session.user.email}
                    </span>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="h-8 rounded-full text-zinc-600 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium ml-1">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => signIn("github")}
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium shadow-sm transition-all flex items-center gap-2 rounded-full px-4"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Sign In with GitHub</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}