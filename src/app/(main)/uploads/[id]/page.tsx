import MediaDetailPage from "@/components/pages/media-detail-page";

export default async function MediaViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id)

  return <MediaDetailPage id={id} />
}
