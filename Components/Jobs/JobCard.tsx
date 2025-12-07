"use client";

import { Briefcase, MapPin, DollarSign, AlertCircle } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ViewButton from "./ViewButton";
import { ovo } from "@/lib/fonts";
import { JobCardProps } from "@/lib/props";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const typeColors: Record<string, string> = {
  Remote: "bg-purple-100 text-purple-700",
  "Full-time": "bg-green-100 text-green-700",
  "Part-time": "bg-yellow-100 text-yellow-700",
  Internship: "bg-indigo-100 text-indigo-700",
  Contract: "bg-orange-100 text-orange-700",
  Freelance: "bg-pink-100 text-pink-700",
};

export default function JobCard({ job }: JobCardProps) {
  const { data: session } = useSession();
  const [showReasonModal, setShowReasonModal] = useState(false);
  const isOwner = session?.user?.id === job.postedById;
  const isBlocked = job.isBlocked;
  const blockedReason = job.blockedReason;

  return (
    <>
    <div className="relative overflow-hidden flex flex-col bg-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md md:hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
      {/* Blocked Warning Banner - Only visible to owner */}
      {isBlocked && isOwner && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white px-4 py-2 text-xs flex items-center justify-between gap-2 z-20">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">Job Blocked by Admin</span>
          </div>
          <button
            onClick={() => setShowReasonModal(true)}
            className="underline hover:text-red-100 whitespace-nowrap"
          >
            View Reason
          </button>
        </div>
      )}
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 z-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-100/40 via-white to-blue-100/40 opacity-0" />
      {/* Decorative Shapes */}
      <div aria-hidden="true" className="pointer-events-none">
   
        {/* Dotted pattern */}
        <svg className="absolute top-3 left-3 w-16 h-16 text-indigo-200/40 z-0" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="jobcard-dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" className="fill-current" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#jobcard-dots)" />
        </svg>
      </div>

      {/* Header Section */}
      <header className={`flex flex-col gap-2 z-10 mb-6 ${isBlocked && isOwner ? 'mt-8' : ''}`}>
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
          <h2 className="text-lg xs:text-xl font-bold text-gray-800 line-clamp-2 break-words">
            {job.title}
          </h2>
          <span
            className={`inline-flex self-start mb-2 xs:self-center text-xs xs:text-sm font-medium px-2.5 py-1 rounded-full ${
              typeColors[job.type] || "bg-gray-100 text-gray-600"
            }`}
          >
            {job.type}
          </span>
        </div>

        {/* Company Info */}
        <div className="flex mb-1 items-center gap-2 text-sm xs:text-base text-gray-600">
          <Briefcase className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{job.company}</span>
        </div>

        <div className="flex mb-1 items-center gap-2 text-sm xs:text-base text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex mb-1 items-center gap-2 text-sm xs:text-base text-gray-600">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>Rs {job.salary.toLocaleString()}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 z-10">
        {/* Location & Salary */}

        {/* Description Preview */}
        <div className="mb-4 max-h-20 overflow-hidden">
          <div
            dangerouslySetInnerHTML={{ __html: job.description }}
            className={`${ovo.className} prose prose-sm max-w-none text-gray-700 line-clamp-3 xs:line-clamp-4 [&_img]:hidden [&_iframe]:hidden [&_video]:hidden`}
          />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-auto z-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 items-center gap-3 pt-3 border-t border-gray-100">
          {/* Posted By - Clickable */}
          <Link 
            href={`/profile/${job.postedById}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <div className="relative w-7 h-7 xs:w-8 xs:h-8 rounded-full overflow-hidden border border-gray-200 group-hover:border-blue-400 transition-colors">
              <Image
                src={job.postedBy?.image || "/default-avatar.png"}
                alt={`Posted by ${job.postedBy?.name || "user"}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 28px, 32px"
              />
            </div>
            <div className="min-w-0 text-xs xs:text-sm">
              <p className="text-gray-600 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {job.postedBy?.name || "Anonymous"}
              </p>
              <p className="text-gray-400 text-[10px] xs:text-xs">
                {formatDistanceToNow(new Date(job.postedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>

          {/* View Button */}
          <div className="justify-self-start xs:justify-self-end mt-2">
            <ViewButton jobId={job.id} />
          </div>
        </div>
      </footer>
    </div>

    {/* Blocked Reason Modal */}
    {showReasonModal && isBlocked && blockedReason && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowReasonModal(false)}>
        <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="text-red-600" />
              Job Blocked - Reason
            </h3>
            <button
              onClick={() => setShowReasonModal(false)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{blockedReason}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> This job will be completely hidden from all users after 24 hours from the block time.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowReasonModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
