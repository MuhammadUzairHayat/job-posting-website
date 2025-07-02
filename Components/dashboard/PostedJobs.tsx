// Components/Dashboard/PostedJobs.tsx
"use client";

import { useState } from "react";
import JobCard, { JobCardProps } from "@/Components/Jobs/JobCard";
import NoPostedJobUI from "./NoPostedJobUI";

interface Props {
  jobs: JobCardProps["job"][];
}

export default function PostedJobs({ jobs }: Props) {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const displayedJobs = showAllJobs ? jobs : jobs.slice(0, 4);

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m3 0h1a2 2 0 012 2v2H3V8a2 2 0 012-2h1m12 0H6m15 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6h18z"
          />
        </svg>
        All Job Posts
      </h2>
      <p className="text-gray-600 text-sm">
        View and manage all job listings you have created.
      </p>

      {displayedJobs.length === 0 ? (
        <NoPostedJobUI />
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {displayedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {jobs.length > 4 && (
        <button
          onClick={() => setShowAllJobs(!showAllJobs)}
          className="mt-8 inline-block text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:opacity-95 px-4 py-2 rounded-lg transition"
        >
          {showAllJobs ? "View Less Jobs" : "View More Jobs"}
        </button>
      )}
    </div>
  );
}