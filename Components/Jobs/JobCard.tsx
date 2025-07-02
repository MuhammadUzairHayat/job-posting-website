"use client";

import { Briefcase, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import ViewButton from "./ViewButton";
import { ovo } from "@/lib/fonts";
import { JobCardProps } from "@/lib/props";



const typeColors: Record<string, string> = {
  "Remote": "bg-purple-100 text-purple-700",
  "Full-time": "bg-green-100 text-green-700",
  "Part-time": "bg-yellow-100 text-yellow-700",
  "Internship": "bg-indigo-100 text-indigo-700",
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="relative flex flex-col bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Background Blur */}
      <div className="absolute inset-0 z-[-10] rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-60 blur-xl" />

      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            typeColors[job.type] || "bg-gray-100 text-gray-600"
          }`}
        >
          {job.type}
        </span>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 h-full">
        <p className="text-gray-600 mb-1 flex items-center gap-2">
          <Briefcase className="w-4 h-4" /> {job.company}
        </p>
        <p className="text-gray-600 mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> {job.location}
        </p>
        {job.salary && (
          <p className="text-gray-600 mb-1 flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Rs {job.salary.toLocaleString()}
          </p>
        )}

        {/* Description Section */}
        <div className="mt-6 text-sm text-gray-700 relative">
          <div
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
            className={`${ovo.className} prose prose-sm max-w-none transition-all duration-300 text-ellipsis overflow-hidden line-clamp-4`}
          />

          {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent flex justify-end items-end pr-4 pb-1">
              <div
                className="text-sm text-blue-600 hover:underline font-medium"
              >
              </div>
            </div> */}
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between items-start sm:items-center">
        {/* Posted By Info */}
        <div className="flex items-center">
          <Image
            src={job.postedBy?.image || "/default-avatar.png"}
            width={30}
            height={30}
            alt="User"
            className="rounded-full mr-2"
          />
          <div className="text-sm text-gray-600">
            <p>{job.postedBy?.name || "Anonymous"}</p>
            <p className="text-xs text-gray-400">
              Posted{" "}
              {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* View Job Button */}
        <ViewButton jobId={job.id} />
      </footer>
    </div>
  );
}
