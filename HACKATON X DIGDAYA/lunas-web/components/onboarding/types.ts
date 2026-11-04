export interface OnboardingData {
  name: string;
  email: string;
  profileType: "freelancer" | "debt_focus" | "wealth_focus";
  safeBufferLimit: number;
}

export interface StepProps {
  onNext: () => void;
  data: OnboardingData;
  setData: (data: Partial<OnboardingData>) => void;
}
