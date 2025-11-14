export default function JobCardSkeleton() {
  return (
    <div className="relative flex flex-col bg-white p-6 rounded-2xl shadow-lg animate-pulse min-h-[260px]">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-60 blur-xl" />
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>
      {/* Company & Details */}
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4" />
      {/* Description */}
      <div className="h-16 w-full bg-gray-100 rounded mb-4" />
      {/* Footer */}
      <div className="flex items-center mt-6">
        <div className="h-8 w-8 bg-gray-200 rounded-full mr-2" />
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <div className="h-8 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function JobCardSearchBarSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6 animate-pulse">
      <div className="h-10 w-80 bg-gray-200 rounded" />
      <div className="h-10 w-40 bg-gray-200 rounded" />
      <div className="h-10 w-40 bg-gray-200 rounded" />
      <div className="h-10 w-24 bg-gray-300 rounded" />
    </div>
  );
}
