"use client";

import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { ExternalLink, Loader2 } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface GithubHeatmapProps {
  username: string;
  isDarkMode?: boolean;
}

export default function GithubHeatmap({ username, isDarkMode = false }: GithubHeatmapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const cleanUsername = username ? username.trim() : "Aaryany25";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          {/* <GithubIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" /> */}
          <span>GitHub Contributions</span>
        </h2>
     
      </div>

      <div className="p-4 sm:p-5 rounded-lg bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 transition-all shadow-lg overflow-hidden">
        <div className="flex justify-center overflow-x-auto py-2">
          {mounted ? (
            <GitHubCalendar
              username={cleanUsername}
              colorScheme={isDarkMode ? "dark" : "light"}
              theme={theme}
              blockSize={9}
              blockMargin={2}
              fontSize={12}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
            />
          ) : (
            <div className="flex items-center justify-center p-8 text-zinc-400 text-xs gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading GitHub contributions...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
