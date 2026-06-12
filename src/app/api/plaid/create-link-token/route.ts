import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const { plaidClient } = await import("@/lib/plaid");
    const { Products, CountryCode } = await import("plaid");

    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: "local_user" },
      client_name: "FinanceOS",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error("create-link-token error:", error);
    return NextResponse.json({ error: "Failed to create link token — check PLAID_CLIENT_ID and PLAID_SECRET in .env.local" }, { status: 500 });
  }
}
