import HistoryClient from "./history-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reign history · Siege Me",
  description: "A public timeline of completed Siege Me reigns and anonymous contributions.",
};

export default function HistoryPage() {
  return <HistoryClient />;
}
