export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header Card Skeleton */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 animate-pulse">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400"></div>
          
          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white"></div>
              
              {/* Name and Title */}
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-gray-300 rounded-lg w-64"></div>
                <div className="h-5 bg-gray-200 rounded-lg w-48"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-40"></div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-9 w-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Posted Jobs Section Skeleton */}
        <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
          <div className="h-7 bg-gray-300 rounded-lg w-48 mb-6"></div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
