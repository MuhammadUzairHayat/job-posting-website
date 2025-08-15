import JobCard from "@/Components/Jobs/JobCard";
import SearchBar from "@/Components/Jobs/SearchBar";
import { headers } from "next/headers";

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

// Fetch jobs from the API
async function fetchJobs({ location = "", type = "", post = "" }): Promise<Job[]> {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;
  const params = new URLSearchParams({ location, type, post });
  const res = await fetch(
    `${baseUrl}/api/jobs?${params.toString()}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.jobs;
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; type?: string; post?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const location = resolvedSearchParams?.location || "";
  const type = resolvedSearchParams?.type || "";
  const post = resolvedSearchParams?.post || "";

  const jobs = await fetchJobs({ location, type, post });

  return (
    <div className="mt-24 mb-10 mx-auto max-w-[90rem] px-10">
      <h1 className="text-4xl font-bold text-center mb-10">Explore Jobs</h1>
      <SearchBar defaultLocation={location} defaultType={type} defaultPost={post} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {jobs.length > 0 ? (
          jobs.map((job: Job) => <JobCard key={job.id} job={job} />)
        ) : (
            <div className="flex flex-col items-center justify-center col-span-full py-12 animate-fade-in">
  <svg
    className="w-16 h-16 text-gray-300 mb-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 48 48"
  >
    {/* Magnifying glass */}
    <circle
      cx="21"
      cy="21"
      r="10"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <line
      x1="28"
      y1="28"
      x2="38"
      y2="38"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Briefcase inside */}
    <rect
      x="16"
      y="17"
      width="10"
      height="7"
      rx="1.5"
      stroke="#9ca3af"
      strokeWidth="1.8"
      fill="none"
    />
    <path
      d="M18 17v-1.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V17"
      stroke="#9ca3af"
      strokeWidth="1.8"
      fill="none"
    />
  </svg>
  <p className="text-center text-gray-500 text-lg font-medium">
    No jobs found.
    <br />
    Try adjusting your filters.
  </p>
</div>

        )}
      </div>
    </div>
  );
}

