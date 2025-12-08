import { prisma } from "@/lib/prisma";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import AdminFilters from "@/Components/admin/AdminFilters";
import Pagination from "@/Components/admin/Pagination";

const ITEMS_PER_PAGE = 15;

interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
}

async function getAdminMessages(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || "1");
  const skip = (page - 1) * ITEMS_PER_PAGE;

  type WhereClause = {
    OR?: Array<{
      message?: { contains: string; mode: "insensitive" };
      user?: {
        OR?: Array<{
          name?: { contains: string; mode: "insensitive" };
          email?: { contains: string; mode: "insensitive" };
        }>;
      };
      job?: {
        OR?: Array<{
          title?: { contains: string; mode: "insensitive" };
          company?: { contains: string; mode: "insensitive" };
        }>;
      };
    }>;
    isRead?: boolean;
  };

  const where: WhereClause = {};

  if (searchParams.search) {
    where.OR = [
      { message: { contains: searchParams.search, mode: "insensitive" } },
      {
        user: {
          OR: [
            { name: { contains: searchParams.search, mode: "insensitive" } },
            { email: { contains: searchParams.search, mode: "insensitive" } },
          ],
        },
      },
      {
        job: {
          OR: [
            { title: { contains: searchParams.search, mode: "insensitive" } },
            { company: { contains: searchParams.search, mode: "insensitive" } },
          ],
        },
      },
    ];
  }

  if (searchParams.status === "read") {
    where.isRead = true;
  } else if (searchParams.status === "unread") {
    where.isRead = false;
  }

  const [messages, totalCount, unreadCount] = await Promise.all([
    prisma.adminMessage.findMany({
      where,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        sentAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip,
    }),
    prisma.adminMessage.count({ where }),
    prisma.adminMessage.count({ where: { isRead: false } }),
  ]);

  return {
    messages,
    totalCount,
    unreadCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
  };
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { messages, totalCount, unreadCount, currentPage, totalPages } =
    await getAdminMessages(params);

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Admin Messages
              </h2>
              <p className="text-blue-100">
                Total: {totalCount} | Unread: {unreadCount}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <AdminFilters
          searchPlaceholder="Search messages, users, or jobs..."
          statusOptions={[
            { label: "Unread Messages", value: "unread" },
            { label: "Read Messages", value: "read" },
          ]}
        />

        {/* Messages List */}
        {messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">No messages found matching your filters</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow">
              <div className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-6 ${!message.isRead ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          To: {message.user.name || message.user.email}
                        </p>
                        {message.job && (
                          <p className="text-sm text-gray-600">
                            Regarding: {message.job.title} at {message.job.company}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {new Date(message.sentAt).toLocaleString()}
                        </p>
                        {!message.isRead && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Unread
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
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
