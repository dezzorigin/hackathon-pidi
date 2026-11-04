"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { BottomNav } from "@/components/layout/BottomNav";
import { SmartActionModal } from "@/components/layout/SmartActionModal";
import { Loader2 } from "lucide-react";
import ClientOnly from "@/components/ClientOnly";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { userProfile, isMounted } = useApp();

  if (!isMounted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-cream">
        <Loader2 className="w-8 h-8 text-charcoal-dark animate-spin" />
        <span className="text-xs font-semibold text-muted-gray mt-2">Memuat LUNAS...</span>
      </div>
    );
  }

  if (!userProfile.isOnboarded) {
    return (
      <ClientOnly>
        <OnboardingWizard />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="flex-1 flex flex-col min-h-screen relative bg-cream">
        {/* Main content area */}
        <main className="flex-1 flex flex-col pb-4">
          {children}
        </main>

        {/* Persistent floating bottom nav bar */}
        <BottomNav />

        {/* Global popup Smart Sheet */}
        <SmartActionModal />
      </div>
    </ClientOnly>
  );
}
