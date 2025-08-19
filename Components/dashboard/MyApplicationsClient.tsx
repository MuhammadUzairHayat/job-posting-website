"use client";

import Link from "next/link";
import { FaBriefcase } from "react-icons/fa";
import { useMemo, useState } from "react";
import { ApplicationCardProps } from "@/lib/props";
import { Eye } from "lucide-react";

type Application = ApplicationCardProps["application"]; 

interface Props {
  applications: Application[] | null;
}

export default function MyApplicationsClient({ applications }: Props) {
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

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-gray-500">
        <FaBriefcase className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-gray-400" />
        <p className="text-base sm:text-lg font-medium">No Applications Found</p>
        <p className="text-xs sm:text-sm text-gray-400">You haven’t applied for any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="my-applications-container bg-white p-4 sm:p-6 rounded-lg  space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800  pb-2">My Applications</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {currentItems.map((app) => (
          <div key={app.id} className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <p className="font-medium text-gray-900 text-sm sm:text-base">{app.job.title}</p>
              {app.status ? (
                <span className="w-[min-content] text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full capitalize bg-gray-100 text-gray-600">
                  {app.status}
                </span>
              ) : null}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">{app.job.company}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  Applied on {typeof app.appliedAt === "string" ? app.appliedAt : app.appliedAt.toLocaleString()}
                </p>
              </div>
              <Link href={`dashboard/application/${app.id}`} className="flex items-center gap-2 py-2 text-center text-xs bg-gradient-to-br to-indigo-700 from-blue-700 hover:to-blue-700 hover:from-indigo-700 text-white px-4 rounded-full transition">
                <Eye size={16}/> View
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsChange} className="border rounded px-2 py-1 text-xs" aria-label="Rows per page">
            {[6, 12, 24, 48].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="text-gray-500">
            Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, apps.length)} of {apps.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={goFirst} disabled={currentPage === 1} className="px-2 py-1 text-sm rounded border disabled:opacity-50"><span className="max-[380px]:hidden">« </span>First</button>
          <button onClick={goPrev} disabled={currentPage === 1} className="px-2 py-1 text-sm rounded border disabled:opacity-50"><span className="max-[380px]:hidden">‹ </span>Prev</button>
          <form onSubmit={handlePageJump} className="flex items-center gap-1">
            <input value={pageInput} onChange={(e) => setPageInput(e.target.value)} className="w-12 border rounded px-2 py-1 text-sm text-center" aria-label="Page number" />
            <span className="text-xs text-gray-500">/ {totalPages}</span>
          </form>
          <button onClick={goNext} disabled={currentPage === totalPages} className="px-2 py-1 text-sm rounded border disabled:opacity-50">Next<span className="max-[380px]:hidden"> ›</span></button>
          <button onClick={goLast} disabled={currentPage === totalPages} className="px-2 py-1 text-sm rounded border disabled:opacity-50">Last<span className="max-[380px]:hidden"> »</span></button>
        </div>
      </div>
    </div>
  );
}


