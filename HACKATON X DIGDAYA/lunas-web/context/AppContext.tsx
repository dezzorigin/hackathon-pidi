"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  Balances,
  Debt,
  Asset,
  initialProfile,
  initialBalances,
  initialDebts,
  initialAssets,
} from "@/lib/data";

interface AppContextType {
  userProfile: UserProfile;
  balances: Balances;
  debts: Debt[];
  assets: Asset[];
  executeSweep: (amount: number, targetId: string, type: "debt" | "asset") => void;
  completeOnboarding: (profileData: {
    name: string;
    email: string;
    profileType: "freelancer" | "debt_focus" | "wealth_focus";
    safeBufferLimit: number;
  }) => void;
  updateProfile: (updatedFields: Partial<UserProfile>) => void;
  resetState: () => void;
  isMounted: boolean;
  isSmartModalOpen: boolean;
  setSmartModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [balances, setBalances] = useState<Balances>(initialBalances);
  const [debts, setDebts] = useState<Debt[]>(initialDebts);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isSmartModalOpen, setSmartModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("lunas_profile");
      const storedBalances = localStorage.getItem("lunas_balances");
      const storedDebts = localStorage.getItem("lunas_debts");
      const storedAssets = localStorage.getItem("lunas_assets");

      /* eslint-disable react-hooks/set-state-in-effect */
      if (storedProfile) setUserProfile(JSON.parse(storedProfile));
      if (storedBalances) setBalances(JSON.parse(storedBalances));
      if (storedDebts) setDebts(JSON.parse(storedDebts));
      if (storedAssets) setAssets(JSON.parse(storedAssets));
      /* eslint-enable react-hooks/set-state-in-effect */
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage on state changes
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("lunas_profile", JSON.stringify(userProfile));
      localStorage.setItem("lunas_balances", JSON.stringify(balances));
      localStorage.setItem("lunas_debts", JSON.stringify(debts));
      localStorage.setItem("lunas_assets", JSON.stringify(assets));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }, [userProfile, balances, debts, assets, isMounted]);

  const executeSweep = (amount: number, targetId: string, type: "debt" | "asset") => {
    // Deduct available balance
    setBalances((prev) => ({
      ...prev,
      availableBalance: Math.max(0, prev.availableBalance - amount),
    }));

    if (type === "debt") {
      setDebts((prev) =>
        prev.map((d) => {
          if (d.id === targetId) {
            return {
              ...d,
              amount: Math.max(0, d.amount - amount),
            };
          }
          return d;
        })
      );
    } else if (type === "asset") {
      setAssets((prev) =>
        prev.map((a) => {
          if (a.id === targetId) {
            return {
              ...a,
              amount: a.amount + amount,
            };
          }
          return a;
        })
      );
    }
  };

  const completeOnboarding = (profileData: {
    name: string;
    email: string;
    profileType: "freelancer" | "debt_focus" | "wealth_focus";
    safeBufferLimit: number;
  }) => {
    setUserProfile({
      name: profileData.name,
      email: profileData.email,
      profileType: profileData.profileType,
      safeBufferLimit: profileData.safeBufferLimit,
      isOnboarded: true,
    });
    setBalances((prev) => ({
      ...prev,
      safeBufferLimit: profileData.safeBufferLimit,
    }));
  };

  const updateProfile = (updatedFields: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const resetState = () => {
    setUserProfile(initialProfile);
    setBalances(initialBalances);
    setDebts(initialDebts);
    setAssets(initialAssets);
    try {
      localStorage.removeItem("lunas_profile");
      localStorage.removeItem("lunas_balances");
      localStorage.removeItem("lunas_debts");
      localStorage.removeItem("lunas_assets");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        balances,
        debts,
        assets,
        executeSweep,
        completeOnboarding,
        updateProfile,
        resetState,
        isMounted,
        isSmartModalOpen,
        setSmartModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
