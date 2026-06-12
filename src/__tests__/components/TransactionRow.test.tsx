import { render, screen } from "@testing-library/react";
import TransactionRow from "@/components/transactions/TransactionRow";
import type { Transaction } from "@/types";

const spendTransaction: Transaction = {
  id: "t1",
  account_id: "acc_1",
  transaction_id: "plaid_t1",
  amount: 84.50,
  date: "2026-06-10",
  name: "Whole Foods Market",
  merchant_name: "Whole Foods",
  category: ["Food and Drink", "Groceries"],
  primary_category: "Food and Drink",
  detailed_category: "Groceries",
  logo_url: null,
  pending: false,
  payment_channel: "in store",
};

const incomeTransaction: Transaction = {
  ...spendTransaction,
  id: "t2",
  transaction_id: "plaid_t2",
  amount: -5200,
  name: "Payroll Deposit",
  merchant_name: null,
  primary_category: "Income",
  detailed_category: "Payroll",
  payment_channel: "other",
};

const pendingTransaction: Transaction = {
  ...spendTransaction,
  id: "t3",
  transaction_id: "plaid_t3",
  pending: true,
};

describe("TransactionRow — spending transaction", () => {
  it("renders the merchant name", () => {
    render(<TransactionRow transaction={spendTransaction} />);
    expect(screen.getByText("Whole Foods")).toBeInTheDocument();
  });

  it("shows the category", () => {
    render(<TransactionRow transaction={spendTransaction} />);
    expect(screen.getByText(/Food and Drink/)).toBeInTheDocument();
  });

  it("displays the amount with a minus sign", () => {
    render(<TransactionRow transaction={spendTransaction} />);
    expect(screen.getByText(/-\$84\.50/)).toBeInTheDocument();
  });

  it("does NOT show pending badge", () => {
    render(<TransactionRow transaction={spendTransaction} />);
    expect(screen.queryByText(/pending/i)).not.toBeInTheDocument();
  });
});

describe("TransactionRow — income transaction", () => {
  it("falls back to transaction name when no merchant_name", () => {
    render(<TransactionRow transaction={incomeTransaction} />);
    expect(screen.getByText("Payroll Deposit")).toBeInTheDocument();
  });

  it("displays the amount with a plus sign", () => {
    render(<TransactionRow transaction={incomeTransaction} />);
    expect(screen.getByText(/\+\$5,200\.00/)).toBeInTheDocument();
  });
});

describe("TransactionRow — pending transaction", () => {
  it("shows the pending badge", () => {
    render(<TransactionRow transaction={pendingTransaction} />);
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });
});
