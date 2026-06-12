import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const userId = "local_user";

    const accounts = await db.account.findMany({
      where: { userId },
      orderBy: { type: "asc" },
    });

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error("accounts error:", error);
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}
