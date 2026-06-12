import { Transaction, Account, Budget, SpendingCategory, MonthlyData } from "@/types";

// ── Accounts ──────────────────────────────────────────────────────────────────

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: "acc_1", userId: "local_user", itemId: "item_1", accountId: "acc_1",
    name: "Chase Total Checking", type: "depository", subtype: "checking", mask: "4821",
    current_balance: 8430.52, available_balance: 8430.52, credit_limit: null,
    institution_name: "Chase", institutionName: "Chase",
    institution_color: "#117ACA", institutionColor: "#117ACA", institutionLogo: null,
  },
  {
    id: "acc_2", userId: "local_user", itemId: "item_1", accountId: "acc_2",
    name: "Chase Savings", type: "depository", subtype: "savings", mask: "9103",
    current_balance: 24800.00, available_balance: 24800.00, credit_limit: null,
    institution_name: "Chase", institutionName: "Chase",
    institution_color: "#117ACA", institutionColor: "#117ACA", institutionLogo: null,
  },
  {
    id: "acc_3", userId: "local_user", itemId: "item_2", accountId: "acc_3",
    name: "Amex Gold Card", type: "credit", subtype: "credit card", mask: "3712",
    current_balance: -1840.20, available_balance: null, credit_limit: 15000,
    institution_name: "American Express", institutionName: "American Express",
    institution_color: "#016FD0", institutionColor: "#016FD0", institutionLogo: null,
  },
  {
    id: "acc_4", userId: "local_user", itemId: "item_3", accountId: "acc_4",
    name: "Apple Card", type: "credit", subtype: "credit card", mask: "0640",
    current_balance: -627.95, available_balance: null, credit_limit: 5000,
    institution_name: "Goldman Sachs", institutionName: "Goldman Sachs",
    institution_color: "#3a3a3a", institutionColor: "#3a3a3a", institutionLogo: null,
  },
];

// ── Transactions (64, Jan–Jun 2026) ──────────────────────────────────────────

