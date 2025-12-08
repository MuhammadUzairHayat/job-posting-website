import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaBriefcase, FaUsers, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";

async function getDashboardStats() {
  // Optimize: Use aggregation instead of multiple count queries
  const [jobStats, userStats, totalApplications] = await Promise.all([
    prisma.job.groupBy({
      by: ['isBlocked'],
      _count: true,
    }),
    prisma.user.groupBy({
      by: ['isBlocked'],
      _count: true,
    }),
    prisma.application.count(),
  ]);

  const totalJobs = jobStats.reduce((sum, stat) => sum + stat._count, 0);
  const blockedJobs = jobStats.find(s => s.isBlocked)?._count || 0;
  const totalUsers = userStats.reduce((sum, stat) => sum + stat._count, 0);
  const blockedUsers = userStats.find(s => s.isBlocked)?._count || 0;

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
          select: { name: true, email: true, image: true },
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
        image: true,
        jobTitle: true,
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
          select: { name: true, email: true, image: true },
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
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
        <p className="text-blue-100">Monitor and manage your job posting platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">Total Jobs</p>
              <p className="text-4xl font-bold mt-2">{stats.totalJobs}</p>
              <p className="text-xs text-blue-100 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
                {stats.blockedJobs} blocked
              </p>
            </div>
            <div className="p-4 bg-white/20 rounded-xl">
              <FaBriefcase className="text-4xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100">Total Users</p>
              <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
              <p className="text-xs text-green-100 mt-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
                {stats.blockedUsers} blocked
              </p>
            </div>
            <div className="p-4 bg-white/20 rounded-xl">
              <FaUsers className="text-4xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">Applications</p>
              <p className="text-4xl font-bold mt-2">{stats.totalApplications}</p>
            </div>
            <div className="p-4 bg-white/20 rounded-xl">
              <FaEnvelope className="text-4xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-100">Active Jobs</p>
              <p className="text-4xl font-bold mt-2">{stats.totalJobs - stats.blockedJobs}</p>
            </div>
            <div className="p-4 bg-white/20 rounded-xl">
              <FaCheckCircle className="text-4xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FaBriefcase className="text-blue-600" />
              Recent Jobs
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activity.recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                >
                  <Image
                    src={
                      job.postedBy.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        job.postedBy.name || job.postedBy.email
                      )}&size=48&background=4F46E5&color=fff&bold=true`
                    }
                    alt={job.postedBy.name || "User"}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-blue-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{job.title}</p>
                    <p className="text-sm text-gray-600 truncate">{job.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      by {job.postedBy.name || job.postedBy.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FaEnvelope className="text-purple-600" />
              Recent Applications
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activity.recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                >
                  <Image
                    src={
                      app.user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        app.user.name || app.user.email
                      )}&size=48&background=9333EA&color=fff&bold=true`
                    }
                    alt={app.user.name || "User"}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-purple-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{app.job.title}</p>
                    <p className="text-sm text-gray-600 truncate">{app.job.company}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      by {app.user.name || app.user.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FaUsers className="text-green-600" />
            Recent Users
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activity.recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          user.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || user.email
                          )}&size=40&background=10B981&color=fff&bold=true`
                        }
                        alt={user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-green-200"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name || "N/A"}
                        </p>
                        {user.jobTitle && (
                          <p className="text-xs text-gray-500">{user.jobTitle}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {user.isBlocked ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
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
