"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { Button } from "@/components/ui/Button";
import { DonutChart } from "@/components/ui/DonutChart";
import { formatRupiah } from "@/lib/utils";
import { Coins, Plus, PieChart, Sparkles } from "lucide-react";

export default function WealthPage() {
  const { assets, balances, executeSweep } = useApp();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(500000);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0);

  // Colors mapping for assets
  const assetColors = ["#A3A7FC", "#C2D3B8", "#F6DF95"];

  const donutSegments = assets.map((a, idx) => ({
    id: a.id,
    label: a.name,
    value: a.amount,
    color: assetColors[idx % assetColors.length],
  }));

  const handleInvest = (assetId: string) => {
    if (balances.availableBalance < investAmount) {
      alert("Saldo Tersedia tidak mencukupi.");
      return;
    }

    setLoadingId(assetId);
    setTimeout(() => {
      executeSweep(investAmount, assetId, "asset");
      setLoadingId(null);
      setSelectedAssetId(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1 pb-24 px-4 pt-4 gap-5">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
          Wealth Growth Engine
        </span>
        <Typography variant="h1" className="text-xl font-bold text-charcoal-dark mt-0.5">
          Portofolio Investasi
        </Typography>
        <p className="text-xs text-muted-gray mt-1">
          Kembangkan dana bebasmu secara optimal dan raih kemandirian finansial.
        </p>
      </div>

      {/* Donut Chart & Portfolio Distribution Bento Card */}
      <InsightCard variant="white" className="p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pastel-lavender/20 text-charcoal-dark flex items-center justify-center font-bold">
              <PieChart className="w-4 h-4 text-pastel-lavender" />
            </div>
            <div>
              <Typography variant="h2" className="text-sm font-bold text-charcoal-dark">
                Distribusi Alokasi Aset
              </Typography>
              <span className="text-[10px] text-muted-gray">Total Assets Overview</span>
            </div>
          </div>
          <span className="text-[10px] font-extrabold bg-pastel-sage text-charcoal-dark px-2.5 py-1 rounded-full">
            +8.5% p.a.
          </span>
        </div>

        <div className="py-2">
          <DonutChart segments={donutSegments} centerTitle="Total Portofolio" />
        </div>
      </InsightCard>

      {/* Asset Performance Recommendation */}
      <InsightCard variant="sage" className="p-4 flex gap-3 items-start">
        <Sparkles className="w-5 h-5 text-charcoal-dark shrink-0 mt-0.5" />
        <div>
          <span className="text-[10px] font-extrabold text-charcoal-dark/70 uppercase tracking-wider">
            Saran Alokasi Imbal Hasil
          </span>
          <p className="text-sm font-extrabold text-charcoal-dark mt-0.5">
            Optimalkan Portofolio Investasimu
          </p>
          <p className="text-xs text-charcoal-dark/80 leading-relaxed mt-1">
            Saham Blue Chip menawarkan performa tertinggi dengan return rata-rata <strong>9.8% p.a.</strong> Alokasikan sisa dana bebas untuk mempercepat target investasimu.
          </p>
        </div>
      </InsightCard>

      {/* Asset List */}
      <div>
        <Typography variant="h2" className="mb-3 font-bold text-charcoal-dark text-base">
          Aset Aktif Anda
        </Typography>

        <div className="flex flex-col gap-3">
          {assets.map((asset, idx) => {
            const isSelected = selectedAssetId === asset.id;
            const color = assetColors[idx % assetColors.length];
            const sharePercent = totalAssets > 0 ? (asset.amount / totalAssets) * 100 : 0;

            return (
              <InsightCard
                key={asset.id}
                variant="white"
                className={`transition-all duration-300 p-5 ${
                  isSelected ? "ring-2 ring-charcoal-dark" : ""
                }`}
              >
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => setSelectedAssetId(isSelected ? null : asset.id)}
                >
                  <div className="flex gap-3 items-center">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold shrink-0"
                      style={{ backgroundColor: `${color}40` }}
                    >
                      <Coins className="w-5 h-5 text-charcoal-dark" />
                    </div>
                    <div>
                      <Typography variant="h2" className="font-bold text-charcoal-dark text-sm">
                        {asset.name}
                      </Typography>
                      <div className="flex gap-2 text-[10px] text-muted-gray font-semibold mt-1">
                        <span className="bg-pastel-sage/30 text-charcoal-dark px-2 py-0.5 rounded-full font-bold">
                          +{asset.returnRate}% p.a.
                        </span>
                        <span className="py-0.5">{asset.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Typography variant="h2" className="font-extrabold text-charcoal-dark text-sm leading-none">
                      {formatRupiah(asset.amount)}
                    </Typography>
                    <span className="text-[10px] text-muted-gray font-bold block mt-1">
                      {sharePercent.toFixed(1)}% Portofolio
                    </span>
                  </div>
                </div>

                {/* Quick Investment Drawer */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-[#E8E7E0] flex flex-col gap-3 animate-fade-in">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-muted-gray">Saldo Tersedia</span>
                      <span className="font-extrabold text-charcoal-dark">{formatRupiah(balances.availableBalance)}</span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <input
                        type="range"
                        min={100000}
                        max={balances.availableBalance}
                        step={100000}
                        value={investAmount}
                        onChange={(e) => setInvestAmount(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-[#F0EFE9] rounded-full appearance-none cursor-pointer accent-charcoal-dark"
                      />
                      <span className="text-xs font-extrabold text-charcoal-dark min-w-24 text-right">
                        {formatRupiah(investAmount)}
                      </span>
                    </div>

                    <Button
                      variant="dark"
                      size="sm"
                      className="mt-1 py-2.5 font-bold text-xs"
                      isLoading={loadingId === asset.id}
                      onClick={() => handleInvest(asset.id)}
                    >
                      <Plus className="w-4 h-4 mr-1.5 text-pastel-yellow" />
                      Top-Up Investasi Instan
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
