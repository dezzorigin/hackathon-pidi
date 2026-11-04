"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "metric" | "h1" | "h2" | "body" | "caption" | "hero" | "title" | "cardHeader";
  component?: React.ElementType;
  children: React.ReactNode;
}

export function Typography({
  variant = "body",
  component,
  children,
  className,
  ...props
}: TypographyProps) {
  let Component = component;
  let variantStyles = "";

  switch (variant) {
    case "metric":
    case "hero":
      Component = Component || "h1";
      variantStyles = "text-[28px] sm:text-[32px] font-extrabold tracking-tight text-charcoal-dark leading-[1.2]";
      break;
    case "h1":
    case "title":
      Component = Component || "h2";
      variantStyles = "text-[20px] sm:text-[22px] font-semibold text-charcoal-dark leading-[1.3]";
      break;
    case "h2":
    case "cardHeader":
      Component = Component || "h3";
      variantStyles = "text-[16px] sm:text-[18px] font-semibold text-charcoal-dark leading-[1.4]";
      break;
    case "body":
      Component = Component || "p";
      variantStyles = "text-[14px] sm:text-[15px] font-medium text-charcoal-dark leading-[1.5]";
      break;
    case "caption":
      Component = Component || "span";
      variantStyles = "text-[10px] sm:text-[11px] font-semibold text-muted-gray leading-none";
      break;
    default:
      Component = Component || "p";
      variantStyles = "text-[14px] sm:text-[15px] font-medium text-charcoal-dark leading-[1.5]";
  }

  return (
    <Component className={cn(variantStyles, className)} {...props}>
      {children}
    </Component>
  );
}
