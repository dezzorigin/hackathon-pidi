"use client";

import React, { useState } from "react";
import { formatRupiah } from "@/lib/utils";

export interface BarDataItem {
  label: string;
  value: number;
  isHigh?: boolean;
}

interface BarChartProps {
  data: BarDataItem[];
  height?: number;
  accentColor?: string; // default pastel lavender #A3A7FC
}

export function BarChart({ data, height = 140, accentColor = "#A3A7FC" }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const highestItem = data.reduce((prev, current) => (prev.value > current.value ? prev : current), data[0]);

  const [activeItem, setActiveItem] = useState<BarDataItem | null>(highestItem);

  return (
    <div className="w-full flex flex-col gap-2 select-none">
      {/* Chart Canvas Area */}
      <div className="relative w-full flex items-end justify-between px-2 pt-8" style={{ height }}>
        {data.map((item, idx) => {
          const heightPercent = Math.max(12, (item.value / maxValue) * 100);
          const isActive = activeItem?.label === item.label;
          const isHighest = item.label === highestItem.label;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
              onMouseEnter={() => setActiveItem(item)}
              onClick={() => setActiveItem(item)}
            >
              {/* Dashed Line & Floating Tooltip for Active/Highlighted Bar */}
              {isActive && (
                <div className="absolute -top-7 z-20 bg-charcoal text-white px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-md whitespace-nowrap animate-pop-in border border-slate-700">
                  {formatRupiah(item.value)}
                </div>
              )}

              {isActive && (
                <div
                  className="absolute bottom-0 w-0 border-r-2 border-dashed border-charcoal/40 z-10 pointer-events-none"
                  style={{ height: `${heightPercent}%` }}
                />
              )}

              {/* Rounded Cap Bar */}
              <div
                className="w-full max-w-7 rounded-t-xl transition-all duration-300 relative z-0"
                style={{
                  height: `${heightPercent}%`,
                  backgroundColor: isActive
                    ? "#1E2022"
                    : isHighest
                    ? accentColor
                    : "#E6E4D9",
                }}
              >
                {/* Active Indicator Top Dot */}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-pastel-yellow absolute top-1 left-1/2 -translate-x-1/2" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between items-center px-2 pt-1 border-t border-[#E8E7E0]">
        {data.map((item, idx) => {
          const isActive = activeItem?.label === item.label;
          return (
            <span
              key={idx}
              className={`text-[10px] font-semibold text-center flex-1 transition-colors ${
                isActive ? "text-charcoal-dark font-extrabold" : "text-muted-gray"
              }`}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
