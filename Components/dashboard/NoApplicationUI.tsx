import React from "react";

const NoApplicationUI = () => {
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
          d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-2.586 2.586a2 2 0 01-1.414.586H7a2 2 0 01-1.414-.586L3 13m17 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
        />
      </svg>
      <h2 className="text-xl font-semibold text-gray-500">
        No Applications Yet
      </h2>
      <p className="text-gray-400 mt-2">
        You haven’t received any job applications yet. Check back later.
      </p>
    </div>
  );
};

export default NoApplicationUI;
