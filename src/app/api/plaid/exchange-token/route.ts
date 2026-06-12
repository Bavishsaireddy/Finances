import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const userId = "local_user";

    const { public_token, institution } = await req.json();

    const { data: tokenData } = await plaidClient.itemPublicTokenExchange({ public_token });
    const { access_token, item_id } = tokenData;

    await db.plaidItem.upsert({
      where: { itemId: item_id },
      update: { accessToken: access_token, institutionName: institution?.name },
      create: {
        userId,
        itemId: item_id,
        accessToken: access_token,
        institutionName: institution?.name || "Unknown",
        institutionId: institution?.institution_id || null,
      },
    });

    const { data: accountsData } = await plaidClient.accountsGet({ access_token });

    for (const a of accountsData.accounts) {
      await db.account.upsert({
        where: { accountId: a.account_id },
        update: {
          currentBalance: a.balances.current ?? 0,
          availableBalance: a.balances.available ?? null,
        },
        create: {
          userId,
          itemId: item_id,
          accountId: a.account_id,
          name: a.name,
          officialName: a.official_name ?? null,
          type: a.type,
          subtype: a.subtype ?? null,
          mask: a.mask ?? "",
          currentBalance: a.balances.current ?? 0,
          availableBalance: a.balances.available ?? null,
          creditLimit: a.balances.limit ?? null,
          institutionName: institution?.name ?? "Unknown",
          institutionColor: institution?.primary_color ?? "#7c3aed",
          institutionLogo: institution?.logo ?? null,
        },
      });
    }

    return NextResponse.json({ success: true, account_count: accountsData.accounts.length });
  } catch (error) {
    console.error("exchange-token error:", error);
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}
