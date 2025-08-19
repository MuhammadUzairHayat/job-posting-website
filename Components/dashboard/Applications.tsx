
// Components/Dashboard/Applications.tsx
"use client";

import { useMemo, useState } from "react";
import ApplicationCard from "@/Components/dashboard/ApplicationCard";
import NoApplicationUI from "./NoApplicationUI";
import { ApplicationCardProps } from "@/lib/props";

interface Props {
  applications: ApplicationCardProps["application"][] | null;
}

export default function Applications({ applications }: Props) {
  const apps = useMemo(() => applications ?? [], [applications]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pageInput, setPageInput] = useState<string>("1");

  const totalPages = Math.max(1, Math.ceil(apps.length / rowsPerPage));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return apps.slice(start, start + rowsPerPage);
  }, [apps, currentPage, rowsPerPage]);

  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setCurrentPage(totalPages);

  const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(1);
    setPageInput("1");
  };

  const handlePageJump = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = Math.max(1, Math.min(totalPages, Number(pageInput)));
    if (!Number.isNaN(n)) setCurrentPage(n);
  };

  return (
    <div className="others-applications-container bg-white p-4 sm:p-6">
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
            d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0l-2.586 2.586a2 2 0 01-1.414.586H7a2 2 0 01-1.414-.586L3 13m17 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
          />
        </svg>
        Applicants
      </h2>
      <p className="text-gray-600 text-sm">
        Check applications submitted to your job postings.
      </p>

      {apps.length === 0 ? (
        <NoApplicationUI />
      ) : (
        <>
          <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {currentItems.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={handleRowsChange}
                className="border rounded px-2 py-1 text-xs"
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
                {Math.min(currentPage * rowsPerPage, apps.length)} of {apps.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={goFirst} disabled={currentPage === 1} className="px-2 py-1 text-sm rounded border disabled:opacity-50"><span className="max-[380px]:hidden">« </span>First</button>
              <button onClick={goPrev} disabled={currentPage === 1} className="px-2 py-1 text-sm rounded border disabled:opacity-50"><span className="max-[380px]:hidden">‹ </span>Prev</button>
              <form onSubmit={handlePageJump} className="flex items-center gap-1">
                <input
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  className="w-12 border rounded px-2 py-1 text-sm text-center"
                  aria-label="Page number"
                />
                <span className="text-xs text-gray-500">/ {totalPages}</span>
              </form>
              <button onClick={goNext} disabled={currentPage === totalPages} className="px-2 py-1 text-sm rounded border disabled:opacity-50">Next<span className="max-[380px]:hidden"> ›</span></button>
              <button onClick={goLast} disabled={currentPage === totalPages} className="px-2 py-1 text-sm rounded border disabled:opacity-50">Last<span className="max-[380px]:hidden"> »</span></button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
