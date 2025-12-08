import { prisma } from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import AdminFilters from "@/Components/admin/AdminFilters";
import Pagination from "@/Components/admin/Pagination";
import RoleFilterSelect from "./RoleFilterSelect";

const ITEMS_PER_PAGE = 12;

interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
  role?: string;
}

async function getUsers(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1");
  const skip = (page - 1) * ITEMS_PER_PAGE;
  
  // Build where clause based on filters
  type WhereClause = {
    OR?: Array<{
      name?: { contains: string; mode: "insensitive" };
      email?: { contains: string; mode: "insensitive" };
      jobTitle?: { contains: string; mode: "insensitive" };
      location?: { contains: string; mode: "insensitive" };
    }>;
    isBlocked?: boolean;
    emailVerified?: { not: null } | null;
    role?: string;
  };

  const where: WhereClause = {};
  
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { email: { contains: searchParams.search, mode: "insensitive" } },
      { jobTitle: { contains: searchParams.search, mode: "insensitive" } },
      { location: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }
  
  if (searchParams.status === "blocked") {
    where.isBlocked = true;
  } else if (searchParams.status === "active") {
    where.isBlocked = false;
  } else if (searchParams.status === "verified") {
    where.emailVerified = { not: null };
  } else if (searchParams.status === "unverified") {
    where.emailVerified = null;
  }
  
  if (searchParams.role) {
    where.role = searchParams.role;
  }

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        jobTitle: true,
        location: true,
        emailVerified: true,
        isBlocked: true,
        blockedAt: true,
        blockedReason: true,
        role: true,
        _count: {
          select: {
            jobs: true,
            applications: true,
          },
        },
      },
      orderBy: {
        emailVerified: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { users, totalCount, currentPage, totalPages } = await getUsers(params);

  const [activeCount, blockedCount] = await Promise.all([
    prisma.user.count({ where: { isBlocked: false } }),
    prisma.user.count({ where: { isBlocked: true } }),
  ]);

  const stats = {
    total: totalCount,
    active: activeCount,
    blocked: blockedCount,
  };

  return (
    <AdminDashboardLayout>
    <div className="space-y-6">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Manage Users</h2>
        <p className="text-blue-100">View and manage all registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
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
              <p className="text-sm font-medium text-gray-600">Blocked Users</p>
              <p className="text-3xl font-bold text-red-600">{stats.blocked}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AdminFilters
        searchPlaceholder="Search by name, email, job title, or location..."
        statusOptions={[
          { label: "Active Users", value: "active" },
          { label: "Blocked Users", value: "blocked" },
          { label: "Email Verified", value: "verified" },
          { label: "Email Unverified", value: "unverified" },
        ]}
        additionalFilters={
          <RoleFilterSelect currentRole={params.role || ""} />
        }
      />

      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No users found matching your filters</p>
        </div>
      ) : (
        <>
          <AdminUsersClient initialUsers={users} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </>
      )}
    </div>
    </AdminDashboardLayout>
  );
}
