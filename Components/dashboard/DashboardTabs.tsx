"use client";

import { useState, useEffect} from "react";
import PostedJobs from "@/Components/dashboard/PostedJobs";
import Applications from "@/Components/dashboard/Applications";
import MyApplicationsClient from "@/Components/dashboard/MyApplicationsClient";
import ProfileInfo from "@/Components/dashboard/ProfileInfo";
import { ApplicationCardProps, JobCardProps } from "@/lib/props";

type Job = JobCardProps["job"];
type Application = ApplicationCardProps["application"];

interface Props {
  jobs: Job[];
  applicationsToMyJobs: Application[] | null; // applications received on my posted jobs
  myApplications: Application[] | null; // applications I submitted to others' jobs
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export default function DashboardTabs({ jobs, applicationsToMyJobs, myApplications, user }: Props) {
  const [active, setActive] = useState<"profile" | "jobs" | "applications" | "myApplications">("jobs");

  // Activate profile tab if URL hash is #profile-info
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#profile-info") {
      setActive("profile");
    }
  }, []);

  return (
    <div className="bg-white rounded-lg">
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex -mb-px gap-2 px-2">
          <button
            onClick={() => setActive("profile")}
            className={`shrink-0 whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
              active === "profile" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActive("jobs")}
            className={`shrink-0 whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
              active === "jobs" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
           Job Posts
          </button>
          <button
            onClick={() => setActive("applications")}
            className={`shrink-0 whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
              active === "applications" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Applicants
          </button>
          <button
            onClick={() => setActive("myApplications")}
            className={`shrink-0 whitespace-nowrap py-3 sm:py-4 px-4 sm:px-6 border-b-2 font-medium text-sm ${
              active === "myApplications" ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Application
          </button>
        </nav>
      </div>

      <div className="p-0">
        {active === "profile" && <ProfileInfo user={user} />}
        {active === "jobs" && <PostedJobs jobs={jobs} />}
        {active === "applications" && <Applications applications={applicationsToMyJobs} />}
        {active === "myApplications" && <MyApplicationsClient applications={myApplications} />}
      </div>
    </div>
  );
}


