import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// 👇 Fix here: use `context` as the second parameter
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const currentUser = session?.user;
  const { id: appId } = await params;

  try {
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const application = await prisma.application.findUnique(
      {
        where: { id: appId },
        include: {
          job: {
            include: {
              postedBy: true,
            },
          },
          user: true,
        },
      }
    );

    if (!application) return new NextResponse("Not Found", { status: 404 });

    const isApplicant = currentUser.id === application.userId;

    const isEmployer = await prisma.job.findFirst({
      where: {
        id: application.jobId,
        postedById: currentUser.id,
      },
    });

    if (isApplicant) {
      if (application.isDeletedByEmployer) {
        await prisma.application.delete({ where: { id: appId } });
      } else {
        await prisma.application.update({
          where: { id: appId },
          data: { isDeletedByUser: true },
        });
      }
    } else if (isEmployer) {
      if (application.isDeletedByUser) {
        await prisma.application.delete({ where: { id: appId } });
      } else {
        await prisma.application.update({
          where: { id: appId },
          data: { isDeletedByEmployer: true },
        });
      }
    } else {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error occurred in deleting application:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
