export const dynamic = "force-dynamic"; // 🚫 no cache for this API
export const revalidate = 0; // 🚫 no ISR

import { prisma } from "@/lib/prisma";
import { JobCardProps } from "@/lib/props";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        company: body.company,
        location: body.location,
        type: body.type,
        salary: body.salary ? parseInt(body.salary) : null,
        postedAt: new Date(),
        postedById: body.postedById,
      },
    });

    // console.log("Job created successfully");

    return NextResponse.redirect(new URL("/jobs", req.url));
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const post = searchParams.get("post") || "";
  const userId = searchParams.get("userId") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pageSizeParam = parseInt(searchParams.get("pageSize") || "12", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const pageSize = Number.isFinite(pageSizeParam) && pageSizeParam > 0 ? pageSizeParam : 12;

  const where: Record<string, unknown> = {};

  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }
  if (type) {
    where.type = { contains: type, mode: "insensitive" };
  }
  if (post) {
    where.OR = [
      { title: { contains: post, mode: "insensitive" } },
      { company: { contains: post, mode: "insensitive" } },
      { description: { contains: post, mode: "insensitive" } },
    ];
  }

  // Filter out blocked and hidden jobs (except for the job owner)
  // Also filter jobs blocked more than 24 hours ago for everyone
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  const allJobs: JobCardProps["job"][] = await prisma.job.findMany({
    where,
    orderBy: { postedAt: "desc" },
    include: {
      postedBy: true,
    },
  });

  // Filter jobs based on blocked/hidden status and ownership
  const filteredJobs = allJobs.filter(job => {
    // Hide hidden jobs from everyone except the owner
    if (job.isHidden && job.postedById !== userId) {
      return false;
    }
    
    // If not blocked, show to everyone (or owner if hidden)
    if (!job.isBlocked) return true;
    
    // If blocked more than 24 hours ago, hide from everyone
    if (job.blockedAt && new Date(job.blockedAt) < twentyFourHoursAgo) {
      return false;
    }
    
    // If blocked within 24 hours, only show to the owner
    return job.postedById === userId;
  });

  const total = filteredJobs.length;
  const paginatedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({ jobs: paginatedJobs, total, page, pageSize });
}
