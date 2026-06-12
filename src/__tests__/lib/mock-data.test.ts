import {
  MOCK_ACCOUNTS,
  MOCK_TRANSACTIONS,
  MOCK_MONTHLY_DATA,
  MOCK_BUDGETS,
  getMockSpendingCategories,
  getAvailableMonths,
} from "@/lib/mock-data";

describe("MOCK_ACCOUNTS", () => {
  it("contains at least 4 accounts", () => {
    expect(MOCK_ACCOUNTS.length).toBeGreaterThanOrEqual(4);
  });

  it("has both depository and credit account types", () => {
    const types = new Set(MOCK_ACCOUNTS.map(a => a.type));
    expect(types.has("depository")).toBe(true);
    expect(types.has("credit")).toBe(true);
  });

  it("every credit account has a credit_limit", () => {
    const creditAccounts = MOCK_ACCOUNTS.filter(a => a.type === "credit");
    creditAccounts.forEach(a => {
      expect(a.credit_limit).not.toBeNull();
      expect(a.credit_limit).toBeGreaterThan(0);
    });
  });
});

describe("MOCK_TRANSACTIONS — 6-month coverage", () => {
  it("contains transactions across all 6 months (Jan–Jun 2026)", () => {
    const months = new Set(MOCK_TRANSACTIONS.map(t => t.date.slice(0, 7)));
    ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"].forEach(m => {
      expect(months.has(m)).toBe(true);
    });
  });

  it("has at least 9 transactions per month", () => {
    const counts: Record<string, number> = {};
    MOCK_TRANSACTIONS.forEach(t => {
      const m = t.date.slice(0, 7);
      counts[m] = (counts[m] || 0) + 1;
    });
    Object.values(counts).forEach(count => {
      expect(count).toBeGreaterThanOrEqual(9);
    });
  });

  it("all transaction IDs are unique", () => {
    const ids = MOCK_TRANSACTIONS.map(t => t.transaction_id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes at least one income transaction per month", () => {
    const months = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
    months.forEach(month => {
      const income = MOCK_TRANSACTIONS.filter(
        t => t.date.startsWith(month) && t.primary_category === "Income"
      );
      expect(income.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("income transactions have negative amounts (Plaid convention)", () => {
    const income = MOCK_TRANSACTIONS.filter(t => t.primary_category === "Income");
    income.forEach(t => {
      expect(t.amount).toBeLessThan(0);
    });
  });
});

describe("MOCK_MONTHLY_DATA", () => {
  it("contains exactly 6 monthly entries", () => {
    expect(MOCK_MONTHLY_DATA).toHaveLength(6);
  });

  it("savings = income - spending for every month", () => {
    MOCK_MONTHLY_DATA.forEach(({ income, spending, savings }) => {
      expect(savings).toBe(income - spending);
    });
  });

  it("all income values are positive", () => {
    MOCK_MONTHLY_DATA.forEach(({ income }) => expect(income).toBeGreaterThan(0));
  });
});

describe("getMockSpendingCategories", () => {
  it("returns categories for June 2026 by default", () => {
    const categories = getMockSpendingCategories();
    expect(categories.length).toBeGreaterThan(0);
  });

  it("percentages sum to ~100%", () => {
    const categories = getMockSpendingCategories("2026-06");
    const total = categories.reduce((s, c) => s + c.percentage, 0);
    expect(total).toBeCloseTo(100, 0);
  });

  it("results are sorted by amount descending", () => {
    const categories = getMockSpendingCategories("2026-06");
    for (let i = 1; i < categories.length; i++) {
      expect(categories[i - 1].amount).toBeGreaterThanOrEqual(categories[i].amount);
    }
  });

  it("excludes Income category from spending breakdown", () => {
    const categories = getMockSpendingCategories("2026-06");
    const hasIncome = categories.some(c => c.name === "Income");
    expect(hasIncome).toBe(false);
  });
});

describe("getAvailableMonths", () => {
  it("returns months sorted newest first", () => {
    const months = getAvailableMonths();
    expect(months[0]).toBe("2026-06");
    expect(months[months.length - 1]).toBe("2026-01");
  });

  it("returns exactly 6 months", () => {
    expect(getAvailableMonths()).toHaveLength(6);
  });
});

describe("MOCK_BUDGETS", () => {
  it("has at least one over-budget category", () => {
    const over = MOCK_BUDGETS.filter(b => b.spent_amount > b.limit_amount);
    expect(over.length).toBeGreaterThanOrEqual(1);
  });

  it("every budget has a positive limit", () => {
    MOCK_BUDGETS.forEach(b => {
      expect(b.limit_amount).toBeGreaterThan(0);
    });
  });
});
