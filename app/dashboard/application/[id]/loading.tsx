'use client';

export default function ApplicationDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto my-24 px-4 animate-pulse">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="h-6 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-48 bg-gray-100 rounded" />
            <div className="h-3 w-32 bg-gray-100 rounded" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="h-6 w-20 rounded-full bg-gray-100 inline-block" />

        {/* Contact Info */}
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 w-2/3 bg-gray-100 rounded" />
          ))}
        </div>

        {/* Cover Letter */}
        <div>
          <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
          <div className="border border-gray-200 rounded-md p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
