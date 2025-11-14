import PostedJobs from "@/Components/dashboard/PostedJobs";
import Applications from "@/Components/dashboard/Applications"
import MyApplications from "./MyApplications";
import "./dashboard.css"
import { ApplicationCardProps, JobCardProps } from "@/lib/props";


interface Props {
  jobs: JobCardProps["job"][];
  applications: ApplicationCardProps["application"][];
}

export default function DashboardContent({ jobs, applications}: Props) {
  return (
    <div className="min-h-screen mb-12 bg-gray-50">
                  
      <div className="max-w-7xl bg-white rounded-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <PostedJobs jobs={jobs} />
        <div className="applications-container">
          <Applications applications={applications} />
          <MyApplications />
        </div>
      </div>
    </div>
  );
}
