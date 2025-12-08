import { prisma } from "@/lib/prisma";
import AdminJobsClient from "./AdminJobsClient";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import AdminFilters from "@/Components/admin/AdminFilters";
import Pagination from "@/Components/admin/Pagination";
import type { SearchParams } from "@/types/admin";

const ITEMS_PER_PAGE = 10;

async function getJobs(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1");
  const skip = (page - 1) * ITEMS_PER_PAGE;
  
  // Build where clause based on filters
  type WhereClause = {
    OR?: Array<{
      title?: { contains: string; mode: "insensitive" };
      company?: { contains: string; mode: "insensitive" };
      location?: { contains: string; mode: "insensitive" };
    }>;
    isBlocked?: boolean;
    isHidden?: boolean;
    postedAt?: {
      gte?: Date;
      lte?: Date;
    };
  };

  const where: WhereClause = {};
  
  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: "insensitive" } },
      { company: { contains: searchParams.search, mode: "insensitive" } },
      { location: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }
  
  if (searchParams.status === "blocked") {
    where.isBlocked = true;
  } else if (searchParams.status === "active") {
    where.isBlocked = false;
  } else if (searchParams.status === "hidden") {
    where.isHidden = true;
  }
  
  if (searchParams.dateFrom || searchParams.dateTo) {
    where.postedAt = {};
    if (searchParams.dateFrom) {
      where.postedAt.gte = new Date(searchParams.dateFrom);
    }
    if (searchParams.dateTo) {
      where.postedAt.lte = new Date(searchParams.dateTo + "T23:59:59");
    }
  }

  const [jobs, totalCount] = await Promise.all([
    prisma.job.findMany({
      where,
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
      take: ITEMS_PER_PAGE,
      skip,
    }),
    prisma.job.count({ where }),
  ]);

  return {
    jobs: jobs.map(job => ({
      ...job,
      postedAt: job.postedAt.toISOString(),
    })),
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const [jobsData, jobStats] = await Promise.all([
    getJobs(params),
    prisma.job.groupBy({
      by: ['isBlocked', 'isHidden'],
      _count: true,
    }),
  ]);

  const { jobs, totalCount, currentPage, totalPages } = jobsData;

  // Calculate stats from grouped data
  const totalJobs = jobStats.reduce((sum, stat) => sum + stat._count, 0);
  const blockedJobs = jobStats
    .filter(s => s.isBlocked)
    .reduce((sum, stat) => sum + stat._count, 0);
  const hiddenJobs = jobStats
    .filter(s => s.isHidden)
    .reduce((sum, stat) => sum + stat._count, 0);
  const activeJobs = jobStats
    .filter(s => !s.isBlocked)
    .reduce((sum, stat) => sum + stat._count, 0);

  const stats = {
    total: totalJobs,
    active: activeJobs,
    blocked: blockedJobs,
    hidden: hiddenJobs,
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Manage Jobs</h2>
          <p className="text-blue-100">Monitor and manage all job postings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blocked</p>
                <p className="text-3xl font-bold text-red-600">{stats.blocked}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hidden</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.hidden}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <AdminFilters
          searchPlaceholder="Search by title, company, or location..."
          statusOptions={[
            { label: "Active Jobs", value: "active" },
            { label: "Blocked Jobs", value: "blocked" },
            { label: "Hidden Jobs", value: "hidden" },
          ]}
          showDateFilter={true}
        />

        {/* Jobs Table */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">No jobs found matching your filters</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <AdminJobsClient 
              key={`${params.page}-${params.search}-${params.status}-${jobs.length}`}
              initialJobs={jobs} 
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

