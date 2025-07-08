import Vocabulary from "@/components/pages/vocab";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    return <div className="text-center text-destructive text-sm mt-6">Invalid vocabulary ID.</div>;
  }

  return <Vocabulary id={id ?? ""} />;
}