export const MOCK_TRANSACTIONS: Transaction[] = [
  // January 2026
  { id: "t01", userId: "local_user", accountId: "acc_1", transactionId: "t01", amount: -4800, date: "2026-01-02", name: "Payroll Deposit", merchant_name: "Employer Inc", primary_category: "Income", payment_channel: "other", pending: false },
  { id: "t02", userId: "local_user", accountId: "acc_3", transactionId: "t02", amount: 38.50, date: "2026-01-05", name: "Whole Foods Market", merchant_name: "Whole Foods", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t03", userId: "local_user", accountId: "acc_3", transactionId: "t03", amount: 12.99, date: "2026-01-06", name: "Netflix Subscription", merchant_name: "Netflix", primary_category: "Entertainment", payment_channel: "online", pending: false },
  { id: "t04", userId: "local_user", accountId: "acc_1", transactionId: "t04", amount: 1450, date: "2026-01-07", name: "Rent Payment", merchant_name: null, primary_category: "Housing", payment_channel: "other", pending: false },
  { id: "t05", userId: "local_user", accountId: "acc_3", transactionId: "t05", amount: 24.80, date: "2026-01-09", name: "Uber Eats", merchant_name: "Uber Eats", primary_category: "Food and Drink", payment_channel: "online", pending: false },
  { id: "t06", userId: "local_user", accountId: "acc_4", transactionId: "t06", amount: 89.99, date: "2026-01-11", name: "Amazon Purchase", merchant_name: "Amazon", primary_category: "Shopping", payment_channel: "online", pending: false },
  { id: "t07", userId: "local_user", accountId: "acc_3", transactionId: "t07", amount: 62.00, date: "2026-01-14", name: "Grocery Store", merchant_name: "Kroger", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t08", userId: "local_user", accountId: "acc_1", transactionId: "t08", amount: 45.00, date: "2026-01-15", name: "Gym Membership", merchant_name: "Planet Fitness", primary_category: "Personal", payment_channel: "online", pending: false },
  { id: "t09", userId: "local_user", accountId: "acc_3", transactionId: "t09", amount: 18.50, date: "2026-01-17", name: "Starbucks", merchant_name: "Starbucks", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t10", userId: "local_user", accountId: "acc_4", transactionId: "t10", amount: 120.00, date: "2026-01-20", name: "Nike Store", merchant_name: "Nike", primary_category: "Shopping", payment_channel: "in store", pending: false },
  { id: "t11", userId: "local_user", accountId: "acc_1", transactionId: "t11", amount: 95.00, date: "2026-01-22", name: "AT&T Mobile", merchant_name: "AT&T", primary_category: "Utilities", payment_channel: "online", pending: false },
  { id: "t12", userId: "local_user", accountId: "acc_3", transactionId: "t12", amount: 55.00, date: "2026-01-25", name: "Shell Gas Station", merchant_name: "Shell", primary_category: "Transportation", payment_channel: "in store", pending: false },
  // February 2026
  { id: "t13", userId: "local_user", accountId: "acc_1", transactionId: "t13", amount: -4800, date: "2026-02-02", name: "Payroll Deposit", merchant_name: "Employer Inc", primary_category: "Income", payment_channel: "other", pending: false },
  { id: "t14", userId: "local_user", accountId: "acc_3", transactionId: "t14", amount: 42.30, date: "2026-02-04", name: "Whole Foods Market", merchant_name: "Whole Foods", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t15", userId: "local_user", accountId: "acc_1", transactionId: "t15", amount: 1450, date: "2026-02-07", name: "Rent Payment", merchant_name: null, primary_category: "Housing", payment_channel: "other", pending: false },
  { id: "t16", userId: "local_user", accountId: "acc_4", transactionId: "t16", amount: 199.00, date: "2026-02-10", name: "Apple Store", merchant_name: "Apple", primary_category: "Shopping", payment_channel: "online", pending: false },
  { id: "t17", userId: "local_user", accountId: "acc_3", transactionId: "t17", amount: 28.00, date: "2026-02-12", name: "Chipotle", merchant_name: "Chipotle", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t18", userId: "local_user", accountId: "acc_1", transactionId: "t18", amount: 12.99, date: "2026-02-13", name: "Spotify Premium", merchant_name: "Spotify", primary_category: "Entertainment", payment_channel: "online", pending: false },
  { id: "t19", userId: "local_user", accountId: "acc_3", transactionId: "t19", amount: 78.50, date: "2026-02-15", name: "Target", merchant_name: "Target", primary_category: "Shopping", payment_channel: "in store", pending: false },
  { id: "t20", userId: "local_user", accountId: "acc_1", transactionId: "t20", amount: 95.00, date: "2026-02-22", name: "AT&T Mobile", merchant_name: "AT&T", primary_category: "Utilities", payment_channel: "online", pending: false },
  { id: "t21", userId: "local_user", accountId: "acc_3", transactionId: "t21", amount: 22.00, date: "2026-02-24", name: "Uber Ride", merchant_name: "Uber", primary_category: "Transportation", payment_channel: "online", pending: false },
  // March 2026
  { id: "t22", userId: "local_user", accountId: "acc_1", transactionId: "t22", amount: -4800, date: "2026-03-02", name: "Payroll Deposit", merchant_name: "Employer Inc", primary_category: "Income", payment_channel: "other", pending: false },
  { id: "t23", userId: "local_user", accountId: "acc_3", transactionId: "t23", amount: 55.80, date: "2026-03-04", name: "Whole Foods Market", merchant_name: "Whole Foods", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t24", userId: "local_user", accountId: "acc_1", transactionId: "t24", amount: 1450, date: "2026-03-07", name: "Rent Payment", merchant_name: null, primary_category: "Housing", payment_channel: "other", pending: false },
  { id: "t25", userId: "local_user", accountId: "acc_3", transactionId: "t25", amount: 15.99, date: "2026-03-09", name: "Hulu Subscription", merchant_name: "Hulu", primary_category: "Entertainment", payment_channel: "online", pending: false },
  { id: "t26", userId: "local_user", accountId: "acc_4", transactionId: "t26", amount: 145.00, date: "2026-03-12", name: "REI Co-op", merchant_name: "REI", primary_category: "Shopping", payment_channel: "in store", pending: false },
  { id: "t27", userId: "local_user", accountId: "acc_3", transactionId: "t27", amount: 320.00, date: "2026-03-15", name: "Delta Airlines", merchant_name: "Delta", primary_category: "Travel", payment_channel: "online", pending: false },
  { id: "t28", userId: "local_user", accountId: "acc_1", transactionId: "t28", amount: 95.00, date: "2026-03-22", name: "AT&T Mobile", merchant_name: "AT&T", primary_category: "Utilities", payment_channel: "online", pending: false },
  { id: "t29", userId: "local_user", accountId: "acc_3", transactionId: "t29", amount: 65.00, date: "2026-03-25", name: "Exxon Gas", merchant_name: "Exxon", primary_category: "Transportation", payment_channel: "in store", pending: false },
  { id: "t30", userId: "local_user", accountId: "acc_4", transactionId: "t30", amount: 48.90, date: "2026-03-28", name: "Cheesecake Factory", merchant_name: "Cheesecake Factory", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t31", userId: "local_user", accountId: "acc_1", transactionId: "t31", amount: 45.00, date: "2026-03-28", name: "Gym Membership", merchant_name: "Planet Fitness", primary_category: "Personal", payment_channel: "online", pending: false },
  // April 2026
  { id: "t32", userId: "local_user", accountId: "acc_1", transactionId: "t32", amount: -4800, date: "2026-04-02", name: "Payroll Deposit", merchant_name: "Employer Inc", primary_category: "Income", payment_channel: "other", pending: false },
  { id: "t33", userId: "local_user", accountId: "acc_3", transactionId: "t33", amount: 44.20, date: "2026-04-04", name: "Trader Joe's", merchant_name: "Trader Joe's", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t34", userId: "local_user", accountId: "acc_1", transactionId: "t34", amount: 1450, date: "2026-04-07", name: "Rent Payment", merchant_name: null, primary_category: "Housing", payment_channel: "other", pending: false },
  { id: "t35", userId: "local_user", accountId: "acc_3", transactionId: "t35", amount: 12.99, date: "2026-04-08", name: "Netflix Subscription", merchant_name: "Netflix", primary_category: "Entertainment", payment_channel: "online", pending: false },
  { id: "t36", userId: "local_user", accountId: "acc_4", transactionId: "t36", amount: 250.00, date: "2026-04-10", name: "Nordstrom", merchant_name: "Nordstrom", primary_category: "Shopping", payment_channel: "in store", pending: false },
  { id: "t37", userId: "local_user", accountId: "acc_3", transactionId: "t37", amount: 85.00, date: "2026-04-13", name: "CVS Pharmacy", merchant_name: "CVS", primary_category: "Healthcare", payment_channel: "in store", pending: false },
  { id: "t38", userId: "local_user", accountId: "acc_3", transactionId: "t38", amount: 35.00, date: "2026-04-16", name: "Starbucks", merchant_name: "Starbucks", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t39", userId: "local_user", accountId: "acc_1", transactionId: "t39", amount: 95.00, date: "2026-04-22", name: "AT&T Mobile", merchant_name: "AT&T", primary_category: "Utilities", payment_channel: "online", pending: false },
  { id: "t40", userId: "local_user", accountId: "acc_4", transactionId: "t40", amount: 175.00, date: "2026-04-24", name: "Airbnb Stay", merchant_name: "Airbnb", primary_category: "Travel", payment_channel: "online", pending: false },
  { id: "t41", userId: "local_user", accountId: "acc_3", transactionId: "t41", amount: 60.00, date: "2026-04-27", name: "BP Gas Station", merchant_name: "BP", primary_category: "Transportation", payment_channel: "in store", pending: false },
  // May 2026
  { id: "t42", userId: "local_user", accountId: "acc_1", transactionId: "t42", amount: -4800, date: "2026-05-02", name: "Payroll Deposit", merchant_name: "Employer Inc", primary_category: "Income", payment_channel: "other", pending: false },
  { id: "t43", userId: "local_user", accountId: "acc_3", transactionId: "t43", amount: 51.40, date: "2026-05-05", name: "Whole Foods Market", merchant_name: "Whole Foods", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t44", userId: "local_user", accountId: "acc_1", transactionId: "t44", amount: 1450, date: "2026-05-07", name: "Rent Payment", merchant_name: null, primary_category: "Housing", payment_channel: "other", pending: false },
  { id: "t45", userId: "local_user", accountId: "acc_3", transactionId: "t45", amount: 15.99, date: "2026-05-08", name: "Hulu Subscription", merchant_name: "Hulu", primary_category: "Entertainment", payment_channel: "online", pending: false },
  { id: "t46", userId: "local_user", accountId: "acc_4", transactionId: "t46", amount: 320.00, date: "2026-05-10", name: "Amazon Purchase", merchant_name: "Amazon", primary_category: "Shopping", payment_channel: "online", pending: false },
  { id: "t47", userId: "local_user", accountId: "acc_3", transactionId: "t47", amount: 125.00, date: "2026-05-12", name: "Walgreens Pharmacy", merchant_name: "Walgreens", primary_category: "Healthcare", payment_channel: "in store", pending: false },
  { id: "t48", userId: "local_user", accountId: "acc_3", transactionId: "t48", amount: 42.00, date: "2026-05-15", name: "Uber Eats", merchant_name: "Uber Eats", primary_category: "Food and Drink", payment_channel: "online", pending: false },
  { id: "t49", userId: "local_user", accountId: "acc_1", transactionId: "t49", amount: 95.00, date: "2026-05-22", name: "AT&T Mobile", merchant_name: "AT&T", primary_category: "Utilities", payment_channel: "online", pending: false },
  { id: "t50", userId: "local_user", accountId: "acc_4", transactionId: "t50", amount: 88.00, date: "2026-05-24", name: "Lululemon", merchant_name: "Lululemon", primary_category: "Shopping", payment_channel: "in store", pending: false },
  { id: "t51", userId: "local_user", accountId: "acc_3", transactionId: "t51", amount: 55.00, date: "2026-05-27", name: "Shell Gas Station", merchant_name: "Shell", primary_category: "Transportation", payment_channel: "in store", pending: false },
  { id: "t52", userId: "local_user", accountId: "acc_1", transactionId: "t52", amount: 45.00, date: "2026-05-28", name: "Gym Membership", merchant_name: "Planet Fitness", primary_category: "Personal", payment_channel: "online", pending: false },
  // June 2026
  { id: "t53", userId: "local_user", accountId: "acc_1", transactionId: "t53", amount: -4800, date: "2026-06-02", name: "Payroll Deposit", merchant_name: "Employer Inc", primary_category: "Income", payment_channel: "other", pending: false },
  { id: "t54", userId: "local_user", accountId: "acc_3", transactionId: "t54", amount: 47.60, date: "2026-06-03", name: "Whole Foods Market", merchant_name: "Whole Foods", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t55", userId: "local_user", accountId: "acc_1", transactionId: "t55", amount: 1450, date: "2026-06-07", name: "Rent Payment", merchant_name: null, primary_category: "Housing", payment_channel: "other", pending: false },
  { id: "t56", userId: "local_user", accountId: "acc_3", transactionId: "t56", amount: 12.99, date: "2026-06-08", name: "Netflix Subscription", merchant_name: "Netflix", primary_category: "Entertainment", payment_channel: "online", pending: false },
  { id: "t57", userId: "local_user", accountId: "acc_4", transactionId: "t57", amount: 215.00, date: "2026-06-09", name: "Apple Store", merchant_name: "Apple", primary_category: "Shopping", payment_channel: "online", pending: false },
  { id: "t58", userId: "local_user", accountId: "acc_3", transactionId: "t58", amount: 33.50, date: "2026-06-10", name: "Chipotle", merchant_name: "Chipotle", primary_category: "Food and Drink", payment_channel: "in store", pending: false },
  { id: "t59", userId: "local_user", accountId: "acc_1", transactionId: "t59", amount: 95.00, date: "2026-06-10", name: "AT&T Mobile", merchant_name: "AT&T", primary_category: "Utilities", payment_channel: "online", pending: false },
  { id: "t60", userId: "local_user", accountId: "acc_3", transactionId: "t60", amount: 78.00, date: "2026-06-10", name: "CVS Pharmacy", merchant_name: "CVS", primary_category: "Healthcare", payment_channel: "in store", pending: false },
  { id: "t61", userId: "local_user", accountId: "acc_4", transactionId: "t61", amount: 480.00, date: "2026-06-10", name: "Southwest Airlines", merchant_name: "Southwest", primary_category: "Travel", payment_channel: "online", pending: true },
  { id: "t62", userId: "local_user", accountId: "acc_3", transactionId: "t62", amount: 68.00, date: "2026-06-10", name: "Exxon Gas", merchant_name: "Exxon", primary_category: "Transportation", payment_channel: "in store", pending: false },
  { id: "t63", userId: "local_user", accountId: "acc_1", transactionId: "t63", amount: 45.00, date: "2026-06-10", name: "Gym Membership", merchant_name: "Planet Fitness", primary_category: "Personal", payment_channel: "online", pending: false },
  { id: "t64", userId: "local_user", accountId: "acc_4", transactionId: "t64", amount: 155.00, date: "2026-06-10", name: "Nordstrom Rack", merchant_name: "Nordstrom Rack", primary_category: "Shopping", payment_channel: "in store", pending: false },
];

// ── Monthly aggregate data ────────────────────────────────────────────────────

export const MOCK_MONTHLY_DATA: MonthlyData[] = [
  { month: "Jan", income: 4800, spending: 2058.78, savings: 2741.22 },
  { month: "Feb", income: 4800, spending: 1942.79, savings: 2857.21 },
  { month: "Mar", income: 4800, spending: 2439.69, savings: 2360.31 },
  { month: "Apr", income: 4800, spending: 2214.19, savings: 2585.81 },
  { month: "May", income: 4800, spending: 2286.39, savings: 2513.61 },
  { month: "Jun", income: 4800, spending: 2632.09, savings: 2167.91 },
];

// ── Budgets ───────────────────────────────────────────────────────────────────

export const MOCK_BUDGETS: Budget[] = [
  { id: "b1", userId: "local_user", category: "Food and Drink", limit_amount: 400, spent_amount: 81.10, period: "monthly", icon: "🍔", color: "#f59e0b" },
  { id: "b2", userId: "local_user", category: "Shopping", limit_amount: 300, spent_amount: 370.00, period: "monthly", icon: "🛍️", color: "#7c3aed" },
  { id: "b3", userId: "local_user", category: "Entertainment", limit_amount: 50, spent_amount: 12.99, period: "monthly", icon: "🎬", color: "#ec4899" },
  { id: "b4", userId: "local_user", category: "Transportation", limit_amount: 100, spent_amount: 68.00, period: "monthly", icon: "🚗", color: "#06b6d4" },
  { id: "b5", userId: "local_user", category: "Healthcare", limit_amount: 150, spent_amount: 78.00, period: "monthly", icon: "💊", color: "#10b981" },
  { id: "b6", userId: "local_user", category: "Travel", limit_amount: 500, spent_amount: 480.00, period: "monthly", icon: "✈️", color: "#3b82f6" },
];

// ── Spending categories (computed from transactions) ─────────────────────────

export function getMockSpendingCategories(month = "2026-06"): SpendingCategory[] {
  const prevMonth = getPreviousMonth(month);

  const bucket = (m: string) =>
    MOCK_TRANSACTIONS.reduce<Record<string, number>>((acc, t) => {
      if (t.date.startsWith(m) && t.amount > 0 && t.primary_category !== "Income") {
        acc[t.primary_category] = (acc[t.primary_category] || 0) + t.amount;
      }
      return acc;
    }, {});

  const cur = bucket(month);
  const prev = bucket(prevMonth);
  const total = Object.values(cur).reduce((s, v) => s + v, 0);

  const COLORS: Record<string, string> = {
    "Food and Drink": "#f59e0b",
    Travel: "#3b82f6",
    Shopping: "#7c3aed",
    Entertainment: "#ec4899",
    Healthcare: "#10b981",
    Transportation: "#06b6d4",
    Utilities: "#64748b",
    Housing: "#8b5cf6",
    Education: "#f97316",
    Personal: "#a78bfa",
    Other: "#334155",
  };

  const ICONS: Record<string, string> = {
    "Food and Drink": "🍔",
    Travel: "✈️",
    Shopping: "🛍️",
    Entertainment: "🎬",
    Healthcare: "💊",
    Transportation: "🚗",
    Utilities: "⚡",
    Housing: "🏠",
    Education: "📚",
    Personal: "👤",
    Other: "📦",
  };

  return Object.entries(cur)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => {
      const p = prev[name] || 0;
      return {
        name,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
        color: COLORS[name] || "#334155",
        icon: ICONS[name] || "📦",
        change: p > 0 ? ((amount - p) / p) * 100 : 0,
      };
    });
}

function getPreviousMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function getAvailableMonths(): string[] {
  return ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
}
