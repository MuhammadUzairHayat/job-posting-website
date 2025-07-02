import { prisma } from "@/lib/prisma";
import { JobCardProps } from "@/lib/props";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("Received body:", body); // 👈 Log incoming data

    await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        company: body.company,
        location: body.location,
        type: body.type,
        salary: body.salary ? parseInt(body.salary) : null,
        postedAt: new Date(Date.now()),
        postedById: body.postedById, // Make sure body.postedBy is provided in the request
      },
    });
    return NextResponse.redirect("/jobs");
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

  const jobs: JobCardProps["job"][] = await prisma.job.findMany({
    where,
    orderBy: { postedAt: "desc" },
    include: {
      postedBy: true,
    },
  });

  return NextResponse.json({ jobs });
}
