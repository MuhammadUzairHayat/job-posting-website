import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";
import { 
  HeaderSkeleton, 
  DashboardActivitySkeleton 
} from "@/Components/admin/Skeletons";

export default function DashboardLoading() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-white/30 rounded w-20 mb-2"></div>
                <div className="h-10 bg-white/30 rounded w-16 mb-2"></div>
                <div className="h-3 bg-white/30 rounded w-24"></div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-white/30 rounded w-20 mb-2"></div>
                <div className="h-10 bg-white/30 rounded w-16 mb-2"></div>
                <div className="h-3 bg-white/30 rounded w-24"></div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-white/30 rounded w-24 mb-2"></div>
                <div className="h-10 bg-white/30 rounded w-16"></div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-white/30 rounded w-20 mb-2"></div>
                <div className="h-10 bg-white/30 rounded w-16"></div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Recent Activity Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="p-6">
              <DashboardActivitySkeleton />
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="p-6">
              <DashboardActivitySkeleton />
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
          <div className="p-6">
            <DashboardActivitySkeleton />
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
