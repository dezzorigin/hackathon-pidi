"use client";

import React from "react";

export function MobileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-cream flex flex-col items-center">
      <div className="w-full max-w-120 min-h-screen flex flex-col relative bg-cream">
        {children}
      </div>
    </div>
  );
}
