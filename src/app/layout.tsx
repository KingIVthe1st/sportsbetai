import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Sports Betting Pro — Stop Gambling. Start Exploiting. | 68.3% Win Rate",
  description: "Our dual-engine AI analyzes 37 data points per game with a documented 68.3% win rate across 835+ games. Daily picks at 3pm ET. $250/mo.",
  keywords: ["sports betting AI", "AI picks", "machine learning sports", "betting intelligence", "sports analytics"],
  metadataBase: new URL("https://ai-sports-betting-pro.vercel.app"),
  openGraph: {
    title: "AI Sports Betting Pro — Stop Gambling. Start Exploiting.",
    description: "68.3% documented win rate. Dual-engine ML. 37 data points per game. Your AI weapon against the sportsbooks.",
    url: "https://ai-sports-betting-pro.vercel.app",
    siteName: "AI Sports Betting Pro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Sports Betting Pro — Stop Gambling. Start Exploiting.",
    description: "68.3% win rate. Dual-engine ML. Daily AI picks at 3pm ET.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
