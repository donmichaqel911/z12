import { NextRequest, NextResponse } from "next/server";
import { fetchMarkets } from "@/lib/markets";

export const revalidate = 20;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const perPage = Number(searchParams.get("per_page") ?? 50);
  const page = Number(searchParams.get("page") ?? 1);
  const ids = searchParams.get("ids") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  const data = await fetchMarkets({
    per_page: Math.min(Math.max(perPage, 1), 100),
    page: Math.max(page, 1),
    ids,
    category,
    revalidate: 20,
  });

  return NextResponse.json(
    { coins: data, ts: Date.now() },
    { headers: { "cache-control": "public, s-maxage=20, stale-while-revalidate=60" } }
  );
}
