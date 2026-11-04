export interface UserProfile {
  name: string;
  email: string;
  profileType: 'freelancer' | 'debt_focus' | 'wealth_focus';
  safeBufferLimit: number;
  isOnboarded: boolean;
}

export interface Balances {
  availableBalance: number;
  safeBufferLimit: number;
}

export interface Debt {
  id: string;
  name: string;
  apr: number; // e.g. 18 for 18% APR
  amount: number;
  originalAmount: number;
  dueDate: string;
}

export interface Asset {
  id: string;
  name: string;
  amount: number;
  returnRate: number; // e.g. 8.5 for 8.5% p.a.
  category: string;
}

export const initialProfile: UserProfile = {
  name: "Budi Santoso",
  email: "budi.santoso@email.com",
  profileType: "debt_focus",
  safeBufferLimit: 1500000, // Rp 1.500.000 Default
  isOnboarded: false, // Default false to show onboarding first
};

export const initialBalances: Balances = {
  availableBalance: 3450000, // Rp 3.450.000 available
  safeBufferLimit: 1500000,
};

export const initialDebts: Debt[] = [
  {
    id: "debt-1",
    name: "Paylater Belanja",
    apr: 24.5,
    amount: 1200000,
    originalAmount: 2000000,
    dueDate: "2026-08-05",
  },
  {
    id: "debt-2",
    name: "Pinjaman Online A",
    apr: 36.0,
    amount: 2500000,
    originalAmount: 3000000,
    dueDate: "2026-08-10",
  },
  {
    id: "debt-3",
    name: "Kartu Kredit Bank",
    apr: 17.5,
    amount: 5000000,
    originalAmount: 10000000,
    dueDate: "2026-08-25",
  },
];

export const initialAssets: Asset[] = [
  {
    id: "asset-1",
    name: "Reksadana Pasar Uang",
    amount: 3500000,
    returnRate: 5.2,
    category: "Mutual Fund",
  },
  {
    id: "asset-2",
    name: "SBN (Obligasi Negara)",
    amount: 5000000,
    returnRate: 6.3,
    category: "Bonds",
  },
  {
    id: "asset-3",
    name: "Saham Blue Chip",
    amount: 4000000,
    returnRate: 9.8,
    category: "Stocks",
  },
];
