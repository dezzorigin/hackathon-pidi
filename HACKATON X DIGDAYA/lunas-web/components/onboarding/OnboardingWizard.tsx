"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { WelcomeStep } from "./WelcomeStep";
import { AuthStep } from "./AuthStep";
import { ProfilingStep } from "./ProfilingStep";
import { ConnectBankStep } from "./ConnectBankStep";
import { BufferSetupStep } from "./BufferSetupStep";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OnboardingData } from "./types";
import { ArrowLeft } from "lucide-react";

export function OnboardingWizard() {
  const { completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    profileType: "debt_focus",
    safeBufferLimit: 1500000,
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeOnboarding(onboardingData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateData = (newData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep
            onNext={handleNext}
            data={onboardingData}
            setData={updateData}
          />
        );
      case 1:
        return (
          <AuthStep
            onNext={handleNext}
            data={onboardingData}
            setData={updateData}
          />
        );
      case 2:
        return (
          <ProfilingStep
            onNext={handleNext}
            data={onboardingData}
            setData={updateData}
          />
        );
      case 3:
        return (
          <ConnectBankStep
            onNext={handleNext}
            data={onboardingData}
            setData={updateData}
          />
        );
      case 4:
        return (
          <BufferSetupStep
            onNext={handleNext}
            data={onboardingData}
            setData={updateData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-cream w-full min-h-screen">
      {/* Top Bar Navigation */}
      {currentStep > 0 && (
        <div className="pt-4 px-6 flex items-center justify-between z-10 shrink-0 select-none">
          <button
            onClick={handleBack}
            className="p-2 rounded-full bg-white text-charcoal-dark border border-[#E8E7E0] hover:bg-black/5 active:scale-95 transition-all"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex-1 px-6">
            <ProgressBar
              value={currentStep}
              max={totalSteps - 1}
              color="lavender"
              showLabel={false}
            />
          </div>
          
          <span className="text-xs font-bold text-muted-gray">
            {currentStep}/{totalSteps - 1}
          </span>
        </div>
      )}

      {/* Step Viewport */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {renderStep()}
      </div>
    </div>
  );
}
