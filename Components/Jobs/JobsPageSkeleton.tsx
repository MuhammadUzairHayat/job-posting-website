import JobCardSkeleton, { JobCardSearchBarSkeleton } from "@/Components/Jobs/JobCardSkeleton";

export default function JobsPageSkeleton({ showPagination = false }: { showPagination?: boolean }) {
  return (
    <div className="mt-24 mb-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Page title */}
      <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-6" />
      {/* SearchBar Skeleton */}
      <JobCardSearchBarSkeleton />
      {/* Cards Skeleton Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>

      {showPagination && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-7 w-20 bg-gray-100 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-100 rounded border" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}