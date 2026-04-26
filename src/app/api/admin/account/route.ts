import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAccountData, saveAccountData, AccountData } from "@/lib/account";

function requireAdmin() {
  return getServerSession(authOptions).then((session) => {
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
  });
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  return NextResponse.json(getAccountData());
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const body = (await req.json()) as AccountData;
  saveAccountData(body);

  return NextResponse.json({ ok: true });
}
