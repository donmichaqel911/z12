import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAccountData } from "@/lib/account";
import { fetchMarkets } from "@/lib/markets";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { holdings: HOLDINGS, availableUsdt, monthlyPct, activity } = await getAccountData(userId);

  const ids = Object.keys(HOLDINGS).join(",");
  const coins = await fetchMarkets({ ids, per_page: Object.keys(HOLDINGS).length });

  const holdings = coins
    .filter((c) => HOLDINGS[c.id] !== undefined)
    .map((c) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      amount: HOLDINGS[c.id],
      current_price: c.current_price,
      price_change_24h: c.price_change_24h,
      price_change_percentage_24h: c.price_change_percentage_24h,
      sparkline: c.sparkline_in_7d?.price ?? [],
      value: HOLDINGS[c.id] * c.current_price,
    }));

  const totalValue = holdings.reduce((s, h) => s + h.value, 0);
  const pnlToday = holdings.reduce((s, h) => s + h.price_change_24h * h.amount, 0);
  const pnlPct = (pnlToday / Math.max(totalValue - pnlToday, 1)) * 100;

  return NextResponse.json({
    holdings,
    totalValue,
    pnlToday,
    pnlPct,
    availableUsdt,
    monthlyPct,
    activity,
    ts: Date.now(),
  });
}
