import SearchBar from "@/Components/Jobs/SearchBar";
import { headers } from "next/headers";
import JobsGrid from "@/Components/Jobs/JobsGrid";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  type: string;
  description: string;
  postedAt: string;
  postedBy: {
    name?: string;
    image?: string;
  };
  // Add other fields as needed
}

type JobsResponse = { jobs: Job[]; total: number; page: number; pageSize: number };

// Fetch jobs from the API (for initial filter validation only)
async function fetchJobs({ location = "", type = "", post = "", page = 1, pageSize = 12 }): Promise<JobsResponse> {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const params = new URLSearchParams({ location, type, post, page: String(page), pageSize: String(pageSize) });
  const res = await fetch(
    `${baseUrl}/api/jobs?${params.toString()}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data as JobsResponse;
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; type?: string; post?: string; page?: string; pageSize?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const location = resolvedSearchParams?.location || "";
  const type = resolvedSearchParams?.type || "";
  const post = resolvedSearchParams?.post || "";
  const page = Number(resolvedSearchParams?.page || 1);
  const pageSize = Number(resolvedSearchParams?.pageSize || 12);

  // We let the client grid fetch and paginate; we only keep filters in sync.
  await fetchJobs({ location, type, post, page, pageSize });

  return (
    <div className="mt-24 mb-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <span className="inline-block mb-3 px-3 py-1.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 tracking-wider">JOBS</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">Explore Jobs</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm sm:text-base">Find roles that match your skills and interests. Use filters to narrow your search.</p>
      </div>
      <SearchBar defaultLocation={location} defaultType={type} defaultPost={post} />
      <JobsGrid location={location} type={type} post={post} />

      {/* Pagination now handled in JobsGrid */}
    </div>
  );
}

