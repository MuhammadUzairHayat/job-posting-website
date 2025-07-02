import ApplyForm from "@/Components/ApplyForm/ApplyForm";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { applied?: string };
}) {
  return (
    <ApplyForm jobId={params.id} applied={searchParams?.applied} />
  );
}
