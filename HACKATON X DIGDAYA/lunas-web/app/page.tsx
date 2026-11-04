"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DonutChart } from "@/components/ui/DonutChart";
import { BarChart, BarDataItem } from "@/components/ui/BarChart";
import { formatRupiah } from "@/lib/utils";
import {
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Wallet,
  ShieldCheck,
  CreditCard,
  Briefcase,
  Smartphone,
} from "lucide-react";

export default function Dashboard() {
  const { userProfile, balances, debts, assets, setSmartModalOpen } = useApp();

  // Financial Calculations
  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0);
  const totalDebts = debts.reduce((sum, item) => sum + item.amount, 0);
  const netWorth = balances.availableBalance + totalAssets - totalDebts;

  // Freelancer widget calculations
  const spentToday = 450000;
  const safeDailyBudget = Math.max(0, balances.availableBalance - balances.safeBufferLimit);

  // Profile configuration badges
  const profileConfig = {
    freelancer: {
      label: "Arus Kas Harian",
      badgeClass: "bg-pastel-yellow text-charcoal-dark",
    },
    debt_focus: {
      label: "Fokus Bebas Utang",
      badgeClass: "bg-soft-coral text-white",
    },
    wealth_focus: {
      label: "Fokus Kembangkan Dana",
      badgeClass: "bg-pastel-sage text-charcoal-dark",
    },
  };

  const currentConfig = profileConfig[userProfile.profileType] || profileConfig.freelancer;

  // Donut Chart Data (Assets & Liquidity Allocation)
  const donutSegments = [
    { id: "balance", label: "Saldo Cash", value: balances.availableBalance, color: "#F6DF95" },
    { id: "mutual", label: "Reksadana", value: assets[0]?.amount || 3500000, color: "#A3A7FC" },
    { id: "bonds", label: "Obligasi", value: assets[1]?.amount || 5000000, color: "#C2D3B8" },
  ];

  // Bar Chart Data (Weekly Sales & Cashflow Histogram)
  const weeklyData: BarDataItem[] = [
    { label: "Sen", value: 1200000 },
    { label: "Sel", value: 1850000 },
    { label: "Rab", value: 950000 },
    { label: "Kam", value: 2400000, isHigh: true },
    { label: "Jum", value: 1600000 },
    { label: "Sab", value: 2100000 },
    { label: "Min", value: 1450000 },
  ];

  // List Section: Recent Transactions & Sales Data
  const recentTransactions = [
    {
      id: "tx-1",
      name: "Pembayaran Klien Project UI",
      category: "Pemasukan",
      time: "10 min yang lalu",
      amount: 2500000,
      type: "income",
      icon: Briefcase,
      avatarBg: "bg-pastel-sage/40 text-charcoal-dark",
    },
    {
      id: "tx-2",
      name: "Pembayaran Cicilan Paylater",
      category: "Pelunasan Utang",
      time: "2 jam yang lalu",
      amount: -450000,
      type: "expense",
      icon: CreditCard,
      avatarBg: "bg-soft-coral/20 text-soft-coral",
    },
    {
      id: "tx-3",
      name: "Langganan Cloud Server",
      category: "Operasional Freelance",
      time: "Kemarin, 16:30",
      amount: -180000,
      type: "expense",
      icon: Smartphone,
      avatarBg: "bg-pastel-lavender/30 text-charcoal-dark",
    },
    {
      id: "tx-4",
      name: "Dividen Reksadana",
      category: "Imbal Hasil",
      time: "25 Jul 2026",
      amount: 125000,
      type: "income",
      icon: TrendingUp,
      avatarBg: "bg-pastel-yellow/50 text-charcoal-dark",
    },
  ];

  return (
    <div className="flex flex-col flex-1 pb-24 px-4 pt-4 gap-5">
      {/* 1. Header Section */}
      <div className="flex justify-between items-center px-1 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-charcoal text-pastel-yellow flex items-center justify-center font-bold text-lg shadow-xs border-2 border-white">
            {userProfile.name ? userProfile.name.charAt(0) : "B"}
          </div>
          <div>
            <span className="text-[11px] font-semibold text-muted-gray block leading-none">
              Selamat datang kembali,
            </span>
            <Typography variant="title" className="text-lg font-bold text-charcoal-dark leading-tight mt-0.5">
              {userProfile.name} 👋
            </Typography>
          </div>
        </div>

        <span
          className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider ${currentConfig.badgeClass}`}
        >
          {currentConfig.label}
        </span>
      </div>

      {/* 2. Top Bento Grid Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Pastel Yellow Main Highlight Card */}
        <InsightCard variant="yellow" className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-charcoal-dark/70 uppercase tracking-wider">
              Total Kekayaan (Net Worth)
            </span>
            <span className="text-[10px] font-extrabold bg-charcoal-dark text-white px-2.5 py-1 rounded-full">
              +14.8%
            </span>
          </div>

          <div className="my-3">
            <Typography variant="metric" className="text-charcoal-dark font-extrabold text-2xl sm:text-3xl">
              {formatRupiah(netWorth)}
            </Typography>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-charcoal-dark/80 pt-2 border-t border-charcoal-dark/10">
            <div className="flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-dark" />
              <span>Aset: {formatRupiah(totalAssets)}</span>
            </div>
            <div className="flex items-center gap-1 border-l border-charcoal-dark/20 pl-3">
              <ArrowDownRight className="w-3.5 h-3.5 text-soft-coral" />
              <span>Utang: {formatRupiah(totalDebts)}</span>
            </div>
          </div>
        </InsightCard>

        {/* Dark Charcoal Accent Card */}
        <InsightCard variant="dark" className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-slate-300">
              <Wallet className="w-4.5 h-4.5 text-pastel-lavender" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">
                Saldo Tersedia
              </span>
            </div>
            <span className="text-[10px] font-bold bg-pastel-lavender/20 text-pastel-lavender px-2 py-0.5 rounded-full">
              Likuid
            </span>
          </div>

          <div className="my-2">
            <Typography variant="metric" className="text-white text-2xl font-extrabold">
              {formatRupiah(balances.availableBalance)}
            </Typography>
          </div>

          <div className="bg-charcoal-dark rounded-2xl p-3 flex items-center justify-between mt-2 border border-slate-700/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-pastel-sage" />
              <span className="text-xs text-slate-300 font-medium">Dana Cadangan Aman</span>
            </div>
            <span className="text-xs font-bold text-pastel-yellow">
              {formatRupiah(balances.safeBufferLimit)}
            </span>
          </div>
        </InsightCard>
      </div>

      {/* 3. Bento Grid Analytics Section (Donut Chart & Bar Chart) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Widget 1: Interactive Donut Chart */}
        <InsightCard variant="white" className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-pastel-lavender/20 text-pastel-lavender flex items-center justify-center font-bold">
                <PieChartIcon />
              </div>
              <div>
                <Typography variant="h2" className="text-sm font-bold text-charcoal-dark">
                  Alokasi Aset
                </Typography>
                <span className="text-[10px] text-muted-gray">Proporsi Likuiditas</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-[#F0EFE9] text-charcoal-dark px-2 py-0.5 rounded-full">
              Soft Tech
            </span>
          </div>

          <div className="py-2">
            <DonutChart segments={donutSegments} centerTitle="Total Aset" />
          </div>
        </InsightCard>

        {/* Widget 2: Rounded Bar Chart / Histogram */}
        <InsightCard variant="white" className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-pastel-yellow/40 text-charcoal-dark flex items-center justify-center font-bold">
                <BarChartIcon />
              </div>
              <div>
                <Typography variant="h2" className="text-sm font-bold text-charcoal-dark">
                  Arus Kas Mingguan
                </Typography>
                <span className="text-[10px] text-muted-gray">Histogram Transaksi</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-pastel-sage/30 text-charcoal-dark px-2 py-0.5 rounded-full">
              Peak: Kamis
            </span>
          </div>

          <div className="py-2">
            <BarChart data={weeklyData} height={130} accentColor="#F6DF95" />
          </div>
        </InsightCard>
      </div>

      {/* 4. Profile Dynamic Bento Widget */}
      {userProfile.profileType === "freelancer" && (
        <InsightCard variant="white" className="p-5 border-l-4 border-l-pastel-yellow">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-[10px] font-bold text-muted-gray uppercase tracking-wider">
                Alokasi Spending Harian
              </span>
              <Typography variant="h2" className="text-sm font-bold text-charcoal-dark mt-0.5">
                Batas Pengeluaran Aman Hari Ini
              </Typography>
            </div>
            <span className="text-xs font-bold text-charcoal-dark bg-pastel-yellow px-2.5 py-1 rounded-full">
              {formatRupiah(safeDailyBudget)}
            </span>
          </div>

          <ProgressBar
            value={spentToday}
            max={safeDailyBudget || 1000000}
            color="yellow"
            showLabel={true}
            label="Terpakai Hari Ini"
            subLabel={`${formatRupiah(spentToday)} / ${formatRupiah(safeDailyBudget)}`}
          />

          <div className="bg-cream rounded-2xl p-3 flex items-center gap-2.5 mt-4">
            <Zap className="w-4 h-4 text-charcoal-dark shrink-0" />
            <p className="text-[11px] text-charcoal-dark leading-tight font-medium">
              Pengeluaran harianmu dalam kondisi stabil. Sisa dana dapat dialokasikan ke obligasi malam ini.
            </p>
          </div>
        </InsightCard>
      )}

      {userProfile.profileType === "debt_focus" && (
        <InsightCard variant="white" className="p-5 border-l-4 border-l-soft-coral">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-soft-coral" />
              <Typography variant="h2" className="text-sm font-bold text-charcoal-dark">
                Rekomendasi Pembebasan Utang
              </Typography>
            </div>
            <span className="text-[10px] font-bold bg-soft-coral/15 text-soft-coral px-2 py-0.5 rounded-full">
              Avalanche Priority
            </span>
          </div>

          <p className="text-xs text-muted-gray leading-relaxed mb-4">
            Ada sisa dana likuid bebas di luar buffer aman. Lunasi utang bunga tertinggi (<strong>{debts[0]?.name || "Paylater"}</strong>) sekarang secara instan.
          </p>

          <Button
            variant="dark"
            size="sm"
            className="w-full py-2.5 text-xs font-bold shadow-xs"
            onClick={() => setSmartModalOpen(true)}
          >
            <Zap className="w-3.5 h-3.5 mr-1.5 text-pastel-yellow fill-current" />
            1-Tap Repay Sekarang
          </Button>
        </InsightCard>
      )}

      {userProfile.profileType === "wealth_focus" && (
        <InsightCard variant="white" className="p-5 border-l-4 border-l-pastel-sage">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-[10px] font-bold text-muted-gray uppercase tracking-wider">
                Imbal Hasil Investasi
              </span>
              <Typography variant="h2" className="text-sm font-bold text-charcoal-dark mt-0.5">
                Estimasi Portofolio
              </Typography>
            </div>
            <span className="text-xs font-bold text-charcoal-dark bg-pastel-sage px-2.5 py-1 rounded-full">
              +8.5% p.a.
            </span>
          </div>

          <div className="bg-cream p-3 rounded-2xl flex justify-between items-center">
            <span className="text-xs font-semibold text-muted-gray">Nilai Aset Aktif</span>
            <span className="text-sm font-extrabold text-charcoal-dark">{formatRupiah(totalAssets)}</span>
          </div>
        </InsightCard>
      )}

      {/* 5. List Section: Recent Transactions & Recent Sales */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <div>
            <Typography variant="h2" className="text-base font-bold text-charcoal-dark">
              Riwayat Transaksi & Penjualan
            </Typography>
            <span className="text-[10px] text-muted-gray">Clean List Spacing (No Hard Dividers)</span>
          </div>
          <span className="text-xs font-bold text-charcoal-dark hover:underline cursor-pointer">
            Lihat Semua
          </span>
        </div>

        {/* Clean Spacing Container with no hard dividers */}
        <div className="flex flex-col gap-3">
          {recentTransactions.map((tx) => {
            const IconComponent = tx.icon;
            const isIncome = tx.type === "income";

            return (
              <InsightCard
                key={tx.id}
                variant="white"
                className="p-4 flex items-center justify-between rounded-[22px]"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shrink-0 ${tx.avatarBg}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <Typography variant="body" className="font-semibold text-xs text-charcoal-dark leading-tight">
                      {tx.name}
                    </Typography>
                    <span className="text-[10px] text-muted-gray block mt-0.5 font-medium">
                      {tx.category} • {tx.time}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-extrabold block ${
                      isIncome ? "text-charcoal-dark" : "text-soft-coral"
                    }`}
                  >
                    {isIncome ? "+" : ""}{formatRupiah(tx.amount)}
                  </span>
                  <span className="text-[9px] font-semibold text-muted-gray uppercase tracking-wider">
                    {isIncome ? "Masuk" : "Keluar"}
                  </span>
                </div>
              </InsightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PieChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
