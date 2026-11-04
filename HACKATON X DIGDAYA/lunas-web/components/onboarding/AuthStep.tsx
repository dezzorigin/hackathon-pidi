"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { Mail } from "lucide-react";

import { StepProps } from "./types";

export function AuthStep({ onNext, data, setData }: StepProps) {
  const [email, setEmail] = useState(data.email || "");
  const [name, setName] = useState(data.name || "");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);

  const handleGoogleLogin = () => {
    setLoadingGoogle(true);
    setTimeout(() => {
      setData({
        ...data,
        name: "Budi Santoso",
        email: "budi.santoso@gmail.com",
      });
      setLoadingGoogle(false);
      onNext();
    }, 1000);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Silakan masukkan nama dan email Anda.");
      return;
    }
    setLoadingEmail(true);
    setTimeout(() => {
      setData({
        ...data,
        name,
        email,
      });
      setLoadingEmail(false);
      onNext();
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1 justify-between p-6 h-full text-charcoal-dark">
      <div className="pt-2">
        <Typography variant="h1" className="mb-1 text-2xl font-bold text-charcoal-dark">
          Daftarkan Akunmu
        </Typography>
        <p className="text-xs text-muted-gray mb-6">
          Hubungkan profil keuanganmu untuk memulai asisten CFO personal Anda.
        </p>

        {/* Google Authentication Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loadingGoogle || loadingEmail}
          className="w-full h-13 rounded-full border border-[#E8E7E0] bg-white flex items-center justify-center gap-3 text-charcoal-dark font-bold text-xs shadow-sm hover:bg-[#F9F8F3] active:scale-95 transition-all cursor-pointer"
        >
          {loadingGoogle ? (
            <div className="w-5 h-5 border-2 border-charcoal-dark border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 3C6.18 7.37 8.85 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.09 2.67-2.31 3.49l3.58 2.78c2.1-1.94 3.79-5.12 3.79-8.42z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.24 14.56c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2l-3.85-3C.54 8.79 0 10.33 0 12s.54 3.21 1.39 4.84l3.85-3z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.58-2.78c-1.1.74-2.5 1.18-4.38 1.18-3.15 0-5.82-2.33-6.76-5.52l-3.85 3C3.37 20.33 7.35 23 12 23z"
                />
              </svg>
              Lanjutkan dengan Google
            </>
          )}
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-[#E8E7E0] flex-1" />
          <span className="text-[10px] font-bold text-muted-gray tracking-wider uppercase">ATAU</span>
          <div className="h-px bg-[#E8E7E0] flex-1" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-charcoal-dark px-1">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl border border-[#E8E7E0] bg-white text-xs font-medium text-charcoal-dark focus:outline-none focus:ring-2 focus:ring-charcoal-dark transition-all"
              disabled={loadingGoogle || loadingEmail}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-charcoal-dark px-1">Alamat Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl border border-[#E8E7E0] bg-white text-xs font-medium text-charcoal-dark focus:outline-none focus:ring-2 focus:ring-charcoal-dark transition-all"
              disabled={loadingGoogle || loadingEmail}
            />
          </div>

          <Button
            variant="dark"
            type="submit"
            isLoading={loadingEmail}
            disabled={loadingGoogle || !name || !email}
            className="mt-2 py-3.5 text-xs font-bold w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            Lanjutkan dengan Email
          </Button>
        </form>
      </div>

      <div className="text-center text-[10px] text-muted-gray mt-6">
        Keamanan terjamin. Data dilindungi enkripsi standar industri.
      </div>
    </div>
  );
}
