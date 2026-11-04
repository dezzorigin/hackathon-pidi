"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { Button } from "@/components/ui/Button";
import { formatRupiah } from "@/lib/utils";
import { ShieldAlert, Sliders, RefreshCw, Briefcase, Percent, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { userProfile, balances, updateProfile, resetState } = useApp();
  const [buffer, setBuffer] = useState<number>(balances.safeBufferLimit);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileTypeChange = (type: "freelancer" | "debt_focus" | "wealth_focus") => {
    updateProfile({ profileType: type });
  };

  const handleSaveBuffer = () => {
    setIsUpdating(true);
    setTimeout(() => {
      updateProfile({ safeBufferLimit: buffer });
      setIsUpdating(false);
      alert("Safe Buffer Limit berhasil disimpan!");
    }, 800);
  };

  const profileOptions = [
    {
      id: "freelancer" as const,
      label: "Freelancer / Arus Kas Harian",
      icon: Briefcase,
      badgeBg: "bg-pastel-yellow text-charcoal-dark",
    },
    {
      id: "debt_focus" as const,
      label: "Fokus Pelunasan Utang",
      icon: Percent,
      badgeBg: "bg-soft-coral text-white",
    },
    {
      id: "wealth_focus" as const,
      label: "Wealth & Investasi",
      icon: TrendingUp,
      badgeBg: "bg-pastel-sage text-charcoal-dark",
    },
  ];

  return (
    <div className="flex flex-col flex-1 pb-24 px-4 pt-4 gap-5">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
          Preferences & Settings
        </span>
        <Typography variant="h1" className="text-xl font-bold text-charcoal-dark mt-0.5">
          Profil & Pengaturan
        </Typography>
        <p className="text-xs text-muted-gray mt-1">
          Kelola simulasi tipe akun CFO LUNAS untuk pengujian instan.
        </p>
      </div>

      {/* Account Info Card */}
      <InsightCard variant="white" className="p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-charcoal text-pastel-yellow flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
          {userProfile.name ? userProfile.name.charAt(0) : "U"}
        </div>
        <div>
          <Typography variant="h2" className="font-extrabold text-charcoal-dark text-base leading-tight">
            {userProfile.name}
          </Typography>
          <Typography variant="body" className="text-xs text-muted-gray mt-0.5">
            {userProfile.email}
          </Typography>
          <span className="inline-block text-[9px] font-bold uppercase bg-[#F0EFE9] text-charcoal-dark px-2 py-0.5 rounded-full mt-2">
            SNAP BI Connected
          </span>
        </div>
      </InsightCard>

      {/* Profile Focus Switcher Widget */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <Typography variant="h2" className="font-bold text-charcoal-dark text-base">
            Simulasi Tipe Profil CFO
          </Typography>
          <span className="text-[9px] font-extrabold bg-pastel-lavender text-charcoal-dark px-2.5 py-1 rounded-full uppercase tracking-wider">
            Hackathon Tool
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {profileOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = userProfile.profileType === opt.id;

            return (
              <InsightCard
                key={opt.id}
                variant={isSelected ? "dark" : "white"}
                className="p-4 cursor-pointer"
                onClick={() => handleProfileTypeChange(opt.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0",
                        isSelected ? "bg-white/10 text-pastel-yellow" : "bg-[#F0EFE9] text-charcoal-dark"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-bold",
                        isSelected ? "text-white" : "text-charcoal-dark"
                      )}
                    >
                      {opt.label}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-extrabold bg-pastel-yellow text-charcoal-dark px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Aktif
                    </span>
                  )}
                </div>
              </InsightCard>
            );
          })}
        </div>
      </div>

      {/* Safe Buffer Adjuster Limit */}
      <div className="flex flex-col gap-3">
        <Typography variant="h2" className="font-bold text-charcoal-dark text-base flex items-center gap-2 px-1">
          <Sliders className="w-4.5 h-4.5 text-charcoal-dark" />
          Sesuaikan Safe Buffer Limit
        </Typography>

        <InsightCard variant="white" className="p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-muted-gray">Batas Dana Cadangan</span>
            <span className="text-sm font-extrabold text-charcoal-dark">{formatRupiah(buffer)}</span>
          </div>

          <input
            type="range"
            min={500000}
            max={5000000}
            step={250000}
            value={buffer}
            onChange={(e) => setBuffer(parseInt(e.target.value))}
            className="w-full h-2 bg-[#F0EFE9] rounded-full appearance-none cursor-pointer accent-charcoal-dark"
          />

          <Button
            variant="dark"
            size="sm"
            isLoading={isUpdating}
            onClick={handleSaveBuffer}
            className="w-full py-3 text-xs font-bold mt-1"
          >
            Simpan Perubahan Limit
          </Button>
        </InsightCard>
      </div>

      {/* Reset Data Section */}
      <InsightCard variant="white" className="p-5 border-l-4 border-l-soft-coral">
        <div className="flex gap-3 items-start">
          <ShieldAlert className="w-5 h-5 text-soft-coral shrink-0 mt-0.5" />
          <div className="flex-1">
            <Typography variant="h2" className="font-bold text-sm text-charcoal-dark">
              Reset Data Demo
            </Typography>
            <p className="text-xs text-muted-gray leading-relaxed mt-1">
              Menghapus seluruh status local storage dan mengulang kembali alur onboarding dari awal.
            </p>
            <Button
              variant="danger"
              size="sm"
              className="mt-3 py-2.5 px-4 font-bold text-xs"
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin menyetel ulang data demo?")) {
                  resetState();
                  window.location.href = "/";
                }
              }}
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Reset & Ulang Onboarding
            </Button>
          </div>
        </div>
      </InsightCard>
    </div>
  );
}
