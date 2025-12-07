import React from "react";

export default function SingleJobSkeleton() {
  return (
    <div className="max-w-4xl mx-auto my-20 px-4 animate-pulse">
      <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-200 overflow-hidden">
        {/* Background blur glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-50 blur-2xl"></div>

        {/* Header */}
        <div className="mb-6 border-b pb-4 border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-blue-200 rounded-full" />
          </div>
          <div className="mt-2 space-y-2 text-sm text-gray-600">
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/5 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Job Description */}
        <div className="prose max-w-none text-gray-800 mb-8 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 mt-6 pt-6 border-t border-gray-200">
          {/* Posted By */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="space-y-1">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="w-32 h-3 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 items-center">
            <div className="h-10 w-20 bg-gray-300 rounded-md" />
            <div className="h-10 w-10 bg-gray-300 rounded-md" />
            <div className="h-10 w-10 bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
