import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error"] : [],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Purge transactions older than 6 months for a given user.
// Called after syncing new Plaid data.
export async function purgeOldTransactions(userId: string) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  const cutoffStr = cutoff.toISOString().slice(0, 10); // "YYYY-MM-DD"

  await db.transaction.deleteMany({
    where: { userId, date: { lt: cutoffStr } },
  });
}
