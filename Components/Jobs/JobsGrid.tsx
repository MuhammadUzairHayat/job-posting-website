"use client";

import { useEffect, useMemo, useState } from "react";
import JobCard from "@/Components/Jobs/JobCard";
import JobCardSkeleton from "./JobCardSkeleton";
import { useSession } from "next-auth/react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  type: string;
  description: string;
  postedAt: string | Date;
  isBlocked?: boolean;
  blockedAt?: Date | string | null;
  blockedReason?: string | null;
  postedById: string;
  postedBy?: {
    name?: string | null;
    image?: string | null;
    role?: string;
  } | null;
};

interface Props {
  location: string;
  type: string;
  post: string;
}

export default function JobsGrid({ location, type, post }: Props) {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [pageInput, setPageInput] = useState<string>("1");

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      location,
      type,
      post,
      page: String(currentPage),
      pageSize: String(rowsPerPage),
      userId: session?.user?.id || "",
    });
    fetch(`/api/jobs?${params.toString()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { jobs: Job[]; total: number }) => {
        setJobs(data.jobs || []);
        setTotal(data.total || 0);
      })
      .finally(() => setIsLoading(false));
  }, [location, type, post, currentPage, rowsPerPage, session?.user?.id]);

  const showingFrom = useMemo(() => (currentPage - 1) * rowsPerPage + 1, [currentPage, rowsPerPage]);
  const showingTo = useMemo(() => Math.min(currentPage * rowsPerPage, total), [currentPage, rowsPerPage, total]);

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
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-8 reveal stagger-12">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="hover-lift shine-on-hover">
              <JobCardSkeleton />
            </div>
          ))
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="hover-lift shine-on-hover">
              <JobCard job={job} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-full py-12 animate-fade-in">
            <svg
              className="w-16 h-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 48 48"
            >
              <circle cx="21" cy="21" r="10" stroke="currentColor" strokeWidth="2.5" />
              <line x1="28" y1="28" x2="38" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="16" y="17" width="10" height="7" rx="1.5" stroke="#9ca3af" strokeWidth="1.8" fill="none" />
              <path d="M18 17v-1.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V17" stroke="#9ca3af" strokeWidth="1.8" fill="none" />
            </svg>
            <p className="text-center text-gray-500 text-lg font-medium">
              No jobs found.
              <br />
              Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between reveal">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsChange} className="border rounded px-2 py-1 text-xs" aria-label="Rows per page">
            {[6, 12, 24, 48].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="text-gray-500">Showing {total === 0 ? 0 : showingFrom}-{showingTo} of {total}</span>
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
    </>
  );
}


