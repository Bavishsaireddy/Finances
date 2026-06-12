import { PrismaClient } from "@prisma/client";
import { MOCK_BUDGETS } from "../src/lib/mock-data";

const db = new PrismaClient();

async function main() {
  const DEMO_USER = "demo_user";

  console.log("Seeding budgets...");
  for (const b of MOCK_BUDGETS) {
    await db.budget.upsert({
      where: { userId_category_period: { userId: DEMO_USER, category: b.category, period: b.period } },
      update: { limitAmount: b.limit_amount },
      create: {
        userId: DEMO_USER,
        category: b.category,
        limitAmount: b.limit_amount,
        period: b.period,
        color: b.color,
        icon: b.icon,
      },
    });
  }

  console.log(`✓ Seeded ${MOCK_BUDGETS.length} budgets`);
  console.log("Done. Run `npm run db:studio` to browse the database.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
