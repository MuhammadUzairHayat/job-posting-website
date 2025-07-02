"use client";

import JobCard from "@/Components/Jobs/JobCard";
import ViewMoreButton from "./ViewMoreButton";
import { JobCardProps } from "@/lib/props";

export type HomeJobSectionProps = {
  jobs: JobCardProps["job"][];
};

export default function HomeJobSection({ jobs }: HomeJobSectionProps) {
  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Job Posts</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job}></JobCard>
        ))}
      </div>

      <div className="flex w-full items-center justify-center py-8">
        <ViewMoreButton href="/jobs" />
      </div>
    </section>
  );
}
