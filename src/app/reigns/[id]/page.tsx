import ReignDetailClient from "./reign-detail-client";

export const dynamic = "force-dynamic";

export default async function ReignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReignDetailClient reignId={id} />;
}
