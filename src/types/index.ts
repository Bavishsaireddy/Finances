export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  transactionId: string;
  amount: number;
  date: string;
  name: string;
  merchant_name?: string | null;
  merchantName?: string | null;
  category?: string[];
  primary_category: string;
  primaryCategory?: string;
  detailed_category?: string;
  detailedCategory?: string;
  logo_url?: string | null;
  logoUrl?: string | null;
  pending: boolean;
  payment_channel: string;
  paymentChannel?: string;
  isManual?: boolean;
  notes?: string | null;
}

export interface Account {
  id: string;
  userId: string;
  itemId: string;
  accountId: string;
  name: string;
  officialName?: string | null;
  type: string;
  subtype?: string | null;
  mask: string;
  current_balance: number;
  currentBalance?: number;
  available_balance?: number | null;
  availableBalance?: number | null;
  credit_limit?: number | null;
  creditLimit?: number | null;
  institution_name: string;
  institutionName?: string;
  institutionColor?: string;
  institutionLogo?: string | null;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit_amount: number;
  limitAmount?: number;
  spent_amount: number;
  spentAmount?: number;
  period: "monthly" | "weekly" | "yearly";
  icon: string;
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
  change: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  spending: number;
  savings: number;
}
