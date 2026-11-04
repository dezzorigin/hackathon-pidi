"use client";

import React, { useState } from "react";
import { formatRupiah } from "@/lib/utils";

interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string; // e.g. '#A3A7FC', '#F6DF95', '#C2D3B8'
}

interface DonutChartProps {
  segments: DonutSegment[];
  totalValue?: number;
  centerTitle?: string;
}

export function DonutChart({ segments, totalValue, centerTitle = "Total" }: DonutChartProps) {
  const [activeSegment, setActiveSegment] = useState<DonutSegment | null>(null);

  const calculatedTotal = totalValue ?? segments.reduce((sum, item) => sum + item.value, 0);
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76

  // Pre-calculate cumulative percentages to avoid mutation during render
  const segmentsWithOffsets = segments.map((seg, idx) => {
    const sharePercent = calculatedTotal > 0 ? (seg.value / calculatedTotal) * 100 : 0;
    const prevCumulativePercent = segments
      .slice(0, idx)
      .reduce((sum, s) => sum + (calculatedTotal > 0 ? (s.value / calculatedTotal) * 100 : 0), 0);
    return {
      seg,
      sharePercent,
      strokeDashoffset: -((prevCumulativePercent / 100) * circumference),
    };
  });

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Floating Dark Tooltip */}
      {activeSegment && (
        <div className="absolute -top-12 z-30 bg-charcoal text-white px-3 py-1.5 rounded-xl shadow-xl border border-slate-700/60 text-center animate-pop-in pointer-events-none">
          <p className="text-[10px] text-slate-400 font-semibold uppercase">{activeSegment.label}</p>
          <p className="text-xs font-bold text-pastel-yellow">
            {formatRupiah(activeSegment.value)} (
            {((activeSegment.value / (calculatedTotal || 1)) * 100).toFixed(0)}%)
          </p>
        </div>
      )}

      {/* SVG Donut Circle */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#F0EFE9"
            strokeWidth="12"
          />
          {segmentsWithOffsets.map(({ seg, sharePercent, strokeDashoffset }) => {
            const strokeDasharray = `${(sharePercent / 100) * circumference} ${circumference}`;
            const isHovered = activeSegment?.id === seg.id;

            return (
              <circle
                key={seg.id}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? "15" : "12"}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 cursor-pointer origin-center"
                onMouseEnter={() => setActiveSegment(seg)}
                onMouseLeave={() => setActiveSegment(null)}
                onClick={() => setActiveSegment(activeSegment?.id === seg.id ? null : seg)}
              />
            );
          })}
        </svg>

        {/* Donut Center Display */}
        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none px-2">
          <span className="text-[9px] font-bold text-muted-gray uppercase tracking-wider">
            {activeSegment ? activeSegment.label : centerTitle}
          </span>
          <span className="text-xs font-extrabold text-charcoal-dark">
            {activeSegment
              ? formatRupiah(activeSegment.value)
              : calculatedTotal >= 1_000_000
              ? `${(calculatedTotal / 1_000_000).toFixed(1)}M`
              : formatRupiah(calculatedTotal)}
          </span>
        </div>
      </div>

      {/* Legend Items */}
      <div className="w-full flex items-center justify-center gap-3 mt-3 flex-wrap">
        {segments.map((seg) => (
          <div
            key={seg.id}
            onClick={() => setActiveSegment(activeSegment?.id === seg.id ? null : seg)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all duration-200 ${
              activeSegment?.id === seg.id
                ? "bg-charcoal text-white shadow-sm"
                : "bg-white/60 text-charcoal-dark hover:bg-white border border-[#E8E7E0]"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="truncate max-w-22.5">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
