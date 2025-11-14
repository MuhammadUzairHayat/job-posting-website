export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto mt-20 px-4">
      <div className="animate-pulse space-y-6 bg-white p-6 rounded shadow">
        {/* Page Title */}
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-6" />

        {/* Title Field */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>

        {/* Company Field */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>

        {/* Location Field */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-100 rounded" />
        </div>

        {/* Type Field */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-1/2 bg-gray-100 rounded" />
        </div>

        {/* Salary Field */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-1/2 bg-gray-100 rounded" />
        </div>

        {/* Description (Quill) */}
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-32 w-full bg-gray-100 rounded" />
        </div>

        {/* Submit Button */}
        <div className="h-10 w-32 bg-blue-200 rounded mt-6" />
      </div>
    </div>
  );
}