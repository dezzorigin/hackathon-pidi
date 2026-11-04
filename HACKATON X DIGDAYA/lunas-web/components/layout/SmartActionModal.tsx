"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { formatRupiah } from "@/lib/utils";
import { Sparkles, X, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function SmartActionModal() {
  const { isSmartModalOpen, setSmartModalOpen, debts, balances, executeSweep } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [executed, setExecuted] = useState(false);

  if (!isSmartModalOpen) return null;

  // Highest APR debt for Avalanche recommendation
  const targetDebt = [...debts].sort((a, b) => b.apr - a.apr).find((d) => d.amount > 0) || debts[0];
  const sweepAmount = 350000;

  const handle1TapSweep = () => {
    if (!targetDebt) return;
    setIsProcessing(true);
    setTimeout(() => {
      executeSweep(Math.min(sweepAmount, targetDebt.amount), targetDebt.id, "debt");
      setIsProcessing(false);
      setExecuted(true);
      setTimeout(() => {
        setExecuted(false);
        setSmartModalOpen(false);
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-107.5 bg-[#FFFFFF] rounded-t-4xl sm:rounded-4xl p-6 text-charcoal-dark shadow-2xl relative border border-[#E8E7E0] animate-pop-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle Bar */}
        <div className="w-12 h-1.5 bg-muted-gray/30 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={() => setSmartModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F0EFE9] text-charcoal-dark hover:bg-black/10 active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-pastel-yellow text-charcoal-dark flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5 text-charcoal-dark" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-gray">
              CFO Smart Nudge
            </span>
            <Typography variant="title" className="text-base font-extrabold text-charcoal-dark">
              Rekomendasi Hemat LUNAS
            </Typography>
          </div>
        </div>

        {executed ? (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-pastel-sage text-charcoal-dark flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 fill-current" />
            </div>
            <Typography variant="title" className="text-lg font-bold text-charcoal-dark">
              Alokasi Dana Berhasil!
            </Typography>
            <p className="text-xs text-muted-gray mt-1">
              Saldo otomatis terpotong Rp {sweepAmount.toLocaleString("id-ID")} dan cicilan {targetDebt.name} berkurang.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Dark Highlight Bento Card */}
            <div className="bg-charcoal text-white p-5 rounded-3xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-pastel-yellow uppercase tracking-wider bg-pastel-yellow/15 px-2 py-0.5 rounded-full">
                  Analisis Impulsif
                </span>
                <span className="text-xs text-slate-400 font-mono">Deteksi AI</span>
              </div>
              <Typography variant="body" className="text-xs text-slate-200 leading-relaxed font-medium">
                Terdeteksi sisa dana bebas <strong className="text-pastel-yellow">{formatRupiah(balances.availableBalance - balances.safeBufferLimit)}</strong>. Daripada terpakai untuk pengeluaran non-primer, alihkan <strong className="text-white">{formatRupiah(sweepAmount)}</strong> ke utang bunga tertinggi.
              </Typography>
              <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">Target Pelunasan</span>
                <span className="font-bold text-pastel-lavender">{targetDebt.name} ({targetDebt.apr}% APR)</span>
              </div>
            </div>

            {/* Impact Metric Summary */}
            <div className="bg-cream p-4 rounded-[20px] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-pastel-sage" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-charcoal-dark">Bebas Utang Lebih Cepat</span>
                  <span className="text-[10px] text-muted-gray">Menghemat estimasi bunga 1.2 bln</span>
                </div>
              </div>
              <span className="text-xs font-bold text-charcoal-dark bg-white px-2.5 py-1 rounded-full border border-[#E8E7E0]">
                Metode Avalanche
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-2">
              <Button
                variant="ghost"
                className="flex-1 text-xs text-muted-gray"
                onClick={() => setSmartModalOpen(false)}
              >
                Nanti Saja
              </Button>
              <Button
                variant="yellow"
                className="flex-1 text-xs py-3 shadow-md"
                isLoading={isProcessing}
                onClick={handle1TapSweep}
              >
                1-Tap Alihkan {formatRupiah(sweepAmount)}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
