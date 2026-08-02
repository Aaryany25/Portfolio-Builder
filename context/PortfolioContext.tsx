"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { UserProfileData, DEFAULT_PORTFOLIO } from "@/lib/portfolioTypes";

interface PortfolioContextType {
  portfolio: UserProfileData;
  loading: boolean;
  saving: boolean;
  error: string | null;
  updatePortfolio: (updates: Partial<UserProfileData>) => void;
  savePortfolio: (dataToSave?: UserProfileData) => Promise<boolean>;
  loadUserPortfolio: (userIdentifier: string) => Promise<void>;
  resetToDefault: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "user_portfolio_data_v1";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [portfolio, setPortfolio] = useState<UserProfileData>(DEFAULT_PORTFOLIO);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Derive current user key from session
  const getUserKey = useCallback(() => {
    if (session?.user?.email) return session.user.email;
    if (session?.user?.name) return session.user.name.replace(/\s+/g, "_");
    return "default";
  }, [session]);

  // Load portfolio from API or local storage
  const loadUserPortfolio = useCallback(async (userIdentifier: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Try local storage first for speed
      const localData = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${userIdentifier.toLowerCase()}`);
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          setPortfolio(parsed);
        } catch {
          // ignore parsing error
        }
      }

      // 2. Fetch from server API
      const res = await fetch(`/api/portfolio?user=${encodeURIComponent(userIdentifier)}`);
      if (res.ok) {
        const serverData: UserProfileData = await res.json();
        if (serverData) {
          setPortfolio((prev) => ({
            ...DEFAULT_PORTFOLIO,
            ...serverData,
            // Preserve session info if present
            avatarUrl: serverData.avatarUrl || session?.user?.image || prev.avatarUrl,
            email: serverData.email || session?.user?.email || prev.email,
            name: serverData.name || session?.user?.name || prev.name,
          }));
          localStorage.setItem(
            `${LOCAL_STORAGE_KEY}_${userIdentifier.toLowerCase()}`,
            JSON.stringify(serverData)
          );
        }
      }
    } catch (err: any) {
      console.error("Failed to load user portfolio:", err);
      setError(err?.message || "Failed to load user portfolio");
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Initial load when session status resolves
  useEffect(() => {
    if (status === "loading") return;
    const userKey = getUserKey();
    loadUserPortfolio(userKey);
  }, [status, getUserKey, loadUserPortfolio]);

  // Synchronize context when session connects
  useEffect(() => {
    if (session?.user) {
      setPortfolio((prev) => {
        const nextGithubUser = prev.githubUsername || session.user?.name || "Aaryany25";
        return {
          ...prev,
          userId: prev.userId === "default" ? (session.user?.email || session.user?.name || "default") : prev.userId,
          name: prev.name === DEFAULT_PORTFOLIO.name && session.user?.name ? session.user.name : prev.name,
          email: session.user?.email || prev.email,
          avatarUrl: session.user?.image || prev.avatarUrl,
          githubUsername: nextGithubUser,
        };
      });
    }
  }, [session]);

  // Update in-memory portfolio state
  const updatePortfolio = (updates: Partial<UserProfileData>) => {
    setPortfolio((prev) => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      const userKey = (updated.userId || getUserKey()).toLowerCase();
      try {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_${userKey}`, JSON.stringify(updated));
      } catch {
        // ignore quota errors
      }
      return updated;
    });
  };

  // Save current portfolio to API & storage
  const savePortfolio = async (dataToSave?: UserProfileData): Promise<boolean> => {
    setSaving(true);
    setError(null);
    const targetData = dataToSave || portfolio;
    const userKey = targetData.userId || getUserKey();
    const payload = {
      ...targetData,
      userId: userKey,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const savedData: UserProfileData = await res.json();
      setPortfolio(savedData);

      localStorage.setItem(
        `${LOCAL_STORAGE_KEY}_${userKey.toLowerCase()}`,
        JSON.stringify(savedData)
      );
      return true;
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err?.message || "Failed to save portfolio to database");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    const userKey = getUserKey();
    setPortfolio({
      ...DEFAULT_PORTFOLIO,
      userId: userKey,
      name: session?.user?.name || DEFAULT_PORTFOLIO.name,
      email: session?.user?.email || DEFAULT_PORTFOLIO.email,
      avatarUrl: session?.user?.image || DEFAULT_PORTFOLIO.avatarUrl,
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        saving,
        error,
        updatePortfolio,
        savePortfolio,
        loadUserPortfolio,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
