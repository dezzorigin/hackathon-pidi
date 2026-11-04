import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { AppLayout } from "@/components/layout/AppLayout";
import ClientOnly from "@/components/ClientOnly";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LUNAS - Asisten Keuangan Personal",
  description: "Asisten Keuangan Personal cerdas bertenaga algoritma & Zero-Friction.",
};

export default function RootLayout({
  children,
  }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`} suppressHydrationWarning={true}>
      <body className="min-h-screen font-sans bg-cream text-charcoal-dark" suppressHydrationWarning={true}><AppProvider><MobileContainer><ClientOnly><AppLayout>{children}</AppLayout></ClientOnly></MobileContainer></AppProvider></body>
    </html>
  );
}
