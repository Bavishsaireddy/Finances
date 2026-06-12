"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CreditCard, ArrowLeftRight,
  PieChart, Target, Settings, Zap, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { href: "/cards",        label: "Cards",        icon: CreditCard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/analytics",    label: "Analytics",    icon: PieChart },
  { href: "/budgets",      label: "Budgets",      icon: Target },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-bg-card border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center shadow-glow">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-base font-semibold text-text-primary">FinanceOS</span>
          <p className="text-[10px] text-text-muted leading-none mt-0.5">Personal Finance</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-text-muted px-3 pb-2 font-medium">Menu</p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-accent-purple/15 text-accent-purple-light border border-accent-purple/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-accent-purple-light" : "")} />
              {label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-purple" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border px-3 py-4 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-bg-elevated border border-border">
          <div className="w-7 h-7 rounded-full bg-gradient-purple flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-text-primary">My Account</p>
            <p className="text-[10px] text-text-muted">Local mode</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
