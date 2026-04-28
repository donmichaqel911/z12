import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3–30 characters (letters, numbers, underscores)." },
      { status: 400 }
    );
  }

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Username is already taken." }, { status: 400 });
  }

  const password_hash = await bcrypt.hash(password, 12);

  const { error } = await supabase.from("users").insert({
    username,
    email: email?.trim() || null,
    password_hash,
    role: "user",
  });

  if (error) {
    return NextResponse.json({ error: "Failed to create account. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
