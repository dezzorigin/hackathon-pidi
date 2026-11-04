"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "yellow" | "lavender" | "sage" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "py-2 px-4 text-xs min-h-[36px]",
    md: "py-3 px-5 text-sm min-h-[44px]",
    lg: "py-3.5 px-6 text-base min-h-[52px]",
  };

  const variantStyles = {
    primary: "bg-charcoal text-white hover:bg-[#2D3035] active:bg-charcoal-dark focus:ring-charcoal",
    dark: "bg-charcoal-dark text-white hover:bg-charcoal focus:ring-charcoal-dark",
    secondary: "bg-white text-charcoal-dark border border-[#E8E7E0] hover:bg-[#F9F8F3] focus:ring-slate-300",
    yellow: "bg-pastel-yellow text-charcoal-dark hover:bg-[#F2D780] focus:ring-[#F6DF95] font-bold",
    lavender: "bg-pastel-lavender text-charcoal-dark hover:bg-[#8F94FB] focus:ring-[#A3A7FC] font-bold",
    sage: "bg-pastel-sage text-charcoal-dark hover:bg-[#B3C7A8] focus:ring-[#C2D3B8] font-bold",
    ghost: "bg-transparent text-charcoal-dark hover:bg-black/5 active:bg-black/10 focus:ring-slate-300",
    danger: "bg-soft-coral text-white hover:bg-[#DC5C5C] focus:ring-[#E57373]",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
      ) : null}
      {children}
    </button>
  );
}
