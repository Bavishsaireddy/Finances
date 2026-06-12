import { render, screen } from "@testing-library/react";
import BankCard from "@/components/cards/BankCard";
import { MOCK_ACCOUNTS } from "@/lib/mock-data";

const checkingAccount = MOCK_ACCOUNTS.find(a => a.subtype === "checking")!;
const creditAccount   = MOCK_ACCOUNTS.find(a => a.type === "credit")!;

describe("BankCard — checking account", () => {
  beforeEach(() => render(<BankCard account={checkingAccount} />));

  it("renders the institution name", () => {
    expect(screen.getByText(checkingAccount.institution_name)).toBeInTheDocument();
  });

  it("renders the masked card number", () => {
    expect(screen.getByText(new RegExp(checkingAccount.mask))).toBeInTheDocument();
  });

  it("renders the account name", () => {
    expect(screen.getByText(checkingAccount.name)).toBeInTheDocument();
  });

  it("does NOT render a credit usage bar for a checking account", () => {
    expect(screen.queryByText(/credit used/i)).not.toBeInTheDocument();
  });
});

describe("BankCard — credit account", () => {
  beforeEach(() => render(<BankCard account={creditAccount} />));

  it("renders the credit limit", () => {
    expect(screen.getByText(/10,000|10000/)).toBeInTheDocument();
  });

  it("renders the credit usage bar", () => {
    expect(screen.getByText(/credit used/i)).toBeInTheDocument();
  });

  it("renders utilization percentage", () => {
    const pct = Math.abs(creditAccount.current_balance) / creditAccount.credit_limit! * 100;
    expect(screen.getByText(new RegExp(`${pct.toFixed(0)}%`))).toBeInTheDocument();
  });
});

describe("BankCard — compact mode", () => {
  it("renders in compact mode without credit bar", () => {
    render(<BankCard account={creditAccount} compact />);
    expect(screen.queryByText(/credit used/i)).not.toBeInTheDocument();
  });

  it("still shows the institution name in compact mode", () => {
    render(<BankCard account={creditAccount} compact />);
    expect(screen.getByText(creditAccount.institution_name)).toBeInTheDocument();
  });
});
