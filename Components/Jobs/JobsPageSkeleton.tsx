import JobCardSkeleton, { JobCardSearchBarSkeleton } from "@/Components/Jobs/JobCardSkeleton";

export default function JobsPageSkeleton() {
  return (
    <div className="mt-24 mb-10 mx-auto max-w-[90rem] px-10">
      {/* SearchBar Skeleton */}
      <JobCardSearchBarSkeleton />
      {/* Cards Skeleton Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}