import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceOS — Personal Finance Dashboard",
  description: "Track spending, manage budgets, and analyze your finances in real time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
