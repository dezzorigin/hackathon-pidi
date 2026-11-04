"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { formatRupiah } from "@/lib/utils";
import { AlertCircle, TrendingDown, Zap } from "lucide-react";

export default function DebtPage() {
  const { debts, balances, executeSweep } = useApp();
  const [selectedDebtId, setSelectedDebtId] = useState<string | null>(null);
  const [payAmount, setPayAmount] = useState<number>(250000);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Sorting debts by APR descending (Avalanche Method)
  const sortedDebts = [...debts].sort((a, b) => b.apr - a.apr);

  const totalDebts = debts.reduce((sum, item) => sum + item.amount, 0);
  const totalOriginal = debts.reduce((sum, item) => sum + item.originalAmount, 0);
  const totalPaid = Math.max(0, totalOriginal - totalDebts);

  const handlePayDebt = (debtId: string) => {
    if (balances.availableBalance < payAmount) {
      alert("Saldo Tersedia tidak mencukupi.");
      return;
    }

    const targetDebt = debts.find((d) => d.id === debtId);
    if (!targetDebt) return;
    
    const finalAmount = Math.min(payAmount, targetDebt.amount);

    setLoadingId(debtId);
    setTimeout(() => {
      executeSweep(finalAmount, debtId, "debt");
      setLoadingId(null);
      setSelectedDebtId(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1 pb-24 px-4 pt-4 gap-5">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
          Avalanche Optimization
        </span>
        <Typography variant="h1" className="text-xl font-bold text-charcoal-dark mt-0.5">
          Daftar Utang & Cicilan
        </Typography>
        <p className="text-xs text-muted-gray mt-1">
          Dikelompokkan otomatis berdasarkan suku bunga tertinggi untuk efisiensi maksimal.
        </p>
      </div>

      {/* Debt Summary Neo-Bento Dark Card */}
      <InsightCard variant="dark" className="p-5 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-soft-coral">
            <TrendingDown className="w-5 h-5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
              Total Outstanding
            </span>
          </div>
          <span className="text-[10px] font-bold bg-soft-coral/20 text-soft-coral px-2.5 py-0.5 rounded-full">
            Metode Avalanche
          </span>
        </div>

        <Typography variant="metric" className="text-white text-3xl font-extrabold my-2">
          {formatRupiah(totalDebts)}
        </Typography>

        <ProgressBar
          value={totalPaid}
          max={totalOriginal || 1}
          color="coral"
          showLabel={true}
          label="Total Kemajuan Pelunasan"
          subLabel={`${((totalPaid / (totalOriginal || 1)) * 100).toFixed(0)}% Lunas`}
        />
      </InsightCard>

      {/* Recommended Next Priority Target */}
      {sortedDebts.find((d) => d.amount > 0) && (
        <InsightCard variant="yellow" className="p-4 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-charcoal-dark shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="text-[10px] font-extrabold text-charcoal-dark/70 uppercase tracking-wider">
              Prioritas Utama (Bunga Tertinggi)
            </span>
            <p className="text-sm font-extrabold text-charcoal-dark mt-0.5">
              {sortedDebts.find((d) => d.amount > 0)?.name}
            </p>
            <p className="text-xs text-charcoal-dark/80 leading-relaxed mt-1">
              Bunga {sortedDebts.find((d) => d.amount > 0)?.apr}% APR. Alokasikan dana bebas ke pos ini terlebih dahulu untuk menghemat biaya bunga.
            </p>
          </div>
        </InsightCard>
      )}

      {/* Debts List */}
      <div>
        <Typography variant="h2" className="mb-3 font-bold text-charcoal-dark text-base">
          Semua Cicilan & Utang
        </Typography>

        <div className="flex flex-col gap-3">
          {sortedDebts.map((debt, index) => {
            const isSelected = selectedDebtId === debt.id;
            const paidPercentage = ((debt.originalAmount - debt.amount) / debt.originalAmount) * 100;
            const isSettled = debt.amount === 0;

            return (
              <InsightCard
                key={debt.id}
                variant={isSettled ? "sage" : "white"}
                className={`transition-all duration-300 p-5 ${
                  isSettled
                    ? "opacity-80"
                    : isSelected
                    ? "ring-2 ring-charcoal-dark"
                    : ""
                }`}
              >
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => !isSettled && setSelectedDebtId(isSelected ? null : debt.id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-charcoal-dark text-white flex items-center justify-center text-xs font-bold font-mono">
                        {index + 1}
                      </span>
                      <Typography variant="h2" className="font-bold text-charcoal-dark text-sm">
                        {debt.name}
                      </Typography>
                    </div>
                    <div className="flex gap-2 text-[10px] text-muted-gray font-semibold mt-2">
                      <span className="bg-soft-coral/15 text-soft-coral px-2 py-0.5 rounded-full font-mono font-bold">
                        {debt.apr}% APR
                      </span>
                      <span className="py-0.5">Jatuh Tempo: {debt.dueDate}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    {isSettled ? (
                      <span className="text-xs font-bold text-charcoal-dark bg-pastel-sage px-3 py-1 rounded-full">
                        LUNAS
                      </span>
                    ) : (
                      <>
                        <Typography variant="h2" className="font-extrabold text-charcoal-dark text-sm leading-none">
                          {formatRupiah(debt.amount)}
                        </Typography>
                        <span className="text-[10px] text-muted-gray font-semibold block mt-1">
                          dari {formatRupiah(debt.originalAmount)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {!isSettled && (
                  <div className="mt-4">
                    <ProgressBar
                      value={debt.originalAmount - debt.amount}
                      max={debt.originalAmount}
                      color="coral"
                      showLabel={false}
                    />
                    <div className="flex justify-between items-center text-[10px] text-muted-gray mt-1.5 font-semibold">
                      <span>Kemajuan Pelunasan</span>
                      <span>{paidPercentage.toFixed(0)}% Terbayar</span>
                    </div>
                  </div>
                )}

                {/* Interactive Repayment Drawer */}
                {isSelected && !isSettled && (
                  <div className="mt-4 pt-4 border-t border-[#E8E7E0] flex flex-col gap-3 animate-fade-in">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-muted-gray">Saldo Tersedia</span>
                      <span className="font-extrabold text-charcoal-dark">{formatRupiah(balances.availableBalance)}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <input
                        type="range"
                        min={100000}
                        max={Math.min(balances.availableBalance, debt.amount)}
                        step={50000}
                        value={payAmount}
                        onChange={(e) => setPayAmount(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-[#F0EFE9] rounded-full appearance-none cursor-pointer accent-charcoal-dark"
                      />
                      <span className="text-xs font-extrabold text-charcoal-dark min-w-24 text-right">
                        {formatRupiah(payAmount)}
                      </span>
                    </div>

                    <Button
                      variant="dark"
                      size="sm"
                      className="mt-1 py-2.5 font-bold text-xs"
                      isLoading={loadingId === debt.id}
                      onClick={() => handlePayDebt(debt.id)}
                    >
                      <Zap className="w-3.5 h-3.5 mr-1.5 text-pastel-yellow fill-current" />
                      1-Tap Bayar Instan
                    </Button>
                  </div>
                )}
              </InsightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
