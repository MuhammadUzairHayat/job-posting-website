import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobs = await prisma.job.findMany({
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isBlocked: true
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        postedAt: "desc"
      }
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
