export default function FaqsLoading() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 h-6 w-28 bg-gray-200 rounded-full" />
          <div className="h-10 w-2/3 mx-auto bg-gray-200 rounded mb-4" />
          <div className="h-4 w-3/5 mx-auto bg-gray-100 rounded" />
        </div>

        {/* Accordion placeholders */}
        <div className="space-y-4 mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="h-5 w-1/2 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <div className="h-6 w-56 bg-gray-200 rounded mx-auto mb-3" />
          <div className="h-4 w-80 bg-gray-100 rounded mx-auto mb-5" />
          <div className="h-10 w-36 bg-blue-200 rounded mx-auto" />
        </div>
      </div>
    </section>
  );
}


