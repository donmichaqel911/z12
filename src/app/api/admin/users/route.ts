import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { data: dbUsers } = await supabase
    .from("users")
    .select("id, username, email, role, created_at")
    .order("created_at", { ascending: true });

  // Include hardcoded env users alongside Supabase users
  const hardcoded = [
    { id: "admin", username: "admin", email: "admin@zengo.app", role: "admin", created_at: null },
    { id: "user",  username: "user",  email: "user@zengo.app",  role: "user",  created_at: null },
  ];

  return NextResponse.json([...hardcoded, ...(dbUsers ?? [])]);
}
