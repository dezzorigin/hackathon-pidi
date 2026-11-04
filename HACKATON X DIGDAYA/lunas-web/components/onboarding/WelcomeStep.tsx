"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { Sparkles, Coins, ArrowRight, ShieldCheck } from "lucide-react";

import { StepProps } from "./types";

export function WelcomeStep({ onNext }: StepProps) {
  return (
    <div className="flex flex-col flex-1 justify-between p-6 h-full text-charcoal-dark">
      <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
        {/* Animated Neo-Bento Icon Box */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-4xl bg-charcoal text-pastel-yellow flex items-center justify-center shadow-xl border border-slate-700/50">
            <Coins className="w-12 h-12 fill-current animate-bounce" />
          </div>
          <div className="absolute -top-2 -right-2 p-2 bg-pastel-yellow rounded-2xl shadow-md text-charcoal-dark">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
        </div>

        <Typography variant="metric" className="mb-3 text-charcoal-dark font-extrabold text-3xl">
          LUNAS
        </Typography>

        <p className="text-muted-gray max-w-xs text-sm leading-relaxed font-medium mb-6">
          Kendalikan keuanganmu dengan lebih cerdas dan tenang. Mulai langkah pertamamu hari ini bersama CFO AI Pribadimu.
        </p>

        <InsightCard variant="white" className="p-4 flex items-center gap-3 text-left max-w-xs border border-[#E8E7E0]">
          <ShieldCheck className="w-6 h-6 text-pastel-lavender shrink-0" />
          <div>
            <span className="text-xs font-bold text-charcoal-dark block">Zero-Friction CFO</span>
            <span className="text-[10px] text-muted-gray">Algoritma pintar penyapu utang & investasi</span>
          </div>
        </InsightCard>
      </div>

      <div className="mt-auto pt-4">
        <Button variant="dark" className="w-full py-4 text-sm font-bold shadow-lg" onClick={onNext}>
          Mulai Langkah Pertama
          <ArrowRight className="w-4 h-4 ml-2 text-pastel-yellow" />
        </Button>
        <p className="text-center text-[10px] text-muted-gray mt-4 leading-relaxed">
          Dengan melanjutkan, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi LUNAS.
        </p>
      </div>
    </div>
  );
}
