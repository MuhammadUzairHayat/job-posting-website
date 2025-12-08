import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import ApplicationDetailClient from "./ApplicationDetailClient";

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
  const isOwner = !!(userId && application.userId === userId);
  const isJobPoster = !!(userId && application.job.postedById === userId);

  return (
    <ApplicationDetailClient
      application={application}
      isOwner={isOwner}
      isJobPoster={isJobPoster}
    />
  );
}
