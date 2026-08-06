"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import Template1 from "../components/Template1";
import { Sparkles, LayoutGrid, Loader2 } from "lucide-react";

function TemplatePageInner() {
  const searchParams = useSearchParams();
  const { portfolio, updatePortfolio } = usePortfolio();

  // Selected template state ('template-1')
  const [selectedTemplate, setSelectedTemplate] = useState<"template-1">("template-1");

  useEffect(() => {
    if (portfolio.templateId !== "template-1") {
      updatePortfolio({ templateId: "template-1" });
    }
  }, [portfolio.templateId, updatePortfolio]);

  return (
    <div className="relative min-h-screen">
      {/* Top Floating Template Bar */}
      {/* <div className="sticky top-0 z-50 bg-zinc-900/90 text-white backdrop-blur-md border-b border-zinc-800 px-4 py-2 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Active Template:</span>
          <span className="text-white font-bold underline decoration-blue-500">
            Template 1 (Classic Minimalist)
          </span>
        </div>
      </div> */}

      {/* Render Template 1 */}
      <Template1 />
    </div>
  );
}

export default function TemplatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span>Loading portfolio template...</span>
        </div>
      }
    >
      <TemplatePageInner />
    </Suspense>
  );
}