// Components/Dashboard/PostedJobs.tsx
"use client";

import { useMemo, useState } from "react";
import JobCard from "@/Components/Jobs/JobCard";
import NoPostedJobUI from "./NoPostedJobUI";
import { JobCardProps } from "@/lib/props";

interface Props {
  jobs: JobCardProps["job"][];
}

export default function PostedJobs({ jobs }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const totalPages = Math.max(1, Math.ceil(jobs.length / rowsPerPage));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return jobs.slice(start, start + rowsPerPage);
  }, [jobs, currentPage, rowsPerPage]);

  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setCurrentPage(totalPages);

  const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const [pageInput, setPageInput] = useState<string>("1");
  const handlePageJump = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = Math.max(1, Math.min(totalPages, Number(pageInput)));
    if (!Number.isNaN(n)) setCurrentPage(n);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m3 0h1a2 2 0 012 2v2H3V8a2 2 0 012-2h1m12 0H6m15 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6h18z"
          />
        </svg>
        All Job Posts
      </h2>
      <p className="text-gray-600 text-sm">
        View and manage all job listings you have created.
      </p>

      {jobs.length === 0 ? (
        <NoPostedJobUI />
      ) : (
        <>
          <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {currentItems.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={handleRowsChange}
                className="border rounded-lg px-2 py-1.5 text-xs bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Rows per page"
              >
                {[6, 12, 24, 48].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">
                Showing {(currentPage - 1) * rowsPerPage + 1}-
                {Math.min(currentPage * rowsPerPage, jobs.length)} of {jobs.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={goFirst}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded-lg border bg-gradient-to-b from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <span className="max-[380px]:hidden">« </span>First
              </button>
              <button
                onClick={goPrev}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm rounded-lg border bg-gradient-to-b from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <span className="max-[380px]:hidden">‹ </span>Prev
              </button>
              <form onSubmit={handlePageJump} className="flex items-center gap-1">
                <input
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  className="w-12 border rounded-lg px-2 py-1.5 text-sm text-center bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Page number"
                />
                <span className="text-xs text-gray-500">/ {totalPages}</span>
              </form>
              <button
                onClick={goNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border bg-gradient-to-b from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                Next<span className="max-[380px]:hidden"> ›</span>
              </button>
              <button
                onClick={goLast}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border bg-gradient-to-b from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 text-gray-700 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                Last<span className="max-[380px]:hidden"> »</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}