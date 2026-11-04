"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Home, CreditCard, PieChart, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { setSmartModalOpen } = useApp();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Debts", href: "/debt", icon: CreditCard },
    { label: "FAB", href: "#", icon: Plus, isFab: true },
    { label: "Wealth", href: "/wealth", icon: PieChart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-99.5 h-16 bg-charcoal rounded-full px-4 flex items-center justify-between z-50 shadow-[0_12px_32px_rgba(0,0,0,0.35)] border border-slate-700/60 select-none">
      {navItems.map((item, idx) => {
        const Icon = item.icon;

        if (item.isFab) {
          return (
            <div key={idx} className="relative flex items-center justify-center -top-4">
              <button
                onClick={() => setSmartModalOpen(true)}
                className="w-13 h-13 rounded-full bg-pastel-lavender text-charcoal-dark flex items-center justify-center shadow-lg shadow-pastel-lavender/30 hover:bg-[#8F94FB] active:scale-90 transition-all duration-200 focus:outline-none ring-4 ring-charcoal group"
                aria-label="Smart Action Center"
              >
                <Plus className="w-7 h-7 font-bold transition-transform duration-300 group-hover:rotate-90 text-charcoal-dark" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-pastel-yellow rounded-full border-2 border-charcoal animate-ping" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-pastel-yellow rounded-full border-2 border-charcoal" />
              </button>
            </div>
          );
        }

        const isActive = pathname === item.href;

        return (
          <Link
            key={idx}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-full transition-all duration-200 active:scale-95",
              isActive
                ? "text-pastel-lavender"
                : "text-muted-gray hover:text-white"
            )}
          >
            <div className={cn("p-1.5 rounded-full transition-colors", isActive && "bg-pastel-lavender/15")}>
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform",
                  isActive ? "stroke-[2.2px] text-pastel-lavender" : "stroke-[1.8px]"
                )}
              />
            </div>
            <span className={cn("text-[9px] font-semibold tracking-tight", isActive ? "text-pastel-lavender" : "text-muted-gray")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
