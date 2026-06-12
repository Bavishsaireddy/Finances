import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { db, purgeOldTransactions } from "@/lib/db";

function toYMD(d: Date) { return d.toISOString().slice(0, 10); }
function sixMonthsAgo() { const d = new Date(); d.setMonth(d.getMonth() - 6); return d; }

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const userId = "local_user";

    const { searchParams } = new URL(req.url);
    const syncOnly = searchParams.get("sync") === "true";

    if (syncOnly) {
      await syncFromPlaid(userId);
    }

    // Always return 6 months from DB
    const sixMonthsAgoStr = toYMD(sixMonthsAgo());

    const transactions = await db.transaction.findMany({
      where: { userId, date: { gte: sixMonthsAgoStr } },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({
      transactions: transactions.map(t => ({
        ...t,
        category: JSON.parse(t.category),
      })),
      count: transactions.length,
    });
  } catch (error) {
    console.error("transactions error:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

async function syncFromPlaid(userId: string) {
  const items = await db.plaidItem.findMany({ where: { userId } });
  if (!items.length) return;

  const startDate = toYMD(sixMonthsAgo());
  const endDate = toYMD(new Date());

  for (const item of items) {
    const { data } = await plaidClient.transactionsGet({
      access_token: item.accessToken,
      start_date: startDate,
      end_date: endDate,
      options: { count: 500 },
    });

    for (const t of data.transactions) {
      await db.transaction.upsert({
        where: { transactionId: t.transaction_id },
        update: { pending: t.pending, amount: t.amount },
        create: {
          userId,
          accountId: t.account_id,
          transactionId: t.transaction_id,
          amount: t.amount,
          date: t.date,
          name: t.name,
          merchantName: t.merchant_name ?? null,
          category: JSON.stringify(t.category ?? []),
          primaryCategory: t.personal_finance_category?.primary ?? t.category?.[0] ?? "Other",
          detailedCategory: t.personal_finance_category?.detailed ?? t.category?.[1] ?? "Other",
          logoUrl: t.logo_url ?? null,
          pending: t.pending,
          paymentChannel: t.payment_channel,
        },
      });
    }
  }

  // Drop anything older than 6 months
  await purgeOldTransactions(userId);
}
