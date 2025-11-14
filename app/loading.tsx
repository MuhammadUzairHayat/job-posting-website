export default function HomeLoading() {
  return (
    <main className="animate-pulse">
      {/* HeroSection skeleton */}
      <section className="mt-[4rem] bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 py-16 sm:py-24 md:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-10 sm:h-14 w-3/4 sm:w-2/3 mx-auto bg-blue-200/50 rounded mb-6" />
          <div className="h-4 w-2/3 mx-auto bg-blue-100 rounded mb-8" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-36 bg-blue-300 rounded-lg" />
            <div className="h-12 w-36 bg-blue-200 rounded-lg" />
          </div>
        </div>
      </section>

      {/* HomeJobSection skeleton */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="h-7 w-48 bg-gray-200 rounded" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-100 rounded-xl border border-gray-200" />
          ))}
        </div>
        <div className="flex w-full items-center justify-center py-8">
          <div className="h-10 w-36 bg-gray-200 rounded-lg" />
        </div>
      </section>

      {/* HomeCTASection skeleton */}
      <section className="bg-gradient-to-tr from-blue-950 to-blue-800 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="h-10 w-2/3 bg-white/20 rounded mx-auto mb-4" />
          <div className="h-4 w-3/4 bg-white/10 rounded mx-auto mb-12" />
          <div className="grid sm:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded bg-white/20 mt-1" />
                <div className="flex-1">
                  <div className="h-5 w-32 bg-white/30 rounded mb-2" />
                  <div className="h-4 w-48 bg-white/20 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-11 w-40 bg-white/20 rounded-lg mx-auto" />
        </div>
      </section>
    </main>
  );
}


