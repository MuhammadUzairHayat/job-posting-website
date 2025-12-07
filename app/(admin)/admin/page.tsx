import { prisma } from "@/lib/prisma";
import { FaBriefcase, FaUsers, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";

async function getDashboardStats() {
  const [totalJobs, totalUsers, totalApplications, blockedJobs, blockedUsers] =
    await Promise.all([
      prisma.job.count(),
      prisma.user.count(),
      prisma.application.count(),
      prisma.job.count({ where: { isBlocked: true } }),
      prisma.user.count({ where: { isBlocked: true } }),
    ]);

  return {
    totalJobs,
    totalUsers,
    totalApplications,
    blockedJobs,
    blockedUsers,
  };
}

async function getRecentActivity() {
  const [recentJobs, recentUsers, recentApplications] = await Promise.all([
    prisma.job.findMany({
      take: 5,
      orderBy: { postedAt: "desc" },
      include: {
        postedBy: {
          select: { name: true, email: true },
        },
      },
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { emailVerified: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        isBlocked: true,
      },
    }),
    prisma.application.findMany({
      take: 5,
      orderBy: { appliedAt: "desc" },
      include: {
        job: {
          select: { title: true, company: true },
        },
        user: {
          select: { name: true, email: true },
        },
      },
    }),
  ]);

  return { recentJobs, recentUsers, recentApplications };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const activity = await getRecentActivity();

  return (
    <AdminDashboardLayout>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
              <p className="text-xs text-red-600 mt-1">
                {stats.blockedJobs} blocked
              </p>
            </div>
            <FaBriefcase className="text-4xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-xs text-red-600 mt-1">
                {stats.blockedUsers} blocked
              </p>
            </div>
            <FaUsers className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalApplications}
              </p>
            </div>
            <FaEnvelope className="text-4xl text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalJobs - stats.blockedJobs}
              </p>
            </div>
            <FaCheckCircle className="text-4xl text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activity.recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <p className="text-xs text-gray-500">
                      by {job.postedBy.name || job.postedBy.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Applications
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activity.recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {app.job.title}
                    </p>
                    <p className="text-sm text-gray-600">{app.job.company}</p>
                    <p className="text-xs text-gray-500">
                      by {app.user.name || app.user.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activity.recentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isBlocked ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.emailVerified
                      ? new Date(user.emailVerified).toLocaleDateString()
                      : "Not verified"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </AdminDashboardLayout>
  );
}
