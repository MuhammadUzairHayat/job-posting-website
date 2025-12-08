export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function JobsTableSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applications
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-40"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function UsersGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 animate-pulse"
        >
          {/* Card Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-40 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex gap-2">
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
              <div className="h-9 bg-gray-200 rounded flex-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MessagesListSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 animate-pulse">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
              </div>
              <div className="text-right">
                <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg animate-pulse"
        >
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 sm:p-8 animate-pulse">
      <div className="h-8 bg-white/20 rounded w-64 mb-2"></div>
      <div className="h-5 bg-white/20 rounded w-48"></div>
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="bg-white px-4 py-3 rounded-b-lg border-t border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="flex gap-2">
          <div className="w-20 h-9 bg-gray-200 rounded"></div>
          <div className="w-9 h-9 bg-gray-200 rounded"></div>
          <div className="w-9 h-9 bg-gray-200 rounded"></div>
          <div className="w-9 h-9 bg-gray-200 rounded"></div>
          <div className="w-20 h-9 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
