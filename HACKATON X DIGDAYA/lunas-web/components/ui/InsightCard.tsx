"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "dark" | "yellow" | "lavender" | "sage" | "transparent";
  hoverable?: boolean;
  pressable?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function InsightCard({
  variant = "white",
  hoverable = true,
  pressable = true,
  children,
  className,
  ...props
}: InsightCardProps) {
  const variantStyles = {
    white: "bg-white text-charcoal-dark border border-[#E8E7E0] shadow-[0_8px_24px_rgba(0,0,0,0.03)]",
    dark: "bg-charcoal text-white border border-[#2D3035]",
    yellow: "bg-pastel-yellow text-charcoal-dark border border-[#E8D080]",
    lavender: "bg-pastel-lavender text-charcoal-dark border border-[#8C90FA]",
    sage: "bg-pastel-sage text-charcoal-dark border border-[#AEC2A4]",
    transparent: "bg-transparent border border-dashed border-muted-gray/30 text-charcoal-dark",
  };

  return (
    <div
      className={cn(
        "rounded-[28px] sm:rounded-4xl p-5 transition-all duration-300 relative overflow-hidden select-none",
        variantStyles[variant],
        hoverable && "hover:shadow-md hover:-translate-y-0.5",
        pressable && "active:scale-[0.97] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
