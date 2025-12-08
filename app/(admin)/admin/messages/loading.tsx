import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import { 
  HeaderSkeleton, 
  MessagesListSkeleton,
  FiltersSkeleton,
  PaginationSkeleton
} from "@/Components/admin/Skeletons";

export default function MessagesLoading() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Filters Skeleton */}
        <FiltersSkeleton />

        {/* Messages List Skeleton */}
        <MessagesListSkeleton />
        
        {/* Pagination Skeleton */}
        <PaginationSkeleton />
      </div>
    </AdminDashboardLayout>
  );
}
