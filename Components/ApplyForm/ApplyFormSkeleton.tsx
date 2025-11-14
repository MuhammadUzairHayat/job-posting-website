export default function ApplyFormSkeleton() {
  return (
    <div className="bg-white shadow-md p-6 mt-24 rounded-lg max-w-2xl mx-auto space-y-5 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto" />

      <div className="h-40 bg-gray-200 rounded" /> {/* Quill Editor placeholder */}

      <div className="h-10 bg-gray-200 rounded" /> {/* Resume */}
      <div className="h-10 bg-gray-200 rounded" /> {/* Phone Number */}
      <div className="h-10 bg-gray-200 rounded" /> {/* LinkedIn */}
      <div className="h-10 bg-gray-200 rounded" /> {/* GitHub */}
      <div className="h-10 bg-gray-200 rounded" /> {/* Portfolio */}

      <div className="h-12 bg-gray-300 rounded w-full" /> {/* Button */}
    </div>
  );
}
