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

export default async function JobsPage({ searchParams }: { searchParams?: { location?: string; type?: string; post?: string } }) {
  const location = searchParams?.location || "";
  const type = searchParams?.type || "";
  const post = searchParams?.post || "";

  const jobs = await fetchJobs({ location, type, post });

  return (
    <div className="mt-24 mb-10 mx-auto max-w-[90rem] px-10">
      <h1 className="text-4xl font-bold text-center mb-10">Explore Jobs</h1>
      <SearchBar defaultLocation={location} defaultType={type} defaultPost={post} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {jobs.length > 0 ? (
            jobs.map((job: Job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center col-span-full">No jobs found.</p>
          )}
      </div>
    </div>
  );
}

