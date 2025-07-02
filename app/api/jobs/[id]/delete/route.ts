import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { JobCardProps } from "@/lib/props";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Fetch the job from the database
  const job : JobCardProps['job'] | null = await prisma.job.findUnique({
    where: { id: id },
    include: { postedBy: true },
  });

  // Handle job not found or unauthorized access
  if (!job || job.postedBy?.id !== currentUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Safe to cast the job now

  // Delete the job
  await prisma.job.delete({
    where: { id: id },
  });

  // Redirect to the jobs page
  return NextResponse.redirect(new URL("/jobs", req.url));
}
