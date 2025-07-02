import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  const job = await prisma.job.findUnique({
    where: { id: id },
  });

  if (!job || job.postedById !== currentUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.job.delete({
    where: { id: id },
  });

  return NextResponse.redirect(new URL("/jobs", req.url));
}
