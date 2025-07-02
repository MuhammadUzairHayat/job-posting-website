import React from "react";

const NoPostedJobUI = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m3 0h1a2 2 0 012 2v2H3V8a2 2 0 012-2h1m12 0H6m15 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6h18z"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700">No Jobs Posted</h2>
      <p className="text-gray-500 mt-2">
        You haven’t posted any jobs yet. Start by creating a new job listing.
      </p>
    </div>
  );
};

export default NoPostedJobUI;
