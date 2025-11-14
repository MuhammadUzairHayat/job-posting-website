export default function ContactsLoading() {
  return (
    <section className="min-h-screen bg-neutral-50 py-16 sm:py-24 px-4 sm:px-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-3" />
          <div className="h-4 w-80 bg-gray-100 rounded mx-auto" />
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 mb-4" />
              <div className="h-5 w-1/2 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-12 bg-gray-50">
              <div className="h-7 w-40 bg-gray-200 rounded mb-6" />
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-10 w-full bg-gray-100 rounded" />
                  </div>
                ))}
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-10 w-full bg-gray-100 rounded" />
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="h-7 w-40 bg-gray-200 rounded mb-6" />
              <div className="h-40 w-full bg-gray-100 rounded mb-6" />
              <div className="flex items-start gap-2 mb-6">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="h-4 w-64 bg-gray-100 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


