import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { ovo } from "@/lib/fonts";
import { statusColors } from "@/Components/dashboard/ApplicationCard";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      job: {
        include: {
          postedBy: true,
        },
      },
      user: true,
    },
  });

  if (!application) return notFound();
  const isOwner = userId && application.userId === userId;

  return (
    <div className="max-w-3xl mx-auto my-24 px-4 ">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Application for:{" "}
              <span className="text-blue-700">{application.job.title}</span>
            </h1>
            <p className="text-gray-600">
              <span className="font-medium">{application.job.company}</span>{" "}
              &middot; {application.job.location} &middot;{" "}
              {application.job.type}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Applied on {new Date(application.appliedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={application.user.image || "/default-avatar.png"}
              alt={application.user.name || "Applicant"}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-700">
                {application.user.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">{application.user.email}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              statusColors[application.status ?? "pending"] ||
              "bg-gray-100 text-gray-600"
            }`}
          >
            {application.status
              ? application.status.charAt(0).toUpperCase() +
                application.status.slice(1)
              : "Pending"}
          </span>
          {isOwner && (
            <Link
              href={`/dashboard/application/${application.id}/edit`}
              className="ml-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-blue-700"
            >
              Edit
            </Link>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-6 space-y-2">
          {application.phoneNumber && (
            <p className="text-gray-700">
              <strong>Phone:</strong> &nbsp; {application.phoneNumber}
            </p>
          )}
          {application.resumeUrl && (
            <p className="text-gray-700">
              <strong>Resume:</strong> &nbsp;
              <a
                href={application.resumeUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            </p>
          )}
          {application.linkedin && (
            <p className="text-gray-700">
              <strong>LinkedIn:</strong> &nbsp;
              <a
                href={application.linkedin}
                target="_blank"
                className="text-blue-600 underline"
              >
                Profile
              </a>
            </p>
          )}
          {application.github && (
            <p className="text-gray-700">
              <strong>GitHub:</strong> &nbsp;
              <a
                href={application.github}
                target="_blank"
                className="text-blue-600 underline"
              >
                Profile
              </a>
            </p>
          )}
          {application.portfolio && (
            <p className="text-gray-700">
              <strong>Portfolio:</strong> &nbsp;
              <a
                href={application.portfolio}
                target="_blank"
                className="text-blue-600 underline"
              >
                Website
              </a>
            </p>
          )}
        </div>

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Cover Letter
            </h2>
            <div
              className={`${ovo.className} prose prose-blue max-w-none border border-gray-200 rounded-md p-4 text-gray-800`}
              dangerouslySetInnerHTML={{ __html: application.coverLetter }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
