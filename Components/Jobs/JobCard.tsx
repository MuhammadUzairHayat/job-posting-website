"use client";

import { Briefcase, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ViewButton from "./ViewButton";
import { ovo } from "@/lib/fonts";
import { JobCardProps } from "@/lib/props";

const typeColors: Record<string, string> = {
  Remote: "bg-purple-100 text-purple-700",
  "Full-time": "bg-green-100 text-green-700",
  "Part-time": "bg-yellow-100 text-yellow-700",
  Internship: "bg-indigo-100 text-indigo-700",
  Contract: "bg-orange-100 text-orange-700",
  Freelance: "bg-pink-100 text-pink-700",
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="relative overflow-hidden flex flex-col bg-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md md:hover:shadow-lg transition-all duration-300 h-full border border-gray-100">
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
      <header className="flex flex-col gap-2 z-10 mb-6">
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
        <div className="mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: job.description }}
            className={`${ovo.className} prose prose-sm max-w-none text-gray-700 line-clamp-3 xs:line-clamp-4`}
          />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-auto z-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 items-center gap-3 pt-3 border-t border-gray-100">
          {/* Posted By */}
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 xs:w-8 xs:h-8 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={job.postedBy?.image || "/default-avatar.png"}
                alt={`Posted by ${job.postedBy?.name || "user"}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 28px, 32px"
              />
            </div>
            <div className="min-w-0 text-xs xs:text-sm">
              <p className="text-gray-600 line-clamp-1">
                {job.postedBy?.name || "Anonymous"}
              </p>
              <p className="text-gray-400 text-[10px] xs:text-xs">
                {formatDistanceToNow(new Date(job.postedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* View Button */}
          <div className="justify-self-start xs:justify-self-end mt-2">
            <ViewButton jobId={job.id} />
          </div>
        </div>
      </footer>
    </div>
  );
}
