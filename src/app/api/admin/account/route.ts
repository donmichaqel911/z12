import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAccountData, saveAccountData, AccountData } from "@/lib/account";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const userId = req.nextUrl.searchParams.get("userId") || "admin";
  return NextResponse.json(await getAccountData(userId));
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const userId = req.nextUrl.searchParams.get("userId") || "admin";
  const body = (await req.json()) as AccountData;
  await saveAccountData(userId, body);

  return NextResponse.json({ ok: true });
}
