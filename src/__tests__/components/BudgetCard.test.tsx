import { render, screen } from "@testing-library/react";
import BudgetCard from "@/components/budget/BudgetCard";
import type { Budget } from "@/types";

const onTrackBudget: Budget = {
  id: "1",
  user_id: "u1",
  category: "Food and Drink",
  limit_amount: 600,
  spent_amount: 200,
  period: "monthly",
  color: "#f59e0b",
  icon: "🍔",
};

const warningBudget: Budget = {
  ...onTrackBudget,
  id: "2",
  spent_amount: 510, // 85% — warning zone
};

const overBudget: Budget = {
  ...onTrackBudget,
  id: "3",
  category: "Shopping",
  limit_amount: 400,
  spent_amount: 450, // over
};

describe("BudgetCard — on track", () => {
  it("shows the category name", () => {
    render(<BudgetCard budget={onTrackBudget} />);
    expect(screen.getByText("Food and Drink")).toBeInTheDocument();
  });

  it("shows spent amount", () => {
    render(<BudgetCard budget={onTrackBudget} />);
    expect(screen.getByText(/200\.00/)).toBeInTheDocument();
  });

  it("shows remaining amount", () => {
    render(<BudgetCard budget={onTrackBudget} />);
    expect(screen.getByText(/400\.00/)).toBeInTheDocument();
  });

  it("does NOT show 'Over by' message", () => {
    render(<BudgetCard budget={onTrackBudget} />);
    expect(screen.queryByText(/over by/i)).not.toBeInTheDocument();
  });
});

describe("BudgetCard — over budget", () => {
  it("shows 'Over by' message with correct amount", () => {
    render(<BudgetCard budget={overBudget} />);
    // The over-by message is a single span — match the full text
    expect(screen.getByText(/over by \$50\.00/i)).toBeInTheDocument();
  });

  it("does NOT show remaining amount when over budget", () => {
    render(<BudgetCard budget={overBudget} />);
    expect(screen.queryByText(/\bLeft\b/i)).not.toBeInTheDocument();
  });
});

describe("BudgetCard — utilization display", () => {
  it("shows 33% for on-track budget (200/600)", () => {
    render(<BudgetCard budget={onTrackBudget} />);
    expect(screen.getByText(/33%/)).toBeInTheDocument();
  });

  it("shows 113% for over-budget (450/400 = 112.5 rounds to 113)", () => {
    render(<BudgetCard budget={overBudget} />);
    expect(screen.getByText(/113%/)).toBeInTheDocument();
  });
});
