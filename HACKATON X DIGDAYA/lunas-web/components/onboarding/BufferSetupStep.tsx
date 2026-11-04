"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { formatRupiah } from "@/lib/utils";
import { ShieldCheck, Info } from "lucide-react";

import { StepProps } from "./types";

export function BufferSetupStep({ onNext, data, setData }: StepProps) {
  const [buffer, setBuffer] = useState<number>(data.safeBufferLimit || 1500000);

  const handleNext = () => {
    setData({
      ...data,
      safeBufferLimit: buffer,
    });
    onNext();
  };

  const minVal = 500000;
  const maxVal = 5000000;
  const stepVal = 250000;

  const getFeedbackLabel = () => {
    if (buffer <= 1000000) return { title: "Agresif", desc: "Utang lunas lebih cepat, namun pegangan kas harian sangat minim." };
    if (buffer <= 2500000) return { title: "Seimbang (Saran CFO)", desc: "Keseimbangan ideal antara likuiditas harian dan pertumbuhan aset." };
    return { title: "Konservatif", desc: "Pegangan tunai harian melimpah, namun pertumbuhan aset melambat." };
  };

  const feedback = getFeedbackLabel();

  return (
    <div className="flex flex-col flex-1 justify-between p-6 h-full text-charcoal-dark">
      <div className="pt-2">
        <Typography variant="h1" className="mb-1 text-2xl font-bold text-charcoal-dark">
          Batas Aman Harian (Safe Buffer)
        </Typography>
        <p className="text-xs text-muted-gray mb-6">
          Tentukan nominal minimum dana cadangan di rekening yang tidak boleh diutak-atik oleh sistem.
        </p>

        {/* Display Card */}
        <InsightCard variant="white" className="p-6 mb-6 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-extrabold text-muted-gray uppercase tracking-wider mb-1">
            Dynamic Safe Buffer Limit
          </span>
          <Typography variant="metric" className="text-3xl font-extrabold text-charcoal-dark">
            {formatRupiah(buffer)}
          </Typography>
          <div className="h-px bg-[#E8E7E0] w-full my-4" />
          <div className="flex items-start gap-2.5 text-left w-full">
            <Info className="w-4 h-4 text-pastel-lavender shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-charcoal-dark">{feedback.title}</span>
              <p className="text-[11px] text-muted-gray mt-0.5 leading-normal">{feedback.desc}</p>
            </div>
          </div>
        </InsightCard>

        {/* Range Slider */}
        <div className="flex flex-col gap-3 px-1 mb-6">
          <input
            type="range"
            min={minVal}
            max={maxVal}
            step={stepVal}
            value={buffer}
            onChange={(e) => setBuffer(parseInt(e.target.value))}
            className="w-full h-2 bg-[#F0EFE9] rounded-full appearance-none cursor-pointer accent-charcoal-dark"
          />
          <div className="flex justify-between text-[10px] font-bold text-muted-gray">
            <span>{formatRupiah(minVal)}</span>
            <span>{formatRupiah(maxVal)}</span>
          </div>
        </div>

        {/* Security Card */}
        <InsightCard variant="lavender" className="p-4 flex gap-3 items-center">
          <ShieldCheck className="w-5 h-5 text-charcoal-dark shrink-0" />
          <p className="text-[11px] text-charcoal-dark leading-normal font-medium">
            Sistem LUNAS tidak akan pernah menyapu saldo jika kas utama berada di bawah nominal ini.
          </p>
        </InsightCard>
      </div>

      <div className="mt-6">
        <Button variant="dark" className="w-full py-4 text-xs font-bold" onClick={handleNext}>
          Selesaikan Pengaturan CFO
        </Button>
      </div>
    </div>
  );
}
