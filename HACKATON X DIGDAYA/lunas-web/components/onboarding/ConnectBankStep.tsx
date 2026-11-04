"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { InsightCard } from "@/components/ui/InsightCard";
import { ShieldCheck, CheckCircle2, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { StepProps } from "./types";

interface FinancialInstitution {
  id: string;
  name: string;
  type: "bank" | "wallet";
  logoColor: string;
}

export function ConnectBankStep({ onNext }: StepProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  const institutions: FinancialInstitution[] = [
    { id: "bca", name: "BCA", type: "bank", logoColor: "bg-charcoal-dark text-white" },
    { id: "mandiri", name: "Mandiri", type: "bank", logoColor: "bg-pastel-yellow text-charcoal-dark" },
    { id: "bri", name: "BRI", type: "bank", logoColor: "bg-pastel-lavender text-charcoal-dark" },
    { id: "bni", name: "BNI", type: "bank", logoColor: "bg-pastel-sage text-charcoal-dark" },
    { id: "gopay", name: "GoPay", type: "wallet", logoColor: "bg-pastel-sage text-charcoal-dark" },
    { id: "ovo", name: "OVO", type: "wallet", logoColor: "bg-pastel-lavender text-charcoal-dark" },
    { id: "shopeepay", name: "ShopeePay", type: "wallet", logoColor: "bg-pastel-yellow text-charcoal-dark" },
  ];

  const handleConnect = (id: string) => {
    if (connectedIds.includes(id)) return;
    setConnectingId(id);
    setTimeout(() => {
      setConnectedIds((prev) => [...prev, id]);
      setConnectingId(null);
    }, 1200);
  };

  return (
    <div className="flex flex-col flex-1 justify-between p-6 h-full text-charcoal-dark">
      <div className="pt-2">
        <Typography variant="h1" className="mb-1 text-2xl font-bold text-charcoal-dark">
          Hubungkan Akun Bank
        </Typography>
        <p className="text-xs text-muted-gray mb-5">
          Integrasikan mutasi & saldo rekening Anda secara otomatis dengan standar aman SNAP BI.
        </p>

        {/* Bank Selector Bento Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {institutions.map((inst) => {
            const isConnecting = connectingId === inst.id;
            const isConnected = connectedIds.includes(inst.id);

            return (
              <InsightCard
                key={inst.id}
                variant={isConnected ? "sage" : "white"}
                className="p-4 flex flex-col justify-between h-28 cursor-pointer relative"
                onClick={() => handleConnect(inst.id)}
              >
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-xs", inst.logoColor)}>
                  {inst.name.substring(0, 3)}
                </div>

                <div className="flex flex-col gap-0.5 mt-2">
                  <span className="text-xs font-bold text-charcoal-dark">{inst.name}</span>
                  <span className="text-[10px] text-muted-gray capitalize">{inst.type}</span>
                </div>

                <div className="absolute right-3.5 bottom-3.5">
                  {isConnecting ? (
                    <div className="w-4 h-4 border-2 border-charcoal-dark border-t-transparent rounded-full animate-spin" />
                  ) : isConnected ? (
                    <CheckCircle2 className="w-5 h-5 text-charcoal-dark fill-white" />
                  ) : (
                    <Link2 className="w-4 h-4 text-muted-gray" />
                  )}
                </div>
              </InsightCard>
            );
          })}
        </div>

        {/* Disclaimer Card */}
        <InsightCard variant="white" className="p-4 flex gap-3 items-center">
          <ShieldCheck className="w-5 h-5 text-pastel-lavender shrink-0" />
          <p className="text-[11px] text-muted-gray leading-normal font-medium">
            <strong className="text-charcoal-dark">Akses Read-Only SNAP BI</strong>. Kami tidak pernah menyimpan password atau PIN rahasia Anda.
          </p>
        </InsightCard>
      </div>

      <div className="mt-6">
        <Button
          variant="dark"
          className="w-full py-4 text-xs font-bold"
          disabled={connectedIds.length === 0}
          onClick={onNext}
        >
          {connectedIds.length > 0 ? `Lanjutkan (${connectedIds.length} Terhubung)` : "Hubungkan Bank Pertama Anda"}
        </Button>
      </div>
    </div>
  );
}
