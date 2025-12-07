export default function ApplyJobLoading() {
  return (
    <div className="max-w-2xl mx-auto mt-24 px-4 animate-pulse">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <div className="h-7 w-40 bg-gray-200 rounded mb-6" />
        <div className="space-y-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-10 w-full bg-gray-100 rounded" />
            </div>
          ))}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-32 w-full bg-gray-100 rounded" />
          </div>
          <div className="h-10 w-32 bg-blue-200 rounded ml-auto" />
        </div>
      </div>
    </div>
  );
}


