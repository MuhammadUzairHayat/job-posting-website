"use client";

import JobCard from "@/Components/Jobs/JobCard";
import ViewMoreButton from "./ViewMoreButton";
import { JobCardProps } from "@/lib/props";

export type HomeJobSectionProps = {
  jobs: JobCardProps["job"][];
};

export default function HomeJobSection({ jobs }: HomeJobSectionProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 reveal">
        <h2 className="text-2xl font-light">Recent Job Posts</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 reveal stagger-12">
        {jobs.map((job) => (
          <div key={job.id} className="hover-lift">
            <div className="shine-on-hover rounded-xl">
              <JobCard job={job} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full items-center justify-center py-8 reveal">
        <ViewMoreButton href="/jobs" />
      </div>
    </section>
  );
}
