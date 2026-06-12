# FinanceOS — Personal Finance Dashboard

A dark-mode personal finance web app that connects to your real bank accounts via Plaid, shows spending analysis, card overviews, budgets, and transaction history. Data is stored locally in SQLite and retained for 6 months.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS (dark theme) |
| Auth | Clerk |
| Bank data | Plaid API |
| Database | SQLite via Prisma ORM |
| Charts | Recharts |
| Testing | Jest + React Testing Library |

---

## Prerequisites

- Node.js 18+ (`node --version`)
- npm 9+ (`npm --version`)
- A free [Clerk account](https://clerk.com)
- A free [Plaid account](https://dashboard.plaid.com) — sandbox works without real banks

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in the values. The `DATABASE_URL` line works as-is — it creates `prisma/dev.db` automatically.

**Getting Clerk keys:**
1. Go to [clerk.com](https://clerk.com) → Create application
2. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

**Getting Plaid keys:**
1. Go to [dashboard.plaid.com](https://dashboard.plaid.com) → Create app
2. Copy `PLAID_CLIENT_ID` and the **Sandbox** secret into `PLAID_SECRET`
3. Leave `PLAID_ENV=sandbox` — no real bank needed for testing

### 3. Create the database

```bash
# Create the SQLite file and apply the schema
npm run db:push

# (Optional) seed default budget categories
npm run db:seed
```

This creates `prisma/dev.db` in your project. It is gitignored.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to sign-in.

---

## Pages

| URL | What you see |
|---|---|
| `/dashboard` | Net worth, all cards, spending donut, 6-month trend, recent transactions, budget snapshot |
| `/cards` | Visual card widgets, utilization bars, payment due dates |
| `/transactions` | Searchable, filterable transaction history with category chips |
| `/analytics` | Category breakdown, monthly trend, day-of-week chart, top merchants |
| `/budgets` | Per-category budget progress with over-budget warnings |

---

## Connecting Real Bank Accounts

The app ships with **64 mock transactions across 6 months** so you can explore it immediately without linking a bank.

To link a real account:
1. Click **Connect Bank** in the top-right header
2. Plaid Link opens — search for your bank
3. **Sandbox credentials:** username `user_good` / password `pass_good`
4. For real accounts, use your actual bank login (production Plaid keys required)

After linking, call `/api/plaid/transactions?sync=true` to pull the latest data. Transactions older than 6 months are automatically purged.

---

## Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Test files

```
src/__tests__/
├── lib/
│   ├── utils.test.ts          formatCurrency, formatDate, category maps
│   └── mock-data.test.ts      6-month coverage, data integrity
└── components/
    ├── BankCard.test.tsx       checking vs credit card rendering
    ├── BudgetCard.test.tsx     on-track vs over-budget states
    └── TransactionRow.test.tsx spend vs income vs pending
```

---

## Database Commands

```bash
npm run db:push      # Apply schema to SQLite (fast, no migration files)
npm run db:migrate   # Create a named migration file
npm run db:seed      # Seed default budget categories
npm run db:studio    # Open Prisma Studio GUI → http://localhost:5555
npm run db:generate  # Regenerate Prisma client after schema changes
```

### Data retention

Transactions older than **6 months** are automatically deleted each time the Plaid sync runs. To manually browse the database:

```bash
npm run db:studio
```

---

## Project Structure

```
├── prisma/
│   ├── schema.prisma        SQLite schema (accounts, transactions, budgets)
│   ├── seed.ts              seeds default budgets
│   └── dev.db               SQLite file (auto-created, gitignored)
├── src/
│   ├── app/
│   │   ├── (auth)/          sign-in / sign-up (Clerk)
│   │   ├── (dashboard)/     protected pages
│   │   └── api/plaid/       create-link-token, exchange-token, accounts, transactions
│   ├── components/
│   │   ├── cards/           BankCard
│   │   ├── charts/          SpendingDonut, MonthlyTrend, SpendingBar
│   │   ├── budget/          BudgetCard
│   │   ├── transactions/    TransactionRow
│   │   └── layout/          Sidebar, Header
│   ├── lib/
│   │   ├── db.ts            Prisma singleton + purgeOldTransactions()
│   │   ├── plaid.ts         Plaid API client
│   │   ├── mock-data.ts     64 transactions Jan-Jun 2026
│   │   └── utils.ts         formatCurrency, category colors/icons
│   ├── types/index.ts       shared TypeScript types
│   └── __tests__/           Jest test files
└── .env.local.example       copy to .env.local and fill in keys
```

---

## Deploying

```bash
npm run build    # verify clean build before deploying
```

For Vercel: push to GitHub, connect the repo, set env vars in the Vercel dashboard. Change `DATABASE_URL` to a hosted Postgres URL (Neon, Supabase) — Prisma supports both with zero code changes.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `DATABASE_URL is missing` | Run `cp .env.local.example .env.local` |
| `Cannot find module '@prisma/client'` | Run `npm run db:generate` |
| `Table not found` error | Run `npm run db:push` |
| Clerk redirect loop | Check `NEXT_PUBLIC_CLERK_*` keys in `.env.local` |
| Plaid Link doesn't open | Check `PLAID_CLIENT_ID` and `PLAID_SECRET` |