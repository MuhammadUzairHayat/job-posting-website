import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import { 
  HeaderSkeleton, 
  StatsCardSkeleton, 
  JobsTableSkeleton,
  FiltersSkeleton,
  PaginationSkeleton
} from "@/Components/admin/Skeletons";

export default function JobsLoading() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>

        {/* Filters Skeleton */}
        <FiltersSkeleton />

        {/* Jobs Table Skeleton */}
        <JobsTableSkeleton />
        
        {/* Pagination Skeleton */}
        <PaginationSkeleton />
      </div>
    </AdminDashboardLayout>
  );
}
