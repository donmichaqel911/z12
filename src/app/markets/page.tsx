import { fetchMarkets } from "@/lib/markets";
import MarketsClient from "./MarketsClient";

export const revalidate = 20;

export default async function MarketsPage() {
  const coins = await fetchMarkets({ per_page: 50 });
  return <MarketsClient initial={coins} />;
}
