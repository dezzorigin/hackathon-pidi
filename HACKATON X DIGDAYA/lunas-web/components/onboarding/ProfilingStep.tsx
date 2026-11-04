"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { DollarSign, Percent, TrendingUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { StepProps } from "./types";

export function ProfilingStep({ onNext, data, setData }: StepProps) {
  const [selectedType, setSelectedType] = useState<
    "freelancer" | "debt_focus" | "wealth_focus"
  >(data.profileType || "debt_focus");

  const options = [
    {
      id: "freelancer" as const,
      title: "Atur pengeluaran harian",
      badge: "Pekerja Harian / Freelance",
      description: "Pantau arus kas harian dan amankan pengeluaran tidak terduga agar keuanganmu stabil.",
      icon: DollarSign,
      bgVariant: "yellow" as const,
    },
    {
      id: "debt_focus" as const,
      title: "Fokus lunasi utang",
      badge: "Bebas Utang Terstruktur",
      description: "Kelompokkan utang secara otomatis dan temukan cara melunasinya dengan metode Avalanche tercepat.",
      icon: Percent,
      bgVariant: "dark" as const,
    },
    {
      id: "wealth_focus" as const,
      title: "Mulai kembangkan dana",
      badge: "Fokus Investasi & Aset",
      description: "Optimalkan aset investasi dan tabunganmu secara pasif dengan rekomendasi imbal hasil terbaik.",
      icon: TrendingUp,
      bgVariant: "sage" as const,
    },
  ];

  const handleNext = () => {
    setData({
      ...data,
      profileType: selectedType,
    });
    onNext();
  };

  return (
    <div className="flex flex-col flex-1 justify-between p-6 h-full text-charcoal-dark">
      <div className="pt-2">
        <Typography variant="h1" className="mb-1 text-2xl font-bold text-charcoal-dark">
          Apa Fokus Keuanganmu?
        </Typography>
        <p className="text-xs text-muted-gray mb-5">
          Pilih profil di bawah ini untuk mengonfigurasi algoritma CFO LUNAS.
        </p>

        <div className="flex flex-col gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedType === option.id;

            return (
              <InsightCard
                key={option.id}
                variant={isSelected ? option.bgVariant : "white"}
                className={`p-5 cursor-pointer transition-all duration-300 relative ${
                  isSelected ? "ring-2 ring-charcoal-dark shadow-md" : ""
                }`}
                onClick={() => setSelectedType(option.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0",
                        isSelected && option.bgVariant === "dark"
                          ? "bg-white/10 text-pastel-yellow"
                          : "bg-black/5 text-charcoal-dark"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span
                        className={cn(
                          "text-[10px] font-extrabold tracking-wider uppercase block",
                          isSelected && option.bgVariant === "dark"
                            ? "text-pastel-yellow"
                            : "text-muted-gray"
                        )}
                      >
                        {option.badge}
                      </span>
                      <Typography
                        variant="h2"
                        className={cn(
                          "mt-0.5 text-sm font-bold",
                          isSelected && option.bgVariant === "dark"
                            ? "text-white"
                            : "text-charcoal-dark"
                        )}
                      >
                        {option.title}
                      </Typography>
                      <p
                        className={cn(
                          "text-xs mt-1 leading-relaxed font-medium",
                          isSelected && option.bgVariant === "dark"
                            ? "text-slate-300"
                            : "text-muted-gray"
                        )}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-2",
                        option.bgVariant === "dark" ? "bg-pastel-yellow text-charcoal-dark" : "bg-charcoal-dark text-white"
                      )}
                    >
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                  )}
                </div>
              </InsightCard>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-2">
        <Button variant="dark" className="w-full py-4 text-xs font-bold" onClick={handleNext}>
          Pilih & Lanjutkan
        </Button>
      </div>
    </div>
  );
}
