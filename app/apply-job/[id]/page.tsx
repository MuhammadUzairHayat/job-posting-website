import ApplyForm from "@/Components/ApplyForm/ApplyForm";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ applied?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <ApplyForm jobId={resolvedParams.id} applied={resolvedSearchParams?.applied} />
  );
}