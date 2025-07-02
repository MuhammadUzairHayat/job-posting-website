'use client';

export default function DashboardContentSkeleton() {
  return (
    <div className="min-h-screen mt-24 bg-gray-50 p-6 animate-pulse">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* === JOB POSTS SKELETON === */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />

          <div className="flex flex-col gap-4 mt-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-lg border border-gray-200 bg-gray-100"
              />
            ))}
          </div>

          <div className="mt-8 h-10 w-32 bg-gray-200 rounded-lg" />
        </div>

        {/* === APPLICATIONS SKELETON === */}
        <div className="bg-white p-6 rounded-lg space-y-4">
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />

          <div className="flex flex-col gap-4 mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-lg border border-gray-200 bg-gray-100"
              />
            ))}
          </div>

          <div className="mt-8 h-10 w-40 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
