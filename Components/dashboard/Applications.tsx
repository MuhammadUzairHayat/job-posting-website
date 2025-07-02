
// Components/Dashboard/Applications.tsx
"use client";

import { useState } from "react";
import ApplicationCard from "@/Components/dashboard/ApplicationCard";
import { ApplicationCardProps } from "@/Components/dashboard/ApplicationCard";
import NoApplicationUI from "./NoApplicationUI";

interface Props {
  applications: ApplicationCardProps["application"][];
}

export default function Applications({ applications }: Props) {
  const [showAllApplications, setShowAllApplications] = useState(false);
  const displayedApplications = showAllApplications
    ? applications
    : applications.slice(0, 5);

  return (
    <div className="others-applications-container bg-white p-6">
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
            d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-2.586 2.586a2 2 0 01-1.414.586H7a2 2 0 01-1.414-.586L3 13m17 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
          />
        </svg>
        Applications
      </h2>
      <p className="text-gray-600 text-sm">
        Check applications submitted to your job postings.
      </p>

      {displayedApplications.length === 0 ? (
        <NoApplicationUI />
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {displayedApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}

      {applications.length > 5 && (
        <button
          onClick={() => setShowAllApplications(!showAllApplications)}
          className="mt-8 inline-block bg-gradient-to-r from-indigo-600 to-purple-700 text-sm font-medium text-white hover:opacity-95 px-4 py-2 rounded-lg transition"
        >
          {showAllApplications
            ? "View Less Applications"
            : "View More Applications"}
        </button>
      )}
    </div>
  );
}
