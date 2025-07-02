import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import DeleteJobButton from "@/Components/Jobs/DeleteJobButton";
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import EditButton from "@/Components/Jobs/EditButton";
import Link from "next/link";
import SuccessMessage from "@/Components/AlertMessages/SuccessMessage";
import ErrorMessage from "@/Components/AlertMessages/ErrorMessage";
import { ovo } from "@/lib/fonts";
import { AppliedStatus } from "@/lib/props";

interface PageProps {
  params: Promise<{ job: string }>;
  searchParams: Promise<{ applied?: string }>;
}

export default async function SingleJobPage({
  params,
  searchParams,
}: PageProps) {
  const session = await auth();
  const {job: jobId} = await params
  const {applied} = await searchParams;
    const getAppliedStatus = (value?: string): AppliedStatus => {
    if (value && ["success", "already", "error"].includes(value)) {
      return value as AppliedStatus;
    }
    return "applying"; // default value
  };

  const appliedStatus = getAppliedStatus(applied);
  const currentUserId = session?.user?.id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) return notFound();

  const isOwner = currentUserId && job.postedById === currentUserId;

  return (
    <div className="max-w-4xl mx-auto  my-20 px-4">
      {applied === "success" ? (
        <SuccessMessage message="Applied Successfully" />
      ) : applied === "1" ? (
        <ErrorMessage message={"You already applied for this job"} />
      ) : applied === "1" ? (
        <ErrorMessage message="Error Occurred in Apply" />
      ) : (
        ""
      )}
      <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-200 overflow-hidden">
        {/* Background blur glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-50 blur-2xl"></div>

        {/* ===== HEADER ===== */}
        <header className="mb-6 border-b pb-4 border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-sm">
              {job.type}
            </span>
          </div>
          <div className="text-gray-600 mt-2 space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> {job.company}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {job.location}
            </p>
            {job.salary && (
              <p className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Rs{" "}
                {job.salary.toLocaleString()}
              </p>
            )}
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />{" "}
              {formatDistanceToNow(new Date(job.postedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main
          className={`${ovo.className} prose prose-blue max-w-none text-gray-800 mb-8 text-justify leading-relaxed`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
          />
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 mt-6 pt-6 border-t border-gray-200">
          {/* Posted by section */}
          <div className="flex items-center gap-3">
            <Image
              src={job.postedBy?.image || "/default-avatar.png"}
              alt="Posted by"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="text-sm text-gray-700">
              <p className="font-semibold">
                {job.postedBy?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">{job.postedBy?.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 items-center">
            {!isOwner && (
              // <ApplyButton jobId={job.id} applied={applied} />
              <Link
                href={`/apply-job/${job.id}?applied=${appliedStatus}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600  text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m2 9H7a2 2 0 01-2-2V7a2 2 0 012-2h3V4a1 1 0 011-1h2a1 1 0 011 1v1h3a2 2 0 012 2v12a2 2 0 01-2 2z"
                  />
                </svg>
                Apply Now
              </Link>
            )}
            {isOwner && (
              <>
                <EditButton jobId={job.id} />
                <DeleteJobButton jobId={job.id} />
              </>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
