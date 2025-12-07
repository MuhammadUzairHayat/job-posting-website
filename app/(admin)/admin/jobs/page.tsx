import { prisma } from "@/lib/prisma";
import AdminJobsClient from "./AdminJobsClient";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";

async function getAllJobs() {
  const jobs = await prisma.job.findMany({
    select: {
      id: true,
      title: true,
      company: true,
      location: true,
      type: true,
      postedAt: true,
      isBlocked: true,
      isHidden: true,
      blockedReason: true,
      postedBy: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: {
      postedAt: "desc",
    },
  });

  return jobs.map(job => ({
    ...job,
    postedAt: job.postedAt.toISOString(),
  }));
}

export default async function AdminJobsPage() {
  const jobs = await getAllJobs();

  return (
    <AdminDashboardLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Jobs</h2>
        <div className="text-sm text-gray-600">
          Total: {jobs.length} | Active:{" "}
          {jobs.filter((j) => !j.isBlocked).length} | Blocked:{" "}
          {jobs.filter((j) => j.isBlocked).length}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No jobs found</p>
        </div>
      ) : (
        <AdminJobsClient initialJobs={jobs} />
      )}
    </div>
    </AdminDashboardLayout>
  );
}
