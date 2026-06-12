import Header from "@/components/layout/Header";
import BankCard from "@/components/cards/BankCard";
import TransactionRow from "@/components/transactions/TransactionRow";
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Plus, Shield, Zap } from "lucide-react";

export default function CardsPage() {
  const accounts = MOCK_ACCOUNTS;
  const creditCards = accounts.filter(a => a.type === "credit");
  const bankAccounts = accounts.filter(a => a.type === "depository");
  const totalCredit = creditCards.reduce((s, a) => s + (a.credit_limit || 0), 0);
  const totalUsed = creditCards.reduce((s, a) => s + Math.abs(a.current_balance), 0);
  const totalAvailable = totalCredit - totalUsed;

  return (
    <div className="animate-fade-in">
      <Header title="Cards" subtitle="Manage all your cards and accounts" />

      <div className="px-6 py-6 space-y-6">

        {/* Credit summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Total Credit Limit</p>
            <p className="text-xl font-bold text-text-primary">{formatCurrency(totalCredit)}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Total Used</p>
            <p className="text-xl font-bold text-danger-DEFAULT">{formatCurrency(totalUsed)}</p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">Total Available</p>
            <p className="text-xl font-bold text-success-DEFAULT">{formatCurrency(totalAvailable)}</p>
          </div>
        </div>

        {/* Credit Cards */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Credit Cards</h2>
          <div className="grid grid-cols-3 gap-5">
            {creditCards.map(acc => (
              <div key={acc.id} className="space-y-4">
                <BankCard account={acc} />
                <div className="bg-bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Statement closes</span>
                    <span className="text-text-secondary">Jun 25</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Payment due</span>
                    <span className="text-warning-DEFAULT font-medium">Jul 15</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Minimum payment</span>
                    <span className="text-text-secondary">{formatCurrency(Math.abs(acc.current_balance) * 0.02)}</span>
                  </div>
                  {acc.credit_limit && (
                    <div className="flex justify-between text-xs">
                      <span className="text-text-muted">Utilization</span>
                      <span className={`font-medium ${(Math.abs(acc.current_balance) / acc.credit_limit) > 0.3 ? "text-warning-DEFAULT" : "text-success-DEFAULT"}`}>
                        {((Math.abs(acc.current_balance) / acc.credit_limit) * 100).toFixed(0)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add card CTA */}
            <button className="rounded-2xl border-2 border-dashed border-border hover:border-accent-purple/50 bg-bg-elevated hover:bg-bg-card transition-all p-5 flex flex-col items-center justify-center gap-3 group min-h-[180px]">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center group-hover:bg-accent-purple/20 transition-colors">
                <Plus className="w-5 h-5 text-accent-purple-light" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">Connect a card</p>
                <p className="text-[11px] text-text-muted mt-0.5">Link via Plaid</p>
              </div>
            </button>
          </div>
        </div>

        {/* Bank Accounts */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Bank Accounts</h2>
          <div className="grid grid-cols-3 gap-5">
            {bankAccounts.map(acc => (
              <div key={acc.id} className="space-y-4">
                <BankCard account={acc} />
                <div className="bg-bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Account type</span>
                    <span className="text-text-secondary capitalize">{acc.subtype}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Routing number</span>
                    <span className="text-text-secondary">•••• 2847</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Status</span>
                    <span className="flex items-center gap-1 text-success-DEFAULT font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-success-DEFAULT" />Active
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-3 bg-bg-elevated border border-border rounded-xl p-4">
          <Shield className="w-4 h-4 text-success-DEFAULT mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-text-primary">Bank-level security</p>
            <p className="text-[11px] text-text-muted mt-0.5">Your credentials are never stored. We use Plaid's read-only access with 256-bit encryption.</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-text-muted flex-shrink-0">
            <Zap className="w-3 h-3 text-accent-purple-light" />
            Powered by Plaid
          </div>
        </div>

      </div>
    </div>
  );
}
