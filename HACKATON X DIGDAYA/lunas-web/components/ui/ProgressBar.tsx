"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: "lavender" | "yellow" | "sage" | "coral" | "dark";
  showLabel?: boolean;
  label?: string;
  subLabel?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  color = "lavender",
  showLabel = true,
  label,
  subLabel,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));

  const colorStyles = {
    lavender: "bg-pastel-lavender",
    yellow: "bg-pastel-yellow",
    sage: "bg-pastel-sage",
    coral: "bg-soft-coral",
    dark: "bg-charcoal",
  };

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {showLabel && (label || subLabel) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-semibold text-muted-gray">{label}</span>}
          {subLabel && <span className="font-bold text-charcoal-dark">{subLabel}</span>}
        </div>
      )}
      <div className="w-full h-3 bg-[#F0EFE9] rounded-full overflow-hidden p-0.5 relative">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorStyles[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
