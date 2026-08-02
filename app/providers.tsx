"use client";

import { SessionProvider } from "next-auth/react";
import { PortfolioProvider } from "@/context/PortfolioContext";

export default function Providers({ children }: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <PortfolioProvider>{children}</PortfolioProvider>
    </SessionProvider>
  );
}