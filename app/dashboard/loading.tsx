'use client';

export default function DashboardContentSkeleton() {
  return (
    <div className="mt-24 mb-8 animate-pulse">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* User header */}
        <div className="relative bg-white rounded-xl border border-gray-100 p-6 sm:p-8 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-56 bg-gray-100 rounded" />
            </div>
          </div>
        </div>

        {/* Hero stats */}
        <section className="mb-2">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl p-5 flex items-center gap-4 border border-gray-100">
                  <div className="p-3 rounded-full bg-gray-100 w-12 h-12" />
                  <div className="space-y-2 w-full">
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                    <div className="h-5 w-12 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs bar */}
        <div className="border-b border-gray-200">
          <div className="flex gap-2 px-2">
            {['Profile','Job Posts','Applicants','My Application'].map((t) => (
              <div key={t} className="h-10 w-28 sm:w-32 bg-gray-100 rounded-t-md" />
            ))}
          </div>
        </div>

        {/* Tab content - grid like PostedJobs */}
        <div className="bg-white rounded-b-lg p-4 sm:p-6 border border-gray-100 border-t-0">
          <div className="grid gap-4 mt-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 rounded-xl border border-gray-200 bg-gray-100" />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-7 w-20 bg-gray-100 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-16 bg-gray-100 rounded border-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
