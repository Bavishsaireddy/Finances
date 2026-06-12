"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import TransactionRow from "@/components/transactions/TransactionRow";
import AddTransactionModal from "@/components/transactions/AddTransactionModal";
import { MOCK_TRANSACTIONS, getAvailableMonths } from "@/lib/mock-data";
import { CATEGORY_ICONS } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Search, SlidersHorizontal, Download, Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

const MONTH_LABELS: Record<string, string> = {
  "2026-06": "Jun", "2026-05": "May", "2026-04": "Apr",
  "2026-03": "Mar", "2026-02": "Feb", "2026-01": "Jan",
};

const ALL_CATEGORIES = ["All", ...Array.from(new Set(MOCK_TRANSACTIONS.map(t => t.primary_category)))];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMonth, setActiveMonth] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [addOpen, setAddOpen] = useState(false);
  const [extras, setExtras] = useState<Transaction[]>([]);

  const months = getAvailableMonths();
  const allTxns = [...extras, ...MOCK_TRANSACTIONS];

  const filtered = allTxns
    .filter(t => {
      const matchSearch = search === "" ||
        (t.merchant_name || t.name).toLowerCase().includes(search.toLowerCase()) ||
        t.primary_category.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || t.primary_category === activeCategory;
      const matchMonth = activeMonth === "all" || t.date.startsWith(activeMonth);
      return matchSearch && matchCat && matchMonth;
    })
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : Math.abs(b.amount) - Math.abs(a.amount)
    );

  const totalSpend = filtered.filter(t => t.amount > 0 && t.primary_category !== "Income").reduce((s, t) => s + t.amount, 0);
  const totalIncome = filtered.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  const handleAdded = (tx: Record<string, unknown>) => {
    setExtras(prev => [{
      id: String(tx.id),
      account_id: String(tx.accountId || "manual"),
      transaction_id: String(tx.transactionId),
      amount: Number(tx.amount),
      date: String(tx.date),
      name: String(tx.name),
      merchant_name: tx.merchantName ? String(tx.merchantName) : null,
      category: [String(tx.primaryCategory)],
      primary_category: String(tx.primaryCategory),
      detailed_category: String(tx.primaryCategory),
      logo_url: null,
      pending: false,
      payment_channel: (tx.paymentChannel as "online" | "in store" | "other") || "other",
    }, ...prev]);
  };

  return (
    <div className="animate-fade-in">
      <Header title="Transactions" subtitle={`${allTxns.length} transactions · ${extras.length} manual`} />

      <div className="px-6 py-6 space-y-4">

        {/* Summary cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Shown</p>
            <p className="text-xl font-bold text-text-primary">{filtered.length}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Total Spent</p>
            <p className="text-xl font-bold text-danger-DEFAULT">-{formatCurrency(totalSpend)}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Total Income</p>
            <p className="text-xl font-bold text-success-DEFAULT">+{formatCurrency(totalIncome)}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Manual entries</p>
            <p className="text-xl font-bold text-accent-purple-light">{extras.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 bg-bg-elevated border border-border rounded-lg px-3 py-2">
              <Search className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search merchant, category…"
                className="bg-transparent text-sm text-text-primary outline-none w-full placeholder:text-text-muted"
              />
            </div>

            {/* Month filter */}
            <select
              value={activeMonth}
              onChange={e => setActiveMonth(e.target.value)}
              className="bg-bg-elevated border border-border text-text-secondary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">All months</option>
              {months.map(m => (
                <option key={m} value={m}>{MONTH_LABELS[m] || m}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as "date" | "amount")}
              className="bg-bg-elevated border border-border text-text-secondary text-xs rounded-lg px-3 py-2 outline-none cursor-pointer"
            >
              <option value="date">Sort: Date</option>
              <option value="amount">Sort: Amount</option>
            </select>

            <button className="flex items-center gap-2 bg-bg-elevated border border-border text-text-secondary text-xs rounded-lg px-3 py-2 hover:text-text-primary transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-full border transition-all",
                  activeCategory === cat
                    ? "bg-accent-purple/20 border-accent-purple/40 text-accent-purple-light"
                    : "bg-bg-elevated border-border text-text-muted hover:text-text-secondary hover:border-border-bright"
                )}
              >
                {cat !== "All" && CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <p className="text-xs font-medium text-text-secondary">{filtered.length} results</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAddOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-accent-purple-light hover:underline"
              >
                <Pencil className="w-3 h-3" />
                Add manually
              </button>
              <SlidersHorizontal className="w-3.5 h-3.5 text-text-muted" />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-text-muted text-sm">No transactions found</p>
              <button
                onClick={() => setAddOpen(true)}
                className="mt-3 flex items-center gap-1.5 text-xs text-accent-purple-light mx-auto hover:underline"
              >
                <Plus className="w-3 h-3" />
                Add one manually
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {filtered.map(t => <TransactionRow key={t.id} transaction={t} />)}
            </div>
          )}
        </div>

      </div>

      <AddTransactionModal open={addOpen} onClose={() => setAddOpen(false)} onAdded={handleAdded} />
    </div>
  );
}
