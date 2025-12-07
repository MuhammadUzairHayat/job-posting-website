export default function AboutLoading() {
  return (
    <section className="min-h-screen bg-neutral-50 py-24 px-6 sm:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-28">
          <div className="inline-block mb-4 h-6 w-32 bg-gray-200 rounded-full" />
          <div className="h-10 sm:h-12 w-3/4 sm:w-2/3 mx-auto bg-gray-200 rounded mb-4" />
          <div className="h-4 w-1/2 mx-auto bg-gray-100 rounded" />
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-lg bg-gray-100 mb-6" />
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded mt-6" />
            </div>
          ))}
        </div>

        {/* Leadership */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="space-y-3">
              <div className="h-7 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-80 bg-gray-100 rounded" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100">
                <div className="h-40 bg-gray-100" />
                <div className="pt-12 pb-6 px-6">
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-20 bg-gray-100 rounded mb-4" />
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full" />
                    <div className="w-8 h-8 bg-gray-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="h-8 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-2xl p-12 text-center">
          <div className="h-8 w-64 bg-gray-700 rounded mx-auto mb-4" />
          <div className="h-4 w-80 bg-gray-800 rounded mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="h-10 w-32 bg-gray-700 rounded" />
            <div className="h-10 w-32 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}


