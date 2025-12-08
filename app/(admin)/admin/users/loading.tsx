import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import { 
  HeaderSkeleton, 
  StatsCardSkeleton, 
  UsersGridSkeleton,
  FiltersSkeleton,
  PaginationSkeleton
} from "@/Components/admin/Skeletons";

export default function UsersLoading() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>

        {/* Filters Skeleton */}
        <FiltersSkeleton />

        {/* Users Grid Skeleton */}
        <UsersGridSkeleton />
        
        {/* Pagination Skeleton */}
        <PaginationSkeleton />
      </div>
    </AdminDashboardLayout>
  );
}
